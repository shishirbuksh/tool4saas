import ToolPageShell from "@/components/ToolPageShell";
import ColorContrastTool from "@/components/tools/ColorContrastTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "color-contrast";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ColorContrastTool />
    </ToolPageShell>
  );
}
