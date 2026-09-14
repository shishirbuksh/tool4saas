"use client";

import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

const LinkWrapper = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
  // @ts-expect-error - MUI passes href dynamically
  <Link ref={ref} {...props} />
));

export default function HeroButtons({ firstSlug }: { firstSlug: string }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
      <Button component={LinkWrapper} href={`/${firstSlug}`} variant="contained" color="primary" size="large">
        Get started free
      </Button>
      <Button component={LinkWrapper} href="#tools" variant="outlined" color="primary" size="large">
        Browse all tools
      </Button>
    </Stack>
  );
}
