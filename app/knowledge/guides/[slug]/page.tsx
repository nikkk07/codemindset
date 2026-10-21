import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GuideBody } from '@/components/guides/GuideBody';
import { GuideCard } from '@/components/guides/GuideCard';
import { CTABand, FAQSection, SectionHead } from '@/components/ui/Blocks';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactLink } from '@/components/ui/ContactLink';
import { ArrowIcon, ChatIcon, CheckIcon } from '@/components/ui/Icons';
import { JsonLd } from '@/components/ui/JsonLd';
import { corePages } from '@/content/pages';
import { quoteHref, whatsappHref } from '@/lib/contact';
import { buildMetadata, graph, guideJsonLd } from '@/lib/seo';
import {
  getHub,
  getLongGuide,
  getVisibleLongGuides,
  hubHref,
  longGuideHref,
  resolveRef,
} from '@/lib/visibility';

type Params = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleLongGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Params) {
  const g = getLongGuide((await params).slug);
  if (!g) return {};
  return buildMetadata({
    title: g.seoTitle,
    description: g.description,
    path: longGuideHref(g.slug),
    review: g.review,
    type: 'article',
  });
}

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default async function LongGuidePage({ params }: Params) {
  const g = getLongGuide((await params).slug);
  if (!g) notFound();
  const hub = getHub(g.service);
  const path = longGuideHref(g.slug);
  const related = g.related.map((r) => resolveRef(r)).filter((x) => x !== null);
  const others = getVisibleLongGuides().filter((o) => o.slug !== g.slug);

  return (
    <>
      <section className="hero2 hero2--inner g-hero" aria-labelledby="g-title">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Knowledge', path: corePages.knowledge.path },
              { name: 'Guides', path: corePages.guides.path },
              { name: g.title, path },
            ]}
          />
          <div className="g-hero__inner">
            <p className="hero2__badge">
              <span className="hero2__dot" aria-hidden="true" />
              Free guide · {g.readMinutes} min read · Checked {fmt(g.updated)}
            </p>
            <h1 id="g-title">{g.title}</h1>
            <div className="g-answer">
              <span className="g-answer__label">Short answer</span>
              <p>{g.answer}</p>
            </div>
            <ul className="g-points">
              {g.keyPoints.map((k) => (
                <li key={k}>
                  <CheckIcon />
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="container g-layout">
        <aside className="g-aside">
          <nav className="g-toc" aria-label="On this page">
            <p>On this page</p>
            <ol>
              {g.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
          {hub ? (
            <div className="g-mini">
              <strong>Rather have it done for you?</strong>
              <span>{hub.title}, by our team. Fixed quote.</span>
              <Link href={quoteHref(hub.slug)} className="btn btn--primary btn--sm">
                Get a free quote <ArrowIcon />
              </Link>
              <ContactLink
                kind="whatsapp"
                where={`guide-aside-${g.slug}`}
                href={whatsappHref(g.whatsapp)}
                className="btn btn--outline btn--sm"
              >
                <ChatIcon /> WhatsApp
              </ContactLink>
            </div>
          ) : null}
        </aside>
        <article className="g-article">
          <GuideBody g={g} />
          <section className="g-section g-sources" aria-labelledby="h-sources">
            <h2 id="h-sources">Sources</h2>
            <p>Every fact in this guide was checked against these sources on {fmt(g.updated)}.</p>
            <ol>
              {g.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </article>
      </div>

      <FAQSection
        title={`${g.title.split(':')[0]}: FAQs`}
        items={g.faqs}
        where={`guide-${g.slug}`}
        whatsapp={g.whatsapp}
      />

      {related.length > 0 ? (
        <section className="section section--alt" aria-labelledby="g-related">
          <div className="container">
            <SectionHead
              eyebrow="Related services"
              title="Want us to handle it?"
              id="g-related"
              action={
                hub ? (
                  <Link href={hubHref(hub.slug)} className="link-arrow">
                    All {hub.title.toLowerCase()}
                  </Link>
                ) : undefined
              }
            />
            <div className="svc-grid" style={{ marginTop: 24 }}>
              {related.map((r) => (
                <Link key={r.href} href={r.href} className="svc">
                  <span className="svc__title">{r.label}</span>
                  <span className="svc__text">{r.plain}</span>
                  <span className="svc__more">See the service →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {others.length > 0 ? (
        <section className="section" aria-labelledby="g-more">
          <div className="container">
            <SectionHead eyebrow="Keep reading" title="More free guides" id="g-more" />
            <div className="gcard-grid" style={{ marginTop: 24 }}>
              {others.slice(0, 3).map((o) => (
                <GuideCard key={o.slug} g={o} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTABand
        where={`guide-${g.slug}-end`}
        service={g.service}
        whatsapp={g.whatsapp}
        title="Skip the reading. We’ll do it for you."
        quoteLabel="Get a free quote"
      />

      <JsonLd data={graph(guideJsonLd(g, path))} />
    </>
  );
}
