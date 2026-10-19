import ToolPageShell from "@/components/ToolPageShell";
import CommissionCalculatorTool from "@/components/tools/CommissionCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "commission-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CommissionCalculatorTool />
    </ToolPageShell>
  );
}