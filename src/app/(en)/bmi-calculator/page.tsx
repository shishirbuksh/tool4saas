import ToolPageShell from "@/components/ToolPageShell";
import BmiCalculatorTool from "@/components/tools/BmiCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "bmi-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <BmiCalculatorTool />
    </ToolPageShell>
  );
}
