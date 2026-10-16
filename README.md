# CodeMindset website

The website for **CodeMindset** (https://www.codemindset.in), an Indian IT services company — _Think in Algorithm_.

Built with Next.js (App Router), React and TypeScript (strict), with hand-written CSS (design tokens in `app/styles/tokens.css`). Every page is static HTML; the enquiry and callback forms use a server action.

## Quick start

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

Fonts (Plus Jakarta Sans, Inter for the logo) are fetched at build time by `next/font/google` and self-hosted — no requests to Google from visitors' browsers. Brand images (favicon, app icon, logo PNG, social image) are committed; regenerate them only if the logo changes with `npm run brand` (needs the Inter font installed locally).

| Command                                                                | What it does                                                                           |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `npm run verify`                                                       | Formatting check, lint, type check, unit tests and production build                    |
| `npm test`                                                             | Unit tests (Vitest)                                                                    |
| `npm run build && npx playwright install chromium && npm run test:e2e` | End-to-end, accessibility, link, SEO and responsive tests against the production build |
| `npm run lighthouse -- <url>`                                          | Lighthouse on key pages against a running build                                        |
| `npm run check:launch`                                                 | The **launch gate**: lists everything that must be confirmed before production         |

CI (`.github/workflows/ci.yml`) runs all of this on every push.

## Site structure

```
/                                   Home: hook, "What do you need?" tiles, problems, all services, how it works,
                                    industries, team + India, honest version, FAQ, callback form
/services/                          All services
/services/<hub>/                    7 hubs, plain words first, then "going deeper"
/services/<hub>/<page>/             ~60 platform pages (WordPress, Flutter, Zoho…) and need pages (E-commerce, Chatbots…)
/services/<hub>/how-to-choose/      7 interactive "help me choose" guides
/industries/ and /industries/<x>/   Education, B2B services, Retail & e-commerce, Healthcare
/india/ and /india/<state>/         All 28 states + 8 union territories (state pages publish only with unique local content)
/knowledge/                         Knowledge hub → /knowledge/guides/, /knowledge/blog/, /knowledge/glossary/<term>/
/about/ /work/ /careers/ /contact/ /privacy/ /terms/
/llms.txt  /sitemap.xml  /robots.txt
```

Top menu: **Services ▾** (mega-menu) · **Industries ▾** · Work · Knowledge · About · Call us · **Get a quote**. Phones get a fixed **Call · WhatsApp · Get a quote** bar.

## How content is controlled

All copy lives in typed files in `content/` (no CMS):

| File                    | Holds                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `content/site.ts`       | Brand and contact facts, legal details (`null` = not confirmed), AI-crawler decision |
| `content/services.ts`   | 7 hubs → platform and need pages → guides. Each has `readiness` and `review`.        |
| `content/industries.ts` | Industry pages                                                                       |
| `content/regions.ts`    | States and union territories; `local` holds each page's unique content               |
| `content/knowledge.ts`  | Blog articles (add yours here) and the plain-language glossary                       |
| `content/home.ts`       | Home page problems, steps, team roles, commitments, FAQ                              |
| `content/pages.ts`      | Core pages and their review status                                                   |
| `content/claims.ts`     | The claims register                                                                  |
| `content/work.ts`       | Case studies (only with client permission)                                           |

### Adding a blog article

Add an entry to `articles` in `content/knowledge.ts` (title, description, category, date, body blocks) and set `review: 'approved'` when it's ready. It then appears in the blog, the knowledge hub, the sitemap and `llms.txt`.

### Publishing rules (enforced in code)

- Anything appears in **production** only when `review: 'approved'` (and, for services, `readiness` is `'ready'` or `'partner'`). Hidden pages are left out of menus, footer, sitemap, `llms.txt` and form options, and return 404. Links to hidden pages are never rendered.
- A state page needs approved, unique local content in `content/regions.ts` — template-only location pages are thin content and are never published.
- In preview and development everything is shown with a **Draft for review** notice, and nothing is indexable (`robots.txt` disallows all, `X-Robots-Tag: noindex`, `noindex` meta).

### Owner presentation rules (tested)

- The phone number is written out **only in the footer**; everywhere else it's "Call us".
- The site presents a company: no personal names, no language tags.
- No prices or timelines are shown; copy promises quick replies, a fixed written quote and fast delivery.

## Environment

| Variable        | Where            | Purpose                                                                              |
| --------------- | ---------------- | ------------------------------------------------------------------------------------ |
| `SITE_ENV`      | optional         | `production` / `preview` / `development`. Only `production` is indexable.            |
| `EMAIL_API_KEY` | server           | Transactional email API key (Resend)                                                 |
| `EMAIL_API_URL` | server, optional | Overrides the email API endpoint (used by tests)                                     |
| `ENQUIRY_TO`    | server           | Address that receives enquiries: `info@codemindset.in`                               |
| `ENQUIRY_FROM`  | server           | A verified sender on the domain, e.g. `CodeMindset website <website@codemindset.in>` |

Forms show success **only** when the email provider accepts the message; otherwise they keep the answers and offer Call, WhatsApp and email.

## Deployment (Vercel)

1. Import this repository into Vercel (Next.js preset). Commercial sites need the Pro plan.
2. **While copy is still draft**, set `SITE_ENV=preview` for the Production environment, so the live domain shows the full site but stays `noindex`. Remove it only when `npm run check:launch` passes.
3. Set the email variables for Production (and Preview if you want real delivery there).
4. Email: verify `codemindset.in` with the provider (SPF + DKIM) and add DMARC.
5. Domain: `www.codemindset.in` primary; redirect the bare domain to it (308).
6. Firewall: rate-limit `POST` to `/contact/` and `/` (e.g. 5/min per IP); don't block Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot or PerplexityBot.
7. Enable Vercel Web Analytics — contact clicks are recorded as `contact_click` events (`kind`: call, whatsapp, email; `where`: the button's location).
8. After launch: Google Search Console + Bing Webmaster Tools, submit `/sitemap.xml`; create a Google Business Profile (service-area business, India).

## Project structure

```
app/            routes, metadata, robots, sitemap, llms.txt, icons, fonts, server action, styles
components/     brand, layout (header, mega-menu, mobile menu, footer, action bar), ui, services, contact forms
content/        all copy and facts (single source of truth)
lib/            environment, visibility rules, nav, SEO/JSON-LD, sitemap, contact links, enquiry pipeline
scripts/        brand asset generator, launch gate, Lighthouse runner
tests/          unit (Vitest) and end-to-end (Playwright + axe)
docs/           plan, capability matrix, content framework, technical spec, research, launch checklist
```
