<?php

declare(strict_types=1);

/** @var array<string, mixed> $dates */
$dates = [];
$datesPath = storage_path('app/dates.json');
if (file_exists($datesPath)) {
    $decoded = json_decode((string) file_get_contents($datesPath), true);
    if (is_array($decoded)) {
        $dates = $decoded;
    }
}

return $dates;
