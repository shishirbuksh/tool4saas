import ToolPageShell from "@/components/ToolPageShell";
import GstCalculatorTool from "@/components/tools/GstCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "gst-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <GstCalculatorTool />
    </ToolPageShell>
  );
}
