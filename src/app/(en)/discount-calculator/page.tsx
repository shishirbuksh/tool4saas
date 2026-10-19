import ToolPageShell from "@/components/ToolPageShell";
import DiscountCalculatorTool from "@/components/tools/DiscountCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "discount-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <DiscountCalculatorTool />
    </ToolPageShell>
  );
}
