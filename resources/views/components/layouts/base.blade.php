<!DOCTYPE html>
<html lang="en" data-theme="wise-light" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#9fe870">

    {{-- Favicons & PWA Manifest --}}
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="icon" type="image/svg+xml" href="{{ asset('icon.svg') }}">
    <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">
    <link rel="manifest" href="{{ asset('manifest.webmanifest') }}">

    {{-- Anti-FOUC theme initializer --}}
    <script nonce="{{ request()->attributes->get('csp_nonce') }}">
        (function() {
            try {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = stored || (prefersDark ? 'wise-dark' : 'wise-light');
                document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
        })();
    </script>

    {{-- Google Fonts: Inter for UI & Manrope for Wise-style heavy weight-900 display headers --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Manrope:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

    @stack('seo')

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @stack('head')
</head>
<body class="min-h-full flex flex-col bg-base-200 text-base-content font-sans antialiased selection:bg-primary selection:text-primary-content" x-data="themeManager">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    {{ $slot }}
    @stack('scripts')
</body>
</html>