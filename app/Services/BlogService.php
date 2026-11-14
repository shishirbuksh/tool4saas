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
