import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GuideBlock, chooserGoals } from '@/components/services/GuideBlock';
import {
  CTABand,
  CheckList,
  ContactBand,
  FAQSection,
  SectionHead,
  Steps,
  gridStyle,
} from '@/components/ui/Blocks';
import { ContactLink } from '@/components/ui/ContactLink';
import { ArrowIcon, ChatIcon } from '@/components/ui/Icons';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { steps } from '@/content/home';
import { GUIDE_SLUG } from '@/content/services';
import type { FAQ, ServiceHub, SubService } from '@/content/types';
import { quoteHref, whatsappHref } from '@/lib/contact';
import { buildMetadata, graph, serviceJsonLd } from '@/lib/seo';
import { lcFirst } from '@/lib/text';
import {
  getHub,
  getSub,
  getVisibleHubs,
  getVisibleSubs,
  guideHref,
  hubHref,
  isGuideVisible,
  subHref,
} from '@/lib/visibility';

type Params = { params: Promise<{ hub: string; sub: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleHubs().flatMap((h) => [
    ...getVisibleSubs(h).map((s) => ({ hub: h.slug, sub: s.slug })),
    ...(isGuideVisible(h) ? [{ hub: h.slug, sub: GUIDE_SLUG }] : []),
  ]);
}

const subDescription = (hub: ServiceHub, s: SubService) =>
  `${s.title} by CodeMindset: ${s.plain} Best for ${lcFirst(s.best)} Fast delivery across India, fixed written quote.`;

export async function generateMetadata({ params }: Params) {
  const { hub: h, sub: x } = await params;
  const hub = getHub(h);
  if (!hub) return {};
  if (x === GUIDE_SLUG) {
    return buildMetadata({
      title: `${hub.guide.question} — Simple Guide`,
      description: hub.guide.shortAnswer,
      path: guideHref(hub.slug),
      review: hub.guide.review === 'approved' && hub.review === 'approved' ? 'approved' : 'draft',
    });
  }
  const s = getSub(h, x);
  if (!s) return {};
  return buildMetadata({
    title: `${s.title} in India`,
    description: subDescription(hub, s),
    path: subHref(hub.slug, s.slug),
    review: s.review === 'approved' && hub.review === 'approved' ? 'approved' : 'draft',
  });
}

export default async function SubPage({ params }: Params) {
  const { hub: h, sub: x } = await params;
  const hub = getHub(h);
  if (!hub) notFound();
  if (x === GUIDE_SLUG) {
    if (!isGuideVisible(hub)) notFound();
    return <GuidePage hub={hub} />;
  }
  const s = getSub(h, x);
  if (!s) notFound();
  return <SubServicePage hub={hub} s={s} />;
}

function SubServicePage({ hub, s }: { hub: ServiceHub; s: SubService }) {
  const path = subHref(hub.slug, s.slug);
  const siblings = getVisibleSubs(hub).filter((o) => o.slug !== s.slug && o.kind === s.kind);
  const others = getVisibleSubs(hub).filter((o) => o.kind !== s.kind);
  const whatsapp = `Hi CodeMindset, I’m interested in ${s.title}.`;
  const faqs: FAQ[] = [
    ...(s.faqs ?? []),
    {
      question: `How much does ${lcFirst(s.title)} cost?`,
      answer:
        'It depends on what you need. Share your goal and we send a fixed, written quote quickly — so you know the cost before any work starts.',
    },
    {
      question: 'How fast can you deliver?',
      answer:
        'Fast. We work in short stages so you see progress early, and the delivery date is written into your quote.',
    },
    {
      question: 'I’m not technical. Is that a problem?',
      answer:
        'Not at all. Tell us your goal in everyday words — we handle the technology and explain everything simply.',
    },
  ];

  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Services', path: '/services/' },
          { name: hub.title, path: hubHref(hub.slug) },
          { name: s.name, path },
        ]}
        eyebrow={hub.title}
        title={s.title}
        lead={
          <>
            <strong>In simple words:</strong> {s.plain} CodeMindset provides {lcFirst(s.title)} for
            businesses across India — quick replies, a fixed written quote and fast delivery.
          </>
        }
      >
        <div className="btn-row btn-row--grow">
          <Link href={quoteHref(hub.slug)} className="btn btn--primary btn--lg">
            Get a quote <ArrowIcon />
          </Link>
          <ContactLink
            kind="whatsapp"
            where={`sub-${s.slug}`}
            href={whatsappHref(whatsapp)}
            className="btn btn--outline btn--lg"
          >
            <ChatIcon /> WhatsApp us
          </ContactLink>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="get-title">
        <div className="container sub-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SectionHead eyebrow="What you get" title={`${s.name}, done properly`} id="get-title" />
            <ul className="includes" style={{ gridTemplateColumns: '1fr' }}>
              {s.includes.map((i) => (
                <li key={i}>
                  <span className="includes__tick" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <strong>{i}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <dl className="facts">
            <div>
              <dt>In simple words</dt>
              <dd>{s.plain}</dd>
            </div>
            <div>
              <dt>Best for</dt>
              <dd>{s.best}</dd>
            </div>
            <div>
              <dt>Part of</dt>
              <dd>
                <Link href={hubHref(hub.slug)}>{hub.title}</Link>
              </dd>
            </div>
            <div>
              <dt>Always included</dt>
              <dd>
                <CheckList items={['Fixed written quote', 'Fast delivery', 'Full ownership']} />
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {s.uses && s.uses.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="uses-title">
          <div className="container">
            <SectionHead
              eyebrow="Where it helps"
              title={`How businesses use ${lcFirst(s.name)}`}
              lead="Example scenarios to show what is possible — not client case studies."
              id="uses-title"
            />
            <div className="grid" style={gridStyle(s.uses.length, 300)}>
              {s.uses.map((u) => (
                <article key={u.sector} className="use">
                  <span className="use__sector">{u.sector}</span>
                  <p>{u.story}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isGuideVisible(hub) ? (
        <section className="section section--flush-top">
          <div className="container">
            <div className="answer-box answer-box--light">
              <strong>Not sure {s.name} is right for you?</strong> {hub.guide.shortAnswer}{' '}
              <Link href={guideHref(hub.slug)}>Read the guide: {hub.guide.question}</Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section section--tint" aria-labelledby="how-title">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="Simple, from first message to launch"
            id="how-title"
          />
          <Steps items={steps} />
        </div>
      </section>

      <FAQSection
        title={`${s.title}: common questions`}
        items={faqs}
        where={s.slug}
        whatsapp={whatsapp}
      />

      {siblings.length > 0 || others.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="more-title">
          <div className="container">
            <SectionHead title={`More in ${hub.title}`} id="more-title" />
            <ul className="chips">
              {[...siblings, ...others].map((o) => (
                <li key={o.slug}>
                  <Link href={subHref(hub.slug, o.slug)} className="chip">
                    {o.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={hubHref(hub.slug)} className="chip chip--solid">
                  All of {hub.title} →
                </Link>
              </li>
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section section--flush-top">
        <div className="container">
          <ContactBand
            where={`sub-${s.slug}`}
            service={hub.slug}
            whatsapp={whatsapp}
            title="Talk to our team today."
          />
        </div>
      </section>

      <JsonLd
        data={graph(
          serviceJsonLd({
            name: s.title,
            description: subDescription(hub, s),
            path,
            serviceType: hub.title,
          }),
        )}
      />
    </>
  );
}

function GuidePage({ hub }: { hub: ServiceHub }) {
  const path = guideHref(hub.slug);
  const goals = chooserGoals(hub);
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Knowledge', path: '/knowledge/' },
          { name: 'Guides', path: '/knowledge/guides/' },
          { name: hub.guide.question, path },
        ]}
        eyebrow="Simple guide"
        title={hub.guide.question}
        lead={
          <>
            <strong>Short answer:</strong> {hub.guide.shortAnswer}
          </>
        }
      />
      <GuideBlock hub={hub} intro={false} />
      <section className="section" aria-labelledby="options-title">
        <div className="container">
          <SectionHead
            eyebrow="Your options, explained"
            title="Which one fits you?"
            id="options-title"
          />
          <div className="grid" style={{ '--min': '260px' } as React.CSSProperties}>
            {goals.map((g) => {
              const body = (
                <>
                  <span className="k-card__kind">Best if: {g.label}</span>
                  <strong>{g.title}</strong>
                  <span>{g.why}</span>
                </>
              );
              return g.href ? (
                <Link key={g.id} href={g.href} className="k-card">
                  {body}
                </Link>
              ) : (
                <Link key={g.id} href={quoteHref(hub.slug)} className="k-card">
                  {body}
                </Link>
              );
            })}
          </div>
          <p style={{ marginTop: 24 }}>
            <Link href={hubHref(hub.slug)} className="link-arrow">
              See all {hub.title} options
            </Link>
          </p>
        </div>
      </section>
      <CTABand
        title="Still unsure? Tell us — we’ll choose."
        where={`guide-${hub.slug}`}
        service={hub.slug}
        whatsapp={hub.whatsapp}
        quoteLabel="Help me choose"
      />
    </>
  );
}
