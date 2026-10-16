'use client';

import Link from 'next/link';
import { useActionState, useEffect, useRef } from 'react';
import { submitEnquiry } from '@/app/contact/actions';
import { ContactLink } from '@/components/ui/ContactLink';
import { CheckIcon } from '@/components/ui/Icons';
import { callHref, whatsappHref } from '@/lib/contact';
import type { Option } from '@/lib/enquiry/options';
import { ELAPSED_FIELD, HONEYPOT_FIELD } from '@/lib/enquiry/spam';
import { initialEnquiryState } from '@/lib/enquiry/state';

/** Three fields: name, phone, need. The lowest-effort way to start a conversation. */
export function CallbackForm({ options, source }: { options: Option[]; source: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const startedAt = useRef(0);
  const elapsedRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (state.status !== 'idle') resultRef.current?.focus();
  }, [state]);

  if (state.status === 'success') {
    return (
      <div
        className="callback"
        ref={resultRef}
        tabIndex={-1}
        role="status"
        data-testid="callback-success"
      >
        <div className="notice__head">
          <span className="notice__icon">
            <CheckIcon />
          </span>
          <strong className="callback__title">Request received</strong>
        </div>
        <p>Thank you. Our team will call you back shortly.</p>
      </div>
    );
  }

  const errors = state.status === 'invalid' ? state.errors : {};
  const values = state.status === 'invalid' || state.status === 'error' ? state.values : undefined;

  return (
    <form
      className="callback"
      action={action}
      onSubmit={() => {
        if (elapsedRef.current && startedAt.current > 0)
          elapsedRef.current.value = String(Date.now() - startedAt.current);
      }}
      noValidate
      data-testid="callback-form"
    >
      <h3 className="callback__title">Request a callback</h3>
      <p className="callback__sub">Three fields. Takes 20 seconds.</p>
      <input type="hidden" name="kind" value="callback" />
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name={ELAPSED_FIELD} ref={elapsedRef} defaultValue="" />
      <div className="hp" aria-hidden="true">
        <label>
          Fax number
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === 'error' ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="notice notice--error"
          data-testid="callback-error"
        >
          <h2>Not sent</h2>
          <p>
            Something went wrong. Please{' '}
            <ContactLink kind="call" where="callback-error" href={callHref}>
              call us
            </ContactLink>{' '}
            or{' '}
            <ContactLink kind="whatsapp" where="callback-error" href={whatsappHref()}>
              message us on WhatsApp
            </ContactLink>
            .
          </p>
        </div>
      ) : null}

      <div className="field">
        <label className="field__label" htmlFor="cb-name">
          Your name
        </label>
        <input
          id="cb-name"
          name="name"
          type="text"
          autoComplete="name"
          className="field__control"
          defaultValue={values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'cb-name-error' : undefined}
        />
        {errors.name ? (
          <span id="cb-name-error" className="field__error">
            {errors.name}
          </span>
        ) : null}
      </div>
      <div className="field">
        <label className="field__label" htmlFor="cb-phone">
          Phone or WhatsApp number
        </label>
        <input
          id="cb-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className="field__control"
          defaultValue={values?.phone}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? 'cb-phone-error' : undefined}
        />
        {errors.phone ? (
          <span id="cb-phone-error" className="field__error">
            {errors.phone}
          </span>
        ) : null}
      </div>
      <div className="field">
        <label className="field__label" htmlFor="cb-need">
          What do you need?
        </label>
        <select
          id="cb-need"
          name="service"
          className="field__control"
          defaultValue={values?.service || options[0]?.value}
          aria-invalid={errors.service ? true : undefined}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {errors.service ? <span className="field__error">{errors.service}</span> : null}
      </div>
      <button type="submit" className="btn btn--primary btn--lg" disabled={pending}>
        {pending ? 'Sending…' : 'Request a callback'}
      </button>
      <p className="callback__fine">
        Have more detail? <Link href="/contact/">Use the full project form</Link>. By sending this
        you agree to our <Link href="/privacy/">privacy notice</Link>; we use your details only to
        reply.
      </p>
    </form>
  );
}
