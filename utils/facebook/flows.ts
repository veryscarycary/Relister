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
} from './helpers.js';

const { CITY } = process.env;

export const createNewPosting = async (postInfo: PostInfo) => {
  await login();
  await nagivateToNewListingInMarketplace();
  await uploadImages(postInfo.imagePaths);

  await setTitle(postInfo.title);
  await setPrice(postInfo.price);
  debugger;
  await setCategory(postInfo.category);
  await setCondition(postInfo.condition);
  await setHideFromFriends(true);
  await clickNext();
  await setCity(CITY);
  // await clickPublish();
};
