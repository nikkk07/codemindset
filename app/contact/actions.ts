'use server';

import { composeEnquiryEmail, deliverEnquiry, readMailerConfig } from '@/lib/enquiry/mailer';
import {
  contactPrefLabel,
  getServiceOptions,
  labelFor,
  timeframeLabel,
} from '@/lib/enquiry/options';
import { readEnquiry, validateEnquiry } from '@/lib/enquiry/schema';
import { checkSpam } from '@/lib/enquiry/spam';
import type { EnquiryState } from '@/lib/enquiry/state';

/** Handles both the 3-step project form and the quick callback form (field "kind"). */
export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const input = readEnquiry(form);
  // Values echoed back to the form on error; consent must be given again explicitly.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { consent: _consent, ...values } = input;
  const serviceOptions = getServiceOptions();

  const errors = validateEnquiry(input, { serviceOptions: serviceOptions.map((o) => o.value) });
  if (Object.keys(errors).length > 0) return { status: 'invalid', errors, values };

  const spam = checkSpam(form, input.message);
  if (spam.spam) {
    console.warn(`[enquiry] rejected: ${spam.reason}`);
    return { status: 'error', reason: 'blocked', values };
  }

  const email = composeEnquiryEmail({
    ...input,
    serviceLabel: labelFor(serviceOptions, input.service),
    timeframeLabel: timeframeLabel(input.timeframe),
    contactPrefLabel: contactPrefLabel(input.contactPref),
  });

  const result = await deliverEnquiry(
    { ...email, replyTo: input.email || undefined },
    readMailerConfig(),
  );
  if (result.ok) return { status: 'success' };

  // Log the failure class only: never the enquiry content.
  console.error(`[enquiry] delivery failed: ${result.reason}`);
  return {
    status: 'error',
    reason: result.reason === 'not-configured' ? 'not-configured' : 'failed',
    values,
  };
}
