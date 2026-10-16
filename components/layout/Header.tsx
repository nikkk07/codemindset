import { getVisibleHubs } from '@/lib/visibility';
import { getIndustryNav, getKnowledgeNav, getMegaMenu, getTopLinks, quoteCta } from '@/lib/nav';
import { SiteHeader } from './SiteHeader';

/** Server wrapper: resolves what is visible in this environment, then hands it to the client header. */
export function Header() {
  const mega = getMegaMenu();
  return (
    <SiteHeader
      mega={mega}
      industries={getIndustryNav()}
      knowledge={getKnowledgeNav()}
      topLinks={getTopLinks()}
      quote={quoteCta}
      hubs={getVisibleHubs().map((h) => ({
        href: `/services/${h.slug}/`,
        label: h.plainTitle,
        hint: h.title,
      }))}
    />
  );
}
