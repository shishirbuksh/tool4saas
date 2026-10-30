import ToolPageShell from "@/components/ToolPageShell";
import CurrencyConverterTool from "@/components/tools/CurrencyConverterTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/currency-converter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CurrencyConverterTool />
    </ToolPageShell>
  );
}
