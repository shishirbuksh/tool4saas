<x-layouts.app :hideAds="true">
    @push('seo')
        <title>503 Under Maintenance — Tool4SaaS</title>
        <meta name="robots" content="noindex, follow">
    @endpush

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#0e0f0c] text-warning text-3xl font-black mb-6 shadow-sm">
            503
        </div>

        <h1 class="text-4xl sm:text-6xl font-black tracking-tight text-base-content mb-4 font-display">
            Under Maintenance
        </h1>

        <p class="text-lg text-base-content/75 max-w-md mx-auto mb-10 leading-relaxed font-normal">
            Tool4SaaS is undergoing a brief system upgrade or scheduled maintenance. All browser utilities will be back online in just a few moments.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a href="" class="px-6 py-3 rounded-full bg-primary text-primary-content font-bold text-sm hover:bg-[#cdffad] transition-all shadow-sm inline-flex items-center min-h-[44px]">
                ↻ Check Again
            </a>
        </div>
    </div>
</x-layouts.app>
