import ToolPageShell from "@/components/ToolPageShell";
import SerpStudioTool from "@/components/tools/SerpStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "serp-preview";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SerpStudioTool /></ToolPageShell>; }
