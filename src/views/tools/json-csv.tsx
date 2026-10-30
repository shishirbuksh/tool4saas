import ToolPageShell from "@/components/ToolPageShell";
import JsonCsvTool from "@/components/tools/JsonCsvTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/json-csv/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <JsonCsvTool />
    </ToolPageShell>
  );
}
