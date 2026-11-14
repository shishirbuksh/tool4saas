<x-layouts.app>
    @push('seo')
        <x-seo
            title="Tool Methodology & Accuracy Verification – Tool4SaaS"
            description="Learn how Tool4SaaS verifies formulas, standards compliance, and algorithm accuracy across all calculators and converters."
            canonical="{{ route('methodology') }}"
        />
    @endpush

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-6">
            <ul>
                <li><a href="{{ route('home') }}" class="hover:text-primary">Home</a></li>
                <li class="text-base-content font-medium">Methodology</li>
            </ul>
        </nav>

        <h1 class="text-3xl sm:text-4xl font-black text-base-content tracking-tight mb-4">
            Calculation Methodology & Rigor
        </h1>
        <p class="text-xs text-base-content/60 mb-8">
            How we test, calibrate, and verify mathematical accuracy across our entire toolkit.
        </p>

        <div class="prose max-w-none text-base-content/80 leading-relaxed space-y-6">
            <p>
                Every interactive tool on Tool4SaaS is built against published industry formulas, regulatory documentation, and verified edge-case test suites.
            </p>

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">1. Financial Calculations</h2>
            <p>
                Our loan, mortgage, EMI, and compound interest calculators use standard monthly amortizing compound interest formulas:
            </p>
            <div class="p-4 rounded-xl bg-base-200 font-mono text-sm">
                M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
            </div>
            <p>
                We cross-check amortization tables against Consumer Financial Protection Bureau (CFPB) disclosure tables and banking benchmark scenarios to eliminate penny rounding errors.
            </p>

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">2. Health & Anthropometric Calculations</h2>
            <p>
                Our Body Mass Index (BMI) calculator strictly implements the World Health Organization (WHO) international classification thresholds:
            </p>
            <ul class="list-disc pl-6 space-y-1">
                <li>Underweight: BMI &lt; 18.5</li>
                <li>Normal Weight: 18.5 – 24.9</li>
                <li>Overweight: 25.0 – 29.9</li>
                <li>Obesity: ≥ 30.0</li>
            </ul>

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">3. Cryptographic & Security Utilities</h2>
            <p>
                Password generators, hash tools, and AES encryptors utilize the browser's native W3C <code>crypto.getRandomValues()</code> and Web Cryptography API, avoiding pseudo-random entropy vulnerabilities.
            </p>
        </div>
    </div>
</x-layouts.app>
