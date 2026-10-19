import ToolPageShell from "@/components/ToolPageShell";
import CapitalGainsTool from "@/components/tools/CapitalGainsTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "capital-gains-tax-india";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CapitalGainsTool /></ToolPageShell>; }
