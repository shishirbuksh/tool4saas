import ToolPageShell from "@/components/ToolPageShell";
import InflationCalculatorTool from "@/components/tools/InflationCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "inflation-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><InflationCalculatorTool /></ToolPageShell>; }
