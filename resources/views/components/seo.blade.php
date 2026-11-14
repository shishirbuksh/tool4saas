@props([
    'title',
    'description',
    'canonical',
    'isNoindex' => false,
    'jsonLd' => null,
    'ogImage' => null,
])

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
@if($ogImage)
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
@endif

{{-- Twitter --}}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ $title }}">
<meta name="twitter:description" content="{{ $description }}">
@if($ogImage)
    <meta name="twitter:image" content="{{ $ogImage }}">
@endif

{{-- Structured Data (JSON-LD) --}}
@if($jsonLd)
    <script type="application/ld+json" nonce="{{ request()->attributes->get('csp_nonce') }}">
        {!! json_encode($jsonLd, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}
    </script>
@endif
