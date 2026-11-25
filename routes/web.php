<?php

declare(strict_types=1);

use App\Http\Controllers\Api\SslCheckController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OgImageController;
use App\Http\Controllers\ToolController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

// 1. Feeds & SEO Endpoints
Route::get('/sitemap.xml', [FeedController::class, 'sitemap'])->name('feed.sitemap');
Route::get('/robots.txt', [FeedController::class, 'robots'])->name('feed.robots');
Route::get('/rss.xml', [FeedController::class, 'rss'])->name('feed.rss');
Route::get('/manifest.webmanifest', [FeedController::class, 'manifest'])->name('feed.manifest');
Route::get('/llms.txt', [FeedController::class, 'llms'])->name('feed.llms');
Route::get('/llms-full.txt', [FeedController::class, 'llmsFull'])->name('feed.llms-full');
Route::get('/69c364974a3c4cafb3edf9bb5cc02902.txt', function () {
    return response("69c364974a3c4cafb3edf9bb5cc02902\n", 200, [
        'Content-Type' => 'text/plain; charset=utf-8',
        'Cache-Control' => 'public, max-age=86400',
    ]);
});
Route::get('/e4a7d32c98b14e6da2019c43b876f512.txt', function () {
    return response("e4a7d32c98b14e6da2019c43b876f512\n", 200, [
        'Content-Type' => 'text/plain; charset=utf-8',
        'Cache-Control' => 'public, max-age=86400',
    ]);
});
Route::get('/ads.txt', function () {
    return response("google.com, pub-6310719489589992, DIRECT, f08c47fec0942fa0\n", 200, [
        'Content-Type' => 'text/plain; charset=utf-8',
        'Cache-Control' => 'public, max-age=86400',
    ]);
});

// 1.5 API Endpoints
Route::post('/api/ssl-check', [SslCheckController::class, 'check'])
    ->middleware('throttle:15,1')
    ->withoutMiddleware([VerifyCsrfToken::class])
    ->name('api.ssl-check');

// 2. Open Graph Dynamic 1200x630 Images
Route::get('/og/blog/{pillar}.png', [OgImageController::class, 'blogPillar'])->name('og.blog.pillar');
Route::get('/og/blog/{pillar}/{cluster}.png', [OgImageController::class, 'blogCluster'])->name('og.blog.cluster');
Route::get('/og/{slug}.png', [OgImageController::class, 'show'])->name('og.show');
Route::get('/og/blog/{pillar}/{cluster}', fn (string $pillar, string $cluster) => redirect("/og/blog/{$pillar}/{$cluster}.png", 301));
Route::get('/og/blog/{pillar}', fn (string $pillar) => redirect("/og/blog/{$pillar}.png", 301));
Route::get('/og/{slug}', fn (string $slug) => redirect("/og/{$slug}.png", 301));

// 3. Homepage
Route::get('/', HomeController::class)->name('home');

// 4. Static Informational Pages
Route::view('/about', 'pages.about')->name('about');
Route::get('/contact', fn () => view('pages.contact'))->name('contact');
Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:100'],
        'email' => ['required', 'email', 'max:150'],
        'message' => ['required', 'string', 'max:3000'],
    ]);

    Log::info('Contact submission', [
        'name' => $validated['name'],
        'email' => $validated['email'],
    ]);

    return back()->with('success', 'Thank you! Your message has been sent successfully. Our editorial team will review it within 48 hours.');
})->middleware('throttle:6,1');
Route::view('/privacy', 'pages.privacy')->name('privacy');
Route::view('/terms', 'pages.terms')->name('terms');
Route::view('/methodology', 'pages.methodology')->name('methodology');
Route::view('/author', 'pages.author')->name('author');
Route::view('/sitemap', 'pages.sitemap')->name('sitemap.html');
Route::view('/student-tools', 'pages.student-tools')->name('student-tools');
Route::view('/developer-tools', 'pages.developer-tools')->name('developer-tools');

// 5. Blog Silo (Pillars & Clusters)
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{pillar}', [BlogController::class, 'pillar'])->name('blog.pillar');
Route::get('/blog/{pillar}/{cluster}', [BlogController::class, 'cluster'])->name('blog.cluster');

// 6. Category Hubs
Route::get('/category/{id}', [CategoryController::class, 'show'])->name('category.show');

// 7. Wildcard Tool Pages (LAST, regex constrained to prevent matching file extensions)
Route::get('/{slug}', [ToolController::class, 'show'])
    ->where('slug', '^[a-z0-9\-]+$')
    ->name('tool.show');
