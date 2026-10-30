import ToolPageShell from "@/components/ToolPageShell";
import PdfStudioTool from "@/components/tools/PdfStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/pdf-merge/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PdfStudioTool />
    </ToolPageShell>
  );
}
