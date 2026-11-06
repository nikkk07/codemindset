import type { MetadataRoute } from 'next';
import { absoluteUrl, site } from '@/content/site';
import { isProduction } from './env';

/** Classic search engines. Named explicitly so each has a clear group. */
export const SEARCH_CRAWLERS = ['Googlebot', 'Googlebot-Image', 'Bingbot', 'Applebot', 'Amazonbot'];

/** Crawlers used to train AI models. Governed by one owner decision (site.crawlers.aiTraining). */
export const AI_TRAINING_CRAWLERS = [
  'GPTBot',
  'Google-Extended',
  'ClaudeBot',
  'CCBot',
  'Applebot-Extended',
  'cohere-ai',
  'meta-externalagent',
];

/** Crawlers that power AI search answers with links back to sources. Allowed. */
export const AI_SEARCH_CRAWLERS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'MistralAI-User',
];

/**
 * Paths no crawler needs. Never add /_next/: it serves the CSS and JavaScript Google needs to
 * render pages, and blocking it can hurt rankings.
 */
const PRIVATE = '/api/';

type RobotsRule = { userAgent: string | string[]; allow?: string; disallow?: string | string[] };

export function buildRobots(
  env?: NodeJS.ProcessEnv,
  aiTraining: 'allow' | 'block' | 'undecided' = site.crawlers.aiTraining,
): MetadataRoute.Robots {
  if (!isProduction(env)) {
    // Previews and local builds must never be indexed.
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  // A crawler obeys only its most specific group, so every group repeats the private paths.
  const rules: RobotsRule[] = [
    { userAgent: '*', allow: '/', disallow: PRIVATE },
    { userAgent: [...SEARCH_CRAWLERS, ...AI_SEARCH_CRAWLERS], allow: '/', disallow: PRIVATE },
  ];
  // 'undecided' is treated as block until the owner decides (the launch gate also fails).
  rules.push(
    aiTraining === 'allow'
      ? { userAgent: AI_TRAINING_CRAWLERS, allow: '/', disallow: PRIVATE }
      : { userAgent: AI_TRAINING_CRAWLERS, disallow: '/' },
  );
  return { rules, sitemap: absoluteUrl('/sitemap.xml') };
}
