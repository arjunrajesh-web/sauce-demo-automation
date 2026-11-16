
import { Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

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

    async navigateToLoginPage() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {

        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();

    }
}
