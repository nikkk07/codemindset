import { DraftNotice } from '@/components/ui/DraftNotice';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { site } from '@/content/site';
import { showDrafts } from '@/lib/env';
import { buildMetadata } from '@/lib/seo';

const page = corePages.privacy;
export const metadata = buildMetadata(page);

const TBC = (what: string) => <mark className="tbc">[{what}: to be confirmed]</mark>;

export default function PrivacyPage() {
  const entity = site.legal.entityName;
  return (
    <>
      {showDrafts() ? (
        <DraftNotice>
          This privacy notice is a working draft. It needs the legal entity details, retention
          period and service-provider list, and review by a qualified lawyer against the Digital
          Personal Data Protection Act, 2023 and the DPDP Rules, 2025, before publication.
        </DraftNotice>
      ) : null}
      <PageHero crumbs={[{ name: 'Privacy notice', path: page.path }]} title="Privacy notice" />
      <div className="container section">
        <div className="prose">
          <p className="lead">
            This notice explains what personal data the {site.name} website collects, why, and the
            choices you have. It applies to this website and the enquiry form.
          </p>

          <h2>Who we are</h2>
          <p>
            This website is operated by{' '}
            {entity ?? (
              <>
                {site.name} {TBC('registered legal name')}
              </>
            )}
            . For any question about this notice, email{' '}
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Enquiry details you submit:</strong> your name and phone number and/or email
              address, and optionally your company, preferred way to be contacted, timing, the
              service you are interested in and your message. The callback form collects only your
              name, phone number and the service you need.
            </li>
            <li>
              <strong>Technical data:</strong> our hosting provider processes standard request data
              such as IP address, browser type and pages requested, to deliver the website and
              protect it from abuse.
            </li>
            <li>
              <strong>Usage statistics:</strong> aggregated, cookie-free statistics of page views
              and of clicks on contact buttons (call, WhatsApp, email, quote). This website does not
              use advertising or tracking cookies.
            </li>
          </ul>

          <h2>Why we use it</h2>
          <ul>
            <li>
              To reply to your enquiry by phone, WhatsApp or email and discuss possible work with
              you.
            </li>
            <li>To keep the website secure and working.</li>
            <li>To understand, in aggregate, which pages are useful.</li>
          </ul>
          <p>
            We do not sell personal data, and we do not use your enquiry for marketing unless you
            separately agree to it.
          </p>

          <h2>Consent</h2>
          <p>
            When you submit the enquiry form or the callback form, you consent to us using your
            details for the purposes above. You can withdraw your consent at any time by emailing{' '}
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            . Withdrawal does not affect processing that took place before it.
          </p>

          <h2>Who receives it</h2>
          <p>
            Your enquiry is read by the people at {site.name} who handle enquiries. It is processed
            on our behalf by service providers for website hosting and email delivery{' '}
            {TBC('provider list')}. Some of these providers may process data outside India.
          </p>
          <p>
            {site.ownedBrands.socialScalex.name} is a {site.name}–owned brand. We share your enquiry
            with it only if your request concerns marketing or advertising work and you agree.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep enquiry details only as long as needed to respond and, if we work together, for
            the duration of that work and any period required by law {TBC('retention period')}.
          </p>

          <h2>Your rights</h2>
          <p>Under the Digital Personal Data Protection Act, 2023, you can ask us to:</p>
          <ul>
            <li>give you a summary of the personal data we hold about you and how we use it;</li>
            <li>correct, complete, update or erase your personal data;</li>
            <li>respond to a grievance about how we handle your data;</li>
            <li>
              act on the instructions of a person you nominate, in the event of your death or
              incapacity.
            </li>
          </ul>
          <p>
            Email{' '}
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>{' '}
            to make a request. If you are not satisfied with our response, you may complain to the
            Data Protection Board of India.
          </p>

          <h2>Grievance contact</h2>
          <p>
            {site.legal.grievanceOfficer ?? TBC('name of the person responsible for grievances')},
            reachable at{' '}
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>

          <h2>Security</h2>
          <p>
            The website is served over HTTPS, and access to enquiries is limited to the people who
            need it. No method of transmission or storage is completely secure, so please do not
            send passwords or confidential documents through the form.
          </p>

          <h2>Children</h2>
          <p>This website and its enquiry form are intended for adults acting for a business.</p>

          <h2>Changes to this notice</h2>
          <p>
            We will update this page when our practices change. Last updated:{' '}
            {TBC('publication date')}.
          </p>
        </div>
      </div>
    </>
  );
}
