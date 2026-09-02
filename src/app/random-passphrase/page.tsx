import ToolPageShell from "@/components/ToolPageShell";
import RandomPassphraseTool from "@/components/tools/RandomPassphraseTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "random-passphrase";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RandomPassphraseTool />
    </ToolPageShell>
  );
}