import Link from 'next/link';
import { CTABand } from '@/components/ui/Blocks';
import { ServiceIcon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { buildMetadata } from '@/lib/seo';
import { getVisibleIndustries } from '@/lib/visibility';

const page = corePages.industries;
export const metadata = buildMetadata(page);

export default function IndustriesPage() {
  const industries = getVisibleIndustries();
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Industries', path: page.path }]}
        eyebrow="Industries"
        title="Built around how"
        accent="your sector works."
        lead="Every industry has its own daily problems. Pick yours to see the problems we solve and the systems we build."
      />
      <section className="section">
        <div className="container grid" style={{ '--min': '280px' } as React.CSSProperties}>
          {industries.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}/`} className="card">
              <span className="icon-box">
                <ServiceIcon name={i.icon} />
              </span>
              <span className="card__title">{i.name}</span>
              <span className="card__text">{i.intro}</span>
              <span className="card__more">See solutions →</span>
            </Link>
          ))}
        </div>
      </section>
      <CTABand title="Your industry isn’t listed? We can still help." where="industries" />
    </>
  );
}
