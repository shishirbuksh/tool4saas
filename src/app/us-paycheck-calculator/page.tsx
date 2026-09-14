import ToolPageShell from "@/components/ToolPageShell";
import UsPaycheckTool from "@/components/tools/UsPaycheckTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "us-paycheck-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><UsPaycheckTool /></ToolPageShell>; }
