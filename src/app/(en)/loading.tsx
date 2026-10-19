import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Loading() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center", mb: 6 }}>
        <Skeleton variant="text" width="60%" height={56} sx={{ mx: "auto", mb: 2 }} />
        <Skeleton variant="text" width="80%" height={28} sx={{ mx: "auto" }} />
      </Box>
      <Stack spacing={2} sx={{ maxWidth: 800, mx: "auto" }}>
        <Skeleton variant="rounded" height={180} />
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} width="40%" />
      </Stack>
    </Container>
  );
}
