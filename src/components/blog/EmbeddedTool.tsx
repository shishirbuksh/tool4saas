
import dynamic from "@/lib/astro/dynamic";
import Link from "@/lib/astro/navigation";import { Box, Typography, Skeleton } from "@/components/ds";


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
  "password-generator-guide": dynamic(() => import("@/components/tools/PasswordGeneratorTool"), {
    ssr: false,
    loading: () => <Skeleton variant="rounded" height={420} />,
  }) as React.ComponentType,
  "word-counter-guide": dynamic(() => import("@/components/tools/WordCounterTool"), {
    ssr: false,
    loading: () => <Skeleton variant="rounded" height={420} />,
  }) as React.ComponentType,
};

export default function EmbeddedTool({
  pillar,
  title,
  short,
  slug,
}: {
  pillar: string;
  title: string;
  short: string;
  slug: string;
}) {
  const Tool = TOOL_COMPONENTS[pillar];
  if (!Tool) return null;
  return (
    <Box
      component="section"
      aria-label={`Try the ${title} now`}
      className="p-4 md:p-6 mb-8 rounded-xl border border-base-300 bg-base-100"
    >
      <Typography variant="h2" className="text-[1.25rem] font-extrabold mb-1">
        Try it live: {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">
        The working tool, right here in the guide — {short}. No signup, free forever.{" "}
        <Link href={`/${slug}`}>Open the full page →</Link>
      </Typography>
      <Tool />
    </Box>
  );
}
