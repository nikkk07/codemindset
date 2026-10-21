import { P, T } from './service-helpers';
import type { ServiceHub } from './types';

/**
 * Advanced service hubs (added 2026-10-16 from the owner's service playbook):
 * AI agents & generative AI, data engineering & MLOps, cybersecurity & AI security, blockchain.
 * Plain words first. Example scenarios are labelled as examples, never as client work.
 * No certifications, uptime figures or client names are claimed.
 */

const aiEngineering: ServiceHub = {
  slug: 'ai-engineering',
  segment: 'advanced',
  icon: 'brain',
  title: 'AI agents & generative AI',
  plainTitle: 'Smart AI systems for my business',
  blurb: 'Multi-agent AI, RAG assistants and private LLMs',
  eyebrow: 'AI agent & generative AI development company in India',
  h1: 'AI agents & generative AI',
  h1Accent: 'development',
  answer:
    'We build AI agents, knowledge assistants (RAG) and private LLM systems with guardrails, monitoring and cost control, built for real business work.',
  simple: {
    title: 'What does a well-built AI system do?',
    steps: [
      {
        title: 'Knows your business',
        text: 'Answers from your own documents and data, and shows where each answer came from.',
      },
      {
        title: 'Gets work done',
        text: 'Takes steps across your tools (checks, drafts, updates) and asks a person before anything important.',
      },
      {
        title: 'Stays safe and affordable',
        text: 'Sensitive data is protected, every action is logged and spending has a ceiling.',
      },
    ],
  },
  platformsLabel: 'Which technology do we use?',
  platforms: [
    P(
      'langgraph',
      'LangGraph',
      'LangGraph agent development',
      'A framework for building AI agents that follow a clear, controllable sequence of steps.',
      'Reliable multi-step agents with human approval points.',
      [
        'Stateful agent workflows',
        'Human-in-the-loop interrupts',
        'Retries and error paths',
        'Tracing of every step',
      ],
    ),
    P(
      'crewai',
      'CrewAI',
      'CrewAI multi-agent development',
      'Teams of AI agents, each with a role, working together on one job.',
      'Research, analysis and content workflows.',
      [
        'Agent roles and tasks',
        'Tool and data access',
        'Review and hand-over steps',
        'Cost tracking',
      ],
    ),
    P(
      'llamaindex',
      'LlamaIndex',
      'LlamaIndex RAG development',
      'Connects AI models to your documents so answers come from your own information.',
      'Knowledge assistants over large document sets.',
      [
        'Document loaders and parsing',
        'Chunking and embeddings',
        'Hybrid search',
        'Answer citations',
      ],
    ),
    P(
      'aws-bedrock',
      'AWS Bedrock',
      'AWS Bedrock generative AI development',
      'Use leading AI models inside your own AWS account.',
      'Businesses already on AWS that need data to stay in their cloud.',
      [
        'Model selection and setup',
        'Private networking',
        'Knowledge bases and agents',
        'IAM and audit logging',
      ],
    ),
    P(
      'azure-openai',
      'Azure OpenAI',
      'Azure OpenAI integration',
      'OpenAI models running in your Microsoft Azure environment.',
      'Microsoft-based organisations with strict data rules.',
      [
        'Private endpoints',
        'Content filtering',
        'Microsoft 365 and SharePoint data',
        'Usage monitoring',
      ],
    ),
    P(
      'neo4j',
      'Neo4j knowledge graphs',
      'Knowledge graph development with Neo4j',
      'Stores how things are connected (people, cases, products) so AI can reason over relationships.',
      'Legal, medical, research and compliance data with many links.',
      [
        'Graph data model',
        'Data import from your systems',
        'Graph-RAG retrieval',
        'Visual exploration',
      ],
    ),
  ],
  types: [
    T(
      'multi-agent-systems',
      'Multi-agent AI systems',
      'Multi-agent AI system development',
      'Several AI agents split a job, check each other’s work and hand over to a person when needed.',
      'Multi-step work such as applications, claims and support cases.',
      [
        'Workflow and decision mapping',
        'Agents built with LangGraph or CrewAI',
        'Human approval points',
        'A log of every action',
      ],
      [
        {
          question: 'Will AI agents act without anyone checking?',
          answer:
            'Only where you allow it. Important decisions (money, approvals, customer messages) go to a person first, and every step is logged.',
        },
      ],
      [
        {
          sector: 'Lending',
          story:
            'Agents receive a loan application, pull the credit report, run fraud checks and draft the terms, then send a recommendation to a human manager who makes the final decision.',
        },
        {
          sector: 'E-commerce',
          story:
            'A support agent checks the order and shipping status, confirms stock and prepares a refund or return label, escalating to staff for anything outside the agreed rules.',
        },
      ],
    ),
    T(
      'rag-knowledge-assistants',
      'RAG & knowledge assistants',
      'RAG knowledge assistant development',
      'An AI assistant that answers from your own documents, and shows where each answer came from.',
      'Policies, manuals, contracts, research and support content.',
      [
        'Document chunking and embeddings',
        'Hybrid keyword + meaning search',
        'Knowledge graphs for linked data (Graph-RAG)',
        'Source citations in every answer',
      ],
      [
        {
          question: 'What is RAG?',
          answer:
            'Retrieval-augmented generation: before answering, the AI looks up the most relevant passages in your documents and uses only those, so answers are grounded and traceable.',
        },
      ],
      [
        {
          sector: 'Legal',
          story:
            'Thousands of past case files become searchable by meaning and by how cases relate to each other, so lawyers get precise answers with the source paragraphs attached.',
        },
        {
          sector: 'Healthcare research',
          story:
            'Research papers, drug information and trial results are linked in a secure knowledge graph so researchers can spot possible interactions faster.',
        },
      ],
    ),
    T(
      'llm-guardrails-monitoring',
      'LLM guardrails & monitoring',
      'LLM monitoring, guardrails and cost control (LLMOps)',
      'See what your AI is asked and answers, block risky data and keep costs predictable.',
      'Teams already using AI that need control and visibility.',
      [
        'Usage and cost dashboards',
        'Caching to cut token spend',
        'Blocking of sensitive data in prompts',
        'Prompt versioning and regression tests',
      ],
      undefined,
      [
        {
          sector: 'Banking',
          story:
            'An AI gateway records every staff AI request, stops source code or customer data being pasted in, and pauses access if usage spikes unexpectedly.',
        },
      ],
    ),
    T(
      'private-llm-deployment',
      'Private & self-hosted AI',
      'Private LLM deployment',
      'Run AI inside your own cloud or servers so company data never leaves it.',
      'Businesses with confidential or regulated data.',
      [
        'AWS Bedrock or Azure OpenAI in your account',
        'Open models on your own servers',
        'Network isolation',
        'Access controls and audit logs',
      ],
    ),
    T(
      'model-fine-tuning',
      'Fine-tuning & optimisation',
      'LLM fine-tuning and model optimisation',
      'Teach a model your tasks and tone, and make it smaller and cheaper to run.',
      'High-volume AI tasks where quality or cost matters.',
      [
        'Training data preparation',
        'Fine-tuning and evaluation',
        'Quantisation and distillation',
        'Before/after quality and cost report',
      ],
    ),
  ],
  guide: {
    question: 'Chatbot, RAG assistant or AI agents?',
    shortAnswer:
      'A chatbot answers common questions. A RAG assistant answers from your own documents, with sources. AI agents take actions across your systems. Start with the simplest one that solves your problem. We’ll tell you which.',
    goals: [
      {
        id: 'docs',
        label: 'Answers from our documents',
        pick: 'rag-knowledge-assistants',
        title: 'RAG knowledge assistant',
        why: 'Grounded answers with sources, from the documents you already have.',
      },
      {
        id: 'actions',
        label: 'AI that completes tasks',
        pick: 'multi-agent-systems',
        title: 'AI agents',
        why: 'Agents work across your tools, with human approval for anything important.',
      },
      {
        id: 'control',
        label: 'Control AI we already use',
        pick: 'llm-guardrails-monitoring',
        title: 'Guardrails & monitoring',
        why: 'Visibility, data protection and cost limits for existing AI use.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll choose for you',
        why: 'Describe the task. We recommend the simplest AI that will work reliably, or none at all.',
      },
    ],
    table: {
      columns: ['Chatbot', 'RAG assistant', 'AI agents'],
      rows: [
        {
          label: 'What it does',
          cells: ['Answers FAQs', 'Answers from your documents', 'Completes multi-step tasks'],
        },
        { label: 'Shows sources', cells: ['Rarely', 'Yes', 'Yes, in logs'] },
        { label: 'Takes actions', cells: ['No', 'No', 'Yes, within limits'] },
        {
          label: 'Best first step?',
          cells: ['Simple support', 'Knowledge-heavy work', 'After a pilot'],
        },
      ],
    },
    review: 'approved',
  },
  includes: [
    { title: 'Use-case check first', text: 'We confirm AI is the right tool before building.' },
    { title: 'Accuracy testing', text: 'Measured on your real questions and tasks.' },
    { title: 'Human in the loop', text: 'People approve what matters.' },
    { title: 'Data protection', text: 'Sensitive data masked or kept in your cloud.' },
    { title: 'Cost limits', text: 'Caching, smaller models and spending caps.' },
    { title: 'Monitoring', text: 'Quality, usage and cost tracked after launch.' },
  ],
  faqs: [
    {
      question: 'Is our data used to train AI models?',
      answer:
        'We use provider settings and private deployments that keep your data out of model training, and can run models inside your own cloud.',
    },
    {
      question: 'Will the AI make mistakes?',
      answer:
        'Any AI can. We ground answers in your data, test against real examples, show sources and add human approval where errors would matter.',
    },
    {
      question: 'How do you keep AI costs under control?',
      answer:
        'Caching repeated requests, choosing the smallest model that does the job, and setting usage limits with alerts.',
    },
    {
      question: 'How much does an AI project cost?',
      answer:
        'It depends on the task, data and scale. We usually start with a small pilot and give you a fixed, written quote quickly.',
    },
  ],
  related: [
    'ai-chatbots-automation/whatsapp-chatbots',
    'data-engineering/data-pipelines',
    'cybersecurity/ai-security-testing',
    'technical-assessment/ai-readiness',
  ],
  industries: ['finance-insurance', 'healthcare'],
  cta: 'Discuss my AI project',
  whatsapp: 'Hi CodeMindset, I want to build an AI agent / AI system for my business.',
  seo: {
    title: 'AI Agent & Generative AI Development Company in India',
    description:
      'Multi-agent AI systems, RAG knowledge assistants, LLM guardrails and private AI deployment, built with human checks and cost control, across India.',
  },
  readiness: 'ready',
  review: 'approved',
};

const data: ServiceHub = {
  slug: 'data-engineering',
  segment: 'advanced',
  icon: 'database',
  title: 'Data engineering & MLOps',
  plainTitle: 'Make sense of my business data',
  blurb: 'Data pipelines, warehouses, real-time data and MLOps',
  eyebrow: 'Data engineering services in India',
  h1: 'Data engineering & MLOps',
  h1Accent: 'services',
  answer:
    'We bring your data into one trusted place with pipelines, warehouses, dashboards and machine-learning operations, so every decision uses the right numbers.',
  simple: {
    title: 'What does data engineering fix?',
    steps: [
      { title: 'One source of truth', text: 'Every team sees the same, correct numbers.' },
      {
        title: 'Always up to date',
        text: 'Data refreshes automatically, hourly or in real time.',
      },
      { title: 'Ready for AI', text: 'Clean, organised data that reports and AI models can use.' },
    ],
  },
  platformsLabel: 'Which technology do we use?',
  platforms: [
    P(
      'snowflake',
      'Snowflake',
      'Snowflake data warehouse services',
      'A cloud data warehouse that stores and analyses large volumes of data.',
      'Growing analytics needs across teams.',
      ['Warehouse design', 'Data loading', 'Cost and performance tuning', 'Access control'],
    ),
    P(
      'databricks',
      'Databricks',
      'Databricks lakehouse services',
      'One platform for data storage, analytics and machine learning.',
      'Data and ML teams working on the same data.',
      ['Lakehouse setup', 'Spark data pipelines', 'ML workflows', 'Governance'],
    ),
    P(
      'apache-kafka',
      'Apache Kafka',
      'Apache Kafka streaming development',
      'Moves events (orders, clicks, sensor readings) between systems the moment they happen.',
      'Real-time stock, tracking and alerts.',
      ['Topic and schema design', 'Producers and consumers', 'Stream processing', 'Monitoring'],
    ),
    P(
      'apache-airflow',
      'Apache Airflow',
      'Apache Airflow pipeline development',
      'Schedules and monitors data jobs so they run in the right order, every time.',
      'Nightly or hourly data processing.',
      ['Pipeline (DAG) design', 'Retries and alerts', 'Dependencies between jobs', 'Run history'],
    ),
    P(
      'dbt',
      'dbt',
      'dbt data transformation',
      'Turns raw data into clean, tested tables your reports can rely on.',
      'Teams that need trustworthy reporting tables.',
      ['Data models', 'Automated tests', 'Documentation', 'Version control'],
    ),
    P(
      'google-bigquery',
      'BigQuery',
      'Google BigQuery services',
      'Google’s data warehouse for fast analysis of large datasets.',
      'Businesses using Google Cloud, Google Analytics and Google Ads data.',
      ['GA4 and Ads data exports', 'Warehouse design', 'Scheduled queries', 'Cost controls'],
    ),
  ],
  types: [
    T(
      'data-pipelines',
      'Data pipelines (ETL)',
      'ETL and data pipeline development',
      'Automatic jobs that collect data from your systems, clean it and load it where it’s needed.',
      'Businesses with data spread across many tools.',
      [
        'Connectors to your apps and databases',
        'Cleaning and validation',
        'Scheduling and alerts',
        'Documentation',
      ],
    ),
    T(
      'real-time-streaming',
      'Real-time data streaming',
      'Real-time data streaming solutions',
      'Data that updates the moment something happens, not the next morning.',
      'Live stock, delivery tracking, fraud alerts and dashboards.',
      ['Event streaming (Kafka)', 'Stream processing', 'Live dashboards', 'Alerting'],
      undefined,
      [
        {
          sector: 'Retail',
          story:
            'Sales from shop counters and live online browsing are combined in one place, so restocking decisions use what is selling right now.',
        },
      ],
    ),
    T(
      'data-warehouse',
      'Data warehouse & lakehouse',
      'Data warehouse and lakehouse development',
      'One central, organised store for all your business data.',
      'Reporting across sales, finance, operations and marketing.',
      [
        'Platform choice (Snowflake, BigQuery, Databricks)',
        'Data model design',
        'Migration of history',
        'Access and cost control',
      ],
    ),
    T(
      'cloud-data-migration',
      'Cloud data migration',
      'Cloud data migration services',
      'Move databases and data stores to the cloud safely, checked record by record.',
      'Old on-premise databases and servers.',
      ['Migration plan', 'Validation checks', 'Minimal downtime switch', 'Rollback plan'],
    ),
    T(
      'mlops',
      'MLOps & model deployment',
      'MLOps and ML model deployment',
      'Put machine-learning models into real use, and keep them accurate as data changes.',
      'Forecasting, recommendations, routing and risk models.',
      [
        'Automated retraining pipelines',
        'Model registry and versioning',
        'Monitoring for drift',
        'Edge and cloud deployment',
      ],
      undefined,
      [
        {
          sector: 'Logistics',
          story:
            'A delivery-route model is retrained every hour with fresh traffic, weather and driver feedback, and switched over only when it beats the current model.',
        },
      ],
    ),
  ],
  guide: {
    question: 'Do I need a data warehouse, or just better dashboards?',
    shortAnswer:
      'If your data lives in one or two systems, good dashboards are enough. If it’s spread across many tools, needs history, or feeds AI, you need a warehouse with automatic pipelines. Real-time streaming is only worth it when minutes matter.',
    goals: [
      {
        id: 'reports',
        label: 'Clear reports from 1–2 systems',
        pick: 'custom-software/dashboards',
        title: 'Dashboards',
        why: 'Connect your existing tools to a clear dashboard. It’s the quickest and cheapest option.',
      },
      {
        id: 'many',
        label: 'Data spread across many tools',
        pick: 'data-warehouse',
        title: 'Data warehouse + pipelines',
        why: 'One trusted store, refreshed automatically, that every report and AI model can use.',
      },
      {
        id: 'live',
        label: 'Decisions in minutes, not days',
        pick: 'real-time-streaming',
        title: 'Real-time streaming',
        why: 'Events flow as they happen, for live stock, tracking or alerts.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll choose for you',
        why: 'Tell us which systems you use and what you want to see. We recommend the simplest setup.',
      },
    ],
    table: {
      columns: ['Dashboards', 'Warehouse + pipelines', 'Real-time streaming'],
      rows: [
        { label: 'Data sources', cells: ['1–2', 'Many', 'Many, live'] },
        { label: 'Freshness', cells: ['As the source', 'Hourly / daily', 'Seconds'] },
        { label: 'Ready for AI', cells: ['Limited', 'Yes', 'Yes'] },
        { label: 'Effort', cells: ['Low', 'Medium', 'Higher'] },
      ],
    },
    review: 'approved',
  },
  includes: [
    { title: 'Data audit', text: 'What you have, where, and how good it is.' },
    { title: 'Automated pipelines', text: 'No manual exports or copy-paste.' },
    { title: 'Quality checks', text: 'Tests that catch wrong or missing data.' },
    { title: 'Documentation', text: 'Every table explained in plain words.' },
    { title: 'Cost control', text: 'Right-sized storage and compute.' },
    { title: 'Monitoring', text: 'Alerts when a job fails or data looks wrong.' },
  ],
  faqs: [
    {
      question: 'We only use Excel and Tally. Is this for us?',
      answer:
        'Possibly not yet. Start with a dashboard or simple automation; a warehouse makes sense once data comes from several systems.',
    },
    {
      question: 'Can you work with our existing database?',
      answer: 'Yes. We connect to what you have and move only what needs to move.',
    },
    {
      question: 'Is our data safe during migration?',
      answer:
        'Data is encrypted in transit, checked record by record, and the old system stays available until the new one is verified.',
    },
    {
      question: 'How much does data engineering cost?',
      answer:
        'It depends on the number of sources and data volume. Tell us your systems and we send a fixed, written quote quickly.',
    },
  ],
  related: [
    'custom-software/dashboards',
    'ai-engineering/rag-knowledge-assistants',
    'seo-services/cloud-devops',
    'crm-whatsapp-integration/api-development',
  ],
  industries: ['retail-ecommerce', 'logistics'],
  cta: 'Discuss my data project',
  whatsapp: 'Hi CodeMindset, I need help bringing our business data together.',
  seo: {
    title: 'Data Engineering Services in India — Pipelines, Warehouses, MLOps',
    description:
      'ETL pipelines, data warehouses and lakehouses, real-time streaming and MLOps on Snowflake, BigQuery, Databricks and Kafka, for businesses across India.',
  },
  readiness: 'ready',
  review: 'approved',
};

const security: ServiceHub = {
  slug: 'cybersecurity',
  segment: 'advanced',
  icon: 'shield',
  title: 'Cybersecurity & AI security',
  plainTitle: 'Keep my systems and data safe',
  blurb: 'Security testing, AI defence, API and cloud security',
  eyebrow: 'Cybersecurity services in India',
  h1: 'Cybersecurity & AI security',
  h1Accent: 'services',
  answer:
    'We find and fix weak spots before attackers do. That covers security audits (VAPT), AI and API security, data privacy and zero-trust access.',
  simple: {
    title: 'What does good security give you?',
    steps: [
      {
        title: 'Know your risks',
        text: 'A clear list of weak spots, ranked by how much they matter.',
      },
      { title: 'Fix them properly', text: 'Practical fixes, not just a report.' },
      { title: 'Stay protected', text: 'Monitoring and checks so new gaps are caught early.' },
    ],
  },
  platformsLabel: 'Where do we secure?',
  platforms: [
    P(
      'aws-security',
      'AWS security',
      'AWS cloud security services',
      'Lock down your Amazon Web Services account, network and data.',
      'Businesses running on AWS.',
      [
        'IAM least-privilege review',
        'Private networking (VPC)',
        'Logging and alerts',
        'Encryption settings',
      ],
    ),
    P(
      'azure-security',
      'Azure security',
      'Microsoft Azure security services',
      'Secure your Azure cloud, identities and Microsoft 365 data.',
      'Microsoft-based organisations.',
      [
        'Identity and access review',
        'Network segmentation',
        'Defender alerts setup',
        'Data protection',
      ],
    ),
    P(
      'cloudflare-zero-trust',
      'Cloudflare Zero Trust',
      'Cloudflare Zero Trust setup',
      'Staff reach internal tools securely without a traditional VPN.',
      'Remote and hybrid teams.',
      ['Identity-based access', 'Device checks', 'Private app tunnels', 'Access logs'],
    ),
  ],
  types: [
    T(
      'security-audit',
      'Website & app security testing',
      'Website and app security testing (VAPT)',
      'We test your website or app the way a hacker would, then show you exactly what to fix.',
      'Before launch, after big changes, or when customers ask for proof.',
      [
        'OWASP Top 10 checks',
        'Login and access testing',
        'API testing',
        'Prioritised fix report and re-test',
      ],
    ),
    T(
      'ai-security-testing',
      'AI & chatbot security',
      'AI and LLM security testing',
      'Test your chatbot or AI agent against prompt injection, data leaks and misuse, and harden it.',
      'Any business with a public chatbot or AI assistant.',
      [
        'Prompt injection and jailbreak testing',
        'Data leakage checks',
        'Input/output filtering',
        'Guardrails and monitoring',
      ],
      [
        {
          question: 'What is prompt injection?',
          answer:
            'A trick where someone types instructions that make an AI ignore its rules, for example to reveal data or offer unauthorised discounts. Testing and guardrails reduce this risk.',
        },
      ],
      [
        {
          sector: 'Insurance',
          story:
            'A public claims chatbot is tested against attempts to extract other customers’ data or force unauthorised offers, then protected with input checks and response filters.',
        },
      ],
    ),
    T(
      'data-privacy',
      'Data privacy & PII protection',
      'Data privacy and PII protection',
      'Find, mask and protect personal data across your systems and AI tools.',
      'Businesses handling customer, patient or employee data.',
      [
        'Personal data mapping',
        'Masking and redaction (including in AI prompts)',
        'Access controls',
        'Support for DPDP Act readiness',
      ],
    ),
    T(
      'api-security',
      'API security',
      'API security services',
      'Make sure only the right apps and people can use your APIs.',
      'Apps, integrations and partner connections.',
      [
        'Authentication and tokens',
        'Rate limiting',
        'Machine-to-machine access',
        'Abuse monitoring',
      ],
    ),
    T(
      'zero-trust',
      'Zero-trust & cloud security',
      'Zero-trust and cloud security',
      'Every user, device and service must prove who it is, every time.',
      'Growing teams and multi-cloud setups.',
      [
        'Identity-based access',
        'Network segmentation (VPC)',
        'Secrets management',
        'Continuous exposure checks',
      ],
    ),
  ],
  guide: {
    question: 'Where should I start with security?',
    shortAnswer:
      'Start with what faces the internet: your website, app, APIs and any chatbot. Test them, fix the most serious issues, then tighten access to your cloud and protect personal data.',
    goals: [
      {
        id: 'site',
        label: 'Is my website or app safe?',
        pick: 'security-audit',
        title: 'Security testing',
        why: 'An attacker’s-eye test with a ranked list of fixes and a re-test.',
      },
      {
        id: 'ai',
        label: 'We have a chatbot or AI tool',
        pick: 'ai-security-testing',
        title: 'AI security testing',
        why: 'Protects against prompt injection and data leaks.',
      },
      {
        id: 'data',
        label: 'Protect customer data',
        pick: 'data-privacy',
        title: 'Data privacy',
        why: 'Find and protect personal data across your systems.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll check for you',
        why: 'Tell us what you run. We’ll suggest where the biggest risk is.',
      },
    ],
    review: 'approved',
  },
  includes: [
    { title: 'Clear scope', text: 'What we test, agreed in writing first.' },
    { title: 'Safe testing', text: 'No disruption to your live business.' },
    { title: 'Plain-words report', text: 'Risks ranked by real impact.' },
    { title: 'Fixes', text: 'We implement or guide each fix.' },
    { title: 'Re-test', text: 'Proof that the issues are closed.' },
    { title: 'Confidentiality', text: 'Findings shared only with you.' },
  ],
  faqs: [
    {
      question: 'Do you provide ISO 27001 or SOC 2 certificates?',
      answer:
        'We help you prepare and close the technical gaps. Certificates themselves are issued by accredited auditors.',
    },
    {
      question: 'Will testing break our website?',
      answer:
        'No. Tests are agreed in advance, run carefully, and risky checks happen on a staging copy.',
    },
    {
      question: 'Does this make us DPDP Act compliant?',
      answer:
        'We put the technical protections in place. Your legal advisor should confirm overall compliance with India’s Digital Personal Data Protection Act.',
    },
    {
      question: 'How much does a security test cost?',
      answer:
        'It depends on the size of the website, app or API. Share the scope and we send a fixed, written quote quickly.',
    },
  ],
  related: [
    'ai-engineering/llm-guardrails-monitoring',
    'seo-services/cloudflare',
    'crm-whatsapp-integration/api-development',
    'seo-services/website-maintenance',
  ],
  industries: ['finance-insurance', 'healthcare'],
  cta: 'Check my security',
  whatsapp: 'Hi CodeMindset, I want a security check for our website / app / systems.',
  seo: {
    title: 'Cybersecurity Services in India — VAPT, AI & Cloud Security',
    description:
      'Website and app security testing, AI and chatbot security, API security, data privacy and zero-trust cloud security, with clear, prioritised fixes.',
  },
  readiness: 'ready',
  review: 'approved',
};

const blockchain: ServiceHub = {
  slug: 'blockchain',
  segment: 'advanced',
  icon: 'blocks',
  title: 'Blockchain development',
  plainTitle: 'Build on blockchain',
  blurb: 'Smart contracts, audits and asset tokenization',
  eyebrow: 'Blockchain development company in India',
  h1: 'Blockchain development',
  h1Accent: 'where it helps',
  answer:
    'We build and audit smart contracts, asset tokenisation and cross-chain apps. We will also tell you honestly when a normal database is the better choice.',
  simple: {
    title: 'What can blockchain actually do?',
    steps: [
      {
        title: 'One shared record',
        text: 'Partners see the same data, which no single party can quietly change.',
      },
      {
        title: 'Automatic agreements',
        text: 'Smart contracts carry out terms by themselves when conditions are met.',
      },
      {
        title: 'New ways to own',
        text: 'Assets can be split into tokens and transferred digitally.',
      },
    ],
  },
  platformsLabel: 'Which technology do we use?',
  platforms: [
    P(
      'ethereum',
      'Ethereum',
      'Ethereum smart contract development',
      'The most widely used blockchain for smart contracts and tokens.',
      'Tokens and contracts that need broad compatibility.',
      [
        'Solidity contracts',
        'Token standards',
        'Testing and audits',
        'Deployment and verification',
      ],
    ),
    P(
      'polygon',
      'Polygon',
      'Polygon blockchain development',
      'Ethereum-compatible with much lower transaction fees.',
      'High-volume apps where fees matter.',
      ['Contract deployment', 'Wallet integration', 'Gas optimisation', 'Bridging'],
    ),
    P(
      'chainlink',
      'Chainlink',
      'Chainlink integration (oracles and CCIP)',
      'Brings real-world data to smart contracts and moves messages between blockchains.',
      'Contracts that depend on prices, events or other chains.',
      ['Price and data feeds', 'Cross-chain messaging (CCIP)', 'Automation', 'Security review'],
    ),
  ],
  types: [
    T(
      'smart-contracts',
      'Smart contract development',
      'Smart contract development',
      'Agreements written as code that run by themselves on a blockchain.',
      'Escrow, payments, rewards, supply-chain and token logic.',
      [
        'Requirements to contract design',
        'Solidity development',
        'Automated tests',
        'Deployment and monitoring',
      ],
    ),
    T(
      'smart-contract-audit',
      'Smart contract audit',
      'Smart contract audit',
      'An independent check of contract code for bugs and attack risks before money is at stake.',
      'Any contract before launch or after changes.',
      [
        'Manual code review',
        'Automated analysis',
        'Attack and economic scenario tests',
        'Fix verification',
      ],
    ),
    T(
      'asset-tokenization',
      'Asset tokenization (RWA)',
      'Real-world asset tokenization',
      'Turn ownership of a real asset (property, bonds, invoices) into digital tokens.',
      'Fractional ownership and digital transfer of assets.',
      [
        'Token design with transfer rules',
        'Investor whitelisting (e.g. ERC-3643)',
        'Issuance and registry',
        'Integration with your platform',
      ],
      [
        {
          question: 'Is asset tokenization legal in India?',
          answer:
            'It depends on the asset and who can invest; regulators such as SEBI and RBI may apply. We build the technology. Your legal advisors must confirm the structure.',
        },
      ],
      [
        {
          sector: 'Real estate',
          story:
            'A commercial building is represented as compliant tokens with built-in transfer rules, so approved investors can own and trade fractions digitally.',
        },
      ],
    ),
    T(
      'cross-chain',
      'Cross-chain integration',
      'Cross-chain integration',
      'Let tokens and messages move safely between different blockchains.',
      'Products that run on more than one chain.',
      [
        'Bridge and messaging choice',
        'Chainlink CCIP integration',
        'Security limits',
        'Monitoring',
      ],
    ),
  ],
  guide: {
    question: 'Do you actually need a blockchain?',
    shortAnswer:
      'Use blockchain only when several parties who don’t fully trust each other must share one record, or when assets need to move as tokens. If one company controls the data, a normal database is cheaper, faster and easier.',
    goals: [
      {
        id: 'shared',
        label: 'Shared record between companies',
        pick: 'smart-contracts',
        title: 'Smart contracts',
        why: 'A shared, tamper-evident record with rules that run automatically.',
      },
      {
        id: 'asset',
        label: 'Tokenise an asset',
        pick: 'asset-tokenization',
        title: 'Asset tokenization',
        why: 'Digital ownership with transfer rules built in.',
      },
      {
        id: 'audit',
        label: 'Check an existing contract',
        pick: 'smart-contract-audit',
        title: 'Smart contract audit',
        why: 'Find bugs and attack risks before money is at stake.',
      },
      {
        id: 'unsure',
        label: 'I’m not sure',
        pick: null,
        title: 'Not sure? We’ll advise honestly',
        why: 'If a regular database is better for you, we’ll say so.',
      },
    ],
    table: {
      columns: ['Normal database', 'Blockchain'],
      rows: [
        { label: 'Who controls it', cells: ['One company', 'Shared between parties'] },
        { label: 'Speed and cost', cells: ['Fast, low cost', 'Slower, fees per transaction'] },
        { label: 'Tamper-evident', cells: ['If built in', 'By design'] },
        { label: 'Best for', cells: ['Most business apps', 'Multi-party records, tokens'] },
      ],
    },
    review: 'approved',
  },
  includes: [
    { title: 'Honest fit check', text: 'Blockchain only if it truly helps.' },
    { title: 'Secure code', text: 'Tested, reviewed contracts.' },
    { title: 'Audit-ready', text: 'Documentation for external auditors.' },
    { title: 'Wallet & app integration', text: 'Works with your website or app.' },
    { title: 'Gas optimisation', text: 'Lower transaction costs.' },
    { title: 'Monitoring', text: 'Alerts on unusual activity.' },
  ],
  faqs: [
    {
      question: 'Do you build cryptocurrencies or trading platforms?',
      answer:
        'We focus on business uses: smart contracts, audits, tokenized assets and integrations, within applicable regulations.',
    },
    {
      question: 'Which blockchain should we use?',
      answer:
        'It depends on fees, speed and who must use it. We compare options in plain words before you decide.',
    },
    {
      question: 'How much does blockchain development cost?',
      answer:
        'It depends on contract complexity and audits needed. Share the idea and we send a fixed, written quote quickly.',
    },
  ],
  related: [
    'cybersecurity/security-audit',
    'custom-software/saas-development',
    'crm-whatsapp-integration/api-development',
    'technical-assessment/tech-stack-review',
  ],
  industries: ['finance-insurance', 'real-estate'],
  cta: 'Discuss my blockchain idea',
  whatsapp: 'Hi CodeMindset, I have a blockchain / smart contract project.',
  seo: {
    title: 'Blockchain Development in India — Smart Contracts & Tokenization',
    description:
      'Smart contract development and audits, real-world asset tokenization and cross-chain integration on Ethereum, Polygon and Chainlink, with honest advice first.',
  },
  readiness: 'ready',
  review: 'approved',
};

export const advancedHubs: ServiceHub[] = [aiEngineering, data, security, blockchain];
