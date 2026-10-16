import { describe, expect, it, vi } from 'vitest';
import { composeEnquiryEmail, deliverEnquiry, readMailerConfig } from '@/lib/enquiry/mailer';
import { checkSpam, ELAPSED_FIELD, HONEYPOT_FIELD } from '@/lib/enquiry/spam';

const cfg = {
  apiKey: 'k',
  apiUrl: 'https://mail.test/emails',
  to: 'info@codemindset.in',
  from: 'site@codemindset.in',
};
const payload = { subject: 's', text: 't', html: 'h', replyTo: 'a@b.co' };

describe('deliverEnquiry', () => {
  it('reports not-configured without calling the provider', async () => {
    const f = vi.fn();
    expect(
      await deliverEnquiry(payload, { apiUrl: cfg.apiUrl }, f as unknown as typeof fetch),
    ).toEqual({
      ok: false,
      reason: 'not-configured',
    });
    expect(f).not.toHaveBeenCalled();
  });
  it('succeeds only when the provider returns an id', async () => {
    const ok = vi.fn(async () => new Response(JSON.stringify({ id: 'abc' }), { status: 200 }));
    expect(await deliverEnquiry(payload, cfg, ok as unknown as typeof fetch)).toEqual({
      ok: true,
      id: 'abc',
    });
    const noId = vi.fn(async () => new Response('{}', { status: 200 }));
    expect((await deliverEnquiry(payload, cfg, noId as unknown as typeof fetch)).ok).toBe(false);
  });
  it('treats HTTP errors and network failures as failures', async () => {
    const bad = vi.fn(async () => new Response('{}', { status: 422 }));
    expect(await deliverEnquiry(payload, cfg, bad as unknown as typeof fetch)).toEqual({
      ok: false,
      reason: 'rejected',
    });
    const boom = vi.fn(async () => {
      throw new Error('offline');
    });
    expect(await deliverEnquiry(payload, cfg, boom as unknown as typeof fetch)).toEqual({
      ok: false,
      reason: 'network',
    });
  });
  it('omits reply-to when no email was given', async () => {
    const f = vi.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (..._args: unknown[]) => new Response(JSON.stringify({ id: 'x' }), { status: 200 }),
    );
    await deliverEnquiry({ subject: 's', text: 't', html: 'h' }, cfg, f as unknown as typeof fetch);
    const [, init] = f.mock.calls[0] as [string, RequestInit];
    expect('reply_to' in JSON.parse(init.body as string)).toBe(false);
  });
  it('sends the key as a bearer token and sets reply-to', async () => {
    const f = vi.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (..._args: unknown[]) => new Response(JSON.stringify({ id: 'x' }), { status: 200 }),
    );
    await deliverEnquiry(payload, cfg, f as unknown as typeof fetch);
    const [url, init] = f.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(cfg.apiUrl);
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer k');
    expect(JSON.parse(init.body as string).reply_to).toBe('a@b.co');
  });
  it('reads configuration from the environment', () => {
    expect(readMailerConfig({} as NodeJS.ProcessEnv).apiUrl).toBe('https://api.resend.com/emails');
    expect(
      readMailerConfig({ EMAIL_API_KEY: '' } as unknown as NodeJS.ProcessEnv).apiKey,
    ).toBeUndefined();
  });
});

describe('composeEnquiryEmail', () => {
  const base = {
    kind: 'project' as const,
    service: 'not-sure',
    message: '<b>hi</b>',
    existing: [],
    timeframe: '',
    name: 'Eve\r\nBcc: x@y.z',
    phone: '',
    email: 'e@x.co',
    company: '<script>alert(1)</script>',
    contactPref: '',
    consent: true,
    source: '/contact/',
    serviceLabel: 'Not sure yet',
    timeframeLabel: '',
    contactPrefLabel: '',
  };
  it('escapes HTML and strips newlines from the subject', () => {
    const m = composeEnquiryEmail(base);
    expect(m.subject).not.toMatch(/[\r\n]/);
    expect(m.html).not.toContain('<script>');
    expect(m.html).toContain('&lt;b&gt;hi&lt;/b&gt;');
  });
  it('labels callback requests and leaves out the message', () => {
    const m = composeEnquiryEmail({
      ...base,
      kind: 'callback',
      name: 'Ravi',
      phone: '+91 98765 43210',
    });
    expect(m.subject).toMatch(/^Callback request/);
    expect(m.text).toContain('+91 98765 43210');
    expect(m.text).not.toContain('Message:');
  });
});

describe('checkSpam', () => {
  const form = (entries: Record<string, string>) => {
    const f = new FormData();
    for (const [k, v] of Object.entries(entries)) f.set(k, v);
    return f;
  };
  it('flags a filled honeypot', () => {
    expect(checkSpam(form({ [HONEYPOT_FIELD]: 'x' }), '')).toEqual({
      spam: true,
      reason: 'honeypot',
    });
  });
  it('flags submissions completed in under three seconds but allows a missing value', () => {
    expect(checkSpam(form({ [ELAPSED_FIELD]: '500' }), '').spam).toBe(true);
    expect(checkSpam(form({ [ELAPSED_FIELD]: '10000' }), '').spam).toBe(false);
    expect(checkSpam(form({ [ELAPSED_FIELD]: '' }), '').spam).toBe(false);
    expect(checkSpam(form({}), '').spam).toBe(false);
  });
  it('flags link-stuffed messages', () => {
    expect(checkSpam(form({}), 'https://a https://b https://c https://d').spam).toBe(true);
  });
});
