<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\BlogService;
use App\Services\ToolRegistryService;
use Illuminate\Http\Response;

final class OgImageController extends Controller
{
    private const int WIDTH = 1200;

    private const int HEIGHT = 630;

    public function __construct(
        private readonly ToolRegistryService $toolRegistry,
        private readonly BlogService $blogService,
    ) {}

    public function show(string $slug): Response
    {
        $title = 'Tool4SaaS';
        $desc = '120+ free browser tools for developers, designers, and founders.';
        $badge = 'Free Online Tools';

        if ($slug === 'home') {
            $title = '120+ Free Online Tools, One Browser Tab';
            $desc = 'Invoices, PDFs, images, code and calculators. No signup; all tools run locally.';
            $badge = 'Local-First · No Signup';
        } elseif (str_starts_with($slug, 'static-')) {
            $staticKey = substr($slug, strlen('static-'));
            $title = ucwords(str_replace('-', ' ', $staticKey)).' — Tool4SaaS';
            $desc = 'Learn more about Tool4SaaS, our local-first browser tools, and privacy principles.';
            $badge = 'About Tool4SaaS';
        } elseif (str_starts_with($slug, 'category-')) {
            $catId = substr($slug, strlen('category-'));
            $category = $this->toolRegistry->getCategory($catId);
            if ($category !== null) {
                $title = "Free {$category->label} Tools";
                $desc = $category->description;
                $badge = "Category · {$category->label}";
            }
        } else {
            $tool = $this->toolRegistry->getBySlug($slug);
            if ($tool !== null) {
                $title = $tool->title;
                $desc = $tool->description;
                $badge = "Free Browser Tool · {$tool->categoryEnum()->label()}";
            }
        }

        return $this->renderImage($title, $desc, $badge);
    }

    public function blogPillar(string $pillar): Response
    {
        $pillarMeta = $this->blogService->getPillar($pillar);
        $post = $this->blogService->getPillarPost($pillar);

        $title = $post !== null ? $post->title : ($pillarMeta !== null ? $pillarMeta->title : 'Tool Guide');
        $desc = $post !== null ? $post->description : ($pillarMeta !== null ? $pillarMeta->description : 'Free tool guides and tutorials.');
        $badge = $pillarMeta !== null ? "Guide · {$pillarMeta->shortLabel}" : 'Tool Guide';

        return $this->renderImage($title, $desc, $badge);
    }

    public function blogCluster(string $pillar, string $cluster): Response
    {
        $pillarMeta = $this->blogService->getPillar($pillar);
        $post = $this->blogService->getClusterPost($pillar, $cluster);

        $title = $post !== null ? $post->title : ucwords(str_replace('-', ' ', $cluster));
        $desc = $post !== null ? $post->description : 'Step-by-step tutorial with worked examples.';
        $badge = $pillarMeta !== null ? "Tutorial · {$pillarMeta->shortLabel}" : 'Tutorial';

        return $this->renderImage($title, $desc, $badge);
    }

    private function renderImage(string $title, string $desc, string $badge): Response
    {
        $img = imagecreatetruecolor(self::WIDTH, self::HEIGHT);
        if ($img === false) {
            abort(500, 'Unable to create image');
        }

        // Colors
        $bg = imagecolorallocate($img, 15, 23, 42); // #0f172a (dark slate)
        $cardBg = imagecolorallocate($img, 30, 41, 59); // #1e293b
        $accent = imagecolorallocate($img, 99, 102, 241); // #6366f1 (indigo)
        $textPrimary = imagecolorallocate($img, 248, 250, 252); // #f8fafc
        $textSecondary = imagecolorallocate($img, 148, 163, 184); // #94a3b8
        $borderCol = imagecolorallocate($img, 51, 65, 85); // #334155

        if ($bg === false || $cardBg === false || $accent === false || $textPrimary === false || $textSecondary === false || $borderCol === false) {
            imagedestroy($img);
            abort(500, 'Color allocation error');
        }

        // Background
        imagefilledrectangle($img, 0, 0, self::WIDTH, self::HEIGHT, $bg);

        // Decorative background elements
        imagefilledrectangle($img, 40, 40, self::WIDTH - 40, self::HEIGHT - 40, $cardBg);
        imagerectangle($img, 40, 40, self::WIDTH - 40, self::HEIGHT - 40, $borderCol);

        // Top accent line
        imagefilledrectangle($img, 40, 40, self::WIDTH - 40, 46, $accent);

        // Detect font
        $fontPath = null;
        $candidates = [
            'C:\\Windows\\Fonts\\arial.ttf',
            'C:\\Windows\\Fonts\\calibri.ttf',
            'C:\\Windows\\Fonts\\segoeui.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        ];
        foreach ($candidates as $cand) {
            if (file_exists($cand)) {
                $fontPath = $cand;
                break;
            }
        }

        if ($fontPath !== null) {
            // Render with TrueType Font
            // Badge
            imagettftext($img, 14, 0, 80, 110, $accent, $fontPath, strtoupper($badge));

            // Title
            $wrappedTitle = wordwrap($title, 40, "\n");
            imagettftext($img, 28, 0, 80, 180, $textPrimary, $fontPath, $wrappedTitle);

            // Description
            $wrappedDesc = wordwrap($desc, 65, "\n");
            imagettftext($img, 16, 0, 80, 360, $textSecondary, $fontPath, $wrappedDesc);

            // Footer branding
            imagettftext($img, 13, 0, 80, 540, $textSecondary, $fontPath, 'tool4saas.com · 100% Free & Browser-Local · No signup required');
        } else {
            // Fallback bitmap font
            imagestring($img, 5, 80, 80, strtoupper($badge), $accent);
            imagestring($img, 5, 80, 130, substr($title, 0, 60), $textPrimary);
            imagestring($img, 4, 80, 170, substr($desc, 0, 80), $textSecondary);
            imagestring($img, 4, 80, 530, 'tool4saas.com · 100% Free · No Signup', $textSecondary);
        }

        ob_start();
        imagepng($img);
        $pngData = (string) ob_get_clean();
        imagedestroy($img);

        return response($pngData, 200, [
            'Content-Type' => 'image/png',
            'Cache-Control' => 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
        ]);
    }
}
