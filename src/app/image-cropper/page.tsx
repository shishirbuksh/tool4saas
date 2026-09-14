import ToolPageShell from "@/components/ToolPageShell";
import ImageCropperTool from "@/components/tools/ImageCropperTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "image-cropper";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><ImageCropperTool /></ToolPageShell>; }
