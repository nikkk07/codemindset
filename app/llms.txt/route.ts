import { corePages } from '@/content/pages';
import { absoluteUrl, site } from '@/content/site';
import {
  getVisibleAudiences,
  getVisibleGlossary,
  getVisibleHubs,
  getVisibleIndustries,
  getVisibleSubs,
  guideHref,
  hubHref,
  isGuideVisible,
  subHref,
} from '@/lib/visibility';

export const dynamic = 'force-static';

/**
 * /llms.txt — a plain-text summary for AI assistants (llmstxt.org proposal).
 * Lists only pages that are visible in this environment.
 */
export function GET() {
  const hubs = getVisibleHubs();
  const lines: string[] = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} (${site.tagline}) serves businesses in every state and union territory of India. Contact: ${site.email}, ${site.phone.display} (call or WhatsApp).`,
    '',
    '## Services',
  ];
  for (const h of hubs) {
    lines.push(`- [${h.title}](${absoluteUrl(hubHref(h.slug))}): ${h.plainTitle}. ${h.blurb}.`);
    for (const s of getVisibleSubs(h))
      lines.push(`  - [${s.title}](${absoluteUrl(subHref(h.slug, s.slug))}): ${s.plain}`);
  }
  const audiences = getVisibleAudiences();
  const industries = getVisibleIndustries();
  if (audiences.length + industries.length > 0) {
    lines.push('', '## Solutions');
    for (const a of audiences)
      lines.push(`- [For ${a.name.toLowerCase()}](${absoluteUrl(`/for/${a.slug}/`)}): ${a.short}`);
    for (const i of industries)
      lines.push(
        `- [${i.name}](${absoluteUrl(`/industries/${i.slug}/`)}): ${i.intro.split('. ')[0]}.`,
      );
  }
  const guides = hubs.filter((h) => isGuideVisible(h));
  if (guides.length > 0) {
    lines.push('', '## Guides');
    for (const h of guides)
      lines.push(
        `- [${h.guide.question}](${absoluteUrl(guideHref(h.slug))}): ${h.guide.shortAnswer}`,
      );
  }
  const terms = getVisibleGlossary();
  if (terms.length > 0) {
    lines.push('', '## Glossary');
    for (const t of terms)
      lines.push(`- [${t.term}](${absoluteUrl(`/knowledge/glossary/${t.slug}/`)}): ${t.short}`);
  }
  lines.push(
    '',
    '## Company',
    `- [About](${absoluteUrl(corePages.about.path)})`,
    `- [Across India](${absoluteUrl(corePages.india.path)})`,
    `- [Get a quote](${absoluteUrl(corePages.contact.path)})`,
    '',
  );
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
