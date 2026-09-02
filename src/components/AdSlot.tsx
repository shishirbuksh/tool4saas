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
  rectangle: { minHeight: 280, width: "100%", maxWidth: 336 },
  leaderboard: { minHeight: 100, width: "100%", maxWidth: 728 },
  inline: { minHeight: 280, width: "100%" },
  auto: { minHeight: 250, width: "100%" },
};

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
    return (
      <Box
        className={className}
        sx={{
          border: "1px solid rgba(17,17,19,0.06)",
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          p: 2,
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
      sx={{ mx: "auto", my: 2, textAlign: "center", ...FORMAT_STYLES[format] }}
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
        data-ad-format={format === "auto" ? "auto" : "rectangle"}
        data-full-width-responsive="true"
      />
    </Box>
  );
}
