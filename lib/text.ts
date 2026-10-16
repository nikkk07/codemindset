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
