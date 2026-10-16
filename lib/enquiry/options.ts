import { getVisibleHubs } from '@/lib/visibility';
import { CONTACT_PREFS, NOT_SURE_SERVICE, TIMEFRAMES } from './schema';

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

/** "What do you need?" — plain words first, the technical name as a hint. */
export function getServiceOptions(env?: NodeJS.ProcessEnv): Option[] {
  const visible = getVisibleHubs(env);
  const options: Option[] = visible.map((h) => ({
    value: h.slug,
    label: h.plainTitle,
    hint: h.title,
  }));
  if (!visible.some((h) => h.slug === 'technical-assessment')) {
    options.push({
      value: NOT_SURE_SERVICE,
      label: 'Not sure what I need',
      hint: 'We’ll help work it out',
    });
  }
  return options;
}

export const labelFor = (options: readonly Option[], value: string) => {
  const o = options.find((x) => x.value === value);
  return o ? (o.hint ? `${o.label} (${o.hint})` : o.label) : value;
};

export const timeframeLabel = (value: string) =>
  TIMEFRAMES.find((t) => t.value === value)?.label ?? '';
export const contactPrefLabel = (value: string) =>
  CONTACT_PREFS.find((c) => c.value === value)?.label ?? '';
