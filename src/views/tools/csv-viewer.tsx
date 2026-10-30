import ToolPageShell from "@/components/ToolPageShell";
import CsvViewerTool from "@/components/tools/CsvViewerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/csv-viewer/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CsvViewerTool />
    </ToolPageShell>
  );
}
