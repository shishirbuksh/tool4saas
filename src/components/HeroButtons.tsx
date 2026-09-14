"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function HeroButtons({ firstSlug }: { firstSlug: string }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
      <Link href={`/${firstSlug}`} passHref legacyBehavior>
        <Button variant="contained" color="primary" size="large">
          Get started free
        </Button>
      </Link>
      <Link href="#tools" passHref legacyBehavior>
        <Button variant="outlined" color="primary" size="large">
          Browse all tools
        </Button>
      </Link>
    </Stack>
  );
}
