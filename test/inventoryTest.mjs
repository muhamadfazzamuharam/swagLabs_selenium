import { Builder } from "selenium-webdriver";
import { InventoryPage } from "../pages/inventoryPage.mjs";
import chrome from 'selenium-webdriver/chrome.js';
import { config } from '../config/config.mjs';

describe('Inventory Page Test', function () {
    let options = new chrome.Options();
    options.addArguments('--incognito', '--start-maximized');
    let driver;
    let inventoryPage = new InventoryPage();

    before(async () => {
        driver = new Builder().forBrowser('chrome').setIeOptions(options).build(); 
    });

    this.beforeEach(async () => {
        await driver.get(config.base_url);
        await inventoryPage.navigateToInventoryPage();
    });

    after(async () => {
        await driver.quit(); 
    });

    it('Test', async () => {
        
    });
});