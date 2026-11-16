
import { Page } from '@playwright/test';

export class InventoryPage {

    constructor(private page: Page) {}

    // Locators
    private get firstItem() {
        return this.page.locator('.inventory_item').first();
    }

    // Get product using product name
    getFirstProductName(productName: string) {
        return this.firstItem.filter({
            hasText: productName
        });
    }

    // Add product to cart
    async addFirstProductToCart(productName: string) {

        const product = this.getFirstProductName(productName);

        await product.getByRole('button', {
            name: 'Add to cart'
        }).click();
    }
}
