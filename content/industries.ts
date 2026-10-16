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
          'Admission enquiries arrive by phone, walk-in and website — and some are never followed up.',
        fix: 'One enquiry system with an owner and reminders for every lead.',
        link: 'integrations/crm-integration',
      },
      {
        problem: 'Parents keep calling to ask the same questions.',
        fix: 'A WhatsApp assistant that answers common questions and sends updates.',
        link: 'ai-automation/whatsapp-chatbots',
      },
      {
        problem: 'Our website is outdated and hard to update.',
        fix: 'A modern, mobile-first website your staff can edit.',
        link: 'website-development/wordpress',
      },
      {
        problem: 'Fee reminders and receipts are done by hand.',
        fix: 'Online fee payment with automatic reminders and receipts.',
        link: 'integrations/payment-gateway-integration',
      },
    ],
    faqs: [
      {
        question: 'Can parents pay fees online?',
        answer: 'Yes — UPI, cards and net banking, with automatic receipts and reminders.',
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
    review: 'draft',
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
        link: 'integrations/crm-integration',
      },
      {
        problem: 'Quotations take days and live in Word files.',
        fix: 'A quotation tool with templates, approvals and tracking.',
        link: 'custom-software/internal-tools',
      },
      {
        problem: 'Clients keep emailing for status updates.',
        fix: 'A client portal with documents, invoices and progress.',
        link: 'app-development/customer-portals',
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
        answer: 'Yes — approval steps, version history and a log of every change.',
      },
    ],
    seo: {
      title: 'CRM, Portals & Automation for B2B Service Businesses',
      description:
        'Lead management, quotation tools, client portals and dashboards for B2B and professional service firms across India.',
    },
    review: 'draft',
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
        link: 'integrations/accounting-sync',
      },
      {
        problem: 'Customers keep asking “where is my order?”',
        fix: 'Automatic order and delivery updates on WhatsApp.',
        link: 'integrations/whatsapp-business-api',
      },
      {
        problem: 'Our store is slow on phones.',
        fix: 'Speed optimisation that makes pages load fast.',
        link: 'seo-performance/website-speed',
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
        answer: 'Yes — UPI, cards, wallets and net banking through Indian payment gateways.',
      },
    ],
    seo: {
      title: 'E-commerce Websites, Apps & Automation for Retail Brands',
      description:
        'Shopify and WooCommerce stores, e-commerce apps, payments, stock sync and WhatsApp order updates for retailers across India.',
    },
    review: 'draft',
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
        link: 'app-development/booking-apps',
      },
      {
        problem: 'Patients don’t find us on Google.',
        fix: 'A clear website and technical SEO for local searches.',
        link: 'seo-performance/technical-seo',
      },
      {
        problem: 'The same questions come in on WhatsApp all day.',
        fix: 'A WhatsApp assistant for timings, fees and directions — with hand-over to staff.',
        link: 'ai-automation/whatsapp-chatbots',
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
    review: 'draft',
  },
];
