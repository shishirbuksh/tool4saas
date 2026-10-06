"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import AdSenseScript from "@/components/AdSenseScript";
import { siteConfig } from "@/lib/site";

const KEY = "t4s-consent-v1";
// 12-month expiry for stored choices (mirrors CookieConsent EXPIRY_MS).
const EXPIRY_MS = 365 * 24 * 60 * 60 * 1000;
// AdSense crawler/review exception: automated approval bots never click the
// banner (empty localStorage), so without this they would report "no ad code
// found". Script load alone renders nothing — AdSlot push stays hard-gated
// on explicit consent, so no pre-consent impression can occur.
const CRAWLER_RE = /Mediapartners-Google|AdsBot-Google/i;

type Grant = "granted" | "denied" | null;

function readGrants(): { ad: Grant; analytics: Grant } {
  const none = { ad: null as Grant, analytics: null as Grant };
  try {
    if (typeof window === "undefined") return none;
    const raw = localStorage.getItem(KEY);
    if (!raw) return none;
    const v = JSON.parse(raw) as { ad_storage?: string; analytics_storage?: string; ts?: number };
    if (typeof v.ts === "number" && Number.isFinite(v.ts) && Date.now() - v.ts > EXPIRY_MS) return none;
    const norm = (s: unknown): Grant => (s === "granted" ? "granted" : s === "denied" ? "denied" : null);
    return { ad: norm(v.ad_storage), analytics: norm(v.analytics_storage) };
  } catch {
    return none;
  }
}

/**
 * Consent-gated Google network scripts (privacy H1 fix).
 * layout.tsx keeps only consent-default (denied); gtag/js + GA config +
 * adsbygoogle.js are injected here IFF stored consent grants them.
 * Split consent is honoured (analytics vs ads independently).
 */
export default function ConsentGatedGoogleScripts() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  const [reviewBypass, setReviewBypass] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
      const qs = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      setReviewBypass(CRAWLER_RE.test(ua) || qs?.get("ads") === "test");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const bump = () => setTick((t) => t + 1);
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === KEY) bump();
    };
    window.addEventListener("t4s:consent-updated", bump);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("t4s:consent-updated", bump);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (!mounted) return null;
  // Re-read on every consent tick (mirrors AdSlot consentTick pattern).
  void tick;
  const { ad, analytics } = readGrants();
  const gaOk = analytics === "granted";
  const adsOk = ad === "granted" || reviewBypass;
  if (!gaOk && !adsOk) return null;

  return (
    <>
      {gaOk && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.gaId}');
          `}
          </Script>
        </>
      )}
      {adsOk && <AdSenseScript />}
    </>
  );
}
