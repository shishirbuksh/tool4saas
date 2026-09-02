import ToolPageShell from "@/components/ToolPageShell";
import ColorConverterTool from "@/components/tools/ColorConverterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "color-converter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ColorConverterTool />
    </ToolPageShell>
  );
}
