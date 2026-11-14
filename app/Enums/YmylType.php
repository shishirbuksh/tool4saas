<?php

declare(strict_types=1);

namespace App\Enums;

enum YmylType: string
{
    case Finance = 'finance';
    case Health = 'health';
    case General = 'general';

    public function disclaimerHeading(): string
    {
        return match ($this) {
            self::Finance => 'Financial Information Notice',
            self::Health => 'Health & Medical Information Notice',
            self::General => 'Important Notice',
        };
    }

    public function disclaimerText(): string
    {
        return match ($this) {
            self::Finance => 'Calculations and estimates provided by this tool are for educational and informational purposes only. They do not constitute certified financial, tax, or legal advice. Always consult a qualified CPA, licensed financial advisor, or local tax authority before making significant financial commitments.',
            self::Health => 'Calculations and ranges provided by this tool are screening indicators only and do not constitute professional medical advice, clinical diagnosis, or personalized treatment plans. Always consult a qualified physician or registered healthcare provider for personalized medical evaluation.',
            self::General => 'All tools on Tool4SaaS process your data locally in your browser without uploading to external servers.',
        };
    }
}
