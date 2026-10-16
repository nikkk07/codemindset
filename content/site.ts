/**
 * Single source of truth for brand and contact facts.
 * Every value here was confirmed by the owner unless marked `null` (= not yet confirmed).
 * Do not duplicate these values elsewhere in the codebase.
 */
export const site = {
  /** Confirmed by owner 2026-10-16: one word. */
  name: 'CodeMindset',
  /** Confirmed 2026-10-16: an Indian company delivering across the whole country. */
  descriptor: 'Indian IT services company',
  tagline: 'Think in Algorithm',
  description:
    'CodeMindset is an Indian IT services company. We build websites, mobile apps, AI chatbots, automation, integrations and custom software for businesses across India.',
  /** Canonical origin. Confirmed by owner 2026-10-15. */
  url: 'https://www.codemindset.in',
  locale: 'en_IN',
  language: 'en-IN',
  country: { name: 'India', code: 'IN' },
  /** Internal contact (enquiry routing). Not shown on the site: the brand presents as a company. */
  contactPerson: 'Nikhil Bisht',
  phone: {
    /** Shown once only, in the footer (owner decision 2026-10-16). Elsewhere: "Call us". */
    display: '+91 80777 27669',
    href: 'tel:+918077727669',
    schema: '+91-8077727669',
  },
  /** Confirmed 2026-10-16: the number is on WhatsApp. */
  whatsapp: { number: '918077727669' },
  email: 'info@codemindset.in',
  /** Used in structured data only; not displayed (owner decision 2026-10-16). */
  enquiryLanguages: ['English', 'Hindi'] as const,
  social: {
    linkedin: 'https://www.linkedin.com/company/codemindset-ai/',
    instagram: 'https://www.instagram.com/codemindset.ai/',
  },
  ownedBrands: {
    socialScalex: {
      name: 'Social ScaleX',
      url: 'https://www.socialscalex.in/',
    },
  },
  /** Pending owner confirmation — keep null until verified. */
  legal: {
    /** e.g. "CodeMindset … Private Limited". Shown in the footer once confirmed. */
    entityName: null as string | null,
    entityType: null as string | null,
    address: null as string | null,
    grievanceOfficer: null as string | null,
    governingJurisdiction: null as string | null,
  },
  crawlers: {
    /**
     * Owner decision on AI model-training crawlers (GPTBot, Google-Extended, …).
     * 'undecided' blocks them conservatively and fails the launch gate.
     */
    aiTraining: 'undecided' as 'allow' | 'block' | 'undecided',
  },
} as const;

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString();
