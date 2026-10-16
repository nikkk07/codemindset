import { notFound } from 'next/navigation';
import { CTABand } from '@/components/ui/Blocks';
import { DraftNotice } from '@/components/ui/DraftNotice';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { showDrafts } from '@/lib/env';
import { articleJsonLd, buildMetadata, graph } from '@/lib/seo';
import { getVisibleArticles, isDraft } from '@/lib/visibility';

type Params = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleArticles().map((a) => ({ slug: a.slug }));
}

const find = (slug: string) => getVisibleArticles().find((a) => a.slug === slug);

export async function generateMetadata({ params }: Params) {
  const a = find((await params).slug);
  if (!a) return {};
  return buildMetadata({
    title: a.title,
    description: a.description,
    path: `/knowledge/blog/${a.slug}/`,
    review: a.review,
    type: 'article',
  });
}

export default async function ArticlePage({ params }: Params) {
  const a = find((await params).slug);
  if (!a) notFound();
  const path = `/knowledge/blog/${a.slug}/`;
  return (
    <>
      {showDrafts() && isDraft(a) ? (
        <DraftNotice>Awaiting approval; hidden from search until approved.</DraftNotice>
      ) : null}
      <PageHero
        crumbs={[
          { name: 'Knowledge', path: corePages.knowledge.path },
          { name: 'Blog', path: corePages.blog.path },
          { name: a.title, path },
        ]}
        eyebrow={a.category}
        title={a.title}
        lead={a.description}
      />
      <article className="section">
        <div className="container prose">
          {a.body.map((b, i) =>
            b.type === 'h2' ? (
              <h2 key={i}>{b.text}</h2>
            ) : b.type === 'list' ? (
              <ul key={i}>
                {b.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
          <p className="intro-meta">
            Published {new Date(a.published).toLocaleDateString('en-IN', { dateStyle: 'long' })}
            {a.updated
              ? ` · Updated ${new Date(a.updated).toLocaleDateString('en-IN', { dateStyle: 'long' })}`
              : ''}
          </p>
        </div>
      </article>
      <CTABand where={`article-${a.slug}`} />
      <JsonLd data={graph(articleJsonLd(a, path))} />
    </>
  );
}
