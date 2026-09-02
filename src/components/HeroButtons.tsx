"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function HeroButtons({ firstSlug }: { firstSlug: string }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
      <Button
        component={Link}
        href={`/${firstSlug}`}
        variant="contained"
        color="primary"
        size="large"
      >
        Get started free
      </Button>
      <Button
        component={Link}
        href="#tools"
        variant="outlined"
        color="primary"
        size="large"
      >
        Browse all tools
      </Button>
    </Stack>
  );
}
