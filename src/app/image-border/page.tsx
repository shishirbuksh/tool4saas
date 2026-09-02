import ToolPageShell from "@/components/ToolPageShell";
import ImageBorderTool from "@/components/tools/ImageBorderTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "image-border";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageBorderTool />
    </ToolPageShell>
  );
}