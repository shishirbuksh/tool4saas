<x-layouts.app>
    @push('seo')
        <x-seo
            title="Terms of Service – Tool4SaaS"
            description="Terms of service and acceptable use policy for Tool4SaaS free online utilities."
            canonical="{{ route('terms') }}"
        />
    @endpush

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-6">
            <ul>
                <li><a href="{{ route('home') }}" class="hover:text-primary">Home</a></li>
                <li class="text-base-content font-medium">Terms</li>
            </ul>
        </nav>

        <h1 class="text-3xl sm:text-4xl font-black text-base-content tracking-tight mb-4">
            Terms of Service
        </h1>
        <p class="text-xs text-base-content/60 mb-8">
            Last modified: November 2026
        </p>

        <div class="prose max-w-none text-base-content/80 leading-relaxed space-y-6">
            <p>
                By using <strong>Tool4SaaS</strong>, you agree to these Terms of Service. If you do not agree with any part of these terms, please discontinue using the website immediately.
            </p>

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">1. Disclaimer of Professional Advice</h2>
            <p>
                All calculations, estimations, guidelines, conversion factors, and generated documents on Tool4SaaS are provided solely for informational and educational purposes. None of our tools constitute certified financial, tax, investment, medical, or legal counsel.
            </p>

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">2. Limitation of Liability</h2>
            <p>
                Tool4SaaS is provided on an "as-is" and "as-available" basis without warranties of any kind, whether express or implied. Under no circumstances shall Tool4SaaS or its creators be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use any tool.
            </p>

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">3. Intellectual Property & Commercial Use</h2>
            <p>
                You are free to use any invoices, resumes, QR codes, receipts, and images generated via our tools for personal or commercial purposes without attribution or royalties.
            </p>
        </div>
    </div>
</x-layouts.app>
