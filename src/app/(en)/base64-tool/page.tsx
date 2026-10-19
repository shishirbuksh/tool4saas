import ToolPageShell from "@/components/ToolPageShell";
import Base64Tool from "@/components/tools/Base64Tool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "base64-tool";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <Base64Tool />
    </ToolPageShell>
  );
}
