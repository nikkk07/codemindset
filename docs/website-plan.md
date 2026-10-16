# Code Mindset Website — Plan v4

Status: BUILD COMPLETE (draft content), awaiting first CI run and owner approvals · updated 2026-10-15
Companion docs added: `launch-checklist.md` · `implementation-notes.md` · project `README.md`
Companion docs: `capability-matrix.md` (🔴 needs owner input) · `content-framework.md` · `technical-spec.md`
Legend: ✅ confirmed by owner · 🔎 verified by research · ❓ unverified / awaiting owner · 💡 recommendation

---

## 1. Confirmed decisions (owner, 2026-10-15)

| #    | Decision                                                                                                                                                                                                                                                                                                |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅1  | Official brand name: **Code Mindset**                                                                                                                                                                                                                                                                   |
| ✅2  | Website: **https://www.codemindset.in**. Contact email info@codemindset.in is on the same domain, so the earlier "codmindset" spelling was a typo.                                                                                                                                                      |
| ✅3  | Tagline: **Think in Algorithms**                                                                                                                                                                                                                                                                        |
| ✅4  | Logo: **redesign from scratch**. The supplied SVGs are **references only**; their colours, typography and geometry are not mandatory. The visual identity is chosen to fit the overall website strategy, as one consistent, professional brand system.                                                  |
| ✅5  | Code Mindset **owns** Social ScaleX. Both brands stay distinct and the ownership is disclosed transparently.                                                                                                                                                                                            |
| ✅6  | **Code Mindset owns technical delivery:** software development, web applications, AI engineering, custom automation development, APIs, backend systems, third-party integrations, technical infrastructure, technical SEO implementation and application maintenance, _subject to verified capability_. |
| ✅7  | **Social ScaleX owns marketing and advertising:** marketing strategy, social media management, paid advertising, creative production, marketing-led content, campaign management and marketing performance.                                                                                             |
| ✅7a | **Joint projects:** Social ScaleX owns the marketing strategy and campaign objectives; Code Mindset owns the technical engineering and integrations. Accountability stays clear, with no overlapping offers and no conflicting client communication.                                                    |
| ✅7b | Ownership is disclosed on **both** websites, with contextual, useful cross-links.                                                                                                                                                                                                                       |
| ✅8  | Reciprocal links only where they are useful in context. They are not treated as a ranking technique.                                                                                                                                                                                                    |
| ✅   | Contact person Nikhil Bisht · phone 8077727669 · info@codemindset.in · LinkedIn /company/codemindset-ai/ · Instagram @codemindset.ai                                                                                                                                                                    |

### 1a. Handoff table (✅ follows the confirmed split)

| Area                                                                                                                                                                                       | Code Mindset (technical delivery)                                                                                                 | Social ScaleX (marketing)                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| SEO                                                                                                                                                                                        | Technical SEO implementation: crawlability, indexation, performance, structured data, architecture, migrations, AI-crawler access | Marketing-led SEO: keyword and content strategy, content, campaigns, digital PR               |
| Websites                                                                                                                                                                                   | Design, build, hosting, security, maintenance                                                                                     | Campaign objectives, landing-page messaging, creative                                         |
| Analytics                                                                                                                                                                                  | Tracking implementation and integrations (events, conversion APIs, dashboards)                                                    | Campaign measurement, reporting and optimisation                                              |
| Automation                                                                                                                                                                                 | Custom automation development and system integrations                                                                             | Marketing automations offered as part of campaigns or social management (existing SSX offers) |
| Joint client                                                                                                                                                                               | Engineering and integrations                                                                                                      | Strategy and campaign objectives                                                              |
| 💡 Operating suggestion (not a decision): name one client-facing lead per joint engagement, plus a short responsibilities note in the proposal, so the client gets one consistent channel. |

### 1b. Logo references

`docs/brand/reference/*.svg` are kept **as references only**. The new identity will be produced in step 3 (design system), within the approval gate.

---

## 2. Research findings (2026-10-15)

### 2.1 Buyer research: Indian MSMEs (supporting context only, not proof of demand)

Public-use eligibility for each statistic is in `content-framework.md` §6. CMR wording was verified verbatim on 2026-10-15. An inconsistency was found: "over 400" respondents can't produce the stated ±3% margin (about ±4.9% at n=400). Commissioning isn't disclosed and the release promotes Vi's programme. → Internal planning use by default.

| Finding                                                                                                                                                                                                                                  | Source                                                                                                            | Effect on the site                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Top adoption barriers: **unclear value or relevance 84%**, **data-security concerns 81%**, limited skills 56%. 62% actively seek digital advisory. 59% use LinkedIn, X and WhatsApp for business learning. (n≈400, pan-India, June 2025) | 🔎 CMR study (cmrindia.com, 24 Jun 2025). It is tied to the Vi Business programme, so treat it as directional.    | Lead with plain-language value and examples of problems. Give data and credential handling its own visible section. Offer an advisory-style entry point (assessment). Make LinkedIn the primary distribution channel. |
| Only **12%** of MSMEs are fully digitally mature. Limited financial capacity leads to **phased adoption**. There is a gap in advisory support, and fragmentation is highest in micro and small firms.                                    | 🔎 Vi Business MSME Growth Insights 2025, via Voice&Data, 27 Jun 2025. Method not disclosed, so directional only. | Offer phased, fixed-scope first engagements, then expand. Don't sell "transformation".                                                                                                                                |
| Buyers check portfolio, detailed case studies, references, process, IP ownership, security, a dedicated contact person, and scope clarity. Red flags: vague pricing or process, unrealistic promises, pressure to sign.                  | 🔎 MobiDev buyer guide                                                                                            | Service pages and /approach/ answer each of these explicitly. No urgency tactics.                                                                                                                                     |

### 2.2 Competitor landscape (3 tiers)

| Tier                                            | Examples reviewed                                                                                                            | What they do                                                                                                                                                                                                                                                                          | What it means for Code Mindset                                                                                                                                                                                       |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Large and mid-size engineering firms            | 🔎 Appinventiv (Noida), Simform, Codewave                                                                                    | 30+ services and around 30 industries in a mega-menu. Trust from client logos, ISO 27001/CMMI, partner badges (AWS, OpenAI, Anthropic), awards, case studies with metric headlines. CTA: "Book a consultation". Codewave sells outcome-based pricing and "direct access to builders". | We can't match their trust signals at launch, so we don't imitate them. We win on focus, specificity and transparency. Outcome framing and builder access are now common claims, so they help only if we prove them. |
| Micro AI/automation agencies (2–9 people)       | 🔎 9nocAI (2024, $25–49/hr, $1k minimum, no reviews), Automated Codes (Delhi, 2026, <$25/hr, "72-hour websites", no reviews) | Generic service lists, an even spread across around 10 industries, speed and price claims, no evidence.                                                                                                                                                                               | This is the most crowded tier. To stand out: real evidence, clear scope and acceptance criteria, honest limits, and accountable maintenance.                                                                         |
| Alternatives to hiring us                       | SaaS (Zoho and others), WhatsApp-CRM products for MSMEs (e.g. Squarebox), freelancers, no-code                               | Cheaper off-the-shelf options                                                                                                                                                                                                                                                         | 💡 Publish honest build-versus-buy guidance, including saying when SaaS is the better choice. That builds trust and filters out leads that don't fit.                                                                |
| Large IT (Infosys, Wipro, Accenture and others) | Not re-fetched this session (stopped by owner)                                                                               | Enterprise-scale catalogues                                                                                                                                                                                                                                                           | Not a direct competitor for SME buyers. No further research is needed.                                                                                                                                               |

### 2.3 Strategic insight

💡 Code Mindset's most defensible advantage is **owned access to SME buyers through Social ScaleX**. Those clients already trust the group and often need websites, tracking, automation and integrations next. Micro agencies and large firms don't have this route.
❓ That depends on how many SSX clients actually have technical needs. Validate it by asking 5–10 current clients, not by assuming.

### 2.4 Segment scoring (transparent; 1 = weak, 5 = strong)

Criteria marked ❓ depend on team capability, which isn't confirmed, so they are **left unscored**.

| Segment                                                                                                                                                                                                                                            | Urgency | Access to decision-makers | Ability to pay | Repeat/maintenance potential | Case-study potential | Data/regulatory risk (5 = low) | Technical fit ❓ | Market subtotal /30 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------- | -------------- | ---------------------------- | -------------------- | ------------------------------ | ---------------- | ------------------- |
| Existing and adjacent SSX clients (local SMEs)                                                                                                                                                                                                     | 3       | **5**                     | 2              | 4                            | 4                    | 5                              | ❓               | 23                  |
| B2B service firms (agencies, consultancies, professional services)                                                                                                                                                                                 | 4       | 3                         | 4              | 4                            | 4                    | 4                              | ❓               | 23                  |
| Education and training institutes                                                                                                                                                                                                                  | 4       | 3                         | 3              | 4                            | 4                    | 3                              | ❓               | 21                  |
| D2C / e-commerce                                                                                                                                                                                                                                   | 4       | 3                         | 3              | 4                            | 3                    | 4                              | ❓               | 21                  |
| Healthcare                                                                                                                                                                                                                                         | 3       | 2                         | 4              | 4                            | 2                    | **1**                          | ❓               | 16                  |
| Finance / regulated                                                                                                                                                                                                                                | 3       | 1                         | 5              | 4                            | 1                    | **1**                          | ❓               | 15                  |
| These scores are judgment-based hypotheses from the research above, not market data.                                                                                                                                                               |
| 💡 Launch focus: **SMEs and B2B service firms in India** (entry through SSX clients). Education is the first vertical to test, once a real project exists. Healthcare and finance are deferred because of data-protection and regulatory exposure. |

---

## 3. Refined service catalogue (internal; readiness ❓ until `capability-matrix.md` is confirmed)

No service is published because a competitor lists it. A public page requires Ready/Partner status + substance + evidence (public-page rule in the capability matrix).

| Category                                               | Candidate services                                                                                                              | Proposed launch role                                                               | Readiness |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------- |
| A. Websites and web applications                       | Business websites, custom web apps, portals, e-commerce builds, UX/UI                                                           | **Lead page**                                                                      | ❓        |
| B. Business automation and practical AI                | Workflow automation, CRM/WhatsApp-API automations, document extraction, internal knowledge assistants (RAG) with human approval | **Lead page**                                                                      | ❓        |
| C. Integrations and custom business software           | API integrations, CRM, payments, data sync, internal tools, simple dashboards                                                   | **Lead page**                                                                      | ❓        |
| D. Technical SEO and site performance                  | Technical audits, Core Web Vitals, structured data, migrations, AI-crawler access                                               | **Lead page** (technical scope only, per ✅)                                       | ❓        |
| E. Care and maintenance                                | Updates, monitoring, backups, fixes, small improvements (retainer)                                                              | Section on the Approach page plus a CTA. Its own page only if it's a priced offer. | ❓        |
| F. Technical assessment / discovery                    | Fixed-scope review that produces a written recommendation                                                                       | Entry offer on all pages. Free or paid is ❓.                                      | ❓        |
| Mobile apps (native or cross-platform)                 | —                                                                                                                               | Exclude unless confirmed Ready                                                     | ❓        |
| Cloud migration / DevOps / IaC                         | —                                                                                                                               | Mention as part of builds only; no page                                            | ❓        |
| Data engineering, BI, predictive ML, MLOps             | —                                                                                                                               | Roadmap                                                                            | ❓        |
| Cybersecurity testing, SOC, incident response          | —                                                                                                                               | **Exclude** (needs qualifications)                                                 | —         |
| ERP implementation, staff augmentation, fractional CTO | —                                                                                                                               | Exclude at launch                                                                  | ❓        |
| Industry pages                                         | —                                                                                                                               | None at launch                                                                     | —         |

💡 **Recommended public launch portfolio: A, B, C, D as service pages, E + F as engagement models.** This stays provisional until §5-B1 is answered.

---

## 4. Architecture (unchanged from v1 unless noted)

- Next.js App Router, TypeScript strict, static generation. Tailwind with CSS-variable design tokens. next/font (self-hosted). Typed content files plus MDX; no CMS at launch.
- Contact form: shared Zod schema → server route → honeypot + time-trap + Vercel bot/rate protection → email to info@codemindset.in via a transactional provider (needs DNS verification). No lead database at launch.
- SEO: Metadata API, one SITE_URL = https://www.codemindset.in, sitemap/robots, JSON-LD (Organization, WebSite, BreadcrumbList, Service where it matches visible text; FAQs as plain HTML; see technical-spec.md §5). OAI-SearchBot allowed; GPTBot ❓.
- Organization schema: name "Code Mindset". `sameAs` = LinkedIn and Instagram only (never SSX). Social ScaleX is linked in page content and could be modelled as `subOrganization` (💡; it reflects ownership accurately).
- Analytics: Vercel Web Analytics (cookieless), Search Console, Bing Webmaster Tools.
- QA gates: ESLint, tsc, unit tests, Playwright, axe-core, Lighthouse CI, link checker, schema validation, screenshots at 360–1440 px.
- Hosting: Vercel (same team as SSX). Pro plan needed for commercial use ❓.

### Draft information architecture (v2)

`/` · `/services/` · `/services/websites-web-apps/` · `/services/automation-ai/` · `/services/integrations-software/` · `/services/technical-seo/` · `/approach/` (process, assessment, maintenance, data handling, IP ownership) · `/work/` (only with real, permitted projects) · `/about/` (incl. Our brands → Social ScaleX) · `/contact/` · `/privacy/` · `/terms/` · 404.
Slugs are provisional and get finalised after the search-intent mapping.

---

## 5. Open items (prioritised)

### 🔴 Blocks final service selection, and therefore design and development

- **B1. Delivery capability:** complete `capability-matrix.md` (team, per-service status, project permissions). Nothing else blocks the start of step 2.

### 🟠 Blocks launch only (can be answered during the build)

- L1. Legal entity: registered name and type; public address or "Delhi NCR"; GSTIN display; grievance contact for privacy.
- L2. Domain and email: registrar, who controls DNS, provider hosting info@codemindset.in, and whether it works today.
- L3. Vercel: new project in the existing team? Is the team on Pro?
- L4. Assessment free or paid · WhatsApp on 8077727669 shown? · budget ranges in ₹ or none.
- L5. GPTBot (AI training): allow or block?
- L6. Approval to edit the Social ScaleX site for the reciprocal ownership disclosure.

### 🟢 After launch

Insights author identity · industry pages · directory profiles (Clutch/GoodFirms) once real reviews exist · Google Keyword Planner access via an Ads account (optional) · social-handle naming · schema `alternateName`.

### Resolved (do not reopen)

Brand name, domain, tagline, logo approach, Code Mindset/Social ScaleX responsibility split, joint-project ownership.

---

## 6. Workflow and approval gates (✋ = owner approval)

0 Decisions ✅ (except capability) → 1 Research ✅ · content framework ✅ draft · technical spec ✅ draft → 2 Capability confirmation 🔴 → positioning + final IA + search-intent map ✋ → 3 Logo + design system + homepage design ✋ → 4 Repository, CI and Vercel preview → 5 Content → 6 Contact pipeline (tested against the real inbox) → 7 SEO/schema/crawler checks → 8 Full QA, fix, retest (`docs/launch-checklist.md`) → 9 Preview review ✋ → domain, DNS, SPF/DKIM/DMARC, Search Console, Bing → launch → 10 Post-launch measurement.

## 7. Sources

- CMR MSME Digital Readiness Study (24 Jun 2025): https://cmrindia.com/67-of-msmes-demonstrate-digital-readiness-across-core-and-advanced-technologies-finds-cmr-study/
- Vi MSME Growth Insights 2025 (Voice&Data, 27 Jun 2025): https://www.voicendata.com/research/indias-msmes-embrace-digital-future-but-fragmented-adoption-persists-9442244
- MobiDev buyer guide: https://mobidev.biz/blog/how-to-choose-a-software-development-company
- Appinventiv https://appinventiv.com/ · Simform https://www.simform.com/ · Codewave https://codewave.com/
- 9nocAI (Clutch) https://clutch.co/profile/9nocai · Automated Codes (GoodFirms) https://www.goodfirms.co/company/automated-codes
- Squarebox (CXOToday): https://cxotoday.com/corner-office/squarebox-building-the-ai-powered-whatsapp-crm-for-indias-msmes/
- Social ScaleX https://www.socialscalex.in/
- Google AI features (updated 2025-12-10): https://developers.google.com/search/docs/appearance/ai-features
- OpenAI crawlers: https://developers.openai.com/api/docs/bots
- Bing Topics Portfolio beta (13 Oct 2026): https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/

---

## 8. Build status (2026-10-15)

- ✅ Owner approved the design direction: ink + signal-teal palette, Instrument Sans + JetBrains Mono, path-C logo, light theme with a dark hero and footer, enquiries in English and Hindi.
- ✅ Owner changed the priority: build first; the capability matrix now limits only what is _published_.
- ✅ The full site is implemented in this folder (see README.md). Draft services and pages show only outside production.
- ⚠️ Not yet installed or built in a real environment. The session's network blocked the npm registry, so these were run instead:
  - syntax check of every file;
  - a render test of every page in preview and production modes;
  - the 32 unit tests;
  - the launch gate;
  - the mock email server.
- ⏭ The first `git push` triggers `.github/workflows/ci.yml`, which runs the real checks: lint, types, build, Playwright e2e and accessibility, and Lighthouse.
- Owner decision: the owner connects GitHub and Vercel. Until `npm run check:launch` passes, set `SITE_ENV=preview` on Vercel.
