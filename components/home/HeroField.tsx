'use client';

import { useEffect, useRef } from 'react';
import { afterInteractive, motionAllowed } from '@/components/motion/MotionRoot';

/**
 * Mounts the hero's WebGL field once the page is interactive (see afterInteractive).
 * Until then (and forever, without WebGL2 / with reduced motion / with Save-Data) the hero shows
 * its static dotted SVG mark, so first paint and LCP never wait on WebGL.
 */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.closest('section');
    if (!canvas || !hero || !motionAllowed()) return;

    let handle: { destroy: () => void } | null = null;
    let cancelled = false;

    afterInteractive()
      .then(() => import('@/lib/motion/field'))
      .then(({ startField }) => {
        if (cancelled || !motionAllowed()) return;
        handle = startField(
          canvas,
          hero,
          hero.querySelector<HTMLElement>('[data-field-anchor]'),
          () => hero.classList.add('field-on'),
          () => hero.classList.remove('field-on'),
        );
      })
      .catch((err: unknown) => {
        console.warn('[hero-field]', err);
        hero.classList.remove('field-on');
      });

    return () => {
      cancelled = true;
      handle?.destroy();
      hero.classList.remove('field-on');
    };
  }, []);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
}
