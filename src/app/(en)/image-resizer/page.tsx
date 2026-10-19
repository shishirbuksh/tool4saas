import ToolPageShell from "@/components/ToolPageShell";
import ImageResizerTool from "@/components/tools/ImageResizerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "image-resizer";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageResizerTool />
    </ToolPageShell>
  );
}
