import type { FAQ, PlainStep } from './types';

/**
 * Home page and shared "how we work" copy.
 * Voice: calm, plain, specific. Speak to the problem before the technology. No superlatives.
 */

/** Pains in the buyer's own words → what we do about it → where it lives. */
export const problems: { problem: string; fix: string; link: string; linkLabel: string }[] = [
  {
    problem: 'Our website looks outdated and hardly brings any enquiries.',
    fix: 'A fast, clear website with call, WhatsApp and enquiry buttons on every page.',
    link: 'website-development',
    linkLabel: 'Website development',
  },
  {
    problem: 'Customers message on WhatsApp at night and nobody replies till morning.',
    fix: 'A WhatsApp chatbot that answers common questions and saves every lead for your team.',
    link: 'ai-chatbots-automation',
    linkLabel: 'WhatsApp & AI chatbots',
  },
  {
    problem: 'Leads are spread across WhatsApp, calls, Excel and email, so some get forgotten.',
    fix: 'One CRM where every enquiry lands automatically, with reminders to follow up.',
    link: 'crm-whatsapp-integration',
    linkLabel: 'CRM & WhatsApp integration',
  },
  {
    problem: 'People nearby search for what we do, but find our competitors on Google.',
    fix: 'Local SEO: a complete Google Business Profile and pages for the searches that matter.',
    link: 'seo-services',
    linkLabel: 'SEO, AEO & GEO',
  },
];

/** The process, used on the home page, service pages and /how-we-work/. */
export const steps: PlainStep[] = [
  {
    title: 'Tell us what you need',
    text: 'Call, WhatsApp or fill a short form. No technical brief needed.',
  },
  {
    title: 'Get a fixed quote',
    text: 'A written quote that lists what’s included, what isn’t, and the delivery date.',
  },
  {
    title: 'See it as we build',
    text: 'You review working versions along the way. Any change is agreed before it is made.',
  },
  {
    title: 'Launch and handover',
    text: 'We go live, hand over the code and every login, and stay available for support.',
  },
];

/** Why choose us — each line is a promise we can keep, not an adjective. */
export const reasons: PlainStep[] = [
  {
    title: 'A fixed quote, in writing',
    text: 'You know the cost and the scope before work starts. No surprise bills later.',
  },
  {
    title: 'You own everything',
    text: 'Domain, code, hosting and accounts are in your name, handed over at launch.',
  },
  {
    title: 'Updates in plain words',
    text: 'Regular progress on WhatsApp or a call: what’s done, what’s next and what we need from you.',
  },
  {
    title: 'Support after launch',
    text: 'Fixes, updates and improvements when you need them, on terms agreed upfront.',
  },
  {
    title: 'Honest advice',
    text: 'If a simpler or cheaper option fits better, we’ll say so, even when it means less work for us.',
  },
  {
    title: 'One team for the whole job',
    text: 'Design, development, chatbots, integrations and SEO from one team. No juggling five freelancers.',
  },
];

/** Shared commitments (About page). */
export const commitments: PlainStep[] = reasons.slice(0, 4);

export const teamRoles = [
  'UI/UX designers',
  'Web developers',
  'App developers',
  'AI & automation engineers',
  'Integration specialists',
  'Cloud & DevOps engineers',
  'SEO specialists',
  'QA testers',
  'Project managers',
];

export const homeFaqs: FAQ[] = [
  {
    question: 'How much does a website or app cost?',
    answer:
      'It depends on what it needs to do. A five-page business website costs far less than an online store or a booking app. Tell us your goal and we send a fixed, written quote, so you know the full cost before any work starts.',
  },
  {
    question: 'How long does it take?',
    answer:
      'Most business websites are ready in a few weeks; apps and larger systems take longer. The delivery date is written into your quote, and you see working progress along the way.',
  },
  {
    question: 'I’m not technical. Can I still work with you?',
    answer:
      'Yes, most of our clients are not. Tell us what you want in everyday words. We explain every choice simply and handle all the technical work.',
  },
  {
    question: 'Will I own the website and the code?',
    answer:
      'Yes. The domain, code, hosting and accounts are in your name and handed over at launch. You are never locked in to us.',
  },
  {
    question: 'Do you work with businesses outside your city?',
    answer:
      'Yes. CodeMindset works with businesses across India by call, WhatsApp and video, so location is never a barrier.',
  },
  {
    question: 'Do you also handle social media and ads?',
    answer:
      'Marketing and advertising are handled by Social ScaleX, a CodeMindset-owned agency. CodeMindset builds the website, apps, chatbots and integrations.',
  },
];
