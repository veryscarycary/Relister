import './dotenv.js';
import { WebElement, Builder, Capabilities } from 'selenium-webdriver';

import { DEFAULT_TEST_TIMEOUT, HUMAN_DELAY_TIME } from './constants.js';
import { relistAllActivePostings } from './utils/craigslist/index.js';

const { PRICE_DROP } = process.env;

const chromeCapabilities = Capabilities.chrome();
const chromeOptions = {
  args: ['--disable-notifications', '--disable-plugins', '--start-maximized'],
};
chromeCapabilities.set('goog:chromeOptions', chromeOptions);
global.driver = new Builder().withCapabilities(chromeCapabilities).build();

// Craiglist Relister

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

describe('CL Relister', () => {
  it('should relist all active postings', async () => {
    await relistAllActivePostings(PRICE_DROP);

    driver.quit();
  }).timeout(DEFAULT_TEST_TIMEOUT);
});
