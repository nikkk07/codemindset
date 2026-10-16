import { audiences } from '@/content/audiences';
import { articles, glossary } from '@/content/knowledge';
import { industries } from '@/content/industries';
import { regions } from '@/content/regions';
import { GUIDE_SLUG, allSubs, hubs } from '@/content/services';
import type { Readiness, Region, ReviewStatus, ServiceHub, SubService } from '@/content/types';
import { caseStudies } from '@/content/work';
import { showDrafts } from './env';

/**
 * One rule for everything: production shows only content that is approved (and, for services,
 * confirmed deliverable). Preview and development show drafts so the owner can review them.
 */
type Gated = { review: ReviewStatus; readiness?: Readiness };

export const isPublishable = (x: Gated) =>
  x.review === 'approved' &&
  (x.readiness === undefined || x.readiness === 'ready' || x.readiness === 'partner');

const visible = (x: Gated, env?: NodeJS.ProcessEnv) =>
  x.readiness !== 'roadmap' && (showDrafts(env) || isPublishable(x));

export const isDraft = (x: Gated) => !isPublishable(x);

/* ---------- services ---------- */

export const getVisibleHubs = (env?: NodeJS.ProcessEnv) => hubs.filter((h) => visible(h, env));

export const getHub = (slug: string, env?: NodeJS.ProcessEnv) =>
  getVisibleHubs(env).find((h) => h.slug === slug);

export const getVisibleSubs = (hub: ServiceHub, env?: NodeJS.ProcessEnv): SubService[] =>
  visible(hub, env) ? allSubs(hub).filter((s) => visible(s, env)) : [];

export const getSub = (hubSlug: string, subSlug: string, env?: NodeJS.ProcessEnv) => {
  const hub = getHub(hubSlug, env);
  return hub ? getVisibleSubs(hub, env).find((s) => s.slug === subSlug) : undefined;
};

export const isGuideVisible = (hub: ServiceHub, env?: NodeJS.ProcessEnv) =>
  visible(hub, env) && visible(hub.guide, env);

export const hubHref = (hub: string) => `/services/${hub}/`;
export const subHref = (hub: string, sub: string) => `/services/${hub}/${sub}/`;
export const guideHref = (hub: string) => `/services/${hub}/${GUIDE_SLUG}/`;

export interface ResolvedLink {
  href: string;
  label: string;
  plain: string;
}

/**
 * Resolves "hub" or "hub/sub" (optionally relative to a hub for bare sub slugs) to a visible page.
 * Returns null when the target is hidden, so links to unpublished pages never render.
 */
export function resolveRef(
  ref: string,
  env?: NodeJS.ProcessEnv,
  contextHub?: string,
): ResolvedLink | null {
  let [hubSlug, subSlug] = ref.split('/') as [string, string | undefined];
  if (subSlug === undefined && contextHub && !hubs.some((h) => h.slug === hubSlug)) {
    subSlug = hubSlug;
    hubSlug = contextHub;
  }
  const hub = getHub(hubSlug, env);
  if (!hub) return null;
  if (!subSlug) return { href: hubHref(hub.slug), label: hub.title, plain: hub.plainTitle };
  const s = getVisibleSubs(hub, env).find((x) => x.slug === subSlug);
  return s ? { href: subHref(hub.slug, s.slug), label: s.title, plain: s.plain } : null;
}

/* ---------- other collections ---------- */

export const getVisibleAudiences = (env?: NodeJS.ProcessEnv) =>
  audiences.filter((a) => visible(a, env));
export const getAudience = (slug: string, env?: NodeJS.ProcessEnv) =>
  getVisibleAudiences(env).find((a) => a.slug === slug);

export const getVisibleIndustries = (env?: NodeJS.ProcessEnv) =>
  industries.filter((i) => visible(i, env));
export const getIndustry = (slug: string, env?: NodeJS.ProcessEnv) =>
  getVisibleIndustries(env).find((i) => i.slug === slug);

/** A region page needs unique local content as well as approval. */
export const isRegionPublishable = (r: Region) =>
  r.local !== null && r.local.trim() !== '' && r.review === 'approved';
export const getVisibleRegions = (env?: NodeJS.ProcessEnv) =>
  regions.filter((r) => showDrafts(env) || isRegionPublishable(r));
export const getRegion = (slug: string, env?: NodeJS.ProcessEnv) =>
  getVisibleRegions(env).find((r) => r.slug === slug);

export const getVisibleGlossary = (env?: NodeJS.ProcessEnv) =>
  glossary.filter((g) => visible(g, env));
export const getVisibleArticles = (env?: NodeJS.ProcessEnv) =>
  articles.filter((a) => visible(a, env));

/** Whether a page may be indexed in this environment. */
export function isIndexable(review: ReviewStatus, env?: NodeJS.ProcessEnv): boolean {
  return !showDrafts(env) && review === 'approved';
}

/** /work/ is enabled in production only when approved case studies exist. */
export function isWorkEnabled(env?: NodeJS.ProcessEnv): boolean {
  return showDrafts(env) || caseStudies.some((c) => c.review === 'approved' && c.clientPermission);
}
