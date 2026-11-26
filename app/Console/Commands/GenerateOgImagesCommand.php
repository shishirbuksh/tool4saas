<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Http\Controllers\OgImageController;
use App\Services\BlogService;
use App\Services\ToolRegistryService;
use Illuminate\Console\Command;

final class GenerateOgImagesCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = 'og:generate {--force : Overwrite existing images}';

    /**
     * @var string
     */
    protected $description = 'Pre-generate static Open Graph PNG images in public/og for fast 0ms edge delivery';

    public function handle(
        OgImageController $ogController,
        ToolRegistryService $toolRegistry,
        BlogService $blogService,
    ): int {
        $force = (bool) $this->option('force');
        $baseDir = public_path('og');

        if (! is_dir($baseDir)) {
            mkdir($baseDir, 0755, true);
        }

        $generated = 0;
        $skipped = 0;

        $saveImage = function (string $filePath, callable $generator) use (&$generated, &$skipped, $force): void {
            if (file_exists($filePath) && ! $force) {
                $skipped++;

                return;
            }

            $dir = dirname($filePath);
            if (! is_dir($dir)) {
                mkdir($dir, 0755, true);
            }

            $response = $generator();
            file_put_contents($filePath, (string) $response->getContent());
            $generated++;
        };

        $this->info('1. Generating Homepage and Static Pages...');
        $saveImage("{$baseDir}/home.png", fn () => $ogController->show('home'));

        $staticSlugs = ['about', 'contact', 'privacy', 'terms', 'methodology', 'author', 'sitemap', 'student-tools', 'developer-tools', 'blog'];
        foreach ($staticSlugs as $slug) {
            $saveImage("{$baseDir}/static-{$slug}.png", fn () => $ogController->show("static-{$slug}"));
        }

        $this->info('2. Generating Category OG Images...');
        foreach ($toolRegistry->categories() as $category) {
            $catPngPath = "{$baseDir}/category-{$category->id}.png";
            $saveImage($catPngPath, fn () => $ogController->show("category-{$category->id}"));

            // Also ensure category-pdf static alias exists for legacy crawlers requesting without extension
            if ($category->id === 'pdf') {
                $legacyNoExt = "{$baseDir}/category-pdf";
                if (! file_exists($legacyNoExt) || $force) {
                    copy($catPngPath, $legacyNoExt);
                }
            }
        }

        $this->info('3. Generating Blog Pillar and Cluster OG Images...');
        $blogDir = "{$baseDir}/blog";
        if (! is_dir($blogDir)) {
            mkdir($blogDir, 0755, true);
        }

        foreach ($blogService->getAllPillars() as $pillar) {
            $saveImage("{$blogDir}/{$pillar->pillar}.png", fn () => $ogController->blogPillar($pillar->pillar));

            $clusterPosts = $blogService->getClustersForPillar($pillar->pillar);
            foreach ($clusterPosts as $post) {
                $clusterPath = "{$blogDir}/{$pillar->pillar}/{$post->slug}.png";
                $saveImage($clusterPath, fn () => $ogController->blogCluster($pillar->pillar, $post->slug));
            }
        }

        $this->info('4. Generating Tool OG Images...');
        foreach ($toolRegistry->all() as $tool) {
            $saveImage("{$baseDir}/{$tool->slug}.png", fn () => $ogController->show($tool->slug));
        }

        $this->info("OG Generation Complete! Generated: {$generated}, Skipped: {$skipped}");

        return self::SUCCESS;
    }
}
