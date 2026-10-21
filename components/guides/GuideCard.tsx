import Link from 'next/link';
import type { LongGuide } from '@/content/guides';
import { longGuideHref } from '@/lib/visibility';

/** A link card to an in-depth guide, used on service pages and in the knowledge hub. */
export function GuideCard({ g }: { g: LongGuide }) {
  return (
    <Link href={longGuideHref(g.slug)} className="gcard">
      <span className="gcard__meta">Free guide · {g.readMinutes} min read</span>
      <strong>{g.title}</strong>
      <span className="gcard__text">{g.answer.split('. ')[0]}.</span>
      <span className="gcard__more">Read the guide →</span>
    </Link>
  );
}
