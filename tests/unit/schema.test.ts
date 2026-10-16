import { describe, expect, it } from 'vitest';
import { readEnquiry, validateEnquiry, type EnquiryInput } from '@/lib/enquiry/schema';

const ctx = { serviceOptions: ['website-development', 'integrations', 'not-sure'] };
const project: EnquiryInput = {
  kind: 'project',
  service: 'website-development',
  message: 'Our enquiry spreadsheet is out of date and leads are missed.',
  existing: [],
  timeframe: '',
  name: 'Asha Rao',
  phone: '+91 98765 43210',
  email: '',
  company: '',
  contactPref: '',
  consent: true,
  source: '/contact/',
};
const callback: EnquiryInput = { ...project, kind: 'callback', message: '', consent: false };

describe('project enquiry', () => {
  it('accepts a complete minimal enquiry with only a phone number', () => {
    expect(validateEnquiry(project, ctx)).toEqual({});
  });
  it('accepts an email instead of a phone number', () => {
    expect(validateEnquiry({ ...project, phone: '', email: 'asha@example.com' }, ctx)).toEqual({});
  });
  it('requires service, details, name, a way to reply and consent', () => {
    const e = validateEnquiry(
      { ...project, service: '', message: '', name: '', phone: '', consent: false },
      ctx,
    );
    expect(Object.keys(e).sort()).toEqual(['consent', 'message', 'name', 'phone', 'service']);
  });
  it('rejects malformed email addresses and implausible phone numbers', () => {
    for (const email of ['asha', 'asha@', 'asha@example', 'a b@example.com', '<x>@example.com'])
      expect(validateEnquiry({ ...project, email }, ctx).email).toBeTruthy();
    expect(validateEnquiry({ ...project, phone: '123' }, ctx).phone).toBeTruthy();
    expect(validateEnquiry({ ...project, phone: 'call me' }, ctx).phone).toBeTruthy();
  });
  it('asks for an email when the visitor prefers email but gave none', () => {
    expect(validateEnquiry({ ...project, contactPref: 'email' }, ctx).email).toBeTruthy();
    expect(validateEnquiry({ ...project, contactPref: 'whatsapp' }, ctx)).toEqual({});
  });
  it('rejects unknown options', () => {
    expect(
      validateEnquiry({ ...project, service: 'penetration-testing' }, ctx).service,
    ).toBeTruthy();
    expect(
      validateEnquiry({ ...project, existing: ['website', 'hacking'] }, ctx).existing,
    ).toBeTruthy();
    expect(validateEnquiry({ ...project, timeframe: 'yesterday' }, ctx).timeframe).toBeTruthy();
    expect(validateEnquiry({ ...project, contactPref: 'pigeon' }, ctx).contactPref).toBeTruthy();
  });
  it('enforces message length bounds', () => {
    expect(validateEnquiry({ ...project, message: 'too short' }, ctx).message).toBeTruthy();
    expect(validateEnquiry({ ...project, message: 'x'.repeat(2001) }, ctx).message).toBeTruthy();
  });
});

describe('callback request', () => {
  it('needs only name, phone and service — no message or consent box', () => {
    expect(validateEnquiry(callback, ctx)).toEqual({});
  });
  it('requires a valid phone number', () => {
    expect(validateEnquiry({ ...callback, phone: '' }, ctx).phone).toMatch(/phone/);
    expect(validateEnquiry({ ...callback, phone: '12' }, ctx).phone).toBeTruthy();
  });
  it('still validates name and service', () => {
    const e = validateEnquiry({ ...callback, name: '', service: '' }, ctx);
    expect(Object.keys(e).sort()).toEqual(['name', 'service']);
  });
});

describe('readEnquiry', () => {
  it('normalises whitespace, lower-cases email and reads the form kind', () => {
    const f = new FormData();
    f.set('kind', 'callback');
    f.set('name', '  Asha   Rao ');
    f.set('email', ' ASHA@Example.COM ');
    f.set('message', 'line one\r\nline two\u0000');
    f.append('existing', 'website');
    f.append('existing', 'crm');
    f.set('consent', 'yes');
    const r = readEnquiry(f);
    expect(r.kind).toBe('callback');
    expect(r.name).toBe('Asha Rao');
    expect(r.email).toBe('asha@example.com');
    expect(r.message).toBe('line one\nline two');
    expect(r.existing).toEqual(['website', 'crm']);
    expect(r.consent).toBe(true);
  });
  it('defaults to a project enquiry', () => {
    expect(readEnquiry(new FormData()).kind).toBe('project');
  });
});
