import ToolPageShell from "@/components/ToolPageShell";
import SlugGeneratorTool from "@/components/tools/SlugGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/slug-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SlugGeneratorTool />
    </ToolPageShell>
  );
}
