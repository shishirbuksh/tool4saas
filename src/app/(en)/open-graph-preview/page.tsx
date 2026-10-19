import ToolPageShell from "@/components/ToolPageShell";
import OpenGraphPreviewTool from "@/components/tools/OpenGraphPreviewTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "open-graph-preview";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><OpenGraphPreviewTool /></ToolPageShell>; }
