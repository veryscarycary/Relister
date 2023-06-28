import { NoSuchElementError } from 'selenium-webdriver/lib/error.js';
import { By } from 'selenium-webdriver';
import { expect } from 'chai';
import crypto from 'crypto';
import fs from 'fs';

import { IMAGE_LOADING_DELAY_TIME, SD_CRAIGLIST_ACCOUNT_URL } from '../../constants.js';
import {
  downloadImage,
  createDirectory,
  waitForPageLoad,
  getTextFromElement,
  setInputField,
  NoActivePostingsFoundError,
} from '../general.js';
import { IMAGE_DIRECTORY_PATH, FOR_SALE_BY_OWNER } from '../../constants.js';
import { PostInfo } from './../types';

const {
  USERNAME_CL,
  PASSWORD_CL,
  CITY,
  SELLER_NAME,
  PHONE_NUMBER,
  NEIGHBORHOOD,
  ZIP_CODE,
} = process.env;

export const login = async () => {
  await driver.get(SD_CRAIGLIST_ACCOUNT_URL);

  const usernameField = await driver.findElement(By.id('inputEmailHandle'));
  await usernameField.sendKeys(USERNAME_CL);
  const passwordField = await driver.findElement(By.id('inputPassword'));
  await passwordField.sendKeys(PASSWORD_CL);
  const loginButton = await driver.findElement(By.id('login'));

  await loginButton.click();

  await waitForPageLoad();
};

export const viewFirstActivePosting = async () => {
  try {
    const firstDisplayButton = await driver.findElement(
      By.css(
        "td.buttons.active input.managebtn[value='display'][name='go'][type='submit']"
      )
    );
    await firstDisplayButton.click();
    await waitForPageLoad();
  } catch (error) {
    if (error instanceof NoSuchElementError)
      throw new NoActivePostingsFoundError();
  }
};

export const clickDeletePostingButton = async () => {
  const deletePostingButton = await driver.findElement(
    By.css("input[value='Delete this Posting'][name='go'][type='submit']")
  );
  await deletePostingButton.click();
  await waitForPageLoad();
};

export const extractAndDeleteActivePosts = async () => {
  const posts = [];

  const activePosts = await driver.findElements(
    By.css(
      "td.buttons.active input.managebtn[value='display'][name='go'][type='submit']"
    )
  );
  const numActivePosts = activePosts.length;
  expect(numActivePosts).to.be.greaterThan(0, "There weren't any active postings found! Check your account to see if you have any postings that are active.");

  while (posts.length < numActivePosts) {
    const postInfo = await getInfoAndDeleteFirstPost();
    posts.push(postInfo);
  }

  return posts;
};

export const getInfoAndDeleteFirstPost = async () => {
  // go to accounts page
  await driver.get(SD_CRAIGLIST_ACCOUNT_URL);

  // visit live post and gather info
  await viewFirstActivePosting();

  const title = await getPostingTitle();
  const price = await getPostingPrice();
  const body = await getPostingBody();
  const manufacturer = await getManufacturer();
  const condition = await getCondition();
  const category = await getCategory();
  const imagePaths = await downloadPostingImages(title);

  const postInfo: PostInfo = {
    body,
    price,
    category,
    title,
    imagePaths,
    city: CITY,
    name: SELLER_NAME,
    phoneNumber: PHONE_NUMBER,
    neighborhood: NEIGHBORHOOD,
    zipCode: ZIP_CODE,
  };

  if (manufacturer) postInfo.manufacturer = manufacturer;
  if (condition) postInfo.condition = condition;

  // delete old posting before making a new one
  await clickDeletePostingButton();

  return postInfo;
};

export const downloadPostingImages = async (postTitle: string) => {
  const localImagePaths: string[] = [];
  const titleHash = crypto.createHash('md5').update(postTitle).digest('hex');

  const gallery = await driver.findElement(By.className('gallery'));
  await gallery.click();

  // now the large image elements will be on the DOM
  const imageElements = await driver.findElements(
    By.css('.gallery.big .slide img')
  );
  const sourceUrlDups = await Promise.all(
    imageElements.map(async (img) => await img.getAttribute('src'))
  );
  const sourceUrls = [...new Set(sourceUrlDups)];

  // base images folder, skips if already created
  await createDirectory(IMAGE_DIRECTORY_PATH);
  // per-post image folder
  await createDirectory(`${IMAGE_DIRECTORY_PATH}/${titleHash}`);

  // images are downloaded to desktop
  Promise.all(
    sourceUrls.map(async (url, i) => {
      try {
        const localImagePath = `${IMAGE_DIRECTORY_PATH}/${titleHash}/image_${i + 1}.jpg`;
        await downloadImage(url, localImagePath);
        localImagePaths.push(localImagePath);
        console.log(
          `File ${i + 1} of ${sourceUrls.length} downloaded successfully`
        );
      } catch (e) {
        console.error(
          `Encountered an error while downloading one of the image files: ${e.message}`
        );
      }
    })
  );

  const closeGalleryButton = await driver.findElement(By.className('lbclose'));
  await closeGalleryButton.click();

  return localImagePaths;
};

export const getPostingBody = async () =>
  getTextFromElement(By.id('postingbody'));

export const getPostingTitle = async () =>
  getTextFromElement(By.id('titletextonly'));

export const getPostingPrice = async () => {
  const price = await getTextFromElement(By.css('.postingtitletext .price'));
  return price.slice(1); // remove the $ sign
};

export const getManufacturer = async () =>
  getTextFromElement(
    By.xpath(
      "//p[contains(@class, 'attrgroup')]/span[contains(text(), 'make / manufacturer:')]/b"
    )
  );

export const getCondition = async () =>
  getTextFromElement(
    By.xpath(
      "//p[contains(@class, 'attrgroup')]/span[contains(text(), 'condition:')]/b"
    )
  );

export const getCategory = async () =>
  getTextFromElement(By.css('.crumb.category'));

export const clickNewPostButton = async () => {
  const newPostButton = await driver.findElement(
    By.css("button[type='submit'][value='go']")
  );
  await newPostButton.click();
  await waitForPageLoad();
};

export const selectCity = async (cityLabel = CITY) => {
  await selectRadio(cityLabel);
};

export const selectForSaleByOwner = async (
  forSaleByOwnerLabel = FOR_SALE_BY_OWNER
) => {
  await selectRadio(forSaleByOwnerLabel);
};

export const selectCategory = async (category: string) => {
  await selectRadio(category);
};

export const selectRadio = async (labelText: string) => {
  let radio;

  try {
    radio = await driver.findElement(
      By.xpath(`//label[contains(text(), '${labelText}')]`)
    );
  } catch (e) {
    radio = await driver.findElement(
      By.xpath(`//label//span[contains(text(), '${labelText}')]`)
    );
  }
  await radio.click();
};

export const setTitle = async (title: string) => {
  await setInputField(By.id('PostingTitle'), title);
};

export const setPrice = async (price: string) => {
  await setInputField(By.css("input[type='number'][name='price']"), price);
};

export const setNeighborhood = async (neighborhood: string) => {
  await setInputField(By.id('geographic_area'), neighborhood);
};

export const setZipCode = async (zipCode: string) => {
  await setInputField(By.id('postal_code'), zipCode);
};

export const setBody = async (postingBody: string) => {
  await setInputField(By.id('PostingBody'), postingBody);
};

export const setManufacturer = async (manufacturer: string) => {
  await setInputField(
    By.css("input[type='text'][name='sale_manufacturer']"),
    manufacturer
  );
};

export const setCondition = async (condition: string) => {
  const conditionDropdown = await driver.findElement(
    By.css('label.condition span.ui-selectmenu-button')
  );
  await conditionDropdown.click();
  const conditionOption = await driver.findElement(
    By.xpath(
      `//li[contains(@class, 'ui-menu-item') and contains(text(), '${condition}')]`
    )
  );
  await conditionOption.click();
};

export const setPhoneNumber = async (phoneNumber: string, contactName: string) => {
  if (!phoneNumber || !contactName) return;

  const phoneNumberCheckbox = await driver.findElement(
    By.css("input[type='checkbox'][name='show_phone_ok']")
  );
  await phoneNumberCheckbox.click();

  const smsCheckbox = await driver.findElement(
    By.css("input[type='checkbox'][name='contact_text_ok']")
  );
  await smsCheckbox.click();

  const phoneNumberField = await driver.findElement(
    By.css("input[type='tel'][name='contact_phone']")
  );
  await phoneNumberField.sendKeys(phoneNumber);

  const contactNameField = await driver.findElement(
    By.css("input[type='text'][name='contact_name']")
  );
  await contactNameField.sendKeys(contactName);
};

export const completeDetailsForm = async (postInfo: PostInfo) => {
  const {
    body,
    price,
    title,
    neighborhood,
    zipCode,
    manufacturer,
    condition,
    phoneNumber,
    name,
  } = postInfo;

  await setTitle(title);
  await setPrice(price);
  await setNeighborhood(neighborhood);
  await setZipCode(zipCode);
  await setBody(body);
  await setPhoneNumber(phoneNumber, name);

  if (manufacturer) await setManufacturer(manufacturer);
  if (condition) await setCondition(condition);

  debugger;

  await clickSubmit();
  await waitForPageLoad();
};

export const uploadImages = async (imagePaths: string[]) => {
  const imageUploadInput = await driver.findElement(
    By.css("input[type='file'][multiple][accept]")
  );

  for (const path of imagePaths) {
    await imageUploadInput.sendKeys(path);
  }

  // wait until all images have been uploaded
  const customExpectedCondition = async () => {
    const images = await driver.findElements(
      By.css("figure.imgbox[id^='imgID']")
    );
    return images.length === imagePaths.length;
  };
  await driver.wait(customExpectedCondition, IMAGE_LOADING_DELAY_TIME);

  await clickSubmit();
};

export const clickSubmit = async () => {
  let button;

  try {
    button = await driver.findElement(
      By.css("button.bigbutton[type='submit']")
    );
  } catch (error) {
    button = await driver.findElement(
      By.css("button.big-button[type='submit']")
    );
  }
  await button.click();
  await waitForPageLoad();
};

export const cleanupImages = () => {
  fs.rmSync(IMAGE_DIRECTORY_PATH, { recursive: true, force: true });
};
