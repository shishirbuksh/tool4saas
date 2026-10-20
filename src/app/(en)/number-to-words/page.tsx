import ToolPageShell from "@/components/ToolPageShell";
import EncoderStudioTool from "@/components/tools/EncoderStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "number-to-words";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <EncoderStudioTool />
    </ToolPageShell>
  );
}
