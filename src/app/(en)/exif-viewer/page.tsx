import ToolPageShell from "@/components/ToolPageShell";
import ExifViewerTool from "@/components/tools/ExifViewerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "exif-viewer";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><ExifViewerTool /></ToolPageShell>; }
