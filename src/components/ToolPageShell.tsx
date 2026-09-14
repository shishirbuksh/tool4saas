import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AdSlot from "@/components/AdSlotLazy";
import ToolSeo from "@/components/ToolSeo";
import RelatedTools from "@/components/RelatedTools";
import { getCategory, type Tool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export default function ToolPageShell({ tool, children }: { tool: Tool; children: React.ReactNode }) {
  const cat = getCategory(tool.category);
  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, overflowX: "clip" }}>
      <Box sx={{ mb: { xs: 6, md: 8 }, maxWidth: 800, mx: "auto", textAlign: "center" }}>
        <Breadcrumbs sx={{ mb: 4, typography: 'body2', justifyContent: "center", display: "flex" }} aria-label="breadcrumb">
          <Link href="/" style={{textDecoration: "none"}}>
            <Box component="span" sx={{ color: "text.secondary", textDecoration: "none", '&:hover': { color: 'primary.main' } }}>
              Home
            </Box>
          </Link>
          {cat && (
            <Link href={`/category/${cat.id}`} style={{textDecoration: "none"}}>
              <Box component="span" sx={{ color: "text.secondary", textDecoration: "none", '&:hover': { color: 'primary.main' } }}>
                {cat.label}
              </Box>
            </Link>
          )}
          <Typography color="text.primary" sx={{ fontWeight: 600 }}>{tool.title}</Typography>
        </Breadcrumbs>
        
        <Typography variant="h1" sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" }, fontWeight: 800, mb: 3, letterSpacing: "-0.03em", textWrap: "balance" }}>
          {tool.title}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: { xs: "1.125rem", md: "1.25rem" }, lineHeight: 1.6, maxWidth: 640, mx: "auto", textWrap: "pretty" }}>
          {tool.description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "minmax(0, 800px) 300px" },
          justifyContent: "center",
          gap: { xs: 4, md: 6 },
          alignItems: "start",
        }}
      >
        <Box sx={{ width: "100%", minWidth: 0, overflowX: "auto" }}>{children}</Box>
        <Box sx={{ minHeight: { lg: 280 } }}>
          <AdSlot
            format="rectangle"
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE || ""}
            label="Advertisement"
          />
        </Box>
      </Box>
      <RelatedTools slug={tool.slug} />
      <Box
        component="section"
        aria-label="About the author"
        sx={{ mt: 4, p: 3, border: "1px solid", borderColor: "divider", borderRadius: "12px", bgcolor: "background.paper" }}
      >
        <Typography variant="h2" sx={{ fontSize: "1.125rem", mb: 1 }}>
          About the author
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          Written and maintained by the <Box component="span" translate="no" sx={{ display: "inline" }}>{siteConfig.author}</Box> team.
          Every tool runs locally in your browser and is tested in-house for accuracy. Last updated:{" "}
          <time dateTime="2026-09-09">September 9, 2026</time>.
        </Typography>
      </Box>
      <ToolSeo tool={tool} />
    </Container>
  );
}
