<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\BlogService;
use App\Services\ToolRegistryService;
use Tests\TestCase;

final class SeoAuditTest extends TestCase
{
    public function test_homepage_seo_and_jsonld(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);

        $content = (string) $response->getContent();

        // 1. Language & Locale
        expect($content)
            ->toContain('<html lang="en"')
            ->toContain('content="en_US"')
            ->not->toContain('hreflang="es"')
            ->not->toContain('hreflang="fr"');

        // 2. Open Graph & Twitter Card
        expect($content)
            ->toContain('property="og:title"')
            ->toContain('property="og:description"')
            ->toContain('property="og:url"')
            ->toContain('property="og:site_name" content="Tool4SaaS"')
            ->toContain('name="twitter:card" content="summary_large_image"');

        // 3. Schema.org WebSite & Organization
        expect($content)
            ->toContain('"@type":"WebSite"')
            ->toContain('"@type":"Organization"')
            ->toContain('"name":"Tool4SaaS"')
            ->toContain('"@type":"SearchAction"');
    }

    public function test_all_12_categories_seo_and_jsonld(): void
    {
        $registry = app(ToolRegistryService::class);
        $categories = $registry->getAllCategories();

        foreach ($categories as $cat) {
            $response = $this->get('/category/'.$cat->id);
            $response->assertStatus(200);

            $content = (string) $response->getContent();

            // Canonical & Locale
            $expectedCanonical = url('/category/'.$cat->id);
            expect($content)
                ->toContain('<link rel="canonical" href="'.$expectedCanonical.'">')
                ->toContain('content="en_US"')
                ->not->toContain('hreflang=');

            // JSON-LD CollectionPage & BreadcrumbList
            expect($content)
                ->toContain('"@type":"CollectionPage"')
                ->toContain('"@type":"BreadcrumbList"')
                ->toContain('"@type":"ItemList"');
        }
    }

    public function test_tools_seo_metadata_lengths_and_schemas(): void
    {
        $registry = app(ToolRegistryService::class);
        $tools = $registry->getAllTools();

        foreach ($tools as $tool) {
            $response = $this->get('/'.$tool->slug);
            $response->assertStatus(200);

            $content = (string) $response->getContent();

            // Canonical & Language
            $expectedCanonical = url('/'.$tool->slug);
            expect($content)
                ->toContain('<link rel="canonical" href="'.$expectedCanonical.'">')
                ->toContain('<html lang="en"')
                ->not->toContain('hreflang=');

            // Extract Title
            preg_match('/<title>(.*?)<\/title>/', $content, $titleMatches);
            $title = $titleMatches[1] ?? '';
            expect(mb_strlen($title))
                ->toBeGreaterThanOrEqual(30)
                ->toBeLessThanOrEqual(75);

            // Extract Description
            preg_match('/<meta name="description" content="(.*?)">/', $content, $descMatches);
            $desc = $descMatches[1] ?? '';
            expect(mb_strlen($desc))
                ->toBeGreaterThanOrEqual(50)
                ->toBeLessThanOrEqual(165);

            // Schema.org WebApplication & BreadcrumbList
            expect($content)
                ->toContain('"@type":"WebApplication"')
                ->toContain('"@type":"BreadcrumbList"');
        }
    }

    public function test_blog_pillars_and_clusters_seo_and_jsonld(): void
    {
        $blogService = app(BlogService::class);
        $pillars = $blogService->getAllPillars();

        foreach ($pillars as $pillar) {
            $response = $this->get('/blog/'.$pillar->pillar);
            $response->assertStatus(200);

            $content = (string) $response->getContent();

            // Canonical & Locale
            expect($content)
                ->toContain('<link rel="canonical" href="'.url('/blog/'.$pillar->pillar).'">')
                ->toContain('content="en_US"')
                ->not->toContain('hreflang=');

            // BlogPosting Schema
            expect($content)
                ->toContain('"@type":"BlogPosting"')
                ->toContain('"@type":"BreadcrumbList"')
                ->toContain('"inLanguage":"en"');
        }
    }

    public function test_sitemap_has_zero_multi_language_and_all_canonicals(): void
    {
        $response = $this->get('/sitemap.xml');
        $response->assertStatus(200);

        $xml = (string) $response->getContent();

        expect($xml)
            ->toContain('<?xml version="1.0" encoding="UTF-8"?>')
            ->toContain('<urlset')
            ->not->toContain('/es/')
            ->not->toContain('/fr/')
            ->not->toContain('/es<')
            ->not->toContain('/fr<')
            ->not->toContain('hreflang');
    }

    public function test_robots_txt_allows_search_and_ai_crawlers(): void
    {
        $response = $this->get('/robots.txt');
        $response->assertStatus(200);

        $content = (string) $response->getContent();

        expect($content)
            ->toContain('User-agent: *')
            ->toContain('User-agent: Googlebot')
            ->toContain('User-agent: GPTBot')
            ->toContain('User-agent: ClaudeBot')
            ->toContain('User-agent: PerplexityBot')
            ->toContain('Disallow: /api/')
            ->toContain('Disallow: /probe')
            ->toContain('Sitemap: '.url('/sitemap.xml'));
    }
}
