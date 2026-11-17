
import { Page } from '@playwright/test';

export class CheckoutPage {

    constructor(private page: Page) {}

    // Locators
    private get firstNameInput() {
        return this.page.locator('[data-test="firstName"]');
    }

    private get lastNameInput() {
        return this.page.locator('[data-test="lastName"]');
    }

    private get postalCodeInput() {
        return this.page.locator('[data-test="postalCode"]');
    }

    private get continueButton() {
        return this.page.getByRole('button', { name: 'Continue' });
    }

    // Fill checkout information
    async fillCheckoutInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    // Click Continue
    async clickContinue() {
        await this.continueButton.click();
    }
}
