import ToolPageShell from "@/components/ToolPageShell";
import RegexTesterTool from "@/components/tools/RegexTesterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "regex-tester";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RegexTesterTool />
    </ToolPageShell>
  );
}
