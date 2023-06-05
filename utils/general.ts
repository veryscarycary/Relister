import axios from 'axios';
import { NoSuchElementError } from 'selenium-webdriver/lib/error.js';
import fs from 'fs';
import { By } from 'selenium-webdriver';
const promiseFs = fs.promises;

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

const setInputField = async (by: By, value: string) => {
  const inputField = await driver.findElement(by);
  await inputField.sendKeys(value);
};

export {
  createDirectory,
  downloadImage,
  waitForPageLoad,
  getTextFromElement,
  setInputField,
};
