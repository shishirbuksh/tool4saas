"use client";

import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { siteConfig } from "@/lib/site";

type AdSlotProps = {
  slot: string;
  format?: "auto" | "rectangle" | "leaderboard" | "inline";
  className?: string;
  label?: string;
};

const FORMAT_STYLES: Record<string, React.CSSProperties> = {
  rectangle: { minHeight: 280, width: "100%", maxWidth: 300 },
  leaderboard: { minHeight: 100, width: "100%", maxWidth: 728 },
  inline: { minHeight: 280, width: "100%" },
  auto: { minHeight: 250, width: "100%" },
};

function resolveAdFormat(format: "auto" | "rectangle" | "leaderboard" | "inline"): string {
  if (format === "auto") return "auto";
  if (format === "leaderboard") return "horizontal";
  if (format === "inline") return "fluid";
  return "rectangle";
}

export default function AdSlot({
  slot,
  format = "auto",
  className,
  label = "Advertisement",
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    pushed.current = false;
  }, [slot]);

  useEffect(() => {
    if (!siteConfig.adsenseClient || !slot || slot.startsWith("000")) return;
    try {
      const raw = localStorage.getItem("t4s-consent-v1");
      if (raw) {
        const v = JSON.parse(raw) as { ad_storage?: string };
        if (v.ad_storage !== "granted") return;
      } else {
        return;
      }
    } catch {
      return;
    }
    if (pushed.current) return;
    try {
      if (typeof window !== "undefined" && "adsbygoogle" in window) {
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      /* ignore push errors */
    }
  }, [slot]);

  if (!siteConfig.adsenseClient || !slot || slot.startsWith("000")) {
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
