<?php

declare(strict_types=1);

namespace App\Services;

use App\DTOs\ToolDTO;

final class RelatedToolsService
{
    public function __construct(
        private readonly ToolRegistryService $registry,
    ) {}

    /**
     * @return array{
     *     seeAlso: list<array{slug: string, title: string, short: string}>,
     *     relatedTools: list<array{slug: string, title: string, short: string}>,
     *     heading: string
     * }
     */
    public function compute(ToolDTO $tool): array
    {
        $allTools = $this->registry->all();
        $sameCategory = array_values(array_filter(
            $allTools,
            fn (ToolDTO $t) => $t->category === $tool->category && ! $t->isNoindex
        ));

        $toolIdx = -1;
        foreach ($sameCategory as $idx => $cand) {
            if ($cand->slug === $tool->slug) {
                $toolIdx = $idx;
                break;
            }
        }

        $rotatedSameCat = [];
        $countSame = count($sameCategory);
        if ($toolIdx >= 0 && $countSame > 1) {
            for ($i = 1; $i < $countSame; $i++) {
                $cand = $sameCategory[($toolIdx + $i) % $countSame];
                if ($cand->slug !== $tool->slug) {
                    $rotatedSameCat[] = $cand;
                }
            }
        } else {
            foreach ($sameCategory as $cand) {
                if ($cand->slug !== $tool->slug) {
                    $rotatedSameCat[] = $cand;
                }
            }
        }

        $seeAlso = array_map(
            fn (ToolDTO $t) => ['slug' => $t->slug, 'title' => $t->title, 'short' => $t->short],
            array_slice($rotatedSameCat, 0, 2)
        );

        $crossCategory = array_values(array_filter(
            $allTools,
            fn (ToolDTO $t) => $t->category !== $tool->category && $t->slug !== $tool->slug && ! $t->isNoindex
        ));

        $merged = array_merge($rotatedSameCat, $crossCategory);
        $relatedTools = array_map(
            fn (ToolDTO $t) => ['slug' => $t->slug, 'title' => $t->title, 'short' => $t->short],
            array_slice($merged, 0, 6)
        );

        $cat = $this->registry->findCategory($tool->category);
        $heading = 'More '.($cat !== null ? $cat->label : 'tools');

        return [
            'seeAlso' => $seeAlso,
            'relatedTools' => $relatedTools,
            'heading' => $heading,
        ];
    }
}
