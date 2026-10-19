import ToolPageShell from "@/components/ToolPageShell";
import DiceRollerTool from "@/components/tools/DiceRollerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "dice-roller";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <DiceRollerTool />
    </ToolPageShell>
  );
}
