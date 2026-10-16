/** Delivery readiness, from docs/capability-matrix.md. */
export type Readiness = 'unconfirmed' | 'ready' | 'partner' | 'roadmap';

/** Editorial approval. Only 'approved' content can appear in production. */
export type ReviewStatus = 'draft' | 'approved';

export type IconName =
  | 'website'
  | 'app'
  | 'spark'
  | 'link'
  | 'code'
  | 'chart'
  | 'search'
  | 'school'
  | 'briefcase'
  | 'bag'
  | 'heart'
  | 'book'
  | 'map'
  | 'users'
  | 'brain'
  | 'shield'
  | 'database'
  | 'blocks'
  | 'rocket'
  | 'building'
  | 'truck'
  | 'bank'
  | 'home';

export interface FAQ {
  question: string;
  answer: string;
}

export interface PlainStep {
  title: string;
  text: string;
}

/** A platform page (WordPress, Flutter, Zoho…) or a need/type page (E-commerce, Chatbots…). */
export interface SubService {
  slug: string;
  kind: 'platform' | 'type';
  /** Short name: "WordPress", "E-commerce websites". */
  name: string;
  /** Page H1 / title, written the way people search: "WordPress website development". */
  title: string;
  /** One line a non-technical person understands. */
  plain: string;
  /** Who it suits. */
  best: string;
  /** What the client gets (3–5 items). */
  includes: string[];
  faqs?: FAQ[];
  /** Example scenarios (never presented as client work). */
  uses?: UseCase[];
  readiness: Readiness;
  review: ReviewStatus;
}

export interface UseCase {
  sector: string;
  story: string;
}

export interface GuideGoal {
  id: string;
  label: string;
  /** Recommended page: "sub" in this hub or "hub/sub" elsewhere; null = "tell us, we will choose". */
  pick: string | null;
  title: string;
  why: string;
}

export interface Guide {
  /** "WordPress, Shopify or custom code?" */
  question: string;
  /** The answer in two or three sentences, placed first (answer-engine friendly). */
  shortAnswer: string;
  goals: GuideGoal[];
  table?: { columns: string[]; rows: { label: string; cells: string[] }[] };
  review: ReviewStatus;
}

/** How hubs are grouped in the Services menu: everyday needs first, advanced work second. */
export type ServiceSegment = 'everyday' | 'advanced' | 'start';

export interface ServiceHub {
  slug: string;
  segment: ServiceSegment;
  icon: IconName;
  /** Technical name: "Website development". */
  title: string;
  /** What a non-technical visitor would say: "A website for my business". */
  plainTitle: string;
  /** Mega-menu one-liner. */
  blurb: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  /** Plain-language opening paragraph that directly answers "what is this and who does it". */
  answer: string;
  simple: { title: string; steps: PlainStep[] };
  platformsLabel: string;
  platforms: SubService[];
  types: SubService[];
  guide: Guide;
  includes: PlainStep[];
  faqs: FAQ[];
  /** Related links as "hub" or "hub/sub". */
  related: string[];
  industries: string[];
  cta: string;
  /** Pre-filled WhatsApp message. */
  whatsapp: string;
  seo: { title: string; description: string };
  readiness: Readiness;
  review: ReviewStatus;
}

export interface Industry {
  slug: string;
  icon: IconName;
  name: string;
  h1: string;
  intro: string;
  /** Problem in the client's words → what we build → service link. */
  problems: { problem: string; fix: string; link: string }[];
  faqs: FAQ[];
  seo: { title: string; description: string };
  review: ReviewStatus;
}

/** Who the visitor is: startup, growing business or enterprise. */
export interface Audience {
  slug: string;
  icon: IconName;
  name: string;
  short: string;
  h1: string;
  h1Accent: string;
  intro: string;
  priorities: PlainStep[];
  /** Recommended services as "hub" or "hub/sub". */
  recommended: string[];
  howWeWork: PlainStep[];
  faqs: FAQ[];
  seo: { title: string; description: string };
  review: ReviewStatus;
}

export interface Region {
  slug: string;
  name: string;
  type: 'state' | 'union-territory';
  /**
   * Unique local content written for this page. A region page can go live only when this
   * exists and is approved — template-only location pages are thin content.
   */
  local: string | null;
  review: ReviewStatus;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  /** One sentence, plain words. */
  short: string;
  /** A short paragraph with an everyday example. */
  explain: string;
  /** Why it matters for a business. */
  matters: string;
  /** Related service link "hub" or "hub/sub". */
  service: string;
  review: ReviewStatus;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: 'Guide' | 'Insight' | 'News';
  published: string;
  updated?: string;
  /** Simple block content: paragraphs and headings. */
  body: (
    { type: 'p'; text: string } | { type: 'h2'; text: string } | { type: 'list'; items: string[] }
  )[];
  review: ReviewStatus;
}

export interface CorePage {
  path: string;
  title: string;
  description: string;
  review: ReviewStatus;
}

export interface Claim {
  id: string;
  claim: string;
  where: string;
  type: 'capability' | 'practice' | 'result' | 'statistic' | 'legal' | 'third-party';
  evidence: string;
  status: 'pending' | 'approved';
}
