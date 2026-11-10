/**
 * Cookie consent banner wiring (vanilla port of the former React
 * `CookieConsent` component).
 *
 * The banner markup is server-rendered with `hidden` so it costs nothing on
 * load; it is revealed after 3 s or the first scroll/pointer/key event, which
 * keeps it out of the LCP window exactly like the React version did.
 */
import {
  applyConsent,
  isExpired,
  persistConsent,
  readConsent,
  setGaDisabled,
  signalsDoNotTrack,
  type Consent,
} from "./consent";

const SHOW_DELAY_MS = 3000;

function q<T extends Element>(root: ParentNode, sel: string): T | null {
  return root.querySelector<T>(sel);
}

export function initConsentBanner(): void {
  const banner = q<HTMLElement>(document, "[data-cookie-banner]");
  if (!banner) return;

  const adsToggle = q<HTMLInputElement>(banner, "[data-consent-ads]");
  const analyticsToggle = q<HTMLInputElement>(banner, "[data-consent-analytics]");

  const setToggles = (ads: boolean, analytics: boolean) => {
    if (adsToggle) adsToggle.checked = ads;
    if (analyticsToggle) analyticsToggle.checked = analytics;
  };

  const show = () => {
    banner.hidden = false;
  };
  const hide = () => {
    banner.hidden = true;
  };

  const choose = (granted: boolean) => {
    const c: Consent = {
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ts: Date.now(),
    };
    persistConsent(c);
    setToggles(granted, granted);
    hide();
  };

  const saveChoices = () => {
    const c: Consent = {
      ad_storage: adsToggle?.checked ? "granted" : "denied",
      analytics_storage: analyticsToggle?.checked ? "granted" : "denied",
      ts: Date.now(),
    };
    persistConsent(c);
    hide();
  };

  const existing = readConsent();
  if (existing && !isExpired(existing)) {
    applyConsent(existing);
    setGaDisabled(existing.analytics_storage !== "granted");
    setToggles(existing.ad_storage === "granted", existing.analytics_storage === "granted");
  } else if (signalsDoNotTrack() && !existing) {
    // Fresh visit with DNT/GPC: default to denied, persist, don't pre-load,
    // don't nag.
    setToggles(false, false);
    persistConsent({ ad_storage: "denied", analytics_storage: "denied", ts: Date.now() });
  } else {
    // No consent or expired (>12mo): show the banner again.
    if (existing) {
      const dnt = signalsDoNotTrack();
      setToggles(!dnt && existing.ad_storage === "granted", !dnt && existing.analytics_storage === "granted");
    }
    let showed = false;
    const cleanup = () => {
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      clearTimeout(timer);
    };
    const onInteract = () => {
      if (showed) return;
      showed = true;
      show();
      cleanup();
    };
    const timer = setTimeout(onInteract, SHOW_DELAY_MS);
    window.addEventListener("scroll", onInteract, { once: true, passive: true });
    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("keydown", onInteract, { once: true, passive: true });
  }

  q<HTMLElement>(banner, "[data-consent-accept]")?.addEventListener("click", () => choose(true));
  q<HTMLElement>(banner, "[data-consent-reject]")?.addEventListener("click", () => choose(false));
  q<HTMLElement>(banner, "[data-consent-save]")?.addEventListener("click", saveChoices);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !banner.hidden) hide();
  });

  // Footer "Cookie choices" → reopen with the stored state prefilled.
  window.addEventListener("t4s:open-cookie-choices", () => {
    const cur = readConsent();
    if (cur && !isExpired(cur)) {
      setToggles(cur.ad_storage === "granted", cur.analytics_storage === "granted");
    }
    show();
  });

  // Footer "Do Not Sell or Share" → deny everything, then open the panel so the
  // choice is visible and reversible.
  document.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    if (!target) return;
    if (target.closest("[data-consent-open]")) {
      event.preventDefault();
      window.dispatchEvent(new Event("t4s:open-cookie-choices"));
      return;
    }
    if (!target.closest("[data-consent-donotsell]")) return;
    event.preventDefault();
    const c: Consent = { ad_storage: "denied", analytics_storage: "denied", ts: Date.now() };
    persistConsent(c);
    setGaDisabled(true);
    setToggles(false, false);
    window.dispatchEvent(new Event("t4s:open-cookie-choices"));
  });
}
