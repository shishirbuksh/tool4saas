"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import MuiNextLink from "@/components/MuiNextLink";
import ToolSearchIsland from "@/components/ToolSearchIsland";

const LinkWrapper = MuiNextLink;

const POPULAR_TOOLS_FR = [
  { href: "/fr/invoice-generator", title: "Générateur de Factures" },
  { href: "/fr/word-counter", title: "Compteur de Mots" },
  { href: "/fr/qr-code-generator", title: "Générateur de Code QR" },
  { href: "/fr/mortgage-calculator", title: "Calculateur de Prêt Immobilier" },
];

export default function NotFoundFr() {
  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
      <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: 800, color: "primary.main" }} aria-label="404 Page non trouvée">
        404
      </Typography>
      <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 2 }}>
        Page non trouvée
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </Typography>
      <Box>
        <Button component={LinkWrapper} href="/fr" variant="contained" size="large">
          Retour à l&apos;accueil
        </Button>
      </Box>
      <Box sx={{ mt: 4, maxWidth: 400, mx: "auto" }}>
        <ToolSearchIsland sx={{ width: "100%" }} />
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
        {POPULAR_TOOLS_FR.map((t) => (
          <Button
            key={t.href}
            component={LinkWrapper}
            href={t.href}
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
