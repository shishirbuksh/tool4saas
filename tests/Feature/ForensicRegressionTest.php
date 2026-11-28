<?php

declare(strict_types=1);

use App\Http\Middleware\HandleLegacyRedirects;
use App\Services\SeoService;
use Illuminate\Http\Request;

test('handle legacy redirects preserves utm builder presets while stripping tracking params elsewhere', function (): void {
    $middleware = new HandleLegacyRedirects;

    $utmBuilderReq = Request::create('/utm-builder?source=newsletter&medium=email&campaign=spring_launch', 'GET');
    $utmBuilderResp = $middleware->handle($utmBuilderReq, fn () => response('ok'));
    expect($utmBuilderResp->getStatusCode())->toBe(200);

    $utmTrackingReq = Request::create('/utm-builder?utm_source=facebook&source=newsletter', 'GET');
    $utmTrackingResp = $middleware->handle($utmTrackingReq, fn () => response('ok'));
    expect($utmTrackingResp->getStatusCode())->toBe(301)
        ->and($utmTrackingResp->headers->get('Location'))->toBe(url('/utm-builder?source=newsletter'));

    $otherToolReq = Request::create('/percentage-calculator?source=google&campaign=ads', 'GET');
    $otherToolResp = $middleware->handle($otherToolReq, fn () => response('ok'));
    expect($otherToolResp->getStatusCode())->toBe(301)
        ->and($otherToolResp->headers->get('Location'))->toBe(url('/percentage-calculator'));

    $base64Req = Request::create('/base64-tool?urlSafe=1&nopadding=1&noPadding=1', 'GET');
    expect($middleware->handle($base64Req, fn () => response('ok'))->getStatusCode())->toBe(200);

    $cronReq = Request::create('/cron-parser?expression=0+0+*+*+*', 'GET');
    expect($middleware->handle($cronReq, fn () => response('ok'))->getStatusCode())->toBe(200);
});

test('renderInlineMarkdown escapes raw HTML tags, blocks unsafe schemes, and emits AAA link contrast', function (): void {
    $html = SeoService::renderInlineMarkdown(
        'Test `<h1>Code</h1>` and <b>raw</b> with [Safe](/slug), [Bad](javascript:alert(1)), and **bold**.'
    );

    expect($html)
        ->toContain('<code class="px-1.5 py-0.5 rounded-md bg-base-200 text-xs font-mono">&lt;h1&gt;Code&lt;/h1&gt;</code>')
        ->toContain('&lt;b&gt;raw&lt;/b&gt;')
        ->toContain('<a href="/slug" class="font-semibold text-[#163300] dark:text-[#9fe870] hover:underline">Safe</a>')
        ->toContain('<strong>bold</strong>')
        ->not->toContain('javascript:')
        ->not->toContain('<b>raw</b>');
});

test('all 139 tool views enforce labeled inputs, guarded clipboard helpers, and light-mode contrast', function (): void {
    $toolFiles = glob(resource_path('views/tools/*.blade.php')) ?: [];
    expect(count($toolFiles))->toBeGreaterThanOrEqual(139);

    $darkBgRegex = '/bg-(?:\[#0e0f0c\]|\[#161a14\]|\[#163300\]|\[#242a20\]|neutral|black|slate-9\d\d|zinc-9\d\d|gray-9\d\d)/i';
    $voidTags = array_flip(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'path', 'circle', 'rect', 'line', 'polygon', 'polyline']);

    $unlabeled = [];
    $rawClipboard = [];
    $lowContrast = [];

    foreach ($toolFiles as $file) {
        $bn = basename($file);
        $content = (string) file_get_contents($file);

        if (str_contains($content, 'navigator.clipboard.writeText(')) {
            $rawClipboard[] = $bn;
        }

        // 1. Form label check
        preg_match_all('/<label\b[^>]*\bfor\s*=\s*["\']([^"\']+)["\']/i', $content, $labelForMatches);
        $forIds = array_flip($labelForMatches[1] ?? []);

        preg_match_all('/<(input|select|textarea)\b((?:[^>"\']|"[^"]*"|\'[^\']*\')*)(\/?)>/is', $content, $matches, PREG_OFFSET_CAPTURE);
        foreach ($matches[0] as $idx => [$fullTag, $offset]) {
            $attrs = $matches[2][$idx][0];
            if (preg_match('/\btype\s*=\s*["\']hidden["\']/i', $attrs)) {
                continue;
            }
            if (preg_match('/\b(?:aria-label|aria-labelledby|:aria-label)\s*=/i', $attrs)) {
                continue;
            }
            $before = substr($content, max(0, $offset - 300), min(300, $offset));
            $lastOpen = strripos($before, '<label');
            $lastClose = strripos($before, '</label>');
            if ($lastOpen !== false && ($lastClose === false || $lastClose < $lastOpen)) {
                continue;
            }
            if (preg_match('/\bid\s*=\s*["\']([^"\']+)["\']/i', $attrs, $idm) && isset($forIds[$idm[1]])) {
                continue;
            }
            $lineNum = substr_count(substr($content, 0, $offset), "\n") + 1;
            $unlabeled[] = "{$bn}:{$lineNum}";
        }

        // 2. Contrast check (bare text-primary on light surface)
        $stack = [];
        $pos = 0;
        while (preg_match('/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b((?:[^>"\']|"[^"]*"|\'[^\']*\')*)(\/?)>/s', $content, $m, PREG_OFFSET_CAPTURE, $pos)) {
            $fullTag = $m[0][0];
            $tagOffset = $m[0][1];
            $isClosing = $m[1][0] === '/';
            $tagName = strtolower($m[2][0]);
            $attrs = $m[3][0];
            $selfClosing = $m[4][0] === '/' || isset($voidTags[$tagName]);
            $pos = $tagOffset + strlen($fullTag);

            if ($isClosing) {
                for ($k = count($stack) - 1; $k >= 0; $k--) {
                    if ($stack[$k]['tag'] === $tagName) {
                        array_splice($stack, $k);
                        break;
                    }
                }

                continue;
            }

            $ancestorDark = false;
            foreach ($stack as $s) {
                if ($s['isDark']) {
                    $ancestorDark = true;
                    break;
                }
            }

            $classStrings = '';
            if (preg_match_all('/(?<![a-zA-Z0-9-])(?::?class)\s*=\s*(["\'])(.*?)\1/s', $attrs, $cm)) {
                $classStrings = implode(' ', $cm[2]);
            }

            $selfDark = $classStrings !== '' && (bool) preg_match($darkBgRegex, $classStrings);
            if (! $ancestorDark && ! $selfDark && preg_match('/(?<![a-zA-Z0-9:-])text-primary(?![a-zA-Z0-9_-])/', $attrs) && ! preg_match('/dark:text-/', $attrs)) {
                $lineNum = substr_count(substr($content, 0, $tagOffset), "\n") + 1;
                $lowContrast[] = "{$bn}:{$lineNum}";
            }

            if (! $selfClosing) {
                $stack[] = ['tag' => $tagName, 'isDark' => $selfDark];
            }
        }
    }

    expect($unlabeled)->toBe([])
        ->and($rawClipboard)->toBe([])
        ->and($lowContrast)->toBe([]);
});

test('sitemap root canonical matches homepage and text feeds include cache headers and hubs', function (): void {
    $sitemapResp = $this->get('/sitemap.xml');
    $sitemapResp->assertStatus(200);
    expect((string) $sitemapResp->getContent())->toContain('<loc>https://tool4saas.com/</loc>');

    $robotsResp = $this->get('/robots.txt');
    $robotsResp->assertStatus(200);
    expect((string) $robotsResp->headers->get('Cache-Control'))->toContain('public');

    $llmsResp = $this->get('/llms.txt');
    $llmsResp->assertStatus(200);
    expect((string) $llmsResp->headers->get('Cache-Control'))->toContain('public')
        ->and((string) $llmsResp->getContent())->toContain('/student-tools')
        ->toContain('/developer-tools');

    $llmsFullResp = $this->get('/llms-full.txt');
    $llmsFullResp->assertStatus(200);
    expect((string) $llmsFullResp->headers->get('Cache-Control'))->toContain('public');
});

test('csp allows data URIs in connect-src, robots omits ?target=* block, and feed query params strip', function (): void {
    $imgToPdf = $this->get('/image-to-pdf');
    $imgToPdf->assertStatus(200);
    $csp = (string) $imgToPdf->headers->get('Content-Security-Policy');
    expect($csp)->toContain('connect-src')
        ->toContain('data:');

    $robotsTxt = (string) $this->get('/robots.txt')->getContent();
    expect($robotsTxt)->not->toContain('Disallow: /*?target=*');

    $middleware = new HandleLegacyRedirects;
    $feedResp = $middleware->handle(Request::create('/sitemap.xml?rate=1', 'GET'), fn () => response('ok'));
    expect($feedResp->getStatusCode())->toBe(301)
        ->and($feedResp->headers->get('Location'))->toBe(url('/sitemap.xml'));
});

test('runtime tool fixes and editorial category titles remain clean', function (): void {
    $pwdContent = (string) file_get_contents(resource_path('views/tools/password-generator.blade.php'));
    expect(substr_count($pwdContent, 'init()'))->toBe(1);

    $jwtRaw = (string) file_get_contents(resource_path('views/tools/jwt-decoder.blade.php'));
    expect(substr_count($jwtRaw, '<div'))->toBe(substr_count($jwtRaw, '</div>'))
        ->and($jwtRaw)->not->toMatch('/<\/template>\s*><\/textarea>/');

    $jwtResp = (string) $this->get('/jwt-decoder')->getContent();
    expect($jwtResp)->not->toMatch('/<\/template>\s*><\/textarea>/');

    $pdfCompress = (string) file_get_contents(resource_path('views/tools/pdf-compress.blade.php'));
    expect(substr_count($pdfCompress, '<div'))->toBe(substr_count($pdfCompress, '</div>'));

    $colorExtractor = (string) file_get_contents(resource_path('views/tools/image-color-extractor.blade.php'));
    expect($colorExtractor)->toContain('Math.min(255,');

    $seoAnalyzer = (string) file_get_contents(resource_path('views/tools/seo-analyzer.blade.php'));
    expect($seoAnalyzer)->not->toContain('127 Free Online');

    $blogCluster = (string) $this->get('/blog/mortgage-calculator-guide/15-vs-30-year-mortgage')->getContent();
    expect($blogCluster)->not->toContain('- Free Tool')
        ->not->toContain('&amp; When | Tool4SaaS');

    $catPdf = (string) $this->get('/category/pdf')->getContent();
    expect($catPdf)->not->toContain('- Free Tool');

    $catCalc = (string) $this->get('/category/calculators')->getContent();
    expect($catCalc)->not->toContain('Calculators Tools');
});
