import ToolPageShell from "@/components/ToolPageShell";
import GpaCalculatorTool from "@/components/tools/GpaCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "gpa-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><GpaCalculatorTool /></ToolPageShell>; }
