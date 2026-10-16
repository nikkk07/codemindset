import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { KEY_ROUTES } from './routes';

async function sitemapPaths(page: Page): Promise<string[]> {
  const res = await page.request.get('/sitemap.xml');
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
}

test.describe('key routes', () => {
  for (const path of KEY_ROUTES) {
    test(`${path} renders, is accessible and has sound metadata`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));

      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      expect(res?.headers()['x-robots-tag']).toContain('noindex');

      await expect(page.locator('h1')).toHaveCount(1);
      expect((await page.title()).length).toBeGreaterThan(10);
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc?.length ?? 0).toBeGreaterThan(40);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://www.codemindset.in${path}`,
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      for (const raw of await page
        .locator('script[type="application/ld+json"]')
        .allTextContents()) {
        expect(() => JSON.parse(raw)).not.toThrow();
      }

      const axe = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const serious = axe.violations.filter((v) =>
        ['serious', 'critical'].includes(v.impact ?? ''),
      );
      expect(
        serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
      ).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
});

test('every page in the sitemap renders with one h1 and a unique title and description', async ({
  page,
}) => {
  test.slow();
  const paths = await sitemapPaths(page);
  expect(paths.length).toBeGreaterThan(100);
  const titles = new Map<string, string>();
  const descs = new Map<string, string>();
  for (const path of paths) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    await expect(page.locator('h1'), path).toHaveCount(1);
    const t = await page.title();
    const d = (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
    expect(titles.get(t), `duplicate title on ${path} and ${titles.get(t)}`).toBeUndefined();
    expect(descs.get(d), `duplicate description on ${path}`).toBeUndefined();
    titles.set(t, path);
    descs.set(d, path);
  }
});

test('unknown routes return the custom 404', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page doesn’t exist');
  expect((await page.goto('/services/penetration-testing/'))?.status()).toBe(404);
  expect((await page.goto('/services/website-development/cobol/'))?.status()).toBe(404);
});

test('every internal link resolves and key assets exist', async ({ page, request }) => {
  test.slow();
  const seen = new Set<string>();
  const queue = ['/'];
  const broken: string[] = [];
  while (queue.length) {
    const path = queue.shift()!;
    if (seen.has(path)) continue;
    seen.add(path);
    const res = await page.goto(path);
    if (!res || res.status() !== 200) {
      broken.push(`${path} → ${res?.status()}`);
      continue;
    }
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((as) => as.map((a) => a.getAttribute('href') ?? ''));
    for (const h of hrefs) {
      if (!h.startsWith('/') || h.startsWith('//')) continue;
      const clean = h.split('#')[0]!.split('?')[0]!;
      if (clean && !seen.has(clean)) queue.push(clean);
    }
  }
  for (const asset of [
    '/robots.txt',
    '/sitemap.xml',
    '/llms.txt',
    '/icon.svg',
    '/og/default.png',
    '/brand/codemindset-logo-512.png',
  ]) {
    const r = await request.get(asset);
    if (r.status() !== 200) broken.push(`${asset} → ${r.status()}`);
  }
  expect(broken).toEqual([]);
});

test('llms.txt summarises the services for AI assistants', async ({ request }) => {
  const text = await (await request.get('/llms.txt')).text();
  expect(text).toContain('# CodeMindset');
  expect(text).toContain('/services/website-development/');
});
