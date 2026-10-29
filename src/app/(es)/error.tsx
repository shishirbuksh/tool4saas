"use client";

import { useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React from "react";
import MuiNextLink from "@/components/MuiNextLink";

const LinkWrapper = MuiNextLink;

export default function ErrorEs({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }} role="alert">
      <Typography variant="h1" sx={{ fontSize: "3rem", fontWeight: 800, mb: 1 }}>
        Algo salió mal
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Esta herramienta encontró un error. Tus archivos nunca salen de tu navegador; inténtalo de nuevo o vuelve al inicio.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center" }}>
        <Button variant="contained" size="large" onClick={() => reset()}>
          Intentar de nuevo
        </Button>
        <Button component={LinkWrapper} href="/es" variant="outlined" size="large">
          Volver al inicio
        </Button>
      </Stack>
      {error.digest && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            ID de error: {error.digest}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
