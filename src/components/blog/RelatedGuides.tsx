import Link from "@/lib/astro/navigation";import { Box, Typography } from "@/components/ds";


// Tool → blog guide backlinks. Closes the silo loop: blog posts funnel down to
// money tool pages, and tool pages link back up to the guides. The mapping is
// resolved on the server (src/lib/tool-guides.ts) and passed in, so this
// component ships no blog content to the browser.
export default function RelatedGuides({
  guides,
}: {
  guides: { href: string; title: string }[];
}) {
  if (guides.length === 0) return null;
  return (
    <Box component="section" aria-label="Related guides" className="mt-8 p-6 border border-base-300 rounded-[12px] bg-base-100">
      <Typography variant="h2" className="text-[1.125rem] mb-1">
        Learn: guides &amp; tutorials
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">
        Deep dives from the Tool4SaaS blog – tested workflows, print sizes and fixes.
      </Typography>
      <Box component="ul" className="m-0 pl-6 flex flex-col gap-2">
        {guides.map((g) => (
          <Box component="li" key={g.href}>
            <Link href={g.href} style={{ fontWeight: 600 }}>
              {g.title}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
