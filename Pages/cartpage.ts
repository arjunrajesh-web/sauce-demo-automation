
import { Page } from '@playwright/test';

export class CartPage {

    constructor(private page: Page) {}

    // Locators
    private get cartItems() {
        return this.page.locator('.cart_item');
    }

    private get cartBadge() {
        return this.page.locator('.shopping_cart_badge');
    }

    // Check product name in cart
    async getCartProductNames(): Promise<string[]> {
        return await this.page
            .locator('.inventory_item_name')
            .allTextContents();
    }

    // Remove product from cart
    async removeProduct(productName: string) {

        const product = this.cartItems.filter({
            hasText: productName
        });

        await product.getByRole('button', {
            name: 'Remove'
        }).click();
    }

    // Get cart item count
    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    // Get cart badge count
    async getCartBadgeCount(): Promise<number> {
        if (await this.cartBadge.count() === 0) {
            return 0;
        }

        return Number(await this.cartBadge.innerText());
    }
}
