import ToolPageShell from "@/components/ToolPageShell";
import ImageStudioTool from "@/components/tools/ImageStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/image-compressor/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ImageStudioTool />
    </ToolPageShell>
  );
}
