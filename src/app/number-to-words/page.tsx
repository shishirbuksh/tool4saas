import ToolPageShell from "@/components/ToolPageShell";
import NumberToWordsTool from "@/components/tools/NumberToWordsTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "number-to-words";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <NumberToWordsTool />
    </ToolPageShell>
  );
}
