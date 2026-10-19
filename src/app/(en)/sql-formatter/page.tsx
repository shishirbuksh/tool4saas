import ToolPageShell from "@/components/ToolPageShell";
import SqlFormatterTool from "@/components/tools/SqlFormatterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "sql-formatter";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SqlFormatterTool /></ToolPageShell>; }
