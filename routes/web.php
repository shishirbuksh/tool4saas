<?php

declare(strict_types=1);

use App\Http\Controllers\Api\SslCheckController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OgImageController;
use App\Http\Controllers\ToolController;
use App\Http\Middleware\StatelessRouteMiddleware;
use Illuminate\Support\Facades\Route;

// Stateful CSRF + Session routes (Contact Form)
Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::post('/contact', [ContactController::class, 'submit'])
    ->middleware('throttle:6,1');

// Stateless public routes (zero Set-Cookie / CSRF overhead, safe for CDN & Varnish)
Route::withoutMiddleware(StatelessRouteMiddleware::EXCLUDE_SESSION)->group(function (): void {
    // 1. Feeds & SEO Endpoints
    Route::get('/sitemap.xml', [FeedController::class, 'sitemap'])->name('feed.sitemap');
    Route::get('/robots.txt', [FeedController::class, 'robots'])->name('feed.robots');
    Route::get('/rss.xml', [FeedController::class, 'rss'])->name('feed.rss');
    Route::get('/manifest.webmanifest', [FeedController::class, 'manifest'])->name('feed.manifest');
    Route::get('/llms.txt', [FeedController::class, 'llms'])->name('feed.llms');
    Route::get('/llms-full.txt', [FeedController::class, 'llmsFull'])->name('feed.llms-full');
    Route::get('/69c364974a3c4cafb3edf9bb5cc02902.txt', [FeedController::class, 'indexNowPrimary'])->name('feed.indexnow');
    Route::get('/e4a7d32c98b14e6da2019c43b876f512.txt', [FeedController::class, 'indexNowLegacy'])->name('feed.indexnow-legacy');
    Route::get('/ads.txt', [FeedController::class, 'adsTxt'])->name('feed.ads');

    // 1.5 API Endpoints
    Route::post('/api/ssl-check', [SslCheckController::class, 'check'])
        ->middleware('throttle:15,1')
        ->name('api.ssl-check');

    // 2. Open Graph Dynamic 1200x630 Images
    Route::get('/og/blog/{pillar}.png', [OgImageController::class, 'blogPillar'])->name('og.blog.pillar');
    Route::get('/og/blog/{pillar}/{cluster}.png', [OgImageController::class, 'blogCluster'])->name('og.blog.cluster');
    Route::get('/og/{slug}.png', [OgImageController::class, 'show'])->name('og.show');
    Route::get('/og/blog/{pillar}/{cluster}', [OgImageController::class, 'redirectCluster']);
    Route::get('/og/blog/{pillar}', [OgImageController::class, 'redirectPillar']);
    Route::get('/og/{slug}', [OgImageController::class, 'redirectSlug']);

    // 3. Homepage
    Route::get('/', HomeController::class)->name('home');

    // 4. Static Informational Pages & Utility Hubs
    Route::view('/about', 'pages.about')->name('about');
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
});
