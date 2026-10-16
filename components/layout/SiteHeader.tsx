'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { ContactLink } from '@/components/ui/ContactLink';
import {
  ChatIcon,
  ChevronIcon,
  CloseIcon,
  MenuIcon,
  PhoneIcon,
  ServiceIcon,
} from '@/components/ui/Icons';
import { callHref, whatsappHref } from '@/lib/contact';
import type { MegaGroup, NavLink } from '@/lib/nav';
import type { IconName } from '@/content/types';

type Menu = 'services' | 'industries' | null;

interface Props {
  mega: { groups: MegaGroup[]; assessment: MegaGroup | null };
  industries: (NavLink & { icon: IconName; intro: string })[];
  knowledge: NavLink[];
  topLinks: NavLink[];
  quote: NavLink;
  hubs: (NavLink & { hint: string })[];
}

const isMouse = (e: React.PointerEvent) => e.pointerType === 'mouse';

export function SiteHeader({ mega, industries, knowledge, topLinks, quote, hubs }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Menu>(null);
  const [mobile, setMobile] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus after navigation (state adjusted during render, React's recommended pattern).
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  // Navigation also cancels any pending hover timer; clear it on unmount too.
  useEffect(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }, [pathname]);

  // Escape closes; clicking outside closes the desktop menus.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (open) {
        triggers.current[open]?.focus();
        setOpen(null);
      } else if (mobile) {
        setMobile(false);
        burgerRef.current?.focus();
      }
    }
    function onDown(e: PointerEvent) {
      if (open && headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open, mobile]);

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobile]);

  const hoverOpen = (m: Menu) => (e: React.PointerEvent) => {
    if (!isMouse(e)) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(m), 80);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (!isMouse(e)) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(null), 180);
  };
  const toggle = (m: Exclude<Menu, null>) => setOpen((cur) => (cur === m ? null : m));
  // A pending hover timer must not reopen a menu that a click (or navigation) just closed.
  const cancelHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };
  const close = () => {
    cancelHover();
    setOpen(null);
  };
  const closeAll = () => {
    cancelHover();
    setOpen(null);
    setMobile(false);
  };

  const hasServices = mega.groups.length > 0 || mega.assessment !== null;

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container site-header__bar">
        <Logo onClick={closeAll} />

        <nav className="nav" aria-label="Primary">
          {hasServices ? (
            <div
              className="nav__item"
              onPointerEnter={hoverOpen('services')}
              onPointerLeave={hoverClose}
            >
              <button
                type="button"
                className="nav__trigger"
                aria-expanded={open === 'services'}
                aria-controls="mega-services"
                onClick={() => toggle('services')}
                ref={(el) => {
                  triggers.current.services = el;
                }}
              >
                Services <ChevronIcon />
              </button>
            </div>
          ) : null}
          {industries.length > 0 ? (
            <div
              className="nav__item"
              onPointerEnter={hoverOpen('industries')}
              onPointerLeave={hoverClose}
            >
              <button
                type="button"
                className="nav__trigger"
                aria-expanded={open === 'industries'}
                aria-controls="menu-industries"
                onClick={() => toggle('industries')}
                ref={(el) => {
                  triggers.current.industries = el;
                }}
              >
                Industries <ChevronIcon />
              </button>
              {open === 'industries' ? (
                <div className="dropdown" id="menu-industries">
                  {industries.map((i) => (
                    <Link key={i.href} href={i.href} onClick={close}>
                      <span className="icon-box">
                        <ServiceIcon name={i.icon} />
                      </span>
                      <span>
                        <strong>{i.label}</strong>
                        <small>{i.intro.split('. ')[0]}.</small>
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          {topLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav__link"
              aria-current={pathname === l.href ? 'page' : undefined}
              onClick={close}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ContactLink
            kind="call"
            where="header"
            href={callHref}
            className="header-call"
            ariaLabel="Call us"
          >
            <PhoneIcon />
            <span className="header-call__text" aria-hidden="true">
              Call us
            </span>
          </ContactLink>
          <Link
            href={quote.href}
            className="btn btn--primary btn--sm header-quote"
            onClick={closeAll}
          >
            {quote.label}
          </Link>
          <button
            type="button"
            className="burger"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            aria-label={mobile ? 'Close menu' : 'Menu'}
            onClick={() => setMobile((m) => !m)}
            ref={burgerRef}
          >
            {mobile ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open === 'services' && hasServices ? (
        <div
          className="mega"
          id="mega-services"
          onPointerEnter={hoverOpen('services')}
          onPointerLeave={hoverClose}
          data-testid="mega-menu"
        >
          <div className="mega__panel">
            <div className="mega__grid">
              {mega.groups.map((g) => (
                <div className="mega__group" key={g.slug}>
                  <Link href={g.href} className="mega__head" onClick={close}>
                    <span className="mega__icon">
                      <ServiceIcon name={g.icon} />
                    </span>
                    <span>
                      <span className="mega__title">{g.title}</span>
                      <span className="mega__blurb">{g.blurb}</span>
                    </span>
                  </Link>
                  {g.items.length > 0 ? (
                    <ul className="mega__list">
                      {g.items.map((i) => (
                        <li key={i.href}>
                          <Link href={i.href} onClick={close}>
                            {i.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {g.tech.length > 0 ? (
                    <div className="mega__tech">
                      {g.tech.map((t) => (
                        <Link key={t.href} href={t.href} onClick={close}>
                          {t.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <aside className="mega__aside">
              <span
                className="pill"
                style={{ background: 'var(--amber)', color: 'var(--amber-ink)' }}
              >
                Not sure?
              </span>
              <strong>Tell us the problem — we’ll suggest the solution</strong>
              <p>
                No technical knowledge needed. We recommend what to build, buy or fix — or whether
                you need anything at all.
              </p>
              <Link
                href={mega.assessment?.href ?? quote.href}
                className="btn btn--white"
                onClick={close}
              >
                {mega.assessment ? 'Start with an assessment' : 'Tell us what you need'}
              </Link>
              <ContactLink
                kind="whatsapp"
                where="mega-menu"
                href={whatsappHref()}
                className="btn btn--ghost"
              >
                <ChatIcon /> WhatsApp us
              </ContactLink>
            </aside>
            <div className="mega__foot">
              <Link href="/services/" onClick={close}>
                View all services →
              </Link>
              {knowledge.some((k) => k.label === 'Guides') ? (
                <span>
                  Not sure which technology?{' '}
                  <Link href="/knowledge/guides/" onClick={close}>
                    Read our simple guides
                  </Link>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {mobile ? (
        <nav className="mnav" id="mobile-menu" aria-label="Mobile">
          {hubs.length > 0 ? (
            <details className="mnav__group" open>
              <summary>
                Services <ChevronIcon />
              </summary>
              <ul className="mnav__list">
                {hubs.map((h) => (
                  <li key={h.href}>
                    <Link href={h.href} onClick={closeAll}>
                      {h.label}
                      <small>{h.hint}</small>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services/" onClick={closeAll}>
                    All services →
                  </Link>
                </li>
              </ul>
            </details>
          ) : null}
          {industries.length > 0 ? (
            <details className="mnav__group">
              <summary>
                Industries <ChevronIcon />
              </summary>
              <ul className="mnav__list">
                {industries.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} onClick={closeAll}>
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
          {topLinks.map((l) => (
            <Link key={l.href} href={l.href} className="mnav__link" onClick={closeAll}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact/" className="mnav__link" onClick={closeAll}>
            Contact
          </Link>
          <div className="mnav__cta">
            <ContactLink
              kind="call"
              where="mobile-menu"
              href={callHref}
              className="btn btn--outline"
            >
              <PhoneIcon /> Call us
            </ContactLink>
            <ContactLink
              kind="whatsapp"
              where="mobile-menu"
              href={whatsappHref()}
              className="btn btn--outline"
            >
              <ChatIcon /> WhatsApp
            </ContactLink>
            <Link href={quote.href} className="btn btn--primary btn--lg" onClick={closeAll}>
              {quote.label}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
