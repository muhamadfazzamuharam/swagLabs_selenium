import { Builder } from 'selenium-webdriver';
import { LoginPage } from '../pages/loginPage.mjs';
import chrome from 'selenium-webdriver/chrome.js';
import { config } from '../config/config.mjs';

describe('Login Page Test', function () {
    this.timeout(20000);
    let options;
    let driver;
    let loginPage;

    before(async function () {
        options = new chrome.Options();
        options.addArguments('--incognito', '--start-maximized');
        
        driver = await new Builder()
            .forBrowser('chrome').setChromeOptions(options).build();
    });

    beforeEach(async function () {
        await driver.get(config.base_url);
        loginPage = new LoginPage(driver);
        await loginPage.validatePage(config.base_url);
    });

    after(async function () {
        await driver.quit();
    });

    it('1. Test login with valid credential', async function () {
        const username = 'standard_user';
        const password = 'secret_sauce';
        
        await loginPage.login(username, password);
        const expectedUrl = `${config.base_url}/inventory`;
        await loginPage.validatePage(expectedUrl);

        await loginPage.logout();
    });

    it('2. Test login with empty username', async function () {
        const username = '';
        const password = 'secret_sauce';
        await loginPage.login(username, password);
        
        const expectedErrorMessage = 'Epic sadface: Username is required';
        await loginPage.validateErrorMessage(expectedErrorMessage);
    });

    it('3. Test login with empty password', async function () {
        const username = 'standard_user';
        const password = '';
        await loginPage.login(username, password);
        
        const expectedErrorMessage = 'Epic sadface: Password is required';
        await loginPage.validateErrorMessage(expectedErrorMessage);
    });

    it('4. Test login with wrong username', async function () {
        const username = 'user';
        const password = 'secret_sauce';
        await loginPage.login(username, password);
        
        const expectedErrorMessage = 'Epic sadface: Username and password do not match any user in this service';
        await loginPage.validateErrorMessage(expectedErrorMessage);
    });

    it('5. Test login with wrong password', async function () {
        const username = 'standard_user';
        const password = 'secret';
        await loginPage.login(username, password);
        
        const expectedErrorMessage = 'Epic sadface: Username and password do not match any user in this service';
        await loginPage.validateErrorMessage(expectedErrorMessage);
    });

    it('6. Test login with locked out user', async function () {
        const username = 'locked_out_user';
        const password = 'secret_sauce';
        await loginPage.login(username, password);
        
        const expectedErrorMessage = 'Epic sadface: Sorry, this user has been locked out.';
        await loginPage.validateErrorMessage(expectedErrorMessage);
    });
});
