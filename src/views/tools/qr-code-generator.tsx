import ToolPageShell from "@/components/ToolPageShell";
import QrStudioTool from "@/components/tools/QrStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/qr-code-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <QrStudioTool />
    </ToolPageShell>
  );
}
