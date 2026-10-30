import ToolPageShell from "@/components/ToolPageShell";
import PdfCompressTool from "@/components/tools/PdfCompressTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/pdf-compress/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PdfCompressTool />
    </ToolPageShell>
  );
}
