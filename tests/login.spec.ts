import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();

});

test('user login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/\/inventory\.html$/);

    await expect(
        page.getByText('Products', { exact: true })
    ).toBeVisible();

});