import { By, until } from 'selenium-webdriver';
import expect from 'expect.js';
import { LoginPage } from './loginPage.mjs';
import { config } from '../config/config.mjs';

export class InventoryPage {
  constructor(driver) {
    this.driver = driver;
  };

  async navigateToInventoryPage() {
    const loginPage = new LoginPage(this.driver);
    const username = 'standard_user';
    const password = 'secret_sauce';
    await loginPage.login(username, password);
    await loginPage.validatePage(`${config.base_url}/inventory`);
  };

  async validateErrorMessage(expectedErrorMessage) {
    const errorField = await this.driver.wait(
      until.elementLocated(By.css('[data-test="error"]')),
      5000
    );
    const errorMessage = await errorField.getText();
    expect(errorMessage).eql(expectedErrorMessage);
  };
};
