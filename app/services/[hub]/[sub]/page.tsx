import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GuideBlock, chooserGoals } from '@/components/services/GuideBlock';
import { GuideCard } from '@/components/guides/GuideCard';
import { ProcessMap } from '@/components/guides/ProcessMap';
import { CTABand, FAQSection, SectionHead, gridStyle } from '@/components/ui/Blocks';
import { SkipHook } from '@/components/ui/SkipHook';
import { ContactLink } from '@/components/ui/ContactLink';
import { ArrowIcon, ChatIcon, CheckIcon } from '@/components/ui/Icons';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { ProjectCard } from '@/components/work/ProjectCard';
import { steps } from '@/content/home';
import { GUIDE_SLUG } from '@/content/services';
import type { FAQ, ServiceHub, SubService } from '@/content/types';
import { quoteHref, whatsappHref } from '@/lib/contact';
import { buildMetadata, graph, serviceJsonLd } from '@/lib/seo';
import { lcFirst } from '@/lib/text';
import {
  getHub,
  getSub,
  getPageSubs,
  getVisibleHubs,
  getVisibleProjects,
  getVisibleSubs,
  guideHref,
  guidesForHub,
  hubHref,
  isGuideVisible,
  subHref,
} from '@/lib/visibility';

type Params = { params: Promise<{ hub: string; sub: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleHubs().flatMap((h) => [
    ...getPageSubs(h).map((s) => ({ hub: h.slug, sub: s.slug })),
    ...(isGuideVisible(h) ? [{ hub: h.slug, sub: GUIDE_SLUG }] : []),
  ]);
}

/** Meta description: the plain line plus the reasons to choose us, within ~160 characters. */
const subDescription = (_hub: ServiceHub, s: SubService) => {
  const text = `${s.title} by CodeMindset: ${s.plain} Fixed written quote, and you own everything.`;
  return text.length <= 160 ? text : `${s.title} by CodeMindset: ${s.plain}`;
};

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
  const more = getVisibleSubs(hub).filter((o) => o.slug !== s.slug && o.page);
  const work = getVisibleProjects()
    .filter((p) => p.services.includes(`${hub.slug}/${s.slug}`))
    .slice(0, 2);
  const whatsapp = `Hi CodeMindset, I’m interested in ${lcFirst(s.title)}.`;
  const guides = guidesForHub(hub.slug);
  const faqs: FAQ[] = [
    ...(s.faqs ?? []),
    {
      question: `How much does ${lcFirst(s.title)} cost?`,
      answer:
        'It depends on what you need. Share your goal and we send a fixed, written quote, so you know the full cost before any work starts.',
    },
    {
      question: 'How long will it take?',
      answer:
        'The delivery date is written into your quote. We work in short stages, so you see working progress early.',
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
        lead={s.intro ?? s.plain}
      >
        <div className="btn-row btn-row--grow">
          <Link href={quoteHref(hub.slug)} className="btn btn--primary btn--lg">
            Get a free quote <ArrowIcon />
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
        <div className="container split">
          <div>
            <SectionHead eyebrow="What you get" title="What’s included?" id="get-title" />
            <ul className="reasons" style={{ marginTop: 24, gridTemplateColumns: '1fr' }}>
              {s.includes.map((i) => (
                <li key={i}>
                  <CheckIcon />
                  <strong>{i}</strong>
                  <span />
                </li>
              ))}
              {['A fixed, written quote', 'You own the code and every login'].map((i) => (
                <li key={i}>
                  <CheckIcon />
                  <strong>{i}</strong>
                  <span />
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
          </dl>
        </div>
      </section>

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

      {s.uses && s.uses.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="uses-title">
          <div className="container">
            <SectionHead
              eyebrow="Where it helps"
              title={`How businesses use ${lcFirst(s.name)}`}
              lead="Example scenarios to show what is possible, not client case studies."
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

      <section className="section" aria-labelledby="how-title">
        <div className="container split">
          <div>
            <SectionHead
              eyebrow="Our process"
              title="How we do it, step by step"
              lead="Every step is agreed with you before we start it."
              id="how-title"
            />
            <ProcessMap items={s.process ?? steps} label={`${s.name}: our process`} />
          </div>
          <div>
            <SkipHook
              title="Skip the steps. We’ll do all of it for you."
              text={`Tell us what you need from ${lcFirst(s.name)}. You get a quick reply and a fixed, written quote.`}
              cta="Get a free quote"
              service={hub.slug}
              whatsapp={whatsapp}
              where={`sub-${s.slug}-hook`}
            />
          </div>
        </div>
      </section>

      {s.deep && s.deep.length > 0 ? (
        <section className="section section--alt" aria-labelledby="deep-title">
          <div className="container">
            <SectionHead eyebrow="In depth" title="What you should know" id="deep-title" />
            <div className="deep" style={{ marginTop: 24 }}>
              {s.deep.map((d) => (
                <div key={d.heading} className="deep__item">
                  <h3>{d.heading}</h3>
                  <p>{d.text}</p>
                  {d.points ? (
                    <ul>
                      {d.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {guides.length > 0 || isGuideVisible(hub) ? (
        <section className="section" aria-labelledby="learn-title">
          <div className="container">
            <SectionHead eyebrow="Free guides" title="Learn before you decide" id="learn-title" />
            <div className="gcard-grid" style={{ marginTop: 24 }}>
              {guides.map((g) => (
                <GuideCard key={g.slug} g={g} />
              ))}
              {isGuideVisible(hub) ? (
                <Link href={guideHref(hub.slug)} className="gcard">
                  <span className="gcard__meta">Quick guide · 2 min</span>
                  <strong>{hub.guide.question}</strong>
                  <span className="gcard__text">{hub.guide.shortAnswer.split('. ')[0]}.</span>
                  <span className="gcard__more">Help me choose →</span>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <FAQSection title={`${s.title}: FAQs`} items={faqs} where={s.slug} whatsapp={whatsapp} />

      <section className="section section--flush-top" aria-labelledby="more-title">
        <div className="container">
          <SectionHead title={`More in ${hub.title}`} id="more-title" />
          <ul className="inline-links" style={{ marginTop: 16 }}>
            {more.map((o) => (
              <li key={o.slug}>
                <Link href={subHref(hub.slug, o.slug)}>{o.name}</Link>
              </li>
            ))}
            <li>
              <Link href={hubHref(hub.slug)}>All of {hub.title.toLowerCase()} →</Link>
            </li>
          </ul>
        </div>
      </section>

      <CTABand
        where={`sub-${s.slug}-end`}
        service={hub.slug}
        whatsapp={whatsapp}
        quoteLabel="Get a free quote"
      />

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
        title="Still unsure? Tell us and we’ll choose."
        where={`guide-${hub.slug}`}
        service={hub.slug}
        whatsapp={hub.whatsapp}
        quoteLabel="Help me choose"
      />
    </>
  );
}
