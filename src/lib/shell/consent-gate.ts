/**
 * Consent-gated Google network scripts (vanilla port of the former React
 * `ConsentGatedGoogleScripts` + `AdSenseScript`).
 *
 * BaseLayout only ships consent-default (denied). gtag/js + GA config +
 * adsbygoogle.js are injected here IFF stored consent grants them. Split
 * consent is honoured (analytics vs ads independently).
 */
import { ADSENSE_CLIENT, CONSENT_KEY, EXPIRY_MS, GA_ID } from "./consent";

// AdSense crawler/review exception: automated approval bots never click the
// banner (empty localStorage), so without this they would report "no ad code
// found". Loading the Auto Ads loader renders nothing on its own; Auto Ads
// still honour the consent signals above, so no pre-consent ad can serve.
const CRAWLER_RE = /Mediapartners-Google|AdsBot-Google/i;

type Grant = "granted" | "denied" | null;

function readGrants(): { ad: Grant; analytics: Grant } {
  const none = { ad: null as Grant, analytics: null as Grant };
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return none;
    const v = JSON.parse(raw) as { ad_storage?: string; analytics_storage?: string; ts?: number };
    if (typeof v.ts === "number" && Number.isFinite(v.ts) && Date.now() - v.ts > EXPIRY_MS) return none;
    const norm = (s: unknown): Grant => (s === "granted" ? "granted" : s === "denied" ? "denied" : null);
    return { ad: norm(v.ad_storage), analytics: norm(v.analytics_storage) };
  } catch {
    return none;
  }
}

function injectScript(opts: { id?: string; src?: string; text?: string; crossOrigin?: boolean }): void {
  if (opts.id && document.getElementById(opts.id)) return;
  const script = document.createElement("script");
  if (opts.id) script.id = opts.id;
  if (opts.src) script.src = opts.src;
  if (opts.crossOrigin) script.crossOrigin = "anonymous";
  if (opts.text) script.text = opts.text;
  else script.async = true;
  document.head.appendChild(script);
}

function load(): void {
  const { ad, analytics } = readGrants();
  let reviewBypass = false;
  try {
    const ua = navigator.userAgent || "";
    const qs = new URLSearchParams(window.location.search);
    reviewBypass = CRAWLER_RE.test(ua) || qs.get("ads") === "test";
  } catch {
    /* ignore */
  }

  const gaOk = analytics === "granted" && Boolean(GA_ID);
  const adsOk = ad === "granted" || reviewBypass;

  if (gaOk) {
    injectScript({
      id: "ga-loader",
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
    });
    injectScript({
      id: "google-analytics",
      text: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
    });
  }

  if (adsOk && ADSENSE_CLIENT) {
    injectScript({
      id: "adsbygoogle-init",
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
      crossOrigin: true,
    });
  }
}

export function initConsentGate(): void {
  load();
  window.addEventListener("t4s:consent-updated", load);
  window.addEventListener("storage", (event) => {
    if (!event.key || event.key === CONSENT_KEY) load();
  });
}
