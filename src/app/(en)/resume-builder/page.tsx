import ToolPageShell from "@/components/ToolPageShell";
import ResumeTool from "@/components/tools/ResumeTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "resume-builder";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ResumeTool />
    </ToolPageShell>
  );
}
