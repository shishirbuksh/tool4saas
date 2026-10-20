import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { TRUST_ITEMS } from "@/content/home";

// Short trust strip - no heavy cards, one line per promise.
export default function HomeTrust() {
  return (
    <Box
      component="section"
      id="why"
      aria-label="Why use Tool4SaaS"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        py: { xs: 7, md: 9 },
        scrollMarginTop: 100,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontSize: { xs: "1.5rem", md: "1.875rem" },
            fontWeight: 700,
            letterSpacing: "-0.025em",
            mb: { xs: 3, md: 4 },
          }}
        >
          Private by default, free by design
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {TRUST_ITEMS.map((item) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.title}>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <CheckCircleOutlinedIcon
                  aria-hidden="true"
                  fontSize="small"
                  sx={{ mt: 0.25, flex: "0 0 auto", color: "text.primary" }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "1rem", mb: 0.25 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {item.body}
                    {item.href && item.linkLabel ? (
                      <>
                        {" "}
                        <Link href={item.href}>{item.linkLabel}</Link>.
                      </>
                    ) : null}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

