import ToolPageShell from "@/components/ToolPageShell";
import PasswordGeneratorTool from "@/components/tools/PasswordGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "password-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PasswordGeneratorTool />
    </ToolPageShell>
  );
}
