import ToolPageShell from "@/components/ToolPageShell";
import YoutubeThumbnailTool from "@/components/tools/YoutubeThumbnailTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/youtube-thumbnail-downloader/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <YoutubeThumbnailTool />
    </ToolPageShell>
  );
}
