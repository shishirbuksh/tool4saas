import ToolPageShell from "@/components/ToolPageShell";
import FancyTextGeneratorTool from "@/components/tools/FancyTextGeneratorTool";
import type { Metadata } from "next";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "fancy-text-generator";
const tool = getTool(slug)!;
const baseMetadata = toolMetadata(slug);
// Thin (~297 words) and overlapping the text-tools hub intent; keep noindex
// until it ships genuinely unique styled-text output worth ranking.
export const metadata: Metadata = {
  ...baseMetadata,
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <FancyTextGeneratorTool />
    </ToolPageShell>
  );
}
