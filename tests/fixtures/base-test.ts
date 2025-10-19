import { test as base, Page } from '@playwright/test';
import { users } from '../fixtures/test-data';

// Extend base test to include auth
export const test = base.extend<{ authenticatedPage: Page }>({
    authenticatedPage: async ({ page }, use) => {
        await page.goto('/');
        await page.fill('[data-test="username"]', users.standard.username);
        await page.fill('[data-test="password"]', users.standard.password);
        await page.click('[data-test="login-button"]');
        await use(page);
    },
});