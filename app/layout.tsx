import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { ActionBar } from '@/components/layout/ActionBar';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/ui/JsonLd';
import { site } from '@/content/site';
import { isProduction } from '@/lib/env';
import { graph, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import { inter, jakarta } from './fonts';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/home.css';
import './styles/pages.css';
import './styles/forms.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.language} className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ActionBar />
        <JsonLd data={graph(organizationJsonLd(), websiteJsonLd())} />
        {isProduction() ? <Analytics /> : null}
      </body>
    </html>
  );
}
