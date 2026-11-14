<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\BlogService;
use App\Services\ToolRegistryService;
use Tests\TestCase;

final class FullCatalogAuditTest extends TestCase
{
    public function test_all_127_tools_render_successfully(): void
    {
        $registry = app(ToolRegistryService::class);
        $tools = $registry->getAllTools();

        expect($tools)->toHaveCount(127);

        foreach ($tools as $tool) {
            // Guarantee 100% dedicated tool view exists (zero generic fallback)
            expect(view()->exists('tools.'.$tool->slug))->toBeTrue();

            $response = $this->get('/'.$tool->slug);
            $response->assertStatus(200);

            // Assert title & description present
            $content = $response->getContent();
            expect($content)
                ->toContain('<title>')
                ->toContain('name="description"')
                ->toContain('rel="canonical"')
                ->toContain('application/ld+json');
        }
    }

    public function test_all_12_categories_render_successfully(): void
    {
        $registry = app(ToolRegistryService::class);
        $categories = $registry->getAllCategories();

        expect($categories)->toHaveCount(12);

        foreach ($categories as $cat) {
            $response = $this->get('/category/'.$cat->id);
            $response->assertStatus(200);
            $response->assertSee($cat->label);
        }
    }

    public function test_all_17_blog_pillars_render_successfully(): void
    {
        $blogService = app(BlogService::class);
        $pillars = $blogService->getAllPillars();

        expect($pillars)->toHaveCount(17);

        foreach ($pillars as $pillar) {
            $post = $blogService->getPillarPost($pillar->pillar);
            expect($post)->not->toBeNull();

            $response = $this->get('/blog/'.$pillar->pillar);
            $response->assertStatus(200);
            $response->assertSee($post->title);
        }
    }

    public function test_blog_clusters_render_successfully(): void
    {
        $blogService = app(BlogService::class);
        $posts = array_slice($blogService->getAllPosts(), 0, 20);

        foreach ($posts as $post) {
            if ($post->kind !== 'cluster') {
                continue;
            }
            $response = $this->get('/blog/'.$post->pillar.'/'.$post->slug);
            $response->assertStatus(200);
            $response->assertSee($post->title);
        }
    }
}
