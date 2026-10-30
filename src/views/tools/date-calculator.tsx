import ToolPageShell from "@/components/ToolPageShell";
import DateStudioTool from "@/components/tools/DateStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/date-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <DateStudioTool />
    </ToolPageShell>
  );
}
