import ToolPageShell from "@/components/ToolPageShell";
import PdfWatermarkTool from "@/components/tools/PdfWatermarkTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "pdf-watermark";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><PdfWatermarkTool /></ToolPageShell>; }
