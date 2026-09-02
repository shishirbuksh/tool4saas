import ToolPageShell from "@/components/ToolPageShell";
import MarkdownEditorTool from "@/components/tools/MarkdownEditorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "markdown-editor";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><MarkdownEditorTool /></ToolPageShell>; }
