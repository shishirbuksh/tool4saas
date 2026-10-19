import ToolPageShell from "@/components/ToolPageShell";
import SlugGeneratorTool from "@/components/tools/SlugGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "slug-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <SlugGeneratorTool />
    </ToolPageShell>
  );
}
