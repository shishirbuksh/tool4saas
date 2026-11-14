<?php

declare(strict_types=1);

namespace App\Services;

use App\DTOs\BlogPostDTO;
use App\DTOs\CategoryDTO;
use App\DTOs\ToolDTO;

final class SeoService
{
    public const string BRAND_SUFFIX = ' | Tool4SaaS';

    public const int MIN_TITLE = 50;

    public const int MAX_TITLE = 60;

    /** @var list<string> */
    private const array BENEFIT_PADS = [
        ' - Fast, Free & Private Browser Tool',
        ' - Free Private Browser Utility',
        ' - Free Online Browser Tool',
        ' - Complete Guide & Tutorial',
        ' - Step-by-Step Guide & Tips',
        ' - Free Calculation Tool',
        ' - Free Online Generator',
        ' - Free Online Converter',
        ' - Free Online Utility',
        ' - Free Step-by-Step Guide',
        ' - Free Online Tool',
        ' - Complete Guide',
        ' - Free Tool Online',
        ' - Free Guide',
        ' - Online Tool',
        ' - Free Online',
        ' - Free Tool',
        ' - Free',
        ' Online',
    ];

    /** @var list<string> */
    private const array DESC_BENEFIT_PADS = [
        ' 100% free, private, and runs entirely in your browser.',
        ' Free, private, and runs locally on your device.',
        ' Fast, free, and runs securely in your browser.',
        ' Free, local-first, and requires no registration.',
        ' Fast, free, and runs privately on your device.',
        ' Free, private, and requires no account signup.',
        ' Free and runs securely in your browser.',
        ' Free and runs privately on your device.',
        ' Free, private, and requires no signup.',
        ' Free, private, and works offline.',
        ' Free, private, and no signup.',
        ' Free and runs in your browser.',
        ' Free, private, and offline.',
        ' Free and works offline.',
        ' Free, with no signup.',
        ' Free and private.',
        ' Free online.',
    ];

    public function fitMetaTitle(string $primary, string $suffix = self::BRAND_SUFFIX): string
    {
        $title = $this->normalize($primary);
        if ($title === '') {
            return trim($suffix);
        }

        $withSuffix = $title.$suffix;
        $len = mb_strlen($withSuffix);
        if ($len >= self::MIN_TITLE && $len <= self::MAX_TITLE) {
            return $withSuffix;
        }

        // If too short, append benefit pad
        if ($len < self::MIN_TITLE) {
            foreach (self::BENEFIT_PADS as $pad) {
                $candidate = $title.$pad.$suffix;
                $cLen = mb_strlen($candidate);
                if ($cLen >= self::MIN_TITLE && $cLen <= self::MAX_TITLE) {
                    return $candidate;
                }
            }
        }

        // If too long, cut words cleanly
        if ($len > self::MAX_TITLE) {
            $words = explode(' ', $title);
            while (count($words) > 1) {
                array_pop($words);
                $joined = $this->trimTrailingPunctuation(implode(' ', $words));
                $totalLen = mb_strlen($joined.$suffix);
                if ($totalLen >= self::MIN_TITLE && $totalLen <= self::MAX_TITLE) {
                    return $joined.$suffix;
                }
                if ($totalLen < self::MIN_TITLE) {
                    foreach (self::BENEFIT_PADS as $pad) {
                        $padded = $joined.$pad.$suffix;
                        $pLen = mb_strlen($padded);
                        if ($pLen >= self::MIN_TITLE && $pLen <= self::MAX_TITLE) {
                            return $padded;
                        }
                    }
                    break;
                }
            }
        }

        return $withSuffix;
    }

    public function fitMetaDescription(string $desc): string
    {
        $text = $this->normalize($desc);
        $len = mb_strlen($text);
        if ($len >= 60 && $len <= 160) {
            return $text;
        }

        if ($len > 160) {
            $candidate = mb_substr($text, 0, 160);
            $lastPunct = max(mb_strrpos($candidate, '. ') ?: -1, mb_strrpos($candidate, '; ') ?: -1);
            if ($lastPunct >= 135) {
                return trim(mb_substr($candidate, 0, $lastPunct + 1));
            }
            $lastSpace = mb_strrpos($candidate, ' ') ?: -1;
            if ($lastSpace >= 135) {
                return rtrim(mb_substr($candidate, 0, $lastSpace), " \t\n\r\0\x0B,;:—–-").'.';
            }

            return trim(mb_substr($candidate, 0, 157)).'...';
        }

        foreach (self::DESC_BENEFIT_PADS as $pad) {
            $candidate = str_ends_with($text, '.') ? mb_substr($text, 0, -1).'.'.$pad : $text.'.'.$pad;
            $cLen = mb_strlen($candidate);
            if ($cLen >= 60 && $cLen <= 160) {
                return $candidate;
            }
        }

        return $text;
    }

    public function toolMetaTitle(ToolDTO $tool): string
    {
        $preferred = $this->normalize($tool->seoTitle ?? $tool->title);
        $candidate = "{$preferred} - {$this->normalize($tool->short)}";
        $fitted = $this->fitMetaTitle($candidate);
        if (mb_strlen($fitted) >= self::MIN_TITLE && mb_strlen($fitted) <= self::MAX_TITLE) {
            return $fitted;
        }

        return $this->fitMetaTitle($preferred);
    }

    public function formatTitle(string $title, ?string $seoTitle = null): string
    {
        $preferred = $this->normalize($seoTitle ?? $title);

        return $this->fitMetaTitle($preferred);
    }

    public function formatDescription(string $description): string
    {
        return $this->fitMetaDescription($this->normalize($description));
    }

    /**
     * @return array<string, mixed>
     */
    public function buildToolJsonLd(ToolDTO $tool, string $baseUrl): array
    {
        $url = rtrim($baseUrl, '/').'/'.$tool->slug;

        $categoryMap = [
            'business' => 'BusinessApplication',
            'developer' => 'DeveloperApplication',
            'finance' => 'FinanceApplication',
            'health' => 'HealthApplication',
            'images-design' => 'DesignApplication',
            'calculators' => 'UtilitiesApplication',
            'converters' => 'UtilitiesApplication',
            'generators' => 'UtilitiesApplication',
            'pdf' => 'UtilitiesApplication',
            'seo' => 'UtilitiesApplication',
            'text-documents' => 'UtilitiesApplication',
            'time' => 'UtilitiesApplication',
        ];

        $appCategory = $categoryMap[$tool->category] ?? 'UtilitiesApplication';

        $graph = [
            [
                '@context' => 'https://schema.org',
                '@type' => 'WebApplication',
                '@id' => "{$url}#webapp",
                'url' => $url,
                'name' => $tool->title,
                'applicationCategory' => $appCategory,
                'operatingSystem' => 'Any',
                'browserRequirements' => 'Requires JavaScript. Works in all modern browsers.',
                'description' => $tool->description,
                'isAccessibleForFree' => true,
                'offers' => [
                    '@type' => 'Offer',
                    'price' => '0',
                    'priceCurrency' => 'USD',
                ],
                'featureList' => array_slice($tool->keywords, 0, 5),
            ],
            [
                '@context' => 'https://schema.org',
                '@type' => 'BreadcrumbList',
                'itemListElement' => [
                    [
                        '@type' => 'ListItem',
                        'position' => 1,
                        'name' => 'Home',
                        'item' => $baseUrl,
                    ],
                    [
                        '@type' => 'ListItem',
                        'position' => 2,
                        'name' => $tool->categoryEnum()->label(),
                        'item' => rtrim($baseUrl, '/').'/category/'.$tool->category,
                    ],
                    [
                        '@type' => 'ListItem',
                        'position' => 3,
                        'name' => $tool->title,
                        'item' => $url,
                    ],
                ],
            ],
        ];

        if (! empty($tool->faq)) {
            $faqElements = [];
            foreach ($tool->faq as $f) {
                $faqElements[] = [
                    '@type' => 'Question',
                    'name' => $f['question'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => $f['answer'],
                    ],
                ];
            }
            $graph[] = [
                '@context' => 'https://schema.org',
                '@type' => 'FAQPage',
                'mainEntity' => $faqElements,
            ];
        }

        return ['@graph' => $graph];
    }

    /**
     * @return array<string, mixed>
     */
    public function generateBlogPostJsonLd(BlogPostDTO $post, string $baseUrl, ?string $pillarTitle = null): array
    {
        $base = rtrim($baseUrl, '/');
        $canonical = $post->kind === 'pillar'
            ? "{$base}/blog/{$post->pillar}"
            : "{$base}/blog/{$post->pillar}/{$post->slug}";

        $ogImage = $post->kind === 'pillar'
            ? "{$base}/og/blog/{$post->pillar}.png"
            : "{$base}/og/blog/{$post->pillar}/{$post->slug}.png";

        $crumbs = $post->kind === 'pillar'
            ? [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => "{$base}/"],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Blog', 'item' => "{$base}/blog"],
                ['@type' => 'ListItem', 'position' => 3, 'name' => $post->title, 'item' => $canonical],
            ]
            : [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => "{$base}/"],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Blog', 'item' => "{$base}/blog"],
                ['@type' => 'ListItem', 'position' => 3, 'name' => $pillarTitle ?? $post->pillar, 'item' => "{$base}/blog/{$post->pillar}"],
                ['@type' => 'ListItem', 'position' => 4, 'name' => $post->title, 'item' => $canonical],
            ];

        $authorPerson = [
            '@type' => 'Person',
            'name' => 'Tool4SaaS Editorial Team',
            'jobTitle' => 'Tools Reviewer',
            'url' => "{$base}/author",
            'worksFor' => [
                '@type' => 'Organization',
                'name' => 'Tool4SaaS',
                'url' => $base,
            ],
        ];

        $graph = [
            [
                '@type' => 'BlogPosting',
                '@id' => "{$canonical}#article",
                'headline' => $post->title,
                'description' => $post->description,
                'url' => $canonical,
                'image' => $ogImage,
                'inLanguage' => 'en',
                'datePublished' => $post->published,
                'dateModified' => $post->updated,
                'author' => $authorPerson,
                'reviewer' => $authorPerson,
                'publisher' => [
                    '@type' => 'Organization',
                    'name' => 'Tool4SaaS',
                    'url' => $base,
                ],
                'mainEntityOfPage' => [
                    '@type' => 'WebPage',
                    '@id' => $canonical,
                ],
            ],
            [
                '@type' => 'BreadcrumbList',
                'itemListElement' => $crumbs,
            ],
        ];

        if (! empty($post->faqs)) {
            $faqElements = [];
            foreach ($post->faqs as $f) {
                $faqElements[] = [
                    '@type' => 'Question',
                    'name' => $f['question'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => $f['answer'],
                    ],
                ];
            }
            $graph[] = [
                '@type' => 'FAQPage',
                'mainEntity' => $faqElements,
            ];
        }

        return [
            '@context' => 'https://schema.org',
            '@graph' => $graph,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function buildHomeJsonLd(string $baseUrl): array
    {
        $base = rtrim($baseUrl, '/');

        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'WebSite',
                    '@id' => "{$base}/#website",
                    'url' => "{$base}/",
                    'name' => 'Tool4SaaS',
                    'description' => 'Free, private online tools for PDFs, images, text, and calculators. Zero cloud data transmission.',
                    'inLanguage' => 'en',
                    'potentialAction' => [
                        '@type' => 'SearchAction',
                        'target' => "{$base}/?q={search_term_string}",
                        'query-input' => 'required name=search_term_string',
                    ],
                ],
                [
                    '@type' => 'Organization',
                    '@id' => "{$base}/#organization",
                    'name' => 'Tool4SaaS',
                    'url' => "{$base}/",
                    'logo' => [
                        '@type' => 'ImageObject',
                        'url' => "{$base}/og/home.png",
                        'width' => 1200,
                        'height' => 630,
                    ],
                ],
            ],
        ];
    }

    /**
     * @param  list<ToolDTO>  $tools
     * @return array<string, mixed>
     */
    public function buildCategoryJsonLd(CategoryDTO $category, array $tools, string $baseUrl): array
    {
        $base = rtrim($baseUrl, '/');
        $canonical = "{$base}/category/{$category->id}";

        $itemList = [];
        foreach ($tools as $idx => $tool) {
            $itemList[] = [
                '@type' => 'ListItem',
                'position' => $idx + 1,
                'name' => $tool->title,
                'url' => "{$base}/{$tool->slug}",
            ];
        }

        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'CollectionPage',
                    '@id' => "{$canonical}#collection",
                    'url' => $canonical,
                    'name' => "{$category->label} Tools",
                    'description' => $category->description,
                    'inLanguage' => 'en',
                    'isPartOf' => [
                        '@type' => 'WebSite',
                        'name' => 'Tool4SaaS',
                        'url' => "{$base}/",
                    ],
                ],
                [
                    '@type' => 'ItemList',
                    'itemListElement' => $itemList,
                ],
                [
                    '@type' => 'BreadcrumbList',
                    'itemListElement' => [
                        [
                            '@type' => 'ListItem',
                            'position' => 1,
                            'name' => 'Home',
                            'item' => "{$base}/",
                        ],
                        [
                            '@type' => 'ListItem',
                            'position' => 2,
                            'name' => $category->label,
                            'item' => $canonical,
                        ],
                    ],
                ],
            ],
        ];
    }

    private function normalize(string $text): string
    {
        return trim((string) preg_replace('/\s+/', ' ', $text));
    }

    private function trimTrailingPunctuation(string $text): string
    {
        return trim((string) preg_replace('/[\s,;:|—–\-&+]+$/u', '', $text));
    }
}
