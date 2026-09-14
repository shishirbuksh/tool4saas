import ToolPageShell from "@/components/ToolPageShell";
import InHandSalaryTool from "@/components/tools/InHandSalaryTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "in-hand-salary-india";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><InHandSalaryTool /></ToolPageShell>; }
