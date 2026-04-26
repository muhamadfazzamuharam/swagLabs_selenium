import { LoginPage } from '../pages/loginPage.mjs';
import { BasePage } from '../pages/basePage.mjs';
import { config } from '../config/config.mjs';
import { By } from 'selenium-webdriver';

export class AuthHelper {
  static async login(driver, username, password) {
    const loginPage = new LoginPage(driver);
    await loginPage.login(username, password);
  }

  static async logout(driver) {
    const basePage = new BasePage(driver);
    const hamburgerButton = By.id('react-burger-menu-btn');
    await basePage.click(hamburgerButton);

    const logoutButton = By.id('logout_sidebar_link');
    await basePage.click(logoutButton);
    await basePage.waitForUrl(config.base_url);
    await basePage.validatePage(config.base_url);
  }
}
