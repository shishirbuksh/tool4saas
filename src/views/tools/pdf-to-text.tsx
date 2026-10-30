import ToolPageShell from "@/components/ToolPageShell";
import PdfToTextTool from "@/components/tools/PdfToTextTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/pdf-to-text/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PdfToTextTool />
    </ToolPageShell>
  );
}
