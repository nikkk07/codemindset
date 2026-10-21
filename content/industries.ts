import type { Industry } from './types';

/** Industry pages. Problems are written in the client's words; links point to service pages. */
export const industries: Industry[] = [
  {
    slug: 'education',
    icon: 'school',
    name: 'Education',
    h1: 'Technology for schools, colleges and institutes',
    intro:
      'Admissions, fee follow-ups, parent updates and student records take a lot of staff time. We build websites, enquiry systems, portals and WhatsApp automation that let your team focus on students.',
    problems: [
      {
        problem:
          'Admission enquiries arrive by phone, walk-in and website, and some are never followed up.',
        fix: 'One enquiry system with an owner and reminders for every lead.',
        link: 'crm-whatsapp-integration/crm-integration',
      },
      {
        problem: 'Parents keep calling to ask the same questions.',
        fix: 'A WhatsApp assistant that answers common questions and sends updates.',
        link: 'ai-chatbots-automation/whatsapp-chatbots',
      },
      {
        problem: 'Our website is outdated and hard to update.',
        fix: 'A modern, mobile-first website your staff can edit.',
        link: 'website-development/wordpress',
      },
      {
        problem: 'Fee reminders and receipts are done by hand.',
        fix: 'Online fee payment with automatic reminders and receipts.',
        link: 'crm-whatsapp-integration/payment-gateway-integration',
      },
    ],
    faqs: [
      {
        question: 'Can parents pay fees online?',
        answer: 'Yes, UPI, cards and net banking, with automatic receipts and reminders.',
      },
      {
        question: 'Can you build a student or parent portal?',
        answer: 'Yes. Secure logins to see attendance, fees, results and notices.',
      },
    ],
    seo: {
      title: 'Software, Websites & Automation for Schools and Institutes',
      description:
        'Admission enquiry systems, school websites, parent portals, fee payments and WhatsApp automation for education businesses across India.',
    },
    review: 'approved',
  },
  {
    slug: 'b2b-services',
    icon: 'briefcase',
    name: 'B2B services',
    h1: 'Technology for B2B and professional service firms',
    intro:
      'Leads, quotations, follow-ups and client updates often live in inboxes and spreadsheets. We connect them into one clear system so nothing slips and clients get faster answers.',
    problems: [
      {
        problem: 'Leads come from many places and nobody knows who is following up.',
        fix: 'Every lead in your CRM, assigned automatically, with reminders.',
        link: 'crm-whatsapp-integration/crm-integration',
      },
      {
        problem: 'Quotations take days and live in Word files.',
        fix: 'A quotation tool with templates, approvals and tracking.',
        link: 'custom-software/internal-tools',
      },
      {
        problem: 'Clients keep emailing for status updates.',
        fix: 'A client portal with documents, invoices and progress.',
        link: 'mobile-app-development/customer-portals',
      },
      {
        problem: 'I can’t see sales and cash numbers in one place.',
        fix: 'A live dashboard from your CRM and accounts.',
        link: 'custom-software/dashboards',
      },
    ],
    faqs: [
      {
        question: 'Can you work with the CRM we already use?',
        answer:
          'Yes. We connect your existing CRM rather than replacing it, unless it truly doesn’t fit.',
      },
      {
        question: 'Can quotations be approved before they are sent?',
        answer: 'Yes, approval steps, version history and a log of every change.',
      },
    ],
    seo: {
      title: 'CRM, Portals & Automation for B2B Service Businesses',
      description:
        'Lead management, quotation tools, client portals and dashboards for B2B and professional service firms across India.',
    },
    review: 'approved',
  },
  {
    slug: 'retail-ecommerce',
    icon: 'bag',
    name: 'Retail & e-commerce',
    h1: 'Technology for retail and e-commerce brands',
    intro:
      'Selling online means a fast store, smooth payments, accurate stock and quick order updates. We build stores and the systems behind them, so you spend less time fixing orders and more time selling.',
    problems: [
      {
        problem: 'We want to sell online but don’t know where to start.',
        fix: 'A Shopify or WooCommerce store, set up and ready to sell.',
        link: 'website-development/shopify',
      },
      {
        problem: 'Stock doesn’t match between the shop and the website.',
        fix: 'Automatic stock sync between your systems.',
        link: 'crm-whatsapp-integration/accounting-sync',
      },
      {
        problem: 'Customers keep asking “where is my order?”',
        fix: 'Automatic order and delivery updates on WhatsApp.',
        link: 'crm-whatsapp-integration/whatsapp-business-api',
      },
      {
        problem: 'Our store is slow on phones.',
        fix: 'Speed optimisation that makes pages load fast.',
        link: 'seo-services/website-speed',
      },
    ],
    faqs: [
      {
        question: 'Shopify or WooCommerce?',
        answer:
          'Shopify is quickest and simplest to run. WooCommerce suits brands that want a store inside a WordPress content site. We’ll recommend based on your products.',
      },
      {
        question: 'Can customers pay with UPI?',
        answer: 'Yes, UPI, cards, wallets and net banking through Indian payment gateways.',
      },
    ],
    seo: {
      title: 'E-commerce Websites, Apps & Automation for Retail Brands',
      description:
        'Shopify and WooCommerce stores, e-commerce apps, payments, stock sync and WhatsApp order updates for retailers across India.',
    },
    review: 'approved',
  },
  {
    slug: 'healthcare',
    icon: 'heart',
    name: 'Healthcare',
    h1: 'Technology for clinics, hospitals and healthcare providers',
    intro:
      'Patients expect to book online, get reminders and reach you quickly. We build booking systems, websites and WhatsApp communication with careful handling of personal data.',
    problems: [
      {
        problem: 'Reception is overloaded with appointment calls.',
        fix: 'Online booking with live slots and automatic reminders.',
        link: 'mobile-app-development/booking-apps',
      },
      {
        problem: 'Patients don’t find us on Google.',
        fix: 'A clear website and technical SEO for local searches.',
        link: 'seo-services/technical-seo',
      },
      {
        problem: 'The same questions come in on WhatsApp all day.',
        fix: 'A WhatsApp assistant for timings, fees and directions, with hand-over to staff.',
        link: 'ai-chatbots-automation/whatsapp-chatbots',
      },
      {
        problem: 'Patient enquiries are tracked on paper.',
        fix: 'A simple enquiry and follow-up system.',
        link: 'custom-software/internal-tools',
      },
    ],
    faqs: [
      {
        question: 'Is patient data handled safely?',
        answer:
          'We collect only what is needed, restrict access, encrypt data and follow India’s data protection law (DPDP Act).',
      },
      {
        question: 'Can the chatbot give medical advice?',
        answer:
          'No. It handles timings, bookings and directions only, and hands medical questions to your staff.',
      },
    ],
    seo: {
      title: 'Booking Systems, Websites & Automation for Clinics and Hospitals',
      description:
        'Appointment booking, clinic websites, patient enquiry systems and WhatsApp reminders for healthcare providers across India.',
    },
    review: 'approved',
  },
  {
    slug: 'finance-insurance',
    icon: 'bank',
    name: 'Finance & insurance',
    h1: 'Technology for banks, NBFCs, fintechs and insurers',
    intro:
      'Applications, KYC, claims and customer queries need speed without cutting corners on security. We build secure portals, AI assistants with human approval, data platforms and modernised core systems.',
    problems: [
      {
        problem: 'Loan and claim applications take days of manual checking.',
        fix: 'AI agents that gather documents and checks, with a person making the final decision.',
        link: 'ai-engineering/multi-agent-systems',
      },
      {
        problem: 'Our customer chatbot could be tricked into giving out data.',
        fix: 'AI security testing, input filters and response guardrails.',
        link: 'cybersecurity/ai-security-testing',
      },
      {
        problem: 'Our core system is old and risky to change.',
        fix: 'Step-by-step modernisation with old and new systems running side by side.',
        link: 'custom-software/legacy-modernisation',
      },
      {
        problem: 'Staff use AI tools and we can’t see what data goes in.',
        fix: 'An AI gateway with logging, data blocking and cost limits.',
        link: 'ai-engineering/llm-guardrails-monitoring',
      },
    ],
    faqs: [
      {
        question: 'Can AI run inside our own cloud?',
        answer:
          'Yes, private deployments on AWS Bedrock, Azure OpenAI or your own servers keep data in your environment.',
      },
      {
        question: 'Do you hold banking-specific certifications?',
        answer:
          'We build to your security and compliance requirements and support your audits; certifications themselves are issued by accredited bodies.',
      },
    ],
    seo: {
      title: 'Software, AI & Security for Banks, Fintechs and Insurers in India',
      description:
        'Secure portals, AI agents with human approval, chatbot security, data platforms and legacy modernisation for finance and insurance businesses in India.',
    },
    review: 'approved',
  },
  {
    slug: 'logistics',
    icon: 'truck',
    name: 'Logistics & supply chain',
    h1: 'Technology for logistics, transport and supply chains',
    intro:
      'Shipments, drivers, warehouses and customers all need up-to-date information. We build tracking apps, real-time data pipelines, route-optimisation models and WhatsApp updates.',
    problems: [
      {
        problem: 'Customers keep calling to ask where their shipment is.',
        fix: 'Automatic tracking updates on WhatsApp and a customer tracking page.',
        link: 'crm-whatsapp-integration/whatsapp-business-api',
      },
      {
        problem: 'We find out about delays too late.',
        fix: 'Real-time data streaming with live dashboards and alerts.',
        link: 'data-engineering/real-time-streaming',
      },
      {
        problem: 'Routes are planned by hand every morning.',
        fix: 'Route models that learn from traffic, weather and driver feedback.',
        link: 'data-engineering/mlops',
      },
      {
        problem: 'Drivers report on paper and WhatsApp.',
        fix: 'A simple driver app for proof of delivery and updates.',
        link: 'mobile-app-development/android-apps',
      },
    ],
    faqs: [
      {
        question: 'Can the driver app work with poor network?',
        answer: 'Yes. The app saves updates offline and syncs when the connection returns.',
      },
      {
        question: 'Can you connect to our existing ERP or TMS?',
        answer:
          'Yes, through their APIs or data exports, so information flows without double entry.',
      },
    ],
    seo: {
      title: 'Software, Apps & Real-Time Data for Logistics Companies in India',
      description:
        'Shipment tracking, WhatsApp delivery updates, driver apps, real-time data pipelines and route optimisation for logistics and supply-chain businesses in India.',
    },
    review: 'approved',
  },
  {
    slug: 'real-estate',
    icon: 'home',
    name: 'Real estate',
    h1: 'Technology for builders, brokers and property businesses',
    intro:
      'Property buyers expect fast answers, clear information and easy site visits. We build property websites, lead management with WhatsApp follow-up, CRM integrations and, where it fits, asset tokenization.',
    problems: [
      {
        problem: 'Leads from portals and ads go cold before anyone calls back.',
        fix: 'Every lead in one CRM with instant WhatsApp replies and follow-up reminders.',
        link: 'crm-whatsapp-integration/crm-integration',
      },
      {
        problem: 'Our project website doesn’t generate site visits.',
        fix: 'A fast project website with floor plans, enquiry and booking built in.',
        link: 'website-development/landing-pages',
      },
      {
        problem: 'Buyers ask the same questions all day.',
        fix: 'A WhatsApp assistant for prices, availability and site-visit booking.',
        link: 'ai-chatbots-automation/whatsapp-chatbots',
      },
      {
        problem: 'We want to offer fractional ownership.',
        fix: 'Compliant asset tokenization with transfer rules, subject to legal advice.',
        link: 'blockchain/asset-tokenization',
      },
    ],
    faqs: [
      {
        question: 'Can leads from property portals go straight into our CRM?',
        answer:
          'Yes, where the portal offers an API, email or export, leads are captured and assigned automatically.',
      },
      {
        question: 'Is property tokenization allowed in India?',
        answer:
          'Rules depend on the structure and investors. We build the technology; your legal advisors confirm the structure.',
      },
    ],
    seo: {
      title: 'Websites, CRM & WhatsApp Automation for Real Estate in India',
      description:
        'Property websites, lead management with WhatsApp follow-up, CRM integration and asset tokenization for builders, brokers and real-estate businesses in India.',
    },
    review: 'approved',
  },
];
