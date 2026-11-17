<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | Category-Level Indexing Governance
    |--------------------------------------------------------------------------
    | Toggles indexing for categories. When a category ID is listed in
    | `noindex_categories`, the category hub page and all tools within that
    | category emit `<meta name="robots" content="noindex, follow">` and are
    | automatically excluded from XML and HTML sitemaps.
    |
    | Low-differentiation YMYL categories (health, finance) can be cleanly
    | toggled to focus Google crawl budget on core developer, SEO & productivity tools.
    */
    'noindex_categories' => env('INDEXING_NOINDEX_YMYL', false)
        ? ['health', 'finance']
        : (array) (env('INDEXING_NOINDEX_CATEGORIES') ? explode(',', (string) env('INDEXING_NOINDEX_CATEGORIES')) : []),

    /*
    |--------------------------------------------------------------------------
    | Tool-Level Indexing Overrides
    |--------------------------------------------------------------------------
    | Specific tool slugs that should emit `<meta name="robots" content="noindex, follow">`
    | and be excluded from XML and HTML sitemaps.
    */
    'noindex_tools' => [
        'pdf-compress',
        'fancy-text-generator',
    ],
];
