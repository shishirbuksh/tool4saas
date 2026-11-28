<x-layouts.app>
    @push('seo')
        <x-seo
            title="Tool4SaaS Editorial & Engineering Team"
            description="Meet the editorial reviewers and engineers behind Tool4SaaS."
            canonical="{{ route('author') }}"
        />
    @endpush

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-6">
            <ul>
                <li><a href="{{ route('home') }}" class="hover:text-primary">Home</a></li>
                <li class="text-base-content font-medium">Editorial Team</li>
            </ul>
        </nav>

        <h1 class="text-3xl sm:text-4xl font-black text-base-content tracking-tight mb-4">
            Editorial & Engineering Team
        </h1>
        <p class="text-base text-base-content/75 mb-10 max-w-2xl leading-relaxed">
            Tool4SaaS is developed and maintained by a dedicated team of software engineers, financial analysts, and technical writers committed to building private, accessible, local-first web utilities.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <x-tool-paper class="p-6">
                <div class="w-12 h-12 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-lg flex items-center justify-center mb-4">
                    FE
                </div>
                <h2 class="font-bold text-lg text-base-content">Financial Editorial Desk</h2>
                <p class="text-xs text-[#163300] dark:text-[#9fe870] font-semibold mt-0.5 mb-3">Finance &amp; Tax Verification</p>
                <p class="text-xs text-base-content/70 leading-relaxed">
                    Audits all loan calculators, amortization formulas, and GST calculations against Consumer Financial Protection Bureau (CFPB), IRS, and RBI/CBDT benchmarks.
                </p>
            </x-tool-paper>

            <x-tool-paper class="p-6">
                <div class="w-12 h-12 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-lg flex items-center justify-center mb-4">
                    HE
                </div>
                <h2 class="font-bold text-lg text-base-content">Health &amp; Anthropometric Review</h2>
                <p class="text-xs text-[#163300] dark:text-[#9fe870] font-semibold mt-0.5 mb-3">WHO &amp; Clinical Benchmarks</p>
                <p class="text-xs text-base-content/70 leading-relaxed">
                    Verifies BMI, BMR/Mifflin-St Jeor caloric equations, hydration ratios, and pregnancy window estimates against published World Health Organization (WHO) standards.
                </p>
            </x-tool-paper>

            <x-tool-paper class="p-6">
                <div class="w-12 h-12 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-lg flex items-center justify-center mb-4">
                    DE
                </div>
                <h2 class="font-bold text-lg text-base-content">Developer Utilities Team</h2>
                <p class="text-xs text-[#163300] dark:text-[#9fe870] font-semibold mt-0.5 mb-3">Engineering &amp; Cryptography</p>
                <p class="text-xs text-base-content/70 leading-relaxed">
                    Maintains formatting engines, regex testers, JSON tools, and WebCrypto / client-side PDF implementations for offline browser processing.
                </p>
            </x-tool-paper>

            <x-tool-paper class="p-6">
                <div class="w-12 h-12 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-lg flex items-center justify-center mb-4">
                    QA
                </div>
                <h2 class="font-bold text-lg text-base-content">Quality &amp; Verification</h2>
                <p class="text-xs text-[#163300] dark:text-[#9fe870] font-semibold mt-0.5 mb-3">Automated &amp; Cross-Browser Testing</p>
                <p class="text-xs text-base-content/70 leading-relaxed">
                    Tests interactive browser utilities across desktop and mobile viewports, verifying formula edge cases, accessibility compliance, and zero external data leakage.
                </p>
            </x-tool-paper>
        </div>
    </div>
</x-layouts.app>
