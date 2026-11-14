<x-layouts.app>
    @push('seo')
        <title>404 Page Not Found — Tool4SaaS</title>
        <meta name="robots" content="noindex, follow">
    @endpush

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#0e0f0c] text-primary text-3xl font-black mb-6 shadow-sm">
            404
        </div>

        <h1 class="text-4xl sm:text-6xl font-black tracking-tight text-base-content mb-4 font-display">
            Page Not Found
        </h1>

        <p class="text-lg text-base-content/75 max-w-md mx-auto mb-10 leading-relaxed font-normal">
            The tool or page you're looking for doesn't exist, has moved, or the link may be outdated.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a href="/" class="px-6 py-3 rounded-full bg-primary text-primary-content font-bold text-sm hover:bg-[#cdffad] transition-all shadow-sm">
                Return to Homepage →
            </a>
            <a href="/category/text-documents" class="px-6 py-3 rounded-full bg-base-100 border border-base-300 font-bold text-sm text-base-content hover:border-primary transition-all shadow-sm">
                Browse Categories
            </a>
        </div>

        {{-- Popular Tools Quick Directory (Wise white rounded-3xl card) --}}
        <div class="bg-base-100 border border-base-300 p-8 rounded-3xl text-left max-w-2xl mx-auto shadow-sm">
            <h2 class="text-xs font-bold mb-4 uppercase tracking-wider text-base-content/60 font-mono">
                Popular Free Utilities
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <a href="/percentage-calculator" class="p-3.5 rounded-2xl border border-base-300 hover:border-primary hover:bg-[#e2f6d5]/40 transition-all font-semibold flex items-center justify-between group">
                    <span>Percentage Calculator</span>
                    <span class="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="/word-counter" class="p-3.5 rounded-2xl border border-base-300 hover:border-primary hover:bg-[#e2f6d5]/40 transition-all font-semibold flex items-center justify-between group">
                    <span>Word Counter</span>
                    <span class="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="/json-formatter" class="p-3.5 rounded-2xl border border-base-300 hover:border-primary hover:bg-[#e2f6d5]/40 transition-all font-semibold flex items-center justify-between group">
                    <span>JSON Formatter</span>
                    <span class="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="/password-generator" class="p-3.5 rounded-2xl border border-base-300 hover:border-primary hover:bg-[#e2f6d5]/40 transition-all font-semibold flex items-center justify-between group">
                    <span>Password Generator</span>
                    <span class="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="/age-calculator" class="p-3.5 rounded-2xl border border-base-300 hover:border-primary hover:bg-[#e2f6d5]/40 transition-all font-semibold flex items-center justify-between group">
                    <span>Age Calculator</span>
                    <span class="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="/mortgage-calculator" class="p-3.5 rounded-2xl border border-base-300 hover:border-primary hover:bg-[#e2f6d5]/40 transition-all font-semibold flex items-center justify-between group">
                    <span>Mortgage Calculator</span>
                    <span class="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
            </div>
        </div>
    </div>
</x-layouts.app>
