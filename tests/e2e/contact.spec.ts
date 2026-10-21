import { expect, test, type Page } from '@playwright/test';

const DETAILS = 'We need Zoho CRM connected to our website forms and WhatsApp.';

async function walkToContact(page: Page, details = DETAILS) {
  await page.getByRole('radio', { name: /Make my tools work together/ }).check();
  await page.getByTestId('intake-continue').click();
  await page.getByLabel('Describe what you need, in your own words').fill(details);
  await page.getByTestId('intake-continue').click();
}

async function fillContact(page: Page) {
  await page.getByLabel('Your name').fill('Asha Rao');
  await page.getByLabel('Phone or WhatsApp number').fill('+91 98765 43210');
  await page.getByRole('checkbox', { name: /I have read the privacy notice/ }).check();
}

test.describe('project form (3 steps)', () => {
  test('moves step by step and validates each step', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page.getByRole('group', { name: 'What do you need?' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'Tell us a bit more' })).toBeHidden();
    await page.getByTestId('intake-continue').click();
    await expect(page.getByTestId('enquiry-error-summary')).toContainText(
      'closest to what you need',
    );
    await page.getByRole('radio', { name: /A website for my business/ }).check();
    await page.getByTestId('intake-continue').click();
    await expect(
      page.getByRole('group', { name: 'Tell us a bit more' }).locator('legend'),
    ).toBeFocused();
    await page.getByTestId('intake-continue').click();
    await expect(page.getByTestId('enquiry-error-summary')).toContainText('at least 20 characters');
  });

  test('accepts a phone number or an email, and needs one of them', async ({ page }) => {
    await page.goto('/contact/');
    await walkToContact(page);
    await page.getByLabel('Your name').fill('Asha Rao');
    await page.getByRole('checkbox', { name: /I have read the privacy notice/ }).check();
    await page.getByTestId('intake-submit').click();
    await expect(page.getByTestId('enquiry-error-summary')).toContainText(
      'phone number or an email',
    );
  });

  test('can go back without losing answers', async ({ page }) => {
    await page.goto('/contact/');
    await walkToContact(page);
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByLabel('Describe what you need, in your own words')).toHaveValue(DETAILS);
  });

  test('confirms success only after the provider accepts the message', async ({ page }) => {
    await page.goto('/contact/');
    await page.waitForTimeout(3100); // above the minimum fill time used for spam filtering
    await walkToContact(page);
    await fillContact(page);
    await page.getByTestId('intake-submit').click();
    const ok = page.getByTestId('enquiry-success');
    await expect(ok).toBeVisible();
    await expect(ok).toBeFocused();
  });

  test('reports a delivery failure truthfully and keeps the answers', async ({ page }) => {
    await page.goto('/contact/');
    await page.waitForTimeout(3100);
    await walkToContact(page, 'Please SIMULATE_FAILURE so the provider rejects this message.');
    await fillContact(page);
    await page.getByTestId('intake-submit').click();
    const err = page.getByTestId('enquiry-delivery-error');
    await expect(err).toContainText('Your enquiry was not sent');
    await expect(err.locator('a[data-contact="whatsapp"]')).toBeVisible();
    await expect(page.getByTestId('enquiry-success')).toHaveCount(0);
  });

  test('rejects submissions faster than a person could type', async ({ page }) => {
    await page.goto('/contact/');
    await walkToContact(page);
    await fillContact(page);
    await page.getByTestId('intake-submit').click();
    await expect(page.getByTestId('enquiry-delivery-error')).toBeVisible();
  });

  test('pre-selects the service when arriving from a service page', async ({ page }) => {
    await page.goto('/services/crm-whatsapp-integration/');
    await page.getByRole('link', { name: 'Connect my tools' }).first().click();
    await expect(page.getByRole('radio', { name: /Make my tools work together/ })).toBeChecked();
  });

  test('works without JavaScript: every step is visible and the server validates', async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/contact/');
    await expect(page.getByRole('group', { name: 'How can we reach you?' })).toBeVisible();
    await page.getByRole('button', { name: 'Send enquiry' }).click();
    await expect(page.getByTestId('enquiry-error-summary')).toBeVisible();
    await ctx.close();
  });
});

test.describe('callback form (home page)', () => {
  test('validates name and phone', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Request a callback' }).click();
    const form = page.getByTestId('callback-form');
    await expect(form).toContainText('Enter your name.');
    await expect(form).toContainText('phone or WhatsApp number');
  });

  test('sends with three fields', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3100);
    const form = page.getByTestId('callback-form');
    await form.getByLabel('Your name').fill('Ravi Kumar');
    await form.getByLabel('Phone or WhatsApp number').fill('+91 98765 43210');
    await form
      .getByLabel('What do you need?')
      .selectOption({ label: 'A mobile app for my customers' });
    await form.getByRole('button', { name: 'Request a callback' }).click();
    await expect(page.getByTestId('callback-success')).toBeVisible();
  });
});
