
import { test, expect } from '../fixture/baseFixture';
import { InventoryPage } from '../Pages/inventoryPage';

test.describe('Inventory Tests', () => {

    // Runs before every test
    test.beforeEach(async ({ loggedInPage }) => {

        await loggedInPage.goto('/inventory.html');

    });

    // Test 1: Add first product to cart
    test('Add first product to cart', async ({ loggedInPage }) => {

        const inventory = new InventoryPage(loggedInPage);

        await inventory.addFirstProductToCart('Sauce Labs Backpack');

        await expect(
            loggedInPage.locator('.shopping_cart_badge')
        ).toHaveText('1');

    });


    // Test 2: Sort products by Name A to Z
   test('Sort products by Name A to Z', async ({ loggedInPage }) => {

    const inventory = new InventoryPage(loggedInPage);

    await inventory.sortProducts('az');

    const actualNames = await inventory.getProductNames();

    const expectedNames = [...actualNames].sort((a, b) =>
        a.localeCompare(b)
    );

    expect(actualNames).toEqual(expectedNames);

});

    // Test 3: Sort products by Name Z to A
    test('Sort products by Name Z to A', async ({ loggedInPage }) => {

        const inventory = new InventoryPage(loggedInPage);

        await inventory.sortProducts('za');

        const actualNames = await inventory.getProductNames();

        const expectedNames = [...actualNames].sort((a, b) =>
            b.localeCompare(a)
        );

        expect(actualNames).toEqual(expectedNames);

    });


    // Test 4: Sort prices Low to High
    test('Sort prices Low to High', async ({ loggedInPage }) => {

        const inventory = new InventoryPage(loggedInPage);

        await inventory.sortProducts('lohi');

        const actualPrices = await inventory.getProductPrices();

        const expectedPrices = [...actualPrices].sort((a, b) => a - b);

        expect(actualPrices).toEqual(expectedPrices);

    });


    // Test 5: Sort prices High to Low
    test('Sort prices High to Low', async ({ loggedInPage }) => {

        const inventory = new InventoryPage(loggedInPage);

        await inventory.sortProducts('hilo');

        const actualPrices = await inventory.getProductPrices();

        const expectedPrices = [...actualPrices].sort((a, b) => b - a);

        expect(actualPrices).toEqual(expectedPrices);

    });

});
