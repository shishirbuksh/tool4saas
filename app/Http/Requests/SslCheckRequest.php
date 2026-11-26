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
            'domain' => ['required', 'string', 'max:253'],
        ];
    }

    public function normalizedDomain(): string
    {
        $rawHost = (string) $this->input('domain', '');
        $host = trim(strtolower($rawHost));
        $host = (string) preg_replace('#^https?://#i', '', $host);
        $host = rtrim((string) preg_replace('#[:/].*$#', '', $host), '.');

        if ($host !== '' && function_exists('idn_to_ascii') && preg_match('/[^\x20-\x7E]/', $host)) {
            $ascii = @idn_to_ascii($host, IDNA_DEFAULT, INTL_IDNA_VARIANT_UTS46);
            if (is_string($ascii) && $ascii !== '') {
                $host = strtolower($ascii);
            }
        }

        return $host;
    }

    public function isValidFqdn(string $host): bool
    {
        return strlen($host) <= 253
            && (bool) preg_match('/^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})+$/i', $host);
    }
}
