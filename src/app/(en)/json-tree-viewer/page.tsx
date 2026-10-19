import ToolPageShell from "@/components/ToolPageShell";
import JsonTreeViewerTool from "@/components/tools/JsonTreeViewerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "json-tree-viewer";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><JsonTreeViewerTool /></ToolPageShell>; }
