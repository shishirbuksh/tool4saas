import ToolPageShell from "@/components/ToolPageShell";
import TimestampConverterTool from "@/components/tools/TimestampConverterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "timestamp-converter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TimestampConverterTool />
    </ToolPageShell>
  );
}
