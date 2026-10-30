import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";

// One Emotion cache per rendered page. On the server `compat: true` makes
// Emotion store the serialized CSS for every class in `cache.inserted`, which
// lets us inline it into <head>. In the browser the same key ("css") lets
// Emotion discover those server-rendered <style data-emotion="css ..."> tags
// and adopt them instead of re-inserting duplicate rules.
export function createPageCache(): EmotionCache {
  const isServer = typeof document === "undefined";
  const cache = createCache({ key: "css", prepend: true });
  // Emotion's SSR "compat" mode stores each serialized rule in
  // `cache.inserted` (instead of just `true`) so we can concatenate them.
  // @emotion/server does the same internally before extractCritical().
  if (isServer) (cache as EmotionCache & { compat?: boolean }).compat = true;
  return cache;
}
