"use client";

import { useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React from "react";
import Link from "next/link";

const LinkWrapper = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
  // @ts-expect-error - MUI passes href dynamically
  <Link ref={ref} {...props} />
));

export default function Error({
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
    <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
      <Typography variant="h1" sx={{ fontSize: "3rem", fontWeight: 800, mb: 1 }}>
        Something went wrong
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        This tool ran into an error. Your files never leave your browser — try again or go back home.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center" }}>
        <Button variant="contained" size="large" onClick={() => reset()}>
          Try again
        </Button>
        <Button component={LinkWrapper} href="/" variant="outlined" size="large">
          Back to home
        </Button>
      </Stack>
      {error.digest && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Error ID: {error.digest}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
