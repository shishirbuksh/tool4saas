import ToolPageShell from "@/components/ToolPageShell";
import PdfRotateTool from "@/components/tools/PdfRotateTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "pdf-rotate";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><PdfRotateTool /></ToolPageShell>; }
