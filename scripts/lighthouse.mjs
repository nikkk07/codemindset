/**
 * Runs Lighthouse (mobile profile) against a running production build.
 *   npm run build && npm start -- -p 3200 &   then   npm run lighthouse -- http://127.0.0.1:3200
 */
import fs from 'node:fs/promises';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const base = process.argv[2] ?? 'http://127.0.0.1:3200';
const paths = ['/', '/services/automation-ai/', '/contact/'];
const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH,
  chromeFlags: ['--headless=new', '--no-sandbox'],
});
await fs.mkdir('reports/lighthouse', { recursive: true });
const summary = [];
for (const p of paths) {
  const r = await lighthouse(`${base}${p}`, {
    port: chrome.port,
    output: ['json', 'html'],
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  const lhr = r.lhr;
  const name = p === '/' ? 'home' : p.replace(/\//g, '-').replace(/^-|-$/g, '');
  await fs.writeFile(`reports/lighthouse/${name}.html`, r.report[1]);
  const a = lhr.audits;
  summary.push({
    path: p,
    performance: Math.round(lhr.categories.performance.score * 100),
    accessibility: Math.round(lhr.categories.accessibility.score * 100),
    bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
    seo: Math.round(lhr.categories.seo.score * 100),
    lcp: a['largest-contentful-paint'].displayValue,
    cls: a['cumulative-layout-shift'].displayValue,
    tbt: a['total-blocking-time'].displayValue,
  });
}
await chrome.kill();
await fs.writeFile('reports/lighthouse/summary.json', JSON.stringify(summary, null, 2));
console.table(summary);
