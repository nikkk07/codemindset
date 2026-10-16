import type { CorePage } from './types';

export type CorePageKey =
  | 'home'
  | 'services'
  | 'industries'
  | 'india'
  | 'knowledge'
  | 'blog'
  | 'guides'
  | 'glossary'
  | 'about'
  | 'work'
  | 'careers'
  | 'contact'
  | 'privacy'
  | 'terms';

/** Every non-templated page. All 'draft' until the owner approves the copy. */
export const corePages: Record<CorePageKey, CorePage> = {
  home: {
    path: '/',
    title: 'CodeMindset — Website, App & Software Development Company in India',
    description:
      'Indian IT services company building websites, mobile apps, AI chatbots, automation, integrations and custom software. Fast delivery across India, fixed written quote.',
    review: 'draft',
  },
  services: {
    path: '/services/',
    title: 'IT Services — Websites, Apps, AI, Integrations & Software',
    description:
      'Every CodeMindset service in one place: website and app development, AI chatbots and automation, CRM and WhatsApp integration, custom software, SEO and maintenance.',
    review: 'draft',
  },
  industries: {
    path: '/industries/',
    title: 'Industries — Education, B2B Services, Retail and Healthcare',
    description:
      'Websites, apps and automation built around how education, B2B services, retail and healthcare businesses work.',
    review: 'draft',
  },
  india: {
    path: '/india/',
    title: 'IT Services Across India — Every State and Union Territory',
    description:
      'CodeMindset is an Indian IT services company delivering websites, apps, automation and software to businesses in all 28 states and 8 union territories.',
    review: 'draft',
  },
  knowledge: {
    path: '/knowledge/',
    title: 'Knowledge Hub — Guides, Blog and Tech Glossary in Plain Words',
    description:
      'Simple guides to choosing the right technology, articles from the CodeMindset team, and a plain-language glossary of tech terms for business owners.',
    review: 'draft',
  },
  blog: {
    path: '/knowledge/blog/',
    title: 'Blog — Websites, Apps, AI and Software for Business',
    description:
      'Articles from the CodeMindset team on websites, apps, AI and software for Indian businesses.',
    review: 'draft',
  },
  guides: {
    path: '/knowledge/guides/',
    title: 'How-to-Choose Guides — Pick the Right Technology',
    description:
      'Short, honest guides: WordPress vs Shopify vs custom code, web app vs mobile app, chatbot vs automation, which CRM, and more.',
    review: 'draft',
  },
  glossary: {
    path: '/knowledge/glossary/',
    title: 'Tech Glossary in Plain Words — API, CRM, SEO, AEO and More',
    description:
      'Technology terms explained simply for business owners: what they mean and why they matter.',
    review: 'draft',
  },
  about: {
    path: '/about/',
    title: 'About CodeMindset — Indian IT Services Company',
    description:
      'CodeMindset is an Indian IT services company with a team of designers, developers, AI engineers and specialists, delivering across India. Think in Algorithms.',
    review: 'draft',
  },
  work: {
    path: '/work/',
    title: 'Our Work — Case Studies',
    description: 'Client projects by CodeMindset, published with permission.',
    review: 'draft',
  },
  careers: {
    path: '/careers/',
    title: 'Careers at CodeMindset',
    description:
      'Work with CodeMindset on websites, apps, AI and software for businesses across India.',
    review: 'draft',
  },
  contact: {
    path: '/contact/',
    title: 'Get a Quote — Start Your Project',
    description:
      'Tell us what you need in three short steps. Quick reply and a clear, written quote. Or call or WhatsApp us.',
    review: 'draft',
  },
  privacy: {
    path: '/privacy/',
    title: 'Privacy Notice',
    description:
      'How CodeMindset collects, uses and protects personal data under India’s Digital Personal Data Protection Act.',
    review: 'draft',
  },
  terms: {
    path: '/terms/',
    title: 'Website Terms of Use',
    description: 'Terms for using the CodeMindset website.',
    review: 'draft',
  },
};
