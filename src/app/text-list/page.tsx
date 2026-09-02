import ToolPageShell from "@/components/ToolPageShell";
import ListTools from "@/components/tools/ListTools";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "text-list";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ListTools />
    </ToolPageShell>
  );
}
