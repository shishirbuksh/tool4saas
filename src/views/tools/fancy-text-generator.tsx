import ToolPageShell from "@/components/ToolPageShell";
import FancyTextGeneratorTool from "@/components/tools/FancyTextGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/fancy-text-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <FancyTextGeneratorTool />
    </ToolPageShell>
  );
}
