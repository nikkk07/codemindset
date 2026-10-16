import { expect, test } from '@playwright/test';

test.describe('desktop', () => {
  test.use({ viewport: { width: 1280, height: 860 } });

  test('services mega-menu opens on click, lists every service, and closes with Escape', async ({
    page,
  }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Services' });
    await trigger.click();
    const mega = page.getByTestId('mega-menu');
    await expect(mega).toBeVisible();
    await expect(mega.getByRole('link', { name: /Website development/ })).toBeVisible();
    await expect(mega.getByRole('link', { name: 'WordPress' })).toBeVisible();
    await expect(mega.getByRole('link', { name: 'WhatsApp chatbots' })).toBeVisible();
    await expect(mega.getByRole('link', { name: 'Multi-agent AI systems' })).toBeVisible();
    await expect(mega.getByRole('link', { name: 'Smart contract audit' })).toBeAttached();
    await page.keyboard.press('Escape');
    await expect(mega).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('mega-menu opens on hover and links work', async ({ page }) => {
    await page.goto('/');
    await page.mouse.move(600, 600);
    await page.getByRole('button', { name: 'Services' }).hover();
    await expect(page.getByTestId('mega-menu')).toBeVisible();
    await page.getByTestId('mega-menu').getByRole('link', { name: 'Shopify' }).click();
    await expect(page).toHaveURL(/\/services\/website-development\/shopify\/$/);
    await expect(page.getByTestId('mega-menu')).toHaveCount(0);
  });

  test('industries dropdown lists every industry', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Industries' }).click();
    await expect(page.locator('#menu-industries a')).toHaveCount(7);
  });

  test('the phone action bar is hidden on desktop and the header shows Call us + Get a quote', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Quick contact' })).toBeHidden();
    await expect(page.locator('header').getByRole('link', { name: 'Get a quote' })).toBeVisible();
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
    await page.goto('/services/ai-automation/');
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
