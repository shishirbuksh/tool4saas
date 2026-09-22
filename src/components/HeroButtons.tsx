import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function HeroButtons({ firstSlug }: { firstSlug: string }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
      <Button href={`/${firstSlug}`} variant="contained" color="primary" size="large">
        Get started free
      </Button>
      <Button href="#tools" variant="outlined" color="primary" size="large">
        Browse all tools
      </Button>
    </Stack>
  );
}
