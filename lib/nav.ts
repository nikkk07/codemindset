import { corePages } from '@/content/pages';
import type { IconName } from '@/content/types';
import {
  getVisibleArticles,
  getVisibleGlossary,
  getVisibleHubs,
  getVisibleIndustries,
  getVisibleSubs,
  hubHref,
  isGuideVisible,
  isWorkEnabled,
  subHref,
} from './visibility';

export interface NavLink {
  href: string;
  label: string;
}

export interface MegaGroup {
  slug: string;
  href: string;
  title: string;
  plainTitle: string;
  blurb: string;
  icon: IconName;
  /** Need-based pages first (plain words). */
  items: NavLink[];
  /** Platform / technology pages, shown as a compact "Built with" row. */
  tech: NavLink[];
}

/** Services mega-menu: every visible hub except the assessment, which gets its own card. */
export function getMegaMenu(env?: NodeJS.ProcessEnv): {
  groups: MegaGroup[];
  assessment: MegaGroup | null;
} {
  const groups: MegaGroup[] = getVisibleHubs(env).map((h) => {
    const subs = getVisibleSubs(h, env);
    return {
      slug: h.slug,
      href: hubHref(h.slug),
      title: h.title,
      plainTitle: h.plainTitle,
      blurb: h.blurb,
      icon: h.icon,
      items: subs
        .filter((s) => s.kind === 'type')
        .map((s) => ({ href: subHref(h.slug, s.slug), label: s.name })),
      tech: subs
        .filter((s) => s.kind === 'platform')
        .map((s) => ({ href: subHref(h.slug, s.slug), label: s.name })),
    };
  });
  const assessment = groups.find((g) => g.slug === 'technical-assessment') ?? null;
  return { groups: groups.filter((g) => g !== assessment), assessment };
}

export function getIndustryNav(
  env?: NodeJS.ProcessEnv,
): (NavLink & { icon: IconName; intro: string })[] {
  return getVisibleIndustries(env).map((i) => ({
    href: `/industries/${i.slug}/`,
    label: i.name,
    icon: i.icon,
    intro: i.intro,
  }));
}

export function getKnowledgeNav(env?: NodeJS.ProcessEnv): NavLink[] {
  const items: NavLink[] = [];
  if (getVisibleHubs(env).some((h) => isGuideVisible(h, env)))
    items.push({ href: corePages.guides.path, label: 'Guides' });
  if (getVisibleArticles(env).length > 0) items.push({ href: corePages.blog.path, label: 'Blog' });
  if (getVisibleGlossary(env).length > 0)
    items.push({ href: corePages.glossary.path, label: 'Glossary' });
  return items;
}

/** Simple top-level links after the Services and Industries menus. */
export function getTopLinks(env?: NodeJS.ProcessEnv): NavLink[] {
  const links: NavLink[] = [];
  if (isWorkEnabled(env)) links.push({ href: corePages.work.path, label: 'Work' });
  links.push({ href: corePages.knowledge.path, label: 'Knowledge' });
  links.push({ href: corePages.about.path, label: 'About' });
  return links;
}

export const quoteCta: NavLink = { href: corePages.contact.path, label: 'Get a quote' };
