import Link from 'next/link';
import type { FAQ, PlainStep } from '@/content/types';
import { callHref, quoteHref, whatsappHref } from '@/lib/contact';
import { ContactLink } from './ContactLink';
import { ArrowIcon, ChatIcon, CheckIcon, PhoneIcon } from './Icons';

/**
 * Column sizing that avoids a lonely last row: 5 items → 5 columns, 3 or 6 → 3 columns, 2 → 2 columns.
 * Pass the result as `style` on an element with the `grid` (or `includes`) class.
 */
export function gridStyle(count: number, base = 260): React.CSSProperties {
  const min =
    count === 5 ? 200 : count === 3 || count === 6 || count === 9 ? 340 : count === 2 ? 420 : base;
  return {
    '--min': `${min}px`,
    gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`,
  } as React.CSSProperties;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
  action?: React.ReactNode;
}) {
  const body = (
    <>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </>
  );
  if (!action) return <div className="section-head">{body}</div>;
  return (
    <div className="section-head section-head--row">
      <div>{body}</div>
      {action}
    </div>
  );
}

export function FAQList({ items, openFirst = true }: { items: FAQ[]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.question} open={openFirst && i === 0}>
          <summary>{f.question}</summary>
          <p>{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FAQSection({
  title,
  items,
  where,
  whatsapp,
}: {
  title: string;
  items: FAQ[];
  where: string;
  whatsapp?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="section" aria-labelledby={`faq-${where}`}>
      <div className="container faq-layout">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 id={`faq-${where}`}>{title}</h2>
          <p className="lead">
            Can’t find yours?{' '}
            <ContactLink kind="whatsapp" where={`faq-${where}`} href={whatsappHref(whatsapp)}>
              Ask us on WhatsApp
            </ContactLink>{' '}
            or{' '}
            <ContactLink kind="call" where={`faq-${where}`} href={callHref}>
              call us
            </ContactLink>
            .
          </p>
        </div>
        <FAQList items={items} />
      </div>
    </section>
  );
}

export function Steps({
  items,
  highlight,
  min,
}: {
  items: PlainStep[];
  highlight?: number;
  min?: number;
}) {
  return (
    <ol
      className="steps"
      style={min ? ({ '--min': `${min}px` } as React.CSSProperties) : undefined}
    >
      {items.map((s, i) => (
        <li key={s.title} className={`step${i === highlight ? ' step--highlight' : ''}`}>
          <span className="step__n" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <strong>{s.title}</strong>
          <span>{s.text}</span>
        </li>
      ))}
    </ol>
  );
}

export function Includes({ items }: { items: PlainStep[] }) {
  return (
    <ul className="includes" style={gridStyle(items.length)}>
      {items.map((x) => (
        <li key={x.title}>
          <span className="includes__tick" aria-hidden="true">
            <CheckIcon />
          </span>
          <span>
            <strong>{x.title}</strong>
            <span>{x.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((t) => (
        <li key={t}>
          <CheckIcon />
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Mid-page conversion band: Get a quote · Call us · WhatsApp. */
export function ContactBand({
  title = 'See your problem here? Let’s fix it.',
  text = 'Share it in two minutes. Our team replies fast with the next step.',
  where,
  service,
  whatsapp,
}: {
  title?: string;
  text?: string;
  where: string;
  service?: string;
  whatsapp?: string;
}) {
  return (
    <div className="band">
      <div className="band__text">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <div className="btn-row">
        <Link href={quoteHref(service)} className="btn btn--primary">
          Get a quote
        </Link>
        <ContactLink kind="call" where={where} href={callHref} className="btn btn--white">
          <PhoneIcon /> Call us
        </ContactLink>
        <ContactLink
          kind="whatsapp"
          where={where}
          href={whatsappHref(whatsapp)}
          className="btn btn--ghost"
        >
          <ChatIcon /> WhatsApp
        </ContactLink>
      </div>
    </div>
  );
}

/** Closing call to action used at the end of inner pages. */
export function CTABand({
  title = 'Start your project.',
  where,
  service,
  whatsapp,
  quoteLabel = 'Get a quote',
}: {
  title?: string;
  where: string;
  service?: string;
  whatsapp?: string;
  quoteLabel?: string;
}) {
  return (
    <section className="section section--flush-top">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>{title}</h2>
            <p>Quick reply. Clear quote. Fast delivery.</p>
          </div>
          <div className="btn-row">
            <Link href={quoteHref(service)} className="btn btn--white btn--lg">
              {quoteLabel} <ArrowIcon />
            </Link>
            <ContactLink
              kind="call"
              where={where}
              href={callHref}
              className="btn btn--ghost btn--lg"
            >
              Call us
            </ContactLink>
            <ContactLink
              kind="whatsapp"
              where={where}
              href={whatsappHref(whatsapp)}
              className="btn btn--ghost btn--lg"
            >
              WhatsApp us
            </ContactLink>
          </div>
        </div>
      </div>
    </section>
  );
}
