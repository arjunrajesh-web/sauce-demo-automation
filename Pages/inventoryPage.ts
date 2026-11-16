
import { Page } from '@playwright/test';

export class InventoryPage {

    constructor(private page: Page) {}

    // Locators
    private get firstItem() {
        return this.page.locator('.inventory_item').first();
    }

    private get sortDropdown() {
        return this.page.getByRole('combobox', { name: 'Sort products' })
    }

    // Get first product name
    async getFirstProductName(): Promise<string> {
        return (await this.firstItem
            .locator('.inventory_item_name')
            .innerText()).trim();
    }

    // Add first product to cart
    async addFirstProductToCart(productName: string) {

        const product = this.page
            .locator('.inventory_item')
            .filter({
                has: this.page.getByText(productName, { exact: true })
            });

        await product.getByRole('button', {
            name: 'Add to cart'
        }).click();
    }

    // Sort products
    async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(option);
    }

    // Get all product names
    async getProductNames(): Promise<string[]> {

        return await this.page
            .locator('.inventory_item_name')
            .allTextContents();
    }

    // Get all product prices
    async getProductPrices(): Promise<number[]> {

        const prices = await this.page
            .locator('.inventory_item_price')
            .allTextContents();

        return prices.map(price =>
            Number(price.replace('$', '').trim())
        );
    }

}
