<?php

declare(strict_types=1);

namespace App\Services;

use App\DTOs\BlogPillarDTO;
use App\DTOs\BlogPostDTO;

final class BlogService
{
    /** @var list<BlogPillarDTO>|null */
    private ?array $pillars = null;

    /** @var list<BlogPostDTO>|null */
    private ?array $posts = null;

    /**
     * @return list<BlogPillarDTO>
     */
    public function getAllPillars(): array
    {
        if ($this->pillars !== null) {
            return $this->pillars;
        }

        $path = storage_path('app/blog/pillars.json');
        if (! file_exists($path)) {
            return [];
        }

        /** @var list<array<string, mixed>> $raw */
        $raw = json_decode((string) file_get_contents($path), true) ?: [];

        $this->pillars = array_map(
            fn (array $p): BlogPillarDTO => BlogPillarDTO::fromArray($p),
            $raw
        );

        return $this->pillars;
    }

    public function getPillar(string $pillar): ?BlogPillarDTO
    {
        foreach ($this->getAllPillars() as $p) {
            if ($p->pillar === $pillar) {
                return $p;
            }
        }

        return null;
    }

    public function getPillarByToolSlug(string $toolSlug): ?BlogPillarDTO
    {
        foreach ($this->getAllPillars() as $p) {
            if ($p->toolSlug === $toolSlug) {
                return $p;
            }
        }

        return null;
    }

    /**
     * @return array{
     *     title: string,
     *     description: string,
     *     url: string,
     *     badge: string,
     *     readingMinutes: int,
     *     pillarSlug: string,
     *     relatedPosts: list<array{title: string, url: string}>
     * }|null
     */
    public function getGuideRecommendationForTool(string $toolSlug, string $categoryId): ?array
    {
        // 1. Direct pillar match
        $pillar = $this->getPillarByToolSlug($toolSlug);
        if ($pillar !== null) {
            $pillarPost = $this->getPillarPost($pillar->pillar);
            $clusters = array_values(array_filter(
                $this->getClustersForPillar($pillar->pillar),
                fn (BlogPostDTO $c): bool => ! $c->isNoindex
            ));

            /** @var list<array{title: string, url: string}> $relPosts */
            $relPosts = array_map(fn (BlogPostDTO $c): array => [
                'title' => $c->title,
                'url' => url('/blog/'.$pillar->pillar.'/'.$c->slug),
            ], array_slice($clusters, 0, 3));

            return [
                'title' => $pillar->title,
                'description' => $pillar->description,
                'url' => url('/blog/'.$pillar->pillar),
                'badge' => 'Comprehensive Guide & Tutorial Hub',
                'readingMinutes' => $pillarPost !== null ? $pillarPost->readingMinutes : 10,
                'pillarSlug' => $pillar->pillar,
                'relatedPosts' => $relPosts,
            ];
        }

        // 2. Direct post match in toolSlugs
        foreach ($this->getAllPosts() as $post) {
            if (! $post->isNoindex && in_array($toolSlug, $post->toolSlugs, true)) {
                $rel = $this->getRelatedPosts($post, 3);
                /** @var list<array{title: string, url: string}> $relPosts */
                $relPosts = array_map(fn (BlogPostDTO $c): array => [
                    'title' => $c->title,
                    'url' => $c->kind === 'pillar' ? url('/blog/'.$c->pillar) : url('/blog/'.$c->pillar.'/'.$c->slug),
                ], $rel);

                return [
                    'title' => $post->title,
                    'description' => $post->description,
                    'url' => $post->kind === 'pillar' ? url('/blog/'.$post->pillar) : url('/blog/'.$post->pillar.'/'.$post->slug),
                    'badge' => 'Step-by-Step Technical Tutorial',
                    'readingMinutes' => $post->readingMinutes,
                    'pillarSlug' => $post->pillar,
                    'relatedPosts' => $relPosts,
                ];
            }
        }

        // 3. Category & Tool Override Mapping for Deep Topical Reverse-Silo
        $toolOverrides = [
            'cagr-calculator' => 'sip-calculator-guide',
            'compound-interest-calculator' => 'sip-calculator-guide',
            'auto-loan-calculator' => 'mortgage-calculator-guide',
            'simple-interest-calculator' => 'percentage-calculator-guide',
            'percentage-change' => 'percentage-calculator-guide',
            'discount-calculator' => 'percentage-calculator-guide',
            'gst-calculator' => 'invoice-generator-guide',
            'json-to-yaml' => 'json-formatter-guide',
            'yaml-to-json' => 'json-formatter-guide',
            'uuid-generator' => 'password-generator-guide',
            'case-converter' => 'word-counter-guide',
            'text-diff' => 'word-counter-guide',
            'text-tools' => 'word-counter-guide',
            'markdown-editor' => 'word-counter-guide',
            'base64-tool' => 'json-formatter-guide',
            'hash-generator' => 'password-generator-guide',
            'regex-tester' => 'json-formatter-guide',
            'svg-optimizer' => 'image-compressor-guide',
            'color-contrast' => 'image-compressor-guide',
            'color-converter' => 'image-compressor-guide',
        ];

        $catMap = [
            'text-documents' => 'word-counter-guide',
            'business' => 'invoice-generator-guide',
            'developer' => 'json-formatter-guide',
            'converters' => 'json-formatter-guide',
            'generators' => 'password-generator-guide',
            'images-design' => 'image-compressor-guide',
            'pdf' => 'pdf-merge-guide',
            'calculators' => 'percentage-calculator-guide',
            'finance' => 'mortgage-calculator-guide',
            'health' => 'bmi-calculator-guide',
            'seo' => 'seo-analyzer-guide',
            'time' => 'age-calculator-guide',
        ];

        $targetPillarSlug = $toolOverrides[$toolSlug] ?? ($catMap[$categoryId] ?? 'invoice-generator-guide');
        $fallbackPillar = $this->getPillar($targetPillarSlug);

        if ($fallbackPillar !== null) {
            $pillarPost = $this->getPillarPost($fallbackPillar->pillar);
            $clusters = array_values(array_filter(
                $this->getClustersForPillar($fallbackPillar->pillar),
                fn (BlogPostDTO $c): bool => ! $c->isNoindex
            ));

            /** @var list<array{title: string, url: string}> $relPosts */
            $relPosts = array_map(fn (BlogPostDTO $c): array => [
                'title' => $c->title,
                'url' => url('/blog/'.$fallbackPillar->pillar.'/'.$c->slug),
            ], array_slice($clusters, 0, 3));

            return [
                'title' => $fallbackPillar->title,
                'description' => $fallbackPillar->description,
                'url' => url('/blog/'.$fallbackPillar->pillar),
                'badge' => 'Recommended Reference Guide',
                'readingMinutes' => $pillarPost !== null ? $pillarPost->readingMinutes : 10,
                'pillarSlug' => $fallbackPillar->pillar,
                'relatedPosts' => $relPosts,
            ];
        }

        return null;
    }

    /**
     * @return list<BlogPostDTO>
     */
    public function getAllPosts(): array
    {
        if ($this->posts !== null) {
            return $this->posts;
        }

        $path = storage_path('app/blog/posts.json');
        if (! file_exists($path)) {
            return [];
        }

        /** @var list<array<string, mixed>> $raw */
        $raw = json_decode((string) file_get_contents($path), true) ?: [];

        $this->posts = array_map(
            fn (array $p): BlogPostDTO => BlogPostDTO::fromArray($p),
            $raw
        );

        return $this->posts;
    }

    public function getPillarPost(string $pillar): ?BlogPostDTO
    {
        foreach ($this->getAllPosts() as $post) {
            if ($post->pillar === $pillar && $post->kind === 'pillar') {
                return $post;
            }
        }

        return null;
    }

    public function getClusterPost(string $pillar, string $cluster): ?BlogPostDTO
    {
        foreach ($this->getAllPosts() as $post) {
            if ($post->pillar === $pillar && $post->slug === $cluster && $post->kind === 'cluster') {
                return $post;
            }
        }

        return null;
    }

    /**
     * @return list<BlogPostDTO>
     */
    public function getClustersForPillar(string $pillar): array
    {
        $clusters = [];
        foreach ($this->getAllPosts() as $post) {
            if ($post->pillar === $pillar && $post->kind === 'cluster') {
                $clusters[] = $post;
            }
        }

        return $clusters;
    }

    /**
     * @return list<BlogPostDTO>
     */
    public function getRelatedPosts(BlogPostDTO $post, int $limit = 4): array
    {
        $allClusters = array_values(array_filter(
            $this->getClustersForPillar($post->pillar),
            fn (BlogPostDTO $c): bool => ! $c->isNoindex
        ));

        $siblings = array_values(array_filter(
            $allClusters,
            fn (BlogPostDTO $c): bool => $c->slug !== $post->slug
        ));

        if ($post->kind === 'pillar') {
            $explicit = [];
            foreach ($post->relatedSlugs as $slug) {
                foreach ($siblings as $sibling) {
                    if ($sibling->slug === $slug) {
                        $explicit[] = $sibling;
                        break;
                    }
                }
            }

            $explicitSlugs = array_fill_keys(array_map(fn (BlogPostDTO $e): string => $e->slug, $explicit), true);
            $rest = array_values(array_filter(
                $siblings,
                fn (BlogPostDTO $s): bool => ! isset($explicitSlugs[$s->slug])
            ));

            return array_slice(array_merge($explicit, $rest), 0, $limit);
        }

        // Ring mesh topology for cluster posts
        $currentIndex = -1;
        foreach ($allClusters as $idx => $candidate) {
            if ($candidate->slug === $post->slug) {
                $currentIndex = $idx;
                break;
            }
        }

        $rotatedSiblings = [];
        $count = count($allClusters);
        if ($currentIndex >= 0 && $count > 1) {
            for ($i = 1; $i < $count; $i++) {
                $candidate = $allClusters[($currentIndex + $i) % $count];
                if ($candidate->slug !== $post->slug) {
                    $rotatedSiblings[] = $candidate;
                }
            }
        } else {
            $rotatedSiblings = $siblings;
        }

        $explicit = [];
        foreach ($post->relatedSlugs as $slug) {
            foreach ($allClusters as $c) {
                if ($c->slug === $slug && $c->slug !== $post->slug) {
                    $explicit[] = $c;
                    break;
                }
            }
        }

        $explicitSlugs = array_fill_keys(array_map(fn (BlogPostDTO $e): string => $e->slug, $explicit), true);
        $remaining = array_values(array_filter(
            $rotatedSiblings,
            fn (BlogPostDTO $s): bool => ! isset($explicitSlugs[$s->slug])
        ));

        $ordered = array_merge($explicit, $remaining);
        $pillar = $this->getPillarPost($post->pillar);
        $pillarOffset = $pillar !== null ? 1 : 0;
        $rest = array_slice($ordered, 0, max(0, $limit - $pillarOffset));

        return array_slice(array_merge($pillar !== null ? [$pillar] : [], $rest), 0, $limit);
    }

    /**
     * @return list<array{meta: BlogPillarDTO, words: int, clusters: list<BlogPostDTO>}>
     */
    public function getBlogIndexSections(): array
    {
        $sections = [];
        foreach ($this->getAllPillars() as $pillar) {
            $pillarPost = $this->getPillarPost($pillar->pillar);
            $clusters = array_values(array_filter(
                $this->getClustersForPillar($pillar->pillar),
                fn (BlogPostDTO $c): bool => ! $c->isNoindex
            ));
            $words = $pillarPost !== null ? $pillarPost->wordCount() : 0;

            $sections[] = [
                'meta' => $pillar,
                'words' => $words,
                'clusters' => $clusters,
            ];
        }

        return $sections;
    }
}
