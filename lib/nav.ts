import { corePages } from '@/content/pages';
import type { IconName } from '@/content/types';
import {
  getVisibleArticles,
  getVisibleGlossary,
  getVisibleHubs,
  getVisibleLongGuides,
  hubHref,
  isGuideVisible,
  isWorkEnabled,
} from './visibility';

export interface NavLink {
  href: string;
  label: string;
}

export interface ServiceNavItem extends NavLink {
  /** What a non-technical visitor would say: "A website for my business". */
  plain: string;
  icon: IconName;
}

/**
 * The Services menu, kept short on purpose: the five everyday services first (what most visitors
 * need), bigger projects as plain links, and a "not sure" route for everyone else.
 */
export function getServicesNav(env?: NodeJS.ProcessEnv): {
  main: ServiceNavItem[];
  bigger: NavLink[];
  help: NavLink | null;
} {
  const hubs = getVisibleHubs(env);
  const item = (h: (typeof hubs)[number]): ServiceNavItem => ({
    href: hubHref(h.slug),
    label: h.title,
    plain: h.plainTitle,
    icon: h.icon,
  });
  const help = hubs.find((h) => h.segment === 'start');
  return {
    main: hubs.filter((h) => h.segment === 'everyday').map(item),
    bigger: hubs
      .filter((h) => h.segment === 'advanced')
      .map((h) => ({ href: hubHref(h.slug), label: h.title })),
    help: help ? { href: hubHref(help.slug), label: 'Free consultation' } : null,
  };
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

/** Top-level links after Services. */
export function getTopLinks(env?: NodeJS.ProcessEnv): NavLink[] {
  const links: NavLink[] = [];
  if (isWorkEnabled(env)) links.push({ href: corePages.work.path, label: 'Our work' });
  links.push({ href: corePages.process.path, label: 'How we work' });
  if (
    getVisibleLongGuides(env).length > 0 ||
    getVisibleHubs(env).some((h) => isGuideVisible(h, env))
  )
    links.push({ href: corePages.guides.path, label: 'Guides' });
  links.push({ href: corePages.about.path, label: 'About' });
  return links;
}

export const quoteCta: NavLink = { href: corePages.contact.path, label: 'Get a free quote' };
