import ToolPageShell from "@/components/ToolPageShell";
import ImageCompressorTool from "@/components/tools/ImageCompressorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "image-compressor";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageCompressorTool />
    </ToolPageShell>
  );
}
