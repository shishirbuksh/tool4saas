<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\BlogService;
use App\Services\SeoService;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class BlogController extends Controller
{
    public function __construct(
        private readonly BlogService $blogService,
        private readonly SeoService $seoService,
    ) {}

    public function index(Request $request): View
    {
        $sections = $this->blogService->getBlogIndexSections();
        $baseUrl = $request->getSchemeAndHttpHost();

        $meta = [
            'title' => 'Blog — Free Tool Guides & Tutorials',
            'description' => 'Practical guides for every Tool4SaaS tool: invoice generators, PDF tools, calculators and more. Pillar guides + step-by-step tutorials with free templates.',
            'canonical' => "{$baseUrl}/blog",
            'isNoindex' => false,
            'ogImage' => "{$baseUrl}/og/static-blog.png",
        ];

        return view('blog.index', [
            'sections' => $sections,
            'meta' => $meta,
            'jsonLd' => [
                '@context' => 'https://schema.org',
                '@type' => 'CollectionPage',
                'name' => 'Tool4SaaS Guides & Tutorials',
                'url' => "{$baseUrl}/blog",
                'description' => $meta['description'],
            ],
        ]);
    }

    public function pillar(Request $request, string $pillar): View
    {
        $pillarMeta = $this->blogService->getPillar($pillar);
        $post = $this->blogService->getPillarPost($pillar);

        if ($pillarMeta === null || $post === null) {
            throw new NotFoundHttpException("Pillar guide '{$pillar}' not found.");
        }

        $clusters = array_values(array_filter(
            $this->blogService->getClustersForPillar($pillar),
            fn ($c): bool => ! $c->isNoindex
        ));

        $related = $this->blogService->getRelatedPosts($post, 4);
        $baseUrl = $request->getSchemeAndHttpHost();

        $meta = [
            'title' => $this->seoService->formatTitle($post->title),
            'description' => $this->seoService->formatDescription($post->description),
            'canonical' => "{$baseUrl}/blog/{$pillar}",
            'isNoindex' => $post->isNoindex,
            'ogImage' => "{$baseUrl}/og/blog/{$pillar}.png",
        ];

        $jsonLd = $this->seoService->generateBlogPostJsonLd($post, $baseUrl, $pillarMeta->title);

        return view('blog.pillar', [
            'pillarMeta' => $pillarMeta,
            'post' => $post,
            'clusters' => $clusters,
            'related' => $related,
            'meta' => $meta,
            'jsonLd' => $jsonLd,
        ]);
    }

    public function cluster(Request $request, string $pillar, string $cluster): View
    {
        $pillarMeta = $this->blogService->getPillar($pillar);
        $post = $this->blogService->getClusterPost($pillar, $cluster);

        if ($pillarMeta === null || $post === null) {
            throw new NotFoundHttpException("Cluster guide '{$cluster}' not found in pillar '{$pillar}'.");
        }

        $related = $this->blogService->getRelatedPosts($post, 4);
        $baseUrl = $request->getSchemeAndHttpHost();

        $meta = [
            'title' => $this->seoService->formatTitle($post->title),
            'description' => $this->seoService->formatDescription($post->description),
            'canonical' => "{$baseUrl}/blog/{$pillar}/{$cluster}",
            'isNoindex' => $post->isNoindex,
            'ogImage' => "{$baseUrl}/og/blog/{$pillar}/{$cluster}.png",
        ];

        $jsonLd = $this->seoService->generateBlogPostJsonLd($post, $baseUrl, $pillarMeta->title);

        return view('blog.cluster', [
            'pillarMeta' => $pillarMeta,
            'post' => $post,
            'related' => $related,
            'meta' => $meta,
            'jsonLd' => $jsonLd,
        ]);
    }
}
