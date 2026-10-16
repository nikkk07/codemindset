# Competitive pattern analysis — CodeMindset website

Prepared 2026-10-15/16 · Author: Claude (for CodeMindset) · Status: internal research, not for publication

## 1. Method (what was actually done)

- **Sites inspected in depth: 42 homepages.**
  - Each was retrieved with an automated page fetch and audited against one fixed checklist: hero and subhead, CTAs, navigation, service taxonomy and count, trust signals, visual and interaction approach, and weaknesses.
  - Visual and motion findings are inferred from markup and text, not watched in a browser. Treat them as indicative.
- **Search results scanned: about 70.** They came from 8 commercial searches run with this session's search tool, which is not a Google SERP export and has no volume data:
  - website development for small business, Delhi NCR
  - business process automation with CRM and WhatsApp
  - custom software for SMEs in India
  - AI automation and RAG chatbots
  - technical SEO and Core Web Vitals
  - Awwwards 3D technology sites
  - and the earlier session's searches
- **Supporting sources:**
  - an Indian buyer guide for choosing an agency (2026 update)
  - the MobiDev buyer checklist
  - the CMR MSME study (directional only)
  - the Awwwards interactive listing
  - an agency article on 3D trends (vendor source, treated sceptically)
- **Not done:** 1,000 sites were _not_ analysed. Accuracy matters more than the requested number. The corpus was chosen to cover each competitor tier with its highest-value examples.

| Tier                                        | Inspected                     | Sites                                                                                                                                                                                                                          |
| ------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Global and Indian IT majors              | 17                            | Accenture, TCS, Infosys, HCLTech, Wipro, Cognizant, Capgemini, Thoughtworks, EPAM, Globant, NTT DATA, IBM Consulting, Deloitte India, Persistent, Tech Mahindra, Fractal, Kellton (LTIMindtree redirected and was not audited) |
| 2–3. Software and product-engineering firms | 15                            | Simform, Appinventiv, Codewave, TatvaSoft, Radixweb, MindInventory, Fingent, OnGraph, The NineHertz, TechAhead, Quytech, Rishabh Software, Algoworks, Xicom, Successive                                                        |
| 4. AI engineering                           | 2 (+ Fractal, Codewave above) | LeewayHertz, Markovate                                                                                                                                                                                                         |
| 5 and 8. Automation and SME agencies        | 4                             | 9nocAI (Clutch), Automated Codes (GoodFirms), B4Creations, irpr.agency                                                                                                                                                         |
| 9. Search competitors                       | about 70 results              | Directories, marketplaces and programmatic pages (see §4)                                                                                                                                                                      |
| 10. Conversion references                   | 4                             | Stripe, Linear, Vercel, Social ScaleX                                                                                                                                                                                          |

## 2. Recurring patterns (with counts from the 42)

| Pattern                                                                  | Evidence                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **The hero leads with abstract or AI positioning, not a concrete offer** | About 25 of the 38 company sites put "AI", "AI-first", "AI-native" or "intelligence" in the hero. Examples include TCS ("Infrastructure to Intelligence"), Cognizant ("We're an AI Builder"), NineHertz ("AI-native engineering partner"), Quytech ("AI-First Digital Transformation") and Successive ("AI-Native delivery"). Very few say what they will build for whom. |
| **Metaphor headlines**                                                   | Accenture ("Together We Reinvented"), Infosys ("Navigate your next"), EPAM ("Engineering the Future™"), HCLTech ("Supercharging Progress").                                                                                                                                                                                                                               |
| **Generic, repeated CTAs**                                               | "Learn more / Read more / Know more" dominate the enterprise sites. Wipro repeats "READ MORE" six times, and Cognizant and Capgemini each have around 10 competing CTAs.                                                                                                                                                                                                  |
| **Huge service menus**                                                   | Development firms expose 29 to 80+ service links (Xicom 80+, MindInventory about 64, TechAhead 47+, Fingent about 30). Enterprises run several taxonomies side by side: capability, industry and platform.                                                                                                                                                                |
| **Carousels and video heroes hide the message**                          | TCS, NTT DATA, Globant, Rishabh, Quytech, Tech Mahindra and HCLTech rotate their main messages; Tech Mahindra's lead slide is an earnings notice. Video heroes appear at TCS, Infosys, Thoughtworks, Kellton, Algoworks, NineHertz, Successive and Deloitte.                                                                                                              |
| **Trust through self-reported counters and badges**                      | Development firms rely on project and client counters, ISO/CMMI badges, Clutch ratings and logo walls. Enterprises rely on analyst rankings (Gartner, Everest, Forrester).                                                                                                                                                                                                |
| **Proof quality failures**                                               | Counters show "0+" (NineHertz, TechAhead, Rishabh); figures conflict (TatvaSoft 25+ vs 21+ years, OnGraph 218 vs 500+ customers, Quytech ISO dates); placeholder "#" links appear on at least 8 sites; a visible "Error: Contact form not found" (OnGraph); typos and debug labels (Algoworks, Persistent).                                                               |
| **Unsourced performance claims**                                         | "4–7X velocity" (NineHertz), "50% faster" (Fingent), "3–5x lead capture" (B4Creations), "98% client satisfaction" (irpr).                                                                                                                                                                                                                                                 |
| **No problem-led entry point**                                           | **None of the 42** opens by asking what the visitor needs. The closest are Thoughtworks' "Rebuild. Rewire. Reimagine." and Simform's capability groups.                                                                                                                                                                                                                   |
| **How the work runs is mostly absent**                                   | Ownership, support and acceptance criteria appear almost nowhere on homepages. Exceptions: Codewave (outcome pricing, "direct access to builders") and Kellton (a six-step workflow).                                                                                                                                                                                     |
| **Conversion references do it differently**                              | Stripe and Vercel organise navigation by product, use case and role, with one clear primary CTA and verified scale metrics. Linear pairs short copy with product mock-ups. Social ScaleX states the offer, groups services by goal, shows process and handles objections.                                                                                                 |

## 3. Market failures to design against

1. You can't tell what they'd build for _your_ business: abstract or AI heroes and metaphors.
2. Navigation that overwhelms: 30 to 80 service links, three taxonomies at once.
3. Proof that undermines trust: broken counters, conflicting figures, unsourced percentages, unlabelled logos.
4. Template defects: "#" links, typos, visible errors, duplicated sections. Each one is evidence against engineering quality.
5. Motion that costs comprehension: carousels hiding key messages, autoplay video, scroll-jacking (Persistent).
6. No explanation of implementation, ownership or support.
7. Search spam in the category: mass-generated keyword-variant pages. irpr.agency was verified as templated, about 650 words, and still citing FID, which Google retired in 2024.
8. Buyer-guide red flags (2026 Delhi NCR guide):
   - guaranteed rankings,
   - lock-in through proprietary systems,
   - showy portfolios with poor code,
   - unclear code ownership,
   - unclear post-launch support.

## 4. Search landscape (Tier 9)

- Commercial queries in this category return mostly:
  - directories (Clutch, GoodFirms, DesignRush, TechImply),
  - marketplaces (Fiverr, Upwork, Contra),
  - IndiaMART listings,
  - programmatic or spam pages (Notion, Gumroad and Lovable sub-sites; irpr.agency keyword variants).
- **Opportunity:** a few substantive, technically accurate pages with clear answers can compete on quality. Directory profiles help once real reviews exist.
- **Rejected:** city pages and keyword-variant pages.

## 5. Interaction and 3D (Tiers 7 and 10)

- Awwwards' interactive category is dominated by WebGL and Three.js, scroll-driven camera paths, GSAP and physics.
- An agency article claims 3D won 61% of early-2026 Sites of the Day. This is unverified, comes from a vendor, and cites no primary data. The article itself notes frame drops count as defects, and it doesn't mention accessibility.
- **Conclusion:** dimensional interaction is now expected at the high end, but award sites optimise for spectacle, not B2B comprehension. CodeMindset uses depth _only_ where it explains how systems connect.

## 6. Abstraction → CodeMindset implementation

| Observed                                              | Abstract principle                     | CodeMindset implementation                                                                                 |
| ----------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Social ScaleX opens with the customer's goal          | Intent-led information architecture    | Problem selector in the hero: six needs, each lighting a route through the system map and changing the CTA |
| Enterprises organise around transformation outcomes   | Outcome-oriented service architecture  | Build / Automate / Connect / Engineer / Optimize / Diagnose                                                |
| Award sites tell the story through interaction        | Interaction must communicate a concept | The living algorithm map: nodes are real system parts, and routes are real delivery paths                  |
| Stripe and Vercel separate product, use case and role | Navigation by user task                | Problem-first entry, then six service categories (not 60 links)                                            |
| Competitors' proof is often broken                    | Proof must be verifiable or absent     | No counters, logos or testimonials until they're real; claims register plus launch gate                    |
| No one explains implementation                        | Make delivery visible                  | Architecture explorer (web app, automation, integration, AI workflow) and a published engagement process   |
| Contact forms are "Name / Email / Message"            | Qualification without interrogation    | Five-step intake: goal, what exists, the problem, timing, then contact details                             |

## 7. Patterns deliberately rejected

- AI-first or AI-native heroes; glowing brains, robots, purple gradients and particle fields.
- Carousels, autoplay video backgrounds, scroll-jacking.
- Mega-menus with dozens of services; separate industry pages without real experience.
- Self-reported counters, unsourced percentages, logo walls, unverified badges.
- Programmatic city pages and keyword-variant pages.
- Heavy WebGL engines. The map uses SVG with CSS 3D perspective: no extra library, crawlable text, keyboard access, and a static fallback.

## 8. Patterns adopted

- One primary CTA per section, with labels that state what happens ("Tell us what you're trying to solve").
- Short, concrete hero copy that names the services for search intent, with the abstract principle second.
- Service pages answer ten buyer questions: problem, audience, what we do, how it works, implementation, connections, constraints, success measures, when not to use it, next step.
- A visible delivery process with acceptance criteria and ownership (claims pending owner approval).
- A clear brand pairing: Social ScaleX acquires demand; CodeMindset engineers the systems that convert, operate and measure it.

## 9. Evidence behind the major design decisions

| Decision                                | Evidence                                                                          |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| Problem-first hero selector             | 0 of 42 sites offer one; buyers can't map jargon to their problem (§2, §3.1)      |
| No AI-first headline                    | About 25 of 38 heroes are AI-led and therefore interchangeable (§2)               |
| Six service categories, not a mega-menu | 29 to 80+ link menus observed (§2)                                                |
| No counters or logos at launch          | At least 4 sites show broken or conflicting numbers (§2, §3.3)                    |
| SVG/CSS 3D instead of WebGL             | Award 3D trades performance and accessibility; B2B comprehension comes first (§5) |
| Explicit ownership and support          | Missing on almost every homepage, and a buyer-guide red flag (§3.6, §3.8)         |
| No programmatic pages                   | Verified spam pattern in the category's search results (§4)                       |

## 10. Sources (retrieved 2026-10-15/16)

Enterprise:

- https://www.accenture.com/in-en
- https://www.tcs.com/
- https://www.infosys.com/
- https://www.hcltech.com/
- https://www.wipro.com/
- https://www.cognizant.com/us/en
- https://www.capgemini.com/
- https://www.thoughtworks.com/
- https://www.epam.com/
- https://www.globant.com/
- https://www.nttdata.com/global/en/
- https://www.ibm.com/consulting
- https://www.deloitte.com/in/en.html
- https://www.persistent.com/
- https://www.techmahindra.com/
- https://www.fractal.ai/
- https://www.kellton.com/

Engineering firms:

- https://www.simform.com/
- https://appinventiv.com/
- https://codewave.com/
- https://www.tatvasoft.com/
- https://radixweb.com/
- https://www.mindinventory.com/
- https://www.fingent.com/
- https://www.ongraph.com/
- https://www.theninehertz.com/
- https://www.techaheadcorp.com/
- https://www.quytech.com/
- https://www.rishabhsoft.com/
- https://www.algoworks.com/
- https://www.xicom.biz/
- https://www.successive.tech/

AI firms:

- https://www.leewayhertz.com/
- https://markovate.com/

Automation and SME agencies:

- https://clutch.co/profile/9nocai
- https://www.goodfirms.co/company/automated-codes
- https://b4creations.com/services/ai-automations.html
- https://irpr.agency/technical-seo-core-web-vitals

Conversion references:

- https://stripe.com/in
- https://linear.app/
- https://vercel.com/
- https://www.socialscalex.in/

Buyer guides and research:

- https://gauravtiwari.org/web-development-agency-in-delhi-ncr/
- https://mobidev.biz/blog/how-to-choose-a-software-development-company
- https://cmrindia.com/67-of-msmes-demonstrate-digital-readiness-across-core-and-advanced-technologies-finds-cmr-study/

Interaction:

- https://www.awwwards.com/inspiration_search/web-interactive/
- https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/
