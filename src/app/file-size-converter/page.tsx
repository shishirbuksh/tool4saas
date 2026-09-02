import ToolPageShell from "@/components/ToolPageShell";
import FileSizeConverterTool from "@/components/tools/FileSizeConverterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "file-size-converter";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><FileSizeConverterTool /></ToolPageShell>; }
