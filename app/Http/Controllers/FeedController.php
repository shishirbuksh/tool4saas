<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\BlogService;
use App\Services\ToolRegistryService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

final class FeedController extends Controller
{
    public function __construct(
        private readonly ToolRegistryService $toolRegistry,
        private readonly BlogService $blogService,
    ) {}

    public function sitemap(Request $request): Response
    {
        $base = rtrim($request->getSchemeAndHttpHost(), '/');
        /** @var array<string, mixed> $dates */
        $dates = config('dates');
        $homeModified = (string) ($dates['home_modified'] ?? '2026-11-10');
        $blogModified = (string) ($dates['blog_modified'] ?? '2026-11-04');
        $sitePublished = (string) ($dates['site_published'] ?? '2026-09-14');

        /** @var array<string, string> $categoryModified */
        $categoryModified = (array) ($dates['category_modified'] ?? []);
        /** @var array<string, array{modified?: string, published?: string}> $pageDates */
        $pageDates = (array) ($dates['page_dates'] ?? []);
        /** @var array<string, array{modified?: string, published?: string}> $toolDates */
        $toolDates = (array) ($dates['tool_dates'] ?? []);

        $items = [];

        // 1. Home
        $items[] = [
            'url' => $base,
            'lastModified' => $homeModified,
            'image' => "{$base}/og/home.png",
        ];

        // 2. Static Pages
        $staticPages = ['about', 'privacy', 'terms', 'contact', 'author', 'methodology', 'sitemap'];
        foreach ($staticPages as $page) {
            $modified = $pageDates[$page]['modified'] ?? $sitePublished;
            $items[] = [
                'url' => "{$base}/{$page}",
                'lastModified' => $modified,
                'image' => "{$base}/og/static-{$page}.png",
            ];
        }

        // 3. Category Hubs
        foreach ($this->toolRegistry->getAllCategories() as $cat) {
            $modified = $categoryModified[$cat->id] ?? $sitePublished;
            $items[] = [
                'url' => "{$base}/category/{$cat->id}",
                'lastModified' => $modified,
                'image' => "{$base}/og/category-{$cat->id}.png",
            ];
        }

        // 4. Tools (visible only)
        foreach ($this->toolRegistry->getAllTools() as $tool) {
            if ($tool->isNoindex) {
                continue;
            }
            $modified = $toolDates[$tool->slug]['modified'] ?? $sitePublished;
            $items[] = [
                'url' => "{$base}/{$tool->slug}",
                'lastModified' => $modified,
                'image' => "{$base}/og/{$tool->slug}.png",
            ];
        }

        // 5. Blog Index
        $items[] = [
            'url' => "{$base}/blog",
            'lastModified' => $blogModified,
            'image' => "{$base}/og/static-blog.png",
        ];

        // 6. Blog Pillars
        foreach ($this->blogService->getAllPillars() as $pillar) {
            $post = $this->blogService->getPillarPost($pillar->pillar);
            $items[] = [
                'url' => "{$base}/blog/{$pillar->pillar}",
                'lastModified' => $post !== null ? $post->updated : $pillar->updated,
                'image' => "{$base}/og/blog/{$pillar->pillar}.png",
            ];
        }

        // 7. Blog Clusters (indexable only)
        foreach ($this->blogService->getAllPosts() as $post) {
            if ($post->kind !== 'cluster' || $post->isNoindex) {
                continue;
            }
            $items[] = [
                'url' => "{$base}/blog/{$post->pillar}/{$post->slug}",
                'lastModified' => $post->updated,
                'image' => "{$base}/og/blog/{$post->pillar}/{$post->slug}.png",
            ];
        }

        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $xml .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n";
        $xml .= "        xmlns:xhtml=\"http://www.w3.org/1999/xhtml\"\n";
        $xml .= "        xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">\n";

        foreach ($items as $item) {
            $loc = htmlspecialchars($item['url'], ENT_XML1, 'UTF-8');
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$loc}</loc>\n";
            if (! empty($item['lastModified'])) {
                $lastmod = htmlspecialchars($item['lastModified'], ENT_XML1, 'UTF-8');
                $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            }
            $imgLoc = htmlspecialchars($item['image'], ENT_XML1, 'UTF-8');
            $xml .= "    <image:image>\n      <image:loc>{$imgLoc}</image:loc>\n    </image:image>\n";
            $xml .= "  </url>\n";
        }
        $xml .= "</urlset>\n";

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8',
            'Cache-Control' => 'public, max-age=86400, s-maxage=86400',
        ]);
    }

    public function robots(Request $request): Response
    {
        $base = rtrim($request->getSchemeAndHttpHost(), '/');
        $aiBots = [
            'Googlebot',
            'Googlebot-Image',
            'Mediapartners-Google',
            'GPTBot',
            'ChatGPT-User',
            'OAI-SearchBot',
            'PerplexityBot',
            'ClaudeBot',
            'Claude-SearchBot',
            'Claude-User',
            'Cohere-AI',
            'Google-Extended',
            'Applebot-Extended',
            'Bingbot',
            'msnbot',
            'CCBot',
            'Amazonbot',
            'Bytespider',
        ];

        $body = "User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /probe\nDisallow: /*?target=*\n\n";
        foreach ($aiBots as $bot) {
            $body .= "User-agent: {$bot}\nAllow: /\nDisallow: /api/\nDisallow: /probe\nDisallow: /*?target=*\n\n";
        }
        $body .= "Sitemap: {$base}/sitemap.xml\n";

        return response($body, 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
        ]);
    }

    public function rss(Request $request): Response
    {
        $base = rtrim($request->getSchemeAndHttpHost(), '/');
        $allPosts = array_values(array_filter(
            $this->blogService->getAllPosts(),
            fn ($post): bool => ! $post->isNoindex
        ));

        usort($allPosts, function ($a, $b) {
            if ($a->published !== $b->published) {
                return $a->published < $b->published ? 1 : -1;
            }

            return $a->updated < $b->updated ? 1 : -1;
        });

        $items = array_slice($allPosts, 0, 50);
        $latestBuild = $items[0]->updated ?? date('Y-m-d');
        $buildTimestamp = strtotime($latestBuild) ?: time();

        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $xml .= "<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n";
        $xml .= "  <channel>\n";
        $xml .= "    <title>Tool4SaaS Blog — Guides &amp; Tutorials</title>\n";
        $xml .= "    <link>{$base}/blog</link>\n";
        $xml .= "    <description>Step-by-step guides for every Tool4SaaS tool: invoices, PDFs, images, calculators, SEO and more. Tested workflows, no fluff.</description>\n";
        $xml .= "    <language>en</language>\n";
        $xml .= '    <lastBuildDate>'.date(DATE_RSS, $buildTimestamp)."</lastBuildDate>\n";
        $xml .= "    <atom:link href=\"{$base}/rss.xml\" rel=\"self\" type=\"application/rss+xml\" />\n";

        foreach ($items as $post) {
            $url = $post->kind === 'pillar'
                ? "{$base}/blog/{$post->pillar}"
                : "{$base}/blog/{$post->pillar}/{$post->slug}";

            $title = htmlspecialchars($post->title, ENT_XML1, 'UTF-8');
            $desc = htmlspecialchars($post->description, ENT_XML1, 'UTF-8');
            $pubTimestamp = strtotime($post->published) ?: time();
            $updTimestamp = strtotime($post->updated) ?: time();
            $pubDate = date(DATE_RSS, $pubTimestamp);
            $updated = date(DATE_ATOM, $updTimestamp);

            $xml .= "    <item>\n";
            $xml .= "      <title>{$title}</title>\n";
            $xml .= "      <link>{$url}</link>\n";
            $xml .= "      <guid isPermaLink=\"true\">{$url}</guid>\n";
            $xml .= "      <pubDate>{$pubDate}</pubDate>\n";
            $xml .= "      <atom:updated>{$updated}</atom:updated>\n";
            $xml .= "      <description>{$desc}</description>\n";
            $xml .= "      <category>{$post->pillar}</category>\n";
            $xml .= "    </item>\n";
        }

        $xml .= "  </channel>\n</rss>\n";

        return response($xml, 200, [
            'Content-Type' => 'application/rss+xml; charset=utf-8',
            'Cache-Control' => 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        ]);
    }

    public function manifest(): Response
    {
        $manifest = [
            'name' => 'Tool4SaaS',
            'short_name' => 'Tool4SaaS',
            'description' => '120+ free browser tools for developers, designers, and founders.',
            'start_url' => '/',
            'display' => 'browser',
            'background_color' => '#FCFCF9',
            'theme_color' => '#FCFCF9',
            'icons' => [
                ['src' => '/icon-192.png', 'sizes' => '192x192', 'type' => 'image/png'],
                ['src' => '/icon-512.png', 'sizes' => '512x512', 'type' => 'image/png'],
                ['src' => '/icon-maskable-512.png', 'sizes' => '512x512', 'type' => 'image/png', 'purpose' => 'maskable'],
            ],
        ];

        return response(json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) ?: '{}', 200, [
            'Content-Type' => 'application/manifest+json; charset=utf-8',
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }

    public function llms(Request $request): Response
    {
        $base = rtrim($request->getSchemeAndHttpHost(), '/');
        $visibleTools = array_values(array_filter(
            $this->toolRegistry->getAllTools(),
            fn ($t): bool => ! $t->isNoindex
        ));
        $categories = $this->toolRegistry->getAllCategories();

        $content = '# Tool4SaaS ('.count($visibleTools).' free tools across '.count($categories)." categories + guides)\n";
        $content .= '> Updated: '.date('Y-m-d')."\n\n";
        $content .= "> Free, privacy-friendly online productivity and developer tools. Most run entirely in your browser with no account and no upload. Full FAQ + step hints: {$base}/llms-full.txt\n\n";

        $content .= "## Overview\n";
        $content .= "- [Tool4SaaS]({$base}/): Home page with all ".count($visibleTools)." free tools.\n";
        $content .= "- [About]({$base}/about): What the site is and how it protects your privacy.\n";
        $content .= "- [Privacy Policy]({$base}/privacy): How user data is handled.\n";
        $content .= "- [Terms]({$base}/terms): Terms of use for all tools and guides.\n";
        $content .= "- [Contact]({$base}/contact): Contact the Tool4SaaS team.\n";
        $content .= "- [Author]({$base}/author): About the author behind Tool4SaaS.\n";
        $content .= "- [Methodology]({$base}/methodology): How we build and test tools.\n\n";

        foreach ($categories as $cat) {
            $content .= "- [{$cat->label}]({$base}/category/{$cat->id}): {$cat->description}\n";
        }
        $content .= "\n";

        foreach ($categories as $cat) {
            $catTools = $this->toolRegistry->getByCategory($cat->id);
            if (empty($catTools)) {
                continue;
            }
            $content .= "## {$cat->label}\n";
            foreach ($catTools as $tool) {
                if ($tool->isNoindex) {
                    continue;
                }
                $content .= "- [{$tool->title}]({$base}/{$tool->slug}): {$tool->short}\n";
            }
            $content .= "\n";
        }

        $content .= "## Guides & Blog\n";
        $content .= "- [All Guides]({$base}/blog): View all long-form tool guides and tutorials.\n";
        foreach ($this->blogService->getAllPillars() as $pillar) {
            $content .= "- [{$pillar->title}]({$base}/blog/{$pillar->pillar}): Pillar guide.\n";
        }

        return response($content, 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
        ]);
    }
}
