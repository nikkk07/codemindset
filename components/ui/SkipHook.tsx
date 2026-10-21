import Link from 'next/link';
import { ContactLink } from '@/components/ui/ContactLink';
import { ArrowIcon, ChatIcon } from '@/components/ui/Icons';
import { quoteHref, whatsappHref } from '@/lib/contact';

/**
 * "Skip all this — we'll do it for you": a done-for-you offer placed after the reader has seen
 * how much work a task involves. Bold, but one per screen at most.
 */
export function SkipHook({
  title,
  text,
  cta,
  service,
  whatsapp,
  where,
}: {
  title: string;
  text: string;
  cta: string;
  service?: string;
  whatsapp?: string;
  where: string;
}) {
  return (
    <aside className="hook" aria-label="Done-for-you offer">
      <div className="hook__body">
        <span className="hook__badge">Done for you</span>
        <p className="hook__title">{title}</p>
        <p className="hook__text">{text}</p>
      </div>
      <div className="hook__actions">
        <Link href={quoteHref(service)} className="btn btn--white btn--lg">
          {cta} <ArrowIcon />
        </Link>
        <ContactLink
          kind="whatsapp"
          where={where}
          href={whatsappHref(whatsapp)}
          className="btn btn--ghost btn--lg"
        >
          <ChatIcon /> WhatsApp us
        </ContactLink>
        <span className="hook__note">Free quote · No obligation · Quick reply</span>
      </div>
    </aside>
  );
}
