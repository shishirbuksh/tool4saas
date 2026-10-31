
import { useEffect, useState } from "react";import { Box, Button, FormControlLabel, Paper, Switch, Typography } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { siteConfig } from "@/lib/site";

const KEY = "t4s-consent-v1";
const GA_ID = siteConfig.gaId;
// 12-month expiry for stored choices (365 days).
const EXPIRY_MS = 365 * 24 * 60 * 60 * 1000;

type Consent = { ad_storage: "granted" | "denied"; analytics_storage: "granted" | "denied"; ts: number };

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<Consent>;
    if (v.ad_storage !== "granted" && v.ad_storage !== "denied") return null;
    // Backwards-compat: older records always have analytics_storage, but coerce if missing.
    const analytics =
      v.analytics_storage === "granted" || v.analytics_storage === "denied"
        ? v.analytics_storage
        : "denied";
    const ts = typeof v.ts === "number" && Number.isFinite(v.ts) ? v.ts : 0;
    return { ad_storage: v.ad_storage, analytics_storage: analytics, ts };
  } catch {
    return null;
  }
}

function isExpired(c: Consent): boolean {
  if (!c.ts || !Number.isFinite(c.ts)) return true;
  return Date.now() - c.ts > EXPIRY_MS;
}

/** DNT/GPC respect: navigator.doNotTrack === "1" or globalPrivacyControl set. */
function signalsDoNotTrack(): boolean {
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

function setGaDisabled(disabled: boolean) {
  try {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = disabled;
  } catch {
    /* ignore */
  }
}

/** Real withdraw: expire GA cookies on current + parent domains. */
function clearGaCookies() {
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

function apply(c: Consent) {
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
  // The Google Funding Choices (TCF v2.2) snippet is rendered by
  // src/components/RootDocument.tsx from NEXT_PUBLIC_FUNDING_CHOICES_ID.
  // Funding Choices remains the source of truth for EEA/UK; this local mirror
  // (t4s-consent-v1) only forwards a signal when FC is present.
  try {
    const w = window as unknown as {
      __tcfapi?: (command: string, version: number, callback: (...args: unknown[]) => void, ...rest: unknown[]) => void;
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
    // else skip: no Funding Choices / TCF stub loaded yet.
  } catch {
    /* ignore */
  }
}

function persist(c: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* ignore */
  }
  apply(c);
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

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  // Privacy-safe defaults: off unless user opts in.
  const [adsOn, setAdsOn] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);

  useEffect(() => {
    const existing = read();
    if (existing && !isExpired(existing)) {
      apply(existing);
      setGaDisabled(existing.analytics_storage !== "granted");
      setAdsOn(existing.ad_storage === "granted");
      setAnalyticsOn(existing.analytics_storage === "granted");
    } else if (signalsDoNotTrack() && !existing) {
      // Fresh visit with DNT/GPC: default to denied, persist, don't pre-load, don't nag.
      setAdsOn(false);
      setAnalyticsOn(false);
      persist({ ad_storage: "denied", analytics_storage: "denied", ts: Date.now() });
    } else {
      // No consent or expired (>12mo): show banner again.
      if (existing) {
        // Prefill prior choices unless DNT/GPC forces denied defaults.
        if (signalsDoNotTrack()) {
          setAdsOn(false);
          setAnalyticsOn(false);
        } else {
          setAdsOn(existing.ad_storage === "granted");
          setAnalyticsOn(existing.analytics_storage === "granted");
        }
      } else if (signalsDoNotTrack()) {
        setAdsOn(false);
        setAnalyticsOn(false);
      }
      // Defer showing the banner until user interaction or 3s delay
      // to keep it from hijacking the Largest Contentful Paint (LCP) metric.
      let showed = false;
      let timer: ReturnType<typeof setTimeout>;
      const showBanner = () => {
        if (showed) return;
        showed = true;
        setVisible(true);
        cleanup();
      };
      const cleanup = () => {
        window.removeEventListener("scroll", showBanner);
        window.removeEventListener("pointerdown", showBanner);
        window.removeEventListener("keydown", showBanner);
        clearTimeout(timer);
      };
      timer = setTimeout(showBanner, 3000);
      window.addEventListener("scroll", showBanner, { once: true, passive: true });
      window.addEventListener("pointerdown", showBanner, { once: true, passive: true });
      window.addEventListener("keydown", showBanner, { once: true, passive: true });
    }
    const reopen = () => {
      try {
        const cur = read();
        if (cur && !isExpired(cur)) {
          setAdsOn(cur.ad_storage === "granted");
          setAnalyticsOn(cur.analytics_storage === "granted");
        }
      } catch {
        /* ignore */
      }
      setVisible(true);
    };
    window.addEventListener("t4s:open-cookie-choices", reopen);
    return () => window.removeEventListener("t4s:open-cookie-choices", reopen);
  }, []);

  const choose = (granted: boolean) => {
    const c: Consent = {
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ts: Date.now(),
    };
    persist(c);
    setAdsOn(granted);
    setAnalyticsOn(granted);
    setVisible(false);
  };

  const saveChoices = () => {
    const c: Consent = {
      ad_storage: adsOn ? "granted" : "denied",
      analytics_storage: analyticsOn ? "granted" : "denied",
      ts: Date.now(),
    };
    persist(c);
    setVisible(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  return (
    <Box
      role="region"
      aria-label="Cookie consent"
      aria-describedby="t4s-consent-desc"
      className="fixed left-[16px] right-[16px] bottom-[max(16px,_env(safe-area-inset-bottom))] flex justify-center" style={{ zIndex: (theme) => theme.zIndex.drawer - 10, pointerEvents: "none" }}
    >
      <Paper elevation={0} className="max-w-[720px] w-full p-4 sm:p-6 border border-base-300 rounded-[12px]" style={{ pointerEvents: "auto" }}>
        <Typography component="p" variant="subtitle1" className="font-bold mb-2">
          Cookies and ads
        </Typography>
        <Typography id="t4s-consent-desc" variant="body2" color="text.secondary" className="mb-4 leading-[1.7]">
          Tool inputs run locally, but we use Google Analytics and Google AdSense cookies for measurement and ads. See our{" "}
          <Link href="/privacy">Privacy Policy</Link>. You can accept or reject — the site works either way.
          Choices expire after 12 months; you can change them anytime via “Cookie choices” in the footer.
        </Typography>
        <Box className="flex gap-1 flex-wrap mb-2">
          <FormControlLabel
            control={
              <Switch
                checked={analyticsOn}
                onChange={(e) => setAnalyticsOn(e.target.checked)}
              />
            }
            label="Analytics"
          />
          <FormControlLabel
            control={
              <Switch
                checked={adsOn}
                onChange={(e) => setAdsOn(e.target.checked)}
              />
            }
            label="Ads"
          />
        </Box>
        <Box className="flex gap-3 flex-wrap">
          <Button variant="contained" onClick={() => choose(true)} className="min-h-[44px]">
            Accept all
          </Button>
          <Button variant="outlined" onClick={() => choose(false)} className="min-h-[44px]">
            Reject all
          </Button>
          <Button variant="text" onClick={saveChoices} className="min-h-[44px]">
            Save choices
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
