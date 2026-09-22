"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { siteConfig } from "@/lib/site";

type AdSlotProps = {
  slot: string;
  format?: "auto" | "rectangle" | "leaderboard" | "inline";
  className?: string;
  label?: string;
  /**
   * Opt-in to non-personalized ads (NPA) when the user has denied
   * personalized ads (`t4s-consent-v1.ad_storage === "denied"`).
   *
   * Default `false` = current behavior unchanged: no push while consent
   * is denied/unknown (GDPR-safe, no pre-consent ads).
   *
   * When `true` + consent is explicitly `"denied"`, the push effect sets
   * `(adsbygoogle).requestNonPersonalizedAds = 1` before `push({})`.
   * Unknown consent (no stored choice yet) still blocks even NPA — the
   * user must choose first via the banner / Funding Choices.
   *
   * To enable NPA on a slot: `<AdSlot slot="..." nonPersonalized />`.
   * Do NOT enable globally without legal review of your Funding Choices /
   * TCF setup for EEA/UK.
   */
  nonPersonalized?: boolean;
};

const FORMAT_STYLES: Record<string, React.CSSProperties> = {
  rectangle: { minHeight: 280, width: "100%", maxWidth: 300 },
  leaderboard: { minHeight: 100, width: "100%", maxWidth: 728 },
  inline: { minHeight: 280, width: "100%" },
  auto: { minHeight: 250, width: "100%" },
};

// Strict AdSense slot validation: exactly 10 digits.
// NOTE: slots starting with "0" are allowed if they are 10 digits
// (old `slot.startsWith("000")` placeholder check rejected those).
// Consent gating below is intentional — personalized ads only push when
// `t4s-consent-v1.ad_storage === "granted"`.
//
// GDPR / Funding Choices notes:
// - Google Funding Choices (TCF v2.2) is the source of truth for EEA/UK
//   consent; this component enforces the local mirror (`t4s-consent-v1`)
//   written by CookieConsent via gtag consent-default (denied) + update.
// - `data-npa-on-consent-refused="true"` on <ins> is NOT a real AdSense
//   attribute — NPA is requested in JS via
//   `(adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1`
//   before `push({})` (or per-push `{ requestNonPersonalizedAds: 1 }`).
// - NPA still shows ads and still needs a consent choice in the EEA; it is
//   only attempted here after an explicit "denied" record AND only when the
//   `nonPersonalized` prop is `true`. Unknown consent (no record yet) never
//   pushes — not even NPA — so we don't serve ads before the user chooses.
// REVIEWER: to verify real ads locally/prod-preview you MUST click "Accept all"
// in the consent banner first, otherwise this component renders nothing (prod)
// or the dev placeholder by design. To verify the NPA path, pass
// `nonPersonalized`, click "Reject all", and confirm the push happens with
// `requestNonPersonalizedAds = 1`.

function resolveAdFormat(format: "auto" | "rectangle" | "leaderboard" | "inline"): string {
  if (format === "auto") return "auto";
  if (format === "leaderboard") return "horizontal";
  if (format === "inline") return "fluid";
  return "rectangle";
}

// DEEP-5 reviewer/crawler test path helpers (no adsbygoogle push here).
// Prod unknown-consent hard-block (return null) stays unchanged below.
// Test override renders a visible placeholder with `data-adtest` when:
//   (a) NODE_ENV !== "production" with unknown consent (dev preview), OR
//   (b) consent unknown + `?ads=test` in URL (reviewer/crawler, any env).
// Strict /^\d{10}$/ slot guard stays first and untouched.
function isAdTestParam(): boolean {
  try {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("ads") === "test";
  } catch {
    return false;
  }
}

function readConsentUnknown(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const raw = localStorage.getItem("t4s-consent-v1");
    if (!raw) return true;
    const v = JSON.parse(raw) as { ad_storage?: string };
    return v.ad_storage !== "granted" && v.ad_storage !== "denied";
  } catch {
    return true;
  }
}

export default function AdSlot({
  slot,
  format = "auto",
  className,
  label = "Advertisement",
  nonPersonalized = false,
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [consentTick, setConsentTick] = useState(0);
  // DEEP-5 test-path state (client-only to avoid hydration mismatch;
  // SSR + first client render match, effects below correct after mount).
  const [mounted, setMounted] = useState(false);
  const [adTest, setAdTest] = useState(false);
  const [consentUnknown, setConsentUnknown] = useState(false);

  useEffect(() => {
    pushed.current = false;
  }, [slot]);

  // Re-attempt push without reload when consent is granted/updated.
  // Gate below blocks push while ad_storage !== "granted", except the
  // opt-in NPA path (denied + nonPersonalized) which pushes with
  // requestNonPersonalizedAds = 1.
  // DEEP-5: test path (?ads=test) never pushes by design.
  useEffect(() => {
    setMounted(true);
    setAdTest(isAdTestParam());
    setConsentUnknown(readConsentUnknown());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setAdTest(isAdTestParam());
    setConsentUnknown(readConsentUnknown());
  }, [consentTick, mounted, slot]);

  useEffect(() => {
    const bump = () => setConsentTick((t) => t + 1);
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === "t4s-consent-v1") bump();
    };
    window.addEventListener("t4s:consent-updated", bump);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("t4s:consent-updated", bump);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (!siteConfig.adsenseClient || !slot || !/^\d{10}$/.test(slot)) return;
    // DEEP-5: reviewer/crawler test path never pushes to adsbygoogle.
    if (adTest) return;
    // Personalized by default; NPA only when explicitly denied + opted in.
    let requestNpa = false;
    try {
      const raw = localStorage.getItem("t4s-consent-v1");
      if (raw) {
        const v = JSON.parse(raw) as { ad_storage?: string };
        if (v.ad_storage === "granted") {
          requestNpa = false;
        } else if (v.ad_storage === "denied" && nonPersonalized) {
          requestNpa = true;
        } else {
          return;
        }
      } else {
        return;
      }
    } catch {
      return;
    }
    if (pushed.current) return;
    try {
      if (typeof window !== "undefined") {
        const w = window as unknown as {
          adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: number };
        };
        w.adsbygoogle = w.adsbygoogle || [];
        if (requestNpa) {
          // AdSense NPA: must be set before push. GDPR-safe because we only
          // reach here after an explicit "denied" + nonPersonalized opt-in.
          w.adsbygoogle.requestNonPersonalizedAds = 1;
        }
        w.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      /* ignore push errors */
    }
  }, [slot, consentTick, nonPersonalized, adTest]);

  if (!siteConfig.adsenseClient || !slot || !/^\d{10}$/.test(slot)) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <Box
        className={className}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          bgcolor: "color-mix(in srgb, var(--mui-palette-background-paper) 68%, transparent)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)",
          'html[data-theme="dark"] &': {
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.4)",
          },
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "text.secondary",
          fontSize: 13,
          ...FORMAT_STYLES[format],
          mx: "auto",
        }}
      >
        {label}
      </Box>
    );
  }

  // DEEP-5 reviewer/crawler test path + prod unknown-consent hard-block.
  // Client-only (mounted) so SSR + first client render stay identical.
  // - `?ads=test` (any env) => visible placeholder with data-adtest, never pushes.
  // - Dev (NODE_ENV !== "production") + unknown consent => placeholder, never pushes.
  // - Prod unknown consent without test flag => return null (hard-block, unchanged).
  if (mounted && adTest) {
    return (
      <Box
        className={className}
        data-adtest="true"
        sx={{
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: "12px",
          bgcolor: "color-mix(in srgb, var(--mui-palette-background-paper) 68%, transparent)",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "text.secondary",
          fontSize: 13,
          ...FORMAT_STYLES[format],
          mx: "auto",
        }}
      >
        {label}
      </Box>
    );
  }
  if (mounted && consentUnknown) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <Box
        className={className}
        data-adtest="true"
        sx={{
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: "12px",
          bgcolor: "color-mix(in srgb, var(--mui-palette-background-paper) 68%, transparent)",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "text.secondary",
          fontSize: 13,
          ...FORMAT_STYLES[format],
          mx: "auto",
        }}
      >
        {label}
      </Box>
    );
  }

  return (
    <Box
      className={className}
      sx={{
        mx: "auto",
        my: 2,
        textAlign: "center",
        borderRadius: "12px",
        overflow: "hidden",
        ...FORMAT_STYLES[format],
      }}
    >
      <Box
        component="span"
        sx={{ fontSize: 12, color: "text.secondary", letterSpacing: 0.5 }}
      >
        {label}
      </Box>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", ...FORMAT_STYLES[format] }}
        data-ad-client={siteConfig.adsenseClient}
        data-ad-slot={slot}
        data-ad-format={resolveAdFormat(format)}
        data-full-width-responsive="true"
      />
    </Box>
  );
}
