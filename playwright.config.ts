
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Check BASE_URL
if (!process.env.BASE_URL) {
    throw new Error('BASE_URL is missing in .env file');
}

export default defineConfig({
    testDir: './tests',

    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: 'html',

    use: {
        baseURL: process.env.BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [

        // Login and save authentication
        {
            name: 'setup',
            testMatch: '**/auth.setup.ts',
        },

        // Actual test cases
        {
            name: 'chromium',
            testMatch: '**/*.spec.ts',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});
