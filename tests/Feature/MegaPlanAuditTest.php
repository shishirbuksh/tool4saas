<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\BlogService;
use App\Services\SeoService;
use App\Services\ToolRegistryService;
use Tests\TestCase;

final class MegaPlanAuditTest extends TestCase
{
    public function test_all_138_tools_meet_mega_plan_seo_standards(): void
    {
        $toolRegistry = app(ToolRegistryService::class);
        $seoService = app(SeoService::class);
        $blogService = app(BlogService::class);

        $tools = $toolRegistry->all();
        expect($tools)->toHaveCount(138);

        $seenKeywords = [];

        foreach ($tools as $t) {
            // 1. Explicit seoTitle must exist
            expect($t->seoTitle)
                ->not->toBeNull()
                ->not->toBeEmpty();

            // 2. Meta Title must be 50-60 chars and have no double brand suffix
            $metaTitle = $seoService->toolMetaTitle($t);
            $titleLen = mb_strlen($metaTitle);
            expect($titleLen)
                ->toBeGreaterThanOrEqual(50)
                ->toBeLessThanOrEqual(60);
            expect(substr_count($metaTitle, 'Tool4SaaS'))->toBe(1);

            // 3. Meta Description must be 120-165 chars
            $metaDesc = $seoService->fitMetaDescription($t->description);
            $descLen = mb_strlen($metaDesc);
            expect($descLen)
                ->toBeGreaterThanOrEqual(120)
                ->toBeLessThanOrEqual(165);

            // 4. Keywords must be at least 5 and have zero duplicates across catalog
            expect(count($t->keywords))->toBeGreaterThanOrEqual(5);
            foreach ($t->keywords as $kw) {
                $clean = strtolower(trim($kw));
                expect($seenKeywords)->not->toHaveKey($clean, "Duplicate keyword '{$clean}' found in tool '{$t->slug}'");
                $seenKeywords[$clean] = $t->slug;
            }

            // 5. Must have FAQ, HowTo, and In-Depth Guide arrays
            expect($t->faq)->not->toBeEmpty();
            expect($t->howTo)->not->toBeEmpty();
            expect($t->guide)->not->toBeEmpty();

            // 6. Must have dedicated view
            expect(view()->exists("tools.{$t->slug}"))->toBeTrue();

            // 7. Must have a valid guide callout reverse-silo
            $callout = $blogService->getGuideRecommendationForTool($t->slug, $t->category);
            expect($callout)
                ->not->toBeNull()
                ->toHaveKey('url')
                ->toHaveKey('pillarSlug');
        }
    }

    public function test_all_17_pillars_and_clusters_meet_mega_plan_standards(): void
    {
        $blogService = app(BlogService::class);
        $pillars = $blogService->getAllPillars();
        expect($pillars)->toHaveCount(17);

        foreach ($pillars as $p) {
            $pillarPost = $blogService->getPillarPost($p->pillar);
            expect($pillarPost)->not->toBeNull();

            $clusters = $blogService->getClustersForPillar($p->pillar);
            expect($clusters)->not->toBeEmpty();
        }
    }

    public function test_sitemap_and_indexnow_have_exact_322_urls(): void
    {
        $response = $this->get('/sitemap.xml');
        $response->assertStatus(200);

        $xml = (string) $response->getContent();
        expect(substr_count($xml, '<url>'))->toBe(322);
        expect($xml)->not->toContain('hreflang');
    }
}
