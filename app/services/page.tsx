import Link from 'next/link';
import { CTABand, SectionHead } from '@/components/ui/Blocks';
import { ServiceIcon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { buildMetadata } from '@/lib/seo';
import { lcFirst } from '@/lib/text';
import {
  getVisibleHubs,
  getVisibleSubs,
  guideHref,
  hubHref,
  isGuideVisible,
  subHref,
} from '@/lib/visibility';

const page = corePages.services;
export const metadata = buildMetadata(page);

export default function ServicesPage() {
  const hubs = getVisibleHubs();
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Services', path: page.path }]}
        eyebrow="Services"
        title="Everything your business needs,"
        accent="built by one team."
        lead="Start with what you need in plain words. Each service then goes deeper — platforms, technologies and simple guides to help you choose."
      />

      <section className="section" aria-labelledby="needs-title">
        <div className="container">
          <SectionHead eyebrow="Start here" title="What do you need?" id="needs-title" />
          <div className="grid" style={{ '--min': '280px' } as React.CSSProperties}>
            {hubs.map((h) => (
              <Link key={h.slug} href={hubHref(h.slug)} className="card">
                <span className="icon-box">
                  <ServiceIcon name={h.icon} />
                </span>
                <span className="card__title">{h.plainTitle}</span>
                <span className="card__text">
                  {h.title} — {lcFirst(h.blurb)}.
                </span>
                <span className="card__more">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {hubs.map((h, i) => {
        const subs = getVisibleSubs(h);
        if (subs.length === 0) return null;
        const types = subs.filter((s) => s.kind === 'type');
        const tech = subs.filter((s) => s.kind === 'platform');
        return (
          <section
            key={h.slug}
            className={`section${i % 2 === 0 ? ' section--tint' : ''}`}
            aria-labelledby={`h-${h.slug}`}
          >
            <div className="container">
              <SectionHead
                eyebrow={h.plainTitle}
                title={h.title}
                id={`h-${h.slug}`}
                action={
                  <Link href={hubHref(h.slug)} className="link-arrow">
                    Overview
                  </Link>
                }
              />
              {types.length > 0 ? (
                <>
                  <p className="eyebrow" style={{ marginBottom: 10 }}>
                    By need
                  </p>
                  <ul className="chips" style={{ marginBottom: 20 }}>
                    {types.map((s) => (
                      <li key={s.slug}>
                        <Link href={subHref(h.slug, s.slug)} className="chip">
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {tech.length > 0 ? (
                <>
                  <p className="eyebrow" style={{ marginBottom: 10 }}>
                    By platform / technology
                  </p>
                  <ul className="chips" style={{ marginBottom: 20 }}>
                    {tech.map((s) => (
                      <li key={s.slug}>
                        <Link href={subHref(h.slug, s.slug)} className="chip">
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {isGuideVisible(h) ? (
                <Link href={guideHref(h.slug)} className="btn btn--outline btn--sm">
                  Guide: {h.guide.question}
                </Link>
              ) : null}
            </div>
          </section>
        );
      })}

      <div style={{ height: 'var(--section-y)' }} />
      <CTABand
        title="Not sure where to start? Tell us."
        where="services-index"
        quoteLabel="Tell us what you need"
      />
    </>
  );
}
