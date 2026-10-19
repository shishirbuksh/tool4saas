import ToolPageShell from "@/components/ToolPageShell";
import FdCalculatorTool from "@/components/tools/FdCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "fd-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><FdCalculatorTool /></ToolPageShell>; }
