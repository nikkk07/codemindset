import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTABand, SectionHead } from '@/components/ui/Blocks';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { buildMetadata, definedTermJsonLd, graph } from '@/lib/seo';
import { getVisibleGlossary, resolveRef } from '@/lib/visibility';

type Params = { params: Promise<{ term: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleGlossary().map((t) => ({ term: t.slug }));
}

const find = (slug: string) => getVisibleGlossary().find((t) => t.slug === slug);

export async function generateMetadata({ params }: Params) {
  const t = find((await params).term);
  if (!t) return {};
  return buildMetadata({
    title: `What is ${t.term}? Explained simply`,
    description: `${t.short} ${t.matters}`,
    path: `/knowledge/glossary/${t.slug}/`,
    review: t.review,
  });
}

export default async function TermPage({ params }: Params) {
  const t = find((await params).term);
  if (!t) notFound();
  const path = `/knowledge/glossary/${t.slug}/`;
  const service = resolveRef(t.service);
  const others = getVisibleGlossary()
    .filter((o) => o.slug !== t.slug)
    .slice(0, 8);
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Knowledge', path: corePages.knowledge.path },
          { name: 'Glossary', path: corePages.glossary.path },
          { name: t.term, path },
        ]}
        eyebrow="Glossary"
        title={`What is ${t.term}?`}
      >
        <p className="term-def">{t.short}</p>
      </PageHero>
      <section className="section">
        <div className="container prose">
          <h2>In everyday words</h2>
          <p>{t.explain}</p>
          <h2>Why it matters for your business</h2>
          <p>{t.matters}</p>
          {service ? (
            <p>
              <Link href={service.href} className="btn btn--primary">
                See: {service.label}
              </Link>
            </p>
          ) : null}
        </div>
      </section>
      {others.length > 0 ? (
        <section className="section section--flush-top">
          <div className="container">
            <SectionHead title="More terms" />
            <ul className="glossary-index">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/knowledge/glossary/${o.slug}/`} className="chip">
                    {o.term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <CTABand title="Rather we handle the tech? We can." where={`term-${t.slug}`} />
      <JsonLd data={graph(definedTermJsonLd(t, path))} />
    </>
  );
}
