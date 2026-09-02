import ToolPageShell from "@/components/ToolPageShell";
import JwtDecoderTool from "@/components/tools/JwtDecoderTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "jwt-decoder";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <JwtDecoderTool />
    </ToolPageShell>
  );
}
