<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;
use Symfony\Component\HttpFoundation\Response;

final class HandleLegacyRedirects
{
    /** @var array<string, string>|null */
    private static ?array $redirects = null;

    /** @var list<string> */
    private const array TRACKING_PARAMS = [
        'fbclid',
        'gclid',
        'gclsrc',
        'dclid',
        'wbraid',
        'gbraid',
        'msclkid',
        'ref',
        'ref_src',
        'source',
        'campaign',
        '_ga',
        '_gl',
        'mc_eid',
    ];

    /** @var list<string> */
    private const array TOOL_WHITELIST_PARAMS = [
        'monthly', 'years', 'rate', 'base', 'homePrice', 'downPayment',
        'bill', 'tip', 'people', 'price', 'discount', 'target', 'ctc',
        'regime', 'gross', 'freq', 'type', 'urlsafe', 'mode', 'channel',
        'transparent', 'current', 'weight', 'cost', 'revenue', 'balance',
        'payment', 'dob', 'age', 'sex', 'unit', 'height', 'principal',
        'state', 'subtotal', 'token', 'length', 'symbols', 'income',
        'expenses', 'weeks', 'hours', 'billable', 'initial', 'final',
        'tenure', 'deposit', 'amount', 'down', 'term', 'time', 'spend',
        'retire', 'savings', 'rent', 'debt', 'cron', 'hex', 'pattern',
        'n1', 'd1', 'op', 'n2', 'd2', 'extra', 'cycle', 'date', 'buy',
        'sell', 'new', 'costs', 'reps', 'start', 'end', 'text', 'work',
        'break', 'count', 'version', 'cat', 'val', 'from', 'to',
        'loan', 'sales', 'currency', 'emi',
        'activity', 'attended', 'bed', 'birthDate', 'cgpa', 'climate',
        'color', 'content', 'days', 'delimiter', 'diffA', 'diffB',
        'hyphens', 'includeTax', 'input', 'insurance', 'interestRate',
        'loanYears', 'medium', 'monthlyPayment', 'name', 'newVal',
        'numbers', 'oldVal', 'partX', 'propertyTax', 'scale', 'size',
        'tab', 'targetDate', 'tax', 'taxRate', 'total', 'tradein',
        'uppercase', 'url', 'wake', 'wholeY',
    ];

    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $host = $request->getHost();
        if ($host === 'tool4saas.com' || $host === 'www.tool4saas.com') {
            $urlGenerator = app(UrlGenerator::class);
            $urlGenerator->forceScheme('https');
            $urlGenerator->forceRootUrl('https://tool4saas.com');
        }

        // Only inspect safe HTTP methods (GET, HEAD)
        if (! $request->isMethodSafe()) {
            return $next($request);
        }

        // Pass through API and binary asset routes untouched
        if ($request->is('api/*') || $request->is('og/*')) {
            return $next($request);
        }

        if (self::$redirects === null) {
            self::$redirects = config('redirects', []);
            if (empty(self::$redirects)) {
                $file = config_path('redirects.php');
                if (file_exists($file)) {
                    /** @var array<string, string> $loaded */
                    $loaded = require $file;
                    self::$redirects = $loaded;
                }
            }
        }

        $rawUri = $request->getRequestUri();
        $parsedPath = parse_url($rawUri, PHP_URL_PATH);
        if (! is_string($parsedPath) || $parsedPath === '') {
            $parsedPath = '/';
        }

        $pathChanged = false;
        $workingPath = $parsedPath;

        // 1. Strip legacy multi-language prefixes (/es, /fr, /de, etc.)
        if (preg_match('#^/(?:es|fr|de|it|pt|ru|ja|zh|hi|ar|nl|pl|tr|vi|id|[a-z]{2}-[a-z]{2})(/.*)?$#i', $workingPath, $matches)) {
            $workingPath = (! empty($matches[1])) ? $matches[1] : '/';
            $pathChanged = true;
        }

        // 2. Strip index.html / index.php / index
        if (str_ends_with($workingPath, '/index.html') || str_ends_with($workingPath, '/index.php') || str_ends_with($workingPath, '/index')) {
            $workingPath = preg_replace('#/(?:index\.html|index\.php|index)$#i', '', $workingPath) ?: '/';
            $pathChanged = true;
        }

        // 3. Lowercase path normalization
        $lowerPath = strtolower($workingPath);
        if ($lowerPath !== $workingPath) {
            $workingPath = $lowerPath;
            $pathChanged = true;
        }

        // 4. Trailing slash normalization (all paths except root / must not have trailing slash)
        if (strlen($workingPath) > 1 && str_ends_with($workingPath, '/')) {
            $workingPath = rtrim($workingPath, '/');
            $pathChanged = true;
        }

        // 5. Mapped legacy redirects
        if (isset(self::$redirects[$workingPath])) {
            $workingPath = self::$redirects[$workingPath];
            $pathChanged = true;
        }

        // 6. Query parameter sanitization and stripping
        $allParams = $request->query->all();
        $hasRawTrailingQuestion = str_ends_with($rawUri, '?');
        $queryChanged = false;
        /** @var array<string, mixed> $keptParams */
        $keptParams = [];

        // Check if route allows query parameters
        $isToolRoute = ($workingPath !== '/' && ! in_array($workingPath, ['/about', '/contact', '/privacy', '/terms', '/methodology', '/author', '/sitemap', '/blog', '/student-tools', '/developer-tools'], true) && ! str_starts_with($workingPath, '/category/') && ! str_starts_with($workingPath, '/blog/'));

        foreach ($allParams as $key => $val) {
            $lowerKey = strtolower((string) $key);

            // Strip any UTM parameter or known tracking query parameter
            if (str_starts_with($lowerKey, 'utm_') || in_array($lowerKey, self::TRACKING_PARAMS, true)) {
                $queryChanged = true;

                continue;
            }

            // If not a tool route, strip all query parameters
            if (! $isToolRoute) {
                $queryChanged = true;

                continue;
            }

            // On tool routes, keep only whitelisted functional preset parameters
            if (in_array((string) $key, self::TOOL_WHITELIST_PARAMS, true)) {
                $keptParams[$key] = $val;
            } else {
                $queryChanged = true;
            }
        }

        if ($hasRawTrailingQuestion && empty($keptParams)) {
            $queryChanged = true;
        }

        // 7. If either path or query was normalized, return 301 permanent redirect
        if ($pathChanged || $queryChanged) {
            $destination = $workingPath;
            if (! empty($keptParams)) {
                $destination .= '?'.http_build_query($keptParams);
            }

            return redirect()->to($destination, 301);
        }

        return $next($request);
    }
}
