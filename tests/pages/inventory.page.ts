import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly cartButton: Locator;
    readonly addToCartButtons: Locator;
    readonly removeButtons: Locator;
    readonly sortDropdown: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly productImages: Locator;
    readonly productDescriptions: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        // Navigation and cart elements
        this.cartButton = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        
        // Product list elements
        this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
        this.removeButtons = page.locator('[data-test^="remove"]');
        this.sortDropdown = page.locator('select[data-test="product_sort_container"]');
        
        // Product details elements
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.productImages = page.locator('.inventory_item_img');
        this.productDescriptions = page.locator('.inventory_item_desc');
    }

    async addItemToCart(index = 0) {
        await this.addToCartButtons.nth(index).click();
        await this.page.waitForLoadState('networkidle');
    }

    async removeItemFromCart(index = 0) {
        await this.removeButtons.nth(index).click();
        await this.page.waitForLoadState('networkidle');
    }

    async goToCart() {
        await this.cartButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async sortBy(option: string) {
        await this.sortDropdown.selectOption(option);
        await this.page.waitForLoadState('networkidle');
        
        // Perform sorting
        await this.sortDropdown.selectOption(option);
        
        // Wait for the sorting to complete by checking that the first product has changed
        await this.page.waitForFunction(
            ([selector, oldName]) => {
                const newName = document.querySelector(selector)?.textContent;
                return newName && newName !== oldName;
            },
            ['.inventory_item_name', initialName],
            { timeout: 5000 }
        );
    }

    async getProductName(index = 0) {
        return await this.productNames.nth(index).textContent();
    }

    async getProductPrice(index = 0) {
        return await this.productPrices.nth(index).textContent();
    }

    async clickProductName(index = 0) {
        await this.productNames.nth(index).click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async getCartCount() {
        try {
            return await this.cartBadge.textContent();
        } catch {
            return '0';
        }
    }
}