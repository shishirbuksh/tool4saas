<?php

declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;

final class OgImageTest extends TestCase
{
    public function test_og_home_image_is_successful(): void
    {
        $response = $this->get('/og/home.png');
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'image/png');
    }

    public function test_og_category_image_is_successful(): void
    {
        $response = $this->get('/og/category-pdf.png');
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'image/png');
    }

    public function test_og_legacy_extensionless_category_redirects_permanently(): void
    {
        $response = $this->get('/og/category-pdf');
        $response->assertStatus(301);
        $response->assertRedirect('/og/category-pdf.png');
    }

    public function test_og_blog_pillar_image_is_successful(): void
    {
        $response = $this->get('/og/blog/bmi-calculator-guide.png');
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'image/png');
    }

    public function test_og_blog_cluster_image_is_successful(): void
    {
        $clusters = [
            'how-bmi-is-calculated',
            'healthy-weight-range',
            'calorie-deficit-for-weight-loss',
            'bmi-for-women',
        ];

        foreach ($clusters as $cluster) {
            $response = $this->get("/og/blog/bmi-calculator-guide/{$cluster}.png");
            $response->assertStatus(200);
            $response->assertHeader('Content-Type', 'image/png');
        }
    }

    public function test_og_blog_extensionless_cluster_redirects_permanently(): void
    {
        $response = $this->get('/og/blog/bmi-calculator-guide/how-bmi-is-calculated');
        $response->assertStatus(301);
        $response->assertRedirect('/og/blog/bmi-calculator-guide/how-bmi-is-calculated.png');
    }

    public function test_og_tool_image_is_successful(): void
    {
        $response = $this->get('/og/word-counter.png');
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'image/png');
    }
}
