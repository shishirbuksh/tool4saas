import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import ToolCard from "@/components/ToolCard";
import { CATEGORIES, getCategory, toolsByCategoryCached } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) return {};
  const base = siteConfig.url.replace(/\/$/, "");
  const canonical = `${base}/category/${id}`;
  return {
    title: `${category.label} — ${siteConfig.name}`,
    description: category.description,
    alternates: { canonical },
    openGraph: { title: `${category.label} — ${siteConfig.name}`, description: category.description, url: canonical },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) notFound();

  const allGroups = toolsByCategoryCached();
  const group = allGroups.find((g) => g.category.id === id)!;
  const base = siteConfig.url.replace(/\/$/, "");
  const categoryUrl = `${base}/category/${id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: category.label, item: categoryUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": categoryUrl,
        name: category.label,
        url: categoryUrl,
        description: category.description,
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: group.tools.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${base}/${t.slug}`,
            item: `${base}/${t.slug}`,
            name: t.title,
          })),
        },
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Breadcrumbs sx={{ mb: 2 }} aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="text.primary">{category.label}</Typography>
      </Breadcrumbs>
      <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, mb: 1 }}>
        {category.label}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
        {category.description}
      </Typography>
      <Grid container spacing={3}>
        {group.tools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={tool.slug}>
            <ToolCard tool={tool} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h2" sx={{ fontSize: 20, mb: 2 }}>
          Browse all categories
        </Typography>
        <Grid container spacing={3}>
          {allGroups.map((g) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={g.category.id}>
              <Link
                href={`/category/${g.category.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    display: "block",
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: 18, mb: 0.5 }}>
                    {g.category.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {g.tools.length} tools
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
