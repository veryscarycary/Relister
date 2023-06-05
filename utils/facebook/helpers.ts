import { By } from 'selenium-webdriver';
import {
  FACEBOOK_MARKETPLACE_URL,
  FACEBOOK_URL,
  IMAGE_LOADING_DELAY_TIME,
} from '../../constants.js';
import { setInputField, waitForPageLoad } from '../general.js';

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
  await driver.get(FACEBOOK_MARKETPLACE_URL);
  waitForPageLoad();
};

export const uploadImages = async (imagePaths: string[]) => {
  const imageUploadInput = await driver.findElement(
    By.css("input[accept*='image'][multiple][type='file']")
  );

  for (const path of imagePaths) {
    await imageUploadInput.sendKeys(path);
  }

  // wait until all images have been uploaded
  const customExpectedCondition = async () => {
    const images = await driver.findElements(
      By.css("img[alt][src^='https://scontent']")
    );
    return images.length === imagePaths.length;
  };
  await driver.wait(customExpectedCondition, IMAGE_LOADING_DELAY_TIME);
};

export const setTitle = async (title: string) => {
  await setInputField(
    By.xpath("//div[role='main']//span[contains(text(), 'Title')]/following-sibling::input"),
    title
  );
};

export const setPrice = async (price: string) => {
  await setInputField(
    By.xpath("//div[role='main']//span[contains(text(), 'Price')]/following-sibling::input"),
    price
  );
};

export const setCategory = async (category: string) => {
  await setInputField(
    By.xpath("//div[role='main']//span[contains(text(), 'Category')]/following-sibling::input"),
    category
  );
};

export const setCondition = async (condition: string) => {
  const dropdown = await driver.findElement(
    By.xpath("//div[role='main']//span[contains(text(), 'Condition')]")
  );
  await dropdown.click();
  
  const conditionOption = await driver.findElement(
    By.css(`//div[role='listbox']//div[role='option']//span[contains(text(), ${condition})]`)
  );
  await conditionOption.click();
};

export const setHideFromFriends = async (willHideFromFriends: boolean) => {
  const hideFromFriendsCheckbox = await driver.findElement(
    By.xpath(
      "//div[role='main']//span[contains(text(), 'Hide from friends')]/following::input[role='switch'][type='checkbox']"
    ));

  const isHiddenFromFriends = await hideFromFriendsCheckbox.getAttribute('checked');
    
  if (!isHiddenFromFriends) {
    if (willHideFromFriends)
      hideFromFriendsCheckbox.click();
  } else {
    if (!willHideFromFriends)
      hideFromFriendsCheckbox.click();
  }
};

export const clickNext = async () => {
  const nextButton = await driver.findElement(
    By.xpath("//div[role='main']//button[aria-label='Next'][role='button']")
  );
  await nextButton.click();
};

export const setCity = async (city: string) => {
  await setInputField(By.css("input[aria-label='Enter a city']"), city);
};

export const clickPublish = async () => {
  const publishButton = await driver.findElement(
    By.xpath("//div[role='main']//button[aria-label='Publish'][role='button']")
  );
  await publishButton.click();
};

