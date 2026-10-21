'use client';

import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import { ContactLink } from '@/components/ui/ContactLink';
import { whatsappHref } from '@/lib/contact';

export interface ChooserGoal {
  id: string;
  label: string;
  title: string;
  why: string;
  /** Page for the recommendation, or null when the answer is "tell us". */
  href: string | null;
}

const noop = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

/**
 * "What matters most to you?" → an instant recommendation.
 * Without JavaScript every recommendation is listed, so the content is always readable and crawlable.
 */
export function Chooser({
  goals,
  quoteHref,
  whatsapp,
  where,
}: {
  goals: ChooserGoal[];
  quoteHref: string;
  whatsapp: string;
  where: string;
}) {
  const hydrated = useHydrated();
  const [picked, setPicked] = useState(goals[0]?.id);
  const rec = goals.find((g) => g.id === picked) ?? goals[0];

  if (!hydrated || !rec) {
    return (
      <div className="chooser">
        <p className="chooser__q">What matters most to you?</p>
        <ul className="chooser__static">
          {goals.map((g) => (
            <li key={g.id}>
              <em>{g.label}</em> → <strong>{g.title}</strong>, {g.why}{' '}
              {g.href ? <Link href={g.href}>Learn more</Link> : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="chooser" data-testid="chooser">
      <p className="chooser__q" id={`${where}-goal`}>
        What matters most to you?
      </p>
      <div className="chooser__options" role="radiogroup" aria-labelledby={`${where}-goal`}>
        {goals.map((g, i) => (
          <button
            key={g.id}
            type="button"
            role="radio"
            aria-checked={g.id === rec.id}
            tabIndex={g.id === rec.id ? 0 : -1}
            className="chooser__opt"
            onClick={() => setPicked(g.id)}
            onKeyDown={(e) => {
              const step =
                e.key === 'ArrowDown' || e.key === 'ArrowRight'
                  ? 1
                  : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
                    ? -1
                    : 0;
              if (!step) return;
              e.preventDefault();
              const next = goals[(i + step + goals.length) % goals.length]!;
              setPicked(next.id);
              (
                e.currentTarget.parentElement?.children[goals.indexOf(next)] as
                  HTMLElement | undefined
              )?.focus();
            }}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="chooser__result" aria-live="polite" data-testid="chooser-result">
        <span className="eyebrow">Our recommendation</span>
        <strong>{rec.title}</strong>
        <p>{rec.why}</p>
        <div className="btn-row">
          {rec.href ? (
            <Link href={rec.href} className="btn btn--primary">
              Explore {rec.title}
            </Link>
          ) : (
            <Link href={quoteHref} className="btn btn--primary">
              Help me choose
            </Link>
          )}
          <ContactLink
            kind="whatsapp"
            where={`chooser-${where}`}
            href={whatsappHref(whatsapp)}
            className="btn btn--outline"
          >
            Ask on WhatsApp
          </ContactLink>
        </div>
      </div>
    </div>
  );
}
