import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CTABand,
  ContactBand,
  FAQSection,
  Includes,
  SectionHead,
  Steps,
  gridStyle,
} from '@/components/ui/Blocks';
import { ContactLink } from '@/components/ui/ContactLink';
import { DraftNotice } from '@/components/ui/DraftNotice';
import { ArrowIcon, ChatIcon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { whatsappHref } from '@/lib/contact';
import { showDrafts } from '@/lib/env';
import { buildMetadata } from '@/lib/seo';
import { getAudience, getVisibleAudiences, isDraft, resolveRef } from '@/lib/visibility';

type Params = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleAudiences().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params) {
  const a = getAudience((await params).slug);
  if (!a) return {};
  return buildMetadata({ ...a.seo, path: `/for/${a.slug}/`, review: a.review });
}

/** "Who are you?" pages: the same services, framed around what this kind of buyer cares about. */
export default async function AudiencePage({ params }: Params) {
  const a = getAudience((await params).slug);
  if (!a) notFound();
  const recommended = a.recommended.map((r) => resolveRef(r)).filter((x) => x !== null);
  const others = getVisibleAudiences().filter((o) => o.slug !== a.slug);
  const whatsapp = `Hi CodeMindset, we're ${a.name.toLowerCase()} and need help with technology.`;
  return (
    <>
      {showDrafts() && isDraft(a) ? (
        <DraftNotice>Awaiting approval; hidden from search until approved.</DraftNotice>
      ) : null}
      <PageHero
        crumbs={[{ name: `For ${a.name.toLowerCase()}`, path: `/for/${a.slug}/` }]}
        eyebrow={`For ${a.name.toLowerCase()}`}
        title={a.h1}
        accent={a.h1Accent}
        lead={a.intro}
      >
        <div className="btn-row btn-row--grow">
          <Link href="/contact/" className="btn btn--primary btn--lg">
            Start your project <ArrowIcon />
          </Link>
          <ContactLink
            kind="whatsapp"
            where={`for-${a.slug}`}
            href={whatsappHref(whatsapp)}
            className="btn btn--outline btn--lg"
          >
            <ChatIcon /> WhatsApp us
          </ContactLink>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="for-priorities">
        <div className="container">
          <SectionHead
            eyebrow="What matters to you"
            title="Built around your priorities"
            id="for-priorities"
          />
          <Includes items={a.priorities} />
        </div>
      </section>

      {recommended.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="for-services">
          <div className="container">
            <SectionHead
              eyebrow="Where to start"
              title="Services that fit best"
              lead="A short list to start from. Not sure? Tell us the problem and we’ll suggest the right mix."
              id="for-services"
            />
            <div className="grid" style={gridStyle(recommended.length, 260)}>
              {recommended.map((r) => (
                <Link key={r.href} href={r.href} className="card card--tint">
                  <span className="card__title">{r.label}</span>
                  <span className="card__text">{r.plain}</span>
                  <span className="card__more">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" aria-labelledby="for-how">
        <div className="container">
          <SectionHead eyebrow="How we work" title="Simple, step by step" id="for-how" />
          <Steps items={a.howWeWork} highlight={0} />
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <ContactBand where={`for-${a.slug}`} whatsapp={whatsapp} />
        </div>
      </section>

      <FAQSection
        title={`${a.name}: common questions`}
        items={a.faqs}
        where={`for-${a.slug}`}
        whatsapp={whatsapp}
      />

      {others.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="for-others">
          <div className="container">
            <SectionHead title="Not quite you?" id="for-others" />
            <div className="grid" style={gridStyle(others.length + 1, 240)}>
              {others.map((o) => (
                <Link key={o.slug} href={`/for/${o.slug}/`} className="card">
                  <span className="card__title">For {o.name.toLowerCase()}</span>
                  <span className="card__text">{o.short}</span>
                </Link>
              ))}
              <Link href="/industries/" className="card">
                <span className="card__title">By industry</span>
                <span className="card__text">Retail, healthcare, finance, logistics and more.</span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <CTABand where={`for-${a.slug}-end`} whatsapp={whatsapp} />
    </>
  );
}
