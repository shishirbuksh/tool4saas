import Link from "@/lib/astro/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
    <Box component="section" aria-label="Related guides" sx={{ mt: 4, p: 3, border: "1px solid", borderColor: "divider", borderRadius: "12px", bgcolor: "background.paper" }}>
      <Typography variant="h2" sx={{ fontSize: "1.125rem", mb: 0.5 }}>
        Learn: guides &amp; tutorials
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Deep dives from the Tool4SaaS blog – tested workflows, print sizes and fixes.
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 3, display: "flex", flexDirection: "column", gap: 1 }}>
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
