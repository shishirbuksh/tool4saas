import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import Link from "next/link";


const LinkWrapper = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
  // @ts-expect-error - MUI passes href dynamically
  <Link ref={ref} {...props} />
));

import ToolSearchIsland from "@/components/ToolSearchIsland";

// Static popular links — hardcoded to avoid importing the full tools registry
// (no catalogue import) and keep the 404 bundle lean.
const POPULAR_TOOLS = [
  { slug: "invoice-generator", title: "Invoice Generator" },
  { slug: "word-counter", title: "Word Counter" },
  { slug: "qr-code-generator", title: "QR Code Generator" },
  { slug: "mortgage-calculator", title: "Mortgage Calculator" },
];

const POPULAR_CATEGORIES = [
  { id: "text-documents", label: "Text & Documents" },
  { id: "developer", label: "Developer Tools" },
  { id: "calculators", label: "Calculators" },
  { id: "finance", label: "Finance & Money" },
];

export default function NotFound() {
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
        <ToolSearchIsland sx={{ width: "100%" }} />
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
        {POPULAR_TOOLS.map((t) => (
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
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
        {POPULAR_CATEGORIES.map((c) => (
          <Button
            key={c.id}
            component={LinkWrapper}
            href={`/category/${c.id}`}
            variant="text"
            size="medium"
            sx={{ minHeight: 44 }}
          >
            {c.label}
          </Button>
        ))}
      </Box>
    </Container>
  );
}
