import axios from 'axios';
import { NoSuchElementError } from 'selenium-webdriver/lib/error.js';
import fs from 'fs';
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

async function downloadImage(url, filepath) {
  debugger;
  const writer = fs.createWriteStream(filepath);

  console.log(`Downloading ${filepath.split('/').pop()}`);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
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

async function getTextFromElement(by) {
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
}

export {
  createDirectory,
  downloadImage,
  waitForPageLoad,
  getTextFromElement,
};
