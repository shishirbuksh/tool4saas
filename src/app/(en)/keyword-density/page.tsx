import ToolPageShell from "@/components/ToolPageShell";
import KeywordDensityTool from "@/components/tools/KeywordDensityTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "keyword-density";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <KeywordDensityTool />
    </ToolPageShell>
  );
}
