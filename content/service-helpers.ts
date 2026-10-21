import type { FAQ, SubService, UseCase } from './types';

/**
 * Builders for service sub-pages. Readiness 'ready' reflects the owner's confirmation
 * (2026-10-16) that the team delivers across these technologies; every page stays 'draft'
 * until its copy is approved.
 */
export const sub = (
  kind: SubService['kind'],
  slug: string,
  name: string,
  title: string,
  plain: string,
  best: string,
  includes: string[],
  faqs?: FAQ[],
  uses?: UseCase[],
): SubService => ({
  kind,
  slug,
  name,
  title,
  plain,
  best,
  includes,
  faqs,
  uses,
  readiness: 'ready',
  review: 'approved',
});

type SubArgs = Parameters<typeof sub> extends [unknown, ...infer R] ? R : never;
export const P = (...a: SubArgs) => sub('platform', ...a);
export const T = (...a: SubArgs) => sub('type', ...a);
