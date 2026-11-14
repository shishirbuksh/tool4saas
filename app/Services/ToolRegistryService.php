<?php

declare(strict_types=1);

namespace App\Services;

use App\DTOs\CategoryDTO;
use App\DTOs\ToolDTO;
use RuntimeException;

final class ToolRegistryService
{
    /** @var array<string, ToolDTO>|null */
    private static ?array $toolsMap = null;

    /** @var array<string, CategoryDTO>|null */
    private static ?array $categoriesMap = null;

    /** @var list<ToolDTO>|null */
    private static ?array $toolsList = null;

    /** @var list<CategoryDTO>|null */
    private static ?array $categoriesList = null;

    private function boot(): void
    {
        if (self::$toolsMap !== null) {
            return;
        }

        $categoriesRaw = config('categories', []);
        $toolsRaw = config('tools', []);

        if (empty($categoriesRaw)) {
            $catFile = config_path('categories.php');
            if (file_exists($catFile)) {
                $categoriesRaw = require $catFile;
            }
        }

        if (empty($toolsRaw)) {
            $toolFile = config_path('tools.php');
            if (file_exists($toolFile)) {
                $toolsRaw = require $toolFile;
            }
        }

        self::$categoriesMap = [];
        self::$categoriesList = [];
        foreach ($categoriesRaw as $catData) {
            $cat = CategoryDTO::fromArray($catData);
            self::$categoriesMap[$cat->id] = $cat;
            self::$categoriesList[] = $cat;
        }

        self::$toolsMap = [];
        self::$toolsList = [];
        foreach ($toolsRaw as $toolData) {
            $tool = ToolDTO::fromArray($toolData);
            self::$toolsMap[$tool->slug] = $tool;
            self::$toolsList[] = $tool;
        }
    }

    /**
     * @return list<ToolDTO>
     */
    public function all(): array
    {
        $this->boot();

        return self::$toolsList ?? [];
    }

    /**
     * @return list<ToolDTO>
     */
    public function getAllTools(): array
    {
        return $this->all();
    }

    /**
     * @return list<CategoryDTO>
     */
    public function categories(): array
    {
        $this->boot();

        return self::$categoriesList ?? [];
    }

    /**
     * @return list<CategoryDTO>
     */
    public function getAllCategories(): array
    {
        return $this->categories();
    }

    public function findBySlug(string $slug): ?ToolDTO
    {
        $this->boot();

        return self::$toolsMap[$slug] ?? null;
    }

    public function getBySlug(string $slug): ?ToolDTO
    {
        return $this->findBySlug($slug);
    }

    public function getBySlugOrThrow(string $slug): ToolDTO
    {
        $tool = $this->findBySlug($slug);
        if ($tool === null) {
            throw new RuntimeException("Tool not found: {$slug}");
        }

        return $tool;
    }

    public function findCategory(string $id): ?CategoryDTO
    {
        $this->boot();

        return self::$categoriesMap[$id] ?? null;
    }

    public function getCategory(string $id): ?CategoryDTO
    {
        return $this->findCategory($id);
    }

    /**
     * @return list<ToolDTO>
     */
    public function getByCategory(string $categoryId): array
    {
        $this->boot();

        return array_values(array_filter(
            self::$toolsList ?? [],
            fn (ToolDTO $t) => $t->category === $categoryId
        ));
    }

    /**
     * @return array{total: int, categories: int, visible: int}
     */
    public function counts(): array
    {
        $this->boot();
        $all = self::$toolsList ?? [];
        $visible = count(array_filter($all, fn (ToolDTO $t) => ! $t->isNoindex));

        return [
            'total' => count($all),
            'categories' => count(self::$categoriesList ?? []),
            'visible' => $visible,
        ];
    }
}
