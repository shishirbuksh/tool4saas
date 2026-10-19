import ToolPageShell from "@/components/ToolPageShell";
import UrlParserTool from "@/components/tools/UrlParserTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "url-parser";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <UrlParserTool />
    </ToolPageShell>
  );
}
