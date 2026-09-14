import ToolPageShell from "@/components/ToolPageShell";
import PdfToJpgTool from "@/components/tools/PdfToJpgTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "pdf-to-jpg";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><PdfToJpgTool /></ToolPageShell>; }
