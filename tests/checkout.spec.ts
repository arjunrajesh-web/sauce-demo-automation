
import { test, expect } from '../fixture/baseFixture';
import { InventoryPage } from '../Pages/inventoryPage';
import { CheckoutPage } from '../Pages/checkoutPage';
import { CheckoutOverviewPage } from '../Pages/checkoutOverview';

test.describe('Checkout Tests', () => {

    test.beforeEach(async ({ loggedInPage }) => {
        await loggedInPage.goto('/inventory.html');
    });

    test('Verify checkout information', async ({ loggedInPage }) => {

        const inventory = new InventoryPage(loggedInPage);
        const checkout = new CheckoutPage(loggedInPage);

        await test.step('Add product to cart', async () => {
            await inventory.addFirstProductToCart('Sauce Labs Backpack');
        });

        await test.step('Open shopping cart', async () => {
            await loggedInPage.locator('.shopping_cart_link').click();
        });

        await test.step('Click checkout button', async () => {
            await loggedInPage.getByRole('button', {
                name: 'Checkout'
            }).click();
        });

        await test.step('Fill checkout information', async () => {
            await checkout.fillCheckoutInformation(
                'checkout.firstName',
                'checkout.lastName',
                'checkout.postalCode'
            );
        });

        await test.step('Click continue button', async () => {
            await checkout.clickContinue();
        });

        await test.step('Verify checkout overview page', async () => {
            await expect(loggedInPage).toHaveURL(/checkout-step-two.html/);
        });

        await test.step('Verify checkout price calculation', async () => {

            const overview = new CheckoutOverviewPage(loggedInPage);

            // Calculate expected subtotal from product prices
            const expectedSubtotal =
                await overview.getProductSubtotalInCents();

            // Calculate expected tax (8%)
            const expectedTax = Math.round(expectedSubtotal * 0.08);

            // Calculate expected final total
            const expectedTotal = expectedSubtotal + expectedTax;

            // Verify item subtotal
            expect(
                await overview.getDisplayedSubtotalInCents()
            ).toBe(expectedSubtotal);

            // Verify tax
            expect(
                await overview.getDisplayedTaxInCents()
            ).toBe(expectedTax);

            // Verify final total
            expect(
                await overview.getDisplayedTotalInCents()
            ).toBe(expectedTotal);

        });

        await test.step('Click Finish button', async () => {

            await loggedInPage.getByRole('button', {
                name: 'Finish'
            }).click();

        });

        await test.step('Verify Thank You page URL', async () => {

            await expect(loggedInPage)
                .toHaveURL(/checkout-complete.html/);

        });

        await test.step('Verify Thank You message', async () => {

            await expect(loggedInPage.locator('.complete-header'))
                .toHaveText('Thank you for your order!');

        });

    });



});


