import ToolPageShell from "@/components/ToolPageShell";
import RobotsTxtGeneratorTool from "@/components/tools/RobotsTxtGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/robots-txt-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <RobotsTxtGeneratorTool />
    </ToolPageShell>
  );
}
