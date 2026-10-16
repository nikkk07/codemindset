import { site } from '@/content/site';

export const DEFAULT_WHATSAPP_TEXT = 'Hi CodeMindset, I’d like to discuss a project.';

/** Click-to-chat link with a pre-filled message (WhatsApp's documented wa.me format). */
export function whatsappHref(text: string = DEFAULT_WHATSAPP_TEXT): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export const callHref = site.phone.href;
export const emailHref = `mailto:${site.email}`;

/** Contact page link, optionally pre-selecting a service. */
export const quoteHref = (service?: string) =>
  service ? `/contact/?service=${encodeURIComponent(service)}` : '/contact/';

export type ContactKind = 'call' | 'whatsapp' | 'email' | 'quote' | 'callback' | 'enquiry';
