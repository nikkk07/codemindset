import { audiences } from '@/content/audiences';
import { longGuides } from '@/content/guides';
import { articles, glossary } from '@/content/knowledge';
import { industries } from '@/content/industries';
import { regions } from '@/content/regions';
import { GUIDE_SLUG, allSubs, hubs } from '@/content/services';
import type { Readiness, Region, ReviewStatus, ServiceHub, SubService } from '@/content/types';
import { projects } from '@/content/work';
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

/** Sub-services with a page of their own (the rest are listed on their hub page). */
export const getPageSubs = (hub: ServiceHub, env?: NodeJS.ProcessEnv): SubService[] =>
  getVisibleSubs(hub, env).filter((s) => s.page === true);

export const getSub = (hubSlug: string, subSlug: string, env?: NodeJS.ProcessEnv) => {
  const hub = getHub(hubSlug, env);
  return hub ? getPageSubs(hub, env).find((s) => s.slug === subSlug) : undefined;
};

/** "How to choose" guides are kept for the everyday services, where buyers compare options. */
export const isGuideVisible = (hub: ServiceHub, env?: NodeJS.ProcessEnv) =>
  hub.segment === 'everyday' && visible(hub, env) && visible(hub.guide, env);

const PAGE_KEYS = new Set(
  hubs.flatMap((h) =>
    allSubs(h)
      .filter((s) => s.page === true)
      .map((s) => `${h.slug}/${s.slug}`),
  ),
);

export const hubHref = (hub: string) => `/services/${hub}/`;
/** A sub-service's own page, or its entry on the hub page when it has no page. */
export const subHref = (hub: string, sub: string) =>
  PAGE_KEYS.has(`${hub}/${sub}`) ? `/services/${hub}/${sub}/` : `/services/${hub}/#${sub}`;
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

/* ---------- in-depth guides ---------- */

export const getVisibleLongGuides = (env?: NodeJS.ProcessEnv) =>
  longGuides.filter((g) => visible(g, env) && getHub(g.service, env) !== undefined);
export const getLongGuide = (slug: string, env?: NodeJS.ProcessEnv) =>
  getVisibleLongGuides(env).find((g) => g.slug === slug);
export const longGuideHref = (slug: string) => `/knowledge/guides/${slug}/`;
/** Guides that support a service hub (shown on its pages). */
export const guidesForHub = (hub: string, env?: NodeJS.ProcessEnv) =>
  getVisibleLongGuides(env).filter((g) => g.service === hub);

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
export const getVisibleProjects = (env?: NodeJS.ProcessEnv) =>
  projects.filter((p) => showDrafts(env) || p.review === 'approved');

export function isWorkEnabled(env?: NodeJS.ProcessEnv): boolean {
  return getVisibleProjects(env).length > 0;
}
