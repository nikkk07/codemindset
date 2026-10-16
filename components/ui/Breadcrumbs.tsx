import Link from 'next/link';
import { breadcrumbJsonLd, graph, type Crumb } from '@/lib/seo';
import { JsonLd } from './JsonLd';

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: 'Home', path: '/' }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path}>
                {last ? (
                  <span aria-current="page">{c.name}</span>
                ) : (
                  <>
                    <Link href={c.path}>{c.name}</Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={graph(breadcrumbJsonLd(all))} />
    </>
  );
}
