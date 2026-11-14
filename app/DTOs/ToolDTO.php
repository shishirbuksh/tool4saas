<?php

declare(strict_types=1);

namespace App\DTOs;

use App\Enums\ToolCategory;
use App\Enums\YmylType;

final readonly class ToolDTO
{
    /**
     * @param  list<string>  $keywords
     * @param  list<array{question: string, answer: string}>  $faq
     * @param  list<array{name: string, text: string}>  $howTo
     * @param  list<array{heading: string, body: string, paragraphs?: list<string>, table?: array{caption?: string, headers: list<string>, rows: list<list<string|int|float>>}}>  $guide
     */
    public function __construct(
        public string $slug,
        public string $title,
        public string $short,
        public string $description,
        public string $icon,
        public array $keywords,
        public string $category,
        public array $faq,
        public array $howTo,
        public array $guide = [],
        public ?string $seoTitle = null,
        public bool $isNoindex = false,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        $noindexSlugs = ['pdf-compress', 'fancy-text-generator'];

        /** @var list<string> $keywords */
        $keywords = array_values((array) ($data['keywords'] ?? []));
        /** @var list<array{question: string, answer: string}> $faq */
        $faq = array_values((array) ($data['faq'] ?? []));
        /** @var list<array{name: string, text: string}> $howTo */
        $howTo = array_values((array) ($data['howTo'] ?? []));
        /** @var list<array{heading: string, body: string, paragraphs?: list<string>, table?: array{caption?: string, headers: list<string>, rows: list<list<string|int|float>>}}> $guide */
        $guide = array_values((array) ($data['guide'] ?? []));

        return new self(
            slug: (string) $data['slug'],
            title: (string) $data['title'],
            short: (string) $data['short'],
            description: (string) $data['description'],
            icon: (string) ($data['icon'] ?? 'Tool'),
            keywords: $keywords,
            category: (string) $data['category'],
            faq: $faq,
            howTo: $howTo,
            guide: $guide,
            seoTitle: isset($data['seoTitle']) ? (string) $data['seoTitle'] : null,
            isNoindex: in_array((string) $data['slug'], $noindexSlugs, true),
        );
    }

    public function categoryEnum(): ToolCategory
    {
        return ToolCategory::from($this->category);
    }

    public function ymylType(): YmylType
    {
        if ($this->category === 'finance') {
            return YmylType::Finance;
        }

        if ($this->category === 'health') {
            return YmylType::Health;
        }

        $financeOverrides = [
            'tip-calculator',
            'gst-calculator',
            'discount-calculator',
            'percentage-calculator',
            'us-sales-tax-calculator',
            'commission-calculator',
        ];

        if (in_array($this->slug, $financeOverrides, true)) {
            return YmylType::Finance;
        }

        if ($this->slug === 'bmi-calculator') {
            return YmylType::Health;
        }

        return YmylType::General;
    }

    public function displayTitle(): string
    {
        return $this->seoTitle ?? $this->title;
    }
}
