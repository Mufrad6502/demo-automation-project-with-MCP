import { test, expect, type Page } from '@playwright/test';
import { users } from '../fixtures/test-data';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

test.describe('Authentication Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto();
    });

    test('should login with standard user', async ({ page }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.cartButton).toBeVisible();
    });

    test('should show error for locked out user', async () => {
        await loginPage.login(users.locked.username, users.locked.password);
        await expect(loginPage.errorMessage).toContainText('locked out');
    });

    test('should show error for invalid credentials', async () => {
        await loginPage.login('invalid_user', 'invalid_pass');
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('should require username and password', async () => {
        await loginPage.loginButton.click();
        await expect(loginPage.errorMessage).toBeVisible();
    });
});