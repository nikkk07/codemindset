import { P, T } from './service-helpers';
import { serviceDetails } from './service-details';
import { servicePages } from './service-pages';
import { advancedHubs } from './services-advanced';
import type { ServiceHub, SubService } from './types';

/**
 * Service catalogue: hubs → platform and need pages → one "how to choose" guide each.
 * Everyday hubs live here; advanced hubs (AI engineering, data, security, blockchain) in services-advanced.ts.
 *
 * Readiness 'ready' reflects the owner's confirmation (2026-10-16) that the team delivers across
 * these technologies. Every page stays 'draft' (hidden in production) until its copy is approved.
 * Write in plain words first; technical detail comes lower on each page.
 */

/* ------------------------------------------------------------------ */

const website: ServiceHub = {
  slug: 'website-development',
  segment: 'everyday',
  icon: 'website',
  title: 'Website development',
  plainTitle: 'A website for my business',
  blurb: 'Business websites and online stores',
  eyebrow: 'Website development company in India',
  h1: 'Website development',
  h1Accent: 'that grows your business',
  answer:
    'We design and build business websites and online stores that bring in enquiries. Every site is made for mobile, set up for Google and has WhatsApp built in. You get a fixed quote and full ownership.',
  simple: {
    title: 'Why does a business need a website?',
    steps: [
      {
        title: 'People find you',
        text: 'On Google, Google Maps and AI assistants like ChatGPT, when they search for what you sell.',
      },
      {
        title: 'They trust you',
        text: 'A clear, fast, professional site shows you’re a real business worth choosing.',
      },
      {
        title: 'They contact you',
        text: 'Call, WhatsApp, enquire or buy in one tap, from any phone.',
      },
    ],
  },
  platformsLabel: 'Which technology do we use?',
  platforms: [
    P(
      'wordpress',
      'WordPress',
      'WordPress website development',
      'A website you can edit yourself, as easily as a document.',
      'Business websites, blogs and content you update often.',
      [
        'Custom design on WordPress',
        'Easy editing for your team',
        'Speed and security setup',
        'SEO-ready pages and blog',
      ],
      [
        {
          question: 'Is WordPress good for a business website?',
          answer:
            'Yes, for most business and content websites. It is easy to edit, widely supported and flexible. For online stores Shopify is often simpler; for unique features, custom code.',
        },
      ],
    ),
    P(
      'shopify',
      'Shopify',
      'Shopify store development',
      'A ready-made online shop with payments and delivery built in.',
      'Selling products online, quickly and reliably.',
      [
        'Store setup and theme design',
        'Products, payments and shipping',
        'Shopify apps and integrations',
        'Migration from another platform',
      ],
    ),
    P(
      'woocommerce',
      'WooCommerce',
      'WooCommerce store development',
      'An online shop added to a WordPress website.',
      'Businesses that want a store and a content site together.',
      [
        'WooCommerce store setup',
        'Indian payment gateways',
        'Order emails and WhatsApp updates',
        'Stock and GST-ready invoices',
      ],
    ),
    P(
      'custom-coded',
      'Custom-coded',
      'Custom website development (Next.js & React)',
      'Built from scratch, exactly the way you want it.',
      'Unique features, top speed and room to grow.',
      [
        'Design built to your brand',
        'Very fast loading',
        'Any feature or integration',
        'Content editing via a CMS',
      ],
    ),
    P(
      'headless-cms',
      'Headless CMS',
      'Headless CMS website development',
      'A fast custom site where your team still edits the content easily.',
      'Content-heavy sites that need speed and flexibility.',
      [
        'CMS chosen for your team',
        'Fast custom front end',
        'Editing previews',
        'Multi-language ready',
      ],
    ),
  ],
  types: [
    T(
      'business-websites',
      'Business websites',
      'Business website development',
      'Your company online: who you are, what you do, how to reach you.',
      'Service businesses, professionals and SMEs.',
      [
        'Home, services, about, contact pages',
        'Enquiry form + WhatsApp + call buttons',
        'Google Business Profile ready',
        'Analytics from day one',
      ],
    ),
    T(
      'ecommerce-websites',
      'E-commerce websites',
      'E-commerce website development',
      'An online shop where customers browse, pay and track orders.',
      'Brands and retailers selling online.',
      [
        'Product catalogue and search',
        'Payments (UPI, cards, wallets)',
        'Shipping and order tracking',
        'Order updates on WhatsApp',
      ],
    ),
    T(
      'landing-pages',
      'Landing pages',
      'Landing page design and development',
      'One focused page built to turn ad visitors into enquiries.',
      'Ad campaigns, launches and offers.',
      [
        'Conversion-focused layout',
        'Fast mobile loading',
        'Form, call and WhatsApp tracking',
        'A/B test ready',
      ],
    ),
    T(
      'corporate-websites',
      'Corporate websites',
      'Corporate website development',
      'A larger site for an established company and its many audiences.',
      'Companies with several divisions, careers and investor pages.',
      [
        'Multi-section information design',
        'Careers and news sections',
        'Role-based content editing',
        'Accessibility and security checks',
      ],
    ),
    T(
      'website-redesign',
      'Website redesign',
      'Website redesign services',
      'A fresh, faster version of your current site, without losing your Google rankings.',
      'Outdated, slow or hard-to-edit websites.',
      [
        'Review of what works today',
        'Modern design and content',
        'Redirects that protect rankings',
        'Speed improvements',
      ],
    ),
  ],
  guide: {
    question: 'WordPress, Shopify or custom code?',
    shortAnswer:
      'Choose Shopify to sell products, WordPress to publish and edit content yourself, and custom code for unique features or top speed. Still unsure? Tell us your goal. We’ll choose.',
    goals: [
      {
        id: 'sell',
        label: 'Selling products online',
        pick: 'shopify',
        title: 'Shopify',
        why: 'The quickest, most reliable way to launch an online store, with payments, stock and shipping built in.',
      },
      {
        id: 'edit',
        label: 'Updating content myself',
        pick: 'wordpress',
        title: 'WordPress',
        why: 'Easy to edit pages, blogs and offers yourself, with a huge range of add-ons.',
      },
      {
        id: 'custom',
        label: 'Unique features or top speed',
        pick: 'custom-coded',
        title: 'Custom-coded',
        why: 'Built exactly for your needs: portals, logins, integrations and the fastest load times.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll choose for you',
        why: 'Share your goal in two minutes. We recommend the right platform in your quote, with the reason.',
      },
    ],
    table: {
      columns: ['WordPress', 'Shopify', 'Custom code'],
      rows: [
        {
          label: 'Best for',
          cells: ['Business sites, blogs', 'Online stores', 'Unique products, portals'],
        },
        { label: 'Edit it yourself', cells: ['Easy', 'Easy', 'Yes, with a CMS'] },
        {
          label: 'Selling online',
          cells: ['Yes, via WooCommerce', 'Built in', 'Built to your rules'],
        },
        { label: 'Custom features', cells: ['Good, with plugins', 'Limited to apps', 'Unlimited'] },
        { label: 'Speed to launch', cells: ['Fast', 'Fastest', 'Depends on features'] },
        { label: 'Monthly platform fee', cells: ['Hosting only', 'Shopify plan', 'Hosting only'] },
      ],
    },
    review: 'approved',
  },
  includes: [
    { title: 'Mobile-first design', text: 'Looks right on every phone, tablet and screen.' },
    { title: 'Fast loading', text: 'Optimised images, code and hosting.' },
    { title: 'SEO setup', text: 'Titles, sitemap, structured data and Search Console.' },
    { title: 'Enquiry forms + WhatsApp', text: 'Every lead reaches you instantly.' },
    { title: 'Analytics', text: 'See visitors and enquiries from day one.' },
    { title: 'Full handover', text: 'Your domain, hosting, code and logins.' },
  ],
  faqs: [
    {
      question: 'I’m not technical. Is that a problem?',
      answer:
        'Not at all. Tell us about your business. We handle the technology and explain everything simply.',
    },
    {
      question: 'How much does website development cost?',
      answer:
        'It depends on the platform, number of pages and features. Share your goal and we send a fixed, written quote quickly.',
    },
    {
      question: 'How long does it take to build a website?',
      answer:
        'We move fast. You see progress early, and the launch date is written into your quote.',
    },
    {
      question: 'Can you redesign my existing website?',
      answer:
        'Yes. We keep what works, fix what doesn’t, and protect your search rankings during the move.',
    },
    {
      question: 'Will my website work on mobile and rank on Google?',
      answer:
        'Every site is mobile-first and SEO-ready at launch. Rankings also depend on content and competition. We tell you honestly what to expect.',
    },
    {
      question: 'Do I own the website?',
      answer: 'Yes, the domain, hosting account, code and logins are yours.',
    },
  ],
  related: [
    'ai-chatbots-automation/whatsapp-chatbots',
    'crm-whatsapp-integration/crm-integration',
    'seo-services/technical-seo',
    'seo-services/website-maintenance',
  ],
  industries: ['retail-ecommerce', 'education'],
  cta: 'Get a website quote',
  whatsapp: 'Hi CodeMindset, I need a website for my business.',
  seo: {
    title: 'Website Development Company in India for Growing Businesses',
    description:
      'Business websites and online stores on WordPress, Shopify or custom code. Mobile-first, SEO-ready, WhatsApp enquiries built in. Fixed quote, and you own it.',
  },
  readiness: 'ready',
  review: 'approved',
};

const apps: ServiceHub = {
  slug: 'mobile-app-development',
  segment: 'everyday',
  icon: 'app',
  title: 'Mobile app development',
  plainTitle: 'A mobile app for my customers',
  blurb: 'Android and iPhone apps',
  eyebrow: 'Mobile app development company in India',
  h1: 'Mobile app development',
  h1Accent: 'for Android & iPhone',
  answer:
    'We build Android and iPhone apps for booking, ordering and customer accounts. Most clients need one app that runs on both, published under their own name. Fixed quote, full ownership.',
  simple: {
    title: 'Why build a mobile app?',
    steps: [
      {
        title: 'Always in their pocket',
        text: 'Your business is one tap away on your customer’s phone.',
      },
      {
        title: 'Things get done faster',
        text: 'Ordering, booking, paying and tracking without calls or queues.',
      },
      {
        title: 'Customers come back',
        text: 'Notifications and offers bring them back at the right time.',
      },
    ],
  },
  platformsLabel: 'Which technology do we use?',
  platforms: [
    P(
      'android-apps',
      'Android',
      'Android app development',
      'An app for Android phones, listed on Google Play.',
      'Reaching most smartphone users in India.',
      [
        'Native or cross-platform build',
        'Google Play listing and release',
        'Push notifications',
        'Crash and usage monitoring',
      ],
    ),
    P(
      'ios-apps',
      'iOS',
      'iOS app development',
      'An app for iPhones and iPads, listed on the App Store.',
      'Premium audiences and Apple users.',
      [
        'Apple design guidelines',
        'App Store submission',
        'Sign in with Apple, payments',
        'Performance monitoring',
      ],
    ),
    P(
      'flutter',
      'Flutter',
      'Flutter app development',
      'One app that runs on both Android and iPhone.',
      'Launching on both platforms with one budget.',
      [
        'Single codebase for Android and iOS',
        'Smooth, native-feeling screens',
        'Faster updates',
        'Store releases for both',
      ],
    ),
    P(
      'react-native',
      'React Native',
      'React Native app development',
      'One app for Android and iPhone, built with web-friendly technology.',
      'Teams that also run a React website.',
      [
        'Shared code with your web app',
        'Native features (camera, GPS)',
        'Over-the-air updates',
        'Store releases for both',
      ],
    ),
    P(
      'progressive-web-apps',
      'Progressive web apps',
      'Progressive web app (PWA) development',
      'A website that installs and works like an app, no app store needed.',
      'Quick launches and low-cost reach.',
      [
        'Install from the browser',
        'Works on slow networks',
        'Push notifications',
        'One build for all devices',
      ],
    ),
  ],
  types: [
    T(
      'web-applications',
      'Web applications',
      'Web application development',
      'Software that runs in the browser: dashboards, portals, booking systems.',
      'Businesses running work online.',
      ['User logins and roles', 'Dashboards and reports', 'Secure database', 'Hosting and backups'],
    ),
    T(
      'customer-portals',
      'Customer portals',
      'Customer portal development',
      'A private area where your customers log in to see orders, documents or bills.',
      'B2B companies, service firms, institutes.',
      ['Secure login', 'Orders, invoices and documents', 'Support requests', 'CRM connection'],
    ),
    T(
      'booking-apps',
      'Booking apps',
      'Booking and appointment app development',
      'Customers book slots, pay and get reminders by themselves.',
      'Clinics, salons, classes, services.',
      [
        'Live availability calendar',
        'Online payment',
        'SMS/WhatsApp reminders',
        'Staff schedule view',
      ],
    ),
    T(
      'marketplace-apps',
      'Marketplace apps',
      'Marketplace app development',
      'A platform where many sellers or providers meet many buyers.',
      'Multi-vendor and service marketplaces.',
      [
        'Seller and buyer accounts',
        'Listings, search and reviews',
        'Split payments',
        'Admin control panel',
      ],
    ),
    T(
      'ecommerce-apps',
      'E-commerce apps',
      'E-commerce app development',
      'Your online store as an app, with saved carts and offers.',
      'Brands with repeat customers.',
      [
        'Catalogue, cart and checkout',
        'UPI and card payments',
        'Order tracking',
        'Offers and notifications',
      ],
    ),
  ],
  guide: {
    question: 'Web app, mobile app or both?',
    shortAnswer:
      'Start with a web app or progressive web app if customers use it occasionally or on computers. Choose a mobile app (Flutter for both platforms) if they use it often on phones. Not sure? Tell us how customers will use it. We’ll recommend.',
    goals: [
      {
        id: 'often',
        label: 'Customers use it daily on phones',
        pick: 'flutter',
        title: 'Mobile app (Flutter)',
        why: 'One app for Android and iPhone gives the best daily experience with one budget.',
      },
      {
        id: 'office',
        label: 'Staff use it on computers',
        pick: 'web-applications',
        title: 'Web application',
        why: 'Runs in any browser with nothing to install, ideal for dashboards and admin work.',
      },
      {
        id: 'quick',
        label: 'Launch fast, low cost',
        pick: 'progressive-web-apps',
        title: 'Progressive web app',
        why: 'Installs from the browser and works like an app, without app-store delays.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll choose for you',
        why: 'Describe what customers should do in the app. We recommend the right approach in your quote.',
      },
    ],
    table: {
      columns: ['Web app / PWA', 'Flutter / React Native', 'Native (Android / iOS)'],
      rows: [
        { label: 'Runs on', cells: ['Any browser', 'Android + iPhone', 'One platform each'] },
        { label: 'App store needed', cells: ['No', 'Yes', 'Yes'] },
        { label: 'Phone features', cells: ['Basic', 'Most', 'All'] },
        { label: 'Cost to build', cells: ['Lowest', 'Medium', 'Highest'] },
        {
          label: 'Best for',
          cells: ['Quick launch, staff tools', 'Most customer apps', 'Heavy, device-specific apps'],
        },
      ],
    },
    review: 'approved',
  },
  includes: [
    { title: 'Screen design', text: 'Clickable designs you approve before building.' },
    { title: 'App store release', text: 'Listing, screenshots and submission handled.' },
    { title: 'Secure backend', text: 'Logins, data and payments done properly.' },
    { title: 'Notifications', text: 'Bring customers back at the right time.' },
    { title: 'Usage analytics', text: 'See what people use and where they drop off.' },
    { title: 'Updates & support', text: 'Fixes and new features after launch.' },
  ],
  faqs: [
    {
      question: 'Do I need an app or is a website enough?',
      answer:
        'If customers visit occasionally, a good website is enough. If they use your service often (ordering, booking, tracking), an app is worth it. We’ll tell you honestly.',
    },
    {
      question: 'Can one app work on both Android and iPhone?',
      answer:
        'Yes. With Flutter or React Native, one codebase runs on both, which saves time and budget.',
    },
    {
      question: 'Will you publish it on Google Play and the App Store?',
      answer:
        'Yes. We prepare the listing and handle submission under your developer accounts, so the app is yours.',
    },
    {
      question: 'How much does an app cost?',
      answer:
        'It depends on screens and features. Share what the app should do and we send a fixed, written quote quickly.',
    },
  ],
  related: [
    'website-development/custom-coded',
    'crm-whatsapp-integration/payment-gateway-integration',
    'custom-software/saas-development',
    'ai-chatbots-automation/ai-agents',
  ],
  industries: ['healthcare', 'retail-ecommerce'],
  cta: 'Get an app quote',
  whatsapp: 'Hi CodeMindset, I need a mobile app for my business.',
  seo: {
    title: 'Mobile App Development Company in India — Android & iOS',
    description:
      'Android and iPhone apps for businesses: booking, ordering, delivery and customer apps. Flutter or native, app store release, fixed quote and support.',
  },
  readiness: 'ready',
  review: 'approved',
};

const ai: ServiceHub = {
  slug: 'ai-chatbots-automation',
  segment: 'everyday',
  icon: 'spark',
  title: 'AI chatbots & automation',
  plainTitle: 'Reply to customers automatically',
  blurb: 'WhatsApp and website chatbots, automated follow-ups',
  eyebrow: 'AI chatbot development in India',
  h1: 'WhatsApp & AI chatbots',
  h1Accent: 'for business',
  answer:
    'We build chatbots for WhatsApp and your website that answer customers 24×7, capture every lead and hand the chat to your team when needed. Follow-ups can run automatically too.',
  simple: {
    title: 'What can a chatbot do for my business?',
    steps: [
      {
        title: 'Customers get instant answers',
        text: 'Day or night, on your website or WhatsApp.',
      },
      {
        title: 'No lead is forgotten',
        text: 'Every enquiry is recorded, assigned and followed up.',
      },
      {
        title: 'Your team gets time back',
        text: 'Repetitive copying and reminders happen by themselves.',
      },
    ],
  },
  platformsLabel: 'Which technology do we use?',
  platforms: [
    P(
      'chatgpt-openai',
      'OpenAI / ChatGPT',
      'ChatGPT (OpenAI) integration for business',
      'Put ChatGPT-style answers to work on your own business information.',
      'Customer support, internal knowledge, content tasks.',
      [
        'Answers from your documents',
        'Safe prompts and limits',
        'Human review where needed',
        'Usage and cost monitoring',
      ],
    ),
    P(
      'claude-ai',
      'Claude',
      'Claude AI integration for business',
      'Anthropic’s Claude models, applied to your documents and workflows.',
      'Long documents, careful reasoning, support.',
      [
        'Document and policy Q&A',
        'Summaries and drafting',
        'Guardrails and review steps',
        'Usage and cost monitoring',
      ],
    ),
    P(
      'n8n',
      'n8n',
      'n8n automation development',
      'Visual workflows that move data between your apps automatically.',
      'Self-hosted, flexible automation.',
      [
        'Workflow design and build',
        'Self-hosted or cloud setup',
        'Error alerts and retries',
        'Documentation for your team',
      ],
    ),
    P(
      'make',
      'Make',
      'Make (Integromat) automation',
      'Drag-and-drop automations between hundreds of apps.',
      'Quick automations across popular tools.',
      [
        'Scenario design and build',
        'Connections to your apps',
        'Error handling',
        'Cost-efficient operations',
      ],
    ),
    P(
      'zapier',
      'Zapier',
      'Zapier automation services',
      'Simple “when this happens, do that” automations.',
      'Teams starting with automation.',
      [
        'Zap design and setup',
        'Multi-step workflows',
        'Testing and monitoring',
        'Handover and training',
      ],
    ),
  ],
  types: [
    T(
      'website-chatbots',
      'Website chatbots',
      'AI chatbot for your website',
      'A chat window that answers visitors’ questions and captures their details.',
      'Businesses getting repeated questions online.',
      [
        'Answers from your own content',
        'Lead capture to CRM',
        'Hand-over to a person',
        'Conversation reports',
      ],
    ),
    T(
      'whatsapp-chatbots',
      'WhatsApp chatbots',
      'WhatsApp chatbot development',
      'Automatic replies, menus and updates on WhatsApp.',
      'Businesses where customers prefer WhatsApp.',
      [
        'Official WhatsApp Business API',
        'Menus, FAQs and AI replies',
        'Order and booking updates',
        'Hand-over to your team',
      ],
    ),
    T(
      'workflow-automation',
      'Workflow automation',
      'Business workflow automation',
      'Repetitive office tasks done automatically, start to finish.',
      'Teams copying data or chasing follow-ups.',
      [
        'Map the current process',
        'Automate the repeat steps',
        'Alerts when something fails',
        'Weekly summary reports',
      ],
    ),
    T(
      'ai-agents',
      'AI agents',
      'AI agent development',
      'AI that completes multi-step tasks, with checks and limits you set.',
      'Research, triage, data entry and support tasks.',
      [
        'Clear task boundaries',
        'Tool and data access controls',
        'Human approval steps',
        'Logs of every action',
      ],
    ),
    T(
      'document-ai',
      'Document AI',
      'Document AI and data extraction',
      'Read invoices, forms and PDFs automatically and pull out the data.',
      'Accounts, admissions and back-office teams.',
      [
        'OCR and data extraction',
        'Checks against your records',
        'Export to Excel or ERP',
        'Exceptions sent for review',
      ],
    ),
  ],
  guide: {
    question: 'Chatbot, automation or AI agent?',
    shortAnswer:
      'A chatbot answers customers. An automation repeats a fixed process between your tools. An AI agent handles tasks that need judgement, within limits you set. Most businesses start with a chatbot or a simple automation.',
    goals: [
      {
        id: 'answer',
        label: 'Answer customer questions',
        pick: 'whatsapp-chatbots',
        title: 'Chatbot (WhatsApp or website)',
        why: 'Instant answers and lead capture where your customers already message you.',
      },
      {
        id: 'repeat',
        label: 'Stop repeating office tasks',
        pick: 'workflow-automation',
        title: 'Workflow automation',
        why: 'Fixed, repeatable steps between your apps run on their own, reliable and low cost.',
      },
      {
        id: 'judge',
        label: 'Tasks that need judgement',
        pick: 'ai-agents',
        title: 'AI agent',
        why: 'Handles varied tasks like triage or research, with approval steps you control.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll choose for you',
        why: 'Describe the task in your own words. We recommend the simplest thing that works.',
      },
    ],
    table: {
      columns: ['Chatbot', 'Automation', 'AI agent'],
      rows: [
        {
          label: 'What it does',
          cells: ['Answers and captures leads', 'Repeats fixed steps', 'Completes varied tasks'],
        },
        { label: 'Needs AI?', cells: ['Usually', 'Not always', 'Yes'] },
        {
          label: 'Human checks',
          cells: ['Hand-over when needed', 'Alerts on failure', 'Approval steps'],
        },
        { label: 'Good first project?', cells: ['Yes', 'Yes', 'After the basics'] },
      ],
    },
    review: 'approved',
  },
  includes: [
    { title: 'Process mapping', text: 'We write down how the work happens today.' },
    { title: 'Safe AI setup', text: 'Answers only from approved information.' },
    { title: 'Human hand-over', text: 'A person steps in when needed.' },
    { title: 'Failure alerts', text: 'You know immediately if something stops.' },
    { title: 'Reports', text: 'See what was handled and time saved.' },
    { title: 'Training', text: 'Your team knows how to manage it.' },
  ],
  faqs: [
    {
      question: 'Will an AI chatbot give wrong answers?',
      answer:
        'Any AI can make mistakes. We limit answers to your approved information, add hand-over to a person, and test with real questions before launch.',
    },
    {
      question: 'Can it work on WhatsApp?',
      answer:
        'Yes, using the official WhatsApp Business API, with menus, AI replies and hand-over to your team.',
    },
    {
      question: 'Do I need technical staff to run it?',
      answer: 'No. We set it up, train your team and support it after launch.',
    },
    {
      question: 'How much does automation cost?',
      answer:
        'It depends on the steps and tools involved. Explain the task and we send a fixed, written quote quickly.',
    },
  ],
  related: [
    'crm-whatsapp-integration/whatsapp-business-api',
    'crm-whatsapp-integration/crm-integration',
    'website-development/business-websites',
    'technical-assessment/ai-readiness',
  ],
  industries: ['education', 'b2b-services'],
  cta: 'Automate my work',
  whatsapp: 'Hi CodeMindset, I want to automate replies or work in my business.',
  seo: {
    title: 'WhatsApp Chatbot & AI Chatbot Development in India',
    description:
      'AI chatbots for WhatsApp and websites that answer customers 24×7, capture leads and hand over to your team, plus automated follow-ups. Official WhatsApp API.',
  },
  readiness: 'ready',
  review: 'approved',
};

const integrations: ServiceHub = {
  slug: 'crm-whatsapp-integration',
  segment: 'everyday',
  icon: 'link',
  title: 'CRM & WhatsApp integration',
  plainTitle: 'Make my tools work together',
  blurb: 'Leads from website and WhatsApp into one CRM',
  eyebrow: 'CRM & WhatsApp integration in India',
  h1: 'CRM & WhatsApp integration',
  h1Accent: 'for growing businesses',
  answer:
    'We connect your website, WhatsApp, CRM, payments and accounts, so every lead lands in one place and nothing is typed twice.',
  simple: {
    title: 'Why connect your tools?',
    steps: [
      {
        title: 'Enter it once',
        text: 'A lead, order or payment is recorded once and shared everywhere.',
      },
      { title: 'Fewer mistakes', text: 'No copy-paste errors between Excel, CRM and billing.' },
      { title: 'See everything', text: 'One accurate picture of customers, sales and payments.' },
    ],
  },
  platformsLabel: 'Which tools do we connect?',
  platforms: [
    P(
      'zoho',
      'Zoho',
      'Zoho CRM integration',
      'Connect Zoho CRM and Zoho apps to your website, WhatsApp and billing.',
      'Businesses running on Zoho.',
      [
        'Website leads into Zoho CRM',
        'Zoho Books and Inventory sync',
        'WhatsApp and email triggers',
        'Custom Zoho workflows',
      ],
    ),
    P(
      'hubspot',
      'HubSpot',
      'HubSpot CRM integration',
      'Send every lead and deal into HubSpot automatically.',
      'Sales and marketing teams on HubSpot.',
      [
        'Forms and chat into HubSpot',
        'Deal and pipeline automation',
        'Two-way data sync',
        'Reporting setup',
      ],
    ),
    P(
      'salesforce',
      'Salesforce',
      'Salesforce integration services',
      'Connect Salesforce to your other business systems.',
      'Larger sales teams and enterprises.',
      ['API-based data sync', 'Lead routing', 'Custom objects and flows', 'Error monitoring'],
    ),
    P(
      'razorpay',
      'Razorpay',
      'Razorpay payment gateway integration',
      'Accept UPI, cards and wallets, and record every payment correctly.',
      'Indian businesses taking online payments.',
      [
        'Checkout and payment links',
        'Subscriptions and refunds',
        'Verified payment confirmations',
        'Sync to accounts and CRM',
      ],
    ),
    P(
      'stripe',
      'Stripe',
      'Stripe payment integration',
      'Take international card payments and subscriptions.',
      'Businesses selling to customers abroad.',
      ['Checkout and billing', 'Subscriptions', 'Webhook verification', 'Accounting sync'],
    ),
    P(
      'tally',
      'Tally & Zoho Books',
      'Tally and Zoho Books integration',
      'Send sales and payments into your accounting software automatically.',
      'Businesses tired of manual accounting entries.',
      [
        'Invoice and payment sync',
        'GST-ready records',
        'Daily reconciliation checks',
        'Exception alerts',
      ],
    ),
  ],
  types: [
    T(
      'crm-integration',
      'CRM integration',
      'CRM integration services',
      'Every lead from your website, ads and WhatsApp lands in your CRM.',
      'Sales teams losing track of leads.',
      [
        'Website, ads and WhatsApp leads',
        'Auto-assignment rules',
        'Follow-up reminders',
        'Duplicate checks',
      ],
    ),
    T(
      'whatsapp-business-api',
      'WhatsApp Business API',
      'WhatsApp Business API integration',
      'Official WhatsApp messaging connected to your systems.',
      'Businesses sending updates and support on WhatsApp.',
      [
        'API account and number setup',
        'Approved message templates',
        'Order, booking and payment alerts',
        'Shared team inbox',
      ],
    ),
    T(
      'payment-gateway-integration',
      'Payment gateways',
      'Payment gateway integration',
      'Online payments on your website or app, recorded correctly.',
      'Any business taking payments online.',
      [
        'UPI, cards, wallets, net banking',
        'Secure verification',
        'Refunds and failures handled',
        'Reconciliation reports',
      ],
    ),
    T(
      'accounting-sync',
      'Accounting sync',
      'Accounting software integration',
      'Sales and payments flow into your accounts automatically.',
      'Teams doing double entry in accounts.',
      ['Invoice sync', 'Payment matching', 'GST-ready exports', 'Daily checks'],
    ),
    T(
      'api-development',
      'API development',
      'API development services',
      'Custom connections between systems that have no ready-made link.',
      'Unique systems and partner integrations.',
      ['Secure REST APIs', 'Documentation', 'Rate limits and logging', 'Testing and monitoring'],
    ),
  ],
  guide: {
    question: 'Which CRM fits your business?',
    shortAnswer:
      'Zoho suits most growing Indian businesses on value. HubSpot suits marketing-led teams that want ease of use. Salesforce suits larger sales teams with complex processes. Already have a CRM? We connect that one.',
    goals: [
      {
        id: 'value',
        label: 'Best value, all-in-one',
        pick: 'zoho',
        title: 'Zoho',
        why: 'Good price-to-features with CRM, books and inventory that work together.',
      },
      {
        id: 'easy',
        label: 'Easiest for marketing & sales',
        pick: 'hubspot',
        title: 'HubSpot',
        why: 'Very easy to use, strong marketing tools and a free starting tier.',
      },
      {
        id: 'scale',
        label: 'Large team, complex process',
        pick: 'salesforce',
        title: 'Salesforce',
        why: 'Highly customisable for big sales teams and enterprise needs.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll choose for you',
        why: 'Tell us your team size and process. We recommend a CRM, or connect the one you already have.',
      },
    ],
    table: {
      columns: ['Zoho', 'HubSpot', 'Salesforce'],
      rows: [
        {
          label: 'Best for',
          cells: ['SMEs, all-in-one', 'Marketing-led teams', 'Large sales teams'],
        },
        { label: 'Ease of use', cells: ['Good', 'Very easy', 'Needs setup'] },
        { label: 'Customisation', cells: ['High', 'Medium', 'Very high'] },
        { label: 'Cost', cells: ['Lower', 'Free tier, rises fast', 'Higher'] },
      ],
    },
    review: 'approved',
  },
  includes: [
    { title: 'Data map', text: 'What moves where, written down simply.' },
    { title: 'Secure connections', text: 'Verified, encrypted and logged.' },
    { title: 'Duplicate checks', text: 'One customer, one record.' },
    { title: 'Retries & alerts', text: 'Failures are retried and reported.' },
    { title: 'Daily reconciliation', text: 'Checks that everything matches.' },
    { title: 'Documentation', text: 'So any developer can maintain it.' },
  ],
  faqs: [
    {
      question: 'Can you connect my website form to my CRM?',
      answer:
        'Yes. Every enquiry goes into your CRM with the source, owner and follow-up reminder set automatically.',
    },
    {
      question: 'Do you work with the official WhatsApp Business API?',
      answer:
        'Yes. We set up the official API, approved message templates and connect it to your CRM, orders or bookings.',
    },
    {
      question: 'What if a connection fails?',
      answer: 'We build in safe retries and alerts, plus daily checks that the data matches.',
    },
    {
      question: 'How much does integration cost?',
      answer:
        'It depends on the systems and data involved. Tell us what should connect and we send a fixed, written quote quickly.',
    },
  ],
  related: [
    'ai-chatbots-automation/whatsapp-chatbots',
    'ai-chatbots-automation/workflow-automation',
    'custom-software/dashboards',
    'website-development/ecommerce-websites',
  ],
  industries: ['b2b-services', 'retail-ecommerce'],
  cta: 'Connect my tools',
  whatsapp: 'Hi CodeMindset, I want to connect my CRM / WhatsApp / payments.',
  seo: {
    title: 'CRM & WhatsApp Integration Services in India',
    description:
      'Connect website forms, the WhatsApp Business API, Zoho or HubSpot CRM, Razorpay and Tally. Leads and orders are entered once, and follow-ups are never missed.',
  },
  readiness: 'ready',
  review: 'approved',
};

const software: ServiceHub = {
  slug: 'custom-software',
  segment: 'advanced',
  icon: 'code',
  title: 'Custom software',
  plainTitle: 'Software made for my business',
  blurb: 'Tools, dashboards and SaaS built around you',
  eyebrow: 'Custom software development company in India',
  h1: 'Custom software development',
  h1Accent: 'for your business',
  answer:
    'We build software around how your business actually works: CRMs, dashboards, portals and SaaS products. We also modernise old systems. Fixed scope, and you own the code.',
  simple: {
    title: 'When does custom software make sense?',
    steps: [
      {
        title: 'Fits your process',
        text: 'No paying for features you never use, or missing the ones you need.',
      },
      {
        title: 'Replaces spreadsheets',
        text: 'One reliable system instead of many files and versions.',
      },
      { title: 'Grows with you', text: 'Add users, features and branches as the business grows.' },
    ],
  },
  platformsLabel: 'Which technology do we use?',
  platforms: [
    P(
      'nodejs',
      'Node.js',
      'Node.js development services',
      'Fast, modern server software in JavaScript.',
      'Real-time apps, APIs and SaaS.',
      ['APIs and back-ends', 'Real-time features', 'Cloud deployment', 'Automated tests'],
    ),
    P(
      'python',
      'Python',
      'Python development services',
      'Reliable software, data processing and AI in Python.',
      'Data-heavy tools and AI features.',
      ['Django / FastAPI back-ends', 'Data pipelines', 'AI and ML features', 'Automated tests'],
    ),
    P(
      'laravel',
      'Laravel (PHP)',
      'Laravel development services',
      'Proven PHP framework for business web applications.',
      'Admin systems and business portals.',
      ['Admin panels', 'Role-based access', 'Reports and exports', 'Maintenance of existing apps'],
    ),
  ],
  types: [
    T(
      'internal-tools',
      'Internal tools',
      'Internal tool development',
      'Simple screens your staff use to do daily work faster.',
      'Teams working from spreadsheets and WhatsApp groups.',
      ['Forms and approvals', 'Role-based access', 'Activity history', 'Exports to Excel'],
    ),
    T(
      'dashboards',
      'Dashboards & reports',
      'Business dashboard and reporting',
      'All your key numbers on one live screen.',
      'Owners and managers who need clear numbers.',
      [
        'Live data from your systems',
        'Clear charts and KPIs',
        'Scheduled email reports',
        'Mobile-friendly view',
      ],
    ),
    T(
      'saas-development',
      'SaaS products',
      'SaaS product development',
      'Your software idea, built as a subscription product.',
      'Founders and companies launching software.',
      [
        'MVP planning',
        'Subscriptions and billing',
        'Multi-customer setup',
        'Scalable cloud hosting',
      ],
    ),
    T(
      'custom-crm',
      'Custom CRM',
      'Custom CRM development',
      'A CRM built exactly around your sales process.',
      'Businesses outgrowing standard CRMs.',
      [
        'Your pipeline stages',
        'WhatsApp and call logging',
        'Reminders and targets',
        'Reports by team',
      ],
    ),
    T(
      'custom-erp',
      'Custom ERP',
      'Custom ERP development',
      'One system for stock, orders, billing and people.',
      'Manufacturers, distributors, multi-branch firms.',
      [
        'Inventory and purchase',
        'Orders and billing (GST)',
        'Branch and role control',
        'Accounting sync',
      ],
    ),
    T(
      'legacy-modernisation',
      'Legacy modernisation',
      'Legacy software modernisation',
      'Move old software (COBOL, old PHP, desktop apps) to modern, cloud-ready code, without stopping the business.',
      'Businesses held back by old systems few people can maintain.',
      [
        'Code and risk assessment',
        'Step-by-step migration plan',
        'Automated code translation where safe',
        'Parallel running before switch-over',
      ],
      [
        {
          question: 'Can you modernise without downtime?',
          answer:
            'Usually yes: the old and new systems run side by side, data is kept in sync, and users move over in stages.',
        },
      ],
      [
        {
          sector: 'Banking',
          story:
            'A core banking system written decades ago is moved to modern cloud services piece by piece, with both versions running in parallel so customers never notice the switch.',
        },
      ],
    ),
    T(
      'microservices',
      'Monolith to microservices',
      'Monolith to microservices migration',
      'Split one large, fragile application into smaller services that can be updated and scaled separately.',
      'Products where every release is slow and risky.',
      [
        'Domain and dependency mapping',
        'Service boundaries designed',
        'API gateway and messaging',
        'Gradual extraction with tests',
      ],
    ),
    T(
      'database-migration',
      'Database migration',
      'Database migration and modernisation',
      'Move your data to a modern database or cloud: checked, cleaned and without losing a record.',
      'Slow, outdated or costly databases.',
      [
        'Schema review and redesign',
        'Data cleaning and normalisation',
        'Automated migration with checks',
        'Rollback plan',
      ],
    ),
  ],
  guide: {
    question: 'Custom software or a ready-made tool?',
    shortAnswer:
      'Use a ready-made tool if it fits most of your process and the cost is fair. Choose custom software when the tool forces workarounds, costs grow per user, or your process is your advantage. We’ll tell you honestly which fits.',
    goals: [
      {
        id: 'fits',
        label: 'A tool fits most of my process',
        pick: null,
        title: 'Use the ready-made tool',
        why: 'Don’t build what you can buy. We can connect and set it up properly instead.',
      },
      {
        id: 'sheets',
        label: 'We live in spreadsheets',
        pick: 'internal-tools',
        title: 'Internal tool',
        why: 'A small, focused tool replaces messy sheets quickly and safely.',
      },
      {
        id: 'numbers',
        label: 'I can’t see my numbers',
        pick: 'dashboards',
        title: 'Dashboard',
        why: 'Pull data from your systems into one live, clear view.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll choose for you',
        why: 'Walk us through your process. We recommend buy, build or connect, with reasons.',
      },
    ],
    table: {
      columns: ['Ready-made tool', 'Custom software'],
      rows: [
        { label: 'Start time', cells: ['Immediate', 'Weeks, in stages'] },
        { label: 'Fits your process', cells: ['Mostly', 'Exactly'] },
        { label: 'Cost over time', cells: ['Per-user fees', 'Build once, then support'] },
        { label: 'Ownership', cells: ['Vendor’s', 'Yours'] },
      ],
    },
    review: 'approved',
  },
  includes: [
    { title: 'Process workshop', text: 'We map your process before writing code.' },
    { title: 'Clickable design', text: 'Approve the screens before building.' },
    { title: 'Staged delivery', text: 'Working software early, improved in steps.' },
    { title: 'Security & backups', text: 'Access control, encryption and backups.' },
    { title: 'Training', text: 'Your team is ready on day one.' },
    { title: 'Code ownership', text: 'The code and data are yours.' },
  ],
  faqs: [
    {
      question: 'Is custom software expensive?',
      answer:
        'It can cost less over time than per-user subscriptions. We start with the smallest useful version and grow it.',
    },
    {
      question: 'Who owns the code?',
      answer: 'You do. Code, data and documentation are handed over.',
    },
    {
      question: 'Can you take over existing software?',
      answer: 'Yes. We review it first and tell you honestly whether to fix, extend or replace it.',
    },
    {
      question: 'How much does it cost?',
      answer:
        'It depends on the features and users. Walk us through the process and we send a fixed, written quote quickly.',
    },
  ],
  related: [
    'crm-whatsapp-integration/api-development',
    'mobile-app-development/web-applications',
    'ai-chatbots-automation/document-ai',
    'technical-assessment/tech-stack-review',
  ],
  industries: ['b2b-services', 'education'],
  cta: 'Describe my software',
  whatsapp: 'Hi CodeMindset, I need custom software for my business.',
  seo: {
    title: 'Custom Software Development Company in India — CRM, ERP, SaaS',
    description:
      'Internal tools, dashboards, custom CRM and ERP, and SaaS products built around your process. Fast, staged delivery across India.',
  },
  readiness: 'ready',
  review: 'approved',
};

const seo: ServiceHub = {
  slug: 'seo-services',
  segment: 'everyday',
  icon: 'chart',
  title: 'SEO, AEO & GEO',
  plainTitle: 'Get found on Google & AI',
  blurb: 'Google, Maps and AI assistant visibility',
  eyebrow: 'SEO, AEO & GEO services in India',
  h1: 'SEO, AEO & GEO services',
  h1Accent: 'for Google and AI search',
  answer:
    'We help businesses get found on Google, Google Maps and AI assistants like ChatGPT and Gemini. That means classic SEO, answer engine optimisation (AEO) and generative engine optimisation (GEO), with honest reports and no fake guarantees.',
  simple: {
    title: 'What does SEO do for my business?',
    steps: [
      { title: 'Show up in search', text: 'On Google and in AI answers when customers search.' },
      { title: 'Load in a blink', text: 'Fast pages keep visitors from leaving.' },
      { title: 'Never break', text: 'Updates, backups and monitoring handled for you.' },
    ],
  },
  platformsLabel: 'Which technology do we use?',
  platforms: [
    P(
      'aws',
      'AWS',
      'AWS cloud services',
      'Amazon’s cloud: reliable servers that grow with you.',
      'Apps and sites that need scale.',
      [
        'Architecture and setup',
        'Auto-scaling and backups',
        'Cost optimisation',
        'Monitoring and alerts',
      ],
    ),
    P(
      'google-cloud',
      'Google Cloud',
      'Google Cloud services',
      'Google’s cloud platform for apps, data and AI.',
      'Data and AI-heavy workloads.',
      ['Setup and migration', 'Managed databases', 'Security and IAM', 'Cost monitoring'],
    ),
    P(
      'vercel',
      'Vercel',
      'Vercel hosting and deployment',
      'Very fast hosting for modern websites.',
      'Next.js and React websites.',
      [
        'Global fast delivery',
        'Preview deployments',
        'Analytics and speed checks',
        'Domain and SSL setup',
      ],
    ),
    P(
      'cloudflare',
      'Cloudflare',
      'Cloudflare setup and security',
      'A shield and speed boost in front of your website.',
      'Any site needing speed and protection.',
      ['CDN and caching', 'Firewall and bot protection', 'DNS and SSL', 'Uptime monitoring'],
    ),
  ],
  types: [
    T(
      'local-seo',
      'Local SEO',
      'Local SEO services',
      'Show up on Google and Google Maps when people nearby search for what you do.',
      'Shops, clinics, institutes and service businesses that serve an area.',
      [
        'Google Business Profile setup and fixes',
        'Service and area pages',
        'Consistent business listings',
        'A simple way to ask for genuine reviews',
      ],
    ),
    T(
      'technical-seo',
      'Technical SEO',
      'Technical SEO services',
      'Fix the hidden problems that stop Google from ranking your pages.',
      'Sites with low traffic despite good content.',
      [
        'Full technical audit',
        'Indexing and crawl fixes',
        'Structured data',
        'Search Console monitoring',
      ],
    ),
    T(
      'answer-engine-optimization',
      'AEO (answer engine optimisation)',
      'Answer engine optimisation (AEO) services',
      'Get your answers chosen for Google’s AI Overviews, featured snippets and voice assistants.',
      'Businesses whose customers ask questions before they buy.',
      [
        'Question research from real searches',
        'Answer-first rewrites of key pages',
        'FAQ and how-to content that matches intent',
        'Structured data that matches visible content',
      ],
    ),
    T(
      'generative-engine-optimization',
      'GEO (generative engine optimisation)',
      'Generative engine optimisation (GEO) services',
      'Make ChatGPT, Gemini, Perplexity and Copilot understand, trust and recommend your business.',
      'Businesses that want to be named in AI assistant answers.',
      [
        'AI visibility check across major assistants',
        'Evidence-rich content: facts, sources, quotes',
        'Consistent brand details across the web',
        'AI search crawler access and Bing setup',
      ],
    ),
    T(
      'website-speed',
      'Website speed',
      'Website speed optimisation',
      'Make slow pages load fast, especially on phones.',
      'Sites that feel slow or fail Core Web Vitals.',
      ['Speed audit', 'Image and code optimisation', 'Caching and CDN', 'Before/after report'],
    ),
    T(
      'cloud-devops',
      'Cloud & DevOps',
      'Cloud and DevOps services',
      'Reliable servers, automatic deployments and backups.',
      'Growing apps and teams.',
      [
        'Cloud setup or migration',
        'Automatic deployments',
        'Backups and recovery',
        'Monitoring and alerts',
      ],
    ),
    T(
      'website-maintenance',
      'Website maintenance',
      'Website maintenance services',
      'Updates, backups, fixes and small changes, handled for you.',
      'Any business that relies on its website.',
      ['Regular updates', 'Daily backups', 'Security monitoring', 'Small content changes'],
    ),
    T(
      'hosting-migration',
      'Hosting migration',
      'Website hosting migration',
      'Move your site to better hosting without downtime or lost rankings.',
      'Slow or unreliable hosting.',
      ['Migration plan', 'Zero-downtime switch', 'Redirect and SEO checks', 'Speed comparison'],
    ),
  ],
  guide: {
    question: 'Why is my website slow, and what should I fix first?',
    shortAnswer:
      'Most slow sites are held back by large images, too many add-ons or plugins, and cheap hosting. Fix images first, then remove unused add-ons, then upgrade hosting or add a CDN. A speed audit tells you exactly which applies.',
    goals: [
      {
        id: 'slow',
        label: 'My site is slow',
        pick: 'website-speed',
        title: 'Speed optimisation',
        why: 'We measure, fix the biggest causes first and show before/after numbers.',
      },
      {
        id: 'rank',
        label: 'Not showing on Google',
        pick: 'technical-seo',
        title: 'Technical SEO',
        why: 'We find and fix what stops your pages from being indexed and ranked.',
      },
      {
        id: 'care',
        label: 'I want it looked after',
        pick: 'website-maintenance',
        title: 'Maintenance plan',
        why: 'Updates, backups, monitoring and small changes, handled for you.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll check for you',
        why: 'Send your website address. We’ll tell you what to fix first.',
      },
    ],
    review: 'approved',
  },
  includes: [
    { title: 'Audit first', text: 'Clear list of issues, by priority.' },
    { title: 'Fixes, not just reports', text: 'We implement the changes.' },
    { title: 'Before/after numbers', text: 'Speed and indexing measured.' },
    { title: 'AI search ready', text: 'Content AI assistants can understand.' },
    { title: 'Monitoring', text: 'Uptime, errors and security watched.' },
    { title: 'Monthly summary', text: 'What was done, in plain words.' },
  ],
  faqs: [
    {
      question: 'Can you guarantee first page on Google?',
      answer:
        'No honest company can. We fix the technical foundations and show measured progress; rankings also depend on content and competition.',
    },
    {
      question: 'What is AEO?',
      answer:
        'Answer Engine Optimisation: making your content easy for AI assistants like ChatGPT and Gemini to understand and cite.',
    },
    {
      question: 'Do you maintain sites you didn’t build?',
      answer: 'Yes. We review the site first, then take over updates, backups and fixes.',
    },
    {
      question: 'How much does it cost?',
      answer:
        'It depends on the site’s size and needs. Send your website address and we send a fixed, written quote quickly.',
    },
  ],
  related: [
    'website-development/website-redesign',
    'website-development/custom-coded',
    'technical-assessment/website-audit',
    'crm-whatsapp-integration/crm-integration',
  ],
  industries: ['retail-ecommerce', 'healthcare'],
  cta: 'Check my visibility',
  whatsapp: 'Hi CodeMindset, I want to improve my website’s Google ranking / speed.',
  seo: {
    title: 'SEO, AEO & GEO Services in India | Google & AI Search',
    description:
      'Get found on Google, Google Maps and AI assistants. Local SEO, answer engine optimisation (AEO) and generative engine optimisation (GEO) for Indian businesses.',
  },
  readiness: 'ready',
  review: 'approved',
};

const assessment: ServiceHub = {
  slug: 'technical-assessment',
  segment: 'start',
  icon: 'search',
  title: 'Technical assessment',
  plainTitle: 'Not sure what I need',
  blurb: 'Tell us the problem. We suggest the solution',
  eyebrow: 'IT consulting for businesses in India',
  h1: 'Free IT consultation',
  h1Accent: '— not sure what you need?',
  answer:
    'Tell us the problem, not the technology. We review how you work today and recommend what to build, buy or fix. Sometimes the answer is that you need nothing new.',
  simple: {
    title: 'What do you get from a consultation?',
    steps: [
      { title: 'A clear picture', text: 'How things work today and where the problems are.' },
      { title: 'Honest options', text: 'Build, buy, connect or change nothing, with reasons.' },
      { title: 'A first step', text: 'The smallest change that makes the biggest difference.' },
    ],
  },
  platformsLabel: '',
  platforms: [],
  types: [
    T(
      'website-audit',
      'Website audit',
      'Website audit',
      'A full check of your website’s speed, SEO, security and enquiries.',
      'Sites that aren’t bringing results.',
      [
        'Speed and mobile check',
        'SEO and indexing check',
        'Security basics',
        'Prioritised fix list',
      ],
    ),
    T(
      'ai-readiness',
      'AI readiness check',
      'AI readiness assessment',
      'Find out where AI can genuinely help your business, and where it can’t.',
      'Businesses curious about AI.',
      [
        'Tasks suited to AI',
        'Data and risk review',
        'Small pilot plan',
        'Expected effort and benefits',
      ],
    ),
    T(
      'tech-stack-review',
      'Tech stack review',
      'Technology stack review',
      'A review of all the software and tools you pay for and use.',
      'Growing businesses with many tools.',
      [
        'Tools and costs listed',
        'Overlaps and gaps',
        'Integration opportunities',
        'Simplification plan',
      ],
    ),
  ],
  guide: {
    question: 'What should I build first?',
    shortAnswer:
      'Start where the business loses the most time or money each week. Usually it’s missed enquiries, manual data entry or a website that doesn’t convert. Fix that one thing first, measure, then move to the next.',
    goals: [
      {
        id: 'leads',
        label: 'We miss enquiries',
        pick: 'crm-whatsapp-integration/crm-integration',
        title: 'Lead capture + CRM',
        why: 'Capture every enquiry and follow it up, usually the fastest win.',
      },
      {
        id: 'site',
        label: 'Website brings nothing',
        pick: 'website-audit',
        title: 'Website audit',
        why: 'Find out why visitors don’t enquire, then fix the top issues.',
      },
      {
        id: 'ai',
        label: 'Curious about AI',
        pick: 'ai-readiness',
        title: 'AI readiness check',
        why: 'Learn where AI genuinely helps before spending on it.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll work it out',
        why: 'Describe your day-to-day problems. We suggest where to start.',
      },
    ],
    review: 'approved',
  },
  includes: [
    { title: 'Short call', text: 'We listen to how your business runs.' },
    { title: 'Review of tools', text: 'Website, software, spreadsheets, WhatsApp.' },
    { title: 'Written findings', text: 'In plain words, not jargon.' },
    { title: 'Options with reasons', text: 'Build, buy, connect or leave it.' },
    { title: 'First-step plan', text: 'What to do first and why.' },
    { title: 'No obligation', text: 'Use the advice with anyone.' },
  ],
  faqs: [
    {
      question: 'Do I need to know anything technical?',
      answer: 'No. Describe your problems in everyday words; we translate them into options.',
    },
    {
      question: 'Will you just recommend building something?',
      answer:
        'No. If buying a tool, connecting what you have or changing nothing is better, we say so.',
    },
    {
      question: 'What do I get at the end?',
      answer:
        'Written findings, options with reasons and a first-step plan you can use with anyone.',
    },
  ],
  related: [
    'website-development/business-websites',
    'ai-chatbots-automation/workflow-automation',
    'crm-whatsapp-integration/crm-integration',
    'seo-services/technical-seo',
  ],
  industries: ['b2b-services', 'education', 'healthcare', 'retail-ecommerce'],
  cta: 'Tell us the problem',
  whatsapp: 'Hi CodeMindset, I’m not sure what I need. Can you help?',
  seo: {
    title: 'IT Consulting & Technical Assessment for Businesses in India',
    description:
      'Not sure what technology you need? We review your business and tools, then recommend what to build, buy or fix, in plain words.',
  },
  readiness: 'ready',
  review: 'approved',
};

const [aiEngineering, data, security, blockchain] = advancedHubs;

/** Menu and page order: everyday needs first, then custom and advanced work, then "not sure". */
const catalogue: ServiceHub[] = [
  website,
  apps,
  ai,
  integrations,
  seo,
  software,
  aiEngineering!,
  data!,
  security!,
  blockchain!,
  assessment,
];

/** Sub-services listed in servicePages get their own page and copy; the rest are listed on the hub. */
export const hubs: ServiceHub[] = catalogue.map((h) => {
  const withPage = (s: SubService): SubService => {
    const key = `${h.slug}/${s.slug}`;
    const copy = servicePages[key];
    const detail = serviceDetails[key];
    return copy
      ? {
          ...s,
          page: true,
          intro: copy.intro,
          faqs: copy.faqs,
          process: detail?.process,
          deep: detail?.deep,
        }
      : s;
  };
  return { ...h, platforms: h.platforms.map(withPage), types: h.types.map(withPage) };
});

export const GUIDE_SLUG = 'how-to-choose';

export const allSubs = (h: ServiceHub) => [...h.platforms, ...h.types];
