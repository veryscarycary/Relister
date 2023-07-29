import { expect } from 'chai';
import './dotenv.js';
import { WebElement, Builder, Capabilities } from 'selenium-webdriver';

import {
  DEFAULT_TEST_TIMEOUT,
  HUMAN_DELAY_TIME,
  SD_CRAIGLIST_HOME_URL,
} from './constants.js';

import { createNewPosting } from './utils/facebook/flows';
import { PostInfoFB } from './utils/types.js';

const {
  POST_JSON,
} = process.env;

const chromeCapabilities = Capabilities.chrome();
const chromeOptions = {
  args: ['--disable-notifications', '--disable-plugins', '--start-maximized'],
};
chromeCapabilities.set('goog:chromeOptions', chromeOptions);
global.driver = new Builder().withCapabilities(chromeCapabilities).build();

// Craiglist Post Creator

// monkey-patch delays
const originalSendKeys = WebElement.prototype.sendKeys;
WebElement.prototype.sendKeys = async function (...args) {
  await driver.sleep(HUMAN_DELAY_TIME); // Add a delay of 500 milliseconds before each sendKeys call
  return originalSendKeys.apply(this, args);
};
const originalClick = WebElement.prototype.click;
WebElement.prototype.click = async function (...args) {
  await driver.sleep(HUMAN_DELAY_TIME);
  return originalClick.apply(this, args);
};

describe('FB Post Creator', () => {
  it('should post a new CL posting', async () => {
    let postInfo;
    try {
       postInfo = JSON.parse(POST_JSON) as PostInfoFB;
    } catch(e) {
      const message = 'There was an error parsing the new post info JSON!';
      console.error(message);
      throw new Error(message);
    }

    await createNewPosting(postInfo);

    driver.quit();
  }).timeout(DEFAULT_TEST_TIMEOUT);
});
