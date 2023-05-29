import { WebDriver } from "selenium-webdriver";

export interface CustomNodeJsGlobal extends NodeJS.Global {
  // You can declare anything you need.
  driver: WebDriver;
}
