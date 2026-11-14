@props([
    'title',
    'description',
    'canonical',
    'isNoindex' => false,
    'jsonLd' => null,
    'ogImage' => null,
])

@php
    $finalOgImage = $ogImage;
    if (! $finalOgImage) {
        $path = trim(request()->path(), '/');
        if ($path === '' || $path === '/') {
            $finalOgImage = url('/og/home.png');
        } elseif (str_starts_with($path, 'blog/')) {
            $parts = explode('/', $path);
            if (count($parts) >= 3) {
                $finalOgImage = url('/og/blog/'.$parts[1].'/'.$parts[2].'.png');
            } elseif (count($parts) === 2) {
                $finalOgImage = url('/og/blog/'.$parts[1].'.png');
            } else {
                $finalOgImage = url('/og/home.png');
            }
        } elseif (str_starts_with($path, 'category/')) {
            $catId = substr($path, strlen('category/'));
            $finalOgImage = url('/og/category-'.$catId.'.png');
        } elseif (in_array($path, ['about', 'contact', 'privacy', 'terms', 'methodology', 'author', 'sitemap'], true)) {
            $finalOgImage = url('/og/static-'.$path.'.png');
        } else {
            $finalOgImage = url('/og/'.$path.'.png');
        }
    }
@endphp

<title>{{ $title }}</title>
<meta name="description" content="{{ $description }}">
<link rel="canonical" href="{{ $canonical }}">

@if($isNoindex)
    <meta name="robots" content="noindex, follow">
@else
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
@endif

{{-- Open Graph --}}
<meta property="og:type" content="website">
<meta property="og:url" content="{{ $canonical }}">
<meta property="og:title" content="{{ $title }}">
<meta property="og:description" content="{{ $description }}">
<meta property="og:site_name" content="Tool4SaaS">
<meta property="og:locale" content="en_US">
<meta property="og:image" content="{{ $finalOgImage }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{{ $title }}">

{{-- Twitter --}}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ $title }}">
<meta name="twitter:description" content="{{ $description }}">
<meta name="twitter:image" content="{{ $finalOgImage }}">
<meta name="twitter:image:alt" content="{{ $title }}">

{{-- Structured Data (JSON-LD) --}}
@if($jsonLd)
    <script type="application/ld+json" nonce="{{ request()->attributes->get('csp_nonce') }}">
        {!! json_encode($jsonLd, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}
    </script>
@endif
