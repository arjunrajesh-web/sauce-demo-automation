
import { Page } from '@playwright/test';
import userData from '../data/user.json';

export class LoginPage {

    constructor(private page: Page) {}

    // Locators
    private get username() {
        return this.page.getByPlaceholder('Username');
    }

    private get password() {
        return this.page.getByPlaceholder('Password');
    }

    private get loginButton() {
        return this.page.getByRole('button', {
            name: 'Login'
        });
    }

    // Navigation
    async navigateToLoginPage() {
        await this.page.goto('/');
    }

    // Actions
    async login() {
        await this.username.fill(userData.standard_user.username);
        await this.password.fill(userData.standard_user.password);
        await this.loginButton.click();
    }
}
