import ToolPageShell from "@/components/ToolPageShell";
import ImageFormatStudioTool from "@/components/tools/ImageFormatStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/image-format-converter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ImageFormatStudioTool />
    </ToolPageShell>
  );
}
