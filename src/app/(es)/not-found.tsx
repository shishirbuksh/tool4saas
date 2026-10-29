"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import MuiNextLink from "@/components/MuiNextLink";
import ToolSearchIsland from "@/components/ToolSearchIsland";

const LinkWrapper = MuiNextLink;

const POPULAR_TOOLS_ES = [
  { href: "/es/invoice-generator", title: "Generador de Facturas" },
  { href: "/es/word-counter", title: "Contador de Palabras" },
  { href: "/es/qr-code-generator", title: "Generador de Código QR" },
  { href: "/es/mortgage-calculator", title: "Calculadora de Hipoteca" },
];

export default function NotFoundEs() {
  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
      <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: 800, color: "primary.main" }} aria-label="404 Página no encontrada">
        404
      </Typography>
      <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 2 }}>
        Página no encontrada
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        La página que buscas no existe o ha sido movida.
      </Typography>
      <Box>
        <Button component={LinkWrapper} href="/es" variant="contained" size="large">
          Volver al inicio
        </Button>
      </Box>
      <Box sx={{ mt: 4, maxWidth: 400, mx: "auto" }}>
        <ToolSearchIsland sx={{ width: "100%" }} />
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
        {POPULAR_TOOLS_ES.map((t) => (
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
