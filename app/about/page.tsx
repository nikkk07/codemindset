import Link from 'next/link';
import { BrandDuo } from '@/components/brand/BrandDuo';
import { CTABand, SectionHead } from '@/components/ui/Blocks';
import { CheckIcon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { reasons, teamRoles } from '@/content/home';
import { corePages } from '@/content/pages';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

const page = corePages.about;
export const metadata = buildMetadata(page);

const mindset = [
  { title: 'Understand', text: 'Your business and the problem first, in your words.' },
  { title: 'Plan the steps', text: 'Map the process, people and data before choosing technology.' },
  { title: 'Build in stages', text: 'Working versions early, checked with you at every stage.' },
  { title: 'Measure', text: 'Compare the result with how things worked before.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'About', path: page.path }]}
        eyebrow={`About ${site.name}`}
        title="A website and software company"
        accent="for growing businesses."
        lead={`${site.name} is an Indian website, app and chatbot development company for growing businesses. ${site.proof.websitesLive} websites live, fixed quotes, plain words.`}
      />

      <section className="section" aria-labelledby="brands-title">
        <div className="container">
          <BrandDuo />
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="facts-title">
        <div className="container split">
          <div>
            <SectionHead eyebrow="In short" title="Who we are" id="facts-title" />
            <dl className="facts" style={{ marginTop: 24 }}>
              <div>
                <dt>What we do</dt>
                <dd>
                  Websites, mobile apps, chatbots, CRM and WhatsApp integration, SEO and custom
                  software.
                </dd>
              </div>
              <div>
                <dt>Who we work with</dt>
                <dd>Growing businesses, startups and agencies, anywhere in India.</dd>
              </div>
              <div>
                <dt>Delivered so far</dt>
                <dd>
                  {site.proof.websitesLive} websites live —{' '}
                  <Link href={corePages.work.path}>see some of them</Link>.
                </dd>
              </div>
              <div>
                <dt>How we work</dt>
                <dd>
                  Remotely, by call, WhatsApp and video. Fixed written quotes.{' '}
                  <Link href={corePages.process.path}>Our process</Link>.
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <SectionHead
              eyebrow={site.tagline}
              title={`What “${site.tagline}” means`}
              lead="Clear steps that reliably produce a result, on every project."
              id="mindset-title"
            />
            <ol className="flow" style={{ marginTop: 24, gridTemplateColumns: '1fr 1fr' }}>
              {mindset.map((m) => (
                <li key={m.title}>
                  <strong>{m.title}</strong>
                  <span>{m.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <SectionHead
            eyebrow="Our team"
            title="One team for the whole job"
            lead="Designers, developers and specialists under one roof."
            id="team-title"
          />
          <ul className="inline-links" style={{ marginTop: 20 }}>
            {teamRoles.map((r) => (
              <li key={r}>
                <span className="chip">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="values-title">
        <div className="container">
          <SectionHead eyebrow="Our promises" title="What you can count on" id="values-title" />
          <ul className="reasons" style={{ marginTop: 24 }}>
            {reasons.map((r) => (
              <li key={r.title}>
                <CheckIcon />
                <strong>{r.title}</strong>
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand where="about" />
    </>
  );
}
