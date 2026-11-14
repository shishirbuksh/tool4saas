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
}
