# Launch checklist — CodeMindset website

Updated: 2026-10-16. `npm run check:launch` enforces the items marked ⚙.

## A. Owner decisions and evidence

- [ ] ⚙ Approve core page copy in `content/pages.ts` (home, services, industries, india, knowledge, guides, glossary, about, careers, contact, privacy, terms)
- [ ] ⚙ Approve service hubs (`review: 'approved'` in `content/services.ts`); then approve each platform/need page and guide you want live — each needs copy you're happy with
- [ ] Confirm per row in `docs/capability-matrix.md` that every listed platform is delivered (owner stated 2026-10-16 the team covers all; set `readiness` to `'roadmap'` on anything you don't want to offer)
- [ ] ⚙ Approve or remove every pending claim in `content/claims.ts` (team roles, fast turnaround, written quote, ownership, access, AI hand-over)
- [ ] Approve industry pages and glossary terms (`review` in their files)
- [ ] State pages: write unique local content in `content/regions.ts` → `local`, then approve, a few states at a time
- [ ] Blog: add articles to `content/knowledge.ts`
- [ ] ⚙ AI-training crawlers (GPTBot, Google-Extended, ClaudeBot, CCBot, Applebot-Extended): allow or block (`site.crawlers.aiTraining`)
- [ ] ⚙ Registered company name (e.g. "… Private Limited"), grievance contact and governing jurisdiction (`site.legal`) — the name appears in the footer
- [ ] Privacy notice and terms reviewed by a lawyer (DPDP Act 2023 / DPDP Rules 2025). Note: the callback form relies on a notice ("By sending this you agree…") rather than a checkbox — confirm this is acceptable
- [ ] Careers email address confirmed (currently info@)
- [ ] Optional: approved case studies with client permission (`content/work.ts`)

## B. Accounts, DNS and credentials

- [ ] Vercel project; Pro plan (commercial use)
- [ ] Domain: `www.codemindset.in` primary, apex → www (308); HTTPS active
- [ ] Email provider (Resend); domain verified (SPF + DKIM); DMARC
- [ ] ⚙ Production env vars: `EMAIL_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM`
- [ ] Send one real test enquiry and one callback on production; confirm both arrive
- [ ] Vercel Firewall: rate-limit form `POST`s; confirm search and AI-search crawlers are not challenged
- [ ] Enable Vercel Web Analytics (contact-click events)
- [ ] WhatsApp Business profile on +91 80777 27669 shows the CodeMindset name, logo and hours

## C. After launch

- [ ] Google Search Console: verify, submit sitemap, inspect home + one service URL
- [ ] Bing Webmaster Tools: verify, submit sitemap
- [ ] Google Business Profile (service-area business, India); ask happy clients for reviews
- [ ] Same company name, description, phone and links on LinkedIn, Instagram and directory listings (e.g. Clutch, GoodFirms)
- [ ] Check keyword volumes for the sitemap's target searches in Search Console / Keyword Planner after 4–6 weeks; adjust page titles
- [ ] Review Core Web Vitals field data after 28 days
- [ ] Social ScaleX: add the reciprocal "a CodeMindset company" line and link (separate approval)
