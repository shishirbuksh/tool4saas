import Box from "@mui/material/Box";
import { HomeToolsItemList, HomeFaqJsonLd, HomeBlogItemList, HomeWebPageJsonLd } from "@/components/SiteJsonLd";
import HomeHero from "@/components/home/HomeHero";
import HomePopular from "@/components/home/HomePopular";
import HomeCategories from "@/components/home/HomeCategories";
import HomeTools from "@/components/home/HomeTools";
import HomeTrust from "@/components/home/HomeTrust";
import HomeGuides from "@/components/home/HomeGuides";
import HomeFaq from "@/components/home/HomeFaq";
import HomeClosing from "@/components/home/HomeClosing";
import { homeMetadata } from "@/lib/metadata";
import { liteToolsByCategory } from "@/lib/tools/catalog-lite";
import { FAQS } from "@/content/home";

export const metadata = homeMetadata();
export { FAQS };

export default function HomePage() {
  const groups = liteToolsByCategory();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'clip' }}>
      <HomeWebPageJsonLd />
      <HomeToolsItemList />
      <HomeFaqJsonLd faqs={FAQS} />
      <HomeBlogItemList />
      <HomeHero />
      <HomePopular />
      <HomeCategories />
      <HomeTools groups={groups} />
      <HomeTrust />
      <HomeGuides />
      <HomeFaq />
      <HomeClosing />
    </Box>
  );
}
