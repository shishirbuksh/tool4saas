import ToolPageShell from "@/components/ToolPageShell";
import IdealWeightCalculatorTool from "@/components/tools/IdealWeightCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "ideal-weight-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><IdealWeightCalculatorTool /></ToolPageShell>; }
