/**
 * Launch gate: run before any production deployment.
 * Exits with code 1 while anything that must be confirmed by the owner is still open.
 *   npm run check:launch
 */
import { claims } from '../content/claims';
import { glossary } from '../content/knowledge';
import { industries } from '../content/industries';
import { corePages } from '../content/pages';
import { regions } from '../content/regions';
import { allSubs, hubs } from '../content/services';
import { site } from '../content/site';
import { isPublishable, isRegionPublishable } from '../lib/visibility';

const problems: string[] = [];
const warnings: string[] = [];

const optional = new Set(['work', 'blog']);
for (const [key, p] of Object.entries(corePages)) {
  if (p.review !== 'approved')
    (optional.has(key) ? warnings : problems).push(`Page not approved: ${p.path}`);
}

const liveHubs = hubs.filter(isPublishable);
if (liveHubs.length === 0) problems.push('No service hub is approved and confirmed deliverable.');
for (const h of hubs) {
  if (!isPublishable(h))
    warnings.push(
      `Service hidden in production: /services/${h.slug}/ (${h.readiness}, ${h.review})`,
    );
  const hidden = allSubs(h).filter((s) => !isPublishable(s)).length;
  if (hidden > 0)
    warnings.push(
      `  ${hidden} of ${allSubs(h).length} detail pages under ${h.slug} are not approved yet`,
    );
  if (h.guide.review !== 'approved') warnings.push(`  Guide not approved: ${h.slug}`);
}
const ind = industries.filter((i) => i.review !== 'approved').length;
if (ind > 0) warnings.push(`${ind} industry pages not approved`);
const terms = glossary.filter((g) => g.review !== 'approved').length;
if (terms > 0) warnings.push(`${terms} glossary terms not approved`);
const liveRegions = regions.filter(isRegionPublishable).length;
warnings.push(`${liveRegions} of ${regions.length} state/UT pages have approved local content`);

for (const c of claims.filter((c) => c.status !== 'approved'))
  problems.push(`Claim pending approval: ${c.id}: ${c.claim}`);

if (site.crawlers.aiTraining === 'undecided')
  problems.push('Decide whether AI-training crawlers (GPTBot etc.) are allowed.');
if (!site.legal.entityName)
  problems.push('Legal entity name missing (privacy notice, terms, footer).');
if (!site.legal.grievanceOfficer) problems.push('Grievance contact missing (privacy notice).');
if (!site.legal.governingJurisdiction) problems.push('Governing jurisdiction missing (terms).');

for (const key of ['EMAIL_API_KEY', 'ENQUIRY_TO', 'ENQUIRY_FROM'] as const) {
  if (!process.env[key])
    warnings.push(`Environment variable not set here: ${key} (must be set in production).`);
}

console.log(`\nLaunch gate: ${problems.length} blocking, ${warnings.length} notes\n`);
for (const p of problems) console.log(`  ✗ ${p}`);
for (const w of warnings) console.log(`  ! ${w}`);
console.log('');
process.exit(problems.length > 0 ? 1 : 0);
