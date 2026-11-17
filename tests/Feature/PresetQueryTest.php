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
            '/image-compressor?target=100' => 'https://tool4saas.com/image-compressor',
            '/in-hand-salary-india?ctc=1500000&regime=new' => 'https://tool4saas.com/in-hand-salary-india',
            '/salary-calculator?gross=100000&freq=26' => 'https://tool4saas.com/salary-calculator',
            '/qr-code-generator?type=wifi' => 'https://tool4saas.com/qr-code-generator',
            '/base64-tool?urlsafe=1' => 'https://tool4saas.com/base64-tool',
            '/json-csv?mode=csv2json' => 'https://tool4saas.com/json-csv',
            '/utm-builder?channel=google_ads' => 'https://tool4saas.com/utm-builder',
            '/signature-maker?transparent=1' => 'https://tool4saas.com/signature-maker',
            '/grade-calculator?mode=final&current=85&target=90&weight=30' => 'https://tool4saas.com/grade-calculator',
            '/profit-margin-calculator?cost=50&revenue=120' => 'https://tool4saas.com/profit-margin-calculator',
            '/debt-payoff-calculator?balance=15000&rate=18&payment=500' => 'https://tool4saas.com/debt-payoff-calculator',
            '/age-calculator?dob=2000-01-01' => 'https://tool4saas.com/age-calculator',
            '/calorie-calculator?age=28&sex=male&weight=75&height=178' => 'https://tool4saas.com/calorie-calculator',
            '/water-intake-calculator?weight=70&unit=kg' => 'https://tool4saas.com/water-intake-calculator',
            '/bmi-calculator?unit=metric&height=175&weight=70' => 'https://tool4saas.com/bmi-calculator',
            '/compound-interest-calculator?principal=10000&rate=8&years=10&freq=12' => 'https://tool4saas.com/compound-interest-calculator',
            '/us-sales-tax-calculator?state=California&subtotal=100' => 'https://tool4saas.com/us-sales-tax-calculator',
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
