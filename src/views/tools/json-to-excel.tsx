import ToolPageShell from "@/components/ToolPageShell";
import JsonToExcelTool from "@/components/tools/JsonToExcelTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/json-to-excel/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <JsonToExcelTool />
    </ToolPageShell>
  );
}
