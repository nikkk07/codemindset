'use client';

import { track } from '@vercel/analytics';
import type { ContactKind } from '@/lib/contact';

/**
 * A contact link (call, WhatsApp, email, quote) that records a conversion event.
 * Events are sent only where Vercel Analytics is loaded (production).
 */
export function ContactLink({
  kind,
  where,
  href,
  className,
  children,
  ariaLabel,
}: {
  kind: ContactKind;
  where: string;
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const external = kind === 'whatsapp';
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      data-contact={kind}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      onClick={() => {
        try {
          track('contact_click', { kind, where });
        } catch {
          /* analytics must never block the click */
        }
      }}
    >
      {children}
    </a>
  );
}
