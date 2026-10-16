import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTABand, SectionHead } from '@/components/ui/Blocks';
import { PageHero } from '@/components/ui/PageHero';
import { buildMetadata } from '@/lib/seo';
import {
  getRegion,
  getVisibleHubs,
  getVisibleRegions,
  hubHref,
  isRegionPublishable,
} from '@/lib/visibility';

type Params = { params: Promise<{ region: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleRegions().map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: Params) {
  const r = getRegion((await params).region);
  if (!r) return {};
  return buildMetadata({
    title: `Website, App & Software Development in ${r.name}`,
    description: `CodeMindset builds websites, mobile apps, AI chatbots, automation and custom software for businesses in ${r.name}. Fast delivery, fixed written quote.`,
    path: `/india/${r.slug}/`,
    review: isRegionPublishable(r) ? 'approved' : 'draft',
  });
}

export default async function RegionPage({ params }: Params) {
  const r = getRegion((await params).region);
  if (!r) notFound();
  const hubs = getVisibleHubs();
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Across India', path: '/india/' },
          { name: r.name, path: `/india/${r.slug}/` },
        ]}
        eyebrow={r.type === 'state' ? 'State' : 'Union territory'}
        title={`Website, app & software development in ${r.name}`}
        lead={`CodeMindset is an Indian IT services company serving businesses in ${r.name}. We work remotely by call, WhatsApp and video, with a fixed written quote and fast delivery.`}
      />
      {r.local ? (
        <section className="section">
          <div className="container prose">
            <p>{r.local}</p>
          </div>
        </section>
      ) : null}
      <section className="section" aria-labelledby="region-services">
        <div className="container">
          <SectionHead title={`Services for businesses in ${r.name}`} id="region-services" />
          <div className="grid" style={{ '--min': '260px' } as React.CSSProperties}>
            {hubs.map((h) => (
              <Link key={h.slug} href={hubHref(h.slug)} className="card">
                <span className="card__title">{h.plainTitle}</span>
                <span className="card__text">{h.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABand title={`Start your project in ${r.name}.`} where={`region-${r.slug}`} />
    </>
  );
}
