import { IntakeForm } from '@/components/contact/IntakeForm';
import { CheckList } from '@/components/ui/Blocks';
import { ContactLink } from '@/components/ui/ContactLink';
import { ChatIcon, MailIcon, PhoneIcon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { callHref, emailHref, whatsappHref } from '@/lib/contact';
import { getServiceOptions } from '@/lib/enquiry/options';
import { buildMetadata } from '@/lib/seo';

const page = corePages.contact;
export const metadata = buildMetadata(page);

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Get a quote', path: page.path }]}
        eyebrow="Get a quote"
        title="Tell us what you need."
        accent="We’ll take it from there."
        lead="Three short steps, no technical words needed. You get a quick reply and a clear, written quote."
      >
        <CheckList items={['Quick reply', 'Fixed written quote', 'Serving all of India']} />
      </PageHero>
      <section className="section">
        <div className="container contact-grid">
          <IntakeForm serviceOptions={getServiceOptions()} />
          <aside className="contact-aside" aria-label="Other ways to reach us">
            <div className="card card--tint">
              <span className="card__title">Prefer to talk?</span>
              <span className="card__text">Call or message us — whichever is easier for you.</span>
              <ContactLink
                kind="call"
                where="contact-aside"
                href={callHref}
                className="btn btn--primary"
              >
                <PhoneIcon /> Call us
              </ContactLink>
              <ContactLink
                kind="whatsapp"
                where="contact-aside"
                href={whatsappHref()}
                className="btn btn--outline"
              >
                <ChatIcon /> WhatsApp us
              </ContactLink>
              <ContactLink
                kind="email"
                where="contact-aside"
                href={emailHref}
                className="btn btn--outline"
              >
                <MailIcon /> Email us
              </ContactLink>
            </div>
            <div className="card">
              <span className="card__title">What happens next</span>
              <ol className="steps" style={{ '--min': '100%' } as React.CSSProperties}>
                {[
                  ['We reply quickly', 'By call, WhatsApp or email — your choice.'],
                  ['A short conversation', 'We understand the goal and ask the right questions.'],
                  ['Your written quote', 'What’s included, what isn’t, the price and the date.'],
                ].map(([t, d], i) => (
                  <li key={t} className="step">
                    <span className="step__n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <strong>{t}</strong>
                    <span>{d}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
