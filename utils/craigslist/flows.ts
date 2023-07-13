import assert from 'assert';

import {
  login,
  extractAndDeleteActivePosts,
  clickNewPostButton,
  selectCity,
  selectCategory,
  selectForSaleByOwner,
  completeDetailsForm,
  uploadImages,
  clickSubmit,
  cleanupImages,
} from './helpers.js';
import { SD_CRAIGLIST_ACCOUNT_URL, SD_CRAIGLIST_HOME_URL } from '../../constants.js';
import { PostInfo } from '../types.js';
import { expect } from 'chai';
import { dropPrice } from '../general.js';

export const createNewPosting = async (postInfo: PostInfo) => {
  await driver.get(SD_CRAIGLIST_ACCOUNT_URL);

  await clickNewPostButton();
  await selectCity(postInfo.city);
  await selectForSaleByOwner();
  await selectCategory(postInfo.category);

  // now on the edit page, with form fields
  await completeDetailsForm(postInfo);

  // area page, where we accept the preloaded zipcode area
  await clickSubmit();

  // upload images, wait for upload, and continue
  await uploadImages(postInfo.imagePaths);

  // publish!
  await clickSubmit();
};

export const relistAllActivePostings = async (priceDrop: number | string) => {
    await login();
    expect(await driver.getCurrentUrl()).to.equal(SD_CRAIGLIST_HOME_URL);

    const postsInfo = await extractAndDeleteActivePosts();

    while (postsInfo.length) {
      let postInfo = postsInfo.shift();

      if (priceDrop) {
        postInfo = dropPrice(postInfo, priceDrop);
      }

      await createNewPosting(postInfo);
    }

    cleanupImages(); // synchronous
};
