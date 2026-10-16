import Link from 'next/link';
import { CTABand } from '@/components/ui/Blocks';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { buildMetadata } from '@/lib/seo';
import { getVisibleArticles } from '@/lib/visibility';

const page = corePages.blog;
const articles = getVisibleArticles();
// An empty blog is never indexed.
export const metadata = buildMetadata({
  ...page,
  review: articles.length > 0 ? page.review : 'draft',
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Knowledge', path: corePages.knowledge.path },
          { name: 'Blog', path: page.path },
        ]}
        eyebrow="Blog"
        title="Articles from"
        accent="our team."
        lead="Practical writing on websites, apps, AI and software for Indian businesses."
      />
      <section className="section">
        <div className="container">
          {articles.length > 0 ? (
            <div className="grid" style={{ '--min': '300px' } as React.CSSProperties}>
              {articles.map((a) => (
                <Link key={a.slug} href={`/knowledge/blog/${a.slug}/`} className="k-card">
                  <span className="k-card__kind">
                    {a.category} ·{' '}
                    {new Date(a.published).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                  </span>
                  <strong>{a.title}</strong>
                  <span>{a.description}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty">
              <strong>New articles are on the way.</strong>
              <span>
                Meanwhile, our simple guides and glossary answer the most common questions.
              </span>
              <div className="btn-row">
                <Link href={corePages.guides.path} className="btn btn--primary btn--sm">
                  Read the guides
                </Link>
                <Link href={corePages.glossary.path} className="btn btn--outline btn--sm">
                  Open the glossary
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <CTABand where="blog" />
    </>
  );
}
