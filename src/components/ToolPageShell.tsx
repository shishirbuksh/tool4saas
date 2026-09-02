import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AdSlot from "@/components/AdSlotLazy";
import ToolSeo from "@/components/ToolSeo";
import RelatedTools from "@/components/RelatedTools";
import { getCategory, type Tool } from "@/lib/tools";

export default function ToolPageShell({ tool, children }: { tool: Tool; children: React.ReactNode }) {
  const cat = getCategory(tool.category);
  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
      <Box sx={{ mb: { xs: 6, md: 8 }, maxWidth: 800, mx: "auto", textAlign: "center" }}>
        <Breadcrumbs sx={{ mb: 4, typography: 'body2', justifyContent: "center", display: "flex" }} aria-label="breadcrumb">
          <Box component={Link} href="/" sx={{ color: "text.secondary", textDecoration: "none", '&:hover': { color: 'primary.main' } }}>
            Home
          </Box>
          {cat && (
            <Box component={Link} href={`/category/${cat.id}`} sx={{ color: "text.secondary", textDecoration: "none", '&:hover': { color: 'primary.main' } }}>
              {cat.label}
            </Box>
          )}
          <Typography color="text.primary" sx={{ fontWeight: 600 }}>{tool.title}</Typography>
        </Breadcrumbs>
        
        <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, fontWeight: 800, mb: 3, letterSpacing: "-0.03em" }}>
          {tool.title}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: { xs: "1.125rem", md: "1.25rem" }, lineHeight: 1.6, maxWidth: 640, mx: "auto" }}>
          {tool.description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "minmax(0, 800px) 300px" },
          justifyContent: "center",
          gap: { xs: 4, md: 6 },
          alignItems: "start",
        }}
      >
        <Box sx={{ width: "100%", minWidth: 0 }}>{children}</Box>
        <Box sx={{ position: { md: "sticky" }, top: { md: 88 } }}>
          <AdSlot
            format="rectangle"
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE || ""}
            label="Advertisement"
          />
        </Box>
      </Box>
      <RelatedTools slug={tool.slug} />
      <ToolSeo tool={tool} />
    </Container>
  );
}
