<?php

declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;

final class PresetQueryTest extends TestCase
{
    public function test_calculator_tools_support_deep_link_query_parameters_while_retaining_canonical(): void
    {
        $routes = [
            '/sip-calculator?monthly=5000&years=10&rate=12' => 'https://tool4saas.com/sip-calculator',
            '/percentage-calculator?rate=20&base=150' => 'https://tool4saas.com/percentage-calculator',
            '/mortgage-calculator?homePrice=500000&downPayment=100000' => 'https://tool4saas.com/mortgage-calculator',
            '/tip-calculator?bill=100&tip=20&people=4' => 'https://tool4saas.com/tip-calculator',
            '/discount-calculator?price=200&discount=30' => 'https://tool4saas.com/discount-calculator',
        ];

        foreach ($routes as $url => $canonical) {
            $response = $this->get($url);
            $response->assertStatus(200);

            $content = (string) $response->getContent();
            // Canonical must always be the clean non-parameterized URL to prevent duplicate content
            expect($content)->toContain('<link rel="canonical" href="'.$canonical.'">');
        }
    }
}
