const CLOUDFLARE_TEST_SITE_KEY = '1x00000000000000000000AA';

export const turnstileSiteKey =
  import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ||
  (import.meta.env.DEV ? CLOUDFLARE_TEST_SITE_KEY : '');

export const turnstileEnabled = Boolean(turnstileSiteKey);
