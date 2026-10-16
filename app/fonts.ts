import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

/**
 * Fonts are downloaded at build time and self-hosted by Next.js (no requests to Google at runtime).
 * Plus Jakarta Sans: modern geometric UI and headings. Inter: the logo wordmark only.
 * Both SIL Open Font License.
 */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
