import ToolPageShell from "@/components/ToolPageShell";
import FractionCalculatorTool from "@/components/tools/FractionCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "fraction-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><FractionCalculatorTool /></ToolPageShell>; }
