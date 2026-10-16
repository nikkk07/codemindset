import type { Metadata } from 'next';
import { hubs } from '@/content/services';
import { absoluteUrl, site } from '@/content/site';
import type { Article, GlossaryTerm, ReviewStatus } from '@/content/types';
import { isIndexable } from './visibility';

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  review: ReviewStatus;
  /** Use the title as-is instead of applying the "| CodeMindset" template. */
  absoluteTitle?: boolean;
  type?: 'website' | 'article';
}

export const OG_IMAGE = {
  url: '/og/default.png',
  width: 1200,
  height: 630,
  alt: 'CodeMindset — Think in Algorithms',
};

export function buildMetadata(
  { title, description, path, review, absoluteTitle, type = 'website' }: PageMetaInput,
  env?: NodeJS.ProcessEnv,
): Metadata {
  const indexable = isIndexable(review, env);
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type,
      url,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}

/* ---------------- JSON-LD builders ---------------- */

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;
const INDIA = { '@type': 'Country', name: site.country.name };

export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    ...(site.legal.entityName ? { legalName: site.legal.entityName } : {}),
    description: site.description,
    url: absoluteUrl('/'),
    slogan: site.tagline,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/brand/codemindset-logo-512.png'),
      width: 512,
      height: 512,
    },
    email: site.email,
    telephone: site.phone.schema,
    areaServed: INDIA,
    knowsAbout: hubs.map((h) => h.title),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: site.phone.schema,
      email: site.email,
      areaServed: site.country.code,
      availableLanguage: [...site.enquiryLanguages],
    },
    // Only profiles that represent CodeMindset itself (never Social ScaleX).
    sameAs: [site.social.linkedin, site.social.instagram],
    subOrganization: {
      '@type': 'Organization',
      name: site.ownedBrands.socialScalex.name,
      url: site.ownedBrands.socialScalex.url,
    },
  };
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: site.name,
    inLanguage: site.language,
    publisher: { '@id': ORG_ID },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  const url = absoluteUrl(input.path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url,
    areaServed: INDIA,
    provider: { '@id': ORG_ID },
  };
}

export function articleJsonLd(a: Article, path: string) {
  return {
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    mainEntityOfPage: absoluteUrl(path),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    image: absoluteUrl(OG_IMAGE.url),
  };
}

export function definedTermJsonLd(t: GlossaryTerm, path: string) {
  return {
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.short,
    url: absoluteUrl(path),
    inDefinedTermSet: absoluteUrl('/knowledge/glossary/'),
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Serialise JSON-LD safely for inline <script> (prevents `</script>` injection). */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
