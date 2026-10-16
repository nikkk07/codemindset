import type { EnquiryInput, FieldErrors } from './schema';

export type EnquiryValues = Omit<EnquiryInput, 'consent'>;

export type EnquiryState =
  | { status: 'idle' }
  | { status: 'invalid'; errors: FieldErrors; values: EnquiryValues }
  | { status: 'success' }
  | { status: 'error'; reason: 'not-configured' | 'failed' | 'blocked'; values: EnquiryValues };

export const initialEnquiryState: EnquiryState = { status: 'idle' };
