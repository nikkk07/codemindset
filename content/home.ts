import type { FAQ, PlainStep } from './types';

/** "Sound familiar?" — problems in the client's own words, each with the fix and where it lives. */
export const problems: { problem: string; fix: string; link: string; linkLabel: string }[] = [
  {
    problem: 'Enquiries come in on WhatsApp, calls and forms — and some are never answered.',
    fix: 'One place for every lead, automatic follow-ups and an owner for each enquiry.',
    link: 'ai-automation',
    linkLabel: 'AI chatbots & automation',
  },
  {
    problem: 'Our website looks outdated and brings almost no enquiries.',
    fix: 'A fast, clear website built to turn visitors into enquiries — and tracked so you can see it working.',
    link: 'website-development',
    linkLabel: 'Website development',
  },
  {
    problem: 'My team types the same data into Excel, the CRM and billing.',
    fix: 'Your tools connected, so data is entered once and stays the same everywhere.',
    link: 'integrations',
    linkLabel: 'CRM & WhatsApp integration',
  },
  {
    problem: 'Ready-made software doesn’t fit how we actually work.',
    fix: 'Software shaped around your process — no paying for features you never use.',
    link: 'custom-software',
    linkLabel: 'Custom software',
  },
];

export const steps: PlainStep[] = [
  {
    title: 'You tell us the problem',
    text: 'A call, WhatsApp or the enquiry form. No jargon needed.',
  },
  {
    title: 'We scope it',
    text: 'A quick, written quote: what’s included, what isn’t and the checks.',
  },
  { title: 'We build', text: 'You review working versions as we go. Changes are agreed first.' },
  { title: 'We launch', text: 'Go live, hand over code and access, compare results with before.' },
  { title: 'We support', text: 'Keep it running and improve it, on terms agreed separately.' },
];

export const teamRoles = [
  'UI/UX designers',
  'Web developers',
  'App developers',
  'AI engineers',
  'Integration specialists',
  'Cloud & DevOps engineers',
  'SEO specialists',
  'QA testers',
  'Project managers',
];

/** States shown as quick links on the home page (the full list lives on /india/). */
export const featuredRegions = [
  'delhi',
  'maharashtra',
  'karnataka',
  'uttarakhand',
  'tamil-nadu',
  'uttar-pradesh',
  'gujarat',
  'west-bengal',
];

export const commitments: PlainStep[] = [
  {
    title: 'Scope you can check',
    text: 'Every item has an agreed check and a clear list of what’s excluded.',
  },
  {
    title: 'You own the result',
    text: 'Code, accounts and documentation are handed over at launch.',
  },
  {
    title: 'Careful with access',
    text: 'Only the access a task needs; you can remove it any time.',
  },
  { title: 'Advice, not upselling', text: 'If a simpler tool is the better answer, we say so.' },
];

export const homeFaqs: FAQ[] = [
  {
    question: 'How much does a website or software project cost?',
    answer:
      'It depends on what it needs to do. Tell us the goal and we send a fixed, written quote quickly — so you know the cost before any work starts.',
  },
  {
    question: 'How fast can you deliver?',
    answer:
      'Fast. We work in short stages, so you see working progress early, and the delivery date is written into your quote.',
  },
  {
    question: 'I’m not technical. Can I still work with you?',
    answer:
      'Absolutely. Tell us your goal in everyday words. We explain every step simply and handle all the technical work.',
  },
  {
    question: 'Do you work outside my city?',
    answer:
      'Yes. CodeMindset is an Indian company serving clients in every state and union territory — we work remotely by call, WhatsApp and video.',
  },
  {
    question: 'I don’t know exactly what I need. Can you still help?',
    answer:
      'Yes. Start with a technical assessment: we look at the problem and your current tools, then recommend what to build — or whether to build at all.',
  },
  {
    question: 'Will I own the website and the code?',
    answer: 'Yes. Code, accounts and documentation are handed over at launch.',
  },
  {
    question: 'Do you also do marketing and ads?',
    answer:
      'Marketing and advertising are handled by Social ScaleX, a CodeMindset-owned brand. CodeMindset builds the website, software and integrations.',
  },
];
