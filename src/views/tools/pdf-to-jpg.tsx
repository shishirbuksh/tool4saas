import ToolPageShell from "@/components/ToolPageShell";
import PdfToJpgTool from "@/components/tools/PdfToJpgTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/pdf-to-jpg/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PdfToJpgTool />
    </ToolPageShell>
  );
}
