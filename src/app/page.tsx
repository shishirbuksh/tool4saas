import Box from "@mui/material/Box";
import { HomeToolsItemList, HomeFaqJsonLd, HomeBlogItemList, HomeWebPageJsonLd } from "@/components/SiteJsonLd";
import HomeHero from "@/components/home/HomeHero";
import HomeNav from "@/components/home/HomeNav";
import HomePopular from "@/components/home/HomePopular";
import HomeTools from "@/components/home/HomeTools";
import HomeGuides from "@/components/home/HomeGuides";
import { HomeWhatIs, HomeClosing } from "@/components/home/HomeEditorial";
import { tools, toolsByCategoryCached } from "@/lib/tools";
import { homeMetadata } from "@/lib/metadata";
import { FAQS } from "@/content/home";

export const metadata = homeMetadata();
export { FAQS };

export default function HomePage() {
  const hubGroups = toolsByCategoryCached();
  const hubA = hubGroups[0]?.category;
  const hubB = hubGroups[1]?.category;
  const firstSlug = tools[0].slug;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'clip' }}>
      <HomeWebPageJsonLd />
      <HomeToolsItemList />
      <HomeFaqJsonLd faqs={FAQS} />
      <HomeBlogItemList />
      <HomeHero firstSlug={firstSlug} />
      <HomeNav />
      <HomePopular hubGroups={hubGroups} />
      <HomeTools hubA={hubA} hubB={hubB} />
      <HomeWhatIs />
      <HomeGuides />
      <HomeClosing firstSlug={firstSlug} />
    </Box>
  );
}
