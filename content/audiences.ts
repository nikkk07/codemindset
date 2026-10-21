import type { Audience } from './types';

/**
 * "Who are you?" pages. Startups, growing businesses and enterprises buy technology for different
 * reasons (speed, efficiency, risk), so each page leads with what that buyer cares about.
 * No uptime figures, certifications or client names are claimed.
 */
export const audiences: Audience[] = [
  {
    slug: 'startups',
    icon: 'rocket',
    name: 'Startups',
    short: 'Launch your MVP fast, without overspending.',
    h1: 'From idea to MVP —',
    h1Accent: 'fast and lean.',
    intro:
      'Startups need a working product in front of users quickly, on a tight budget. CodeMindset builds MVPs, SaaS products and AI features with managed cloud services and proven tools, so you launch fast and can scale when it works.',
    priorities: [
      { title: 'Speed to market', text: 'A first working version in short, fixed stages.' },
      {
        title: 'Low running costs',
        text: 'Serverless and managed services instead of big servers.',
      },
      { title: 'Room to grow', text: 'Clean code you own, ready for your future team.' },
    ],
    recommended: [
      'custom-software/saas-development',
      'mobile-app-development/flutter',
      'website-development/landing-pages',
      'ai-engineering/rag-knowledge-assistants',
      'crm-whatsapp-integration/payment-gateway-integration',
      'technical-assessment/tech-stack-review',
    ],
    howWeWork: [
      { title: 'Scope the MVP', text: 'Only the features needed to test your idea.' },
      { title: 'Build in sprints', text: 'Working software every step, demo-ready.' },
      { title: 'Launch & learn', text: 'Analytics from day one to see what users do.' },
      { title: 'Grow', text: 'Scale, add features or hand over to your team.' },
    ],
    faqs: [
      {
        question: 'How fast can you build an MVP?',
        answer:
          'Fast. We cut scope to what proves your idea and write the delivery date into your quote.',
      },
      {
        question: 'Will we own the code?',
        answer:
          'Yes. The code, accounts and documentation are yours, which matters to investors and future hires.',
      },
      {
        question: 'Can you work with our existing developers?',
        answer: 'Yes. We can build alongside your team, or hand over cleanly when you hire.',
      },
    ],
    seo: {
      title: 'MVP & SaaS Development for Startups in India',
      description:
        'Fast, lean MVP, SaaS, app and AI development for startups in India. Managed cloud to keep costs low, code you own, delivered in short stages.',
    },
    review: 'approved',
  },
  {
    slug: 'growing-businesses',
    icon: 'briefcase',
    name: 'Growing businesses',
    short: 'More customers, less manual work.',
    h1: 'Grow without adding',
    h1Accent: 'more manual work.',
    intro:
      'Growing businesses grow fastest when enquiries are never missed and repetitive work runs itself. CodeMindset builds the website, WhatsApp automation, CRM and simple software that let your team handle more without hiring more.',
    priorities: [
      { title: 'More enquiries', text: 'A website and WhatsApp that turn visitors into leads.' },
      { title: 'Less repetition', text: 'Automations that remove copy-paste and reminders.' },
      { title: 'Clear numbers', text: 'Dashboards that show what’s working.' },
    ],
    recommended: [
      'website-development/business-websites',
      'ai-chatbots-automation/whatsapp-chatbots',
      'crm-whatsapp-integration/crm-integration',
      'ai-chatbots-automation/workflow-automation',
      'custom-software/dashboards',
      'seo-services/technical-seo',
    ],
    howWeWork: [
      { title: 'Understand the business', text: 'A short call about how work happens today.' },
      { title: 'Fix the biggest leak', text: 'Start where you lose most time or leads.' },
      { title: 'Build and train', text: 'Your team learns the new way of working.' },
      { title: 'Support', text: 'Updates and improvements as you grow.' },
    ],
    faqs: [
      {
        question: 'Our budget is tight. Where should we start?',
        answer:
          'Usually with lead capture: a clear website plus WhatsApp follow-up and a simple CRM. It pays for itself fastest.',
      },
      {
        question: 'Do we need technical staff?',
        answer: 'No. We set everything up, train your team and support it after launch.',
      },
    ],
    seo: {
      title: 'Websites, Automation & CRM for Growing Businesses in India',
      description:
        'Websites, WhatsApp automation, CRM and simple custom software for growing businesses in India. More enquiries, less manual work.',
    },
    review: 'approved',
  },
  {
    slug: 'enterprises',
    icon: 'building',
    name: 'Enterprises',
    short: 'Security, scale and predictable delivery.',
    h1: 'Enterprise technology with',
    h1Accent: 'security built in.',
    intro:
      'Large organisations need technology that is secure, documented and predictable. CodeMindset delivers private AI, data platforms, system modernisation, integrations and security work with clear scope, review points and documentation that supports your governance and audits.',
    priorities: [
      {
        title: 'Risk and data protection',
        text: 'Private deployments, access control and audit logs.',
      },
      { title: 'Scale and reliability', text: 'Architecture designed for growth and monitoring.' },
      { title: 'Predictable delivery', text: 'Fixed scope, milestones and full documentation.' },
    ],
    recommended: [
      'ai-engineering/private-llm-deployment',
      'ai-engineering/llm-guardrails-monitoring',
      'data-engineering/data-warehouse',
      'custom-software/legacy-modernisation',
      'cybersecurity/zero-trust',
      'crm-whatsapp-integration/api-development',
    ],
    howWeWork: [
      {
        title: 'Discovery & security review',
        text: 'Requirements, risks and your policies first.',
      },
      { title: 'Architecture sign-off', text: 'Design reviewed with your IT and security teams.' },
      {
        title: 'Delivery in milestones',
        text: 'Tested increments with clear acceptance criteria.',
      },
      { title: 'Handover & support', text: 'Documentation, training and agreed support.' },
    ],
    faqs: [
      {
        question: 'Can you work within our security and procurement process?',
        answer:
          'Yes. We provide documentation for security reviews, follow your access policies and work through your procurement steps.',
      },
      {
        question: 'Can AI and data stay inside our cloud?',
        answer:
          'Yes. We deploy in your AWS, Azure or Google Cloud account, or on your own servers.',
      },
      {
        question: 'Do you offer support agreements?',
        answer: 'Yes, support terms are agreed separately and written into the contract.',
      },
    ],
    seo: {
      title: 'Enterprise Software, AI & Data Engineering Services in India',
      description:
        'Private AI, LLM guardrails, data platforms, legacy modernisation, zero-trust security and integrations for enterprises, documented and delivered in milestones.',
    },
    review: 'approved',
  },
];
