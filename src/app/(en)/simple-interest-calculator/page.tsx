import ToolPageShell from "@/components/ToolPageShell";
import SimpleInterestCalculatorTool from "@/components/tools/SimpleInterestCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "simple-interest-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SimpleInterestCalculatorTool /></ToolPageShell>; }
