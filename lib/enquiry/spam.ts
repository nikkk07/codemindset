/** Lightweight spam signals. Real rate limiting is configured in the Vercel Firewall (see docs). */

export const HONEYPOT_FIELD = 'fax_number';
export const ELAPSED_FIELD = 'form_elapsed_ms';
export const MIN_FILL_MS = 3000;
export const MAX_LINKS = 3;

export type SpamVerdict =
  { spam: false } | { spam: true; reason: 'honeypot' | 'too-fast' | 'links' };

export function checkSpam(form: FormData, message: string): SpamVerdict {
  const honeypot = form.get(HONEYPOT_FIELD);
  if (typeof honeypot === 'string' && honeypot.trim() !== '')
    return { spam: true, reason: 'honeypot' };

  // Time spent on the form, measured by the browser's own clock (immune to clock skew).
  // It is absent when JavaScript is off; that case is allowed.
  const raw = form.get(ELAPSED_FIELD);
  const elapsed = typeof raw === 'string' && raw !== '' ? Number(raw) : NaN;
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS) {
    return { spam: true, reason: 'too-fast' };
  }

  const links = message.match(/https?:\/\//gi)?.length ?? 0;
  if (links > MAX_LINKS) return { spam: true, reason: 'links' };

  return { spam: false };
}
