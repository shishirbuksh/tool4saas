import ToolPageShell from "@/components/ToolPageShell";
import ScientificCalculatorTool from "@/components/tools/ScientificCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "scientific-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><ScientificCalculatorTool /></ToolPageShell>; }
