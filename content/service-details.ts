import type { PlainStep } from './types';

/**
 * Service-specific depth for pages that have their own URL: how we actually do the work
 * (a visual step-by-step on the page), and for some services a few deeper sections.
 * Facts here were checked against official sources on 2026-10-20/21 (see guides.ts sources).
 */
export interface ServiceDetail {
  process: PlainStep[];
  deep?: { heading: string; text: string; points?: string[] }[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'website-development/business-websites': {
    process: [
      { title: 'Short call', text: 'Your services, customers and the enquiries you want more of.' },
      { title: 'Page plan', text: 'One page per service, plus home, about and contact.' },
      { title: 'Design', text: 'Mobile layout first, in your colours, with real photos.' },
      { title: 'Build', text: 'Forms, WhatsApp, call buttons, analytics and Google basics.' },
      { title: 'Launch', text: 'Tested on real phones, then handed over in your name.' },
    ],
  },
  'website-development/ecommerce-websites': {
    process: [
      { title: 'Catalogue plan', text: 'Categories, product details, variants and photos.' },
      { title: 'Platform', text: 'Shopify or WooCommerce, chosen for how you sell.' },
      { title: 'Payments & shipping', text: 'UPI, cards, COD rules and courier set-up.' },
      { title: 'Store build', text: 'Design, product upload, GST invoices, WhatsApp updates.' },
      { title: 'Launch', text: 'Test orders end to end, then go live.' },
    ],
  },
  'website-development/landing-pages': {
    process: [
      { title: 'One goal', text: 'Calls, WhatsApp chats or form leads for one offer.' },
      { title: 'Message match', text: 'Headline and copy that match the ad people clicked.' },
      { title: 'Build', text: 'A light page that loads quickly on mobile data.' },
      { title: 'Tracking', text: 'Conversions sent to Google Ads and Meta.' },
    ],
  },
  'website-development/website-redesign': {
    process: [
      { title: 'Audit', text: 'Traffic, rankings and the pages that bring enquiries.' },
      { title: 'Keep what works', text: 'Ranking pages are kept or improved, never dropped.' },
      { title: 'Redesign', text: 'Modern, faster pages with clearer calls to action.' },
      { title: 'Redirect map', text: 'Every old address points to its new page.' },
      { title: 'Watch', text: 'Search Console checked after launch for errors.' },
    ],
  },
  'website-development/wordpress': {
    process: [
      { title: 'Plan', text: 'Pages, content types and what your team will edit.' },
      { title: 'Theme', text: 'A light theme designed for your brand, not a stock demo.' },
      { title: 'Plugins', text: 'Only a few trusted ones, kept up to date.' },
      { title: 'Security', text: 'Backups, updates and login protection.' },
      { title: 'Training', text: 'A walkthrough so your team can edit with confidence.' },
    ],
  },
  'website-development/shopify': {
    process: [
      { title: 'Store set-up', text: 'Plan, domain, taxes and store settings.' },
      { title: 'Theme', text: 'Customised so the store looks like your brand.' },
      { title: 'Products', text: 'Upload, variants, collections and search.' },
      { title: 'Apps', text: 'Indian payments, shipping and WhatsApp updates.' },
      { title: 'Launch', text: 'Test orders, then go live.' },
    ],
  },
  'mobile-app-development/android-apps': {
    process: [
      { title: 'Scope', text: 'The screens and features the first version needs.' },
      { title: 'Design', text: 'Clickable screens you can try before we build.' },
      { title: 'Build', text: 'App plus the backend, logins and notifications.' },
      { title: 'Test', text: 'On low and mid-range phones, not just flagships.' },
      { title: 'Publish', text: 'Google Play listing under your own account.' },
    ],
  },
  'mobile-app-development/ios-apps': {
    process: [
      { title: 'Scope', text: 'Features and the Apple rules that apply to them.' },
      { title: 'Design', text: 'Screens that follow Apple’s interface guidelines.' },
      { title: 'Build & test', text: 'On real iPhones and through TestFlight.' },
      { title: 'App Store', text: 'Listing, privacy details and review submission.' },
    ],
  },
  'mobile-app-development/flutter': {
    process: [
      { title: 'Scope', text: 'One feature list for Android and iPhone together.' },
      { title: 'Design', text: 'Screens that feel right on both platforms.' },
      { title: 'Build', text: 'One codebase, plus backend and notifications.' },
      { title: 'Publish', text: 'Google Play and the App Store, under your name.' },
    ],
  },
  'ai-chatbots-automation/whatsapp-chatbots': {
    process: [
      { title: 'Number & API', text: 'WhatsApp Business Platform set up on your number.' },
      { title: 'Questions list', text: 'The 20–30 questions customers ask most.' },
      { title: 'Flows', text: 'Answers, bookings, lead capture and hand-over to staff.' },
      { title: 'Templates', text: 'Message templates submitted for Meta approval.' },
      { title: 'Go live', text: 'Tested with your team, then switched on.' },
    ],
    deep: [
      {
        heading: 'What rules does WhatsApp set for chatbots?',
        text: 'WhatsApp’s Business Messaging Policy applies to every business account. We build these rules in from the start.',
        points: [
          'Message people only after they have opted in to hear from you.',
          'Offer a clear way to reach a human: an agent in the chat, a phone number or email.',
          'Stop messaging anyone who asks you to, on or off WhatsApp.',
        ],
      },
      {
        heading: 'What does it cost to run?',
        text: 'Since 1 July 2025 Meta charges per delivered message, by category (marketing, utility, authentication, service) and the customer’s country. Messages customers send you are free. From 1 October 2026 each number gets 1,000 free service messages a month. We set out the running costs in your quote before anything is built.',
      },
    ],
  },
  'ai-chatbots-automation/website-chatbots': {
    process: [
      { title: 'Knowledge', text: 'Your pages, prices and policies, checked for accuracy.' },
      { title: 'Rules', text: 'What it may answer, and when to hand over.' },
      { title: 'Lead capture', text: 'Name and number asked at the right moment.' },
      { title: 'Test', text: 'Hard questions tried before launch.' },
    ],
  },
  'ai-chatbots-automation/workflow-automation': {
    process: [
      { title: 'Map the task', text: 'Every step your team does today, written down.' },
      { title: 'Pick the tool', text: 'n8n, Make, Zapier or code, by volume and budget.' },
      { title: 'Build', text: 'Steps connected, with checks for missing data.' },
      { title: 'Alerts', text: 'Someone is told the moment a run fails.' },
    ],
  },
  'crm-whatsapp-integration/crm-integration': {
    process: [
      { title: 'Lead sources', text: 'Website, WhatsApp, calls, ads and walk-ins listed.' },
      { title: 'Pipeline', text: 'Your sales stages set up in the CRM.' },
      { title: 'Connect', text: 'Every source sends leads in automatically.' },
      { title: 'Reminders', text: 'Follow-up tasks so no lead goes cold.' },
      { title: 'Train', text: 'Your team learns the daily routine.' },
    ],
  },
  'crm-whatsapp-integration/whatsapp-business-api': {
    process: [
      { title: 'Business verification', text: 'Meta Business account checked and verified.' },
      { title: 'Number', text: 'Registered on the API, or with coexistence on the app.' },
      { title: 'Templates', text: 'Order, reminder and offer messages approved.' },
      { title: 'Connect', text: 'Linked to your website, CRM or store.' },
    ],
  },
  'crm-whatsapp-integration/payment-gateway-integration': {
    process: [
      { title: 'Choose', text: 'Gateway compared on fees, settlement and features.' },
      { title: 'KYC', text: 'Help with the gateway’s business verification.' },
      { title: 'Integrate', text: 'Checkout, payment links, receipts and refunds.' },
      { title: 'Reconcile', text: 'Every payment matched to its order.' },
    ],
  },
  'seo-services/local-seo': {
    process: [
      { title: 'Profile', text: 'Google Business Profile claimed, verified and completed.' },
      { title: 'Pages', text: 'A page for each real service and area you serve.' },
      { title: 'Listings', text: 'Name, address and phone made consistent online.' },
      { title: 'Reviews', text: 'A simple way to ask happy customers for reviews.' },
      { title: 'Report', text: 'Calls, direction requests and ranking every month.' },
    ],
    deep: [
      {
        heading: 'How does Google rank local businesses?',
        text: 'Google says local results are based mainly on three things. There is no way to pay for a better local ranking.',
        points: [
          'Relevance: how well your profile matches the search.',
          'Distance: how far you are from the person searching.',
          'Prominence: how well known you are, including links, reviews and ratings.',
        ],
      },
    ],
  },
  'seo-services/answer-engine-optimization': {
    process: [
      { title: 'Question research', text: 'What customers ask Google and AI before they buy.' },
      { title: 'Answer audit', text: 'Which pages answer clearly, and which bury it.' },
      { title: 'Rewrite', text: 'A direct answer up top, detail and proof below.' },
      { title: 'Structure', text: 'Headings as questions, lists, tables and FAQs.' },
      { title: 'Markup', text: 'Structured data that matches what is on the page.' },
      { title: 'Track', text: 'Snippets and AI Overview appearances, monthly.' },
    ],
    deep: [
      {
        heading: 'What counts as an "answer engine"?',
        text: 'Any part of search that answers the question directly instead of just listing links.',
        points: [
          'Featured snippets at the top of Google results.',
          'Google AI Overviews and AI Mode.',
          'Voice assistants that read out one answer.',
        ],
      },
      {
        heading: 'What actually helps, according to Google?',
        text: 'Google says there are no extra requirements to appear in AI Overviews: the page must be indexed and eligible for a snippet. Its advice is normal SEO, people-first content and keeping key information in text. So AEO is about clarity, not tricks.',
      },
    ],
  },
  'seo-services/generative-engine-optimization': {
    process: [
      {
        title: 'Visibility check',
        text: 'What ChatGPT, Gemini, Perplexity and Copilot say about you.',
      },
      { title: 'Crawler access', text: 'OAI-SearchBot, PerplexityBot and others allowed in.' },
      { title: 'Evidence', text: 'Key pages rewritten with facts, sources and specifics.' },
      { title: 'Entity details', text: 'Same name, services and contact everywhere online.' },
      { title: 'Bing & mentions', text: 'Bing Webmaster Tools set up; real mentions earned.' },
      { title: 'Re-check', text: 'The same questions asked again each month.' },
    ],
    deep: [
      {
        heading: 'What does the research say works?',
        text: 'The original GEO study (Aggarwal et al., KDD 2024) tested content changes on 10,000 queries.',
        points: [
          'Adding quotations improved visibility in AI answers the most, by about 41%.',
          'Adding statistics improved it by about 31%; citing sources by about 27%.',
          'Keyword stuffing made visibility worse than doing nothing.',
        ],
      },
      {
        heading: 'Which crawlers matter for AI search?',
        text: 'Each AI company runs its own crawler. OpenAI says OAI-SearchBot must be allowed for a site to appear in ChatGPT search; GPTBot only collects training data. Microsoft Copilot draws on Bing, so we register you with Bing Webmaster Tools too.',
      },
    ],
  },
  'seo-services/website-speed': {
    process: [
      { title: 'Measure', text: 'Core Web Vitals from real visitors and lab tests.' },
      { title: 'Find causes', text: 'Images, scripts, plugins, fonts and hosting.' },
      { title: 'Fix', text: 'Heaviest problems first, page by page.' },
      { title: 'Prove', text: 'Before-and-after numbers in one report.' },
    ],
    deep: [
      {
        heading: 'What counts as fast, according to Google?',
        text: 'Google’s Core Web Vitals use three measures, judged at the 75th percentile of real page loads on mobile and desktop.',
        points: [
          'Largest Contentful Paint (loading): 2.5 seconds or less.',
          'Interaction to Next Paint (response): 200 milliseconds or less.',
          'Cumulative Layout Shift (stability): 0.1 or less.',
        ],
      },
    ],
  },
  'seo-services/website-maintenance': {
    process: [
      { title: 'Health check', text: 'Updates, security, backups and broken pages.' },
      { title: 'Fix urgent issues', text: 'Anything risky is sorted first.' },
      { title: 'Monthly care', text: 'Updates, backups, uptime checks and small edits.' },
      { title: 'Summary', text: 'A short note on what was done each month.' },
    ],
  },
};
