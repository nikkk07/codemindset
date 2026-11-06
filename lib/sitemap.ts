import type { MetadataRoute } from 'next';
import { corePages, type CorePageKey } from '@/content/pages';
import { absoluteUrl, site } from '@/content/site';
import type { ReviewStatus } from '@/content/types';
import { showDrafts } from './env';
import {
  getVisibleArticles,
  getVisibleAudiences,
  getVisibleGlossary,
  getVisibleHubs,
  getVisibleIndustries,
  getVisibleLongGuides,
  getVisibleRegions,
  getPageSubs,
  guideHref,
  hubHref,
  isGuideVisible,
  isPublishable,
  isRegionPublishable,
  isWorkEnabled,
  longGuideHref,
  subHref,
} from './visibility';

/**
 * Production: only approved, indexable pages.
 * Preview/development: every visible page, so the structure can be reviewed (robots blocks crawling there).
 */
const LEGAL = new Set(['/privacy/', '/terms/']);

export function buildSitemap(env?: NodeJS.ProcessEnv): MetadataRoute.Sitemap {
  const drafts = showDrafts(env);
  const ok = (review: ReviewStatus) => drafts || review === 'approved';
  type Entry = { path: string; priority: number; updated?: string };
  const paths: Entry[] = [];
  const add = (path: string, priority: number, updated?: string) =>
    paths.push({ path, priority, updated });

  const hidden: Partial<Record<CorePageKey, boolean>> = {
    work: !isWorkEnabled(env),
    blog: getVisibleArticles(env).length === 0,
    glossary: getVisibleGlossary(env).length === 0,
  };
  for (const [key, p] of Object.entries(corePages) as [
    CorePageKey,
    (typeof corePages)[CorePageKey],
  ][]) {
    if (!hidden[key] && ok(p.review))
      add(
        p.path,
        p.path === '/' ? 1 : p.path.startsWith('/services/') ? 0.9 : LEGAL.has(p.path) ? 0.2 : 0.6,
      );
  }

  for (const h of getVisibleHubs(env)) {
    if (!drafts && !isPublishable(h)) continue;
    add(hubHref(h.slug), 0.9);
    for (const s of getPageSubs(h, env)) add(subHref(h.slug, s.slug), 0.8);
    if (isGuideVisible(h, env)) add(guideHref(h.slug), 0.7);
  }
  for (const g of getVisibleLongGuides(env))
    if (ok(g.review)) add(longGuideHref(g.slug), 0.7, g.updated);
  for (const a of getVisibleAudiences(env)) add(`/for/${a.slug}/`, 0.7);
  for (const i of getVisibleIndustries(env)) add(`/industries/${i.slug}/`, 0.7);
  for (const r of getVisibleRegions(env))
    if (drafts || isRegionPublishable(r)) add(`/india/${r.slug}/`, 0.5);
  for (const g of getVisibleGlossary(env)) add(`/knowledge/glossary/${g.slug}/`, 0.4);
  for (const a of getVisibleArticles(env))
    add(`/knowledge/blog/${a.slug}/`, 0.6, a.updated ?? a.published);

  // Google ignores priority and changefreq and reads only an accurate lastmod; Bing and others
  // may use all three.
  return paths.map((e) => ({
    url: absoluteUrl(e.path),
    lastModified: e.updated ?? site.contentUpdated,
    changeFrequency: 'monthly' as const,
    priority: e.priority,
  }));
}
