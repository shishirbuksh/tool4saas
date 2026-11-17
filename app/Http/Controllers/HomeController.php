<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\BlogService;
use App\Services\SeoService;
use App\Services\ToolRegistryService;
use Illuminate\Contracts\View\View;

final class HomeController
{
    public function __construct(
        private readonly ToolRegistryService $registry,
        private readonly SeoService $seo,
        private readonly BlogService $blogService,
    ) {}

    public function __invoke(): View
    {
        $categories = $this->registry->categories();
        $allTools = $this->registry->all();
        $counts = $this->registry->counts();
        $featuredPillars = array_slice($this->blogService->getAllPillars(), 0, 6);

        $grouped = [];
        foreach ($categories as $cat) {
            $catTools = array_values(array_filter(
                $allTools,
                fn ($t) => $t->category === $cat->id && ! $t->isNoindex
            ));
            if (! empty($catTools)) {
                $grouped[] = [
                    'category' => $cat,
                    'tools' => $catTools,
                ];
            }
        }

        $totalTools = count($allTools);
        $metaTitle = "Tool4SaaS — {$totalTools} Free Online Developer, PDF, Text & Utility Tools";
        $metaDescription = "Use {$totalTools} free online tools for developer tasks, PDFs, images, text, and calculations. Zero accounts, 100% private, and runs entirely in your browser.";
        $jsonLd = $this->seo->buildHomeJsonLd(url('/'));

        return view('pages.home', [
            'metaTitle' => $metaTitle,
            'metaDescription' => $metaDescription,
            'counts' => $counts,
            'toolCount' => $totalTools,
            'grouped' => $grouped,
            'featuredPillars' => $featuredPillars,
            'canonical' => url('/'),
            'jsonLd' => $jsonLd,
        ]);
    }
}
