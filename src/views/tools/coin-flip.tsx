import ToolPageShell from "@/components/ToolPageShell";
import CoinStudioTool from "@/components/tools/CoinStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/coin-flip/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CoinStudioTool />
    </ToolPageShell>
  );
}
