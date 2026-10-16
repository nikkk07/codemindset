import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTABand, ContactBand, FAQSection, SectionHead } from '@/components/ui/Blocks';
import { PageHero } from '@/components/ui/PageHero';
import { buildMetadata } from '@/lib/seo';
import { getIndustry, getVisibleIndustries, resolveRef } from '@/lib/visibility';

type Params = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleIndustries().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params) {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return buildMetadata({ ...i.seo, path: `/industries/${i.slug}/`, review: i.review });
}

export default async function IndustryPage({ params }: Params) {
  const i = getIndustry((await params).slug);
  if (!i) notFound();
  const whatsapp = `Hi CodeMindset, I run a business in the ${i.name} sector and need help with technology.`;
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Industries', path: '/industries/' },
          { name: i.name, path: `/industries/${i.slug}/` },
        ]}
        eyebrow={i.name}
        title={i.h1}
        lead={i.intro}
      />
      <section className="section" aria-labelledby="ind-problems">
        <div className="container">
          <SectionHead eyebrow="Sound familiar?" title="Problems we solve" id="ind-problems" />
          <div className="grid" style={{ '--min': '280px' } as React.CSSProperties}>
            {i.problems.map((p) => {
              const link = resolveRef(p.link);
              return (
                <article key={p.problem} className="problem">
                  <span className="problem__label">The problem</span>
                  <p className="problem__quote">“{p.problem}”</p>
                  <hr />
                  <span className="problem__label problem__label--fix">The fix</span>
                  <p>{p.fix}</p>
                  {link ? (
                    <Link href={link.href} className="link-arrow">
                      {link.label}
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section section--flush-top">
        <div className="container">
          <ContactBand where={`industry-${i.slug}`} whatsapp={whatsapp} />
        </div>
      </section>
      <FAQSection
        title={`${i.name}: common questions`}
        items={i.faqs}
        where={i.slug}
        whatsapp={whatsapp}
      />
      <CTABand where={`industry-${i.slug}-end`} whatsapp={whatsapp} />
    </>
  );
}
