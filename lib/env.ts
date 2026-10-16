export type SiteEnv = 'production' | 'preview' | 'development';

/**
 * Resolves the deployment environment.
 * - SITE_ENV wins when set explicitly (used for local production-mode checks).
 * - On Vercel, VERCEL_ENV is "production" | "preview" | "development".
 * - Anything else is treated as development.
 * Only "production" may be indexed or show unapproved content as hidden.
 */
export function getSiteEnv(env: NodeJS.ProcessEnv = process.env): SiteEnv {
  const explicit = env.SITE_ENV;
  if (explicit === 'production' || explicit === 'preview' || explicit === 'development') {
    return explicit;
  }
  if (env.VERCEL_ENV === 'production') return 'production';
  if (env.VERCEL_ENV === 'preview') return 'preview';
  return 'development';
}

export const isProduction = (env?: NodeJS.ProcessEnv) => getSiteEnv(env) === 'production';

/** Draft content (unconfirmed services, unapproved pages) is visible only outside production. */
export const showDrafts = (env?: NodeJS.ProcessEnv) => !isProduction(env);
