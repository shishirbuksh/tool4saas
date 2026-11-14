<?php

declare(strict_types=1);

namespace App\DTOs;

final readonly class BlogPillarDTO
{
    /**
     * @param  list<string>  $keywords
     */
    public function __construct(
        public string $pillar,
        public string $title,
        public string $shortLabel,
        public string $description,
        public string $toolSlug,
        public array $keywords,
        public string $updated,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        /** @var list<string> $keywords */
        $keywords = array_values((array) ($data['keywords'] ?? []));

        return new self(
            pillar: (string) ($data['pillar'] ?? ''),
            title: (string) ($data['title'] ?? ''),
            shortLabel: (string) ($data['shortLabel'] ?? $data['pillar'] ?? ''),
            description: (string) ($data['description'] ?? ''),
            toolSlug: (string) ($data['toolSlug'] ?? ''),
            keywords: $keywords,
            updated: (string) ($data['updated'] ?? ''),
        );
    }
}
