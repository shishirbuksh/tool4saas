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
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Breadcrumbs sx={{ mb: 2 }} aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Home
        </Link>
        {cat && (
          <Link href={`/category/${cat.id}`} style={{ color: "inherit", textDecoration: "none" }}>
            {cat.label}
          </Link>
        )}
        <Typography color="text.primary">{tool.title}</Typography>
      </Breadcrumbs>
      <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, mb: 1 }}>
        {tool.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
        {tool.description}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "1fr 300px" },
          gap: 4,
          alignItems: "start",
        }}
      >
        <Box>{children}</Box>
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
