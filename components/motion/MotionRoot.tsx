'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { MotionApi } from '@/lib/motion/engine';

/** Run work when the browser is idle, so motion never delays first paint or first input. */
export function whenIdle(fn: () => void, timeout = 2500): () => void {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(fn, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 600);
  return () => window.clearTimeout(id);
}

let ready: Promise<void> | null = null;

/**
 * Resolves once the page is interactive AND the visitor has shown up (first pointer move, touch,
 * wheel, scroll or key), or 4.5 s after load if they haven't, and then the browser is idle.
 * Motion JS therefore never competes with hydration or the first tap. Shared by every caller,
 * so the engine and the hero field load together.
 */
export function afterInteractive(): Promise<void> {
  if (ready) return ready;
  ready = new Promise<void>((resolve) => {
    const events = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'scroll', 'keydown'];
    let done = false;
    let timer = 0;
    const go = () => {
      if (done) return;
      done = true;
      events.forEach((e) => window.removeEventListener(e, go));
      window.clearTimeout(timer);
      whenIdle(resolve, 1000);
    };
    const arm = () => {
      events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
      timer = window.setTimeout(go, 4500);
    };
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });
  });
  return ready;
}

export function motionAllowed(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !conn?.saveData;
}

/**
 * Loads the motion engine (Lenis + GSAP) once the page is interactive. Renders nothing.
 * Reduced motion or Save-Data: the engine is never downloaded.
 */
export function MotionRoot() {
  const pathname = usePathname();
  const api = useRef<MotionApi | null>(null);
  const first = useRef(true);

  useEffect(() => {
    if (!motionAllowed()) return;
    let cancelled = false;
    afterInteractive()
      .then(() => import('@/lib/motion/engine'))
      .then(({ startMotion }) => {
        if (!cancelled && motionAllowed()) api.current = startMotion();
      })
      .catch((err: unknown) => console.warn('[motion]', err));

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      if (rm.matches) {
        api.current?.destroy();
        api.current = null;
      }
    };
    rm.addEventListener('change', onChange);
    return () => {
      cancelled = true;
      rm.removeEventListener('change', onChange);
      api.current?.destroy();
      api.current = null;
    };
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    api.current?.refresh();
  }, [pathname]);

  return null;
}
