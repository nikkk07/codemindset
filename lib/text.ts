/** Words that keep their capital letter mid-sentence (brands, platforms, proper nouns). */
const KEEP = new Set([
  'WordPress',
  'WooCommerce',
  'Shopify',
  'Flutter',
  'React',
  'Zoho',
  'HubSpot',
  'Salesforce',
  'Razorpay',
  'Stripe',
  'Tally',
  'Node.js',
  'Python',
  'Laravel',
  'AWS',
  'Google',
  'Vercel',
  'Cloudflare',
  'ChatGPT',
  'Claude',
  'OpenAI',
  'Make',
  'Zapier',
  'Android',
  'iOS',
  'WhatsApp',
  'Indian',
  'India',
  'Apple',
  'Next.js',
  'CodeMindset',
  'Amazon',
]);

/** Lower-cases the first letter for use mid-sentence, unless the first word is a name or acronym. */
export function lcFirst(text: string): string {
  const first = text.split(/\s+/)[0] ?? '';
  if (KEEP.has(first) || /^[A-Z0-9]{2,}/.test(first) || /^[a-z]/.test(first)) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

/**
 * Build a meta description of 120–160 characters from sentences that are already on the page
 * (so the snippet never claims anything the page doesn't). Adds whole sentences in order while
 * they fit; if the result is still short, appends `fallback` when that fits.
 */
export function fitMeta(sentences: string[], fallback = '', min = 120, max = 160): string {
  const parts = sentences
    .flatMap((s) => s.split(/(?<=[.?!])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);
  let out = '';
  for (const p of parts) {
    const next = out ? `${out} ${p}` : p;
    if (next.length > max) {
      if (out) continue; // try a shorter sentence further on
      // A single sentence longer than the limit: cut at a word boundary.
      return `${p.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
    }
    out = next;
    if (out.length >= min) break;
  }
  if (out.length < min && fallback && `${out} ${fallback}`.length <= max)
    out = `${out} ${fallback}`;
  return out;
}

/** The longest candidate title that fits the limit (60 characters by default). */
export function fitTitle(candidates: string[], max = 60): string {
  return candidates.find((c) => c.length <= max) ?? candidates[candidates.length - 1] ?? '';
}
