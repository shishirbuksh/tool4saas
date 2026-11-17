<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\BlogService;
use App\Services\ToolRegistryService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

final class SubmitIndexNowCommand extends Command
{
    protected $signature = 'seo:indexnow {--dry-run : Output URLs without sending HTTP request}';

    protected $description = 'Submit all active, indexable URLs to IndexNow search engine protocol';

    public function handle(ToolRegistryService $toolRegistry, BlogService $blogService): int
    {
        $this->info('Gathering indexable URLs for IndexNow submission...');

        $base = 'https://tool4saas.com';
        $key = '69c364974a3c4cafb3edf9bb5cc02902';
        $keyLocation = "{$base}/{$key}.txt";

        $urls = [];

        // 1. Homepage & Static Pages
        $urls[] = $base;
        $static = ['about', 'privacy', 'terms', 'contact', 'author', 'methodology', 'sitemap'];
        foreach ($static as $p) {
            $urls[] = "{$base}/{$p}";
        }

        // 2. Category Hubs (indexable only)
        foreach ($toolRegistry->categories() as $cat) {
            if ($cat->isIndexable()) {
                $urls[] = "{$base}/category/{$cat->id}";
            }
        }

        // 3. Active Indexable Tools
        foreach ($toolRegistry->all() as $tool) {
            if ($tool->isIndexable()) {
                $urls[] = "{$base}/{$tool->slug}";
            }
        }

        // 4. Blog Index & Pillars
        $urls[] = "{$base}/blog";
        foreach ($blogService->getAllPillars() as $pillar) {
            $urls[] = "{$base}/blog/{$pillar->pillar}";
        }

        // 5. Indexable Blog Clusters
        foreach ($blogService->getAllPosts() as $post) {
            if ($post->kind === 'cluster' && ! $post->isNoindex) {
                $urls[] = "{$base}/blog/{$post->pillar}/{$post->slug}";
            }
        }

        $urls = array_values(array_unique($urls));
        $this->info(sprintf('Discovered %d unique indexable URLs.', count($urls)));

        if ($this->option('dry-run')) {
            $this->warn('DRY RUN MODE: Displaying first 10 URLs:');
            foreach (array_slice($urls, 0, 10) as $u) {
                $this->line(" - {$u}");
            }
            $this->info(sprintf('Total %d URLs ready for submission.', count($urls)));

            return self::SUCCESS;
        }

        $payload = [
            'host' => 'tool4saas.com',
            'key' => $key,
            'keyLocation' => $keyLocation,
            'urlList' => $urls,
        ];

        $this->info('Submitting batch to https://api.indexnow.org/indexnow ...');

        try {
            $response = Http::timeout(15)
                ->withHeaders([
                    'Content-Type' => 'application/json; charset=utf-8',
                    'User-Agent' => 'Tool4SaaS-IndexNow/1.0',
                ])
                ->post('https://api.indexnow.org/indexnow', $payload);

            $status = $response->status();

            if (in_array($status, [200, 202], true)) {
                $this->info("✅ IndexNow submission successful (HTTP {$status}).");
                $this->info(sprintf('%d URLs successfully submitted to IndexNow (Bing, Yandex, Seznam).', count($urls)));

                return self::SUCCESS;
            }

            $this->error("❌ IndexNow rejected payload with HTTP {$status}: {$response->body()}");

            return self::FAILURE;
        } catch (\Throwable $e) {
            $this->error('❌ Exception during IndexNow request: '.$e->getMessage());

            return self::FAILURE;
        }
    }
}
