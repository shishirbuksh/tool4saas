import ToolPageShell from "@/components/ToolPageShell";
import BarcodeGeneratorTool from "@/components/tools/BarcodeGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/barcode-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <BarcodeGeneratorTool />
    </ToolPageShell>
  );
}
