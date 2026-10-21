import type { ReviewStatus } from './types';

/**
 * Live projects supplied by the owner (2026-10-20). Each description says only what can be seen
 * on the live site; no traffic, sales or ranking results are claimed for clients.
 * Screenshots: public/work/<slug>.webp, captured from the live sites on 2026-10-20.
 */
export interface Project {
  slug: string;
  name: string;
  url: string;
  /** Short type label: "E-commerce store". */
  kind: string;
  industry: string;
  location?: string;
  /** One sentence: what the business is and what the site does. */
  summary: string;
  /** What is on the site, in plain words. */
  built: string[];
  /** Service refs ("hub" or "hub/sub") this project demonstrates. */
  services: string[];
  image: string;
  /** Shown on the home page (owner decision 2026-10-20: We One Aviation only on /work/). */
  featured: boolean;
  /** Social ScaleX is CodeMindset's own brand; say so wherever it appears. */
  relationship: 'client' | 'own-brand';
  review: ReviewStatus;
}

export const projects: Project[] = [
  {
    slug: 'social-scalex',
    name: 'Social ScaleX',
    url: 'https://www.socialscalex.in/',
    kind: 'Agency website',
    industry: 'Marketing agency',
    location: 'Delhi NCR',
    summary:
      'The website of our sister brand, a social media marketing agency, with published client results and service pages.',
    built: [
      'Service pages for social media, ads and video',
      'Results section from clients’ own dashboards',
      'Strategy-call booking and WhatsApp',
      'Guides for search and AI visibility',
    ],
    services: ['website-development/business-websites', 'seo-services'],
    image: '/work/social-scalex.webp',
    featured: true,
    relationship: 'own-brand',
    review: 'approved',
  },
  {
    slug: 'prago-outdoors',
    name: 'PraGo Outdoors',
    url: 'https://prago.store/',
    kind: 'E-commerce store',
    industry: 'Outdoor gear retail',
    summary:
      'An online store for camping, trekking and riding gear, with cash on delivery and seasonal collections.',
    built: [
      'Shopify store with multi-level categories',
      'Cart, wishlist and quick view',
      'Cash on delivery and coupon offers',
      'Blog and WhatsApp support',
    ],
    services: ['website-development/ecommerce-websites', 'website-development/shopify'],
    image: '/work/prago-outdoors.webp',
    featured: true,
    relationship: 'client',
    review: 'approved',
  },
  {
    slug: 'book-my-charter',
    name: 'Book My Charter',
    url: 'https://bookmycharter.in/',
    kind: 'Booking website',
    industry: 'Aviation & travel',
    summary:
      'A private jet and helicopter charter service for India, with a quote request flow and an airport finder.',
    built: [
      'Charter quote form: aircraft type, route, date and passengers',
      '“Charter near me” search by pincode or area',
      'Aircraft directory and route pages',
      'Call and WhatsApp on every page',
    ],
    services: ['website-development/business-websites', 'website-development'],
    image: '/work/book-my-charter.webp',
    featured: true,
    relationship: 'client',
    review: 'approved',
  },
  {
    slug: 'we-one-aviation',
    name: 'We One Aviation',
    url: 'https://weoneaviation.in/',
    kind: 'Education website',
    industry: 'Pilot training academy',
    location: 'Dwarka, New Delhi',
    summary:
      'A DGCA ground-class academy for pilot aspirants, with course pages, country guides and counselling enquiries.',
    built: [
      'Course and exam-preparation pages',
      'Guides to flight training in India and abroad',
      'Free-counselling enquiries, call and WhatsApp',
      'FAQ and blog for search visibility',
    ],
    services: ['website-development/business-websites', 'seo-services/local-seo'],
    image: '/work/we-one-aviation.webp',
    featured: false,
    relationship: 'client',
    review: 'approved',
  },
];
