import { PostInfo } from './../types';
import { By, Key } from 'selenium-webdriver';
import { expect } from 'chai';
import crypto from 'crypto';
import fs from 'fs';

import {
  FACEBOOK_MARKETPLACE_CREATE_URL,
  FACEBOOK_URL,
  IMAGE_DIRECTORY_PATH,
  IMAGE_DOWNLOAD_ATTEMPT_LIMIT,
  IMAGE_LOADING_DELAY_TIME,
} from '../../constants.js';
import {
  NoActivePostingsFoundError,
  downloadImages,
  getTextFromElement,
  getValueFromElement,
  setInputField,
  waitForElement,
  waitForElements,
  waitForPageLoad,
} from '../general.js';
import { NoSuchElementError } from 'selenium-webdriver/lib/error.js';

const { USERNAME_FB, PASSWORD_FB } = process.env;

export const login = async () => {
  await driver.get(FACEBOOK_URL);

  try {
    const usernameField = await driver.findElement(By.id('email'));
    await usernameField.sendKeys(USERNAME_FB);
    const passwordField = await driver.findElement(By.id('pass'));
    await passwordField.sendKeys(PASSWORD_FB);
    const loginButton = await driver.findElement(
      By.css("button[name='login'][type='submit']")
    );
    await loginButton.click();

    await waitForPageLoad();
  } catch (e) {
    console.info('Already logged in. Navigating to FB Marketplace...');
  }
};

export const nagivateToNewListingInMarketplace = async () => {
  await driver.get(FACEBOOK_MARKETPLACE_CREATE_URL);
  waitForPageLoad();
};

export const uploadImages = async (imagePaths: string[]) => {
  const imageUploadInput = await driver.findElement(
    By.css("input[accept*='image'][multiple][type='file']")
  );

  const imagePathsString = imagePaths.join(' \n ');
  await imageUploadInput.sendKeys(imagePathsString);

  // wait until all images have been uploaded
  const customExpectedCondition = async () => {
    const images = await driver.findElements(
      By.css("div[aria-label='Marketplace'] img[alt][src^='https://scontent']")
    );
    return images.length === imagePaths.length;
  };
  await driver.wait(customExpectedCondition, IMAGE_LOADING_DELAY_TIME);
};

export const setTitle = async (title: string) => {
  await setInputField(
    By.xpath("//span[contains(text(), 'Title')]/following-sibling::input"),
    title
  );
};

export const setPrice = async (price: string) => {
  await setInputField(
    By.xpath("//span[contains(text(), 'Price')]/following-sibling::input"),
    price
  );
};

export const setCategory = async (category: string) => {
  await setInputField(
    By.xpath("//span[contains(text(), 'Category')]/following-sibling::input"),
    category
  );

  const categoryOption = await waitForElement(
    By.xpath(`//ul/li//span[contains(text(), '${category}')]/ancestor::div[5]`)
  );
  await categoryOption.click();
};

export const setCondition = async (condition: string) => {
  const dropdown = await driver.findElement(
    By.xpath("//span[contains(text(), 'Condition')]/ancestor::label")
  );
  await dropdown.click();

  const conditionOption = await waitForElement(
    By.xpath(
      `//div/div/div/span[contains(text(), '${condition}')]/ancestor::div[@role='option']`
    )
  );
  await conditionOption.click();
};

export const setDescription = async (description: string) =>
  await setInputField(
    By.xpath(
      "//span[contains(text(), 'Description')]/following-sibling::textarea"
    ),
    description
  );

export const setHideFromFriends = async (doHideFromFriends: boolean) => {
  const hideFromFriendsCheckbox = await driver.findElement(
    By.xpath(
      "//span[contains(text(), 'Hide from friends')]/ancestor::div[@role='switch']"
    )
  );

  const isHiddenFromFriends = await hideFromFriendsCheckbox.isSelected();

  if (!isHiddenFromFriends) {
    if (doHideFromFriends) await hideFromFriendsCheckbox.sendKeys(Key.ENTER);
  } else {
    if (!doHideFromFriends) await hideFromFriendsCheckbox.sendKeys(Key.ENTER);
  }
};

export const clickNext = async () => {
  const nextButton = await waitForElement(
    By.css("div[aria-label='Next'][role='button']")
  );
  await nextButton.click();
};

export const clickClose = async () => {
  const closeButton = await waitForElement(
    By.css("div[aria-label='Close'][role='button']")
  );
  await closeButton.click();
};

export const clickLeavePage = async () => {
  const leavePageButton = await waitForElement(
    By.css("div[aria-label='Leave Page'][role='button'][tabindex='0']")
  );
  await leavePageButton.click();
};

export const clickDeletePost = async () => {
  const deleteButton = await waitForElement(
    By.css("div[aria-label='Delete'][role='button']")
  );
  await deleteButton.click();
};

export const clickConfirmDelete = async () => {
  const deleteButton = await waitForElement(
    By.css(
      "div[aria-label='Delete listing'][role='dialog'] div[aria-label='Delete'][role='button'][tabindex='0']"
    )
  );
  await deleteButton.click();
};

export const setCity = async (city: string) => {
  const input = await waitForElement(
    By.css("input[aria-label='Enter a city']")
  );
  const inputValue = await input.getAttribute('value');

  if (inputValue) {
    await input.sendKeys(Key.COMMAND + 'a');
    await input.sendKeys(Key.DELETE);
  }

  await setInputField(By.css("input[aria-label='Enter a city']"), city);

  const cityOption = await waitForElement(
    By.xpath(
      `//ul/li//span[contains(text(), '${city}')]/ancestor::li[@role='option']`
    )
  );
  await cityOption.click();
};

export const clickPublish = async () => {
  const publishButton = await waitForElement(
    By.css("div[aria-label='Publish'][role='button']")
  );
  await publishButton.click();
};

export const extractAndDeleteActivePosts = async () => {
  const posts = [];

  const activePosts = await waitForElements(
    By.xpath(
      "//div[@aria-label='Collection of your marketplace items']//span[text()='Active']/ancestor::div[1]"
    )
  );

  const displayedActivePosts = [];

  for (const post of activePosts) {
    const isDisplayed = await post.isDisplayed();
    if (isDisplayed) displayedActivePosts.push(post);
  }

  const numActivePosts = displayedActivePosts.length;
  expect(numActivePosts).to.be.greaterThan(
    0,
    "There weren't any active postings found! Check your account to see if you have any postings that are active."
  );

  while (posts.length < numActivePosts) {
    const postInfo = await getInfoAndDeleteFirstPost();
    posts.push(postInfo);
  }

  return posts;
};

export const getInfoAndDeleteFirstPost = async () => {
  // visit live post and gather info
  await viewFirstActivePosting();

  const title = await getPostingTitle();
  const price = await getPostingPrice();
  const body = await getDescription();
  const condition = await getCondition();
  const category = await getCategory();
  const isHiddenFromFriends = await getHideFromFriends();
  const imagePaths = await downloadPostingImages(title);

  const postInfo: any = {
    body,
    price,
    category,
    title,
    condition,
    imagePaths,
    isHiddenFromFriends,
  };

  await clickNext();

  const location = await getLocation();
  postInfo.location = location;

  await clickClose();
  await clickLeavePage();

  await clickDeletePost();
  await clickConfirmDelete();

  return postInfo;
};

export const getPostingTitle = async () =>
  getValueFromElement(
    By.xpath("//span[contains(text(), 'Title')]/following-sibling::input")
  );

export const getPostingPrice = async () =>
  getValueFromElement(
    By.xpath("//span[contains(text(), 'Price')]/following-sibling::input")
  );

export const getCategory = async () =>
  getValueFromElement(
    By.xpath("//span[contains(text(), 'Category')]/following-sibling::input")
  );

export const getCondition = async () =>
  getTextFromElement(
    By.xpath("//span[contains(text(), 'Condition')]/following-sibling::div")
  );

export const getDescription = async () =>
  getTextFromElement(
    By.xpath(
      "//span[contains(text(), 'Description')]/following-sibling::textarea"
    )
  );

export const getHideFromFriends = async () => {
  const hideFromFriends = await waitForElement(
    By.xpath(
      "//span[contains(text(), 'Hide from friends')]/ancestor::div[@role='switch']"
    )
  );
  const hideFromFriendsAttr = await hideFromFriends.getAttribute(
    'aria-checked'
  );
  return hideFromFriendsAttr === 'true';
};

export const getLocation = async () =>
  getValueFromElement(
    By.xpath("//span[contains(text(), 'Location')]/following-sibling::input")
  );

export const downloadPostingImages = async (postTitle: string) => {
  const titleHash = crypto.createHash('md5').update(postTitle).digest('hex');

  const thumbnails = await waitForElements(
    By.css("div[aria-label^='Thumbnail '][role='button']")
  );

  const sourceUrlDups = [];

  for (const thumbnail of thumbnails) {
    await thumbnail.click();

    const imageElement = await waitForElement(
      By.css("img[alt^='Product photo'][src^='https://scontent']")
    );

    const url = await imageElement.getAttribute('src');
    sourceUrlDups.push(url);
  }

  const sourceUrls = [...new Set(sourceUrlDups)];

  let localImagePaths: string[] = [];
  let imgDownloadAttemptNum = 0;

  while (localImagePaths.length === 0 && imgDownloadAttemptNum < IMAGE_DOWNLOAD_ATTEMPT_LIMIT) {
    localImagePaths = await downloadImages(
      sourceUrls,
      IMAGE_DIRECTORY_PATH,
      titleHash
    );
    imgDownloadAttemptNum++;
  }

  localImagePaths.sort();

  return localImagePaths;
};

export const viewFirstActivePosting = async () => {
  try {
    const activePosts = await waitForElements(
      By.xpath(
        "//div[@aria-label='Collection of your marketplace items']//span[contains(text(), 'Active')]/ancestor::div[1]"
      )
    );
    const displayedActivePosts = [];

    for (const post of activePosts) {
      const isDisplayed = await post.isDisplayed();
      if (isDisplayed) displayedActivePosts.push(post);
    }
    const firstActivePost = displayedActivePosts[0];
    await firstActivePost.click();
    const editListingButton = await waitForElement(
      By.css(
        "a[aria-label='Edit Listing'][href^='/marketplace/edit/?listing_id=']"
      )
    );
    await editListingButton.click();
  } catch (error) {
    if (error instanceof NoSuchElementError)
      throw new NoActivePostingsFoundError();
  }
};

export const cleanupImages = () => {
  fs.rmSync(IMAGE_DIRECTORY_PATH, { recursive: true, force: true });
};

export const dropPrice = (post: PostInfo, priceDrop: number | string) => {
  const roundToNearest5 = (num: number) => Math.ceil(num / 5) * 5;

  const price = Number(post.price.slice(1));
  let newPrice;

  if (typeof priceDrop === 'number') {
    newPrice = price - priceDrop;
  } else if (typeof priceDrop === 'string') {
    // percent drop
    const percentNum = Number(priceDrop.slice(0, priceDrop.length - 1)) / 100;
    const unroundedNewPrice = price * (1 - percentNum);
    newPrice = roundToNearest5(unroundedNewPrice);
  }

  const newPriceString = `${newPrice}`;

  return { ...post, price: newPriceString };
};
