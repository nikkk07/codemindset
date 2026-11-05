import { expect, test } from '@playwright/test';

/** The motion layer (Lenis + GSAP + hero WebGL field) is progressive enhancement. */

test.describe('motion on', () => {
  test('boots after load without errors, and the hero field starts where WebGL2 exists', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/motion-on/, { timeout: 10_000 });
    const gl2 = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl2'));
    if (gl2) await expect(page.locator('.hero2')).toHaveClass(/field-on/, { timeout: 10_000 });
    expect(errors).toEqual([]);
  });

  test('content waiting to be revealed stays focusable and appears on keyboard focus', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/motion-on/, { timeout: 10_000 });
    const final = page.locator('.final');
    await expect(final).toHaveAttribute('data-reveal', 'pending');
    await page.getByLabel('Your name').focus();
    await expect(page.getByLabel('Your name')).toBeFocused();
    await expect(final).toHaveAttribute('data-reveal', 'done');
    await expect.poll(() => final.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  });

  test('scrolling the whole page reveals everything', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/motion-on/, { timeout: 10_000 });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 400) {
      await page.mouse.wheel(0, 400);
      await page.waitForTimeout(40);
    }
    await expect(page.locator('[data-reveal="pending"]')).toHaveCount(0, { timeout: 5_000 });
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('never loads the engine or the field and shows the static mark', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3_500);
    await expect(page.locator('html')).not.toHaveClass(/motion-on|lenis/);
    await expect(page.locator('.hero2')).not.toHaveClass(/field-on/);
    await expect(page.locator('.hero-mark')).toBeVisible();
    await expect(page.locator('[data-reveal]')).toHaveCount(0);
  });
});
