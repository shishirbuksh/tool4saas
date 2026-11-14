<x-layouts.app>
    @push('seo')
        <x-seo
            title="About Tool4SaaS – Free, Private Browser Productivity Tools"
            description="Tool4SaaS is a collection of 100% free, browser-local productivity utilities. No accounts, no paywalls, zero telemetry, and your data never leaves your device."
            canonical="{{ route('about') }}"
        />
    @endpush

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-8">
            <ul>
                <li><a href="{{ route('home') }}" class="hover:text-primary font-medium">Home</a></li>
                <li class="text-base-content font-bold">About</li>
            </ul>
        </nav>

        <div class="bg-base-100 border border-base-300 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-xs uppercase tracking-wider mb-4">
                <span>Our Mission</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-black text-base-content tracking-tight mb-4 font-display">
                About Tool4SaaS
            </h1>
            <p class="text-xs text-base-content/60 mb-8 font-mono">
                Last updated: November 2026 · Tested locally across Chrome, Safari, Firefox, Edge
            </p>

            <div class="prose max-w-none text-base-content/80 leading-relaxed space-y-6">
                <p class="text-lg text-base-content/90 font-medium">
                    <strong>Tool4SaaS</strong> is a comprehensive collection of 127 free, privacy-first online utilities built on modern web standards. We believe everyday tasks — generating invoices, testing regex, calculating loan amortization, creating QR codes, or formatting payloads — should never require account signups, monthly fees, or transmitting private data to remote servers.
                </p>

                <h2 class="text-2xl font-black text-base-content pt-6 border-t border-base-200 font-display">Local-First Architecture</h2>
                <p>
                    Unlike traditional web tools that upload documents and files to cloud processing workers, Tool4SaaS executes 100% in your browser using modern Web APIs (Canvas API, Web Workers, SubtleCrypto, and client-side PDF renderers). Your tax returns, passwords, client invoices, and proprietary code never touch our server disks.
                </p>

                <h2 class="text-2xl font-black text-base-content pt-6 border-t border-base-200 font-display">Quality &amp; Testing Methodology</h2>
                <p>
                    Every calculator, generator, and converter is built and verified in-house against standard mathematical test fixtures and regulatory benchmarks (such as WHO BMI brackets, CFPB lending formulas, and standard UTC calendar algorithms). Our team maintains automated test suites with over 2,800 assertions across all endpoints.
                </p>

                <h2 class="text-2xl font-black text-base-content pt-6 border-t border-base-200 font-display">Sustainability</h2>
                <p>
                    We sustain open access for creators and businesses through non-intrusive display advertising. Advertising covers edge infrastructure and continuous browser API maintenance without ever gating utilities behind subscriptions.
                </p>
            </div>
        </div>
    </div>
</x-layouts.app>
