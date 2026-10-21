import Image from 'next/image';
import { CheckIcon } from '@/components/ui/Icons';
import type { Project } from '@/content/work';

const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');

/** A live project: real screenshot, what the business is, what is on the site, and a link to see it. */
export function ProjectCard({ p, detailed = false }: { p: Project; detailed?: boolean }) {
  return (
    <article className="proj">
      <a
        href={p.url}
        className="proj__img"
        target="_blank"
        rel="noopener"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={p.image}
          alt=""
          width={800}
          height={500}
          sizes="(min-width: 1024px) 560px, 100vw"
        />
      </a>
      <div className="proj__body">
        <p className="proj__meta">
          {p.kind} · {p.industry}
          {p.location ? ` · ${p.location}` : ''}
        </p>
        <h3>{p.name}</h3>
        <p>{p.summary}</p>
        {detailed ? (
          <ul>
            {p.built.map((b) => (
              <li key={b}>
                <CheckIcon />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
        <a href={p.url} className="proj__link" target="_blank" rel="noopener">
          Visit {host(p.url)} ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
