import ToolPageShell from "@/components/ToolPageShell";
import CaseConverterTool from "@/components/tools/CaseConverterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "case-converter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CaseConverterTool />
    </ToolPageShell>
  );
}
