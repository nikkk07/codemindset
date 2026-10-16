import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GuideBlock } from '@/components/services/GuideBlock';
import {
  CTABand,
  ContactBand,
  FAQSection,
  Includes,
  SectionHead,
  gridStyle,
} from '@/components/ui/Blocks';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactLink } from '@/components/ui/ContactLink';
import { ArrowIcon, ChatIcon, CheckIcon } from '@/components/ui/Icons';
import { JsonLd } from '@/components/ui/JsonLd';
import { quoteHref, whatsappHref } from '@/lib/contact';
import { buildMetadata, graph, serviceJsonLd } from '@/lib/seo';
import {
  getHub,
  getIndustry,
  getVisibleHubs,
  getVisibleSubs,
  hubHref,
  isGuideVisible,
  resolveRef,
  subHref,
} from '@/lib/visibility';

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleHubs().map((h) => ({ hub: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ hub: string }> }) {
  const hub = getHub((await params).hub);
  if (!hub) return {};
  return buildMetadata({
    title: hub.seo.title,
    description: hub.seo.description,
    path: hubHref(hub.slug),
    review: hub.review,
  });
}

export default async function HubPage({ params }: { params: Promise<{ hub: string }> }) {
  const hub = getHub((await params).hub);
  if (!hub) notFound();

  const subs = getVisibleSubs(hub);
  const platforms = subs.filter((s) => s.kind === 'platform');
  const types = subs.filter((s) => s.kind === 'type');
  const guide = isGuideVisible(hub);
  const related = hub.related.map((r) => resolveRef(r)).filter((x) => x !== null);
  const industries = hub.industries.map((s) => getIndustry(s)).filter((x) => x !== undefined);
  const heroTiles = platforms.length > 0 ? platforms.slice(0, 4) : types.slice(0, 4);
  const path = hubHref(hub.slug);

  return (
    <>
      <section className="hero hero--tint" aria-labelledby="hub-title">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Services', path: '/services/' },
              { name: hub.title, path },
            ]}
          />
          <div className="hero__grid">
            <div className="hero__copy">
              <span className="pill pill--white">{hub.eyebrow}</span>
              <h1 id="hub-title">
                {hub.h1} <span>{hub.h1Accent}</span>
              </h1>
              <p className="lead">{hub.answer}</p>
              <div className="btn-row btn-row--grow">
                <Link href={quoteHref(hub.slug)} className="btn btn--primary btn--lg">
                  {hub.cta} <ArrowIcon />
                </Link>
                <ContactLink
                  kind="whatsapp"
                  where={`hub-${hub.slug}`}
                  href={whatsappHref(hub.whatsapp)}
                  className="btn btn--outline btn--lg"
                >
                  <ChatIcon /> WhatsApp us
                </ContactLink>
              </div>
              <ul className="check-list">
                {[
                  'No tech knowledge needed',
                  'Fast turnaround',
                  'Fixed written quote',
                  'You own it',
                ].map((t) => (
                  <li key={t}>
                    <CheckIcon />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <div className="panel__head">
                <h2>How would you like to start?</h2>
              </div>
              <Link href={guide ? '#choose' : quoteHref(hub.slug)} className="tile tile--amber">
                <span className="tile__text">
                  <strong>Just tell us what you need</strong>
                  <span>We choose the right technology for you</span>
                </span>
                <ArrowIcon />
              </Link>
              {heroTiles.length > 0 ? (
                <>
                  <span className="panel__label">
                    {platforms.length > 0 ? 'Already know the platform?' : 'Or pick what you need'}
                  </span>
                  {heroTiles.map((s) => (
                    <Link key={s.slug} href={subHref(hub.slug, s.slug)} className="tile tile--row">
                      <span className="tile__text">
                        <strong>{s.name}</strong>
                        <span>{s.plain}</span>
                      </span>
                      <ArrowIcon />
                    </Link>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Explained simply — for everyone */}
      <section className="section" aria-labelledby="simple-title">
        <div className="container">
          <SectionHead eyebrow="Explained simply" title={hub.simple.title} id="simple-title" />
          <ol className="steps">
            {hub.simple.steps.map((s, i) => (
              <li
                key={s.title}
                className={`step${i === hub.simple.steps.length - 1 ? ' step--accent' : ''}`}
              >
                <span className="step__n" aria-hidden="true">
                  {i + 1}
                </span>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Going deeper — platforms */}
      {platforms.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="platforms-title">
          <div className="container">
            <SectionHead
              eyebrow="Going deeper"
              title={hub.platformsLabel}
              lead="Don’t know these names? That’s fine — skip ahead and we’ll choose for you."
              id="platforms-title"
            />
            <div className="grid" style={gridStyle(platforms.length, 300)}>
              {platforms.map((p, i) => (
                <article
                  key={p.slug}
                  id={p.slug}
                  className={`platform${i === 0 ? ' platform--bold' : ''}`}
                >
                  <h3>
                    <Link href={subHref(hub.slug, p.slug)}>{p.name}</Link>
                  </h3>
                  <p className="platform__plain">In simple words: {p.plain}</p>
                  <p className="platform__best">Best for: {p.best}</p>
                  <ul>
                    {p.includes.slice(0, 4).map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <Link
                    href={subHref(hub.slug, p.slug)}
                    className={`btn ${i === 0 ? 'btn--white' : 'btn--outline'}`}
                  >
                    Explore {p.name}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* By need */}
      {types.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="types-title">
          <div className="container">
            <SectionHead
              eyebrow="By what you need"
              title="Choose by what you need"
              id="types-title"
            />
            <div className="grid" style={gridStyle(types.length)}>
              {types.map((t) => (
                <Link key={t.slug} href={subHref(hub.slug, t.slug)} className="card">
                  <span className="card__title">{t.name}</span>
                  <span className="card__text">{t.plain}</span>
                  <span className="card__more">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section section--flush-top">
        <div className="container">
          <ContactBand
            where={`hub-${hub.slug}`}
            service={hub.slug}
            whatsapp={hub.whatsapp}
            title="Have a project in mind?"
          />
        </div>
      </section>

      {guide ? <GuideBlock hub={hub} showGuideLink /> : null}

      <section className="section" aria-labelledby="includes-title">
        <div className="container">
          <SectionHead eyebrow="What you get" title="Every project includes" id="includes-title" />
          <Includes items={hub.includes} />
        </div>
      </section>

      <FAQSection
        title={`${hub.title}: common questions`}
        items={hub.faqs}
        where={hub.slug}
        whatsapp={hub.whatsapp}
      />

      {related.length > 0 || industries.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="related-title">
          <div className="container">
            <SectionHead title="Often added to this" id="related-title" />
            <div className="grid" style={gridStyle(related.length, 240)}>
              {related.map((r) => (
                <Link key={r.href} href={r.href} className="card card--tint">
                  <span className="card__title">{r.label}</span>
                  <span className="card__text">{r.plain}</span>
                </Link>
              ))}
            </div>
            {industries.length > 0 ? (
              <p style={{ marginTop: 20 }} className="lead">
                Popular with:{' '}
                {industries.map((i, n) => (
                  <span key={i.slug}>
                    {n > 0 ? ' · ' : ''}
                    <Link href={`/industries/${i.slug}/`}>{i.name}</Link>
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <CTABand
        where={`hub-${hub.slug}-end`}
        service={hub.slug}
        whatsapp={hub.whatsapp}
        quoteLabel={hub.cta}
      />

      <JsonLd
        data={graph(
          serviceJsonLd({
            name: hub.title,
            description: hub.seo.description,
            path,
            serviceType: hub.title,
          }),
        )}
      />
    </>
  );
}
