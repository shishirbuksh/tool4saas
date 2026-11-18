<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class SslCheckRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        return [
            'domain' => ['required', 'string'],
        ];
    }

    public function normalizedDomain(): string
    {
        $rawHost = (string) $this->input('domain', '');
        $host = trim(strtolower($rawHost));
        $host = (string) preg_replace('#^https?://#i', '', $host);

        return (string) preg_replace('#[:/].*$#', '', $host);
    }

    public function isValidFqdn(string $host): bool
    {
        return (bool) preg_match('/^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})+$/i', $host);
    }
}
