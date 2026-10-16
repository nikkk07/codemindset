/**
 * Enquiry validation shared by the browser and the server.
 * Two forms use it: the 3-step project form (/contact/) and the quick callback form (home page).
 * Written without a validation library to keep the client bundle small; covered by unit tests.
 */

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  company: { max: 120 },
  message: { min: 20, max: 2000 },
  phoneDigits: { min: 8, max: 15 },
} as const;

export const TIMEFRAMES = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: 'In 1 to 3 months' },
  { value: 'later', label: 'Later / just exploring' },
] as const;

export const EXISTING = [
  { value: 'website', label: 'A website' },
  { value: 'crm', label: 'A CRM or sales tool' },
  { value: 'spreadsheets', label: 'Spreadsheets' },
  { value: 'software', label: 'Other software' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'nothing', label: 'Nothing yet' },
] as const;

export const CONTACT_PREFS = [
  { value: 'call', label: 'Call' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
] as const;

export const NOT_SURE_SERVICE = 'not-sure';

export type FormKind = 'project' | 'callback';

export type FieldName =
  | 'service'
  | 'message'
  | 'existing'
  | 'timeframe'
  | 'name'
  | 'phone'
  | 'email'
  | 'company'
  | 'contactPref'
  | 'consent';

export interface EnquiryInput {
  kind: FormKind;
  service: string;
  message: string;
  existing: string[];
  timeframe: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  contactPref: string;
  consent: boolean;
  /** Page the form was sent from (for attribution). */
  source: string;
}

export type FieldErrors = Partial<Record<FieldName, string>>;

export interface ValidationContext {
  serviceOptions: readonly string[];
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

const clean = (v: unknown) =>
  typeof v === 'string'
    ? v
        .replace(/\u0000/g, '')
        .replace(/\r\n?/g, '\n')
        .trim()
    : '';
const oneLine = (v: unknown) => clean(v).replace(/\s+/g, ' ');

export function readEnquiry(form: FormData): EnquiryInput {
  return {
    kind: form.get('kind') === 'callback' ? 'callback' : 'project',
    service: oneLine(form.get('service')),
    message: clean(form.get('message')),
    existing: form
      .getAll('existing')
      .filter((v): v is string => typeof v === 'string')
      .map((v) => v.trim()),
    timeframe: oneLine(form.get('timeframe')),
    name: oneLine(form.get('name')),
    phone: oneLine(form.get('phone')),
    email: oneLine(form.get('email')).toLowerCase(),
    company: oneLine(form.get('company')),
    contactPref: oneLine(form.get('contactPref')),
    consent: form.get('consent') === 'yes',
    source: oneLine(form.get('source')).slice(0, 200),
  };
}

const phoneError = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return !/^[+()\d\s-]+$/.test(phone) ||
    digits.length < LIMITS.phoneDigits.min ||
    digits.length > LIMITS.phoneDigits.max
    ? 'Enter a phone number with 8 to 15 digits, for example +91 98765 43210.'
    : null;
};

export function validateEnquiry(input: EnquiryInput, ctx: ValidationContext): FieldErrors {
  const e: FieldErrors = {};

  if (!input.service) e.service = 'Choose the option closest to what you need.';
  else if (!ctx.serviceOptions.includes(input.service))
    e.service = 'Choose an option from the list.';

  if (input.name.length < LIMITS.name.min) e.name = 'Enter your name.';
  else if (input.name.length > LIMITS.name.max)
    e.name = `Keep your name under ${LIMITS.name.max} characters.`;

  if (input.kind === 'callback') {
    const pe = input.phone
      ? phoneError(input.phone)
      : 'Enter your phone or WhatsApp number so we can call you back.';
    if (pe) e.phone = pe;
    return e;
  }

  // Project form.
  if (input.message.length < LIMITS.message.min)
    e.message = `Tell us a little more — at least ${LIMITS.message.min} characters.`;
  else if (input.message.length > LIMITS.message.max)
    e.message = `Keep the description under ${LIMITS.message.max} characters.`;

  if (input.existing.some((v) => !EXISTING.some((x) => x.value === v)))
    e.existing = 'Choose options from the list.';
  if (input.timeframe && !TIMEFRAMES.some((t) => t.value === input.timeframe))
    e.timeframe = 'Choose an option from the list.';

  if (!input.phone && !input.email) {
    e.phone = 'Enter a phone number or an email address so we can reply.';
  } else {
    if (input.phone) {
      const pe = phoneError(input.phone);
      if (pe) e.phone = pe;
    }
    if (input.email && (input.email.length > LIMITS.email.max || !EMAIL_RE.test(input.email)))
      e.email = 'Enter an email address in the format name@company.com.';
  }

  if (input.company.length > LIMITS.company.max)
    e.company = `Keep the company name under ${LIMITS.company.max} characters.`;
  if (input.contactPref && !CONTACT_PREFS.some((c) => c.value === input.contactPref))
    e.contactPref = 'Choose an option from the list.';
  if (input.contactPref === 'email' && !input.email && !e.email)
    e.email = 'Enter your email address, or choose another way to reach you.';

  if (!input.consent) e.consent = 'Confirm that you have read the privacy notice.';

  return e;
}

/** Order used for the error summary and focus management. */
export const FIELD_ORDER: FieldName[] = [
  'service',
  'message',
  'existing',
  'timeframe',
  'name',
  'phone',
  'email',
  'company',
  'contactPref',
  'consent',
];

/** The project form's three steps and the fields each one owns. */
export const INTAKE_STEPS: { id: string; label: string; title: string; fields: FieldName[] }[] = [
  { id: 'need', label: 'Need', title: 'What do you need?', fields: ['service'] },
  {
    id: 'details',
    label: 'Details',
    title: 'Tell us a bit more',
    fields: ['message', 'existing', 'timeframe'],
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'How can we reach you?',
    fields: ['name', 'phone', 'email', 'company', 'contactPref', 'consent'],
  },
];
