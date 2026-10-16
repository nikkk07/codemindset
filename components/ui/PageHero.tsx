import type { Crumb } from '@/lib/seo';
import { Breadcrumbs } from './Breadcrumbs';

/** Inner-page header: breadcrumbs, eyebrow, H1 (with optional purple accent) and an answer-first lead. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  accent,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  accent?: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <div className="page-hero__body">
          {eyebrow ? <span className="pill pill--white">{eyebrow}</span> : null}
          <h1>
            {title}
            {accent ? (
              <>
                {' '}
                <span>{accent}</span>
              </>
            ) : null}
          </h1>
          {lead ? <p className="lead">{lead}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
