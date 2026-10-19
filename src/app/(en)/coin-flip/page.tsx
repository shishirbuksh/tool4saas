import ToolPageShell from "@/components/ToolPageShell";
import CoinFlipTool from "@/components/tools/CoinFlipTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "coin-flip";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CoinFlipTool />
    </ToolPageShell>
  );
}