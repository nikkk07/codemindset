import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GuideBlock } from '@/components/services/GuideBlock';
import { GuideCard } from '@/components/guides/GuideCard';
import { CTABand, FAQSection, SectionHead } from '@/components/ui/Blocks';
import { SkipHook } from '@/components/ui/SkipHook';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactLink } from '@/components/ui/ContactLink';
import { ArrowIcon, ChatIcon, CheckIcon } from '@/components/ui/Icons';
import { JsonLd } from '@/components/ui/JsonLd';
import { ProjectCard } from '@/components/work/ProjectCard';
import { steps } from '@/content/home';
import type { SubService } from '@/content/types';
import { quoteHref, whatsappHref } from '@/lib/contact';
import { buildMetadata, graph, serviceJsonLd } from '@/lib/seo';
import {
  getHub,
  getIndustry,
  getVisibleHubs,
  getVisibleProjects,
  getVisibleSubs,
  guidesForHub,
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

function Offer({ hub, s }: { hub: string; s: SubService }) {
  const href = s.page ? subHref(hub, s.slug) : null;
  return (
    <li className="offer" id={s.slug}>
      <h3>{href ? <Link href={href}>{s.name}</Link> : s.name}</h3>
      <p>{s.plain}</p>
      <p className="offer__best">Best for: {s.best}</p>
      {href ? (
        <Link href={href} className="offer__more">
          Read more →
        </Link>
      ) : null}
    </li>
  );
}

export default async function HubPage({ params }: { params: Promise<{ hub: string }> }) {
  const hub = getHub((await params).hub);
  if (!hub) notFound();

  const subs = getVisibleSubs(hub);
  const types = subs.filter((s) => s.kind === 'type');
  const platforms = subs.filter((s) => s.kind === 'platform');
  const guide = isGuideVisible(hub);
  const related = hub.related.map((r) => resolveRef(r)).filter((x) => x !== null);
  const industries = hub.industries.map((s) => getIndustry(s)).filter((x) => x !== undefined);
  const work = getVisibleProjects()
    .filter((p) => p.services.some((r) => r === hub.slug || r.startsWith(`${hub.slug}/`)))
    .slice(0, 2);
  const path = hubHref(hub.slug);
  const guides = guidesForHub(hub.slug);

  return (
    <>
      <section className="hero2 hero2--inner" aria-labelledby="hub-title">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Services', path: '/services/' },
              { name: hub.title, path },
            ]}
          />
          <div className="hero2__grid" style={{ marginTop: 20 }}>
            <div className="hero2__copy">
              <p className="hero2__badge">
                <span className="hero2__dot" aria-hidden="true" />
                {hub.eyebrow}
              </p>
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
            </div>
            {/* Key facts in one card: quick to scan, easy for search engines and AI to quote */}
            <dl className="glance" aria-label={`${hub.title} at a glance`}>
              {types.length > 0 ? (
                <div>
                  <dt>What we build</dt>
                  <dd>
                    {types
                      .slice(0, 4)
                      .map((t) => t.name)
                      .join(', ')}
                  </dd>
                </div>
              ) : null}
              {platforms.length > 0 ? (
                <div>
                  <dt>Built with</dt>
                  <dd>
                    {platforms
                      .slice(0, 4)
                      .map((t) => t.name)
                      .join(', ')}
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Price</dt>
                <dd>Fixed, written quote before work starts</dd>
              </div>
              <div>
                <dt>Ownership</dt>
                <dd>Code, domain and logins in your name</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>Anywhere in India, by call, WhatsApp and video</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* In plain words: why it matters */}
      <section className="section section--alt" aria-labelledby="simple-title">
        <div className="container">
          <SectionHead eyebrow="In plain words" title={hub.simple.title} id="simple-title" />
          <ol className="flow">
            {hub.simple.steps.map((s) => (
              <li key={s.title}>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Everything this service covers; the most-searched get their own page */}
      {types.length > 0 ? (
        <section className="section" aria-labelledby="types-title">
          <div className="container">
            <SectionHead
              eyebrow="What we offer"
              title={`What ${hub.title.toLowerCase()} services do you offer?`}
              id="types-title"
            />
            <ul className="offer-list">
              {types.map((s) => (
                <Offer key={s.slug} hub={hub.slug} s={s} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {platforms.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="platforms-title">
          <div className="container">
            <SectionHead
              eyebrow="For the technically curious"
              title={hub.platformsLabel}
              lead="Don’t know these names? Tell us your goal and we’ll choose."
              id="platforms-title"
            />
            <ul className="offer-list">
              {platforms.map((s) => (
                <Offer key={s.slug} hub={hub.slug} s={s} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {work.length > 0 ? (
        <section className="section section--alt" aria-labelledby="work-title">
          <div className="container">
            <SectionHead eyebrow="Our work" title="Live projects like this" id="work-title" />
            <div className="proj-grid proj-grid--2">
              {work.map((p) => (
                <ProjectCard key={p.slug} p={p} detailed />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {guide ? <GuideBlock hub={hub} showGuideLink /> : null}

      <section className="section" aria-labelledby="includes-title">
        <div className="container split">
          <div>
            <SectionHead eyebrow="Included" title="What’s included?" id="includes-title" />
            <ul className="reasons" style={{ marginTop: 24 }}>
              {hub.includes.map((i) => (
                <li key={i.title}>
                  <CheckIcon />
                  <strong>{i.title}</strong>
                  <span>{i.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="How it works" title="How does it work?" id="steps-title" />
            <ol className="flow" style={{ marginTop: 24, gridTemplateColumns: '1fr' }}>
              {steps.map((s) => (
                <li key={s.title}>
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <SkipHook
            title={`Skip the research. We’ll handle your ${hub.title.toLowerCase()} for you.`}
            text="Tell us what you need in a few lines. You get a quick reply, a fixed written quote, and a team that does the work end to end."
            cta={hub.cta}
            service={hub.slug}
            whatsapp={hub.whatsapp}
            where={`hub-${hub.slug}-hook`}
          />
        </div>
      </section>

      {guides.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="guides-title">
          <div className="container">
            <SectionHead
              eyebrow="Free guides"
              title="Want to understand it first?"
              lead="In-depth, fact-checked guides that explain every step."
              id="guides-title"
            />
            <div className="gcard-grid" style={{ marginTop: 24 }}>
              {guides.map((g) => (
                <GuideCard key={g.slug} g={g} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FAQSection
        title={`${hub.title}: FAQs`}
        items={hub.faqs}
        where={hub.slug}
        whatsapp={hub.whatsapp}
      />

      {related.length > 0 || industries.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="related-title">
          <div className="container">
            <SectionHead title="Often needed together" id="related-title" />
            <ul className="inline-links" style={{ marginTop: 16 }}>
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href}>{r.label}</Link>
                </li>
              ))}
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}/`}>For {i.name.toLowerCase()}</Link>
                </li>
              ))}
            </ul>
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
