import Link from 'next/link';
import { LogoMark } from '@/components/brand/Logo';
import { site } from '@/content/site';

/**
 * CodeMindset builds; Social ScaleX (our own marketing agency) grows. Shown as two connected
 * cards so the relationship is understood at a glance.
 */
export function BrandDuo({ headingId = 'brands-title' }: { headingId?: string }) {
  const ssx = site.ownedBrands.socialScalex;
  return (
    <div className="brands">
      <div className="brands__head">
        <p className="kicker">Website + marketing, one family</p>
        <h2 id={headingId}>We build it. Our sister agency brings the customers.</h2>
        <p className="lead">
          {site.name} builds your website, app or chatbot. {ssx.name}, our own social media
          marketing agency, brings people to it. One plan, one team.
        </p>
      </div>
      <div className="brands__pair">
        <div className="brand-card brand-card--cm">
          <span className="brand-card__logo">
            <LogoMark className="brand-card__mark" /> {site.name}
          </span>
          <strong>Builds your business online</strong>
          <ul>
            <li>Websites and online stores</li>
            <li>Mobile apps</li>
            <li>WhatsApp and AI chatbots</li>
            <li>CRM, automation and SEO</li>
          </ul>
          <Link href="/contact/" className="brand-card__link">
            Get a free quote →
          </Link>
        </div>
        <span className="brands__plus" aria-hidden="true">
          +
        </span>
        <div className="brand-card brand-card--ssx">
          <span className="brand-card__logo brand-card__logo--ssx">{ssx.name}</span>
          <strong>Brings people to it</strong>
          <ul>
            <li>Instagram and Facebook management</li>
            <li>Reels and video shoots</li>
            <li>Meta Ads and Google Ads</li>
            <li>Reports from your own dashboards</li>
          </ul>
          <a href={ssx.url} className="brand-card__link" target="_blank" rel="noopener">
            Visit socialscalex.in ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
