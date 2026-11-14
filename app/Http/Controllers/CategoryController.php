<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\SeoService;
use App\Services\ToolRegistryService;
use Illuminate\Contracts\View\View;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class CategoryController
{
    public function __construct(
        private readonly ToolRegistryService $registry,
        private readonly SeoService $seo,
    ) {}

    public function show(string $id): View
    {
        $category = $this->registry->findCategory($id);
        if ($category === null) {
            throw new NotFoundHttpException("Category not found: {$id}");
        }

        $tools = $this->registry->getByCategory($id);
        $count = count($tools);

        $metaTitle = $this->seo->fitMetaTitle("{$category->label} Tools ({$count} Free Online Utilities)");
        $metaDescription = $this->seo->fitMetaDescription($category->description);
        $jsonLd = $this->seo->buildCategoryJsonLd($category, $tools, url('/'));

        return view('pages.category', [
            'category' => $category,
            'tools' => $tools,
            'metaTitle' => $metaTitle,
            'metaDescription' => $metaDescription,
            'canonical' => url('/category/'.$category->id),
            'jsonLd' => $jsonLd,
        ]);
    }
}
