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

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">2. Cookies and Google AdSense Advertising</h2>
            <p>
                We partner with Google AdSense to display advertisements across our website. Google and its certified third-party vendor partners use cookies to serve personalized and non-personalized ads based on a user's prior visits to Tool4SaaS or other websites on the internet.
            </p>
            <p>
                Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising at any time by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" class="text-[#163300] dark:text-[#9fe870] hover:underline font-semibold">Google Ads Settings</a> or through the Network Advertising Initiative opt-out portal at <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" class="text-[#163300] dark:text-[#9fe870] hover:underline font-semibold">www.aboutads.info</a>. For more information on how Google uses data when you use our partners' sites or apps, please review <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" class="text-[#163300] dark:text-[#9fe870] hover:underline font-semibold">Google's Partner Data Policy</a>.
            </p>

            <h2 class="text-2xl font-bold text-base-content pt-6 border-t border-base-200">3. Diagnostics &amp; Server Logs</h2>
            <p>
                Tool4SaaS operates on a local-first architecture without intrusive behavioral tracking scripts inside our tools. Standard web server error logs and aggregated search console metrics may be reviewed strictly to monitor uptime, resolve broken links, and maintain service reliability. We never sell or transmit personally identifiable information (PII).
            </p>
        </div>
    </div>
</x-layouts.app>
