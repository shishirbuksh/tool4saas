import ToolPageShell from "@/components/ToolPageShell";
import CapitalGainsTool from "@/components/tools/CapitalGainsTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/capital-gains-tax-india/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CapitalGainsTool />
    </ToolPageShell>
  );
}
