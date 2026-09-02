import ToolPageShell from "@/components/ToolPageShell";
import UrlEncoderTool from "@/components/tools/UrlEncoderTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "url-encoder";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <UrlEncoderTool />
    </ToolPageShell>
  );
}
