
import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {

    constructor(private page: Page) {}

    // Product prices
    private get productPrices() {
        return this.page.locator('.cart_item .inventory_item_price');
    }

      private get thankYouMessage() {
        return this.page.locator('.complete-header');
    }

      // Get confirmation message
    async getThankYouMessage(): Promise<string> {
        return (await this.thankYouMessage.innerText()).trim();
    }


    // Price summary locators
    private get itemTotal() {
        return this.page.locator('.summary_subtotal_label');
    }

    private get tax() {
        return this.page.locator('.summary_tax_label');
    }

    private get total() {
        return this.page.locator('.summary_total_label');
    }

    // Convert displayed price into cents
    private async getAmountInCents(locator: Locator): Promise<number> {

        const text = await locator.innerText();

        const match = text.match(/\$([\d.]+)/);

        if (!match) {
            throw new Error(`Price not found in: ${text}`);
        }

        return Math.round(Number(match[1]) * 100);
    }

    // Calculate subtotal from individual product prices
    async getProductSubtotalInCents(): Promise<number> {

        const prices = await this.productPrices.allTextContents();

        return prices.reduce((sum, price) => {

            const amount = Number(price.replace('$', '').trim());

            return sum + Math.round(amount * 100);

        }, 0);
    }

    // Get displayed item total
    async getDisplayedSubtotalInCents(): Promise<number> {
        return this.getAmountInCents(this.itemTotal);
    }

    // Get displayed tax
    async getDisplayedTaxInCents(): Promise<number> {
        return this.getAmountInCents(this.tax);
    }

    // Get displayed final total
    async getDisplayedTotalInCents(): Promise<number> {
        return this.getAmountInCents(this.total);
    }
}
