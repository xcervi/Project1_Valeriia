import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('input[data-test="username"]', 'standard_user');
    await page.fill('input[data-test="password"]', 'secret_sauce');
    await page.click('input[data-test="login-button"]');
});

test('Perform Login', async ({ page }) => {
    await expect(page.locator('span[data-test="title"]')).toBeVisible();
    await expect(page.locator('a[data-test="shopping-cart-link"]')).toBeVisible();

    const productItems = await page.locator('.inventory_item').count();
    expect(productItems).toBeGreaterThan(1);
})

test('Add product to the cart', async ({ page }) => {
    await page.locator('.inventory_item button').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    const firstInventoryItem = page.locator('.inventory_item_name').first();
    const firstInventoryItemText = await firstInventoryItem.innerText();
    await page.click('.shopping_cart_link');
    await expect(page.locator('.inventory_item_name').first()).toHaveText(firstInventoryItemText);
    

    await page.locator('.cart_item button').first().click();
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
})