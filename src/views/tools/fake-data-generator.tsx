import ToolPageShell from "@/components/ToolPageShell";
import FakeDataGeneratorTool from "@/components/tools/FakeDataGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/fake-data-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <FakeDataGeneratorTool />
    </ToolPageShell>
  );
}
