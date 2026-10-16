import type { NextConfig } from 'next';
import { getSiteEnv } from './lib/env';

const siteEnv = getSiteEnv();
const isProd = siteEnv === 'production';
const isDev = process.env.NODE_ENV === 'development';

/**
 * Content Security Policy.
 * Next.js inlines small bootstrap scripts, so script-src needs 'unsafe-inline' unless every page is
 * rendered dynamically with nonces. A static marketing site with no third-party scripts and no
 * user-generated HTML keeps the other directives strict instead (see docs/technical-spec.md §8).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}${isProd ? '' : ' https://vercel.live'}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isProd ? '' : ' https://vercel.live wss://ws-us3.pusher.com'}`,
  `frame-src ${isProd ? "'none'" : 'https://vercel.live'}`,
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  ...(isProd
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }]
    : []),
  // Non-production deployments must never be indexed.
  ...(isProd ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]),
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
