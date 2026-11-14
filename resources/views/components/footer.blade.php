@php
    $categories = app(\App\Services\ToolRegistryService::class)->categories();
    $year = date('Y');
    $popularSlugs = [
        'invoice-generator' => 'Invoice Generator',
        'qr-code-generator' => 'QR Code Generator',
        'word-counter' => 'Word Counter',
        'json-formatter' => 'JSON Formatter',
        'mortgage-calculator' => 'Mortgage Calculator',
        'percentage-calculator' => 'Percentage Calculator',
        'resume-builder' => 'Resume Builder',
        'bmi-calculator' => 'BMI Calculator',
    ];
@endphp

<footer class="mt-auto bg-[#0e0f0c] text-[#e8ebe6] pt-14 sm:pt-18 pb-12 border-t border-[#22281e]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {{-- Wise Trust Bar --}}
        <div class="rounded-3xl bg-[#161a14] border border-[#242a20] p-6 sm:p-8 mb-12 sm:mb-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-primary text-primary-content font-black text-xl flex items-center justify-center shrink-0">
                    4S
                </div>
                <div>
                    <h3 class="font-bold text-lg text-white font-display">Tool4SaaS — Local-First Productivity</h3>
                    <p class="text-sm text-[#868685]">Zero server uploads. 100% private calculations running in your browser.</p>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#242a20] text-primary text-xs font-semibold">
                    <span class="w-2 h-2 rounded-full bg-primary"></span>
                    127 Free Tools
                </span>
                <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#242a20] text-white text-xs font-semibold">
                    🔒 Zero Cloud Storage
                </span>
                <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#242a20] text-white text-xs font-semibold">
                    ⚡ No Account Needed
                </span>
            </div>
        </div>

        {{-- Footer Link Columns --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-14">
            {{-- Column 1: Core Categories --}}
            <div>
                <h4 class="font-bold text-xs tracking-wider uppercase text-primary mb-4 font-mono">
                    Categories
                </h4>
                <ul class="space-y-1.5 text-sm text-[#868685]">
                    @foreach(array_slice($categories, 0, 6) as $category)
                        <li>
                            <a href="{{ route('category.show', $category->id) }}" class="inline-block py-1 hover:text-primary transition-colors">
                                {{ $category->label }}
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>

            {{-- Column 2: Additional Categories --}}
            <div>
                <h4 class="font-bold text-xs tracking-wider uppercase text-primary mb-4 font-mono">
                    More Categories
                </h4>
                <ul class="space-y-1.5 text-sm text-[#868685]">
                    @foreach(array_slice($categories, 6) as $category)
                        <li>
                            <a href="{{ route('category.show', $category->id) }}" class="inline-block py-1 hover:text-primary transition-colors">
                                {{ $category->label }}
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>

            {{-- Column 3: Popular Utilities --}}
            <div>
                <h4 class="font-bold text-xs tracking-wider uppercase text-primary mb-4 font-mono">
                    Popular Utilities
                </h4>
                <ul class="space-y-1.5 text-sm text-[#868685]">
                    @foreach($popularSlugs as $slug => $title)
                        <li>
                            <a href="{{ url('/' . $slug) }}" class="inline-block py-1 hover:text-primary transition-colors">
                                {{ $title }}
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>

            {{-- Column 4: Trust & Transparency --}}
            <div>
                <h4 class="font-bold text-xs tracking-wider uppercase text-primary mb-4 font-mono">
                    About &amp; Trust
                </h4>
                <ul class="space-y-1.5 text-sm text-[#868685]">
                    <li><a href="{{ route('about') }}" class="inline-block py-1 hover:text-primary transition-colors">About Tool4SaaS</a></li>
                    <li><a href="{{ route('author') }}" class="inline-block py-1 hover:text-primary transition-colors">Editorial &amp; Engineering Team</a></li>
                    <li><a href="{{ route('methodology') }}" class="inline-block py-1 hover:text-primary transition-colors">Quality Methodology</a></li>
                    <li><a href="{{ route('blog.index') }}" class="inline-block py-1 hover:text-primary transition-colors">Guides &amp; Tutorials</a></li>
                    <li><a href="{{ route('contact') }}" class="inline-block py-1 hover:text-primary transition-colors">Contact Support</a></li>
                    <li><a href="{{ route('sitemap.html') }}" class="inline-block py-1 hover:text-primary transition-colors">HTML Directory Sitemap</a></li>
                </ul>
            </div>
        </div>

        {{-- Bottom Copyright and Legal Bar --}}
        <div class="border-t border-[#242a20] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#868685]">
            <p class="text-center sm:text-left">© {{ $year }} Tool4SaaS. Built with a local-first architecture for maximum privacy.</p>
            <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                <a href="{{ route('privacy') }}" class="hover:text-white transition-colors py-1">Privacy Policy</a>
                <span>·</span>
                <a href="{{ route('terms') }}" class="hover:text-white transition-colors py-1">Terms of Service</a>
                <span>·</span>
                <a href="{{ url('/sitemap.xml') }}" class="hover:text-white transition-colors py-1">XML Sitemap</a>
                <span>·</span>
                <a href="{{ url('/llms.txt') }}" class="hover:text-white transition-colors py-1">llms.txt</a>
            </div>
        </div>
    </div>
</footer>
