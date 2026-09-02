import ToolPageShell from "@/components/ToolPageShell";
import CsvViewerTool from "@/components/tools/CsvViewerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "csv-viewer";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CsvViewerTool /></ToolPageShell>; }
