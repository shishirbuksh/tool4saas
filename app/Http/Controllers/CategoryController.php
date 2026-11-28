<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\BlogService;
use App\Services\SeoService;
use App\Services\ToolRegistryService;
use Illuminate\Contracts\View\View;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class CategoryController
{
    public function __construct(
        private readonly ToolRegistryService $registry,
        private readonly SeoService $seo,
        private readonly BlogService $blogService,
    ) {}

    public function show(string $id): View
    {
        $category = $this->registry->findCategory($id);
        if ($category === null) {
            throw new NotFoundHttpException("Category not found: {$id}");
        }

        $tools = array_values(array_filter(
            $this->registry->getByCategory($id),
            fn ($t) => $t->isIndexable()
        ));
        $count = count($tools);

        $otherCategories = array_values(array_filter(
            $this->registry->categories(),
            fn ($c) => $c->id !== $id
        ));

        $categoryGuide = ! empty($tools)
            ? $this->blogService->getGuideRecommendationForTool($tools[0]->slug, $id)
            : null;

        $baseUrl = rtrim((string) config('app.url', 'https://tool4saas.com'), '/');
        $titleBase = str_ends_with($category->label, 'Tools') ? $category->label : "Online {$category->label}";
        $metaTitle = $this->seo->formatTitle("{$titleBase} — {$count} Free Browser Tools");
        $metaDescription = $this->seo->fitMetaDescription($category->description);
        $jsonLd = $this->seo->buildCategoryJsonLd($category, $tools, $baseUrl);

        return view('pages.category', [
            'category' => $category,
            'tools' => $tools,
            'otherCategories' => $otherCategories,
            'categoryGuide' => $categoryGuide,
            'metaTitle' => $metaTitle,
            'metaDescription' => $metaDescription,
            'canonical' => "{$baseUrl}/category/{$category->id}",
            'jsonLd' => $jsonLd,
            'isNoindex' => ! $category->isIndexable(),
        ]);
    }
}
