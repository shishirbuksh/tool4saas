import ToolPageShell from "@/components/ToolPageShell";
import PpfCalculatorTool from "@/components/tools/PpfCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "ppf-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><PpfCalculatorTool /></ToolPageShell>; }
