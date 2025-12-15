import { Builder, until } from 'selenium-webdriver';
import expect from 'expect.js';
import { LoginPage } from '../pages/loginPage.mjs';
import { AlertHelper } from '../helper/alertHelper.mjs';
import chrome from 'selenium-webdriver/chrome.js';


describe('Login Page Test', function () {
    this.timeout(20000);
    let options;
    let driver;
    let loginPage;
    const url = 'https://www.saucedemo.com';

    before(async function () {
        options = new chrome.Options();
        options.addArguments('--incognito');
        
        driver = await new Builder()
            .forBrowser('chrome').setChromeOptions(options).build();
        loginPage = new LoginPage(driver);
    });

    beforeEach(async function () {
        await driver.get(url);
        await loginPage.validatePage(url);
    });

    after(async function () {
        await driver.quit();
    });

    it('Login with valid credential', async function () {
        const username = 'standard_user';
        const password = 'secret_sauce';
        
        await loginPage.login(username, password);
        const expectedUrl = `${url}/inventory`;
        await loginPage.validatePage(expectedUrl);

        await loginPage.logout();
    });

    it('Login with invalid credential (empty username)', async function () {
        const username = '';
        const password = 'secret_sauce';
        await loginPage.login(username, password);
        
        const expectedErrorMessage = 'Epic sadface: Username is required';
        await loginPage.validateErrorMessage(expectedErrorMessage);
    });
});
