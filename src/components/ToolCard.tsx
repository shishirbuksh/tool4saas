"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import Link from "next/link";

const LinkWrapper = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
  // @ts-expect-error - MUI passes href dynamically
  <Link ref={ref} {...props} />
));

import dynamic from "next/dynamic";
import type { SxProps } from "@mui/material";
import type { Tool, IconName } from "@/lib/tools";

// Reserve 34px while a dynamic icon chunk loads → no CLS on card grids.
// NOTE: 57x dynamic() = up to N parallel chunk requests per grid page (waterfall).
// Kept dynamic to keep initial bundle lean (next.config optimizePackageImports
// already tree-shakes @mui/icons-material for static imports). Long-term alternative:
// single SVG sprite / static barrel import so icons ride one request instead of N.
// Each entry below reuses iconDynamicOpts so every icon shows the same skeleton.
function IconFallback() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        width: 34,
        height: 34,
        borderRadius: "12px",
        bgcolor: "rgba(0,0,0,0.06)",
      }}
    />
  );
}


const ICONS: Record<IconName, React.ComponentType<{ sx?: SxProps }>> = {
  BuildOutlined: dynamic(() => import("@mui/icons-material/BuildOutlined"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  ReceiptLong: dynamic(() => import("@mui/icons-material/ReceiptLong"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  QrCode2: dynamic(() => import("@mui/icons-material/QrCode2"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Description: dynamic(() => import("@mui/icons-material/Description"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  TextSnippet: dynamic(() => import("@mui/icons-material/TextSnippet"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Key: dynamic(() => import("@mui/icons-material/Key"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  DataObject: dynamic(() => import("@mui/icons-material/DataObject"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Subject: dynamic(() => import("@mui/icons-material/Subject"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Image: dynamic(() => import("@mui/icons-material/Image"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Notes: dynamic(() => import("@mui/icons-material/Notes"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Straighten: dynamic(() => import("@mui/icons-material/Straighten"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Cake: dynamic(() => import("@mui/icons-material/Cake"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  ColorLens: dynamic(() => import("@mui/icons-material/ColorLens"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Code: dynamic(() => import("@mui/icons-material/Code"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Link: dynamic(() => import("@mui/icons-material/Link"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Difference: dynamic(() => import("@mui/icons-material/Difference"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Fingerprint: dynamic(() => import("@mui/icons-material/Fingerprint"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  LocalOffer: dynamic(() => import("@mui/icons-material/LocalOffer"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Shuffle: dynamic(() => import("@mui/icons-material/Shuffle"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  FormatListNumbered: dynamic(() => import("@mui/icons-material/FormatListNumbered"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Transform: dynamic(() => import("@mui/icons-material/Transform"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Tag: dynamic(() => import("@mui/icons-material/Tag"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Percent: dynamic(() => import("@mui/icons-material/Percent"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Schedule: dynamic(() => import("@mui/icons-material/Schedule"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Html: dynamic(() => import("@mui/icons-material/Html"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  FindReplace: dynamic(() => import("@mui/icons-material/FindReplace"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  VpnKey: dynamic(() => import("@mui/icons-material/VpnKey"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  TableChart: dynamic(() => import("@mui/icons-material/TableChart"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  DateRange: dynamic(() => import("@mui/icons-material/DateRange"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  FitnessCenter: dynamic(() => import("@mui/icons-material/FitnessCenter"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Restaurant: dynamic(() => import("@mui/icons-material/Restaurant"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Contrast: dynamic(() => import("@mui/icons-material/Contrast"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Replay: dynamic(() => import("@mui/icons-material/Replay"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  BarChart: dynamic(() => import("@mui/icons-material/BarChart"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  VolumeUp: dynamic(() => import("@mui/icons-material/VolumeUp"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Http: dynamic(() => import("@mui/icons-material/Http"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Spellcheck: dynamic(() => import("@mui/icons-material/Spellcheck"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Numbers: dynamic(() => import("@mui/icons-material/Numbers"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Gradient: dynamic(() => import("@mui/icons-material/Gradient"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Markunread: dynamic(() => import("@mui/icons-material/Markunread"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Abc: dynamic(() => import("@mui/icons-material/Abc"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  AttachFile: dynamic(() => import("@mui/icons-material/AttachFile"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  EmojiEmotions: dynamic(() => import("@mui/icons-material/EmojiEmotions"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Palette: dynamic(() => import("@mui/icons-material/Palette"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  AccountBalance: dynamic(() => import("@mui/icons-material/AccountBalance"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Public: dynamic(() => import("@mui/icons-material/Public"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Sell: dynamic(() => import("@mui/icons-material/Sell"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  CreditCard: dynamic(() => import("@mui/icons-material/CreditCard"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  VerifiedUser: dynamic(() => import("@mui/icons-material/VerifiedUser"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  PhotoSizeSelectLarge: dynamic(() => import("@mui/icons-material/PhotoSizeSelectLarge"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Timer: dynamic(() => import("@mui/icons-material/Timer"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Casino: dynamic(() => import("@mui/icons-material/Casino"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Toll: dynamic(() => import("@mui/icons-material/Toll"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  AttachMoney: dynamic(() => import("@mui/icons-material/AttachMoney"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  CalendarToday: dynamic(() => import("@mui/icons-material/CalendarToday"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  Search: dynamic(() => import("@mui/icons-material/Search"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
  PictureAsPdf: dynamic(() => import("@mui/icons-material/PictureAsPdf"), { loading: () => <IconFallback /> }) as React.ComponentType<{ sx?: SxProps }>,
};

function Icon({ name }: { name: IconName }) {
  const Cmp = ICONS[name] ?? ICONS.BuildOutlined;
  return <Cmp sx={{ fontSize: 34 }} />;
}

const CATEGORY_TINTS: Record<string, { bg: string; fg: string }> = {
  "text-documents": { bg: "#EFF6FF", fg: "#1D4ED8" },
  business: { bg: "#F0FDF4", fg: "#15803D" },
  developer: { bg: "#F5F3FF", fg: "#6D28D9" },
  converters: { bg: "#FEFCE8", fg: "#A16207" },
  generators: { bg: "#FDF2F8", fg: "#BE185D" },
  "images-design": { bg: "#FFF7ED", fg: "#C2410C" },
  pdf: { bg: "#FEF2F2", fg: "#B91C1C" },
  calculators: { bg: "#ECFDF5", fg: "#0F766E" },
  finance: { bg: "#EFF6FF", fg: "#0C4A6E" },
  health: { bg: "#F0FDF4", fg: "#166534" },
  seo: { bg: "#FEFCE8", fg: "#92400E" },
  time: { bg: "#F5F3FF", fg: "#5B21B6" },
};

const DEFAULT_TINT = { bg: "#F5F5F5", fg: "#111111" };

export default function ToolCard({ tool }: { tool: Tool }) {
  const tint = CATEGORY_TINTS[tool.category] ?? DEFAULT_TINT;
  return (
    <Card
      sx={{
        height: "100%",
        contentVisibility: "auto",
        containIntrinsicSize: "0 280px",
        transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms cubic-bezier(0.16,1,0.3,1)",
        "&:hover": {
          // --motion-hover-lift: -2px + scale(1.01) spring (theme token — not -6px)
          transform: "translateY(-2px) scale(1.01)",
          borderColor: "rgba(0,0,0,0.12)",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.06), 0 12px 32px rgba(34,29,29,0.08), 0 4px 12px rgba(34,29,29,0.05)",
          'html[data-theme="dark"] &': {
            borderColor: "rgba(255,255,255,0.15)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
          },
        },
        "&:active": { transform: "scale(0.99)", transitionDuration: "100ms" },
      }}
    >
      <CardActionArea
        component={LinkWrapper}
        href={`/${tool.slug}`}
        aria-label={`Open ${tool.title} tool`}
        sx={{
          height: "100%",
          borderRadius: "16px",
          "&:focus-visible": {
            outline: "3px solid",
            outlineColor: "primary.main",
            outlineOffset: 2,
            boxShadow: "0 0 0 5px var(--focus-ring-offset, #FCFCF9), 0 0 0 8px var(--focus-ring, #111111)",
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            aria-hidden="true"
            sx={{
              width: 56,
              height: 56,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: tint.bg,
              color: tint.fg,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
              "& > *": { color: tint.fg },
              mb: { xs: 1.5, sm: 2 },
            }}
          >
            <Icon name={tool.icon} />
          </Box>
          <Typography
            component="h3"
            variant="h5"
            sx={{
              mb: 1,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              fontWeight: 600,
              textWrap: "balance",
            }}
          >
            {tool.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              letterSpacing: "-0.015em",
              textWrap: "pretty",
              fontVariantNumeric: "tabular-nums",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {tool.short}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
