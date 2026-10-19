import ToolPageShell from "@/components/ToolPageShell";
import PeriodCalculatorTool from "@/components/tools/PeriodCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "period-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><PeriodCalculatorTool /></ToolPageShell>; }
