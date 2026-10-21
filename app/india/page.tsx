import Link from 'next/link';
import { CTABand, SectionHead, Steps } from '@/components/ui/Blocks';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { regions } from '@/content/regions';
import { buildMetadata } from '@/lib/seo';
import { getRegion } from '@/lib/visibility';

const page = corePages.india;
export const metadata = buildMetadata(page);

const remote = [
  { title: 'Talk', text: 'Call, WhatsApp or video, whatever suits you.' },
  { title: 'See progress', text: 'Shared preview links so you can review from anywhere.' },
  { title: 'Launch', text: 'We go live and hand everything over, wherever you are.' },
];

export default function IndiaPage() {
  const states = regions.filter((r) => r.type === 'state');
  const uts = regions.filter((r) => r.type === 'union-territory');
  const item = (slug: string, name: string) =>
    getRegion(slug) ? (
      <Link href={`/india/${slug}/`}>
        {name} <small>→</small>
      </Link>
    ) : (
      <span>{name}</span>
    );
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Across India', path: page.path }]}
        eyebrow="Across India"
        title="An Indian company,"
        accent="delivering in every state."
        lead="CodeMindset is an Indian IT services company. We build websites, apps, automation and software for businesses in all 28 states and 8 union territories, in big cities and small towns alike."
      />
      <section className="section" aria-labelledby="remote-title">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="Wherever you are, it works the same way"
            id="remote-title"
          />
          <Steps items={remote} />
        </div>
      </section>
      <section className="section section--tint" aria-labelledby="states-title">
        <div className="container">
          <SectionHead eyebrow="States" title="28 states" id="states-title" />
          <ul className="regions">
            {states.map((r) => (
              <li key={r.slug}>{item(r.slug, r.name)}</li>
            ))}
          </ul>
          <div style={{ height: 40 }} />
          <SectionHead eyebrow="Union territories" title="8 union territories" />
          <ul className="regions">
            {uts.map((r) => (
              <li key={r.slug}>{item(r.slug, r.name)}</li>
            ))}
          </ul>
        </div>
      </section>
      <div style={{ height: 'var(--section-y)' }} />
      <CTABand title="Wherever you are in India, let’s talk." where="india" />
    </>
  );
}
