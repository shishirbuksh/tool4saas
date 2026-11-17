<?php

declare(strict_types=1);

namespace App\DTOs;

use App\Enums\ToolCategory;

final readonly class CategoryDTO
{
    public function __construct(
        public string $id,
        public string $label,
        public string $description,
        public bool $indexable = true,
    ) {}

    /**
     * @param  array{id: string, label: string, description: string, indexable?: bool}  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'],
            label: $data['label'],
            description: $data['description'],
            indexable: (bool) ($data['indexable'] ?? true),
        );
    }

    public function toEnum(): ToolCategory
    {
        return ToolCategory::from($this->id);
    }

    public function isIndexable(): bool
    {
        if (! $this->indexable) {
            return false;
        }

        /** @var list<string> $noindexCategories */
        $noindexCategories = (array) config('indexing.noindex_categories', []);

        return ! in_array($this->id, $noindexCategories, true);
    }
}
