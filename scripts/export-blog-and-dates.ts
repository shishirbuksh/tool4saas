import fs from "fs";
import path from "path";
import { ALL_POSTS, BLOG_PILLARS } from "../src/lib/blog-registry";
import { isNoindexCluster } from "../src/lib/blog/noindex";
import {
  TOOL_DATES,
  PAGE_DATES,
  BLOG_POST_DATES,
  HOME_MODIFIED,
  BLOG_MODIFIED,
  CATEGORY_MODIFIED,
  SITE_PUBLISHED,
  SITE_PUBLISHED_SOURCE,
} from "../src/lib/edit-dates.generated";

console.log("Exporting blog data and dates for Laravel...");

// Ensure storage/app/blog exists
const blogStorageDir = path.resolve("storage/app/blog");
if (!fs.existsSync(blogStorageDir)) {
  fs.mkdirSync(blogStorageDir, { recursive: true });
}

// 1. Export Pillars
const pillarsData = BLOG_PILLARS.map((p) => {
  return {
    pillar: p.pillar,
    title: p.title,
    shortLabel: p.shortLabel,
    description: p.description,
    toolSlug: p.toolSlug,
    keywords: p.keywords,
    updated: p.updated,
  };
});
fs.writeFileSync(path.join(blogStorageDir, "pillars.json"), JSON.stringify(pillarsData, null, 2), "utf8");
console.log(`Exported ${pillarsData.length} pillars to storage/app/blog/pillars.json`);

// 2. Export All Posts
const postsData = ALL_POSTS.map((post) => {
  const isNoindex = post.kind === "cluster" ? isNoindexCluster(post.pillar, post.slug) : false;
  const postDate = BLOG_POST_DATES[`${post.pillar}/${post.slug}`] || {
    published: post.published,
    modified: post.updated,
    source: "static",
  };

  return {
    pillar: post.pillar,
    slug: post.slug,
    kind: post.kind,
    title: post.title,
    description: post.description,
    keywords: post.keywords || [],
    toolSlugs: post.toolSlugs || [],
    relatedSlugs: post.relatedSlugs || [],
    published: postDate.published || post.published,
    updated: postDate.modified || post.updated,
    readingMinutes: post.readingMinutes,
    toc: post.toc || [],
    html: post.html,
    faqs: post.faqs || [],
    isNoindex,
  };
});
fs.writeFileSync(path.join(blogStorageDir, "posts.json"), JSON.stringify(postsData, null, 2), "utf8");
console.log(`Exported ${postsData.length} posts to storage/app/blog/posts.json`);

// 3. Export dates to JSON and small PHP config
const datesData = {
  home_modified: HOME_MODIFIED,
  blog_modified: BLOG_MODIFIED,
  site_published: SITE_PUBLISHED,
  site_published_source: SITE_PUBLISHED_SOURCE,
  category_modified: CATEGORY_MODIFIED,
  page_dates: PAGE_DATES,
  tool_dates: TOOL_DATES,
  blog_dates: BLOG_POST_DATES,
};
fs.writeFileSync(path.join(path.resolve("storage/app"), "dates.json"), JSON.stringify(datesData, null, 2), "utf8");

const datesPhpContent = `<?php

declare(strict_types=1);

/** @var array<string, mixed> $dates */
$dates = [];
$datesPath = storage_path('app/dates.json');
if (file_exists($datesPath)) {
    $decoded = json_decode((string) file_get_contents($datesPath), true);
    if (is_array($decoded)) {
        $dates = $decoded;
    }
}

return $dates;
`;
fs.writeFileSync(path.resolve("config/dates.php"), datesPhpContent, "utf8");
console.log("Exported dates config to config/dates.php and storage/app/dates.json");
