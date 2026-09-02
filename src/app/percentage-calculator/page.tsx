import ToolPageShell from "@/components/ToolPageShell";
import PercentageCalculatorTool from "@/components/tools/PercentageCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "percentage-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PercentageCalculatorTool />
    </ToolPageShell>
  );
}
