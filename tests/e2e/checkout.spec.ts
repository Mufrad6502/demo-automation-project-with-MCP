import { test, expect, type Page } from '@playwright/test';
import { users, checkoutInfo } from '../fixtures/test-data';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

test.describe('Checkout Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        // Initialize page objects
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        // Login and navigate to checkout
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.addItemToCart();
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
    });

    test('should complete checkout with valid information', async ({ page }) => {
        // Fill checkout information
        await checkoutPage.fillInformation(
            checkoutInfo.valid.firstName,
            checkoutInfo.valid.lastName,
            checkoutInfo.valid.zipCode
        );
        await checkoutPage.continue();

        // Verify checkout overview
        await expect(checkoutPage.cartItem).toBeVisible();
        await expect(checkoutPage.subtotalLabel).toBeVisible();
        await expect(checkoutPage.taxLabel).toBeVisible();
        await expect(checkoutPage.totalLabel).toBeVisible();

        // Complete checkout
        await checkoutPage.finish();
        await expect(checkoutPage.completeHeader).toBeVisible();
        await expect(checkoutPage.backToProductsButton).toBeVisible();
    });

    test('should validate required fields', async ({ page }) => {
        // Try to continue without any information
        await checkoutPage.continue();
        await expect(checkoutPage.errorMessage).toBeVisible();

        // Try with only first name
        await checkoutPage.fillInformation(checkoutInfo.valid.firstName, '', '');
        await checkoutPage.continue();
        await expect(checkoutPage.errorMessage).toBeVisible();

        // Try with first and last name
        await checkoutPage.fillInformation(
            checkoutInfo.valid.firstName,
            checkoutInfo.valid.lastName,
            ''
        );
        await checkoutPage.continue();
        await expect(checkoutPage.errorMessage).toBeVisible();
    });

    test('should allow canceling checkout', async ({ page }) => {
        await checkoutPage.cancel();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });
});