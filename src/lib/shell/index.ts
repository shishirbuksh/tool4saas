/**
 * Entry point for the static page shell. Loaded by BaseLayout on every page.
 *
 * Everything here is plain DOM code: the header, footer and consent banner are
 * server-rendered HTML, so pages that are not interactive (blog, static pages,
 * categories) ship zero React. Tool pages additionally hydrate their view.
 */
import { initConsentBanner } from "./consent-banner";
import { initConsentGate } from "./consent-gate";
import { initHeader } from "./header";
import { initToolSearch } from "./search";
import { initThemeToggle } from "./theme";

let hydrationStarted = false;

/**
 * Hydrate the interactive view, but only on pages that opted in
 * (`#app[data-hydrate="true"]`). The import is dynamic, so react-dom lives in
 * its own chunk and is never requested by static pages.
 */
function hydrateViewIfNeeded(): void {
  const container = document.getElementById("app");
  if (!container || container.dataset.hydrate !== "true") return;

  const start = () => {
    if (hydrationStarted) return;
    hydrationStarted = true;
    void import("@/lib/astro/hydrate")
      .then((mod) => mod.hydrateApp())
      .catch((error) => console.error("[astro] hydration failed", error));
  };

  // Idle hydration keeps the main thread free for the first interaction; the
  // pointerdown/keydown listeners make an early click hydrate immediately.
  if ("requestIdleCallback" in window) {
    requestIdleCallback(start, { timeout: 1500 });
  } else {
    setTimeout(start, 50);
  }
  window.addEventListener("pointerdown", start, { once: true, passive: true });
  window.addEventListener("keydown", start, { once: true, passive: true });
}

export function initShell(): void {
  // Gate first: if consent was already granted on a previous visit, the Google
  // scripts should start loading before the (possibly hidden) banner runs.
  initConsentGate();
  initThemeToggle();
  initHeader();
  initToolSearch();
  initConsentBanner();
  hydrateViewIfNeeded();
}
