import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTABand } from '@/components/ui/Blocks';
import { DraftNotice } from '@/components/ui/DraftNotice';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { showDrafts } from '@/lib/env';
import { buildMetadata } from '@/lib/seo';
import { getVisibleGlossary, isDraft } from '@/lib/visibility';

const page = corePages.glossary;
export const metadata = buildMetadata(page);

export default function GlossaryPage() {
  const terms = [...getVisibleGlossary()].sort((a, b) => a.term.localeCompare(b.term));
  if (terms.length === 0) notFound();
  return (
    <>
      {showDrafts() && isDraft(page) ? (
        <DraftNotice>Awaiting approval; hidden from search until approved.</DraftNotice>
      ) : null}
      <PageHero
        crumbs={[
          { name: 'Knowledge', path: corePages.knowledge.path },
          { name: 'Glossary', path: page.path },
        ]}
        eyebrow="Glossary"
        title="Tech terms,"
        accent="made simple."
        lead="What the words mean, with everyday examples — and why each one matters for your business."
      />
      <section className="section">
        <div className="container grid" style={{ '--min': '280px' } as React.CSSProperties}>
          {terms.map((t) => (
            <Link key={t.slug} href={`/knowledge/glossary/${t.slug}/`} className="k-card">
              <span className="k-card__kind">Term</span>
              <strong>{t.term}</strong>
              <span>{t.short}</span>
            </Link>
          ))}
        </div>
      </section>
      <CTABand title="Rather we handle the tech? We can." where="glossary" />
    </>
  );
}
