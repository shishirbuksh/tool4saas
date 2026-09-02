import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { staticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = staticPageMetadata({
  title: "About",
  description:
    "ToolKit Pro is a free, privacy-friendly collection of browser-based productivity tools. Learn how and why we built it.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontSize: "2.25rem", mb: 2 }}>About ToolKit Pro</Typography>
      <Box component="div" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        <Typography  sx={{ display: "block", mb: 1 }}>
          ToolKit Pro is a collection of free, privacy-friendly productivity tools that run entirely in your browser. We built it because great tools shouldn&apos;t require an account, a subscription, or handing over your data.
        </Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          Every tool — from the invoice generator to the word counter — processes your input locally on your device. Nothing you type is uploaded to our servers unless you explicitly download or print the result.
        </Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          We keep the service free by displaying advertisements. This helps us cover hosting and continue improving the toolkit. Thank you for using it.
        </Typography>
      </Box>
    </Container>
  );
}
