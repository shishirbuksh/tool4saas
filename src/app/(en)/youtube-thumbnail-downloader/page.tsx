import ToolPageShell from "@/components/ToolPageShell";
import YoutubeThumbnailTool from "@/components/tools/YoutubeThumbnailTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "youtube-thumbnail-downloader";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><YoutubeThumbnailTool /></ToolPageShell>; }
