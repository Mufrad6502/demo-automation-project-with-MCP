import { type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;
    readonly removeButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartItems = page.locator('.cart_item');
        this.removeButtons = page.locator('[data-test^="remove"]');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async removeItem(index = 0) {
        await this.removeButtons.nth(index).click();
    }
}