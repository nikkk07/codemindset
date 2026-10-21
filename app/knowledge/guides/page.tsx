import Link from 'next/link';
import { CTABand } from '@/components/ui/Blocks';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { buildMetadata } from '@/lib/seo';
import { GuideCard } from '@/components/guides/GuideCard';
import { SectionHead } from '@/components/ui/Blocks';
import { getVisibleHubs, getVisibleLongGuides, guideHref, isGuideVisible } from '@/lib/visibility';

const page = corePages.guides;
export const metadata = buildMetadata(page);

export default function GuidesPage() {
  const guides = getVisibleHubs().filter((h) => isGuideVisible(h));
  const long = getVisibleLongGuides();
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Knowledge', path: corePages.knowledge.path },
          { name: 'Guides', path: page.path },
        ]}
        eyebrow="Guides"
        title="Free guides for business owners,"
        accent="fact-checked."
        lead="In-depth guides that explain every step, plus two-minute guides that help you choose. Each one starts with the short answer."
      />
      {long.length > 0 ? (
        <section className="section" aria-labelledby="long-title">
          <div className="container">
            <SectionHead
              eyebrow="In-depth guides"
              title="Everything you need to know"
              id="long-title"
            />
            <div className="gcard-grid" style={{ marginTop: 24 }}>
              {long.map((g) => (
                <GuideCard key={g.slug} g={g} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="section section--alt" aria-labelledby="choose-title">
        <div className="container">
          <SectionHead eyebrow="Two-minute guides" title="Help me choose" id="choose-title" />
        </div>
        <div
          className="container grid"
          style={{ '--min': '300px', marginTop: 24 } as React.CSSProperties}
        >
          {guides.map((h) => (
            <Link key={h.slug} href={guideHref(h.slug)} className="k-card">
              <span className="k-card__kind">{h.title}</span>
              <strong>{h.guide.question}</strong>
              <span>{h.guide.shortAnswer}</span>
            </Link>
          ))}
        </div>
      </section>
      <CTABand
        title="Still unsure? Tell us and we’ll choose."
        where="guides"
        quoteLabel="Help me choose"
      />
    </>
  );
}
