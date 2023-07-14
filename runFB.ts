import './dotenv.js';
import { WebElement, Builder, Capabilities } from 'selenium-webdriver';

import { DEFAULT_TEST_TIMEOUT, HUMAN_DELAY_TIME } from './constants.js';
import { relistAllActivePostings as relistAllActiveFBPostings } from './utils/facebook/index.js';

const { PRICE_DROP } = process.env;

const chromeCapabilities = Capabilities.chrome();
const chromeOptions = {
  args: ['--disable-notifications', '--disable-plugins', '--start-maximized'],
};
chromeCapabilities.set('goog:chromeOptions', chromeOptions);
global.driver = new Builder().withCapabilities(chromeCapabilities).build();

// FB Relister

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

describe('FB Relister', async () => {
  it('should relist all active postings', async () => {
    await relistAllActiveFBPostings(PRICE_DROP);
    driver.quit();
  }).timeout(DEFAULT_TEST_TIMEOUT);
});
