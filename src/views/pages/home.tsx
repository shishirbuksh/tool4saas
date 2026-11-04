import { Box } from "@/components/ds";

import HomeHero from "@/components/home/HomeHero";
import HomeCategories from "@/components/home/HomeCategories";
import HomeDirectory from "@/components/home/HomeDirectory";
import HomeGuides from "@/components/home/HomeGuides";
import HomeFaq from "@/components/home/HomeFaq";
import HomeClosing from "@/components/home/HomeClosing";

export default function HomeView() {
  return (
    <Box className="flex flex-col min-h-[100vh] overflow-x-clip">
      <HomeHero />
      <HomeCategories />
      <HomeDirectory />
      <HomeGuides />
      <HomeFaq />
      <HomeClosing />
    </Box>
  );
}
