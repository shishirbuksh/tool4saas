import { defineMiddleware } from "astro/middleware";

// In dev mode and SSR preview, requests to `/og/*` without `.png` extension
// are internally rewritten to the generated `.png` endpoint. In production,
// Nginx serves them via `try_files $uri $uri.png =404`.
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (pathname.startsWith("/og/") && !pathname.endsWith(".png")) {
    return context.rewrite(`${pathname}.png`);
  }
  return next();
});
