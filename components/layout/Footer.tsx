import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { ContactLink } from '@/components/ui/ContactLink';
import { corePages } from '@/content/pages';
import { site } from '@/content/site';
import { callHref, emailHref, whatsappHref } from '@/lib/contact';
import { getKnowledgeNav } from '@/lib/nav';
import { getVisibleHubs, isWorkEnabled, resolveRef } from '@/lib/visibility';

const YEAR = new Date().getFullYear();
const POPULAR = [
  'ai-automation/whatsapp-chatbots',
  'integrations/crm-integration',
  'website-development/shopify',
  'website-development/wordpress',
  'app-development/flutter',
  'seo-performance/website-maintenance',
];

export function Footer() {
  const hubs = getVisibleHubs();
  const popular = POPULAR.map((r) => resolveRef(r)).filter((x) => x !== null);
  const knowledge = getKnowledgeNav();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <span className="footer__tagline">{site.tagline}</span>
            <p>
              {site.descriptor}. Websites, apps, AI automation, integrations and custom software —
              delivered across India.
            </p>
          </div>
          {hubs.length > 0 ? (
            <div className="footer__col">
              <h2>Services</h2>
              {hubs.map((h) => (
                <Link key={h.slug} href={`/services/${h.slug}/`}>
                  {h.title}
                </Link>
              ))}
            </div>
          ) : null}
          {popular.length > 0 ? (
            <div className="footer__col">
              <h2>Popular</h2>
              {popular.map((p) => (
                <Link key={p.href} href={p.href}>
                  {p.label}
                </Link>
              ))}
            </div>
          ) : null}
          <div className="footer__col">
            <h2>Company</h2>
            <Link href={corePages.about.path}>About</Link>
            {isWorkEnabled() ? <Link href={corePages.work.path}>Work</Link> : null}
            <Link href={corePages.india.path}>Across India</Link>
            <Link href={corePages.industries.path}>Industries</Link>
            <Link href={corePages.knowledge.path}>Knowledge hub</Link>
            {knowledge.map((k) => (
              <Link key={k.href} href={k.href}>
                {k.label}
              </Link>
            ))}
            <Link href={corePages.careers.path}>Careers</Link>
          </div>
          <div className="footer__col">
            <h2>Contact</h2>
            {/* The only place the phone number is written out (owner decision). */}
            <ContactLink kind="call" where="footer" href={callHref}>
              {site.phone.display}
            </ContactLink>
            <ContactLink kind="whatsapp" where="footer" href={whatsappHref()}>
              WhatsApp us
            </ContactLink>
            <ContactLink kind="email" where="footer" href={emailHref}>
              {site.email}
            </ContactLink>
            <Link href={corePages.contact.path}>Get a quote</Link>
            <div className="footer__social">
              <a href={site.social.linkedin} rel="noopener" target="_blank">
                LinkedIn
              </a>
              <a href={site.social.instagram} rel="noopener" target="_blank">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>
            © {YEAR} {site.legal.entityName ?? site.name}. All rights reserved.{' '}
            <a href={site.ownedBrands.socialScalex.url} rel="noopener" target="_blank">
              {site.ownedBrands.socialScalex.name}
            </a>
            , our marketing and advertising brand, is owned by {site.name}.
          </span>
          <nav aria-label="Legal">
            <Link href={corePages.privacy.path}>Privacy</Link>
            <Link href={corePages.terms.path}>Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
