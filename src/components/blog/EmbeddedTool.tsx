"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { getTool } from "@/lib/tools";

// In-page working tools for pillar guides (P0-2). Loaded client-only via
// dynamic ssr:false so the SSR article HTML stays lean for crawlers while
// readers get a usable tool — this is what page-1 SERPs reward (tool intent).
const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  "invoice-generator-guide": dynamic(() => import("@/components/tools/InvoiceTool"), {
    ssr: false,
    loading: () => <Skeleton variant="rounded" height={420} />,
  }) as React.ComponentType,
  "qr-code-generator-guide": dynamic(() => import("@/components/tools/QrCodeTool"), {
    ssr: false,
    loading: () => <Skeleton variant="rounded" height={420} />,
  }) as React.ComponentType,
  "resume-builder-guide": dynamic(() => import("@/components/tools/ResumeTool"), {
    ssr: false,
    loading: () => <Skeleton variant="rounded" height={420} />,
  }) as React.ComponentType,
  "mortgage-calculator-guide": dynamic(() => import("@/components/tools/MortgageCalculatorTool"), {
    ssr: false,
    loading: () => <Skeleton variant="rounded" height={420} />,
  }) as React.ComponentType,
};

const TOOL_SLUG_BY_PILLAR: Record<string, string> = {
  "invoice-generator-guide": "invoice-generator",
  "qr-code-generator-guide": "qr-code-generator",
  "resume-builder-guide": "resume-builder",
  "mortgage-calculator-guide": "mortgage-calculator",
};

export default function EmbeddedTool({ pillar }: { pillar: string }) {
  const Tool = TOOL_COMPONENTS[pillar];
  const toolSlug = TOOL_SLUG_BY_PILLAR[pillar];
  const tool = toolSlug ? getTool(toolSlug) : undefined;
  if (!Tool || !tool) return null;
  return (
    <Box
      component="section"
      aria-label={`Try the ${tool.title} now`}
      sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}
    >
      <Typography variant="h2" sx={{ fontSize: "1.25rem", fontWeight: 800, mb: 0.5 }}>
        Try it live: {tool.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        The working tool, right here in the guide — {tool.short}. No signup, free forever.{" "}
        <Link href={`/${tool.slug}`}>Open the full page →</Link>
      </Typography>
      <Tool />
    </Box>
  );
}
