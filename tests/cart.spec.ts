
import { test, expect } from '../fixture/baseFixture';
import { InventoryPage } from '../Pages/inventoryPage';
import { CartPage } from '../Pages/cartpage';

test.describe('Cart Tests', () => {

    // Navigate before every test
    test.beforeEach(async ({ loggedInPage }) => {
        await loggedInPage.goto('/inventory.html');
    });

    // Test 1: Verify product is added to cart
    test('Verify product is added to cart', async ({ loggedInPage }) => {

        const inventory = new InventoryPage(loggedInPage);
        const cart = new CartPage(loggedInPage);

        const productName = 'Sauce Labs Backpack';

        await inventory.addFirstProductToCart(productName);

        await loggedInPage.locator('.shopping_cart_link').click();

        await expect(
            loggedInPage.locator('.cart_item')
        ).toHaveCount(1);

        await expect(
            loggedInPage.locator('.inventory_item_name')
        ).toHaveText(productName);

    });

    // Test 2: Verify Remove button functionality
    test('Verify product can be removed from cart', async ({ loggedInPage }) => {

        const inventory = new InventoryPage(loggedInPage);
        const cart = new CartPage(loggedInPage);

        const productName = 'Sauce Labs Backpack';

        await inventory.addFirstProductToCart(productName);

        await loggedInPage.locator('.shopping_cart_link').click();

        await cart.removeProduct(productName);

        await expect(
            loggedInPage.locator('.cart_item')
        ).toHaveCount(0);

        await expect(
            loggedInPage.locator('.shopping_cart_badge')
        ).toHaveCount(0);

    });

});
