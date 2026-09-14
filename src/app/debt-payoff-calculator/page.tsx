import ToolPageShell from "@/components/ToolPageShell";
import DebtPayoffTool from "@/components/tools/DebtPayoffTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "debt-payoff-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><DebtPayoffTool /></ToolPageShell>; }
