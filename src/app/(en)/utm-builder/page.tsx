import ToolPageShell from "@/components/ToolPageShell";
import UtmBuilderTool from "@/components/tools/UtmBuilderTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "utm-builder";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><UtmBuilderTool /></ToolPageShell>; }
