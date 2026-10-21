import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { corePages } from '@/content/pages';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

const page = corePages.terms;
export const metadata = buildMetadata(page);

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Terms of use', path: page.path }]} title="Terms of use" />
      <div className="container section">
        <div className="prose">
          <p className="lead">
            These terms apply to your use of the {site.name} website. Services are provided only
            under a separate written agreement.
          </p>

          <h2>About this website</h2>
          <p>
            The website is operated by {site.legal.entityName ?? site.name}. Its content describes
            our services in general terms. It is not an offer, a quotation or professional advice
            for your specific situation.
          </p>

          <h2>Accuracy and availability</h2>
          <p>
            We aim to keep the content accurate and up to date, but we do not guarantee that it is
            complete or that the website will always be available.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The {site.name} name, logo, text, diagrams and design of this website belong to{' '}
            {site.name} unless stated otherwise. You may share links to pages, but you may not copy
            substantial parts of the website without permission.
          </p>

          <h2>Links to other websites</h2>
          <p>
            We link to other websites, including {site.ownedBrands.socialScalex.name}, a {site.name}
            –owned brand, and to third-party sources. Each website has its own terms and privacy
            practices.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Do not use the website or its forms to send unlawful, abusive or automated content, or
            to try to gain unauthorised access to any system.
          </p>

          <h2>Liability</h2>
          <p>
            To the extent permitted by law, we are not liable for loss arising from reliance on the
            general information on this website. Nothing in these terms limits liability that cannot
            be limited by law.
          </p>

          <h2>Personal data</h2>
          <p>
            How we handle personal data is explained in the{' '}
            <Link href={corePages.privacy.path} className="link">
              privacy notice
            </Link>
            .
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India, and{' '}
            {site.legal.governingJurisdiction
              ? `the courts at ${site.legal.governingJurisdiction}`
              : 'the courts of India'}{' '}
            have jurisdiction.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms:{' '}
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
