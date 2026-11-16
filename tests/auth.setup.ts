
import { test as setup, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { LoginPage } from '../Pages/LoginPage';

const authDir = path.join(__dirname, '..', 'auth');
const authFile = path.join(authDir, 'storageState.json');

fs.mkdirSync(authDir, { recursive: true });

const username = process.env.DEMO_USER;
const password = process.env.DEMO_PASS;

if (!username || !password) {
    throw new Error('Login credentials are missing');
}

setup('authenticate and save session', async ({ page, context }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);

    await expect(page).toHaveURL(/inventory\.html/);

    // Save login session
    await context.storageState({
        path: authFile
    });
});
