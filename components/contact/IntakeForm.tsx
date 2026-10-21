'use client';

import Link from 'next/link';
import { useActionState, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { submitEnquiry } from '@/app/contact/actions';
import { ContactLink } from '@/components/ui/ContactLink';
import { ArrowIcon, CheckIcon } from '@/components/ui/Icons';
import { callHref, emailHref, whatsappHref } from '@/lib/contact';
import type { Option } from '@/lib/enquiry/options';
import {
  CONTACT_PREFS,
  EXISTING,
  FIELD_ORDER,
  INTAKE_STEPS,
  LIMITS,
  TIMEFRAMES,
  readEnquiry,
  validateEnquiry,
  type FieldErrors,
  type FieldName,
} from '@/lib/enquiry/schema';
import { ELAPSED_FIELD, HONEYPOT_FIELD } from '@/lib/enquiry/spam';
import { initialEnquiryState, type EnquiryValues } from '@/lib/enquiry/state';

const FIELD_LABELS: Record<FieldName, string> = {
  service: 'What you need',
  message: 'Details',
  existing: 'What you have today',
  timeframe: 'Timing',
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  company: 'Company',
  contactPref: 'How to reach you',
  consent: 'Privacy notice',
};

const fieldId = (n: FieldName) => `enquiry-${n}`;
const errorId = (n: FieldName) => `enquiry-${n}-error`;
const stepOf = (f: FieldName) =>
  Math.max(
    0,
    INTAKE_STEPS.findIndex((s) => s.fields.includes(f)),
  );
const noopSubscribe = () => () => {};
/** False on the server and during hydration, true once the browser has taken over. */
const useHydrated = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

function Err({ name, errors }: { name: FieldName; errors: FieldErrors }) {
  return errors[name] ? (
    <span id={errorId(name)} className="field__error">
      {errors[name]}
    </span>
  ) : null;
}

/**
 * Three short steps: what you need → a few details → how to reach you.
 * Without JavaScript every step is visible and the form posts in one go; with JavaScript it becomes a
 * guided sequence with per-step validation and focus management.
 */
export function IntakeForm({ serviceOptions }: { serviceOptions: Option[] }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const enhanced = useHydrated();
  const [step, setStep] = useState(0);
  const [seenState, setSeenState] = useState(state);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const legendRefs = useRef<(HTMLLegendElement | null)[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const elapsedRef = useRef<HTMLInputElement>(null);
  const sourceRef = useRef<HTMLInputElement>(null);
  const moved = useRef(false);

  const serverErrors = state.status === 'invalid' ? state.errors : {};
  const errors: FieldErrors = clientErrors ?? serverErrors;
  const values: Partial<EnquiryValues> =
    state.status === 'invalid' || state.status === 'error' ? state.values : {};
  const errorList = FIELD_ORDER.filter((f) => errors[f]);
  const ctx = { serviceOptions: serviceOptions.map((o) => o.value) };

  // When the server answers with field errors, jump to the step holding the first one.
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === 'invalid') {
      const first = FIELD_ORDER.find((f) => state.errors[f]);
      if (first) setStep(stepOf(first));
    }
  }

  // Start the time-to-complete clock, record the source page and pre-select from ?service=.
  useEffect(() => {
    startedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    if (sourceRef.current)
      sourceRef.current.value = `${window.location.pathname}${window.location.search}`;
    const wanted = params.get('service');
    const form = formRef.current;
    if (form && wanted && serviceOptions.some((o) => o.value === wanted)) {
      const radio = form.querySelector<HTMLInputElement>(
        `input[name="service"][value="${CSS.escape(wanted)}"]`,
      );
      if (radio && !form.querySelector('input[name="service"]:checked')) radio.checked = true;
    }
  }, [serviceOptions]);

  useEffect(() => {
    if (state.status === 'invalid') summaryRef.current?.focus();
    if (state.status === 'success' || state.status === 'error') resultRef.current?.focus();
  }, [state]);

  useEffect(() => {
    if (!moved.current) return;
    legendRefs.current[step]?.focus();
  }, [step]);

  function errorsFor(stepIndex: number | 'all'): FieldErrors {
    const form = formRef.current;
    if (!form) return {};
    const all = validateEnquiry(readEnquiry(new FormData(form)), ctx);
    if (stepIndex === 'all') return all;
    const fields = INTAKE_STEPS[stepIndex]!.fields;
    return Object.fromEntries(Object.entries(all).filter(([k]) => fields.includes(k as FieldName)));
  }

  function goTo(next: number) {
    moved.current = true;
    setStep(next);
  }

  function onContinue() {
    const found = errorsFor(step);
    if (Object.keys(found).length > 0) {
      setClientErrors(found);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setClientErrors(null);
    goTo(Math.min(step + 1, INTAKE_STEPS.length - 1));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (elapsedRef.current && startedAt.current > 0)
      elapsedRef.current.value = String(Date.now() - startedAt.current);
    if (enhanced && step < INTAKE_STEPS.length - 1) {
      e.preventDefault();
      onContinue();
      return;
    }
    const found = errorsFor('all');
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      setClientErrors(found);
      const first = FIELD_ORDER.find((f) => found[f]);
      if (first) goTo(stepOf(first));
      requestAnimationFrame(() => summaryRef.current?.focus());
    } else {
      setClientErrors(null);
    }
  }

  if (state.status === 'success') {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="notice notice--success"
        data-testid="enquiry-success"
      >
        <div className="notice__head">
          <span className="notice__icon">
            <CheckIcon />
          </span>
          <h2>Enquiry sent</h2>
        </div>
        <p style={{ marginTop: 12 }}>
          Thank you, your enquiry has reached our team. We’ll reply shortly, the way you asked us
          to.
        </p>
        <p style={{ marginTop: 8 }}>
          Need us sooner?{' '}
          <ContactLink kind="whatsapp" where="enquiry-success" href={whatsappHref()}>
            WhatsApp us
          </ContactLink>
          .
        </p>
      </div>
    );
  }

  const describedBy = (n: FieldName, hint?: string) =>
    [hint, errors[n] ? errorId(n) : null].filter(Boolean).join(' ') || undefined;
  const isHidden = (i: number) => enhanced && i !== step;
  const last = INTAKE_STEPS.length - 1;
  const legend = (i: number) => (
    <legend
      ref={(el) => {
        legendRefs.current[i] = el;
      }}
      tabIndex={-1}
    >
      {INTAKE_STEPS[i]!.title}
    </legend>
  );

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className={`intake${enhanced ? ' js' : ''}`}
      data-testid="enquiry-form"
    >
      <input type="hidden" name="kind" value="project" />
      <input type="hidden" name="source" ref={sourceRef} defaultValue="/contact/" />
      <input type="hidden" name={ELAPSED_FIELD} ref={elapsedRef} defaultValue="" />
      <div className="hp" aria-hidden="true">
        <label>
          Fax number
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {enhanced ? (
        <ol className="intake__progress" aria-label="Progress">
          {INTAKE_STEPS.map((s, i) => {
            const st = i < step ? 'done' : i === step ? 'current' : 'todo';
            return (
              <li key={s.id}>
                {i < step ? (
                  <button type="button" data-state={st} onClick={() => goTo(i)}>
                    {i + 1}. {s.label}
                    <span className="sr-only"> (completed, edit)</span>
                  </button>
                ) : (
                  <span data-state={st} aria-current={i === step ? 'step' : undefined}>
                    {i + 1}. {s.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      ) : null}

      {errorList.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="intake-error-title"
          className="notice notice--error"
          data-testid="enquiry-error-summary"
        >
          <h2 id="intake-error-title">
            Check {errorList.length === 1 ? 'one answer' : `${errorList.length} answers`}
          </h2>
          <ul>
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${fieldId(f)}`} onClick={() => enhanced && setStep(stepOf(f))}>
                  {FIELD_LABELS[f]}: {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {state.status === 'error' ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="notice notice--error"
          data-testid="enquiry-delivery-error"
        >
          <h2>Your enquiry was not sent</h2>
          <p style={{ marginTop: 8 }}>
            {state.reason === 'not-configured'
              ? 'Online enquiries are not switched on yet.'
              : 'Something went wrong while sending it.'}{' '}
            Your answers are still in the form. Please reach us directly instead:
          </p>
          <ul>
            <li>
              <ContactLink kind="call" where="enquiry-error" href={callHref}>
                Call us
              </ContactLink>
            </li>
            <li>
              <ContactLink kind="whatsapp" where="enquiry-error" href={whatsappHref()}>
                WhatsApp us
              </ContactLink>
            </li>
            <li>
              <ContactLink kind="email" where="enquiry-error" href={emailHref}>
                Email us
              </ContactLink>
            </li>
          </ul>
        </div>
      ) : null}

      {/* Step 1 */}
      <fieldset
        className="intake__step"
        hidden={isHidden(0)}
        aria-describedby={describedBy('service')}
      >
        {legend(0)}
        <div
          className="choices"
          id={fieldId('service')}
          tabIndex={-1}
          role="radiogroup"
          aria-label="What do you need?"
          aria-invalid={errors.service ? true : undefined}
        >
          {serviceOptions.map((o) => (
            <label key={o.value} className="choice">
              <input
                type="radio"
                name="service"
                value={o.value}
                defaultChecked={values.service === o.value}
              />
              <span className="choice__text">
                {o.label}
                {o.hint ? <small>{o.hint}</small> : null}
              </span>
            </label>
          ))}
        </div>
        <Err name="service" errors={errors} />
      </fieldset>

      {/* Step 2 */}
      <fieldset className="intake__step" hidden={isHidden(1)}>
        {legend(1)}
        <div className="field">
          <label className="field__label" htmlFor={fieldId('message')}>
            Describe what you need, in your own words
          </label>
          <span id={`${fieldId('message')}-hint`} className="field__hint">
            What happens today, what should change, and anything you already have. No technical
            words needed.
          </span>
          <textarea
            id={fieldId('message')}
            name="message"
            rows={5}
            maxLength={LIMITS.message.max}
            defaultValue={values.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy('message', `${fieldId('message')}-hint`)}
            className="field__control"
          />
          <Err name="message" errors={errors} />
        </div>
        <div className="field">
          <span className="field__label" id="existing-label">
            What do you have today? <small>(optional)</small>
          </span>
          <div
            className="choices--inline"
            id={fieldId('existing')}
            role="group"
            aria-labelledby="existing-label"
          >
            {EXISTING.map((x) => (
              <label key={x.value} className="choice">
                <input
                  type="checkbox"
                  name="existing"
                  value={x.value}
                  defaultChecked={values.existing?.includes(x.value)}
                />
                <span className="choice__text">{x.label}</span>
              </label>
            ))}
          </div>
          <Err name="existing" errors={errors} />
        </div>
        <div className="field">
          <span className="field__label" id="timeframe-label">
            When do you need it? <small>(optional)</small>
          </span>
          <div
            className="choices--inline"
            id={fieldId('timeframe')}
            role="radiogroup"
            aria-labelledby="timeframe-label"
          >
            {TIMEFRAMES.map((t) => (
              <label key={t.value} className="choice">
                <input
                  type="radio"
                  name="timeframe"
                  value={t.value}
                  defaultChecked={values.timeframe === t.value}
                />
                <span className="choice__text">{t.label}</span>
              </label>
            ))}
          </div>
          <Err name="timeframe" errors={errors} />
        </div>
      </fieldset>

      {/* Step 3 */}
      <fieldset className="intake__step" hidden={isHidden(2)}>
        {legend(2)}
        <div className="fields-2">
          <div className="field">
            <label className="field__label" htmlFor={fieldId('name')}>
              Your name
            </label>
            <input
              id={fieldId('name')}
              name="name"
              type="text"
              autoComplete="name"
              defaultValue={values.name}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy('name')}
              className="field__control"
            />
            <Err name="name" errors={errors} />
          </div>
          <div className="field">
            <label className="field__label" htmlFor={fieldId('company')}>
              Company <small>(optional)</small>
            </label>
            <input
              id={fieldId('company')}
              name="company"
              type="text"
              autoComplete="organization"
              defaultValue={values.company}
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={describedBy('company')}
              className="field__control"
            />
            <Err name="company" errors={errors} />
          </div>
          <div className="field">
            <label className="field__label" htmlFor={fieldId('phone')}>
              Phone or WhatsApp number
            </label>
            <input
              id={fieldId('phone')}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              defaultValue={values.phone}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy('phone', 'contact-hint')}
              className="field__control"
            />
            <Err name="phone" errors={errors} />
          </div>
          <div className="field">
            <label className="field__label" htmlFor={fieldId('email')}>
              Email
            </label>
            <input
              id={fieldId('email')}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={values.email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy('email', 'contact-hint')}
              className="field__control"
            />
            <Err name="email" errors={errors} />
          </div>
        </div>
        <span id="contact-hint" className="field__hint">
          A phone number or an email is enough, whichever you prefer.
        </span>
        <div className="field">
          <span className="field__label" id="pref-label">
            Best way to reach you <small>(optional)</small>
          </span>
          <div
            className="choices--inline"
            id={fieldId('contactPref')}
            role="radiogroup"
            aria-labelledby="pref-label"
          >
            {CONTACT_PREFS.map((c) => (
              <label key={c.value} className="choice">
                <input
                  type="radio"
                  name="contactPref"
                  value={c.value}
                  defaultChecked={values.contactPref === c.value}
                />
                <span className="choice__text">{c.label}</span>
              </label>
            ))}
          </div>
          <Err name="contactPref" errors={errors} />
        </div>
        <label className="consent" htmlFor={fieldId('consent')}>
          <input
            id={fieldId('consent')}
            name="consent"
            type="checkbox"
            value="yes"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy('consent')}
          />
          <span>
            I have read the <Link href="/privacy/">privacy notice</Link> and agree to be contacted
            about my enquiry.
          </span>
        </label>
        <Err name="consent" errors={errors} />
      </fieldset>

      <div className="intake__actions">
        {enhanced && step > 0 ? (
          <button type="button" className="btn btn--outline" onClick={() => goTo(step - 1)}>
            Back
          </button>
        ) : (
          <span className="intake__fine">Takes about a minute.</span>
        )}
        {enhanced && step < last ? (
          <button
            type="button"
            className="btn btn--primary btn--lg"
            onClick={onContinue}
            data-testid="intake-continue"
          >
            Continue <ArrowIcon />
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn--primary btn--lg"
            disabled={pending}
            data-testid="intake-submit"
          >
            {pending ? 'Sending…' : 'Send enquiry'}
          </button>
        )}
      </div>
    </form>
  );
}
