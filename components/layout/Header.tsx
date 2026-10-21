import { getServicesNav, getTopLinks, quoteCta } from '@/lib/nav';
import { SiteHeader } from './SiteHeader';

/** Server wrapper: resolves what is visible in this environment, then hands it to the client header. */
export function Header() {
  return <SiteHeader services={getServicesNav()} topLinks={getTopLinks()} quote={quoteCta} />;
}
