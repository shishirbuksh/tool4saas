<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class HandleLegacyRedirects
{
    /** @var array<string, string>|null */
    private static ?array $redirects = null;

    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (self::$redirects === null) {
            self::$redirects = config('redirects', []);
            if (empty(self::$redirects)) {
                $file = config_path('redirects.php');
                if (file_exists($file)) {
                    self::$redirects = require $file;
                }
            }
        }

        // 1. Permanent 301 redirect for URLs with trailing slashes (canonical normalization)
        $rawUri = $request->getRequestUri();
        $parsedPath = parse_url($rawUri, PHP_URL_PATH);

        if (is_string($parsedPath) && strlen($parsedPath) > 1 && str_ends_with($parsedPath, '/')) {
            $cleanPath = rtrim($parsedPath, '/');
            $query = $request->getQueryString();
            $dest = $cleanPath.($query !== null && $query !== '' ? '?'.$query : '');

            return redirect()->to($dest, 301);
        }

        $path = '/'.ltrim($request->path(), '/');

        if (isset(self::$redirects[$path])) {
            $destination = self::$redirects[$path];
            $query = $request->getQueryString();
            if ($query !== null && $query !== '') {
                $destination .= '?'.$query;
            }

            return redirect()->to($destination, 301);
        }

        // Fallback: Strip legacy multi-language prefixes (/es, /fr) and 301 redirect to English canonical
        if (preg_match('#^/(?:es|fr)(/.*)?$#i', $path, $matches)) {
            $remaining = (! empty($matches[1])) ? $matches[1] : '/';
            $query = $request->getQueryString();
            if ($query !== null && $query !== '') {
                $remaining .= '?'.$query;
            }

            return redirect()->to($remaining, 301);
        }

        return $next($request);
    }
}
