import ToolPageShell from "@/components/ToolPageShell";
import AiTokenCounterTool from "@/components/tools/AiTokenCounterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "ai-token-counter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <AiTokenCounterTool />
    </ToolPageShell>
  );
}
