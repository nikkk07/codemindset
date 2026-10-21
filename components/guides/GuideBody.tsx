import { SkipHook } from '@/components/ui/SkipHook';
import { CheckIcon } from '@/components/ui/Icons';
import type { GuideBlock, LongGuide } from '@/content/guides';
import { ProcessMap } from './ProcessMap';

function Block({ b, g, i }: { b: GuideBlock; g: LongGuide; i: number }) {
  switch (b.type) {
    case 'p':
      return <p>{b.text}</p>;
    case 'list':
      return b.ordered ? (
        <ol className="g-list g-list--num">
          {b.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
      ) : (
        <ul className="g-list">
          {b.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      );
    case 'steps':
      return <ProcessMap items={b.items} />;
    case 'table':
      return (
        <div className="table-wrap g-table">
          <table className="compare">
            <caption>{b.caption}</caption>
            <thead>
              <tr>
                {b.columns.map((c, n) => (
                  <th key={`${c}-${n}`} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r.join('|')}>
                  {r.map((c, n) =>
                    n === 0 ? (
                      <th key={n} scope="row">
                        {c}
                      </th>
                    ) : (
                      <td key={n}>{c}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <div className={`g-callout g-callout--${b.tone}`}>
          <strong>{b.title}</strong>
          <p>{b.text}</p>
        </div>
      );
    case 'checklist':
      return (
        <div className="g-check">
          <strong>{b.title}</strong>
          <ul>
            {b.items.map((x) => (
              <li key={x}>
                <CheckIcon />
                {x}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'hook':
      return (
        <SkipHook
          title={b.title}
          text={b.text}
          cta={b.cta}
          service={g.service}
          whatsapp={g.whatsapp}
          where={`guide-${g.slug}-${i}`}
        />
      );
  }
}

/** Renders a guide's sections, each headed by the question it answers. */
export function GuideBody({ g }: { g: LongGuide }) {
  return (
    <>
      {g.sections.map((s, si) => (
        <section key={s.id} id={s.id} className="g-section" aria-labelledby={`h-${s.id}`}>
          <h2 id={`h-${s.id}`}>{s.heading}</h2>
          {s.blocks.map((b, bi) => (
            <Block key={`${s.id}-${bi}`} b={b} g={g} i={si * 100 + bi} />
          ))}
        </section>
      ))}
    </>
  );
}
