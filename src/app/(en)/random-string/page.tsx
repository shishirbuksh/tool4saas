import ToolPageShell from "@/components/ToolPageShell";
import RandomStringTool from "@/components/tools/RandomStringTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "random-string";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RandomStringTool />
    </ToolPageShell>
  );
}
