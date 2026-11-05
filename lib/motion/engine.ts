/**
 * Motion engine: Lenis smooth scroll + GSAP ScrollTrigger on ONE ticker.
 *
 * Loaded lazily (after the page is idle) by components/motion/MotionRoot.tsx, so it never competes
 * with LCP or first input. Everything here is progressive enhancement: with no JS, or with
 * prefers-reduced-motion, the site renders exactly as before.
 *
 * Rules:
 *  - gsap.ticker is the only rAF loop. Lenis and the hero WebGL field both run on it.
 *  - lagSmoothing(0) so scroll-linked work never "catches up" with a jump after a long frame.
 *  - Only transform/opacity are animated (compositor-only, no layout or paint per frame).
 *  - Anything already on screen when the engine starts is never hidden (no flash of content).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export type MotionApi = {
  lenis: Lenis | null;
  /** Re-scan the page after a client-side route change. */
  refresh: () => void;
  destroy: () => void;
};

const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Fade-and-rise for content that enters the viewport. */
const REVEAL = [
  'main .section-head',
  'main .svc',
  'main .proj-grid > *',
  'main .pain',
  'main .reasons > li',
  'main .gcard-grid > *',
  'main .brands > *',
  'main .demo > *',
  'main .faq',
  'main .final',
  'main .inline-links',
].join(',');

let ctx: gsap.Context | null = null;
const cleanups: (() => void)[] = [];

function reveal(targets: HTMLElement[], fast = false) {
  targets.forEach((el) => (el.dataset.reveal = 'done'));
  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: fast ? 0.25 : 0.9,
    ease: 'expo.out',
    stagger: fast ? 0 : 0.07,
    overwrite: true,
    // Keep transforms: tilt cards share the transform with this reveal.
    clearProps: 'opacity',
  });
}

/**
 * Opacity only, never visibility: hidden content must stay focusable, findable (Ctrl+F) and
 * fillable. Anything that receives keyboard focus before it is scrolled to appears at once.
 */
function setupReveals() {
  const vh = window.innerHeight;
  const els = gsap.utils
    .toArray<HTMLElement>(REVEAL)
    // Never hide what the visitor can already see.
    .filter((el) => el.getBoundingClientRect().top > vh * 0.92 && !el.dataset.reveal);
  if (els.length === 0) return;
  els.forEach((el) => (el.dataset.reveal = 'pending'));
  gsap.set(els, { opacity: 0, y: 28 });
  ScrollTrigger.batch(els, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => reveal(batch as HTMLElement[]),
  });
  const onFocus = (e: FocusEvent) => {
    const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-reveal="pending"]');
    if (el) reveal([el], true);
  };
  document.addEventListener('focusin', onFocus);
  cleanups.push(() => document.removeEventListener('focusin', onFocus));
}

/** "How it works": a progress rail fills as you scroll, and each step lights up in turn. */
function setupFlow() {
  document.querySelectorAll<HTMLElement>('main .section--ink .flow').forEach((flow) => {
    const steps = Array.from(flow.children) as HTMLElement[];
    flow.classList.add('flow--live');
    ScrollTrigger.create({
      trigger: flow,
      start: 'top 80%',
      end: 'bottom 45%',
      scrub: true,
      onUpdate: (self) => {
        flow.style.setProperty('--flow-p', self.progress.toFixed(4));
        const active = Math.min(steps.length, Math.floor(self.progress * steps.length + 0.35));
        steps.forEach((s, i) => s.classList.toggle('is-on', i < active));
      },
    });
  });
}

/** Count real numbers up once (e.g. "20+"). The final text is the server-rendered text. */
function setupCounts() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const final = el.textContent ?? '';
    const m = final.match(/^(\D*)(\d+)(.*)$/);
    if (!m) return;
    const [, pre, num, post] = m;
    const target = Number(num);
    const state = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 95%',
      once: true,
      onEnter: () =>
        gsap.to(state, {
          v: target,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => (el.textContent = `${pre}${Math.round(state.v)}${post}`),
          onComplete: () => (el.textContent = final),
        }),
    });
  });
}

/**
 * Glass tilt with a moving specular highlight. Pointer: tilt follows the cursor.
 * Touch: a soft "press" that dips toward the finger, richer than a plain tap state.
 */
function setupTilt() {
  const fine = finePointer();
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tilt) || 8;
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const sc = gsap.quickTo(el, 'scale', { duration: 0.45, ease: 'power3.out' });
    gsap.set(el, { transformPerspective: 900, transformOrigin: 'center' });
    el.classList.add('is-tilt');

    const point = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
      return { px, py };
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && !fine) return;
      const { px, py } = point(e);
      ry((px - 0.5) * max * 2);
      rx((0.5 - py) * max * 2);
    };
    const enter = () => el.classList.add('is-lit');
    const leave = () => {
      el.classList.remove('is-lit');
      rx(0);
      ry(0);
      sc(1);
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      const { px, py } = point(e);
      el.classList.add('is-lit');
      ry((px - 0.5) * max);
      rx((0.5 - py) * max);
      sc(0.975);
    };
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerenter', enter, { passive: true });
    el.addEventListener('pointerleave', leave, { passive: true });
    el.addEventListener('pointerdown', down, { passive: true });
    el.addEventListener('pointerup', leave, { passive: true });
    el.addEventListener('pointercancel', leave, { passive: true });
    cleanups.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointerup', leave);
      el.removeEventListener('pointercancel', leave);
      el.classList.remove('is-tilt', 'is-lit');
    });
  });
}

/** Primary CTA leans toward the cursor a little. Desktop only. */
function setupMagnetic() {
  if (!finePointer()) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.22);
      y((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave, { passive: true });
    cleanups.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });
}

function scan() {
  ctx?.revert();
  cleanups.splice(0).forEach((fn) => fn());
  ctx = gsap.context(() => {
    setupReveals();
    setupFlow();
    setupCounts();
    setupTilt();
    setupMagnetic();
  });
  ScrollTrigger.refresh();
}

export function startMotion(): MotionApi {
  const root = document.documentElement;
  root.classList.add('motion-on');

  // Smooth wheel on desktop; touch keeps the native, compositor-driven scroll (the fastest
  // and most familiar feel on phones), still synced to ScrollTrigger through Lenis.
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    allowNestedScroll: true,
    stopInertiaOnNavigate: true,
    prevent: (node) => !!node.closest?.('[data-lenis-prevent], .svc-menu, .mnav, select, textarea'),
  });

  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Mobile menu locks scroll with body overflow: pause Lenis while it is open.
  const lockObserver = new MutationObserver(() => {
    if (document.body.style.overflow === 'hidden') lenis.stop();
    else lenis.start();
  });
  lockObserver.observe(document.body, { attributes: true, attributeFilter: ['style'] });

  // Fonts change line heights; re-measure trigger positions once they are in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  scan();

  return {
    lenis,
    refresh: () => requestAnimationFrame(scan),
    destroy: () => {
      ctx?.revert();
      cleanups.splice(0).forEach((fn) => fn());
      lockObserver.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      root.classList.remove('motion-on');
    },
  };
}
