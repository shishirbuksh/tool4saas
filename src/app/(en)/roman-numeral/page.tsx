import ToolPageShell from "@/components/ToolPageShell";
import RomanNumeralTool from "@/components/tools/RomanNumeralTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "roman-numeral";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RomanNumeralTool />
    </ToolPageShell>
  );
}
