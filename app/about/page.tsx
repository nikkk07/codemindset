import Link from 'next/link';
import { CTABand, SectionHead, Steps } from '@/components/ui/Blocks';
import { PageHero } from '@/components/ui/PageHero';
import { commitments, steps, teamRoles } from '@/content/home';
import { corePages } from '@/content/pages';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

const page = corePages.about;
export const metadata = buildMetadata(page);

const mindset = [
  {
    title: 'Understand',
    text: 'The business problem first, in your words — and what a good result looks like.',
  },
  {
    title: 'Design the logic',
    text: 'Map the process, people and data before choosing any technology.',
  },
  { title: 'Build in steps', text: 'Working software early, checked at every stage.' },
  { title: 'Measure', text: 'Compare the result with how things worked before.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'About', path: page.path }]}
        eyebrow="About CodeMindset"
        title="An Indian IT services company built on one idea:"
        accent="Think in Algorithm."
        lead={`${site.name} builds websites, mobile apps, AI chatbots, automation, integrations and custom software for businesses across India. Our team covers every skill a project needs — so you deal with one company, from first call to long-term support.`}
      />

      <section className="section" aria-labelledby="mindset-title">
        <div className="container">
          <SectionHead
            eyebrow={site.tagline}
            title={`What “${site.tagline}” means for you`}
            lead="An algorithm is simply a clear set of steps that reliably produces a result. We bring that thinking to every project."
            id="mindset-title"
          />
          <Steps items={mindset} />
        </div>
      </section>

      <section className="section section--flush-top" aria-label="Team and coverage">
        <div className="container duo">
          <div className="duo__card duo__card--dark">
            <p className="eyebrow">Our team</p>
            <h2>Professionals across every major technology</h2>
            <ul className="chips">
              {teamRoles.map((r) => (
                <li key={r} className="chip chip--dark">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="duo__card duo__card--tint">
            <p className="eyebrow">Across India</p>
            <h2>Serving every state and union territory</h2>
            <p>We work remotely by call, WhatsApp and video, so location is never a barrier.</p>
            <Link
              href={corePages.india.path}
              className="btn btn--primary"
              style={{ alignSelf: 'flex-start' }}
            >
              See where we work
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="values-title">
        <div className="container">
          <SectionHead eyebrow="How we work with you" title="Our commitments" id="values-title" />
          <ul className="values">
            {commitments.map((c) => (
              <li key={c.title}>
                <strong>{c.title}</strong>
                <span>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <SectionHead eyebrow="Process" title="From first message to launch" id="process-title" />
          <Steps items={steps} />
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="ssx-title">
        <div className="container">
          <div className="honest">
            <div>
              <p className="eyebrow">Our family of brands</p>
              <h2 id="ssx-title">Need marketing too?</h2>
              <p className="lead">
                <a href={site.ownedBrands.socialScalex.url} rel="noopener" target="_blank">
                  {site.ownedBrands.socialScalex.name}
                </a>{' '}
                is a {site.name}-owned brand for marketing and advertising. On joint projects,
                Social ScaleX owns the marketing strategy; {site.name} owns the engineering and
                integrations.
              </p>
            </div>
            <ul className="honest__list">
              <li>
                <strong>{site.ownedBrands.socialScalex.name}</strong>
                <span>Campaigns, content and social media that bring the right people in.</span>
              </li>
              <li>
                <strong>{site.name}</strong>
                <span>
                  Websites, CRM, automation and software that turn enquiries into handled work.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CTABand where="about" />
    </>
  );
}
