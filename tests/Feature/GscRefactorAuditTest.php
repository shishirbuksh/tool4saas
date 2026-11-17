<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Http\Middleware\HandleLegacyRedirects;
use App\Services\SeoService;
use App\Services\ToolRegistryService;
use Illuminate\Http\Request;
use Tests\TestCase;

final class GscRefactorAuditTest extends TestCase
{
    public function test_homepage_brand_title_and_dynamic_tool_count(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);

        $content = (string) $response->getContent();
        $toolRegistry = app(ToolRegistryService::class);
        $totalTools = count($toolRegistry->all());

        // 1. Homepage title must start with brand entity and include dynamic count
        $expectedTitle = "Tool4SaaS — {$totalTools} Free Online Developer, PDF, Text &amp; Utility Tools";
        expect($content)->toContain("<title>{$expectedTitle}</title>");

        // 2. Hero and placeholder must match dynamic count
        expect($content)
            ->toContain("{$totalTools} Free Utilities · 100% Client-Side Privacy")
            ->toContain("Search {$totalTools} tools");

        // 3. Global footer must match dynamic count
        expect($content)->toContain("{$totalTools} Free Tools");
    }

    public function test_code_minifier_renders_table_and_markdown_links(): void
    {
        $response = $this->get('/code-minifier');
        $response->assertStatus(200);

        $content = (string) $response->getContent();

        // 1. Zero raw markdown links remaining
        expect($content)->not->toMatch('/\[[^\]]+\]\(\/[^)]+\)/');

        // 2. Internal references must render as crawlable <a> tags
        expect($content)
            ->toContain('<a href="/html-entities" class="font-semibold text-primary hover:underline">HTML Entity Encoder</a>')
            ->toContain('<a href="/json-formatter" class="font-semibold text-primary hover:underline">JSON Formatter</a>');

        // 3. Comparison table must be rendered right below the specification section
        expect($content)
            ->toContain('<table class="table table-zebra')
            ->toContain('Code Optimization Transformations and Savings Breakdown')
            ->toContain('JavaScript (ES6+ Bundle)');

        // 4. Exact self-referencing canonical
        expect($content)->toContain('<link rel="canonical" href="https://tool4saas.com/code-minifier">');
    }

    public function test_url_normalization_middleware_301_redirects(): void
    {
        $middleware = new HandleLegacyRedirects;

        // 1. Trailing slash normalization via request
        $req1 = Request::create('/code-minifier/', 'GET');
        $resp1 = $middleware->handle($req1, fn () => response('ok'));
        expect($resp1->getStatusCode())->toBe(301)
            ->and($resp1->headers->get('Location'))->toBe(url('/code-minifier'));

        // 2. Uppercase path normalization
        $req2 = Request::create('/Code-Minifier', 'GET');
        $resp2 = $middleware->handle($req2, fn () => response('ok'));
        expect($resp2->getStatusCode())->toBe(301)
            ->and($resp2->headers->get('Location'))->toBe(url('/code-minifier'));

        // 3. Combined uppercase & trailing slash
        $req3 = Request::create('/Category/Developer/', 'GET');
        $resp3 = $middleware->handle($req3, fn () => response('ok'));
        expect($resp3->getStatusCode())->toBe(301)
            ->and($resp3->headers->get('Location'))->toBe(url('/category/developer'));

        // 4. Tracking query parameter stripping
        $req4 = Request::create('/code-minifier?utm_source=twitter&utm_medium=social', 'GET');
        $resp4 = $middleware->handle($req4, fn () => response('ok'));
        expect($resp4->getStatusCode())->toBe(301)
            ->and($resp4->headers->get('Location'))->toBe(url('/code-minifier'));

        $req5 = Request::create('/code-minifier?fbclid=abcdef123456', 'GET');
        $resp5 = $middleware->handle($req5, fn () => response('ok'));
        expect($resp5->getStatusCode())->toBe(301)
            ->and($resp5->headers->get('Location'))->toBe(url('/code-minifier'));

        $req6 = Request::create('/about?ref=producthunt', 'GET');
        $resp6 = $middleware->handle($req6, fn () => response('ok'));
        expect($resp6->getStatusCode())->toBe(301)
            ->and($resp6->headers->get('Location'))->toBe(url('/about'));

        // 5. Preserving functional query parameters while stripping tracking params
        $req7 = Request::create('/sip-calculator?monthly=5000&utm_source=google', 'GET');
        $resp7 = $middleware->handle($req7, fn () => response('ok'));
        expect($resp7->getStatusCode())->toBe(301)
            ->and($resp7->headers->get('Location'))->toBe(url('/sip-calculator?monthly=5000'));

        // 6. Non-existent routes return true HTTP 404 (never soft-200)
        $r8 = $this->get('/non-existent-legacy-ghost-url-999');
        $r8->assertStatus(404);
    }

    public function test_json_ld_contains_zero_raw_markdown_or_html(): void
    {
        $toolRegistry = app(ToolRegistryService::class);
        $seoService = app(SeoService::class);

        $sampleSlugs = ['code-minifier', 'invoice-generator', 'qr-code-generator', 'word-counter', 'hash-generator'];

        foreach ($sampleSlugs as $slug) {
            $tool = $toolRegistry->getBySlugOrThrow($slug);
            $jsonLd = $seoService->buildToolJsonLd($tool, 'https://tool4saas.com');
            $encoded = json_encode($jsonLd, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

            expect($encoded)
                ->not->toBeFalse()
                ->not->toMatch('/\[[^\]]+\]\([^)]+\)/')
                ->not->toMatch('/<[a-z][\s\S]*>/i');
        }
    }

    public function test_category_and_tool_indexing_governance_toggle(): void
    {
        // 1. By default, core categories and tools are indexable
        $toolRegistry = app(ToolRegistryService::class);
        $devCat = $toolRegistry->findCategory('developer');
        expect($devCat)->not->toBeNull();
        expect($devCat->isIndexable())->toBeTrue();

        $minifier = $toolRegistry->getBySlugOrThrow('code-minifier');
        expect($minifier->isIndexable())->toBeTrue();

        // 2. When categories are marked noindex, their hub and tools emit noindex and are excluded from sitemap
        config(['indexing.noindex_categories' => ['health', 'finance']]);

        $healthCat = $toolRegistry->findCategory('health');
        expect($healthCat)->not->toBeNull();
        expect($healthCat->isIndexable())->toBeFalse();

        $calorie = $toolRegistry->getBySlugOrThrow('calorie-calculator');
        expect($calorie->isIndexable())->toBeFalse();

        $sip = $toolRegistry->getBySlugOrThrow('sip-calculator');
        expect($sip->isIndexable())->toBeFalse();

        // Check category hub view outputs noindex
        $catResponse = $this->get('/category/health');
        $catResponse->assertStatus(200);
        expect((string) $catResponse->getContent())->toContain('<meta name="robots" content="noindex, follow">');

        // Check tool view outputs noindex
        $toolResponse = $this->get('/calorie-calculator');
        $toolResponse->assertStatus(200);
        expect((string) $toolResponse->getContent())->toContain('<meta name="robots" content="noindex, follow">');

        // Check sitemap excludes health and finance when toggled
        $sitemapResponse = $this->get('/sitemap.xml');
        $sitemapResponse->assertStatus(200);
        $sitemapXml = (string) $sitemapResponse->getContent();

        expect($sitemapXml)
            ->not->toContain('<loc>https://tool4saas.com/category/health</loc>')
            ->not->toContain('<loc>https://tool4saas.com/category/finance</loc>')
            ->not->toContain('<loc>https://tool4saas.com/calorie-calculator</loc>')
            ->not->toContain('<loc>https://tool4saas.com/sip-calculator</loc>')
            ->toContain('<loc>https://tool4saas.com/code-minifier</loc>');

        // Reset config
        config(['indexing.noindex_categories' => []]);
    }
}
