import { By, until } from 'selenium-webdriver';
import { BasePage } from './basePage.mjs';
import { AuthHelper } from '../helper/AuthHelper.mjs';
import expect from 'expect.js';
import { config } from '../config/config.mjs';
import _ from 'lodash';

export class InventoryPage extends BasePage {
  constructor(driver) {
    super(driver);
  }

  async navigateToInventoryPage() {
    const username = 'standard_user';
    const password = 'secret_sauce';
    await AuthHelper.login(this.driver, username, password);
    await this.waitForUrl(`${config.base_url}/inventory`);
    const expectedUrl = `${config.base_url}/inventory`;
    await this.validatePage(expectedUrl);
  }

  async getInventoryItems() {
    return await this.waitforElements(By.css('[data-test="inventory-item"]'));
  }

  async addProductsByIndexes(productIndexes) {
    for (const index of productIndexes) {
      const addToCartButton = By.css(
        `[data-test="inventory-item"]:nth-child(${index + 1}) [data-test^="add-to-cart"]`
      );
      await this.click(addToCartButton);
    }
  }

  async validateCartBadgeCount(expectedCount) {
    const cartBadge = By.css('[data-test="shopping-cart-badge"]');
    const actualCount = await this.getText(cartBadge);
    expect(actualCount).eql(String(expectedCount));
  }
}
