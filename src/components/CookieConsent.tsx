"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const KEY = "t4s-consent-v1";

type Consent = { ad_storage: "granted" | "denied"; analytics_storage: "granted" | "denied"; ts: number };

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Consent;
    if (v.ad_storage !== "granted" && v.ad_storage !== "denied") return null;
    return v;
  } catch {
    return null;
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
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = read();
    if (existing) {
      apply(existing);
    } else {
      setVisible(true);
    }
    const reopen = () => setVisible(true);
    window.addEventListener("t4s:open-cookie-choices", reopen);
    return () => window.removeEventListener("t4s:open-cookie-choices", reopen);
  }, []);

  const choose = (granted: boolean) => {
    const c: Consent = {
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ts: Date.now(),
    };
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch {
      /* ignore */
    }
    apply(c);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Box
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      sx={{ position: "fixed", left: 16, right: 16, bottom: "max(16px, env(safe-area-inset-bottom))", zIndex: 1500, display: "flex", justifyContent: "center", pointerEvents: "none" }}
    >
      <Paper elevation={0} sx={{ pointerEvents: "auto", maxWidth: 720, width: "100%", p: { xs: 2, sm: 3 }, border: "1px solid", borderColor: "divider", borderRadius: "12px" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Cookies and ads
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
          Tool inputs run locally, but we use Google Analytics and Google AdSense cookies for measurement and ads. See our{" "}
          <Link href="/privacy">Privacy Policy</Link>. You can accept or reject — the site works either way.
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button variant="contained" onClick={() => choose(true)} sx={{ minHeight: 44 }}>
            Accept all
          </Button>
          <Button variant="outlined" onClick={() => choose(false)} sx={{ minHeight: 44 }}>
            Reject all
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
