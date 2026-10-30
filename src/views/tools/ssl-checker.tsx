import ToolPageShell from "@/components/ToolPageShell";
import SslCheckerTool from "@/components/tools/SslCheckerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/ssl-checker/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SslCheckerTool />
    </ToolPageShell>
  );
}
