import ToolPageShell from "@/components/ToolPageShell";
import LoanCalculatorTool from "@/components/tools/LoanCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "loan-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <LoanCalculatorTool />
    </ToolPageShell>
  );
}
