import { Builder } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome.js';
import { config } from '../config/config.mjs';
import { InventoryPage } from "../pages/inventoryPage.mjs";

describe('Inventory Page Test', function () {
    let options = new chrome.Options();
    options.addArguments('--incognito', '--start-maximized');
    
    let driver;
    let inventoryPage;
    
    before(async () => {
        driver = new Builder().forBrowser('chrome').setIeOptions(options).build(); 
    });

    beforeEach(async () => {
        await driver.get(config.base_url);
        inventoryPage = new InventoryPage(driver);
        await inventoryPage.navigateToInventoryPage();
    });

    after(async () => {
        await driver.quit();    
    });

    it('Add multiple products to the cart', async () => {
        await inventoryPage.addProductToCart();
        await inventoryPage.validateCartBadgeCount('1');
    });
});