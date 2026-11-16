<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\BlogService;
use App\Services\RelatedToolsService;
use App\Services\SeoService;
use App\Services\ToolRegistryService;
use Illuminate\Contracts\View\View;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class ToolController
{
    public function __construct(
        private readonly ToolRegistryService $registry,
        private readonly RelatedToolsService $relatedService,
        private readonly SeoService $seo,
        private readonly BlogService $blogService,
    ) {}

    public function show(string $slug): View
    {
        $tool = $this->registry->findBySlug($slug);
        if ($tool === null) {
            throw new NotFoundHttpException("Tool not found: {$slug}");
        }

        $relatedData = $this->relatedService->compute($tool);
        $category = $this->registry->findCategory($tool->category);
        $metaTitle = $this->seo->toolMetaTitle($tool);
        $metaDescription = $this->seo->fitMetaDescription($tool->description);
        $jsonLd = $this->seo->buildToolJsonLd($tool, url('/'));
        $guideCallout = $this->blogService->getGuideRecommendationForTool($tool->slug, $tool->category);

        return view('pages.tool', [
            'tool' => $tool,
            'category' => $category,
            'seeAlso' => $relatedData['seeAlso'],
            'relatedTools' => $relatedData['relatedTools'],
            'relatedHeading' => $relatedData['heading'],
            'metaTitle' => $metaTitle,
            'metaDescription' => $metaDescription,
            'jsonLd' => $jsonLd,
            'ymylType' => $tool->ymylType(),
            'canonical' => url('/'.$tool->slug),
            'isNoindex' => $tool->isNoindex,
            'guideCallout' => $guideCallout,
        ]);
    }
}
