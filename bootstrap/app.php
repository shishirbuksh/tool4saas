<?php

declare(strict_types=1);

use App\Http\Middleware\HandleLegacyRedirects;
use App\Http\Middleware\SecurityHeaders;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Routing\UrlGenerator;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->prepend(HandleLegacyRedirects::class);
        $middleware->prepend(SecurityHeaders::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->booting(function (): void {
        if (app()->environment('production') || config('app.env') === 'production') {
            $urlGenerator = app(UrlGenerator::class);
            $urlGenerator->forceScheme('https');
            $urlGenerator->forceRootUrl('https://tool4saas.com');
        }
    })
    ->create();
