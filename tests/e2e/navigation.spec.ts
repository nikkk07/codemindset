import { expect, test } from '@playwright/test';

test.describe('desktop', () => {
  test.use({ viewport: { width: 1280, height: 860 } });

  test('services menu: the five everyday services first, bigger projects aside; Escape closes', async ({
    page,
  }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Services' });
    await trigger.click();
    const menu = page.getByTestId('services-menu');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: /Website development/ })).toBeVisible();
    await expect(menu.getByRole('link', { name: /AI chatbots/ })).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Custom software' })).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Free consultation' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('services menu opens on hover and its links work', async ({ page }) => {
    await page.goto('/');
    await page.mouse.move(600, 700);
    await page.getByRole('button', { name: 'Services' }).hover();
    const menu = page.getByTestId('services-menu');
    await expect(menu).toBeVisible();
    await menu.getByRole('link', { name: /Mobile app development/ }).click();
    await expect(page).toHaveURL(/\/services\/mobile-app-development\/$/);
    await expect(menu).toHaveCount(0);
  });

  test('home shows three featured projects, Social ScaleX first, We One Aviation only on /work/', async ({
    page,
  }) => {
    await page.goto('/');
    const names = await page.locator('.proj h3').allTextContents();
    expect(names).toEqual(['Social ScaleX', 'PraGo Outdoors', 'Book My Charter']);
  });

  test('live projects are shown in the owner’s order', async ({ page }) => {
    await page.goto('/work/');
    const names = await page.locator('.proj h3').allTextContents();
    expect(names.slice(0, 4)).toEqual([
      'Social ScaleX',
      'PraGo Outdoors',
      'Book My Charter',
      'We One Aviation',
    ]);
  });

  test('the phone action bar is hidden on desktop and the header shows Call us + Get a quote', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Quick contact' })).toBeHidden();
    await expect(
      page.locator('header').getByRole('link', { name: 'Get a free quote' }),
    ).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'Call us' })).toBeVisible();
  });

  test('the how-to-choose guide recommends a platform', async ({ page }) => {
    await page.goto('/services/website-development/');
    const result = page.getByTestId('chooser-result');
    await page.getByRole('radio', { name: 'Updating content myself' }).click();
    await expect(result).toContainText('WordPress');
    await page.getByRole('radio', { name: 'Selling products online' }).click();
    await expect(result).toContainText('Shopify');
    await result.getByRole('link', { name: 'Explore Shopify' }).click();
    await expect(page).toHaveURL(/\/services\/website-development\/shopify\/$/);
  });

  test('breadcrumbs link back up the tree', async ({ page }) => {
    await page.goto('/services/website-development/wordpress/');
    const crumbs = page.getByRole('navigation', { name: 'Breadcrumb' });
    await expect(crumbs.getByRole('link', { name: 'Website development' })).toHaveAttribute(
      'href',
      '/services/website-development/',
    );
    await expect(crumbs.locator('[aria-current="page"]')).toHaveText('WordPress');
  });
});

test.describe('phone', () => {
  test.use({ viewport: { width: 375, height: 740 } });

  test('menu opens, lists services in plain words, closes with Escape and returns focus', async ({
    page,
  }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Menu' });
    await button.click();
    const mobile = page.getByRole('navigation', { name: 'Mobile' });
    await expect(mobile.getByRole('link', { name: /A website for my business/ })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(mobile).toHaveCount(0);
    await expect(button).toBeFocused();
  });

  test('a sticky action bar offers Call, WhatsApp and Get a quote', async ({ page }) => {
    await page.goto('/services/ai-chatbots-automation/');
    const bar = page.getByRole('navigation', { name: 'Quick contact' });
    await expect(bar).toBeVisible();
    await expect(bar.getByRole('link', { name: 'Call' })).toHaveAttribute(
      'href',
      'tel:+918077727669',
    );
    await expect(bar.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      /^https:\/\/wa\.me\/918077727669\?text=/,
    );
    await expect(bar.getByRole('link', { name: 'Get a quote' })).toHaveAttribute(
      'href',
      '/contact/',
    );
  });
});

test('the phone number is written out only in the footer, and no person is named', async ({
  page,
}) => {
  for (const path of ['/', '/services/website-development/', '/contact/', '/about/']) {
    await page.goto(path);
    expect(await page.locator('main').textContent()).not.toContain('80777');
    expect(await page.locator('header').textContent()).not.toContain('80777');
    await expect(page.locator('footer')).toContainText('+91 80777 27669');
    expect(await page.locator('body').textContent()).not.toContain('Nikhil');
  }
});

test('WhatsApp links carry a page-specific message', async ({ page }) => {
  await page.goto('/services/website-development/');
  const href = await page.locator('main a[data-contact="whatsapp"]').first().getAttribute('href');
  expect(decodeURIComponent(href ?? '')).toContain('I need a website');
});

test('Social ScaleX is disclosed as an owned brand', async ({ page }) => {
  await page.goto('/about/');
  await expect(page.locator('main a[href="https://www.socialscalex.in/"]').first()).toBeVisible();
  await expect(page.locator('footer')).toContainText('is owned by CodeMindset');
});
