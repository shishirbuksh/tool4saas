import ToolPageShell from "@/components/ToolPageShell";
import MacroCalculatorTool from "@/components/tools/MacroCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "macro-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><MacroCalculatorTool /></ToolPageShell>; }
