import { Container, Box, Typography, Button } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import ToolSearchIsland from "@/components/ToolSearchIsland";

const POPULAR_TOOLS = [
  { slug: "invoice-generator", title: "Invoice Generator" },
  { slug: "word-counter", title: "Word Counter" },
  { slug: "qr-code-generator", title: "QR Code Generator" },
  { slug: "mortgage-calculator", title: "Mortgage Calculator" },
];
const POPULAR_CATEGORIES = [
  { id: "text-documents", label: "Text & Documents" },
  { id: "developer", label: "Developer Tools" },
  { id: "calculators", label: "Calculators" },
  { id: "finance", label: "Finance & Money" },
];

export default function NotFoundView() {
  return (
    <Container maxWidth="sm" className="py-24 text-center">
      <Typography variant="h1" className="text-[4rem] font-extrabold text-primary" aria-label="404 Page not found">404</Typography>
      <Typography variant="h2" className="text-[1.5rem] mb-4">Page not found</Typography>
      <Typography color="text.secondary" className="mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </Typography>
      <Box>
        <Button component={Link} href="/" variant="contained" size="large">
          Back to home
        </Button>
      </Box>
      <Box className="mt-8 max-w-[400px] mx-auto">
        <ToolSearchIsland className="w-full" />
      </Box>
      <Box className="mt-6 flex flex-wrap gap-2 justify-center">
        {POPULAR_TOOLS.map((t) => (
          <Button
            key={t.slug}
            component={Link}
            href={`/${t.slug}`}
            variant="outlined"
            size="medium"
            className="min-h-[44px]"
          >
            {t.title}
          </Button>
        ))}
      </Box>
      <Box className="mt-4 flex flex-wrap gap-2 justify-center">
        {POPULAR_CATEGORIES.map((c) => (
          <Button
            key={c.id}
            component={Link}
            href={`/category/${c.id}`}
            variant="text"
            size="small"
            className="min-h-[44px]"
          >
            {c.label}
          </Button>
        ))}
      </Box>
    </Container>
  );
}
