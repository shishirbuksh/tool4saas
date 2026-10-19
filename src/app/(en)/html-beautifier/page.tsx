import ToolPageShell from "@/components/ToolPageShell";
import HtmlBeautifierTool from "@/components/tools/HtmlBeautifierTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "html-beautifier";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <HtmlBeautifierTool />
    </ToolPageShell>
  );
}
