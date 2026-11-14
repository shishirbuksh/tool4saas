<x-layouts.app>
    @push('seo')
        <x-seo
            title="Privacy Policy – Tool4SaaS"
            description="Our privacy policy details our local-first data processing, Google AdSense compliance, and zero server upload guarantee."
            canonical="{{ route('privacy') }}"
        />
    @endpush

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-6">
            <ul>
                <li><a href="{{ route('home') }}" class="hover:text-primary">Home</a></li>
                <li class="text-base-content font-medium">Privacy</li>
            </ul>
        </nav>

        <h1 class="text-3xl sm:text-4xl font-black text-base-content tracking-tight mb-4">
            Privacy Policy
        </h1>
        <p class="text-xs text-base-content/60 mb-8">
            Last modified: November 2026
        </p>

        <div class="prose max-w-none text-base-content/80 leading-relaxed space-y-6">
            <p>
                At <strong>Tool4SaaS</strong>, protecting user privacy is our core architectural priority. Unlike typical utility sites, our application is engineered so that your inputs, files, calculations, passwords, and documents are processed locally inside your web browser.
            </p>

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">1. Information We Do Not Collect</h2>
            <p>
                Because our utilities run on client-side WebAssembly, HTML5 Canvas, Web Workers, and JavaScript:
            </p>
            <ul class="list-disc pl-6 space-y-2">
                <li>We do not upload or store your PDF files, images, text snippets, or code snippets on our servers.</li>
                <li>We do not record your salary, tax, loan, or mortgage numbers.</li>
                <li>We do not log passwords or passphrases generated via our security tools.</li>
                <li>We do not require user accounts, passwords, or identity verification.</li>
            </ul>

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">2. Cookies and Advertising</h2>
            <p>
                We use Google AdSense to serve advertisements when you visit our website. Google and its third-party advertising partners may use cookies to serve ads based on your prior visits to this website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.
            </p>

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">3. Analytics</h2>
            <p>
                We use privacy-configured Google Analytics 4 (GA4) with IP anonymization to monitor aggregated traffic patterns, such as which tools are most frequently accessed. We never transmit personally identifiable information (PII) to analytics services.
            </p>
        </div>
    </div>
</x-layouts.app>
