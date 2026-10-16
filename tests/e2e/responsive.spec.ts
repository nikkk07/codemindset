import { expect, test } from '@playwright/test';
import { KEY_ROUTES } from './routes';

const WIDTHS = [360, 390, 430, 768, 834, 1024, 1280, 1440, 1920];

for (const width of WIDTHS) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const offenders: string[] = [];
    for (const path of KEY_ROUTES) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      if (overflow > 0) offenders.push(`${path} (+${overflow}px)`);
    }
    expect(offenders).toEqual([]);
  });
}

test('tap targets in the header, action bar and hero are at least 44px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const small = await page.evaluate(() =>
    [...document.querySelectorAll('header a, header button, .action-bar a, .hero a.btn, .panel a')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.height < 44 || r.width < 44);
      })
      .map((el) => el.textContent?.trim() || el.getAttribute('aria-label')),
  );
  expect(small).toEqual([]);
});

test('screenshots for visual review', async ({ page }) => {
  test.slow();
  for (const width of [390, 834, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      '/',
      '/services/website-development/',
      '/services/website-development/wordpress/',
      '/contact/',
    ]) {
      await page.goto(path);
      const name = path === '/' ? 'home' : path.replace(/\//g, '-').replace(/^-|-$/g, '');
      await page.screenshot({ path: `reports/screenshots/${name}-${width}.png`, fullPage: true });
    }
  }
});
