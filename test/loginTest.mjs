import { By, Builder, until } from 'selenium-webdriver';
import expect from 'expect.js';

const url = 'https://www.saucedemo.com';

describe('Login Page Test', function () {
    this.timeout(20000);
    let driver;

    before(async function () {
        driver = await new Builder()
            .forBrowser('chrome')
            .build();

        await driver.get(url);
    });

    after(async function () {
        await driver.quit();
    });

    it('Login successfully!', async function () {

        const locators = [
            By.id('user-name'),
            By.id('password'),
            By.id('login-button')
        ];

        const elements = [];
        for (const locator of locators) {
            const el = await driver.wait(
                until.elementLocated(locator),
                5000
            );
            elements.push(el);
        }

        await elements[0].sendKeys('standard_user');
        await elements[1].sendKeys('secret_sauce');
        await elements[2].click();

        await driver.wait(until.urlContains('/inventory'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.contain('/inventory');
    });
});
