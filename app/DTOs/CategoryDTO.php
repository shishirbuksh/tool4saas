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
    ) {}

    /**
     * @param  array{id: string, label: string, description: string}  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'],
            label: $data['label'],
            description: $data['description'],
        );
    }

    public function toEnum(): ToolCategory
    {
        return ToolCategory::from($this->id);
    }
}
