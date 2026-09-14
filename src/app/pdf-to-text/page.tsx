import ToolPageShell from "@/components/ToolPageShell";
import PdfToTextTool from "@/components/tools/PdfToTextTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "pdf-to-text";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><PdfToTextTool /></ToolPageShell>; }
