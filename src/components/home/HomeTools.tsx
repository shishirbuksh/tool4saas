import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ToolExplorer from "@/components/ToolExplorer";
import { VISIBLE_TOOL_COUNT } from "@/lib/tools";
import type { LiteGroup } from "@/lib/tools/catalog-lite";

// Category-filtered tool directory. Monetization is Auto Ads (page-level loader).
export default function HomeTools({ groups }: { groups: LiteGroup[] }) {
  return (
    <Container
      component="section"
      maxWidth="xl"
      id="tools"
      aria-label="All tools"
      sx={{
        py: { xs: 7, md: 10 },
        px: { xs: 2, md: 4 },
        scrollMarginTop: 100,
        overflowX: "clip",
      }}
    >
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 }, maxWidth: 680, mx: "auto" }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.75rem", md: "2.25rem" },
            fontWeight: 700,
            letterSpacing: "-0.025em",
            mb: 0.5,
          }}
        >
          All {VISIBLE_TOOL_COUNT} free tools
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: { xs: "0.9375rem", md: "1rem" } }}>
          Pick a category or use search. Most run locally, with no paywalls and no limits.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          New here? Start with{" "}
          <Link href="/category/text-documents">Text &amp; Documents</Link> or{" "}
          <Link href="/category/business">Business &amp; Writing</Link>.
        </Typography>
      </Box>

      <ToolExplorer groups={groups} />
    </Container>
  );
}
