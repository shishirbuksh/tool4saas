<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\SeoService;
use App\Services\ToolRegistryService;
use Illuminate\Contracts\View\View;

final class HomeController
{
    public function __construct(
        private readonly ToolRegistryService $registry,
        private readonly SeoService $seo,
    ) {}

    public function __invoke(): View
    {
        $categories = $this->registry->categories();
        $allTools = $this->registry->all();
        $counts = $this->registry->counts();

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

        $metaTitle = "{$counts['visible']} Free Online Tools – PDF, Image, Text & Calculators";
        $metaDescription = "Use {$counts['visible']} free online tools for PDFs, images, text, coding and calculations. No signup required. Most tools process your data locally in your browser.";
        $jsonLd = $this->seo->buildHomeJsonLd(url('/'));

        return view('pages.home', [
            'metaTitle' => $metaTitle,
            'metaDescription' => $metaDescription,
            'counts' => $counts,
            'grouped' => $grouped,
            'canonical' => url('/'),
            'jsonLd' => $jsonLd,
        ]);
    }
}
