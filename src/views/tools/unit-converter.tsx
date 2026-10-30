import ToolPageShell from "@/components/ToolPageShell";
import UnitStudioTool from "@/components/tools/UnitStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/unit-converter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <UnitStudioTool />
    </ToolPageShell>
  );
}
