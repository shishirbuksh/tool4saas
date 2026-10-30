import ToolPageShell from "@/components/ToolPageShell";
import SitemapGeneratorTool from "@/components/tools/SitemapGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/sitemap-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SitemapGeneratorTool />
    </ToolPageShell>
  );
}
