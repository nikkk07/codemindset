import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { audiences } from '@/content/audiences';
import { problems } from '@/content/home';
import { industries } from '@/content/industries';
import { glossary } from '@/content/knowledge';
import { corePages } from '@/content/pages';
import { regions } from '@/content/regions';
import { GUIDE_SLUG, allSubs, hubs } from '@/content/services';
import { site } from '@/content/site';
import { getServiceOptions } from '@/lib/enquiry/options';
import { FIELD_ORDER, INTAKE_STEPS } from '@/lib/enquiry/schema';
import { whatsappHref } from '@/lib/contact';
import { lcFirst } from '@/lib/text';
import { resolveRef } from '@/lib/visibility';

const PREVIEW = { SITE_ENV: 'preview' } as unknown as NodeJS.ProcessEnv;
const ROOT = path.resolve(__dirname, '../..');

describe('brand facts', () => {
  it('uses the confirmed name, domain, tagline and India positioning', () => {
    expect(site.name).toBe('CodeMindset');
    expect(site.url).toBe('https://www.codemindset.in');
    expect(site.tagline).toBe('Think in Algorithm');
    expect(site.descriptor).toBe('Indian IT services company');
  });
  it('builds WhatsApp links with a pre-filled message', () => {
    expect(whatsappHref('Hi there')).toBe('https://wa.me/918077727669?text=Hi%20there');
  });
});

describe('service catalogue', () => {
  it('has unique hub slugs and unique page slugs within each hub', () => {
    const hs = hubs.map((h) => h.slug);
    expect(new Set(hs).size).toBe(hs.length);
    for (const h of hubs) {
      const ss = allSubs(h).map((s) => s.slug);
      expect(new Set(ss).size).toBe(ss.length);
      expect(ss).not.toContain(GUIDE_SLUG);
    }
  });
  it('writes every page plain-first: a plain title, a plain line and what is included', () => {
    for (const h of hubs) {
      expect(h.plainTitle.length).toBeGreaterThan(5);
      expect(h.answer.length).toBeGreaterThan(120);
      expect(h.simple.steps.length).toBe(3);
      expect(h.includes.length).toBeGreaterThan(2);
      expect(h.faqs.length).toBeGreaterThan(2);
      for (const s of allSubs(h)) {
        expect(s.plain.length).toBeGreaterThan(15);
        expect(s.includes.length).toBeGreaterThan(2);
      }
    }
  });
  it('resolves every related link, guide recommendation and industry link', () => {
    for (const h of hubs) {
      for (const r of h.related) expect(resolveRef(r, PREVIEW)).toBeTruthy();
      for (const g of h.guide.goals)
        if (g.pick) expect(resolveRef(g.pick, PREVIEW, h.slug)).toBeTruthy();
      for (const i of h.industries) expect(industries.some((x) => x.slug === i)).toBe(true);
    }
    for (const i of industries)
      for (const p of i.problems) expect(resolveRef(p.link, PREVIEW)).toBeTruthy();
    for (const g of glossary) expect(resolveRef(g.service, PREVIEW)).toBeTruthy();
    for (const p of problems) expect(hubs.some((h) => h.slug === p.link)).toBe(true);
    for (const a of audiences)
      for (const r of a.recommended) expect(resolveRef(r, PREVIEW)).toBeTruthy();
  });
  it('puts every hub in a menu segment, with exactly one "not sure" starting point', () => {
    expect(hubs.filter((h) => h.segment === 'start').length).toBe(1);
    expect(hubs.filter((h) => h.segment === 'everyday').length).toBeGreaterThan(3);
    expect(hubs.filter((h) => h.segment === 'advanced').length).toBeGreaterThan(3);
    for (const slug of ['ai-engineering', 'data-engineering', 'cybersecurity', 'blockchain'])
      expect(hubs.find((h) => h.slug === slug)?.segment).toBe('advanced');
  });
  it('labels example scenarios by sector and keeps them short', () => {
    for (const h of hubs)
      for (const s of allSubs(h))
        for (const u of s.uses ?? []) {
          expect(u.sector.length).toBeGreaterThan(2);
          expect(u.story.length).toBeLessThanOrEqual(320);
        }
  });
  it('gives each guide a short answer and a comparison that matches its columns', () => {
    for (const h of hubs) {
      expect(h.guide.shortAnswer.length).toBeGreaterThan(80);
      expect(h.guide.goals.some((g) => g.pick === null)).toBe(true);
      for (const r of h.guide.table?.rows ?? [])
        expect(r.cells.length).toBe(h.guide.table!.columns.length);
    }
  });
  it('keeps SEO titles unique and descriptions within sensible lengths', () => {
    const titles = new Set<string>();
    for (const h of hubs) {
      expect(titles.has(h.seo.title)).toBe(false);
      titles.add(h.seo.title);
      expect(h.seo.description.length).toBeGreaterThan(70);
      expect(h.seo.description.length).toBeLessThanOrEqual(170);
    }
    for (const p of Object.values(corePages)) expect(p.description.length).toBeLessThanOrEqual(170);
    for (const h of hubs)
      for (const x of allSubs(h)) {
        const t = `${x.title} in India`;
        expect(titles.has(t)).toBe(false);
        titles.add(t);
      }
    for (const x of [...audiences, ...industries]) {
      expect(titles.has(x.seo.title)).toBe(false);
      titles.add(x.seo.title);
      expect(x.seo.description.length).toBeLessThanOrEqual(170);
    }
  });
});

describe('India coverage', () => {
  it('lists all 28 states and 8 union territories with unique slugs', () => {
    expect(regions.filter((r) => r.type === 'state').length).toBe(28);
    expect(regions.filter((r) => r.type === 'union-territory').length).toBe(8);
    expect(new Set(regions.map((r) => r.slug)).size).toBe(36);
  });
});

describe('enquiry forms', () => {
  it('assigns every field to exactly one of three steps', () => {
    expect(INTAKE_STEPS.length).toBe(3);
    const assigned = INTAKE_STEPS.flatMap((s) => s.fields);
    expect(new Set(assigned).size).toBe(assigned.length);
    expect([...assigned].sort()).toEqual([...FIELD_ORDER].sort());
  });
  it('offers services in plain words', () => {
    const options = getServiceOptions(PREVIEW);
    expect(options.length).toBe(hubs.length);
    expect(options[0]!.label).toBe('A website for my business');
  });
});

describe('owner presentation rules (2026-10-16)', () => {
  const files = (dir: string): string[] =>
    fs
      .readdirSync(path.join(ROOT, dir), { withFileTypes: true })
      .flatMap((e) =>
        e.isDirectory()
          ? files(path.join(dir, e.name))
          : /\.(tsx?|css)$/.test(e.name)
            ? [path.join(dir, e.name)]
            : [],
      );
  const source = [...files('app'), ...files('components')].map(
    (f) => [f, fs.readFileSync(path.join(ROOT, f), 'utf8')] as const,
  );

  it('never writes the phone number out except via the footer', () => {
    for (const [f, text] of source) {
      if (f.endsWith('Footer.tsx') || f.includes('llms.txt')) continue;
      expect(text.includes('phone.display')).toBe(false);
      expect(/80777/.test(text)).toBe(false);
    }
  });
  it('presents a company, not a person, and shows no language tags', () => {
    for (const [, text] of source) {
      expect(text.includes('contactPerson')).toBe(false);
      expect(/English (or|and|&) Hindi/.test(text)).toBe(false);
    }
  });
  it('keeps brand names capitalised mid-sentence', () => {
    expect(lcFirst('WordPress website development')).toBe('WordPress website development');
    expect(lcFirst('WhatsApp chatbot development')).toBe('WhatsApp chatbot development');
    expect(lcFirst('AI agent development')).toBe('AI agent development');
    expect(lcFirst('Business website development')).toBe('business website development');
  });
});
