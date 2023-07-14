import { FACEBOOK_MARKETPLACE_SELLING_URL } from './../../constants.js';
import { PostInfo } from '../types.js';
import {
  login,
  nagivateToNewListingInMarketplace,
  uploadImages,
  setTitle,
  setPrice,
  setCategory,
  setCondition,
  setHideFromFriends,
  clickNext,
  setCity,
  clickPublish,
  extractAndDeleteActivePosts,
  cleanupImages,
  setDescription,
} from './helpers.js';
import { dropPrice } from '../general.js';

const { CITY } = process.env;

export const createNewPosting = async (postInfo: PostInfo) => {
  await login();
  await nagivateToNewListingInMarketplace();
  await uploadImages(postInfo.imagePaths);
  await setTitle(postInfo.title);
  await setPrice(postInfo.price);
  await setCategory(postInfo.category);
  await setDescription(postInfo.body);
  await setCondition(postInfo.condition);
  await setHideFromFriends(true);
  await clickNext();
  await setCity(CITY);
  await clickNext();
  await clickPublish();
};

export const relistAllActivePostings = async (priceDrop: string) => {
  await login();
  await driver.get(FACEBOOK_MARKETPLACE_SELLING_URL);

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