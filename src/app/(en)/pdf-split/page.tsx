import ToolPageShell from "@/components/ToolPageShell";
import PdfSplitTool from "@/components/tools/PdfSplitTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "pdf-split";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><PdfSplitTool /></ToolPageShell>; }
