import ToolPageShell from "@/components/ToolPageShell";
import TextCleanerTool from "@/components/tools/TextCleanerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "text-cleaner";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><TextCleanerTool /></ToolPageShell>; }
