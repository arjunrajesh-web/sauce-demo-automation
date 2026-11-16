
import { test as base, type Page } from '@playwright/test';
import path from 'node:path';

const authFile = path.join(
    __dirname,
    '..',
    'auth',
    'storageState.json'
);

type AuthFixtures = {
    loggedInPage: Page;
};

export const test = base.extend<AuthFixtures>({

    loggedInPage: async ({ browser }, use) => {

        // Load previously saved authentication
        const context = await browser.newContext({
            storageState: authFile
        });

        const page = await context.newPage();

        try {
            // Give logged-in page to the test
            await use(page);
        } finally {
            // Close context after test
            await context.close();
        }
    }
});

export { expect } from '@playwright/test';
