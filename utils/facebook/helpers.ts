import { By, Key } from 'selenium-webdriver';
import {
  FACEBOOK_MARKETPLACE_URL,
  FACEBOOK_URL,
  IMAGE_LOADING_DELAY_TIME,
} from '../../constants.js';
import { setInputField, waitForElement, waitForPageLoad } from '../general.js';

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
  const input = await driver.findElement(By.css("input[aria-label='Enter a city']"));
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
    By.xpath("//div[@role='main']//button[@aria-label='Publish'][@role='button']")
  );
  await publishButton.click();
};
