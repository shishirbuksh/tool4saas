import ToolPageShell from "@/components/ToolPageShell";
import EmiCalculatorTool from "@/components/tools/EmiCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "emi-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><EmiCalculatorTool /></ToolPageShell>; }
