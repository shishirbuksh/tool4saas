import ToolPageShell from "@/components/ToolPageShell";
import ExifViewerTool from "@/components/tools/ExifViewerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/exif-viewer/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ExifViewerTool />
    </ToolPageShell>
  );
}
