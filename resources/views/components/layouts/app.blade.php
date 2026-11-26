@props([
    'meta' => null,
    'jsonLd' => null,
    'hideAds' => false,
])

<x-layouts.base :hideAds="$hideAds">
    @if($meta)
        @push('seo')
            <x-seo
                :title="$meta['title'] ?? ''"
                :description="$meta['description'] ?? ''"
                :canonical="$meta['canonical'] ?? ''"
                :isNoindex="$meta['isNoindex'] ?? false"
                :ogImage="$meta['ogImage'] ?? null"
                :ogType="$meta['ogType'] ?? 'website'"
                :jsonLd="$jsonLd"
            />
        @endpush
    @endif

    <x-header />

    <main id="main-content" class="flex-1 w-full">
        {{ $slot }}
    </main>

    <x-footer />
</x-layouts.base>
