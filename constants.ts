import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const { IMAGE_DIRECTORY } = process.env;

const __dirname = dirname(fileURLToPath(import.meta.url));

export const IMAGE_DIRECTORY_PATH = path.join(__dirname, IMAGE_DIRECTORY);
export const HUMAN_DELAY_TIME = 1000;
export const IMAGE_LOADING_DELAY_TIME = 60000;
export const DEFAULT_ELEMENT_TIMEOUT = 5000;
export const FOR_SALE_BY_OWNER = 'for sale by owner';

// Craigslist
export const SD_CRAIGLIST_ACCOUNT_URL =
  'https://accounts.craigslist.org/login?rp=%2Flogin%2Fhome&rt=L';
export const SD_CRAIGLIST_HOME_URL = 'https://accounts.craigslist.org/login/home';

// Facebook Marketplace
export const FACEBOOK_URL = 'https://facebook.com';
export const FACEBOOK_MARKETPLACE_CREATE_URL = 'https://facebook.com/marketplace/create/item';
export const FACEBOOK_MARKETPLACE_SELLING_URL = 'https://www.facebook.com/marketplace/you/selling';
