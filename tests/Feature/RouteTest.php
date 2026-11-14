<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Http\Middleware\HandleLegacyRedirects;
use Illuminate\Http\Request;
use Tests\TestCase;

final class RouteTest extends TestCase
{
    public function test_homepage_is_successful(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertSee('Free Online Tools');
    }

    public function test_category_page_is_successful(): void
    {
        $response = $this->get('/category/calculators');
        $response->assertStatus(200);
        $response->assertSee('Calculators');
    }

    public function test_core_tools_are_successful(): void
    {
        $slugs = [
            'percentage-calculator',
            'age-calculator',
            'discount-calculator',
            'tip-calculator',
            'word-counter',
            'json-formatter',
            'password-generator',
            'mortgage-calculator',
            'bmi-calculator',
            'ssl-checker',
            'base64-tool',
            'url-encoder',
            'hash-generator',
            'timestamp-converter',
            'lorem-ipsum',
            'slug-generator',
            'qr-code-generator',
        ];

        foreach ($slugs as $slug) {
            $response = $this->get('/'.$slug);
            $response->assertStatus(200);
        }
    }

    public function test_static_pages_are_successful(): void
    {
        $pages = ['/about', '/contact', '/privacy', '/terms', '/methodology', '/author', '/sitemap'];

        foreach ($pages as $page) {
            $response = $this->get($page);
            $response->assertStatus(200);
        }
    }

    public function test_legacy_301_redirects(): void
    {
        $response = $this->get('/es');
        $response->assertStatus(301);
        $response->assertRedirect('/');

        $response = $this->get('/fr');
        $response->assertStatus(301);
        $response->assertRedirect('/');

        $response = $this->get('/es/invoice-generator');
        $response->assertStatus(301);
        $response->assertRedirect('/invoice-generator');

        // Test unmapped multi-language path stripping fallback
        $response = $this->get('/fr/any-future-or-old-tool?ref=test');
        $response->assertStatus(301);
        $response->assertRedirect('/any-future-or-old-tool?ref=test');

        // Test trailing slash canonical 301 normalization
        $request = Request::create('/percentage-calculator/', 'GET');
        $middleware = new HandleLegacyRedirects;
        $response = $middleware->handle($request, fn () => response('ok'));
        expect($response->getStatusCode())->toBe(301)
            ->and($response->headers->get('Location'))->toBe(url('/percentage-calculator'));
    }

    public function test_security_headers_present(): void
    {
        $response = $this->get('/');
        $response->assertHeader('Content-Security-Policy');
        $response->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->assertHeader('Strict-Transport-Security');
        $response->assertHeader('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=()');
    }

    public function test_ssl_checker_api_validation_and_ssrf_protection(): void
    {
        // 1. Invalid domain format
        $response = $this->postJson('/api/ssl-check', ['domain' => 'not a valid domain!']);
        $response->assertStatus(422);

        // 2. Loopback SSRF attempt
        $response = $this->postJson('/api/ssl-check', ['domain' => 'localhost']);
        $response->assertStatus(422);
    }

    public function test_custom_404_page_renders_cleanly(): void
    {
        $response = $this->get('/non-existent-tool-slug-xyz');
        $response->assertStatus(404);
        $response->assertSee('Page Not Found');
        $response->assertSee('Return to Homepage');
    }
}
