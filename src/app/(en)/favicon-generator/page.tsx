import ToolPageShell from "@/components/ToolPageShell";
import FaviconGeneratorTool from "@/components/tools/FaviconGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "favicon-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <FaviconGeneratorTool />
    </ToolPageShell>
  );
}
