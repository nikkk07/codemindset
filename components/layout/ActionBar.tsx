import Link from 'next/link';
import { ContactLink } from '@/components/ui/ContactLink';
import { ChatIcon, PhoneIcon } from '@/components/ui/Icons';
import { callHref, whatsappHref } from '@/lib/contact';

/** Phones only (<720px): Call · WhatsApp · Get a quote, always within thumb reach. */
export function ActionBar() {
  return (
    <>
      <div className="action-bar-spacer" aria-hidden="true" />
      <nav className="action-bar" aria-label="Quick contact">
        <ContactLink kind="call" where="action-bar" href={callHref}>
          <PhoneIcon />
          Call
        </ContactLink>
        <ContactLink kind="whatsapp" where="action-bar" href={whatsappHref()}>
          <ChatIcon />
          WhatsApp
        </ContactLink>
        <Link href="/contact/" className="action-bar__quote">
          Get a quote
        </Link>
      </nav>
    </>
  );
}
