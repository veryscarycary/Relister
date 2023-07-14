import axios from 'axios';
import { NoSuchElementError } from 'selenium-webdriver/lib/error.js';
import fs from 'fs';
import { By, WebElement } from 'selenium-webdriver';
import { DEFAULT_ELEMENT_TIMEOUT } from '../constants.js';
import { PostInfo } from './types.js';
const promiseFs = fs.promises;

export class NoActivePostingsFoundError extends Error {
  constructor(message = '', ...args: any) {
    super(message, ...args);
  }
}

async function createDirectory(directoryName = __dirname) {
  try {
    await promiseFs.mkdir(directoryName);
    console.log(`Directory ${directoryName} created successfully`);
  } catch (err) {
    if (err.code === 'EEXIST')
      console.info('Directory already exists. Will proceed using this directory...');
    else
      console.error(err);
  }
}

async function downloadImage(url: string, filepath: string) {
  const writer = fs.createWriteStream(filepath);

  console.log(`Downloading ${filepath.split('/').pop()}`);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise<void>((resolve, reject) => {
    writer.on('finish', () => {
      resolve();
    });
    writer.on('error', (err) => {
      console.error(err.message);
      reject();
    });
  });
}

async function downloadImages(
  sourceUrls: string[],
  filepath: string,
  titleHash: string,
) {
  const localImagePaths: string[] = [];

  // base image folder
  await createDirectory(filepath);
  // per-post image folder
  await createDirectory(`${filepath}/${titleHash}`);

  // images are downloaded to desktop
  await Promise.all(
    sourceUrls.map(async (url: string, i: number) => {
      try {
        const localImagePath = `${filepath}/${titleHash}/image_${i + 1}.jpg`;
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

  return localImagePaths;
}

async function waitForPageLoad() {
  await driver.wait(() => {
    return driver
      .executeScript('return document.readyState')
      .then(function (readyState) {
        return readyState === 'complete';
      });
  });
}

async function getTextFromElement(by: By) {
  let element;
  let elementText;

  try {
    element = await driver.findElement(by);
  } catch (error) {
    if (error instanceof NoSuchElementError)
      console.error(error.message);
  }

  if (element) {
    elementText = await element.getText();
    return elementText.trim();
  }

  return null;
};

async function getValueFromElement(by: By) {
  let element;
  let elementValue;

  try {
    element = await waitForElement(by);
  } catch (error) {
    if (error instanceof NoSuchElementError)
      console.error(error.message);
  }

  if (element) {
    elementValue = await element.getAttribute('value');
    return elementValue.trim();
  }

  return null;
};

async function waitForElement(by: By, timeout: number = DEFAULT_ELEMENT_TIMEOUT): Promise<WebElement> {
  let element;
  const checkForOptions = async () => {
    try {
      element = await driver.findElement(by);
    } catch (err) {
      return false;
    }
    return true;
  };
  await driver.wait(checkForOptions, timeout);

  if (!element) throw new NoSuchElementError(`The selector: ${by.toString()} did not locate an element within the time.`);

  return element;
}

async function waitForElements(by: By, timeout: number = DEFAULT_ELEMENT_TIMEOUT): Promise<WebElement[]> {
  let elements;
  const checkForOptions = async () => {
    try {
      elements = await driver.findElements(by);
    } catch (err) {
      return false;
    }
    return true;
  };
  await driver.wait(checkForOptions, timeout);
  return elements;
}

const setInputField = async (by: By, value: string) => {
  const inputField = await driver.findElement(by);
  await inputField.sendKeys(value);
};

const dropPrice = (post: PostInfo, priceDrop: string) => {
  const roundToNearest5 = (num: number) => Math.ceil(num / 5) * 5;

  let price;
  let newPrice;

  if (post.price.startsWith('$')) {
    price = Number(post.price.slice(1));
  } else {
    price = Number(post.price);
  }

  if (priceDrop.endsWith('%')) {
    // percent drop
    const percentNum = Number(priceDrop.slice(0, priceDrop.length - 1)) / 100;
    const unroundedNewPrice = price * (1 - percentNum);
    newPrice = roundToNearest5(unroundedNewPrice);
  } else {
    // fixed drop
    const priceDropNum = Number(priceDrop);
    newPrice = price - priceDropNum;
  }

  const newPriceString = `${newPrice}`;

  return { ...post, price: newPriceString };
};

export {
  createDirectory,
  downloadImage,
  downloadImages,
  waitForPageLoad,
  getTextFromElement,
  getValueFromElement,
  setInputField,
  waitForElement,
  waitForElements,
  dropPrice,
};
