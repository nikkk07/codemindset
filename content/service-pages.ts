import type { FAQ } from './types';

/**
 * The service pages that get their own URL. Every other sub-service is listed on its hub page
 * (linked by anchor) instead of getting a thin page of its own: Google treats many near-identical
 * template pages as scaled content, so each page here has its own answer-first intro and questions.
 *
 * Keys are "hub/sub". Copy rules: plain words, the search phrase in the first sentence,
 * no prices (owner decision), no promises we cannot keep.
 */
export interface ServicePageCopy {
  /** Answer-first paragraph: what it is, who it's for, what CodeMindset does. */
  intro: string;
  faqs: FAQ[];
}

export const servicePages: Record<string, ServicePageCopy> = {
  /* ---------- Websites ---------- */
  'website-development/business-websites': {
    intro:
      'A business website shows who you are, what you offer and how to reach you. We build 5–15 page sites, mobile-first and Google-ready, with call, WhatsApp and enquiry buttons on every page.',
    faqs: [
      {
        question: 'What pages does a small business website need?',
        answer:
          'Most need a home page, a page for each main service, an about page, a contact page with a map and enquiry form, and simple pages for privacy and terms. We add a blog or FAQ only when it helps people find you.',
      },
      {
        question: 'Will I be able to update the website myself?',
        answer:
          'Yes. We set up an editor so your team can change text, photos and prices, and we show you how. If you prefer, we can make changes for you.',
      },
      {
        question: 'Do you write the content too?',
        answer:
          'Yes. We can write the page content in plain, search-friendly language from a short call with you, or polish what you already have.',
      },
    ],
  },
  'website-development/ecommerce-websites': {
    intro:
      'An e-commerce website lets customers browse, pay by UPI, card or cash on delivery, and track orders. We build online stores on Shopify or WooCommerce with Indian payments, shipping and WhatsApp order updates.',
    faqs: [
      {
        question: 'Shopify or WooCommerce, which is better for my store?',
        answer:
          'Shopify is quicker to run and very reliable, with a monthly fee. WooCommerce has no platform fee and more control, but needs a little more upkeep. We recommend one after hearing how many products you have and how you ship.',
      },
      {
        question: 'Can customers pay by UPI and cash on delivery?',
        answer:
          'Yes. We connect Indian payment gateways such as Razorpay, Cashfree or PayU for UPI, cards and wallets, and set up cash on delivery rules if you offer it.',
      },
      {
        question: 'Can you move my existing store to a new platform?',
        answer:
          'Yes. We move products, customers and order history where the platforms allow it, and set up redirects so your Google rankings are protected.',
      },
    ],
  },
  'website-development/landing-pages': {
    intro:
      'A landing page is one focused page that turns ad visitors into calls, WhatsApp chats or form enquiries. We build fast mobile landing pages with tracking for Google and Meta Ads.',
    faqs: [
      {
        question: 'Why use a landing page instead of my home page for ads?',
        answer:
          'A home page talks about everything. A landing page matches the ad the person clicked and asks for one action, which usually means more enquiries for the same ad spend.',
      },
      {
        question: 'Can you connect it to Google Ads and Meta Ads tracking?',
        answer:
          'Yes. We set up conversion tracking for forms, calls and WhatsApp clicks so your ad platforms can optimise for real enquiries.',
      },
    ],
  },
  'website-development/website-redesign': {
    intro:
      'A website redesign gives an outdated or slow site a modern, faster version without losing its Google rankings. We keep what works, rebuild the rest and redirect every old link.',
    faqs: [
      {
        question: 'Will a redesign hurt my Google rankings?',
        answer:
          'Not if it is done carefully. We keep the pages that rank, redirect every old address to the right new page and check Search Console after launch.',
      },
      {
        question: 'Can you keep my current domain and email?',
        answer: 'Yes. Your domain and email stay as they are; only the website changes.',
      },
    ],
  },
  'website-development/wordpress': {
    intro:
      'WordPress lets you edit your own website as easily as a document. We build custom WordPress sites that are fast, secure and SEO-ready, with enquiry forms from day one.',
    faqs: [
      {
        question: 'Is WordPress good for a business website?',
        answer:
          'Yes, for most business and content websites. It is easy to edit, widely supported and flexible. For an online store Shopify is often simpler; for unusual features, custom code may suit better.',
      },
      {
        question: 'Is WordPress secure?',
        answer:
          'It is when it is kept updated and set up properly. We use few, trusted plugins, add security and backups, and can handle updates for you every month.',
      },
    ],
  },
  'website-development/shopify': {
    intro:
      'Shopify is a ready-made platform for selling online, with payments, stock and shipping built in. We design and set up Shopify stores for Indian brands, ready for your team to run.',
    faqs: [
      {
        question: 'Does Shopify work well in India?',
        answer:
          'Yes. It supports Indian payment gateways, UPI, cash on delivery apps and Indian shipping partners, and prices can be shown in rupees with GST.',
      },
      {
        question: 'Can you customise a Shopify theme?',
        answer:
          'Yes. We adjust an existing theme or design a custom one, so the store looks like your brand rather than a template.',
      },
    ],
  },

  /* ---------- Mobile apps ---------- */
  'mobile-app-development/android-apps': {
    intro:
      'Android app development means building apps for the phones most Indians use. We build Android apps for bookings, orders, deliveries and customer accounts, and publish them on Google Play.',
    faqs: [
      {
        question: 'Should I build for Android only or for iPhone too?',
        answer:
          'If most of your customers are in India, Android alone is often a sensible first step. If you need both, a cross-platform app (Flutter or React Native) covers both from one codebase.',
      },
      {
        question: 'Will you publish the app on Google Play?',
        answer:
          'Yes. We prepare the listing, screenshots and privacy details and publish it under your own developer account, so the app stays yours.',
      },
    ],
  },
  'mobile-app-development/ios-apps': {
    intro:
      'iOS app development means building apps for iPhone and iPad. We build iPhone apps that pass Apple’s review and publish them on the App Store under your own account.',
    faqs: [
      {
        question: 'How long does Apple take to approve an app?',
        answer:
          'Apple’s review usually takes a short time once the app is complete, but it can ask for changes. We prepare the app to meet the guidelines before submitting.',
      },
      {
        question: 'Do I need a Mac or an Apple developer account?',
        answer:
          'You need an Apple developer account in your business name so the app belongs to you. We guide you through it; you do not need a Mac yourself.',
      },
    ],
  },
  'mobile-app-development/flutter': {
    intro:
      'Flutter is Google’s toolkit for one app that runs on both Android and iPhone. We use it when you want both platforms quickly, at a lower cost than two separate apps.',
    faqs: [
      {
        question: 'Is a Flutter app as good as a native app?',
        answer:
          'For most business apps, booking, ordering, accounts, dashboards, yes. Native code is worth it mainly for heavy graphics or very specific device features.',
      },
      {
        question: 'Can a Flutter app work offline?',
        answer:
          'Yes. We can store data on the phone and sync it when the connection returns, which is useful for field teams and areas with weak networks.',
      },
    ],
  },

  /* ---------- Chatbots & automation ---------- */
  'ai-chatbots-automation/whatsapp-chatbots': {
    intro:
      'A WhatsApp chatbot replies to your customers automatically with prices, timings, bookings and order status, and saves every lead. We build it on the official WhatsApp Business Platform, using your own number.',
    faqs: [
      {
        question: 'Do I need the WhatsApp Business API for a chatbot?',
        answer:
          'Yes. The free WhatsApp Business app cannot run a proper chatbot. We set up the official WhatsApp Business Platform (API) through Meta or an approved provider, on your own number.',
      },
      {
        question: 'What happens when the chatbot cannot answer?',
        answer:
          'It hands the conversation to a person on your team with the details already collected, so the customer does not have to repeat themselves.',
      },
      {
        question: 'Are there running costs?',
        answer:
          'Meta charges per message for some message types, and providers may charge a monthly fee. We explain these costs in your quote before anything is set up.',
      },
    ],
  },
  'ai-chatbots-automation/website-chatbots': {
    intro:
      'An AI website chatbot answers visitors instantly, day and night, from your own information. We build chatbots that turn visitors into enquiries and pass hot leads to WhatsApp or email.',
    faqs: [
      {
        question: 'Will the chatbot make up answers?',
        answer:
          'We limit it to your approved information and tell it to say “let me connect you to the team” when it is unsure, instead of guessing.',
      },
      {
        question: 'Can it speak Hindi as well as English?',
        answer:
          'Yes. Modern AI models handle Hindi, Hinglish and English, and we test the answers in the languages your customers use.',
      },
    ],
  },
  'ai-chatbots-automation/workflow-automation': {
    intro:
      'Workflow automation lets software handle repetitive tasks such as follow-ups, reminders, data entry and invoices. We automate them with n8n, Make, Zapier or custom code, with alerts if anything fails.',
    faqs: [
      {
        question: 'What kind of work can be automated?',
        answer:
          'Anything repetitive with clear rules: lead follow-ups, appointment reminders, order updates, report emails, data entry between tools and document generation.',
      },
      {
        question: 'Will automation replace my staff?',
        answer:
          'It removes the boring parts so your team can spend time on customers. Important decisions stay with people.',
      },
    ],
  },

  /* ---------- CRM & integrations ---------- */
  'crm-whatsapp-integration/crm-integration': {
    intro:
      'CRM integration puts every lead from your website, WhatsApp and calls into one customer database. We set up and connect Zoho CRM, HubSpot or Salesforce for small and mid-sized businesses.',
    faqs: [
      {
        question: 'Which CRM is best for a small business in India?',
        answer:
          'Zoho CRM and HubSpot suit most small businesses; the right one depends on your team size, budget and which tools you already use. We recommend one after a short call.',
      },
      {
        question: 'Can you connect WhatsApp to my CRM?',
        answer:
          'Yes. Through the WhatsApp Business API, chats and leads can appear in the CRM automatically, and your team can reply from there.',
      },
    ],
  },
  'crm-whatsapp-integration/whatsapp-business-api': {
    intro:
      'The WhatsApp Business API lets a business automate messages, run chatbots and reply from one number as a team. We set it up on your number and connect it to your website, CRM or store.',
    faqs: [
      {
        question: 'What is the difference between the WhatsApp Business app and the API?',
        answer:
          'The app is for one phone and manual replies. The API is for automation: chatbots, bulk notifications people have opted into, multiple agents and integrations.',
      },
      {
        question: 'Can I keep my existing number?',
        answer:
          'Usually yes, but a number registered on the API cannot be used in the normal WhatsApp app at the same time. We plan the switch with you.',
      },
    ],
  },
  'crm-whatsapp-integration/payment-gateway-integration': {
    intro:
      'Payment gateway integration lets customers pay you online by UPI, cards or wallets. We integrate Razorpay, Cashfree, PayU or Stripe with automatic receipts, refunds and order updates.',
    faqs: [
      {
        question: 'Which payment gateway should I use?',
        answer:
          'Razorpay and Cashfree are common choices for Indian businesses; fees, settlement time and the features you need decide it. We compare them for your case.',
      },
      {
        question: 'Can I accept international payments?',
        answer:
          'Yes, with a gateway that supports them, such as Stripe or Razorpay’s international option, subject to their approval.',
      },
    ],
  },

  /* ---------- SEO & website care ---------- */
  'seo-services/local-seo': {
    intro:
      'Local SEO helps nearby customers find you on Google and Google Maps. We set up your Google Business Profile, build pages for the services and areas you serve, and help you collect genuine reviews.',
    faqs: [
      {
        question: 'How long does local SEO take to show results?',
        answer:
          'Fixes to your Google Business Profile and website can help within weeks; steady growth usually takes a few months, depending on competition in your area.',
      },
      {
        question: 'Do I need a physical address?',
        answer:
          'Businesses that serve customers at their location need one. Service-area businesses can hide the address and list the areas they cover instead.',
      },
    ],
  },
  'seo-services/answer-engine-optimization': {
    intro:
      'Answer engine optimisation (AEO) shapes your pages so Google’s AI Overviews, featured snippets and voice assistants can quote them directly. We find the questions your customers ask and answer each one clearly.',
    faqs: [
      {
        question: 'How is AEO different from SEO?',
        answer:
          'SEO helps a page rank. AEO makes a ranking page easy to quote, with a direct answer near the top. Google says AI Overviews use its normal ranking systems, so AEO works on top of good SEO, not instead of it.',
      },
      {
        question: 'Do I need special code or files for AI Overviews?',
        answer:
          'No. Google states there are no extra requirements or special schema for AI Overviews. The page has to be indexed and eligible for a snippet. What helps is clear writing that answers the question.',
      },
      {
        question: 'Can you guarantee my page appears in AI Overviews?',
        answer:
          'No one can. Google decides what to show for each search. We improve the odds and show you the searches where your pages already appear.',
      },
    ],
  },
  'seo-services/generative-engine-optimization': {
    intro:
      'Generative engine optimisation (GEO) helps ChatGPT, Gemini, Perplexity and Copilot understand, trust and recommend your business. We open your site to their crawlers and add the facts and sources they prefer to cite.',
    faqs: [
      {
        question: 'Does GEO actually work, or is it hype?',
        answer:
          'There is real research behind it. A KDD 2024 study by researchers from Princeton and others found that adding sources, statistics and quotations raised visibility in AI answers by up to 40%, while keyword stuffing lowered it.',
      },
      {
        question: 'How do I get into ChatGPT search results?',
        answer:
          'OpenAI says sites must allow its OAI-SearchBot crawler in robots.txt to appear in ChatGPT search answers. Blocking GPTBot only stops model training, not search visibility. We check and set this up.',
      },
      {
        question: 'Does an llms.txt file help?',
        answer:
          'Not with Google. Google’s Gary Illyes said in July 2025 that Google does not support llms.txt and has no plans to. It costs little to add, but it is not a ranking lever.',
      },
    ],
  },
  'seo-services/website-speed': {
    intro:
      'Website speed optimisation makes pages load fast on mobile, so fewer visitors leave. We measure with Google’s tools, fix images, plugins, hosting and code, and show before-and-after numbers.',
    faqs: [
      {
        question: 'Why is my website slow?',
        answer:
          'The usual causes are large images, too many plugins or scripts, cheap hosting and no caching. An audit shows which ones apply to your site.',
      },
      {
        question: 'Will a faster site rank higher?',
        answer:
          'Speed is one of many ranking signals. Its bigger effect is on people: fast pages lose fewer visitors and get more enquiries.',
      },
    ],
  },
  'seo-services/website-maintenance': {
    intro:
      'Website maintenance keeps your site updated, backed up, secure and working every month. We maintain sites we built and sites built by others, with a short monthly summary.',
    faqs: [
      {
        question: 'Do you maintain websites you did not build?',
        answer:
          'Yes. We start with a check of the site, fix anything urgent, and then take over regular care.',
      },
      {
        question: 'What happens if my site goes down?',
        answer:
          'We are alerted automatically, find the cause and restore it from backup if needed, then tell you what happened.',
      },
    ],
  },
};
