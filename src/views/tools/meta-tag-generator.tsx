import ToolPageShell from "@/components/ToolPageShell";
import MetaTagGeneratorTool from "@/components/tools/MetaTagGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/meta-tag-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <MetaTagGeneratorTool />
    </ToolPageShell>
  );
}
