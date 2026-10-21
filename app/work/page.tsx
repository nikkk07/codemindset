import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTABand, SectionHead } from '@/components/ui/Blocks';
import { PageHero } from '@/components/ui/PageHero';
import { ProjectCard } from '@/components/work/ProjectCard';
import { corePages } from '@/content/pages';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { getVisibleProjects, isWorkEnabled } from '@/lib/visibility';

const page = corePages.work;
export const metadata = buildMetadata(page);

export default function WorkPage() {
  if (!isWorkEnabled()) notFound();
  const projects = getVisibleProjects();
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Our work', path: page.path }]}
        eyebrow="Our work"
        title="Websites we have built,"
        accent="live today."
        lead={`${site.proof.websitesLive} websites delivered and live: booking platforms, online stores, education and agency sites. Open any of them.`}
      />
      <section className="section">
        <div className="container">
          <div className="proj-grid proj-grid--2">
            {projects.map((p) => (
              <ProjectCard key={p.slug} p={p} detailed />
            ))}
          </div>
          <p className="lead" style={{ marginTop: 32, maxWidth: 720 }}>
            Social ScaleX is our own marketing brand, so we list it as such. This website is ours
            too. More projects are being added as clients agree to be shown.
          </p>
        </div>
      </section>
      <section className="section section--alt" aria-labelledby="similar-title">
        <div className="container">
          <SectionHead
            eyebrow="Want something similar?"
            title="Tell us about your business"
            lead="Tell us your business and goal. You get ideas, similar examples and a fixed quote."
            id="similar-title"
            action={
              <Link href="/contact/" className="btn btn--primary">
                Get a free quote
              </Link>
            }
          />
        </div>
      </section>
      <CTABand where="work" />
    </>
  );
}
