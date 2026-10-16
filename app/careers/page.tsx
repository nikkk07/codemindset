import { ContactLink } from '@/components/ui/ContactLink';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHead } from '@/components/ui/Blocks';
import { teamRoles } from '@/content/home';
import { corePages } from '@/content/pages';
import { site } from '@/content/site';
import { emailHref } from '@/lib/contact';
import { buildMetadata } from '@/lib/seo';

const page = corePages.careers;
export const metadata = buildMetadata(page);

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Careers', path: page.path }]}
        eyebrow="Careers"
        title="Build useful technology"
        accent="for businesses across India."
        lead={`${site.name} brings together designers, developers, AI engineers and specialists who like solving real business problems.`}
      />
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Roles we work with" title="The skills on our team" />
          <ul className="chips">
            {teamRoles.map((r) => (
              <li key={r} className="chip">
                {r}
              </li>
            ))}
          </ul>
          <div className="empty" style={{ marginTop: 32 }}>
            <strong>No open positions are listed right now.</strong>
            <span>
              You’re welcome to send your profile and portfolio; we’ll keep it on file for future
              roles.
            </span>
            <ContactLink
              kind="email"
              where="careers"
              href={`${emailHref}?subject=Careers`}
              className="btn btn--primary btn--sm"
            >
              Email your profile
            </ContactLink>
          </div>
        </div>
      </section>
    </>
  );
}
