import Link from 'next/link';
import { site } from '@/content/site';

/** The confirmed logo mark: violet code brackets with a slash (geometry from the owner's SVG). */
export function LogoMark({ className = 'brand__mark' }: { className?: string }) {
  return (
    <svg viewBox="20 18 360 172" className={className} aria-hidden="true" focusable="false">
      <g fill="#8B5CF6">
        <path d="M20 76 L124 31 L124 65 L66 91 L124 117 L124 151 L20 106 Z" />
        <path d="M380 76 L276 31 L276 65 L334 91 L276 117 L276 151 L380 106 Z" />
        <path d="M231 18 L267 18 L169 190 L133 190 Z" />
      </g>
    </svg>
  );
}

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="brand" aria-label={`${site.name} home`} onClick={onClick}>
      <LogoMark />
      <span className="brand__word">{site.name}</span>
    </Link>
  );
}
