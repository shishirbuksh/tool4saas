import ToolPageShell from "@/components/ToolPageShell";
import QrScannerTool from "@/components/tools/QrScannerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/qr-scanner/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <QrScannerTool />
    </ToolPageShell>
  );
}
