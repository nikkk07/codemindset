import Link from 'next/link';
import type { ServiceHub } from '@/content/types';
import { quoteHref } from '@/lib/contact';
import { guideHref, resolveRef } from '@/lib/visibility';
import { Chooser, type ChooserGoal } from './Chooser';

export const chooserGoals = (hub: ServiceHub): ChooserGoal[] =>
  hub.guide.goals.map((g) => ({
    id: g.id,
    label: g.label,
    title: g.title,
    why: g.why,
    href: g.pick ? (resolveRef(g.pick, undefined, hub.slug)?.href ?? null) : null,
  }));

/** The "how to choose" block: short answer first, interactive chooser, side-by-side table. */
export function GuideBlock({
  hub,
  headingLevel = 2,
  showGuideLink,
  intro = true,
}: {
  hub: ServiceHub;
  headingLevel?: 2 | 3;
  showGuideLink?: boolean;
  /** false on the guide page itself, where the hero already states the question and short answer. */
  intro?: boolean;
}) {
  const { guide } = hub;
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <section className="section section--dark" id="choose" aria-labelledby={`choose-${hub.slug}`}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{intro ? 'Quick guide' : 'Interactive guide'}</p>
          <H id={`choose-${hub.slug}`}>{intro ? guide.question : 'Answer one question'}</H>
          {intro ? (
            <p className="answer-box">
              <strong>Short answer:</strong> {guide.shortAnswer}
            </p>
          ) : null}
        </div>
        <div className="choose">
          <Chooser
            goals={chooserGoals(hub)}
            quoteHref={quoteHref(hub.slug)}
            whatsapp={hub.whatsapp}
            where={hub.slug}
          />
          {guide.table ? (
            <div className="table-wrap">
              <table className="compare">
                <caption>Side by side</caption>
                <thead>
                  <tr>
                    <td />
                    {guide.table.columns.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.table.rows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      {r.cells.map((c, i) => (
                        <td key={i}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
        {showGuideLink ? (
          <p style={{ marginTop: 24 }}>
            <Link href={guideHref(hub.slug)} className="link-arrow">
              Read the full guide
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
