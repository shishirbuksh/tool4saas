<?php

declare(strict_types=1);

namespace App\DTOs;

final readonly class BlogPostDTO
{
    /**
     * @param  list<string>  $keywords
     * @param  list<string>  $toolSlugs
     * @param  list<string>  $relatedSlugs
     * @param  list<array{id: string, text: string, level: int}>  $toc
     * @param  list<array{question: string, answer: string}>  $faqs
     */
    public function __construct(
        public string $pillar,
        public string $slug,
        public string $kind,
        public string $title,
        public string $description,
        public array $keywords,
        public array $toolSlugs,
        public array $relatedSlugs,
        public string $published,
        public string $updated,
        public int $readingMinutes,
        public array $toc,
        public string $html,
        public array $faqs,
        public bool $isNoindex = false,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        /** @var list<string> $keywords */
        $keywords = array_values((array) ($data['keywords'] ?? []));
        /** @var list<string> $toolSlugs */
        $toolSlugs = array_values((array) ($data['toolSlugs'] ?? []));
        /** @var list<string> $relatedSlugs */
        $relatedSlugs = array_values((array) ($data['relatedSlugs'] ?? []));
        /** @var list<array{id: string, text: string, level: int}> $toc */
        $toc = array_values((array) ($data['toc'] ?? []));
        /** @var list<array{question: string, answer: string}> $faqs */
        $faqs = array_values((array) ($data['faqs'] ?? []));

        return new self(
            pillar: (string) ($data['pillar'] ?? ''),
            slug: (string) ($data['slug'] ?? ''),
            kind: (string) ($data['kind'] ?? 'cluster'),
            title: (string) ($data['title'] ?? ''),
            description: (string) ($data['description'] ?? ''),
            keywords: $keywords,
            toolSlugs: $toolSlugs,
            relatedSlugs: $relatedSlugs,
            published: (string) ($data['published'] ?? '2026-09-14'),
            updated: (string) ($data['updated'] ?? '2026-11-03'),
            readingMinutes: (int) ($data['readingMinutes'] ?? 5),
            toc: $toc,
            html: (string) ($data['html'] ?? ''),
            faqs: $faqs,
            isNoindex: (bool) ($data['isNoindex'] ?? false),
        );
    }

    public function wordCount(): int
    {
        $text = strip_tags($this->html);
        $words = preg_split('/\s+/', trim($text));

        return $words === false ? 0 : count($words);
    }

    public function primaryToolUrl(): string
    {
        if (empty($this->toolSlugs)) {
            return '/';
        }

        $mainTool = $this->toolSlugs[0];

        /** @var array<string, string> $presets */
        $presets = [
            'sip-5000-10-years' => '/sip-calculator?monthly=5000&years=10&rate=12&currency=₹',
            'sip-1-crore-goal' => '/sip-calculator?monthly=10000&years=15&rate=12&currency=₹',
            'monthly-vs-yearly-compounding' => '/compound-interest-calculator',
            'tip-calculator-bill-split' => '/tip-calculator?bill=100&tip=18&people=4',
            'discount-and-sale-price' => '/discount-calculator?price=120&discount=25&tax=8',
            'percent-of-a-number' => '/percentage-calculator?rate=20&base=150',
            'percentage-increase-decrease' => '/percentage-calculator?tab=change&oldVal=100&newVal=125',
            'percentage-difference' => '/percentage-calculator?tab=diff&diffA=60&diffB=80',
            'how-to-calculate-mortgage-payment' => '/mortgage-calculator?homePrice=400000&downPayment=80000&interestRate=6.5&loanYears=30',
            '15-vs-30-year-mortgage' => '/mortgage-calculator?homePrice=400000&downPayment=80000&interestRate=6.5&loanYears=15',
            'should-i-refinance-my-mortgage' => '/refinance-calculator',
            'how-much-house-can-i-afford' => '/home-affordability-calculator',
            'mortgage-amortization-schedule' => '/mortgage-calculator',
            'down-payment-pmi-cost' => '/mortgage-calculator?homePrice=400000&downPayment=20000',
            'rent-vs-buy-house' => '/mortgage-calculator',
            'compress-jpg-100kb-portal' => '/image-compressor?target=100',
            'compress-jpg-20kb' => '/image-compressor?target=20',
            'compress-jpg-200kb' => '/image-compressor?target=200',
            'png-vs-jpg-vs-webp' => '/image-converter',
            'resize-image-exact-pixels' => '/image-resize',
            'png-to-webp-transparency' => '/image-converter',
            'strip-exif-before-upload' => '/exif-viewer',
            'crop-passport-photos' => '/image-crop',
            'compress-pdf-1mb-email' => '/pdf-merge',
            'merge-multiple-pdfs-order' => '/pdf-merge',
            'combine-pdf-and-images' => '/pdf-merge',
            'json-parse-errors' => '/json-formatter',
            'base64-url-safe-vs-standard' => '/base64-tool?urlsafe=1',
            'jwt-expiry-without-trust' => '/jwt-decoder',
            'cron-expression-guide' => '/cron-parser',
            'how-to-create-signature-online' => '/signature-maker',
            'transparent-signature-png' => '/signature-maker',
            'how-to-create-invoice-online' => '/invoice-generator',
            'freelancer-invoice-guide' => '/invoice-generator',
            'gst-invoice-format-india' => '/invoice-generator',
            'how-to-make-resume' => '/resume-builder',
            'ats-resume-guide' => '/ats-resume-checker',
            'wifi-qr-code-guide' => '/qr-code-generator?type=wifi',
            'upi-payment-qr-code-india' => '/qr-code-generator?type=upi',
            'vcard-contact-qr-code' => '/qr-code-generator?type=vcard',
            'how-to-create-strong-password' => '/password-generator',
            'what-makes-password-strong' => '/password-strength',
            'final-exam-grade-needed' => '/grade-calculator',
            'weighted-grade-calculation' => '/grade-calculator',
            'percentage-to-gpa' => '/gpa-calculator',
            'snowball-vs-avalanche' => '/debt-payoff-calculator',
            'how-to-pay-off-credit-card-debt' => '/debt-payoff-calculator',
            'calorie-deficit-for-weight-loss' => '/calorie-calculator',
            'daily-water-intake' => '/water-intake-calculator',
            'how-bmi-is-calculated' => '/bmi-calculator',
            'bmi-for-women' => '/bmi-calculator',
            'bmi-for-men' => '/bmi-calculator',
            'how-to-calculate-age' => '/age-calculator',
            'age-in-days-hours-minutes' => '/age-calculator',
        ];

        return $presets[$this->slug] ?? "/{$mainTool}";
    }

    public function primaryToolCtaText(): string
    {
        if (str_contains($this->primaryToolUrl(), '?')) {
            return 'Calculate This Scenario Live →';
        }

        return 'Open Live Tool Online →';
    }
}
