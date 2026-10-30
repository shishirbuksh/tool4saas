import ToolPageShell from "@/components/ToolPageShell";
import SerpStudioTool from "@/components/tools/SerpStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/serp-preview/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SerpStudioTool />
    </ToolPageShell>
  );
}
