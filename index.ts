import './dotenv.js';
import { WebElement, Builder, Capabilities } from 'selenium-webdriver';

import { HUMAN_DELAY_TIME } from './constants.js';
import { relistAllActivePostings } from './utils/craigslist/index.js';
import { login } from './utils/facebook/helpers.js';

global.driver = new Builder()
  .withCapabilities(Capabilities.chrome())
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

// describe('CL', () => {
//   it('should relist all active postings', async () => {
//     await relistAllActivePostings();

//     driver.quit();
//   }).timeout(900000);
// });

describe('FB', () => {
  it('should relist all active postings', async () => {
    debugger;
    await login();

    driver.quit();
  }).timeout(900000);
});
