import type { EnquiryInput } from './schema';

export interface MailerConfig {
  apiKey?: string;
  apiUrl: string;
  to?: string;
  from?: string;
}

export type DeliveryResult =
  { ok: true; id: string } | { ok: false; reason: 'not-configured' | 'rejected' | 'network' };

export function readMailerConfig(env: NodeJS.ProcessEnv = process.env): MailerConfig {
  return {
    apiKey: env.EMAIL_API_KEY || undefined,
    apiUrl: env.EMAIL_API_URL || 'https://api.resend.com/emails',
    to: env.ENQUIRY_TO || undefined,
    from: env.ENQUIRY_FROM || undefined,
  };
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const headerSafe = (s: string) => s.replace(/[\r\n]+/g, ' ').slice(0, 120);

export function composeEnquiryEmail(
  e: EnquiryInput & { serviceLabel: string; timeframeLabel: string; contactPrefLabel: string },
) {
  const callback = e.kind === 'callback';
  const rows: [string, string][] = callback
    ? [
        ['Type', 'Callback request'],
        ['Name', e.name],
        ['Phone / WhatsApp', e.phone],
        ['Needs', e.serviceLabel],
        ['Sent from', e.source || '—'],
      ]
    : [
        ['Type', 'Project enquiry'],
        ['Name', e.name],
        ['Phone / WhatsApp', e.phone || '—'],
        ['Email', e.email || '—'],
        ['Prefers', e.contactPrefLabel || '—'],
        ['Company', e.company || '—'],
        ['Needs', e.serviceLabel],
        ['Has today', e.existing.length ? e.existing.join(', ') : '—'],
        ['Timing', e.timeframeLabel || '—'],
        ['Sent from', e.source || '—'],
        ['Privacy notice acknowledged', e.consent ? 'Yes' : 'No'],
      ];
  const subject = headerSafe(
    `${callback ? 'Callback request' : 'Website enquiry'}: ${e.serviceLabel} — ${e.name}`,
  );
  const message = callback ? '' : e.message;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}${message ? `\n\nMessage:\n${message}\n` : '\n'}`;
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="color:#44414D">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`,
    )
    .join('')}</table>${
    message
      ? `<h3 style="font-family:sans-serif">Message</h3><p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>`
      : ''
  }`;
  return { subject, text, html };
}

/**
 * Sends the enquiry through the transactional email API.
 * Returns ok only when the provider accepted the message and returned an id.
 */
export async function deliverEnquiry(
  payload: { subject: string; text: string; html: string; replyTo?: string },
  config: MailerConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<DeliveryResult> {
  if (!config.apiKey || !config.to || !config.from) return { ok: false, reason: 'not-configured' };
  try {
    const res = await fetchImpl(config.apiUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return { ok: false, reason: 'rejected' };
    const body = (await res.json().catch(() => null)) as { id?: unknown } | null;
    if (!body || typeof body.id !== 'string' || body.id === '')
      return { ok: false, reason: 'rejected' };
    return { ok: true, id: body.id };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
