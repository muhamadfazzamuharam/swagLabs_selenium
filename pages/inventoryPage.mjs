import { By } from 'selenium-webdriver';
import { BasePage } from './basePage.mjs';
import { AuthHelper } from '../helper/AuthHelper.mjs';
import expect from 'expect.js';
import { config } from '../config/config.mjs';

export class InventoryPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.addToCartButton = By.css('[data-test^="add-to-cart"]');
    this.cartBadge = By.css('[data-test="shopping-cart-badge"]');
  };

  async navigateToInventoryPage() {
    const username = 'standard_user';
    const password = 'secret_sauce';
    await AuthHelper.login(this.driver, username, password);
    await this.waitForUrl(`${config.base_url}/inventory`);
    const expectedUrl = `${config.base_url}/inventory`;
    await this.validatePage(expectedUrl);
  };

  async addProductToCart() {
    await this.click(this.addToCartButton);
  };

  async validateCartBadgeCount(expectedCount) {
    const actualCount = await this.getText(this.cartBadge);
    expect(actualCount).eql(String(expectedCount));
  };
};
