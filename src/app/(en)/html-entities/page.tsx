import ToolPageShell from "@/components/ToolPageShell";
import HtmlEntitiesTool from "@/components/tools/HtmlEntitiesTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "html-entities";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <HtmlEntitiesTool />
    </ToolPageShell>
  );
}
