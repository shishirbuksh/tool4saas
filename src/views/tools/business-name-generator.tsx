import ToolPageShell from "@/components/ToolPageShell";
import BusinessNameGeneratorTool from "@/components/tools/BusinessNameGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/business-name-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <BusinessNameGeneratorTool />
    </ToolPageShell>
  );
}
