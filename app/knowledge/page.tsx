import Link from 'next/link';
import { CTABand, SectionHead } from '@/components/ui/Blocks';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { GuideCard } from '@/components/guides/GuideCard';
import { buildMetadata } from '@/lib/seo';
import {
  getVisibleArticles,
  getVisibleGlossary,
  getVisibleHubs,
  getVisibleLongGuides,
  guideHref,
  isGuideVisible,
} from '@/lib/visibility';

const page = corePages.knowledge;
export const metadata = buildMetadata(page);

export default function KnowledgePage() {
  const guides = getVisibleHubs().filter((h) => isGuideVisible(h));
  const terms = getVisibleGlossary();
  const long = getVisibleLongGuides();
  const articles = getVisibleArticles();
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Knowledge', path: page.path }]}
        eyebrow="Knowledge hub"
        title="Technology, explained"
        accent="for business owners."
        lead="Fact-checked guides, quick help-me-choose guides and a glossary of tech terms, written without jargon."
      />

      {long.length > 0 ? (
        <section className="section" aria-labelledby="k-long">
          <div className="container">
            <SectionHead eyebrow="In-depth guides" title="Learn it properly" id="k-long" />
            <div className="gcard-grid" style={{ marginTop: 24 }}>
              {long.map((g) => (
                <GuideCard key={g.slug} g={g} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {guides.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="k-guides">
          <div className="container">
            <SectionHead
              eyebrow="Guides"
              title="Help me choose"
              id="k-guides"
              action={
                <Link href={corePages.guides.path} className="link-arrow">
                  All guides
                </Link>
              }
            />
            <div className="grid" style={{ '--min': '280px' } as React.CSSProperties}>
              {guides.map((h) => (
                <Link key={h.slug} href={guideHref(h.slug)} className="k-card">
                  <span className="k-card__kind">{h.title}</span>
                  <strong>{h.guide.question}</strong>
                  <span>{h.guide.shortAnswer.split('. ')[0]}.</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section section--tint" aria-labelledby="k-blog">
        <div className="container">
          <SectionHead
            eyebrow="Blog"
            title="Latest articles"
            id="k-blog"
            action={
              articles.length > 0 ? (
                <Link href={corePages.blog.path} className="link-arrow">
                  All articles
                </Link>
              ) : undefined
            }
          />
          {articles.length > 0 ? (
            <div className="grid" style={{ '--min': '280px' } as React.CSSProperties}>
              {articles.slice(0, 6).map((a) => (
                <Link key={a.slug} href={`/knowledge/blog/${a.slug}/`} className="k-card">
                  <span className="k-card__kind">{a.category}</span>
                  <strong>{a.title}</strong>
                  <span>{a.description}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty">
              <strong>New articles are on the way.</strong>
              <span>Meanwhile, the guides and glossary answer the most common questions.</span>
            </div>
          )}
        </div>
      </section>

      {terms.length > 0 ? (
        <section className="section" aria-labelledby="k-glossary">
          <div className="container">
            <SectionHead
              eyebrow="Glossary"
              title="Tech terms, made simple"
              id="k-glossary"
              action={
                <Link href={corePages.glossary.path} className="link-arrow">
                  Full glossary
                </Link>
              }
            />
            <ul className="glossary-index">
              {terms.map((t) => (
                <li key={t.slug}>
                  <Link href={`/knowledge/glossary/${t.slug}/`} className="chip">
                    {t.term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTABand
        title="Have a question we didn’t answer? Ask us."
        where="knowledge"
        quoteLabel="Ask our team"
      />
    </>
  );
}
