import type { Claim } from './types';

/**
 * Claims register (content-framework.md §2). Every consequential public statement is listed
 * here with its evidence and approval status. The launch gate fails while any claim is pending.
 */
export const claims: Claim[] = [
  {
    id: 'svc-capability',
    claim: 'CodeMindset delivers the services, platforms and technologies listed on the site.',
    where: 'Services, mega-menu, home, contact options',
    type: 'capability',
    evidence:
      'Owner statement 2026-10-16: the team covers all listed technologies. Confirm per row in docs/capability-matrix.md.',
    status: 'pending',
  },
  {
    id: 'team-roles',
    claim:
      'The team includes designers, web and app developers, AI engineers, integration, cloud/DevOps and SEO specialists, QA testers and project managers.',
    where: 'Home (Our team), About',
    type: 'capability',
    evidence: 'Owner statement 2026-10-16',
    status: 'pending',
  },
  {
    id: 'pan-india',
    claim: 'CodeMindset is an Indian company delivering in every state and union territory.',
    where: 'Home, About, India pages, structured data (areaServed)',
    type: 'capability',
    evidence: 'Owner statement 2026-10-16',
    status: 'approved',
  },
  {
    id: 'fast-turnaround',
    claim:
      'Quick replies, quick written quotes and fast delivery (no specific times are published).',
    where: 'Home, service pages, FAQs, CTAs',
    type: 'practice',
    evidence: 'Owner statement 2026-10-16',
    status: 'pending',
  },
  {
    id: 'written-quote',
    claim: 'A fixed, written quote is provided before work starts.',
    where: 'Home, service pages, FAQs',
    type: 'practice',
    evidence: 'Owner confirmation of standard engagement process',
    status: 'pending',
  },
  {
    id: 'client-ownership',
    claim:
      'Code, accounts, domain and documentation belong to the client and are handed over at launch.',
    where: 'Home, service pages, FAQs',
    type: 'legal',
    evidence: 'Standard contract terms (not yet supplied)',
    status: 'pending',
  },
  {
    id: 'access-care',
    claim: 'Only the access a task needs is requested; the client can remove it any time.',
    where: 'Home (honest version)',
    type: 'practice',
    evidence: 'Owner confirmation of security practice',
    status: 'pending',
  },
  {
    id: 'human-approval-ai',
    claim: 'AI systems answer from approved information and hand over to a person where needed.',
    where: 'AI chatbots & automation',
    type: 'practice',
    evidence: 'Owner confirmation',
    status: 'pending',
  },
  {
    id: 'whatsapp',
    claim: '+91 80777 27669 is reachable on WhatsApp.',
    where: 'All WhatsApp buttons',
    type: 'capability',
    evidence: 'Owner confirmation 2026-10-16',
    status: 'approved',
  },
  {
    id: 'ssx-ownership',
    claim: 'CodeMindset owns Social ScaleX; Social ScaleX handles marketing and advertising.',
    where: 'Home FAQ, footer, About, structured data',
    type: 'legal',
    evidence: 'Owner confirmation 2026-10-15',
    status: 'approved',
  },
  {
    id: 'cwv-thresholds',
    claim: 'Core Web Vitals measure loading, responsiveness and visual stability.',
    where: 'Glossary',
    type: 'third-party',
    evidence: 'https://web.dev/articles/vitals',
    status: 'approved',
  },
];
