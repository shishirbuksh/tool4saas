import ToolPageShell from "@/components/ToolPageShell";
import InvoiceStudioTool from "@/components/tools/InvoiceStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/invoice-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <InvoiceStudioTool />
    </ToolPageShell>
  );
}
