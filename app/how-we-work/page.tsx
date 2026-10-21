import { CTABand, FAQSection, SectionHead } from '@/components/ui/Blocks';
import { CheckIcon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { reasons } from '@/content/home';
import { corePages } from '@/content/pages';
import type { FAQ } from '@/content/types';
import { buildMetadata } from '@/lib/seo';

const page = corePages.process;
export const metadata = buildMetadata(page);

/** What actually happens at each step, so nothing about working with us is a surprise. */
const detail = [
  {
    title: 'Tell us what you need',
    points: [
      'A short call or a WhatsApp chat, whichever suits you.',
      'We ask about your business, your customers and what is not working today.',
      'No technical brief needed. Screenshots or examples you like are helpful.',
    ],
  },
  {
    title: 'Get a fixed quote',
    points: [
      'A written quote with the scope, what is not included and the delivery date.',
      'If something is unclear, we say so and suggest a smaller first step.',
      'You decide with no pressure. The quote is free and there is no obligation.',
    ],
  },
  {
    title: 'See it as we build',
    points: [
      'You get working previews to check on your phone and computer.',
      'Regular updates in plain words: what is done, what is next, what we need from you.',
      'Changes are agreed in writing before they are made, so the price never surprises you.',
    ],
  },
  {
    title: 'Launch and handover',
    points: [
      'We test on real phones, set up Google basics and analytics, then go live.',
      'The domain, code, hosting and every login are handed over in your name.',
      'A short walkthrough so your team can make everyday changes.',
    ],
  },
  {
    title: 'Support after launch',
    points: [
      'Help with fixes, updates and new features whenever you need it.',
      'Optional monthly care: updates, backups, security checks and a short report.',
      'Support terms are agreed upfront, never added later.',
    ],
  },
];

const faqs: FAQ[] = [
  {
    question: 'How does payment work?',
    answer:
      'The payment schedule is written into your quote before any work starts, so you know exactly what is due and when.',
  },
  {
    question: 'What do you need from me?',
    answer:
      'Your logo, photos and basic business details, and someone who can answer questions and review previews. If you do not have content, we can write it.',
  },
  {
    question: 'What if I want changes after we start?',
    answer:
      'Tell us. Anything outside the agreed scope is quoted separately and made only after you agree.',
  },
  {
    question: 'Can I see the work before it goes live?',
    answer:
      'Yes. You review working previews throughout, and nothing goes live until you approve it.',
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'How we work', path: page.path }]}
        eyebrow="How we work"
        title="Clear steps,"
        accent="no surprises."
        lead="Five clear steps from first call to launch. Fixed quote, previews as we build, full handover."
      />
      <section className="section" aria-labelledby="steps-title">
        <div className="container">
          <SectionHead eyebrow="Step by step" title="From first call to launch" id="steps-title" />
          <ol className="flow flow--5" style={{ marginTop: 28 }}>
            {detail.map((d) => (
              <li key={d.title}>
                <strong>{d.title}</strong>
                <ul className="points">
                  {d.points.map((p) => (
                    <li key={p}>
                      <CheckIcon />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section section--alt" aria-labelledby="promise-title">
        <div className="container">
          <SectionHead eyebrow="Our promises" title="What you can count on" id="promise-title" />
          <ul className="reasons" style={{ marginTop: 24 }}>
            {reasons.map((r) => (
              <li key={r.title}>
                <CheckIcon />
                <strong>{r.title}</strong>
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FAQSection title="Questions about working with us" items={faqs} where="process" />
      <CTABand where="process" title="Ready to start? Tell us what you need." />
    </>
  );
}
