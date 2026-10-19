import ToolPageShell from "@/components/ToolPageShell";
import WorkDaysCalculatorTool from "@/components/tools/WorkDaysCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "work-days-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <WorkDaysCalculatorTool />
    </ToolPageShell>
  );
}