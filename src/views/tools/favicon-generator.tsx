import ToolPageShell from "@/components/ToolPageShell";
import FaviconGeneratorTool from "@/components/tools/FaviconGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/favicon-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <FaviconGeneratorTool />
    </ToolPageShell>
  );
}
