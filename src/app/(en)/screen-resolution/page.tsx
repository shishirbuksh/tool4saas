import ToolPageShell from "@/components/ToolPageShell";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
import ScreenResolutionTool from "@/components/tools/ScreenResolutionTool";

const slug = "screen-resolution";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ScreenResolutionTool />
    </ToolPageShell>
  );
}