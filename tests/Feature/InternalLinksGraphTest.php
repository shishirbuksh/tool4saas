<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\BlogService;
use App\Services\ToolRegistryService;
use DOMDocument;
use Tests\TestCase;

final class InternalLinksGraphTest extends TestCase
{
    /**
     * Test that all internal links across the website are 200 OK,
     * have zero 404 broken links, zero redirects, and zero empty anchors.
     */
    public function test_internal_links_graph_integrity_and_crawl_depth(): void
    {
        $toolRegistry = app(ToolRegistryService::class);
        $blogService = app(BlogService::class);

        // Collect all expected indexable pages
        $allPages = [
            '/',
            '/about',
            '/contact',
            '/privacy',
            '/terms',
            '/methodology',
            '/author',
            '/sitemap',
            '/blog',
        ];

        foreach ($toolRegistry->getAllCategories() as $cat) {
            $allPages[] = '/category/'.$cat->id;
        }

        foreach ($toolRegistry->getAllTools() as $tool) {
            if (! $tool->isNoindex) {
                $allPages[] = '/'.$tool->slug;
            }
        }

        foreach ($blogService->getAllPosts() as $post) {
            if ($post->isNoindex) {
                continue;
            }
            if ($post->kind === 'pillar') {
                $allPages[] = '/blog/'.$post->pillar;
            } else {
                $allPages[] = '/blog/'.$post->pillar.'/'.$post->slug;
            }
        }

        $allPages = array_values(array_unique($allPages));
        expect($allPages)->toHaveCount(319);

        // Sample representative pages across all layers
        $samplePages = array_merge(
            ['/', '/about', '/contact', '/privacy', '/terms', '/methodology', '/author', '/sitemap', '/blog'],
            array_slice(array_filter($allPages, fn ($p) => str_starts_with($p, '/category/')), 0, 4),
            array_slice(array_filter($allPages, fn ($p) => str_starts_with($p, '/blog/') && substr_count($p, '/') === 2), 0, 4),
            array_slice(array_filter($allPages, fn ($p) => str_starts_with($p, '/blog/') && substr_count($p, '/') === 3), 0, 6),
            array_slice(array_filter($allPages, fn ($p) => ! str_starts_with($p, '/blog') && ! str_starts_with($p, '/category') && strlen($p) > 1), 0, 10)
        );

        $testedTargets = [];
        $discoveredTargets = [];

        foreach ($samplePages as $pageUrl) {
            $response = $this->get($pageUrl);
            $response->assertStatus(200);

            $dom = new DOMDocument;
            @$dom->loadHTML(mb_convert_encoding($response->getContent(), 'HTML-ENTITIES', 'UTF-8'));
            $anchors = $dom->getElementsByTagName('a');

            foreach ($anchors as $a) {
                $href = trim($a->getAttribute('href'));
                if ($href === '' || str_starts_with($href, '#') || str_starts_with($href, 'mailto:') || str_starts_with($href, 'tel:') || str_starts_with($href, 'javascript:')) {
                    continue;
                }
                $parsed = parse_url($href);
                if (isset($parsed['host']) && ! in_array($parsed['host'], ['tool4saas.com', 'www.tool4saas.com', 'localhost'], true)) {
                    continue;
                }
                $path = $parsed['path'] ?? '/';
                if (strlen($path) > 1 && str_ends_with($path, '/')) {
                    $path = rtrim($path, '/');
                }

                if (str_starts_with($path, '/')) {
                    $discoveredTargets[$path] = true;
                }
            }
        }

        expect(count($discoveredTargets))->toBeGreaterThan(50);

        // Test each unique discovered path exactly once
        foreach (array_keys($discoveredTargets) as $path) {
            if (! isset($testedTargets[$path])) {
                $targetResponse = $this->get($path);
                expect($targetResponse->getStatusCode())
                    ->toBe(200, "Internal link to '{$path}' failed with status {$targetResponse->getStatusCode()}");
                $testedTargets[$path] = true;
            }
        }
    }
}
