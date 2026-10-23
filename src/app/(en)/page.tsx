import Box from "@mui/material/Box";
import {
  HomeToolsItemList,
  HomeFaqJsonLd,
  HomeBlogItemList,
  HomeWebPageJsonLd,
} from "@/components/SiteJsonLd";
import HomeHero from "@/components/home/HomeHero";
import HomeCategories from "@/components/home/HomeCategories";
import HomeDirectory from "@/components/home/HomeDirectory";
import HomeGuides from "@/components/home/HomeGuides";
import HomeFaq from "@/components/home/HomeFaq";
import HomeClosing from "@/components/home/HomeClosing";
import { homeMetadata } from "@/lib/metadata";
import { FAQS } from "@/content/home";

export const metadata = homeMetadata();
export { FAQS };

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: "clip" }}>
      <HomeWebPageJsonLd />
      <HomeToolsItemList />
      <HomeFaqJsonLd faqs={FAQS} />
      <HomeBlogItemList />
      <HomeHero />
      <HomeCategories />
      <HomeDirectory />
      <HomeGuides />
      <HomeFaq />
      <HomeClosing />
    </Box>
  );
}
