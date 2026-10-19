import ToolPageShell from "@/components/ToolPageShell";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
import RandomHexColorTool from "@/components/tools/RandomHexColorTool";

const slug = "random-hex-color";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RandomHexColorTool />
    </ToolPageShell>
  );
}