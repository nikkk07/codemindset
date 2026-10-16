# Technical Implementation Spec — Code Mindset Website

Status: DRAFT v1 · 2026-10-15 · Not started. Implementation begins only after the plan's approval gates.

## 1. Stack (pin exact versions at scaffold time; verify then against official docs)

| Layer           | Choice                                                                              | Reason                                                         |
| --------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Framework       | Next.js (App Router, current stable), React, TypeScript `strict`                    | Static generation + server routes; same stack as Social ScaleX |
| Styling         | Tailwind CSS + CSS-variable tokens                                                  | Tokens in one file; no scattered hex values                    |
| Fonts           | `next/font` (self-hosted, subset, `display: swap`)                                  | No layout shift, no third-party font request                   |
| Content         | Typed TS data (`content/*.ts`) + MDX for long-form                                  | No CMS until non-developers need to edit                       |
| Validation      | Zod (one schema shared by client and server)                                        | Same rules on both sides                                       |
| Email delivery  | Transactional email API (Resend recommended; final choice ❓ depends on DNS access) | Needs domain verification (SPF/DKIM)                           |
| Hosting         | Vercel (existing team; **Pro plan required for commercial use** ❓)                 | Same platform as SSX; preview deployments                      |
| Analytics       | Vercel Web Analytics (cookieless) + Google Search Console + Bing Webmaster Tools    | No cookie banner needed at launch                              |
| Package manager | pnpm (lockfile committed)                                                           | Reproducible installs                                          |

## 2. Repository structure

```
app/                     # routes (App Router)
  (site)/page.tsx        # home
  services/page.tsx      # hub
  services/[slug]/page.tsx
  approach/ about/ work/ work/[slug]/ contact/ privacy/ terms/
  api/enquiry/route.ts   # or a server action
  sitemap.ts robots.ts not-found.tsx opengraph-image.tsx
components/ui/           # primitives: Button, Link, Container, Section, Heading, Field, Accordion
components/blocks/       # composed sections: Hero, ServicePaths, ProcessSteps, FAQ, CTA, BrandRelation
content/                 # services.ts, faqs.ts, nav.ts, work/*.mdx, site.ts (single source of facts)
lib/                     # seo.ts (metadata + JSON-LD builders), enquiry/ (schema, spam checks, mailer)
styles/tokens.css
tests/                   # unit (vitest), e2e (playwright), a11y (axe)
docs/
```

`content/site.ts` holds the brand name, SITE_URL, phone, email and social URLs once. Nothing is duplicated anywhere else.

## 3. Content data model (draft)

```ts
type Readiness = 'ready' | 'partner' | 'roadmap';
interface Service {
  slug: string;
  title: string;
  h1: string;
  summary: string;
  readiness: Readiness; // build fails if a page is generated for 'roadmap'
  fits: string[];
  notFits: string[];
  problems: string[];
  deliverables: string[];
  process: { step: string; output: string }[];
  technologies: string[]; // verified only
  limits: string[];
  faqs: FAQ[];
  related: string[];
  cta: CTAKey;
  evidence: string[]; // case-study slugs or labelled demos
  seo: { title: string; description: string };
}
```

**Guardrail:** a build-time check fails if any public service has `readiness: 'roadmap'`, an empty `evidence` list, or a claim missing from the claims register.

## 4. Enquiry form

- **Fields:** name* · email* · phone (required only if "call me back" is ticked) · company · website · service* (taken from Ready/Partner services + "Not sure") · problem/objective* (guidance text, 20–2,000 characters) · budget range (optional; ₹ ranges only if the owner confirms) · timeframe (optional) · privacy acknowledgement* (unticked by default, links to /privacy/). There is no marketing-consent box unless marketing emails are actually sent.
- **Validation:** shared Zod schema; inline errors linked to fields with `aria-describedby`; an error summary that receives focus on submit; server re-validation.
- **Anti-spam:** honeypot field + minimum time-to-submit + Vercel firewall rate limit and bot protection on the route. No CAPTCHA unless spam appears.
- **Delivery:** server sends to `ENQUIRY_TO` (info@codemindset.in) with reply-to set to the sender. Success shows **only** when the provider confirms acceptance. On failure: a truthful error plus the direct email and phone.
- **States:** idle / submitting (button disabled, `aria-busy`) / success (focus moves to the confirmation, explaining what happens next) / error.
- **Data:** no database; enquiry content is not logged in plain text; the minimum fields are collected.
- **Environment variables:** `SITE_URL`, `ENQUIRY_TO`, `ENQUIRY_FROM`, `EMAIL_PROVIDER_API_KEY` (server only). Documented in `.env.example`; no secrets in client code.

## 5. SEO and AI-search accessibility

- One canonical host, `https://www.codemindset.in`. The apex redirects to www (301). Trailing-slash policy: one choice, applied everywhere, matching the canonicals.
- Metadata API: a unique title and description per route, canonical, Open Graph and Twitter tags, and a generated OG image.
- `sitemap.ts` lists only indexable routes. `robots.ts`: allow all; `Sitemap:` line; explicitly allow `OAI-SearchBot`; **`GPTBot` rule pending the owner's decision (L6)**, implemented as a single config flag. No llms.txt for ranking purposes.
- Preview deployments are `noindex` (Vercel default protection plus an `X-Robots-Tag` header on non-production).
- **JSON-LD:**
  - `Organization` (name "Code Mindset", url, logo, email, telephone, `sameAs` = LinkedIn + Instagram only, `subOrganization` → Social ScaleX `Organization` with its URL), on the home and about pages.
  - `WebSite`.
  - `BreadcrumbList` on every page below the top level.
  - `Service` on service pages, only with fields that match the visible text.
  - `FAQPage` markup is **not** used for rich-result purposes (Google restricts FAQ rich results); FAQs are plain HTML.
  - No `LocalBusiness` without a verified address. No Review/AggregateRating.
- Infrastructure check before launch: firewall, bot protection and WAF must not block Googlebot, Bingbot or OAI-SearchBot (verify against logs and the providers' published IP lists).

## 6. Accessibility (WCAG 2.2 AA target)

Landmarks, a skip link, one H1 per page, logical heading order, visible focus (≥3:1), target size ≥24×24 px, labelled fields, accessible error messages, a keyboard-operable menu (focus trap only while open, Esc to close), `prefers-reduced-motion` respected, reflow at 320 px and 400% zoom, contrast tokens checked (text ≥4.5:1, large text and UI ≥3:1).

## 7. Performance budgets (lab gates; field data confirmed after launch)

LCP ≤2.5 s, CLS ≤0.1, INP ≤200 ms (field), total blocking time ≤200 ms (lab, mobile profile). First-load JS on content pages ≤100 KB gzipped (target). No client components unless they're interactive. Images are AVIF/WebP with explicit dimensions. No third-party scripts at launch.

## 8. Security headers

HSTS (preload after verification), a CSP with nonces (no inline scripts), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` minimal, `frame-ancestors 'none'`. Dependency audit runs in CI.

## 9. Testing matrix

| Check         | Tool                                                                                                                                     | Gate                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Lint / format | ESLint, Prettier                                                                                                                         | CI fail                              |
| Types         | `tsc --noEmit`                                                                                                                           | CI fail                              |
| Unit          | Vitest (form schema, spam checks, SEO builders, readiness guardrail)                                                                     | CI fail                              |
| E2E           | Playwright: navigation, mobile menu, breadcrumbs, form (all 4 states, mocked and real provider), tel/mailto links, 404                   | CI fail                              |
| Accessibility | @axe-core/playwright on every route + a manual keyboard pass                                                                             | CI fail on serious/critical          |
| Performance   | Lighthouse CI on key routes (mobile)                                                                                                     | Budget fail                          |
| Links         | Internal crawler + external link check                                                                                                   | CI fail (internal) / warn (external) |
| SEO           | Unique titles/descriptions, canonicals, robots, sitemap, status codes, structured-data validation (Rich Results Test / Schema validator) | Pre-launch checklist                 |
| Visual        | Screenshots at 360 / 390 / 430 / 768 / 1280 / 1440 px                                                                                    | Manual review                        |

## 10. Launch prerequisites (owner / external)

Domain DNS access · email hosting confirmed · SPF/DKIM/DMARC records · Vercel Pro · transactional email domain verified · Search Console + Bing verified · privacy notice reviewed by a lawyer (DPDP) · capability matrix and claims register approved.
