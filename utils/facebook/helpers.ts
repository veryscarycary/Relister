import { By, Key } from 'selenium-webdriver';
import { expect } from 'chai';

import {
  FACEBOOK_MARKETPLACE_CREATE_URL,
  FACEBOOK_URL,
  IMAGE_LOADING_DELAY_TIME,
} from '../../constants.js';
import {
  NoActivePostingsFoundError,
  getTextFromElement,
  getValueFromElement,
  setInputField,
  waitForElement,
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
  const nextButton = await driver.findElement(
    By.css("div[aria-label='Next'][role='button']")
  );
  await nextButton.click();
};

export const setCity = async (city: string) => {
  const input = await driver.findElement(
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
  const publishButton = await driver.findElement(
    By.xpath(
      "//div[@role='main']//button[@aria-label='Publish'][@role='button']"
    )
  );
  await publishButton.click();
};

export const extractAndDeleteActivePosts = async () => {
  const posts = [];

  const activePosts = await driver.findElements(
    By.xpath(
      "//div[@aria-label='Collection of your marketplace items']//span[contains(text(), 'Active')]/ancestor::div[0]"
    )
  );
  const numActivePosts = activePosts.length;
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

  // TO-DO

  // const postInfo: PostInfo = {
  //   body,
  //   price,
  //   category,
  //   title,
  //   imagePaths,
  //   city: CITY,
  //   name: SELLER_NAME,
  //   phoneNumber: PHONE_NUMBER,
  //   neighborhood: NEIGHBORHOOD,
  //   zipCode: ZIP_CODE,
  // };

  // if (condition) postInfo.condition = condition;

  // // delete old posting before making a new one
  // await clickDeletePostingButton();

  // return postInfo;
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
  const hideFromFriends = await driver.findElement(
    By.xpath(
      "//span[contains(text(), 'Hide from friends')]/ancestor::div[@role='switch']"
    )
  );
  return hideFromFriends.getAttribute('aria-checked');
};

export const getLocation = async () =>
  getValueFromElement(
    By.xpath("//span[contains(text(), 'Location')]/following-sibling::input")
  );

export const viewFirstActivePosting = async () => {
  try {
    const firstActivePost = await driver.findElement(
      By.xpath(
        "//div[@aria-label='Collection of your marketplace items']//span[contains(text(), 'Active')]/ancestor::div[0]"
      )
    );
    await firstActivePost.click();
    const editListingButton = await waitForElement(
      By.css("a[href^='/marketplace/edit/?listing_id=']")
    );
    await editListingButton.click();
    await waitForPageLoad();
  } catch (error) {
    if (error instanceof NoSuchElementError)
      throw new NoActivePostingsFoundError();
  }
};
