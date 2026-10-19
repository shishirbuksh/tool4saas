import ToolPageShell from "@/components/ToolPageShell";
import LoanStudioTool from "@/components/tools/LoanStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "emi-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><LoanStudioTool /></ToolPageShell>; }
