import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { config } from '../config/config.mjs';
import { InventoryPage } from '../pages/inventoryPage.mjs';
import _ from 'lodash';

describe('Inventory Page Test', function () {
  let driver;
  let inventoryPage;

  before(async () => {
    const options = new chrome.Options();
    options.addArguments('--incognito', '--start-maximized');

    driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  beforeEach(async () => {
    await driver.get(config.base_url);
    inventoryPage = new InventoryPage(driver);
    await inventoryPage.navigateToInventoryPage();
  });

  after(async () => {
    await driver.quit();
  });

  describe('', function () {
    it('Add random products to cart', async () => {
      const itemsToAddCount = _.sample([1, 2, 3, 4, 5, 6]);

      const totalProducts = await inventoryPage.getInventoryItems();
      const availableIndexes = [...Array(totalProducts.length).keys()];
      console.log(availableIndexes);

      const selectedIndexes = _.sampleSize(availableIndexes, itemsToAddCount);

      await inventoryPage.addProductsByIndexes(selectedIndexes);
      await inventoryPage.validateCartBadgeCount(itemsToAddCount);
    });
  });
});
