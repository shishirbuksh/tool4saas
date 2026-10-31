
import dynamic from "@/lib/astro/dynamic";import { Box, Typography } from "@/components/ds";


const ToolSearchIsland = dynamic(() => import("@/components/ToolSearch"), {
  ssr: false,
  loading: () => (
    <Box className="py-3 px-4 border border-base-300 rounded-[8px]">
      <Typography color="text.secondary" variant="body2">
        Search tools...
      </Typography>
    </Box>
  ),
}) as any;

export default ToolSearchIsland;
