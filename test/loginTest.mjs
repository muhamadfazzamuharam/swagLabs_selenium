import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { LoginPage } from '../pages/loginPage.mjs';
import { AuthHelper } from '../helper/AuthHelper.mjs';
import { config } from '../config/config.mjs';

describe('Login Page Test', function () {
  this.timeout(20000);

  let driver;
  let loginPage;

  before(async function () {
    const options = new chrome.Options();
    options.addArguments('--incognito', '--start-maximized');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  beforeEach(async function () {
    await driver.get(config.base_url);
    loginPage = new LoginPage(driver);
    await loginPage.validatePage(config.base_url);
  });

  after(async function () {
    await driver.quit();
  });

  it('Login with valid credential', async function () {
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.validatePage(`${config.base_url}/inventory`);
    await AuthHelper.logout(driver);
  });

  it('Login with empty username', async function () {
    await loginPage.login('', 'secret_sauce');
    await loginPage.validateErrorMessage('Epic sadface: Username is required');
  });

  it('Login with empty password', async function () {
    await loginPage.login('standard_user', '');
    await loginPage.validateErrorMessage('Epic sadface: Password is required');
  });

  it('Login with wrong username', async function () {
    await loginPage.login('user', 'secret_sauce');
    await loginPage.validateErrorMessage(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  it('Login with wrong password', async function () {
    await loginPage.login('standard_user', 'secret');
    await loginPage.validateErrorMessage(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  it('Login with locked out user', async function () {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.validateErrorMessage(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});
