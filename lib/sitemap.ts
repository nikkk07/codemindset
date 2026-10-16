import type { MetadataRoute } from 'next';
import { corePages, type CorePageKey } from '@/content/pages';
import { absoluteUrl } from '@/content/site';
import type { ReviewStatus } from '@/content/types';
import { showDrafts } from './env';
import {
  getVisibleArticles,
  getVisibleAudiences,
  getVisibleGlossary,
  getVisibleHubs,
  getVisibleIndustries,
  getVisibleRegions,
  getVisibleSubs,
  guideHref,
  hubHref,
  isGuideVisible,
  isPublishable,
  isRegionPublishable,
  isWorkEnabled,
  subHref,
} from './visibility';

/**
 * Production: only approved, indexable pages.
 * Preview/development: every visible page, so the structure can be reviewed (robots blocks crawling there).
 */
export function buildSitemap(env?: NodeJS.ProcessEnv): MetadataRoute.Sitemap {
  const drafts = showDrafts(env);
  const ok = (review: ReviewStatus) => drafts || review === 'approved';
  const paths: string[] = [];

  const hidden: Partial<Record<CorePageKey, boolean>> = {
    work: !isWorkEnabled(env),
    blog: getVisibleArticles(env).length === 0,
    glossary: getVisibleGlossary(env).length === 0,
  };
  for (const [key, p] of Object.entries(corePages) as [
    CorePageKey,
    (typeof corePages)[CorePageKey],
  ][]) {
    if (!hidden[key] && ok(p.review)) paths.push(p.path);
  }

  for (const h of getVisibleHubs(env)) {
    if (!drafts && !isPublishable(h)) continue;
    paths.push(hubHref(h.slug));
    for (const s of getVisibleSubs(h, env)) paths.push(subHref(h.slug, s.slug));
    if (isGuideVisible(h, env)) paths.push(guideHref(h.slug));
  }
  for (const a of getVisibleAudiences(env)) paths.push(`/for/${a.slug}/`);
  for (const i of getVisibleIndustries(env)) paths.push(`/industries/${i.slug}/`);
  for (const r of getVisibleRegions(env))
    if (drafts || isRegionPublishable(r)) paths.push(`/india/${r.slug}/`);
  for (const g of getVisibleGlossary(env)) paths.push(`/knowledge/glossary/${g.slug}/`);
  for (const a of getVisibleArticles(env)) paths.push(`/knowledge/blog/${a.slug}/`);

  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
