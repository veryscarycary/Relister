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
import { SD_CRAIGLIST_ACCOUNT_URL } from '../../constants.js';

export const createNewPosting = async (postInfo) => {
  await driver.get(SD_CRAIGLIST_ACCOUNT_URL);

  await clickNewPostButton();
  await selectCity(postInfo.city);
  await selectForSaleByOwner();
  await selectCategory(postInfo.category);

  // now on the edit page, with form fields
  await completeDetailsForm(postInfo);
  debugger;

  // area page, where we accept the preloaded zipcode area
  await clickSubmit();

  // upload images, wait for upload, and continue
  await uploadImages(postInfo.imagePaths);

  // publish!
  await clickSubmit();
};

export const relistAllActivePostings = async () => {
    await login();

    const postsInfo = await extractAndDeleteActivePosts();

    while (postsInfo.length) {
      await createNewPosting(postsInfo.shift());
    }

    cleanupImages(); // synchronous
};
