"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import Link from "next/link";
import ToolSearch from "@/components/ToolSearch";
import { getTool } from "@/lib/tools";

const LinkWrapper = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
  // @ts-expect-error - MUI passes href dynamically
  <Link ref={ref} {...props} />
));

export default function NotFound() {
  const popularTools = ["invoice-generator", "word-counter", "qr-code-generator"]
    .map((slug) => getTool(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
      <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: 800, color: "primary.main" }}>404</Typography>
      <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 2 }}>Page not found</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </Typography>
      <Box>
        <Button component={LinkWrapper} href="/" variant="contained" size="large">
          Back to home
        </Button>
      </Box>
      <Box sx={{ mt: 4, maxWidth: 400, mx: "auto" }}>
        <ToolSearch sx={{ width: "100%" }} />
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
        {popularTools.map((t) => (
          <Button
            key={t.slug}
            component={LinkWrapper}
            href={`/${t.slug}`}
            variant="outlined"
            size="medium"
            sx={{ minHeight: 44 }}
          >
            {t.title}
          </Button>
        ))}
      </Box>
    </Container>
  );
}
