import ToolPageShell from "@/components/ToolPageShell";
import TipCalculatorTool from "@/components/tools/TipCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "tip-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TipCalculatorTool />
    </ToolPageShell>
  );
}
