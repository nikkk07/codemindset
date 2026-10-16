import type { Region } from './types';

/**
 * All 28 states and 8 union territories of India (as of 2026).
 * The /india/ hub lists every region. A region page goes live only when `local` holds unique,
 * genuinely local content and the page is approved — never as a copy-paste template.
 */
const r = (name: string, type: Region['type'] = 'state'): Region => ({
  slug: name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
  name,
  type,
  local: null,
  review: 'draft',
});

export const regions: Region[] = [
  r('Andhra Pradesh'),
  r('Arunachal Pradesh'),
  r('Assam'),
  r('Bihar'),
  r('Chhattisgarh'),
  r('Goa'),
  r('Gujarat'),
  r('Haryana'),
  r('Himachal Pradesh'),
  r('Jharkhand'),
  r('Karnataka'),
  r('Kerala'),
  r('Madhya Pradesh'),
  r('Maharashtra'),
  r('Manipur'),
  r('Meghalaya'),
  r('Mizoram'),
  r('Nagaland'),
  r('Odisha'),
  r('Punjab'),
  r('Rajasthan'),
  r('Sikkim'),
  r('Tamil Nadu'),
  r('Telangana'),
  r('Tripura'),
  r('Uttar Pradesh'),
  r('Uttarakhand'),
  r('West Bengal'),
  r('Andaman and Nicobar Islands', 'union-territory'),
  r('Chandigarh', 'union-territory'),
  r('Dadra and Nagar Haveli and Daman and Diu', 'union-territory'),
  r('Delhi', 'union-territory'),
  r('Jammu and Kashmir', 'union-territory'),
  r('Ladakh', 'union-territory'),
  r('Lakshadweep', 'union-territory'),
  r('Puducherry', 'union-territory'),
];
