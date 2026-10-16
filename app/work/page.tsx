import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTABand } from '@/components/ui/Blocks';
import { DraftNotice } from '@/components/ui/DraftNotice';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { caseStudies } from '@/content/work';
import { showDrafts } from '@/lib/env';
import { buildMetadata } from '@/lib/seo';
import { isWorkEnabled } from '@/lib/visibility';

const page = corePages.work;
const published = caseStudies.filter((c) => c.review === 'approved' && c.clientPermission);
export const metadata = buildMetadata({
  ...page,
  review: published.length > 0 ? page.review : 'draft',
});

export default function WorkPage() {
  if (!isWorkEnabled()) notFound();
  return (
    <>
      {showDrafts() ? (
        <DraftNotice>
          Case studies appear here only with client permission. Hidden in production until one is
          approved.
        </DraftNotice>
      ) : null}
      <PageHero
        crumbs={[{ name: 'Work', path: page.path }]}
        eyebrow="Our work"
        title="Real projects,"
        accent="shared with permission."
        lead="We publish client work only when the client agrees — no borrowed logos or made-up results."
      />
      <section className="section">
        <div className="container">
          <div className="empty">
            <strong>Case studies are being prepared with our clients.</strong>
            <span>
              Want to see examples relevant to your business? Ask us — we’ll share what we can.
            </span>
            <Link href="/contact/" className="btn btn--primary btn--sm">
              Ask for examples
            </Link>
          </div>
        </div>
      </section>
      <CTABand where="work" />
    </>
  );
}
