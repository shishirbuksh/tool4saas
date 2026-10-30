import ToolPageShell from "@/components/ToolPageShell";
import SeoAnalyzerTool from "@/components/tools/SeoAnalyzerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/seo-analyzer/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SeoAnalyzerTool />
    </ToolPageShell>
  );
}
