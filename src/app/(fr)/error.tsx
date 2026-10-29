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

export default function ErrorFr({
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
        Une erreur est survenue
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Cet outil a rencontré une erreur. Vos fichiers ne quittent jamais votre navigateur — réessayez ou retournez à l&apos;accueil.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center" }}>
        <Button variant="contained" size="large" onClick={() => reset()}>
          Réessayer
        </Button>
        <Button component={LinkWrapper} href="/fr" variant="outlined" size="large">
          Retour à l&apos;accueil
        </Button>
      </Stack>
      {error.digest && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Identifiant d&apos;erreur : {error.digest}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
