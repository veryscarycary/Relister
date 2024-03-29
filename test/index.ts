import '../dotenv.js';
import { WebElement, Builder, Capabilities } from 'selenium-webdriver';

import { DEFAULT_TEST_TIMEOUT, HUMAN_DELAY_TIME } from '../constants.js';
import { relistAllActivePostings } from '../utils/craigslist/index.js';
import { relistAllActivePostings as relistAllActiveFBPostings } from '../utils/facebook/index.js';
import { createNewPosting } from '../utils/facebook/flows.js';
import posts from '../posts.js';

const { PRICE_DROP } = process.env;

const chromeCapabilities = Capabilities.chrome();
const chromeOptions = {
  args: ['--disable-notifications', '--disable-plugins', '--start-maximized'],
};
chromeCapabilities.set('goog:chromeOptions', chromeOptions);
global.driver = new Builder()
  .withCapabilities(chromeCapabilities)
  .build();

// SD Craiglist Relist

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

describe('Relister', async () => {
  // describe('CL', () => {
  //   it('should relist all active postings', async () => {
  //     await relistAllActivePostings(PRICE_DROP);

  //     driver.quit();
  //   }).timeout(DEFAULT_TEST_TIMEOUT);
  // });

  describe('FB', async () => {
    // it('should create a new post', async () => {
    //   const post = posts[0];
    //   await createNewPosting(post);
    //   driver.quit();
    // }).timeout(DEFAULT_TEST_TIMEOUT);

    it('should relist all active postings', async () => {
      await relistAllActiveFBPostings(PRICE_DROP);
      driver.quit();
    }).timeout(DEFAULT_TEST_TIMEOUT);
  });
});

