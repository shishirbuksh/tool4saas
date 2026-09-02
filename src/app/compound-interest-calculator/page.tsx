import ToolPageShell from "@/components/ToolPageShell";
import CompoundInterestTool from "@/components/tools/CompoundInterestTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "compound-interest-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CompoundInterestTool /></ToolPageShell>; }
