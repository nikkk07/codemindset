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
import type { NavLink, ServiceNavItem } from '@/lib/nav';

interface Props {
  services: { main: ServiceNavItem[]; bigger: NavLink[]; help: NavLink | null };
  topLinks: NavLink[];
  quote: NavLink;
}

const isMouse = (e: React.PointerEvent) => e.pointerType === 'mouse';

export function SiteHeader({ services, topLinks, quote }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus after navigation (state adjusted during render, React's recommended pattern).
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    setOpen(false);
    setMobile(false);
  }

  // Navigation cancels any pending hover timer.
  useEffect(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }, [pathname]);

  // Escape closes; clicking outside closes the dropdown.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (open) {
        setOpen(false);
        triggerRef.current?.focus();
      } else if (mobile) {
        setMobile(false);
        burgerRef.current?.focus();
      }
    }
    function onDown(e: PointerEvent) {
      if (open && headerRef.current && !headerRef.current.contains(e.target as Node))
        setOpen(false);
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

  const cancelHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };
  const onEnter = (e: React.PointerEvent) => {
    if (!isMouse(e)) return;
    cancelHover();
    hoverTimer.current = setTimeout(() => setOpen(true), 80);
  };
  const onLeave = (e: React.PointerEvent) => {
    if (!isMouse(e)) return;
    cancelHover();
    hoverTimer.current = setTimeout(() => setOpen(false), 220);
  };
  // A pending hover timer must not reopen a menu that a click just closed.
  const close = () => {
    cancelHover();
    setOpen(false);
  };
  const closeAll = () => {
    cancelHover();
    setOpen(false);
    setMobile(false);
  };

  const hasServices = services.main.length + services.bigger.length > 0;

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container site-header__bar">
        <Logo onClick={closeAll} />

        <nav className="nav" aria-label="Primary">
          {hasServices ? (
            <div className="nav__item" onPointerEnter={onEnter} onPointerLeave={onLeave}>
              <button
                type="button"
                className="nav__trigger"
                aria-expanded={open}
                aria-controls="menu-services"
                onClick={() => {
                  cancelHover();
                  setOpen((v) => !v);
                }}
                ref={triggerRef}
              >
                Services <ChevronIcon />
              </button>
              {open ? (
                <div className="svc-menu" id="menu-services" data-testid="services-menu">
                  <div className="svc-menu__main">
                    {services.main.map((s) => (
                      <Link key={s.href} href={s.href} className="svc-menu__item" onClick={close}>
                        <span className="icon-box">
                          <ServiceIcon name={s.icon} />
                        </span>
                        <span>
                          <strong>{s.label}</strong>
                          <small>{s.plain}</small>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="svc-menu__side">
                    {services.bigger.length > 0 ? (
                      <>
                        <p className="svc-menu__label">For bigger projects</p>
                        {services.bigger.map((b) => (
                          <Link key={b.href} href={b.href} onClick={close}>
                            {b.label}
                          </Link>
                        ))}
                      </>
                    ) : null}
                    <Link href="/services/" className="svc-menu__all" onClick={close}>
                      All services →
                    </Link>
                    {services.help ? (
                      <div className="svc-menu__help">
                        <p className="svc-menu__label">Not sure what you need?</p>
                        <Link
                          href={services.help.href}
                          className="btn btn--primary btn--sm"
                          onClick={close}
                        >
                          {services.help.label}
                        </Link>
                      </div>
                    ) : null}
                  </div>
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

      {mobile ? (
        <nav className="mnav" id="mobile-menu" aria-label="Mobile">
          {hasServices ? (
            <details className="mnav__group" open>
              <summary>
                Services <ChevronIcon />
              </summary>
              <ul className="mnav__list">
                {services.main.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} onClick={closeAll}>
                      {s.plain}
                      <small>{s.label}</small>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services/" onClick={closeAll}>
                    All services
                    <small>Including custom software and AI for bigger projects</small>
                  </Link>
                </li>
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
