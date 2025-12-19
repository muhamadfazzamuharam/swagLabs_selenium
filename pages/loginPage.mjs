import { By, until } from 'selenium-webdriver';
import expect from 'expect.js';
import { BasePage } from './basePage.mjs';

export class LoginPage {
  constructor(driver) {
    if (!driver) {
      throw new Error('Driver is undefined in LoginPage');
    };
    this.driver = driver;
  };

  async validatePage(expectedUrl) {
    const actualUrl = await this.driver.getCurrentUrl();
    expect(actualUrl).contain(expectedUrl);
  };

  async inputUsername(username) {
    const usernameInput = await this.driver.wait(
      until.elementLocated(By.id('user-name')),
      5000
    );
    await usernameInput.clear();
    await usernameInput.sendKeys(username);
  };

  async inputPassword(password) {
    const passwordInput = await this.driver.wait(
      until.elementLocated(By.id('password')),
      5000
    );
    await passwordInput.clear();
    await passwordInput.sendKeys(password);
  };

  async clickLoginButton() {
    const loginButton = await this.driver.wait(
      until.elementLocated(By.id('login-button')),
      5000
    );
    await loginButton.click();
  };

  async login(username, password) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLoginButton();
  };

  async logout() {
    const hamburgerMenu = await this.driver.wait(
      until.elementLocated(By.id('react-burger-menu-btn')),
      5000
    );
    await this.driver.wait(until.elementIsVisible(hamburgerMenu), 5000);
    await hamburgerMenu.click();

    const logoutButton = await this.driver.wait(
      until.elementLocated(By.id('logout_sidebar_link')),
      5000
    );
    await this.driver.wait(until.elementIsVisible(logoutButton), 5000);
    await logoutButton.click();
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
