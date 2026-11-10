/**
 * Consent state + Google Consent Mode plumbing, shared by the banner and the
 * consent-gated script loader.
 *
 * This is a 1:1 port of the former React `CookieConsent` /
 * `ConsentGatedGoogleScripts` logic: same storage key, same 12-month expiry,
 * same DNT/GPC handling, same GA cookie purge, same TCF heartbeat. The React
 * versions required hydrating the whole page shell on every page; these run as
 * a ~4 KB vanilla module instead.
 *
 * Storage shape (localStorage["t4s-consent-v1"]):
 *   { ad_storage: "granted" | "denied",
 *     analytics_storage: "granted" | "denied",
 *     ts: number }
 */
import { siteConfig } from "@/lib/site";

export const CONSENT_KEY = "t4s-consent-v1";
export const EXPIRY_MS = 365 * 24 * 60 * 60 * 1000;
export const GA_ID = siteConfig.gaId;
export const ADSENSE_CLIENT = siteConfig.adsenseClient;

export type Grant = "granted" | "denied";

export type Consent = {
  ad_storage: Grant;
  analytics_storage: Grant;
  ts: number;
};

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<Consent>;
    if (v.ad_storage !== "granted" && v.ad_storage !== "denied") return null;
    // Backwards-compat: older records always have analytics_storage, but coerce
    // if missing.
    const analytics: Grant =
      v.analytics_storage === "granted" || v.analytics_storage === "denied"
        ? v.analytics_storage
        : "denied";
    const ts = typeof v.ts === "number" && Number.isFinite(v.ts) ? v.ts : 0;
    return { ad_storage: v.ad_storage, analytics_storage: analytics, ts };
  } catch {
    return null;
  }
}

export function isExpired(c: Consent): boolean {
  if (!c.ts || !Number.isFinite(c.ts)) return true;
  return Date.now() - c.ts > EXPIRY_MS;
}

/** DNT/GPC respect: navigator.doNotTrack === "1" or globalPrivacyControl set. */
export function signalsDoNotTrack(): boolean {
  try {
    if (typeof navigator === "undefined") return false;
    const nav = navigator as Navigator & { globalPrivacyControl?: unknown };
    if (nav.doNotTrack === "1") return true;
    const gpc = nav.globalPrivacyControl;
    return gpc === true || gpc === "1" || gpc === 1;
  } catch {
    return false;
  }
}

export function setGaDisabled(disabled: boolean): void {
  try {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = disabled;
  } catch {
    /* ignore */
  }
}

/** Real withdraw: expire GA cookies on current + parent domains. */
export function clearGaCookies(): void {
  try {
    if (typeof document === "undefined") return;
    const rawNames = document.cookie
      ? document.cookie
          .split(";")
          .map((s) => s.split("=")[0]?.trim())
          .filter((n): n is string => Boolean(n))
      : [];
    const targets = new Set<string>(["_ga", "_gid", "_gat"]);
    for (const n of rawNames) {
      if (
        n === "_ga" ||
        n === "_gid" ||
        n === "_gat" ||
        n.startsWith("_gac_") ||
        n.startsWith("_ga_") ||
        n.startsWith("__utm")
      ) {
        targets.add(n);
      }
    }
    const host = typeof window !== "undefined" ? window.location.hostname : "";
    const domains: (string | undefined)[] = [undefined, host, `.${host}`];
    if (host.split(".").length > 2) {
      const parent = host.split(".").slice(-2).join(".");
      domains.push(parent, `.${parent}`);
    }
    for (const name of targets) {
      for (const domain of domains) {
        try {
          document.cookie =
            `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;` +
            (domain ? ` domain=${domain};` : "") +
            ` SameSite=Lax`;
        } catch {
          /* ignore per-domain failures */
        }
      }
    }
  } catch {
    /* ignore */
  }
}

export function applyConsent(c: Consent): void {
  try {
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("consent", "update", {
        ad_storage: c.ad_storage,
        analytics_storage: c.analytics_storage,
        ad_user_data: c.ad_storage,
        ad_personalization: c.ad_storage,
      });
    }
  } catch {
    /* ignore */
  }
  // Funding Choices bridge (stub — full TCF is owned by Google's snippet).
  // Funding Choices remains the source of truth for EEA/UK; this local mirror
  // (t4s-consent-v1) only forwards a signal when FC is present.
  try {
    const w = window as unknown as {
      __tcfapi?: (
        command: string,
        version: number,
        callback: (...args: unknown[]) => void,
        ...rest: unknown[]
      ) => void;
    };
    if (typeof w.__tcfapi === "function") {
      // Forward local choice to any TCF listener; no-op when FC absent.
      // Use a safe read-only command (ping) as a heartbeat on consent update —
      // full TC-data/vendor handling is owned by the Funding Choices snippet.
      try {
        w.__tcfapi("ping", 2, () => {});
      } catch {
        /* ignore per-call failures */
      }
    }
  } catch {
    /* ignore */
  }
}

export function persistConsent(c: Consent): void {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {
    /* ignore */
  }
  applyConsent(c);
  const analyticsDenied = c.analytics_storage !== "granted";
  // ga-disable must be set before any gtag event fires to take effect.
  setGaDisabled(analyticsDenied);
  if (analyticsDenied) clearGaCookies();
  try {
    window.dispatchEvent(new CustomEvent("t4s:consent-updated", { detail: c }));
  } catch {
    /* ignore */
  }
}
