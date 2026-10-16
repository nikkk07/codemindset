import { describe, expect, it } from 'vitest';
import { corePages } from '@/content/pages';
import { regions } from '@/content/regions';
import { allSubs, hubs } from '@/content/services';
import { getSiteEnv } from '@/lib/env';
import { buildRobots, AI_TRAINING_CRAWLERS } from '@/lib/robots';
import { buildMetadata, organizationJsonLd, serializeJsonLd } from '@/lib/seo';
import { buildSitemap } from '@/lib/sitemap';
import {
  getVisibleHubs,
  getVisibleRegions,
  getVisibleSubs,
  isPublishable,
  isRegionPublishable,
  resolveRef,
} from '@/lib/visibility';

const PROD = { SITE_ENV: 'production' } as unknown as NodeJS.ProcessEnv;
const PREVIEW = { SITE_ENV: 'preview' } as unknown as NodeJS.ProcessEnv;
const ORIGIN = 'https://www.codemindset.in';

describe('environment', () => {
  it('derives the environment from SITE_ENV, then VERCEL_ENV', () => {
    expect(getSiteEnv({ VERCEL_ENV: 'production' } as unknown as NodeJS.ProcessEnv)).toBe(
      'production',
    );
    expect(getSiteEnv({ VERCEL_ENV: 'preview' } as unknown as NodeJS.ProcessEnv)).toBe('preview');
    expect(getSiteEnv({} as NodeJS.ProcessEnv)).toBe('development');
    expect(
      getSiteEnv({ SITE_ENV: 'preview', VERCEL_ENV: 'production' } as unknown as NodeJS.ProcessEnv),
    ).toBe('preview');
  });
});

describe('visibility gate', () => {
  it('shows only approved, deliverable services in production', () => {
    expect(getVisibleHubs(PROD).every(isPublishable)).toBe(true);
    for (const h of getVisibleHubs(PROD))
      expect(getVisibleSubs(h, PROD).every(isPublishable)).toBe(true);
  });
  it('shows every draft in preview for review', () => {
    expect(getVisibleHubs(PREVIEW).length).toBe(
      hubs.filter((h) => h.readiness !== 'roadmap').length,
    );
  });
  it('never links to a hidden page', () => {
    const hidden = hubs.find((h) => !isPublishable(h));
    if (hidden) expect(resolveRef(hidden.slug, PROD)).toBeNull();
    expect(resolveRef('website-development/wordpress', PREVIEW)?.href).toBe(
      '/services/website-development/wordpress/',
    );
    expect(resolveRef('does-not-exist', PREVIEW)).toBeNull();
  });
  it('publishes a state page only with unique local content and approval', () => {
    expect(regions.length).toBe(36);
    expect(getVisibleRegions(PROD).every(isRegionPublishable)).toBe(true);
    expect(isRegionPublishable({ ...regions[0]!, review: 'approved', local: null })).toBe(false);
    expect(isRegionPublishable({ ...regions[0]!, review: 'approved', local: 'Unique copy.' })).toBe(
      true,
    );
  });
});

describe('indexing controls', () => {
  it('blocks all crawling outside production', () => {
    expect(buildRobots(PREVIEW).rules).toEqual([{ userAgent: '*', disallow: '/' }]);
  });
  it('allows search and AI-search crawlers in production and blocks training crawlers until decided', () => {
    const r = buildRobots(PROD, 'undecided');
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    expect(rules).toContainEqual({ userAgent: '*', allow: '/' });
    expect(
      rules.some(
        (x) =>
          Array.isArray(x.userAgent) && x.userAgent.includes('OAI-SearchBot') && x.allow === '/',
      ),
    ).toBe(true);
    expect(rules).toContainEqual({ userAgent: AI_TRAINING_CRAWLERS, disallow: '/' });
    const allowed = buildRobots(PROD, 'allow');
    const allowedRules = Array.isArray(allowed.rules) ? allowed.rules : [allowed.rules];
    expect(allowedRules.some((x) => x.disallow === '/')).toBe(false);
    expect(allowed.sitemap).toBe(`${ORIGIN}/sitemap.xml`);
  });
  it('marks draft pages noindex everywhere and approved pages indexable only in production', () => {
    expect(buildMetadata({ ...corePages.about, review: 'draft' }, PROD).robots).toEqual({
      index: false,
      follow: true,
    });
    expect(buildMetadata({ ...corePages.about, review: 'approved' }, PROD).robots).toEqual({
      index: true,
      follow: true,
    });
    expect(buildMetadata({ ...corePages.about, review: 'approved' }, PREVIEW).robots).toEqual({
      index: false,
      follow: true,
    });
  });
  it('builds absolute canonical URLs on the confirmed domain', () => {
    expect(buildMetadata(corePages.about, PROD).alternates?.canonical).toBe(`${ORIGIN}/about/`);
  });
  it('keeps unapproved pages out of the production sitemap and lists the full tree in preview', () => {
    const prod = buildSitemap(PROD).map((e) => e.url);
    for (const p of Object.values(corePages))
      if (p.review !== 'approved') expect(prod).not.toContain(`${ORIGIN}${p.path}`);
    for (const h of hubs.filter((x) => !isPublishable(x)))
      expect(prod).not.toContain(`${ORIGIN}/services/${h.slug}/`);
    const preview = buildSitemap(PREVIEW).map((e) => e.url);
    const subs = hubs.reduce((n, h) => n + allSubs(h).length, 0);
    expect(preview.length).toBeGreaterThan(subs + hubs.length);
    expect(preview).toContain(`${ORIGIN}/services/website-development/how-to-choose/`);
    expect(new Set(preview).size).toBe(preview.length);
  });
});

describe('structured data', () => {
  it('describes an Indian company serving India, with only CodeMindset profiles in sameAs', () => {
    const org = organizationJsonLd();
    expect(org.sameAs).toEqual([
      'https://www.linkedin.com/company/codemindset-ai/',
      'https://www.instagram.com/codemindset.ai/',
    ]);
    expect(JSON.stringify(org.sameAs)).not.toContain('socialscalex');
    expect(org.subOrganization.url).toBe('https://www.socialscalex.in/');
    expect(org.areaServed).toEqual({ '@type': 'Country', name: 'India' });
    expect(org).not.toHaveProperty('address');
    expect(org).not.toHaveProperty('aggregateRating');
  });
  it('escapes markup when serialising JSON-LD', () => {
    expect(serializeJsonLd({ a: '</script><script>x' })).not.toContain('</script>');
  });
});
