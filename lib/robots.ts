import type { MetadataRoute } from 'next';
import { absoluteUrl, site } from '@/content/site';
import { isProduction } from './env';

/** Crawlers used to train AI models. Governed by one owner decision (site.crawlers.aiTraining). */
export const AI_TRAINING_CRAWLERS = [
  'GPTBot',
  'Google-Extended',
  'ClaudeBot',
  'CCBot',
  'Applebot-Extended',
];

/** Crawlers that power AI search answers with links back to sources. Allowed. */
export const AI_SEARCH_CRAWLERS = ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot'];

type RobotsRule = { userAgent: string | string[]; allow?: string; disallow?: string };

export function buildRobots(
  env?: NodeJS.ProcessEnv,
  aiTraining: 'allow' | 'block' | 'undecided' = site.crawlers.aiTraining,
): MetadataRoute.Robots {
  if (!isProduction(env)) {
    // Previews and local builds must never be indexed.
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  const rules: RobotsRule[] = [
    { userAgent: '*', allow: '/' },
    { userAgent: AI_SEARCH_CRAWLERS, allow: '/' },
  ];
  // 'undecided' is treated as block until the owner decides (the launch gate also fails).
  if (aiTraining !== 'allow') rules.push({ userAgent: AI_TRAINING_CRAWLERS, disallow: '/' });
  return { rules, sitemap: absoluteUrl('/sitemap.xml') };
}
