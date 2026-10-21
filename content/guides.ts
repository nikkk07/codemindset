import type { FAQ, ReviewStatus } from './types';

/**
 * In-depth guides (Knowledge → Guides). Written to teach, not to sell: every fact is checked against
 * the source listed at the end of the guide (checked 2026-10-20/21). Prices from third parties are
 * described as models, not rupee figures, because they change. CodeMindset's own prices are never
 * shown (owner decision).
 *
 * Block types render as: paragraphs, bullet or numbered lists, a visual step-by-step ("steps"),
 * comparison tables, callouts, checklists, and "hook" cards that offer to do the work for the reader.
 */
export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'table'; caption: string; columns: string[]; rows: string[][] }
  | { type: 'callout'; tone: 'tip' | 'warning' | 'fact'; title: string; text: string }
  | { type: 'checklist'; title: string; items: string[] }
  | { type: 'hook'; title: string; text: string; cta: string };

export interface GuideSection {
  id: string;
  /** Written as the question a reader would ask. */
  heading: string;
  blocks: GuideBlock[];
}

export interface LongGuide {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  /** ISO date the facts were last checked. */
  updated: string;
  readMinutes: number;
  /** The service hub this guide supports (for links and the lead hooks). */
  service: string;
  /** Pre-filled WhatsApp message for the hooks. */
  whatsapp: string;
  /** The answer in 2–3 sentences, shown first. */
  answer: string;
  keyPoints: string[];
  sections: GuideSection[];
  faqs: FAQ[];
  sources: { title: string; url: string }[];
  /** Related service refs ("hub" or "hub/sub"). */
  related: string[];
  review: ReviewStatus;
}

/* ------------------------------------------------------------------ */

const websiteGuide: LongGuide = {
  slug: 'business-website-guide',
  title: 'How to get a business website in India: the complete guide',
  seoTitle: 'How to Get a Business Website in India (Complete 2026 Guide)',
  description:
    'Every step of getting a business website in India: domain, platform, pages, speed, Google, legal basics and ownership. Clear checklists, no jargon.',
  updated: '2026-10-21',
  readMinutes: 14,
  service: 'website-development',
  whatsapp: 'Hi CodeMindset, I read your website guide and want a website for my business.',
  answer:
    'To get a business website you need a domain name, a platform (usually WordPress, Shopify or custom code), hosting, a set of pages that answer your customers’ questions, and a few Google tools. The order matters: decide what the site must achieve first, then choose the technology, and keep every account in your own name.',
  keyPoints: [
    'Register the domain and hosting in your business’s name, not your developer’s.',
    'One page per service ranks and converts better than one page listing everything.',
    'Google’s speed targets: LCP 2.5 s, INP 200 ms, CLS 0.1 or better.',
    'Google Business Profile is free and drives most local enquiries.',
  ],
  sections: [
    {
      id: 'what-it-must-do',
      heading: 'What should a business website actually do?',
      blocks: [
        {
          type: 'p',
          text: 'A business website has three jobs. People must be able to find it, they must trust what they see, and they must be able to contact you in one step. Everything else, from colours to animations, is secondary to those three.',
        },
        {
          type: 'table',
          caption: 'The three jobs of a business website',
          columns: ['Job', 'What it needs', 'How you know it works'],
          rows: [
            [
              'Be found',
              'Pages for each service, Google Search Console, a Google Business Profile',
              'Impressions and clicks in Search Console',
            ],
            [
              'Be trusted',
              'Real photos, clear prices or process, reviews, contact details',
              'Visitors stay and read more than one page',
            ],
            [
              'Get contacted',
              'Call, WhatsApp and form on every page, fast on mobile',
              'Enquiries per week, tracked by source',
            ],
          ],
        },
      ],
    },
    {
      id: 'step-by-step',
      heading: 'What are the steps, from idea to launch?',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Set the goal',
              text: 'Which enquiries or sales should the site bring, and from whom?',
            },
            {
              title: 'Register the domain',
              text: 'Your business name as a .com or .in, in your own account.',
            },
            { title: 'Choose a platform', text: 'WordPress, Shopify, WooCommerce or custom code.' },
            {
              title: 'Gather content',
              text: 'Service details, photos, team, FAQs and contact details.',
            },
            {
              title: 'Design for mobile',
              text: 'Most visitors arrive on a phone, so design there first.',
            },
            {
              title: 'Build and connect',
              text: 'Forms, WhatsApp, call buttons, analytics and email.',
            },
            {
              title: 'Set up Google',
              text: 'Search Console, sitemap and Google Business Profile.',
            },
            {
              title: 'Test and launch',
              text: 'Real phones, slow connections, every form and link.',
            },
            { title: 'Maintain', text: 'Updates, backups and fresh content every month.' },
          ],
        },
        {
          type: 'hook',
          title: 'Skip the nine steps. We’ll do all of it for you.',
          text: 'Send us your business name and what you sell. You get a fixed quote, and we handle the domain, design, build, Google set-up and launch.',
          cta: 'Get a free website quote',
        },
      ],
    },
    {
      id: 'domain-hosting',
      heading: 'What are a domain, hosting and SSL, and who should own them?',
      blocks: [
        {
          type: 'p',
          text: 'Your domain is your address on the internet (yourbusiness.in). Hosting is the computer that serves your site to visitors. SSL is the padlock in the browser bar: it encrypts what visitors type, and browsers warn people away from sites without it. SSL certificates are available free from Let’s Encrypt, so no one should charge you extra for basic HTTPS.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The most expensive mistake we see',
          text: 'A developer registers the domain or hosting in their own account, then leaves. The business loses its website and email. Always register the domain and hosting under your business email, and turn on auto-renew.',
        },
        {
          type: 'checklist',
          title: 'Domain and hosting checklist',
          items: [
            'Domain registered with your business email as the owner',
            'Auto-renew turned on, with a card that won’t expire soon',
            'Hosting account in your name, with your own login',
            'HTTPS working on every page, with and without “www”',
            'A business email on your domain (you@yourbusiness.in)',
          ],
        },
      ],
    },
    {
      id: 'platform',
      heading: 'WordPress, Shopify or custom code: which should you choose?',
      blocks: [
        {
          type: 'p',
          text: 'There is no single best platform. The right one depends on whether you mainly sell products, publish information, or need features no ready-made tool offers.',
        },
        {
          type: 'table',
          caption: 'Choosing a website platform',
          columns: ['', 'WordPress', 'Shopify', 'WooCommerce', 'Custom code'],
          rows: [
            [
              'Best for',
              'Service businesses, blogs, content you update often',
              'Selling products with the least effort',
              'A store and a content site together',
              'Unique features, portals, top speed',
            ],
            ['Editing yourself', 'Easy', 'Easy', 'Easy', 'Through a content system, if built in'],
            [
              'Running costs',
              'Hosting and any paid plugins',
              'Monthly Shopify plan plus app fees',
              'Hosting and any paid extensions',
              'Hosting',
            ],
            [
              'Upkeep',
              'Monthly updates needed',
              'Handled by Shopify',
              'Monthly updates needed',
              'Depends on how it is built',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'A quick rule of thumb',
          text: 'Selling physical products online? Start with Shopify. Mostly services, with content you want to edit? WordPress. Booking flows, logins or something unusual? Custom code.',
        },
      ],
    },
    {
      id: 'pages-content',
      heading: 'Which pages does a business website need?',
      blocks: [
        {
          type: 'list',
          items: [
            'Home: what you do, for whom, and how to contact you, all visible without scrolling.',
            'One page per service: each answers what it is, who it is for, how it works and what it costs to start a conversation.',
            'About: who is behind the business, with real photos.',
            'Work or results: real examples, shared with permission.',
            'Contact: phone, WhatsApp, email, a short form, address and a map if customers visit.',
            'Privacy notice and terms.',
          ],
        },
        {
          type: 'p',
          text: 'Write each service page around the questions customers actually ask you on the phone. Put the direct answer in the first sentence or two, then the detail. This is what Google calls people-first content, and it is also what AI assistants quote.',
        },
      ],
    },
    {
      id: 'speed',
      heading: 'How fast does the site need to be?',
      blocks: [
        {
          type: 'p',
          text: 'Google measures page experience with three Core Web Vitals. A page passes when at least 75% of real visits meet the “good” threshold on each one.',
        },
        {
          type: 'table',
          caption: 'Google’s Core Web Vitals thresholds',
          columns: ['Metric', 'What it measures', 'Good'],
          rows: [
            [
              'Largest Contentful Paint (LCP)',
              'How quickly the main content appears',
              '2.5 seconds or less',
            ],
            [
              'Interaction to Next Paint (INP)',
              'How quickly the page responds to a tap',
              '200 milliseconds or less',
            ],
            [
              'Cumulative Layout Shift (CLS)',
              'How much the page jumps while loading',
              '0.1 or less',
            ],
          ],
        },
        {
          type: 'p',
          text: 'The usual causes of slow sites are oversized images, too many plugins or scripts, and cheap shared hosting. You can check any page for free at pagespeed.web.dev.',
        },
      ],
    },
    {
      id: 'google',
      heading: 'How do you get the website onto Google?',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Search Console', text: 'Verify the site and submit your sitemap.' },
            {
              title: 'Check indexing',
              text: 'Use URL Inspection to confirm Google can see each page.',
            },
            {
              title: 'Business Profile',
              text: 'Create and verify your free Google Business Profile.',
            },
            {
              title: 'Reviews',
              text: 'Ask happy customers for honest reviews, and reply to them.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Google says local results depend mainly on relevance (how well your profile matches the search), distance and prominence (how well known you are, including reviews and links). It also says there is no way to pay for a better local ranking. A complete, accurate profile is the single most useful local step.',
        },
        {
          type: 'hook',
          title: 'Want to show up on Google without learning SEO?',
          text: 'We set up Search Console, your Google Business Profile and pages for the searches that matter, and send you a simple monthly report.',
          cta: 'Ask about SEO',
        },
      ],
    },
    {
      id: 'legal',
      heading: 'What legal basics apply to a website in India?',
      blocks: [
        {
          type: 'p',
          text: 'If your website collects names, phone numbers or emails, it handles personal data. The Digital Personal Data Protection Rules were notified on 13 November 2025 and come into force in phases; most obligations on businesses, including notice and consent, apply 18 months after notification, in May 2027.',
        },
        {
          type: 'list',
          items: [
            'Publish a privacy notice that says what you collect, why, and how people can contact you about it.',
            'Collect only what you need on forms.',
            'Get clear consent before sending marketing messages.',
          ],
        },
        {
          type: 'callout',
          tone: 'fact',
          title: 'Not legal advice',
          text: 'This is a summary for planning. Ask a lawyer how the rules apply to your business.',
        },
      ],
    },
    {
      id: 'ownership',
      heading: 'What should you receive at handover?',
      blocks: [
        {
          type: 'checklist',
          title: 'Handover checklist',
          items: [
            'Admin login to the website, in your name',
            'Domain and hosting logins (if not already yours)',
            'Google Search Console and Analytics with you as owner',
            'Google Business Profile with you as owner',
            'A copy of the code or a full backup',
            'A short guide to making everyday changes',
          ],
        },
      ],
    },
    {
      id: 'mistakes',
      heading: 'What are the most common mistakes?',
      blocks: [
        {
          type: 'list',
          items: [
            'Putting every service on one page, so none of them ranks.',
            'No WhatsApp or call button on mobile.',
            'Stock photos instead of real ones.',
            'Contact forms that are never tested and quietly fail.',
            'No one responsible for updates after launch.',
          ],
        },
        {
          type: 'hook',
          title: 'Rather not risk any of these?',
          text: 'Tell us about your business. We’ll reply with a plan, similar sites we’ve built and a fixed quote.',
          cta: 'Start on WhatsApp',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How long does it take to build a business website?',
      answer:
        'A typical five to fifteen page business website takes a few weeks once content is ready. Online stores and custom features take longer. Getting content and photos ready is often the slowest part.',
    },
    {
      question: 'Is a .in domain or a .com better for an Indian business?',
      answer:
        'Both work well on Google in India. Choose the one that is available, short and easy to say. Many businesses register both and point one to the other.',
    },
    {
      question: 'Can I build the website myself?',
      answer:
        'Yes, with tools like WordPress or Shopify. It takes time to get speed, SEO and forms right. Many owners start themselves and bring in help when the site needs to bring in leads.',
    },
    {
      question: 'Do I need to update the website after launch?',
      answer:
        'Yes. Software needs security updates, and Google rewards pages that stay accurate and useful. Plan for monthly care.',
    },
  ],
  sources: [
    { title: 'Google: Core Web Vitals (web.dev)', url: 'https://web.dev/articles/vitals' },
    {
      title: 'Google: How local results are ranked',
      url: 'https://support.google.com/business/answer/7091',
    },
    {
      title: 'Google: SEO Starter Guide',
      url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',
    },
    { title: 'Let’s Encrypt: free SSL certificates', url: 'https://letsencrypt.org/' },
    {
      title: 'AZB & Partners: DPDP Act phased rollout',
      url: 'https://www.azbpartners.com/bank/indias-digital-personal-data-protection-act-phased-rollout-and-key-compliance-milestones/',
    },
  ],
  related: [
    'website-development/business-websites',
    'website-development/wordpress',
    'website-development/shopify',
    'seo-services/local-seo',
    'seo-services/website-maintenance',
  ],
  review: 'approved',
};

/* ------------------------------------------------------------------ */

const whatsappGuide: LongGuide = {
  slug: 'whatsapp-chatbot-guide',
  title: 'WhatsApp chatbot for business: the complete guide',
  seoTitle: 'WhatsApp Chatbot for Business in India: Complete Guide (2026)',
  description:
    'How WhatsApp chatbots work: the Business app vs the API, Meta’s per-message pricing, opt-in rules, set-up steps and what to automate first. Checked against Meta’s docs.',
  updated: '2026-10-21',
  readMinutes: 13,
  service: 'ai-chatbots-automation',
  whatsapp: 'Hi CodeMindset, I read your WhatsApp chatbot guide and want one for my business.',
  answer:
    'A WhatsApp chatbot runs on the WhatsApp Business Platform (the API), not the free Business app. It answers common questions, takes bookings and collects leads automatically, and hands the chat to a person when needed. Meta charges per delivered message by category and country, and customers must opt in before you message them.',
  keyPoints: [
    'Chatbots need the WhatsApp Business Platform (API), set up through Meta or a provider.',
    'Pricing has been per delivered message since 1 July 2025; messages customers send you are free.',
    'From 1 October 2026 each number gets 1,000 free service messages a month.',
    'You need opt-in before messaging people, and a clear route to a human.',
  ],
  sections: [
    {
      id: 'what-it-is',
      heading: 'What is a WhatsApp chatbot?',
      blocks: [
        {
          type: 'p',
          text: 'A WhatsApp chatbot is software connected to your business number that reads incoming messages and replies automatically. Simple bots use menus and buttons. AI bots understand free-typed questions and answer from information you give them, such as your prices, timings and policies.',
        },
        {
          type: 'list',
          items: [
            'Answer the same questions your staff answer twenty times a day.',
            'Take bookings, orders and enquiry details at any hour.',
            'Send order updates, reminders and payment links.',
            'Pass the conversation to your team, with the details already collected.',
          ],
        },
      ],
    },
    {
      id: 'app-vs-api',
      heading: 'WhatsApp Business app or API: which do you need?',
      blocks: [
        {
          type: 'table',
          caption: 'WhatsApp Business app vs the WhatsApp Business Platform (API)',
          columns: ['', 'WhatsApp Business app', 'WhatsApp Business Platform (API)'],
          rows: [
            ['Who it suits', 'One owner replying by hand', 'Teams, automation and integrations'],
            [
              'Chatbots',
              'Quick replies and greeting messages only',
              'Full chatbots, AI replies and flows',
            ],
            [
              'Several staff on one number',
              'Limited to linked devices',
              'Yes, through an inbox or CRM',
            ],
            ['Cost', 'Free', 'Per delivered message, by category and country'],
            ['Connect to CRM or website', 'No', 'Yes'],
          ],
        },
        {
          type: 'callout',
          tone: 'fact',
          title: 'You may be able to keep your current number on both',
          text: 'Meta’s “coexistence” lets a number that already uses the WhatsApp Business app also connect to the Cloud API, with chats kept in sync. Some app features are turned off when you do this, such as broadcast lists and disappearing messages, so check the trade-offs first.',
        },
      ],
    },
    {
      id: 'pricing',
      heading: 'How much does WhatsApp charge for business messages?',
      blocks: [
        {
          type: 'p',
          text: 'Since 1 July 2025 Meta has charged per delivered message instead of per conversation. Each message is charged at most once, based on its category and the recipient’s country. Messages your customers send you are not charged.',
        },
        {
          type: 'table',
          caption: 'WhatsApp message categories (Meta, as of October 2026)',
          columns: ['Category', 'Used for', 'Charged?'],
          rows: [
            ['Marketing', 'Offers, announcements, re-engagement', 'Yes, per delivered message'],
            [
              'Utility',
              'Order updates, reminders, account alerts',
              'Yes. It was free inside the 24-hour window until 30 September 2026',
            ],
            ['Authentication', 'One-time passwords and login codes', 'Yes, per delivered message'],
            [
              'Service',
              'Replies to a customer within 24 hours of their message',
              'First 1,000 a month per number are free (since 1 October 2026)',
            ],
          ],
        },
        {
          type: 'p',
          text: 'The 24-hour customer service window opens when a customer messages you and resets with each new message. Inside it you can reply freely; outside it you must use an approved template. Rates per country are published on Meta’s pricing page and change on the first day of a quarter.',
        },
        {
          type: 'hook',
          title: 'Not sure what it would cost you?',
          text: 'Tell us roughly how many customers message you each month. We’ll estimate the WhatsApp running costs and quote the set-up, in writing.',
          cta: 'Get a cost estimate',
        },
      ],
    },
    {
      id: 'rules',
      heading: 'What rules must a WhatsApp business account follow?',
      blocks: [
        {
          type: 'p',
          text: 'Every business account must follow WhatsApp’s Business Messaging Policy. Breaking it can lower your quality rating and limit or ban the number.',
        },
        {
          type: 'checklist',
          title: 'Policy essentials',
          items: [
            'Message people only after they opt in to hear from you',
            'Make it clear what kind of messages they will get',
            'Offer a quick way to reach a human: agent, phone, email or support form',
            'Stop messaging anyone who asks you to, on or off WhatsApp',
            'Use approved templates for messages outside the 24-hour window',
          ],
        },
      ],
    },
    {
      id: 'setup',
      heading: 'How do you set up a WhatsApp chatbot, step by step?',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Meta Business account',
              text: 'Create or use your Meta Business account and verify the business.',
            },
            {
              title: 'Choose a route',
              text: 'Meta’s Cloud API directly, or an approved Business Solution Provider.',
            },
            {
              title: 'Register the number',
              text: 'A new number, or your current one through coexistence.',
            },
            {
              title: 'List the questions',
              text: 'Collect the 20–30 questions customers ask most, with correct answers.',
            },
            {
              title: 'Design the flows',
              text: 'Greeting, menu, answers, booking or order, and hand-over.',
            },
            {
              title: 'Templates',
              text: 'Write reminders and updates, and submit them for approval.',
            },
            { title: 'Connect your tools', text: 'Save leads to your CRM, sheet or helpdesk.' },
            { title: 'Test and launch', text: 'Try hard and silly questions, then go live.' },
          ],
        },
        {
          type: 'hook',
          title: 'Skip all eight steps. We’ll set it up for you.',
          text: 'We handle the Meta set-up, the flows, the templates and the CRM connection, on your number. You review it before anything goes live.',
          cta: 'Get a free chatbot quote',
        },
      ],
    },
    {
      id: 'good-bot',
      heading: 'What makes a chatbot customers actually like?',
      blocks: [
        {
          type: 'list',
          items: [
            'It says it is an assistant, and offers a human early.',
            'It answers in one or two short messages, not walls of text.',
            'It only answers from information you approved, and admits when it does not know.',
            'It remembers what the customer already said when it hands over.',
            'It replies in the customer’s language, including Hindi or Hinglish if they use it.',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Start small',
          text: 'Automate the five questions you get most, plus lead capture. Add bookings and payments once those work well.',
        },
      ],
    },
    {
      id: 'measure',
      heading: 'How do you know the chatbot is working?',
      blocks: [
        {
          type: 'table',
          caption: 'What to measure each month',
          columns: ['Measure', 'Why it matters'],
          rows: [
            ['Leads captured', 'The main reason most businesses add a bot'],
            ['Questions answered without staff', 'Time saved for your team'],
            ['Hand-overs to a person', 'Shows where the bot needs better answers'],
            ['Reply time at night and weekends', 'Enquiries you would otherwise lose'],
            ['Opt-outs and blocks', 'An early warning of annoying messages'],
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is a WhatsApp chatbot legal in India?',
      answer:
        'Yes, when it runs on the official WhatsApp Business Platform and follows WhatsApp’s policies, including opt-in and opt-out. Collecting personal data also brings duties under India’s data protection rules.',
    },
    {
      question: 'Can I use a chatbot on the free WhatsApp Business app?',
      answer:
        'Only basic greeting and quick replies. Proper chatbots, AI replies and CRM connections need the WhatsApp Business Platform (API).',
    },
    {
      question: 'Can the chatbot reply in Hindi?',
      answer:
        'Yes. AI models handle Hindi, Hinglish and English. Test the answers with real customers’ wording before launch.',
    },
    {
      question: 'Can I send bulk messages?',
      answer:
        'You can send marketing templates to people who have opted in. Messaging people without permission breaks WhatsApp’s policy and can get the number restricted.',
    },
  ],
  sources: [
    {
      title: 'Meta: WhatsApp Business Platform pricing',
      url: 'https://developers.facebook.com/docs/whatsapp/pricing',
    },
    { title: 'WhatsApp Business Messaging Policy', url: 'https://whatsappbusiness.com/policy/' },
    {
      title: 'Meta: Onboarding WhatsApp Business app users (coexistence)',
      url: 'https://developers.facebook.com/docs/whatsapp/embedded-signup/custom-flows/onboarding-business-app-users',
    },
  ],
  related: [
    'ai-chatbots-automation/whatsapp-chatbots',
    'crm-whatsapp-integration/whatsapp-business-api',
    'crm-whatsapp-integration/crm-integration',
    'ai-chatbots-automation/website-chatbots',
  ],
  review: 'approved',
};

/* ------------------------------------------------------------------ */

const searchGuide: LongGuide = {
  slug: 'seo-aeo-geo-guide',
  title: 'SEO, AEO and GEO: how to get found on Google and AI assistants',
  seoTitle: 'SEO vs AEO vs GEO: Get Found on Google & AI Assistants (2026 Guide)',
  description:
    'What SEO, AEO and GEO mean, how Google and AI assistants choose sources, what research shows works, and a step-by-step plan for any business. No myths.',
  updated: '2026-10-21',
  readMinutes: 16,
  service: 'seo-services',
  whatsapp: 'Hi CodeMindset, I read your SEO, AEO and GEO guide and want help getting found.',
  answer:
    'SEO helps your pages rank on Google. AEO makes those pages easy to quote as a direct answer in snippets, AI Overviews and voice results. GEO helps AI assistants like ChatGPT and Perplexity understand and cite you. All three rest on the same base: pages that can be crawled, clearly answer real questions, and are backed by evidence.',
  keyPoints: [
    'Google says AI Overviews need no special markup or files, just normal SEO.',
    'A study of AI Overviews found most cited pages already rank in Google’s top 10.',
    'Research shows quotes, statistics and cited sources raise AI visibility; keyword stuffing lowers it.',
    'To appear in ChatGPT search, allow OpenAI’s OAI-SearchBot crawler.',
  ],
  sections: [
    {
      id: 'definitions',
      heading: 'What is the difference between SEO, AEO and GEO?',
      blocks: [
        {
          type: 'table',
          caption: 'SEO, AEO and GEO compared',
          columns: ['', 'SEO', 'AEO', 'GEO'],
          rows: [
            [
              'Stands for',
              'Search engine optimisation',
              'Answer engine optimisation',
              'Generative engine optimisation',
            ],
            [
              'Goal',
              'Rank in search results',
              'Be the answer that gets quoted',
              'Be named and cited in AI answers',
            ],
            [
              'Where it shows',
              'Google and Bing results, Maps',
              'Featured snippets, AI Overviews, voice',
              'ChatGPT, Gemini, Perplexity, Copilot',
            ],
            [
              'Main levers',
              'Crawlable pages, relevance, links, speed',
              'Direct answers, question headings, structure',
              'Evidence, sources, consistent brand facts, crawler access',
            ],
          ],
        },
        {
          type: 'p',
          text: 'They are layers, not rivals. AEO and GEO do little for a page Google cannot crawl or does not trust, so the SEO foundation always comes first.',
        },
      ],
    },
    {
      id: 'how-google-picks',
      heading: 'How does Google choose sources for AI Overviews?',
      blocks: [
        {
          type: 'p',
          text: 'Google’s own guidance is that there are no additional requirements to appear in AI Overviews or AI Mode. A page must be indexed and eligible to show with a snippet, and no special structured data or AI-specific file is needed. Its advice is the usual SEO basics and people-first content.',
        },
        {
          type: 'callout',
          tone: 'fact',
          title: 'What an independent study found',
          text: 'A Surfer analysis of AI Overviews found that about 70% of cited sources came from Google’s top 10 results for the search or for related “fan-out” searches. Pages ranking far lower were rarely cited. In practice: rank first, then make the page easy to quote.',
        },
      ],
    },
    {
      id: 'what-research-says',
      heading: 'What does research say actually works for AI visibility?',
      blocks: [
        {
          type: 'p',
          text: 'The study that named GEO was published at KDD 2024 by Pranjal Aggarwal and colleagues, including researchers at Princeton University. They tested nine ways of editing content across 10,000 queries and measured how visible each source became in AI-written answers.',
        },
        {
          type: 'table',
          caption: 'GEO study results (overall visibility score; baseline 19.3)',
          columns: ['Change to the content', 'Score', 'Effect'],
          rows: [
            ['Add relevant quotations', '27.2', 'About 41% better'],
            ['Add statistics', '25.2', 'About 31% better'],
            ['Improve fluency', '24.7', 'About 28% better'],
            ['Cite sources', '24.6', 'About 27% better'],
            ['Keyword stuffing', '17.7', 'About 8% worse'],
          ],
        },
        {
          type: 'p',
          text: 'The pattern is clear: AI systems favour content that is specific, evidenced and readable. Repeating keywords, the oldest SEO trick, made things worse.',
        },
        {
          type: 'hook',
          title: 'Want to know what ChatGPT says about your business?',
          text: 'We’ll ask the major AI assistants the questions your customers ask, and show you who they recommend today. Free, with no obligation.',
          cta: 'Get a free AI visibility check',
        },
      ],
    },
    {
      id: 'plan',
      heading: 'What is the step-by-step plan for a growing business?',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Fix the foundation',
              text: 'Search Console, sitemap, HTTPS, speed and no blocked pages.',
            },
            {
              title: 'Claim local listings',
              text: 'A complete, verified Google Business Profile and Bing Places.',
            },
            {
              title: 'One page per intent',
              text: 'A page for each service and question customers really have.',
            },
            {
              title: 'Answer first',
              text: 'Put a direct answer in the first two sentences of each page.',
            },
            { title: 'Add evidence', text: 'Real numbers, named sources, quotes and dated facts.' },
            {
              title: 'Structure',
              text: 'Question headings, lists, tables and matching structured data.',
            },
            {
              title: 'Let AI crawlers in',
              text: 'Allow OAI-SearchBot, PerplexityBot and similar in robots.txt.',
            },
            {
              title: 'Be consistent everywhere',
              text: 'Same name, address, phone and services across the web.',
            },
            { title: 'Earn mentions', text: 'Reviews, directories, partners and local press.' },
            {
              title: 'Measure monthly',
              text: 'Search Console, Bing Webmaster Tools and AI answer checks.',
            },
          ],
        },
      ],
    },
    {
      id: 'answer-first',
      heading: 'How do you write content that gets quoted?',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Use the customer’s question as the heading: “How much does a website cost in India?”',
            'Answer it in one or two plain sentences straight after the heading.',
            'Back the answer with specifics: steps, a table, a number with its source.',
            'Add a short FAQ for the follow-up questions.',
            'Show who wrote it and when it was last checked.',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Write for the person, not the machine',
          text: 'Google calls keyword stuffing a spam policy violation, and the GEO study shows it hurts AI visibility too. Clear writing helps both people and machines.',
        },
      ],
    },
    {
      id: 'crawlers',
      heading: 'Which AI crawlers should you allow?',
      blocks: [
        {
          type: 'table',
          caption: 'Common AI crawlers and what they do',
          columns: ['Crawler', 'Company', 'What it is for'],
          rows: [
            [
              'OAI-SearchBot',
              'OpenAI',
              'Shows sites in ChatGPT search answers; must be allowed to appear there',
            ],
            [
              'GPTBot',
              'OpenAI',
              'Collects training data; blocking it does not affect ChatGPT search',
            ],
            ['ChatGPT-User', 'OpenAI', 'Visits pages when a user asks ChatGPT to'],
            ['PerplexityBot', 'Perplexity', 'Indexes pages for Perplexity answers'],
            ['Googlebot', 'Google', 'Google Search, including AI Overviews'],
            ['Bingbot', 'Microsoft', 'Bing search, which Microsoft Copilot draws on'],
          ],
        },
        {
          type: 'p',
          text: 'Changes to robots.txt can take about a day to affect ChatGPT search, according to OpenAI.',
        },
      ],
    },
    {
      id: 'myths',
      heading: 'Which SEO and AI search “tips” are myths?',
      blocks: [
        {
          type: 'table',
          caption: 'Myths vs what the sources say',
          columns: ['Myth', 'What is true'],
          rows: [
            [
              'You need special schema for AI Overviews',
              'Google says no special structured data is needed',
            ],
            [
              'An llms.txt file gets you into Google’s AI',
              'Google’s Gary Illyes said in July 2025 that Google does not support llms.txt',
            ],
            ['Meta keywords help rankings', 'Google says it does not use the keywords meta tag'],
            [
              'You can pay Google for a better Maps ranking',
              'Google says there is no way to request or pay for one',
            ],
            ['Someone can guarantee you #1', 'No one controls Google’s or an AI’s answers'],
          ],
        },
      ],
    },
    {
      id: 'measure',
      heading: 'How do you measure SEO, AEO and GEO?',
      blocks: [
        {
          type: 'list',
          items: [
            'Google Search Console: impressions, clicks and the searches you appear for.',
            'Bing Webmaster Tools: Bing and Copilot visibility.',
            'Google Business Profile insights: calls, direction requests and website clicks.',
            'A fixed list of customer questions asked to ChatGPT, Gemini, Perplexity and Copilot each month, noting whether you are named.',
            'Enquiries by source on your website and WhatsApp.',
          ],
        },
        {
          type: 'hook',
          title: 'Skip the learning curve. We’ll run all of this for you.',
          text: 'SEO, AEO and GEO in one monthly plan, with a short report in plain English. No fake guarantees.',
          cta: 'Ask about SEO, AEO & GEO',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is GEO replacing SEO?',
      answer:
        'No. AI answers mostly draw on pages search engines already rank. GEO is an extra layer on top of solid SEO.',
    },
    {
      question: 'How long does it take to see results?',
      answer:
        'Technical fixes and Google Business Profile changes can show within weeks. Rankings and AI mentions usually build over a few months, depending on competition.',
    },
    {
      question: 'Should I block AI crawlers to protect my content?',
      answer:
        'You can block training crawlers like GPTBot and still allow search crawlers like OAI-SearchBot. Blocking search crawlers removes you from those AI answers.',
    },
    {
      question: 'Does structured data help?',
      answer:
        'It helps search engines understand your page and can enable rich results, but it must match what is visible on the page. Google says it is not required for AI Overviews.',
    },
  ],
  sources: [
    {
      title: 'Google: AI features and your website',
      url: 'https://developers.google.com/search/docs/appearance/ai-features',
    },
    {
      title: 'Aggarwal et al., “GEO: Generative Engine Optimization”, KDD 2024',
      url: 'https://arxiv.org/abs/2311.09735',
    },
    {
      title: 'Surfer: How AI Overviews choose sources',
      url: 'https://surferseo.com/blog/how-ai-overviews-choose-sources',
    },
    {
      title: 'OpenAI: Overview of OpenAI crawlers',
      url: 'https://developers.openai.com/api/docs/bots',
    },
    {
      title: 'Search Engine Land: Google says llms.txt won’t be used',
      url: 'https://searchengineland.com/google-says-normal-seo-works-for-ranking-in-ai-overviews-and-llms-txt-wont-be-used-459422',
    },
    {
      title: 'Google: SEO Starter Guide',
      url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',
    },
    {
      title: 'Google: How local results are ranked',
      url: 'https://support.google.com/business/answer/7091',
    },
  ],
  related: [
    'seo-services/answer-engine-optimization',
    'seo-services/generative-engine-optimization',
    'seo-services/local-seo',
    'seo-services/website-speed',
    'website-development/website-redesign',
  ],
  review: 'approved',
};

/* ------------------------------------------------------------------ */

const appGuide: LongGuide = {
  slug: 'mobile-app-guide',
  title: 'Mobile app development in India: from idea to Play Store and App Store',
  seoTitle: 'Mobile App Development Process in India: Idea to Play Store (2026 Guide)',
  description:
    'Do you need an app? Android vs iPhone in India, native vs Flutter, every development step, Google Play and App Store account rules, and what happens after launch.',
  updated: '2026-10-21',
  readMinutes: 13,
  service: 'mobile-app-development',
  whatsapp: 'Hi CodeMindset, I read your app guide and want to discuss an app.',
  answer:
    'Building an app means deciding whether you need one, choosing Android, iPhone or both, designing and building it, then publishing it under your own store accounts. In India about 94% of mobile users are on Android, so many businesses start there. Google Play has a one-time fee; Apple charges yearly.',
  keyPoints: [
    'Android held 93.89% of India’s mobile OS share in September 2026 (StatCounter).',
    'Google Play: US$25 one-time; new personal accounts must run a 12-tester, 14-day closed test.',
    'Apple Developer Program: US$99 a year; organisations need a D-U-N-S number.',
    'Publish under your own accounts so the app stays yours.',
  ],
  sections: [
    {
      id: 'need-an-app',
      heading: 'Do you actually need an app?',
      blocks: [
        {
          type: 'p',
          text: 'An app earns its place when customers use your service often: ordering, booking, tracking deliveries or managing an account. If people visit once or twice a year, a fast mobile website usually serves them better and costs less to maintain.',
        },
        {
          type: 'table',
          caption: 'Website, web app or mobile app?',
          columns: ['', 'Mobile website', 'Web app (PWA)', 'Mobile app'],
          rows: [
            ['Install needed', 'No', 'Optional, from the browser', 'Yes, from an app store'],
            [
              'Best for',
              'Being found and contacted',
              'Dashboards, portals, tools',
              'Frequent use, notifications, device features',
            ],
            ['Push notifications', 'No', 'Supported on most modern phones', 'Yes'],
            ['Store approval', 'No', 'No', 'Yes, Google and Apple'],
          ],
        },
      ],
    },
    {
      id: 'android-ios',
      heading: 'Android or iPhone first?',
      blocks: [
        {
          type: 'callout',
          tone: 'fact',
          title: 'India’s phone market',
          text: 'In September 2026, Android ran on 93.89% of mobile devices in India and iOS on 6.05%, according to StatCounter.',
        },
        {
          type: 'p',
          text: 'For most Indian consumer apps, Android comes first. If your customers are premium buyers or businesses, check your own analytics: the iPhone share among them may be much higher than the national figure.',
        },
      ],
    },
    {
      id: 'native-cross',
      heading: 'Native or cross-platform (Flutter, React Native)?',
      blocks: [
        {
          type: 'table',
          caption: 'Native vs cross-platform',
          columns: ['', 'Native (Kotlin, Swift)', 'Cross-platform (Flutter, React Native)'],
          rows: [
            ['Codebases', 'One per platform', 'One for both'],
            ['Speed to launch on both', 'Slower', 'Faster'],
            ['Best for', 'Heavy graphics, deep device features', 'Most business apps'],
            ['Maintenance', 'Two apps to update', 'One app to update'],
          ],
        },
      ],
    },
    {
      id: 'process',
      heading: 'What are the steps to build an app?',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Define the first version',
              text: 'Only the features needed to be useful on day one.',
            },
            { title: 'Wireframes', text: 'Rough screens to agree the flow before design.' },
            { title: 'Design', text: 'Clickable screens you can test on your phone.' },
            { title: 'Backend', text: 'Database, logins, payments and admin panel.' },
            { title: 'Build the app', text: 'In short stages, with a working build each time.' },
            { title: 'Test', text: 'On real low, mid and high-end phones and slow networks.' },
            {
              title: 'Store accounts',
              text: 'Google Play and Apple accounts in your business name.',
            },
            { title: 'Publish', text: 'Listings, screenshots, privacy details and review.' },
            { title: 'Improve', text: 'Crash reports, analytics, updates for new OS versions.' },
          ],
        },
        {
          type: 'hook',
          title: 'Skip the nine steps. We’ll build and publish it for you.',
          text: 'Tell us what your customers should be able to do in the app. You get a fixed quote, clickable designs first, and the app published under your name.',
          cta: 'Get a free app quote',
        },
      ],
    },
    {
      id: 'stores',
      heading: 'What do Google Play and the App Store require?',
      blocks: [
        {
          type: 'table',
          caption: 'Store developer accounts',
          columns: ['', 'Google Play', 'Apple App Store'],
          rows: [
            ['Fee', 'US$25, one time', 'US$99 a year (local currency where available)'],
            [
              'Extra rule',
              'Personal accounts created after 13 Nov 2023 must run a closed test with 12+ testers for 14 days before production',
              'Organisations need a legal entity, a D-U-N-S number, a website and a work email on the company domain',
            ],
            ['Review', 'Policy review before publishing', 'App Review before every release'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Use your own accounts',
          text: 'If the app is published under your developer’s account, you do not control it. Open the store accounts in your business name and add your developer as a team member.',
        },
      ],
    },
    {
      id: 'after-launch',
      heading: 'What happens after launch?',
      blocks: [
        {
          type: 'list',
          items: [
            'Android and iOS release new versions every year; apps need updates to keep working and meet store rules.',
            'Crash reports and reviews show what to fix first.',
            'Analytics show which features people use, and which to drop.',
            'Security updates for the backend and libraries.',
          ],
        },
      ],
    },
    {
      id: 'cost-drivers',
      heading: 'What decides the cost of an app?',
      blocks: [
        {
          type: 'list',
          items: [
            'Number of screens and user types (customer, staff, admin).',
            'Logins, payments, maps, chat or video features.',
            'One platform or both.',
            'Integrations with your CRM, ERP or website.',
            'Ongoing support after launch.',
          ],
        },
        {
          type: 'hook',
          title: 'Want a number instead of a range?',
          text: 'Share your idea in a few lines. We’ll send a fixed, written quote with the delivery date.',
          cta: 'Start on WhatsApp',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How long does it take to build an app?',
      answer:
        'A focused first version usually takes a few months. Larger apps with payments, maps or several user types take longer. Store reviews can add a few days.',
    },
    {
      question: 'Do I need a company to publish on the App Store?',
      answer:
        'No, individuals can enrol. To publish under a company name, Apple requires a legal entity and a D-U-N-S number.',
    },
    {
      question: 'Can one app work on Android and iPhone?',
      answer:
        'Yes. Flutter and React Native build one app for both, which suits most business apps.',
    },
  ],
  sources: [
    {
      title: 'StatCounter: Mobile OS market share in India',
      url: 'https://gs.statcounter.com/os-market-share/mobile/india',
    },
    {
      title: 'Google Play Console: registration fee',
      url: 'https://support.google.com/googleplay/android-developer/answer/6112435',
    },
    {
      title: 'Google Play: testing requirements for new personal accounts',
      url: 'https://support.google.com/googleplay/android-developer/answer/14151465',
    },
    {
      title: 'Apple: Program enrollment',
      url: 'https://developer.apple.com/help/account/membership/program-enrollment',
    },
  ],
  related: [
    'mobile-app-development/android-apps',
    'mobile-app-development/flutter',
    'mobile-app-development/ios-apps',
    'crm-whatsapp-integration/payment-gateway-integration',
  ],
  review: 'approved',
};

/* ------------------------------------------------------------------ */

const crmGuide: LongGuide = {
  slug: 'crm-guide',
  title: 'CRM for a growing business in India: how to choose it and connect WhatsApp',
  seoTitle: 'How to Choose a CRM in India & Connect WhatsApp (2026 Guide)',
  description:
    'What a CRM does, signs you need one, how to choose between Zoho, HubSpot and others, free plans, and how to connect your website and WhatsApp step by step.',
  updated: '2026-10-21',
  readMinutes: 11,
  service: 'crm-whatsapp-integration',
  whatsapp: 'Hi CodeMindset, I read your CRM guide and want help setting one up.',
  answer:
    'A CRM keeps every lead and customer in one place, with reminders so nobody is forgotten. Most growing businesses do well with Zoho CRM or HubSpot, both of which have free plans. The real value comes from connecting it to your website forms and WhatsApp, so leads arrive automatically.',
  keyPoints: [
    'Zoho CRM’s free edition supports up to 3 users.',
    'HubSpot’s free CRM allows up to 2 users and 1,000 contacts.',
    'Connect every lead source before training the team.',
    'WhatsApp in a CRM needs the WhatsApp Business Platform (API).',
  ],
  sections: [
    {
      id: 'what-it-does',
      heading: 'What does a CRM actually do?',
      blocks: [
        {
          type: 'p',
          text: 'CRM stands for customer relationship management. In practice it is a shared list of every lead and customer, where each one sits in your sales process, and what needs doing next. Instead of chats, notebooks and spreadsheets, your team works from one screen.',
        },
        {
          type: 'list',
          items: [
            'Captures leads from your website, WhatsApp, calls and ads automatically.',
            'Shows each lead’s stage: new, contacted, quoted, won or lost.',
            'Reminds staff to follow up, so no lead goes cold.',
            'Shows which sources bring paying customers.',
          ],
        },
      ],
    },
    {
      id: 'signs',
      heading: 'How do you know you need a CRM?',
      blocks: [
        {
          type: 'checklist',
          title: 'You probably need one if',
          items: [
            'Leads arrive on WhatsApp, calls, email and forms, and some get missed',
            'Two people sometimes call the same customer',
            'Nobody can say how many enquiries came in last month',
            'Follow-ups depend on someone remembering',
            'You can’t tell which ads or sources bring sales',
          ],
        },
      ],
    },
    {
      id: 'choosing',
      heading: 'Which CRM should a growing business choose?',
      blocks: [
        {
          type: 'table',
          caption: 'Common CRM options (free plans as stated by the vendors)',
          columns: ['', 'Zoho CRM', 'HubSpot CRM', 'Custom CRM'],
          rows: [
            [
              'Free plan',
              'Free edition for up to 3 users',
              'Free, up to 2 users and 1,000 contacts',
              'Not applicable',
            ],
            [
              'Good for',
              'Teams wanting many features and Indian support',
              'Easy start, marketing and sales together',
              'Unusual processes ready-made tools don’t fit',
            ],
            [
              'Grows by',
              'Paid editions per user',
              'Paid hubs and seats',
              'Adding features as needed',
            ],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'How many people will use it now, and in a year?',
            'Where do your leads come from today?',
            'Which tools must it connect to: WhatsApp, accounting, your website?',
            'Who will keep the data clean?',
          ],
        },
        {
          type: 'hook',
          title: 'Not sure which CRM fits?',
          text: 'Tell us your team size and where your leads come from. We’ll recommend one, with reasons, and set it up for you.',
          cta: 'Get a CRM recommendation',
        },
      ],
    },
    {
      id: 'setup',
      heading: 'How do you set up a CRM and connect WhatsApp, step by step?',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Map your sales stages',
              text: 'From new enquiry to paid customer, in your words.',
            },
            {
              title: 'Clean existing data',
              text: 'Merge duplicates in old sheets before importing.',
            },
            { title: 'Import', text: 'Contacts, open deals and owners.' },
            { title: 'Connect the website', text: 'Every form sends leads straight into the CRM.' },
            {
              title: 'Connect WhatsApp',
              text: 'Through the WhatsApp Business Platform, chats appear on each lead.',
            },
            { title: 'Automate follow-ups', text: 'Tasks and reminders when a lead goes quiet.' },
            { title: 'Train the team', text: 'A short daily routine everyone follows.' },
            { title: 'Review monthly', text: 'Leads by source, response time and win rate.' },
          ],
        },
        {
          type: 'hook',
          title: 'Skip the set-up. We’ll connect everything for you.',
          text: 'Website, WhatsApp, payments and your CRM, connected so every lead lands in one place. Fixed quote, done for you.',
          cta: 'Get a free integration quote',
        },
      ],
    },
    {
      id: 'mistakes',
      heading: 'What are common CRM mistakes?',
      blocks: [
        {
          type: 'list',
          items: [
            'Buying the CRM before agreeing the sales stages.',
            'Importing messy spreadsheets as they are.',
            'Leaving one lead source unconnected, so staff still copy by hand.',
            'Too many required fields, so the team stops using it.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is a free CRM enough for a growing business?',
      answer:
        'Often, at the start. Zoho CRM’s free edition (3 users) and HubSpot’s free CRM (2 users, 1,000 contacts) cover basic lead tracking. Paid plans add automation and more users.',
    },
    {
      question: 'Can WhatsApp chats appear inside the CRM?',
      answer:
        'Yes, through the WhatsApp Business Platform (API) and an integration. The free WhatsApp Business app cannot connect to a CRM.',
    },
    {
      question: 'Can you move my data from Excel?',
      answer: 'Yes. Clean it first, then import it with owners and stages so nothing is lost.',
    },
  ],
  sources: [
    { title: 'Zoho: Free CRM edition', url: 'https://www.zoho.com/crm/free-crm.html' },
    { title: 'HubSpot: Free CRM', url: 'https://www.hubspot.com/products/crm' },
    {
      title: 'Meta: WhatsApp Business Platform pricing',
      url: 'https://developers.facebook.com/docs/whatsapp/pricing',
    },
  ],
  related: [
    'crm-whatsapp-integration/crm-integration',
    'crm-whatsapp-integration/whatsapp-business-api',
    'ai-chatbots-automation/workflow-automation',
    'ai-chatbots-automation/whatsapp-chatbots',
  ],
  review: 'approved',
};

export const longGuides: LongGuide[] = [
  websiteGuide,
  whatsappGuide,
  searchGuide,
  appGuide,
  crmGuide,
];
