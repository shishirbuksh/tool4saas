import ToolPageShell from "@/components/ToolPageShell";
import GrowthStudioTool from "@/components/tools/GrowthStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "compound-interest-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><GrowthStudioTool /></ToolPageShell>; }
