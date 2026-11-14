<?php

declare(strict_types=1);

namespace App\Enums;

enum ToolCategory: string
{
    case Business = 'business';
    case Calculators = 'calculators';
    case Converters = 'converters';
    case Developer = 'developer';
    case Finance = 'finance';
    case Generators = 'generators';
    case Health = 'health';
    case ImagesDesign = 'images-design';
    case Pdf = 'pdf';
    case Seo = 'seo';
    case TextDocuments = 'text-documents';
    case Time = 'time';

    public function label(): string
    {
        return match ($this) {
            self::Business => 'Business & Writing',
            self::Calculators => 'Calculators',
            self::Converters => 'Converters',
            self::Developer => 'Developer Tools',
            self::Finance => 'Finance & Money',
            self::Generators => 'Generators',
            self::Health => 'Health & Fitness',
            self::ImagesDesign => 'Images & Design',
            self::Pdf => 'PDF Tools',
            self::Seo => 'SEO & Marketing',
            self::TextDocuments => 'Text & Documents',
            self::Time => 'Time & Date',
        };
    }
}
