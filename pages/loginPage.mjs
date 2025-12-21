// pages/loginPage.mjs
import { By } from 'selenium-webdriver';
import { BasePage } from './basePage.mjs';
import expect from 'expect.js';

export class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.usernameInput = By.id('user-name');
    this.passwordInput = By.id('password');
    this.loginButton = By.id('login-button');
    this.errorMessage = By.css('[data-test="error"]');
  };

  async login(username, password) {
    await this.click(this.usernameInput);
    await (await this.waitForElement(this.usernameInput)).sendKeys(username);

    await this.click(this.passwordInput);
    await (await this.waitForElement(this.passwordInput)).sendKeys(password);

    await this.click(this.loginButton);
  };

  async validateErrorMessage(expectedMessage) {
    const actualMessage = await this.getText(this.errorMessage);
    expect(actualMessage).eql(expectedMessage);
  };
}
