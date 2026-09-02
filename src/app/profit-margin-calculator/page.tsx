import ToolPageShell from "@/components/ToolPageShell";
import ProfitMarginCalculatorTool from "@/components/tools/ProfitMarginCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "profit-margin-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><ProfitMarginCalculatorTool /></ToolPageShell>; }
