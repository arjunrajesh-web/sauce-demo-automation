
import { test, expect } from '../fixture/baseFixture';
import { InventoryPage } from '../Pages/inventoryPage';

test('Add first product to cart', async ({loggedInPage}) => {

    const inventory = new InventoryPage(loggedInPage);

    await loggedInPage.goto('/inventory.html');

    await inventory.addFirstProductToCart('Sauce Labs Backpack');

    await expect(
        loggedInPage.locator('.shopping_cart_badge')
    ).toHaveText('1');

});
