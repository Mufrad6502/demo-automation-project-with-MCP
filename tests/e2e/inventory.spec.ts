import { test, expect, type Page } from '@playwright/test';
import { users } from '../fixtures/test-data';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';

test.describe('Inventory Page E2E Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        // Navigate and login with network state checks
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        
        // Ensure we're on inventory page and content is loaded
        await expect(page).toHaveURL(/.*inventory.html/);
        await page.waitForLoadState('networkidle');
        await expect(inventoryPage.addToCartButtons).toHaveCount(6);
    });

    test('should display all products with required elements', async () => {
        // Wait for the inventory to load
        await expect(inventoryPage.addToCartButtons).toHaveCount(6);
        
        // Get the first product image
        await expect(inventoryPage.page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]')).toBeVisible();
        
        // Verify other elements of the first product
        const firstProductName = inventoryPage.productNames.first();
        const firstProductDesc = inventoryPage.productDescriptions.first();
        const firstProductPrice = inventoryPage.productPrices.first();
        const firstAddButton = inventoryPage.addToCartButtons.first();

        await expect(firstProductName).toBeVisible();
        await expect(firstProductDesc).toBeVisible();
        await expect(firstProductPrice).toBeVisible();
        await expect(firstAddButton).toBeVisible();
    });

    test('should add and remove items from cart', async () => {
        // Add first item to cart
        await inventoryPage.addItemToCart(0);
        await expect(inventoryPage.cartButton).toContainText('1');

        // Go to cart and verify item
        await inventoryPage.goToCart();
        await expect(cartPage.cartItems).toHaveCount(1);

        // Remove item and verify cart is empty
        await cartPage.removeItem(0);
        await expect(cartPage.cartItems).toHaveCount(0);
    });

    test('should sort products', async ({ page }) => {
        // Wait for page to be ready
        await expect(page.locator('.inventory_list')).toBeVisible();
        
        // Find sort dropdown and check initial state
        const sortDropdown = page.locator('select.product_sort_container');
        await expect(sortDropdown).toBeVisible();
        await expect(sortDropdown).toHaveValue('az'); // Initial sort is A to Z
        
        // Sort by name Z to A
        await sortDropdown.selectOption('za');
        
        // Verify Z to A sort result - should be "Test.allTheThings()" T-Shirt (Red)
        await expect(inventoryPage.productNames.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
        
        // Sort by price low to high
        await sortDropdown.selectOption('lohi');
        
        // Verify price sort result - should be Sauce Labs Onesie at $7.99
        await expect(inventoryPage.productPrices.first()).toHaveText('$7.99');
        await expect(inventoryPage.productNames.first()).toHaveText('Sauce Labs Onesie');
    });
    test('should navigate to product details', async ({ page }) => {
        await inventoryPage.page.locator('.inventory_item_name').first().click();
        await expect(page).toHaveURL(/.*inventory-item.html/);
        await expect(page.locator('.inventory_details_name')).toBeVisible();
        await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
    });

    test('should maintain cart state across pages', async () => {
        // Add items to cart
        await inventoryPage.addItemToCart(0);
        await inventoryPage.addItemToCart(1);
        
        // Navigate to cart and back
        await inventoryPage.goToCart();
        await expect(cartPage.cartItems).toHaveCount(2);
        await inventoryPage.clickContinueShopping();
        
        // Verify cart count remains
        await expect(inventoryPage.cartButton).toContainText('2');
    });
});
