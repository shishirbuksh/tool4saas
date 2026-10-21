import ToolPageShell from "@/components/ToolPageShell";
import ImageFormatStudioTool from "@/components/tools/ImageFormatStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "image-format-converter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageFormatStudioTool />
    </ToolPageShell>
  );
}
