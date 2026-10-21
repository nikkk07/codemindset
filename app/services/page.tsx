import Link from 'next/link';
import { CTABand, SectionHead } from '@/components/ui/Blocks';
import { ServiceIcon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { buildMetadata } from '@/lib/seo';
import { getVisibleHubs, getVisibleSubs, hubHref, subHref } from '@/lib/visibility';

const page = corePages.services;
export const metadata = buildMetadata(page);

export default function ServicesPage() {
  const hubs = getVisibleHubs();
  const everyday = hubs.filter((h) => h.segment === 'everyday');
  const bigger = hubs.filter((h) => h.segment === 'advanced');
  const help = hubs.find((h) => h.segment === 'start');

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Services', path: page.path }]}
        eyebrow="Services"
        title="Everything we build,"
        accent="in plain words."
        lead="Websites, apps, chatbots, CRM and SEO for growing businesses, plus custom software and AI for bigger projects."
      />

      <section className="section" aria-labelledby="everyday-title" id="everyday">
        <div className="container">
          <SectionHead
            eyebrow="Most asked for"
            title="For growing businesses"
            id="everyday-title"
          />
          <div className="svc-grid" style={{ marginTop: 24 }}>
            {everyday.map((h) => (
              <Link key={h.slug} href={hubHref(h.slug)} className="svc">
                <span className="icon-box">
                  <ServiceIcon name={h.icon} />
                </span>
                <span className="svc__title">{h.title}</span>
                <span className="svc__tech">{h.plainTitle}</span>
                <span className="svc__text">{h.blurb}.</span>
                <span className="svc__more">Explore →</span>
              </Link>
            ))}
            {help ? (
              <Link href={hubHref(help.slug)} className="svc svc--help">
                <span className="svc__title">Not sure what you need?</span>
                <span className="svc__text">
                  Tell us the problem and we will suggest the simplest fix.
                </span>
                <span className="svc__more">Free consultation →</span>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {bigger.length > 0 ? (
        <section className="section section--alt" aria-labelledby="bigger-title" id="advanced">
          <div className="container">
            <SectionHead
              eyebrow="For bigger projects"
              title="Custom software, AI and data"
              lead="When ready-made tools are not enough."
              id="bigger-title"
            />
            <div className="svc-grid" style={{ marginTop: 24 }}>
              {bigger.map((h) => (
                <Link key={h.slug} href={hubHref(h.slug)} className="svc">
                  <span className="icon-box">
                    <ServiceIcon name={h.icon} />
                  </span>
                  <span className="svc__title">{h.title}</span>
                  <span className="svc__text">{h.blurb}.</span>
                  <span className="svc__more">Explore →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Every option on one page: a crawlable index of the whole catalogue */}
      <section className="section" aria-labelledby="all-title">
        <div className="container">
          <SectionHead eyebrow="A to Z" title="Every option, by service" id="all-title" />
          <div className="svc-grid" style={{ marginTop: 24 }}>
            {[...everyday, ...bigger].map((h) => {
              const subs = getVisibleSubs(h);
              if (subs.length === 0) return null;
              return (
                <div key={h.slug} className="offer">
                  <h3>
                    <Link href={hubHref(h.slug)}>{h.title}</Link>
                  </h3>
                  <ul className="dir-list">
                    {subs.map((s) => (
                      <li key={s.slug}>
                        <Link href={subHref(h.slug, s.slug)}>{s.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure where to start? Tell us."
        where="services-index"
        quoteLabel="Tell us what you need"
      />
    </>
  );
}
