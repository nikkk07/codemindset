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
  | 'process'
  | 'careers'
  | 'contact'
  | 'privacy'
  | 'terms';

/** Every non-templated page. All 'draft' until the owner approves the copy. */
export const corePages: Record<CorePageKey, CorePage> = {
  home: {
    path: '/',
    title: 'Website & App Development Company in India — CodeMindset',
    description:
      'Websites, mobile apps, WhatsApp and AI chatbots, CRM integration and SEO for growing businesses in India. Fixed written quote, and you own everything.',
    review: 'approved',
  },
  services: {
    path: '/services/',
    title: 'Services — Websites, Apps, Chatbots, CRM & SEO',
    description:
      'Website development, mobile apps, WhatsApp and AI chatbots, CRM and WhatsApp integration, and SEO for growing businesses, plus custom software for big projects.',
    review: 'approved',
  },
  industries: {
    path: '/industries/',
    title: 'Industries — Retail, Healthcare, Finance, Logistics & More',
    description:
      'Websites, apps, AI and automation built around how education, B2B services, retail, healthcare, finance, logistics and real-estate businesses work.',
    review: 'approved',
  },
  india: {
    path: '/india/',
    title: 'IT Services Across India — Every State and Union Territory',
    description:
      'CodeMindset is an Indian IT services company delivering websites, apps, automation and software to businesses in all 28 states and 8 union territories.',
    review: 'approved',
  },
  knowledge: {
    path: '/knowledge/',
    title: 'Knowledge Hub: Guides, Blog & Plain-Words Tech Glossary',
    description:
      'Simple guides to choosing the right technology, articles from the CodeMindset team, and a plain-language glossary of tech terms for business owners.',
    review: 'approved',
  },
  blog: {
    path: '/knowledge/blog/',
    title: 'Blog — Websites, Apps, AI and Software for Business',
    description:
      'Articles from the CodeMindset team on websites, apps, AI and software for Indian businesses.',
    review: 'approved',
  },
  guides: {
    path: '/knowledge/guides/',
    title: 'Free Guides: Websites, Apps, WhatsApp Chatbots, CRM & SEO',
    description:
      'Fact-checked guides for business owners in India: getting a website, building an app, WhatsApp chatbots, choosing a CRM, and SEO, AEO and GEO.',
    review: 'approved',
  },
  glossary: {
    path: '/knowledge/glossary/',
    title: 'Tech Glossary in Plain Words — API, CRM, SEO, AEO and More',
    description:
      'Plain-words definitions of the tech terms business owners meet, from domain names and CRM to SEO, AEO and AI agents, and why each one matters.',
    review: 'approved',
  },
  about: {
    path: '/about/',
    title: 'About CodeMindset — Website & Software Development Company',
    description:
      'CodeMindset is an Indian website and software development company for growing businesses: fixed quotes, plain-language updates and full ownership.',
    review: 'approved',
  },
  work: {
    path: '/work/',
    title: 'Our Work — Websites We Have Built',
    description:
      'Live websites built by CodeMindset: booking platforms, online stores, education and agency websites. Visit them and see the work for yourself.',
    review: 'approved',
  },
  process: {
    path: '/how-we-work/',
    title: 'How We Work — From First Call to Launch',
    description:
      'How a CodeMindset project works: a short call, a fixed written quote, reviews while we build, launch with full handover, and support after.',
    review: 'approved',
  },
  careers: {
    path: '/careers/',
    title: 'Careers at CodeMindset',
    description:
      'Work with CodeMindset on websites, apps, AI and software for businesses across India. No roles are open now, but you can send your profile.',
    review: 'approved',
  },
  contact: {
    path: '/contact/',
    title: 'Contact CodeMindset — Get a Free Quote',
    description:
      'Tell us what you need in a few short steps, or call or WhatsApp us. Quick reply and a fixed written quote, with no obligation.',
    review: 'approved',
  },
  privacy: {
    path: '/privacy/',
    title: 'Privacy Notice (DPDP Act, 2023)',
    description:
      'How CodeMindset collects, uses and protects personal data under India’s Digital Personal Data Protection Act, 2023, and what you can ask us to do.',
    review: 'approved',
  },
  terms: {
    path: '/terms/',
    title: 'Website Terms of Use',
    description:
      'Terms for using the CodeMindset website: content, enquiries, intellectual property and links to other sites. Please read them before using the site.',
    review: 'approved',
  },
};
