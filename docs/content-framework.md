# Content Framework — Code Mindset

Status: DRAFT v1 · 2026-10-15 · Rules and templates only. No public copy is written until the capability matrix is confirmed.

## 1. Voice

- Clear, specific and calm. Write for a non-technical owner first, with technical depth one click or one section away.
- Active voice, short sentences, Indian English spelling (organisation, optimise), ₹ for currency.
- "Think in Algorithm" means: define the problem, the inputs, the steps, the checks and the result. Every service page follows that logic. Use it as a structural device, not a slogan to repeat.
- **Banned without evidence:** world-class, cutting-edge, leading, best, #1, guaranteed rankings or citations, "revolutionise", "unlock", "seamless", "end-to-end" (unless one team truly owns every stage), "AI-powered" as decoration.

## 2. Claims register (mandatory)

Every factual public claim is logged in `docs/claims-register.md` before publishing:
`claim · page · type (capability / result / statistic / legal / third-party) · evidence / source · owner approval (Y/date)`.

- Capability claims need a Ready/Partner status in the capability matrix.
- Result claims need a baseline, a measurement method and client permission.
- Third-party statistics need the exact source wording, sample, date and relevance (see §6).
- Anything that isn't approved is left out. There are no placeholders like "XX% faster".

## 3. Page templates

### Home

1. Hero: what we do + who for + primary CTA (Discuss a project) + secondary CTA (See how we work). Tagline used meaningfully.
2. Four entry paths by problem: build, automate, integrate, get found (technical). Each links to its service page.
3. How an engagement works (assessment → scope and acceptance criteria → build → launch → support).
4. Evidence: permitted work only; if none yet, "How we'd approach it" worked examples, clearly labelled as illustrations.
5. How we handle your data, credentials and code ownership (answers the 81% security concern, see §6).
6. Code Mindset and Social ScaleX: one short block with the ownership disclosure and the responsibility split.
7. FAQs that real buyers ask (cost drivers, timelines, ownership, maintenance, when not to build).
8. Final CTA + contact details.

### Service page (one template for A–D)

H1 (service + value) → problem summary → who it fits / who it doesn't fit → typical problems solved → deliverables and scope → process with acceptance criteria → technologies (verified only) → security, reliability and ownership → constraints, limits and build-versus-buy guidance → evidence → FAQs → next step (a specific CTA) → related services.
Minimum substance rule: if a section can't be filled honestly, merge the page into its parent instead of padding it.

### Approach (`/approach/`)

Engagement models (assessment, fixed-scope project, care retainer), what we need from the client, communication cadence, acceptance and handover, IP ownership, data and credential handling, what happens after an enquiry. No response-time promises unless confirmed.

### About (`/about/`)

Who we are (real people only, with consent), what "Think in Algorithm" means in practice, how we work, and **Our brands**: the Social ScaleX disclosure, responsibility split and joint-project model (see the plan, §1).

### Case study (`/work/[slug]/`), only with permission

Context → problem → scope and constraints → approach → key decisions → baseline and method → result → limits and lessons → services involved → related services. Each brand's role is named on joint projects.

### Contact

Short form (see the technical spec), what happens next, direct phone and email, privacy link.

## 4. Search-intent map (draft; no volumes; refine with real keyword data)

| Page                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Primary intent                                                             | Question it answers                                              | Conversion action       | Links to                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------- | ------------------------------------- |
| Home                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Navigational / evaluate the company                                        | Who are Code Mindset and can they solve my problem?              | Discuss a project       | All services, Approach, About         |
| Websites & web apps                                                                                                                                                                                                                                                                                                                                                                                                                                               | Commercial: hire a developer for a business site or app                    | What will I get, how is it built, what does it involve?          | Request assessment      | Integrations, Technical SEO, Approach |
| Automation & AI                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Commercial + informational: automate a workflow, use AI practically        | Which tasks can be automated safely, with what controls?         | Explain your workflow   | Integrations, Approach                |
| Integrations & software                                                                                                                                                                                                                                                                                                                                                                                                                                           | Commercial, often platform-specific (e.g. "Zoho CRM WhatsApp integration") | Can you connect system X to Y reliably?                          | Discuss a project       | Automation, Websites                  |
| Technical SEO                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Commercial: audit, migration, performance                                  | What is technically blocking my visibility, and how is it fixed? | Request technical audit | Websites, (SSX for marketing SEO)     |
| Approach                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evaluation / trust                                                         | How do you work, who owns what, how is data handled?             | Discuss a project       | Services, Contact                     |
| Observed in result pages (2026-10-15, via this session's search tool; not a Google SERP export): directory profiles (Clutch, GoodFirms), freelancer marketplaces, vendor integration guides, and mass-produced city/"near me" pages dominate. → (a) Create directory profiles once real reviews exist; (b) platform-specific integration guides are a content opportunity **only for platforms we have actually integrated**; (c) **no** programmatic city pages. |
| Real keyword data: Search Console (after launch), plus Google Keyword Planner if a Google Ads account is available (❓ optional).                                                                                                                                                                                                                                                                                                                                 |

## 5. Internal linking and CTAs

Hub-and-spoke (Services hub ↔ each service). Breadcrumbs on every page below the top level. Descriptive anchor text, with no repeated exact-match anchors. One dominant CTA per section. CTA labels: Discuss a project · Request a technical assessment · Explain your workflow · See how we work. No urgency language.

## 6. Third-party statistics: public-use eligibility

| Statistic                                                                                                                                                                                                                                 | Exact wording verified        | Sample / method                                                                                                                                                                                | Date        | Independence                                                              | Public use?                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CMR: "a lack of clarity on the value and relevance of available digital solutions (84%)"; "apprehensions around data security (81%)"; "limited proficiency in advanced technologies (56%)"; "62% actively seek digital advisory services" | ✅ verbatim from cmrindia.com | "over 400 MSMEs", sectors IT/ITeS, Manufacturing, Education, Retail. **Inconsistency:** the stated "±3% margin at 95% confidence" would need roughly 1,000+ respondents; 400 gives about ±4.9% | 24 Jun 2025 | Commissioning not disclosed; the release promotes Vi Business's programme | ⚠️ **Internal planning only by default.** If used publicly: in an Insights article, with an exact quote, the source link, the date, and a note of limitations. Never on service pages as proof of demand. |
| Vi Business MSME Growth Insights 2025 (12% fully mature, etc.)                                                                                                                                                                            | Secondary report (Voice&Data) | Not disclosed                                                                                                                                                                                  | Jun 2025    | Telecom-provider study                                                    | ❌ Internal context only                                                                                                                                                                                  |
| Rule: a market statistic is context, never proof of demand for a specific Code Mindset service.                                                                                                                                           |

## 7. Social ScaleX references (wording draft)

- Code Mindset site: "Social ScaleX is a Code Mindset–owned brand responsible for marketing and advertising: strategy, social media, paid campaigns, creative production and campaign performance. Code Mindset handles technical delivery. On joint projects, Social ScaleX owns the marketing strategy and campaign objectives, and Code Mindset owns the engineering and integrations."
- Social ScaleX site (to propose): "Social ScaleX is part of Code Mindset, our technology and engineering company."
