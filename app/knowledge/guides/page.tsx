import Link from 'next/link';
import { CTABand } from '@/components/ui/Blocks';
import { DraftNotice } from '@/components/ui/DraftNotice';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { showDrafts } from '@/lib/env';
import { buildMetadata } from '@/lib/seo';
import { getVisibleHubs, guideHref, isDraft, isGuideVisible } from '@/lib/visibility';

const page = corePages.guides;
export const metadata = buildMetadata(page);

export default function GuidesPage() {
  const guides = getVisibleHubs().filter((h) => isGuideVisible(h));
  return (
    <>
      {showDrafts() && isDraft(page) ? (
        <DraftNotice>Awaiting approval; hidden from search until approved.</DraftNotice>
      ) : null}
      <PageHero
        crumbs={[
          { name: 'Knowledge', path: corePages.knowledge.path },
          { name: 'Guides', path: page.path },
        ]}
        eyebrow="Guides"
        title="Pick the right technology"
        accent="in two minutes."
        lead="Each guide gives the short answer first, then helps you decide. Still unsure? Tell us your goal — we’ll choose."
      />
      <section className="section">
        <div className="container grid" style={{ '--min': '300px' } as React.CSSProperties}>
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
        title="Still unsure? Tell us — we’ll choose."
        where="guides"
        quoteLabel="Help me choose"
      />
    </>
  );
}
