import { until } from 'selenium-webdriver';
import expect from 'expect.js';

export class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async waitForElement(locator, timeout = 5000) {
    return await this.driver.wait(until.elementLocated(locator), timeout);
  }

  async waitforElements(locator, timeout = 5000) {
    return await this.driver.wait(until.elementsLocated(locator), timeout);
  }

  async waitForUrl(url, timeout = 5000) {
    return await this.driver.wait(until.urlContains(url), timeout);
  }

  async click(locator) {
    const element = await this.waitForElement(locator);
    await this.driver.wait(until.elementIsVisible(element), 5000);
    await element.click();
  }

  async getText(locator) {
    const element = await this.waitForElement(locator);
    return await element.getText();
  }

  async validatePage(expectedUrl) {
    const actualUrl = await this.driver.getCurrentUrl();
    expect(actualUrl).contain(expectedUrl);
    this.driver.wait(until.stalenessOf);
  }
}
