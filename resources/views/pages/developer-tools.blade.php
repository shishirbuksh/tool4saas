<x-layouts.app>
    @push('seo')
        <x-seo
            title="Free Developer Tools &amp; Utilities — JSON, JWT, Regex, SQL"
            description="22 free browser developer utilities: format JSON, decode JWT, test Regex, format SQL, generate hashes, and count AI tokens. 100% private, zero server logging."
            canonical="{{ url('/developer-tools') }}"
            :jsonLd="[
                '@context' => 'https://schema.org',
                '@graph' => [
                    [
                        '@type' => 'CollectionPage',
                        '@id' => url('/developer-tools') . '#collection',
                        'url' => url('/developer-tools'),
                        'name' => 'Free Developer Tools & Utilities',
                        'description' => '22 free browser developer utilities: format JSON, decode JWT, test Regex, format SQL, generate hashes, and count AI tokens. 100% private, zero server logging.',
                        'inLanguage' => 'en',
                        'isPartOf' => [
                            '@type' => 'WebSite',
                            'name' => 'Tool4SaaS',
                            'url' => url('/') . '/',
                        ],
                    ],
                    [
                        '@type' => 'BreadcrumbList',
                        'itemListElement' => [
                            [
                                '@type' => 'ListItem',
                                'position' => 1,
                                'name' => 'Home',
                                'item' => url('/'),
                            ],
                            [
                                '@type' => 'ListItem',
                                'position' => 2,
                                'name' => 'Developer Tools Hub',
                                'item' => url('/developer-tools'),
                            ],
                        ],
                    ],
                ],
            ]"
        />
    @endpush

    <div
        x-data="{
            searchQuery: '',
            selectedCategory: 'all',
            tools: [
                {
                    slug: 'json-formatter',
                    name: 'JSON Formatter & Validator',
                    category: 'formatting',
                    categoryLabel: 'Formatters & Code',
                    badge: 'Zero Server Egress',
                    icon: '📦',
                    description: 'Format, validate, beautify, and inspect complex JSON objects with tree views, syntax highlighting, and instant error parsing.',
                    features: ['Tree & raw view', 'Syntax error locator', 'Minify & beautify']
                },
                {
                    slug: 'sql-formatter',
                    name: 'SQL Query Formatter',
                    category: 'formatting',
                    categoryLabel: 'Formatters & Code',
                    badge: 'Multi-Dialect',
                    icon: '🗄️',
                    description: 'Beautify and format messy SQL queries across PostgreSQL, MySQL, SQLite, and T-SQL with standard indentation and clause alignment.',
                    features: ['PostgreSQL & MySQL', 'Uppercase keywords', 'Nested subquery indent']
                },
                {
                    slug: 'xml-formatter',
                    name: 'XML Formatter & Beautifier',
                    category: 'formatting',
                    categoryLabel: 'Formatters & Code',
                    badge: 'Validating',
                    icon: '📑',
                    description: 'Format, re-indent, and validate nested XML document structures, RSS feeds, and configuration files directly in your browser.',
                    features: ['2-space & 4-space indent', 'XML tree visualizer', 'Tag mismatch warning']
                },
                {
                    slug: 'code-minifier',
                    name: 'Code Minifier (HTML, CSS, JS)',
                    category: 'formatting',
                    categoryLabel: 'Formatters & Code',
                    badge: 'Compression',
                    icon: '⚡',
                    description: 'Minify HTML markup, CSS style sheets, and JavaScript files by removing unnecessary whitespace, comments, and line breaks.',
                    features: ['Gzip estimate', 'Comment stripping', 'Single-click copy']
                },
                {
                    slug: 'code-to-image',
                    name: 'Code to Image Converter',
                    category: 'formatting',
                    categoryLabel: 'Formatters & Code',
                    badge: 'PNG Export',
                    icon: '📸',
                    description: 'Turn code snippets into elegant, syntax-highlighted screenshot images for Twitter, blog documentation, and GitHub READMEs.',
                    features: ['Mac window frame', 'Color palettes', 'Retina 2x PNG']
                },
                {
                    slug: 'html-entities',
                    name: 'HTML Entity Encoder & Decoder',
                    category: 'formatting',
                    categoryLabel: 'Formatters & Code',
                    badge: 'XSS Prevention',
                    icon: '🔣',
                    description: 'Encode special characters, quotes, and brackets into secure HTML named and numeric entities, or decode raw entities back.',
                    features: ['Named & numeric entities', 'XSS sanitization helper', 'Batch text decode']
                },
                {
                    slug: 'jwt-decoder',
                    name: 'JWT Token Decoder & Inspector',
                    category: 'security',
                    categoryLabel: 'Security & Auth',
                    badge: '100% Local Decode',
                    icon: '🔑',
                    description: 'Decode and inspect JSON Web Tokens (JWT) header, claims, audience, issuer, and expiration timestamps securely without sending secrets.',
                    features: ['Exp timestamp converter', 'Header & payload diff', 'Zero network transmission']
                },
                {
                    slug: 'hash-generator',
                    name: 'Hash & HMAC Generator',
                    category: 'security',
                    categoryLabel: 'Security & Auth',
                    badge: 'WebCrypto API',
                    icon: '🛡️',
                    description: 'Generate cryptographic MD5, SHA-1, SHA-256, SHA-512, and secret-keyed HMAC digests using browser WebCrypto APIs.',
                    features: ['Hardware-accelerated', 'Secret key HMAC', 'Multiple hash comparison']
                },
                {
                    slug: 'aes-encryptor',
                    name: 'AES Encryption & Decryption',
                    category: 'security',
                    categoryLabel: 'Security & Auth',
                    badge: 'AES-GCM 256',
                    icon: '🔒',
                    description: 'Encrypt and decrypt confidential text strings using industry-standard AES-256-GCM authenticated symmetric cryptography.',
                    features: ['AES-GCM & CBC modes', 'PBKDF2 key derivation', 'Secure in-browser memory']
                },
                {
                    slug: 'otp-generator',
                    name: 'OTP Generator (TOTP 2FA)',
                    category: 'security',
                    categoryLabel: 'Security & Auth',
                    badge: 'RFC 6238',
                    icon: '⏱️',
                    description: 'Generate and test time-based one-time password (TOTP) two-factor authentication codes from Base32 secret keys locally.',
                    features: ['30-second clock cycle', 'RFC 6238 compliant', 'Offline authenticator test']
                },
                {
                    slug: 'password-strength',
                    name: 'Password Strength & Entropy Checker',
                    category: 'security',
                    categoryLabel: 'Security & Auth',
                    badge: 'Entropy Bits',
                    icon: '🔐',
                    description: 'Calculate password entropy bits, brute-force crack time estimates, dictionary vulnerability patterns, and character diversity.',
                    features: ['NIST guidelines', 'Crack-time projections', 'Zero upload password check']
                },
                {
                    slug: 'ssl-checker',
                    name: 'SSL Certificate Checker',
                    category: 'security',
                    categoryLabel: 'Security & Auth',
                    badge: 'SSRF Protected',
                    icon: '🌐',
                    description: 'Inspect SSL/TLS certificate validity, expiry dates, issuing Certificate Authority (CA), SAN domains, and cipher suites.',
                    features: ['Days until expiry', 'Issuer & SAN list', 'Strict SSRF validation']
                },
                {
                    slug: 'subnet-calculator',
                    name: 'IPv4 Subnet & CIDR Calculator',
                    category: 'networking',
                    categoryLabel: 'Networking & Web',
                    badge: 'CIDR & Netmask',
                    icon: '🌍',
                    description: 'Calculate network address, broadcast IP, usable host range, wildcard mask, and total hosts from any CIDR subnet prefix.',
                    features: ['Class A, B, C subnets', 'Binary bitmask view', 'Network & broadcast bounds']
                },
                {
                    slug: 'url-encoder',
                    name: 'URL Encoder & Decoder',
                    category: 'networking',
                    categoryLabel: 'Networking & Web',
                    badge: 'RFC 3986',
                    icon: '🔗',
                    description: 'Encode and decode query strings and URI components safely to resolve percent-encoding anomalies in API endpoints.',
                    features: ['Component & full URL', 'UTF-8 multi-byte support', 'Instant live decoding']
                },
                {
                    slug: 'mime-type-lookup',
                    name: 'MIME Type & Extension Lookup',
                    category: 'networking',
                    categoryLabel: 'Networking & Web',
                    badge: 'HTTP Headers',
                    icon: '📎',
                    description: 'Search hundreds of standardized IANA media types, file extensions, and HTTP Content-Type headers for web applications.',
                    features: ['Instant keyword search', 'IANA standard types', 'Common web fallbacks']
                },
                {
                    slug: 'screen-resolution',
                    name: 'Screen Resolution & Viewport Detector',
                    category: 'networking',
                    categoryLabel: 'Networking & Web',
                    badge: 'DPI & DPR',
                    icon: '🖥️',
                    description: 'Detect screen dimensions, CSS viewport width, Device Pixel Ratio (DPR), orientation, and color depth in real time.',
                    features: ['CSS px vs Device px', 'DPR multiplier', 'Resize event listener']
                },
                {
                    slug: 'credit-card-validator',
                    name: 'Credit Card Luhn Validator',
                    category: 'networking',
                    categoryLabel: 'Networking & Web',
                    badge: 'Luhn Algorithm',
                    icon: '💳',
                    description: 'Validate card number checksums with Mod-10 Luhn algorithm and identify card issuer networks (Visa, MC, Amex).',
                    features: ['Luhn Mod-10 check', 'IIN / BIN network match', '100% offline memory check']
                },
                {
                    slug: 'regex-tester',
                    name: 'Regex Tester & Matcher',
                    category: 'devtools',
                    categoryLabel: 'Dev & Sysadmin',
                    badge: 'PCRE & JS',
                    icon: '🔍',
                    description: 'Test regular expressions against sample text with live match highlighting, capture groups, and flag toggles (g, i, m, s).',
                    features: ['Capture groups list', 'Regex cheat sheet', 'Match count & indices']
                },
                {
                    slug: 'cron-parser',
                    name: 'Cron Expression Parser & Schedule',
                    category: 'devtools',
                    categoryLabel: 'Dev & Sysadmin',
                    badge: 'Next 5 Runs',
                    icon: '⏰',
                    description: 'Translate crontab 5-part expressions into plain English schedules and calculate the next five upcoming run timestamps.',
                    features: ['Human-readable translation', 'Next run timestamps', 'Standard crontab presets']
                },
                {
                    slug: 'base64-tool',
                    name: 'Base64 Encoder & Decoder',
                    category: 'devtools',
                    categoryLabel: 'Dev & Sysadmin',
                    badge: 'Data URLs',
                    icon: '🔤',
                    description: 'Convert plain text, code, and binary strings into Base64 format or decode Base64 strings with full UTF-8 Unicode support.',
                    features: ['UTF-8 multi-byte safe', 'Data URL prefix mode', 'Live bi-directional edit']
                },
                {
                    slug: 'ai-token-counter',
                    name: 'AI & LLM Token Counter',
                    category: 'devtools',
                    categoryLabel: 'Dev & Sysadmin',
                    badge: 'GPT-4 & Claude',
                    icon: '🤖',
                    description: 'Estimate token counts, character lengths, and prompt cost projections for OpenAI GPT-4, Claude, and Gemini API models.',
                    features: ['Token-to-word ratio', 'Model cost calculator', 'Context window tracker']
                },
                {
                    slug: 'chmod-calculator',
                    name: 'Linux Chmod Permissions Calculator',
                    category: 'devtools',
                    categoryLabel: 'Dev & Sysadmin',
                    badge: 'Octal & Symbolic',
                    icon: '🐧',
                    description: 'Calculate Linux file permissions in octal (755, 644) and symbolic notation (rwxr-xr-x) with interactive user/group checkboxes.',
                    features: ['Octal & symbolic sync', 'Owner, group, public', 'Common server presets']
                }
            ],
            get filteredTools() {
                const q = this.searchQuery.toLowerCase().trim();
                return this.tools.filter(t => {
                    const matchesCategory = this.selectedCategory === 'all' || t.category === this.selectedCategory;
                    const matchesQuery = q === '' ||
                        t.name.toLowerCase().includes(q) ||
                        t.description.toLowerCase().includes(q) ||
                        t.badge.toLowerCase().includes(q) ||
                        t.features.some(f => f.toLowerCase().includes(q));
                    return matchesCategory && matchesQuery;
                });
            }
        }"
        class="min-h-screen pb-16"
    >
        {{-- Hero Section (Wise Style) --}}
        <section class="py-12 sm:py-16 border-b border-base-300 bg-base-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl space-y-5">
                    {{-- Breadcrumbs --}}
                    <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60">
                        <ul>
                            <li><a href="{{ route('home') }}" class="hover:text-primary font-medium">Home</a></li>
                            <li class="text-base-content font-bold">Developer Tools Hub</li>
                        </ul>
                    </nav>

                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#163300] text-[#9fe870] font-bold text-xs uppercase tracking-wider shadow-xs">
                        <span class="w-2 h-2 rounded-full bg-[#9fe870] animate-pulse"></span>
                        <span>22 Free Developer Utilities · 100% Client-Side Privacy</span>
                    </div>

                    <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-base-content leading-tight font-display">
                        All Developer Tools in <span class="text-primary-content bg-primary px-3.5 py-1 rounded-2xl inline-block mt-1">One Hub.</span>
                    </h1>

                    <p class="text-base sm:text-lg text-base-content/75 leading-relaxed">
                        Fast, privacy-first developer utilities that run 100% in your browser. Format JSON, decode JWTs, test regex, beautify SQL, generate hashes, and count AI tokens with zero data transmission or remote logging.
                    </p>

                    {{-- Search & Category Filter Control Center --}}
                    <div class="pt-2 space-y-3">
                        <div class="relative">
                            <input
                                type="text"
                                x-model="searchQuery"
                                placeholder="Search 22 dev utilities (e.g., json, jwt, regex, sql, cron, subnet, sha256)..."
                                class="input input-bordered w-full rounded-2xl pl-11 pr-4 text-sm font-medium bg-base-100 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                            <svg class="size-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <button
                                type="button"
                                x-show="searchQuery.length > 0"
                                @click="searchQuery = ''"
                                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/40 hover:text-base-content"
                            >
                                Clear
                            </button>
                        </div>

                        {{-- Category Filter Pills --}}
                        <div class="flex flex-wrap items-center gap-1.5 pt-1 text-xs font-semibold">
                            <button
                                type="button"
                                @click="selectedCategory = 'all'"
                                class="px-3 py-1.5 rounded-full border transition-all"
                                :class="selectedCategory === 'all' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-base-200'"
                            >
                                All (22)
                            </button>
                            <button
                                type="button"
                                @click="selectedCategory = 'formatting'"
                                class="px-3 py-1.5 rounded-full border transition-all"
                                :class="selectedCategory === 'formatting' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-base-200'"
                            >
                                📦 Formatters &amp; Code (6)
                            </button>
                            <button
                                type="button"
                                @click="selectedCategory = 'security'"
                                class="px-3 py-1.5 rounded-full border transition-all"
                                :class="selectedCategory === 'security' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-base-200'"
                            >
                                🔐 Security &amp; Auth (6)
                            </button>
                            <button
                                type="button"
                                @click="selectedCategory = 'networking'"
                                class="px-3 py-1.5 rounded-full border transition-all"
                                :class="selectedCategory === 'networking' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-base-200'"
                            >
                                🌐 Networking &amp; Web (5)
                            </button>
                            <button
                                type="button"
                                @click="selectedCategory = 'devtools'"
                                class="px-3 py-1.5 rounded-full border transition-all"
                                :class="selectedCategory === 'devtools' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-base-200'"
                            >
                                ⚡ Dev &amp; Sysadmin (5)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {{-- Tools Grid --}}
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-xl sm:text-2xl font-black text-base-content font-display">
                        Developer Utilities
                    </h2>
                    <p class="text-xs text-base-content/60 mt-0.5">
                        Showing <span class="font-bold text-base-content" x-text="filteredTools.length"></span> tools
                    </p>
                </div>
                <span class="badge badge-sm bg-[#e2f6d5] text-[#054d28] font-bold border-none px-3 py-2 rounded-full text-xs">
                    🔒 Zero Server Storage
                </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <template x-for="tool in filteredTools" :key="tool.slug">
                    <a
                        :href="'/' + tool.slug"
                        class="bg-base-100 border border-base-300 rounded-3xl p-6 hover:shadow-md hover:border-primary transition-all flex flex-col justify-between group no-underline text-base-content"
                    >
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-3xl" x-text="tool.icon"></span>
                                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-base-200 text-base-content/70 font-mono" x-text="tool.badge"></span>
                            </div>

                            <div>
                                <h3 class="font-bold text-base sm:text-lg text-base-content group-hover:text-primary transition-colors font-display" x-text="tool.name"></h3>
                                <p class="text-xs text-base-content/70 leading-relaxed mt-1" x-text="tool.description"></p>
                            </div>
                        </div>

                        <div class="pt-4 mt-4 border-t border-base-200 flex items-center justify-between">
                            <div class="flex flex-wrap gap-1">
                                <template x-for="feat in tool.features" :key="feat">
                                    <span class="px-2 py-0.5 rounded-md bg-base-200 text-[10px] font-mono font-medium text-base-content/70" x-text="feat"></span>
                                </template>
                            </div>
                            <span class="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform inline-block">
                                Open →
                            </span>
                        </div>
                    </a>
                </template>
            </div>

            {{-- Empty Search Fallback --}}
            <div x-show="filteredTools.length === 0" class="text-center py-16 bg-base-100 rounded-3xl border border-base-300 mt-6">
                <span class="text-4xl block mb-2">🔍</span>
                <h3 class="font-bold text-base text-base-content">No developer tools found</h3>
                <p class="text-xs text-base-content/60 mt-1">Try searching for keywords like "json", "jwt", "sql", or "hash"</p>
                <button
                    type="button"
                    @click="searchQuery = ''; selectedCategory = 'all'"
                    class="btn btn-sm btn-outline rounded-xl mt-4 font-mono text-xs"
                >
                    Reset Filters
                </button>
            </div>
        </section>

        {{-- Educational FAQ Section --}}
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <div class="bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-10">
                <h2 class="text-2xl font-black text-base-content font-display mb-2">
                    Developer Tools Frequently Asked Questions
                </h2>
                <p class="text-xs sm:text-sm text-base-content/60 mb-6">
                    Key information regarding privacy, security, and browser execution
                </p>

                <div class="space-y-3">
                    <div class="collapse collapse-plus bg-base-200/50 rounded-2xl border border-base-300">
                        <input type="radio" name="dev-faq" checked />
                        <div class="collapse-title text-sm sm:text-base font-bold text-base-content">
                            Are my confidential API tokens, passwords, or JSON payloads logged on a server?
                        </div>
                        <div class="collapse-content text-xs sm:text-sm text-base-content/75 leading-relaxed">
                            <p>No. All 22 developer utilities operate 100% in client-side JavaScript within your browser memory. When formatting JSON, decoding JWTs, generating SHA hashes, or parsing regex, zero bytes leave your device. You can verify this by inspecting the browser Network tab while using any tool.</p>
                        </div>
                    </div>

                    <div class="collapse collapse-plus bg-base-200/50 rounded-2xl border border-base-300">
                        <input type="radio" name="dev-faq" />
                        <div class="collapse-title text-sm sm:text-base font-bold text-base-content">
                            Can I use these developer tools offline without an active internet connection?
                        </div>
                        <div class="collapse-content text-xs sm:text-sm text-base-content/75 leading-relaxed">
                            <p>Yes. Once the page is loaded, the client-side JavaScript assets remain cached locally. Computations, formatting, cryptographic digests, and conversions continue to work seamlessly even without Wi-Fi or internet access.</p>
                        </div>
                    </div>

                    <div class="collapse collapse-plus bg-base-200/50 rounded-2xl border border-base-300">
                        <input type="radio" name="dev-faq" />
                        <div class="collapse-title text-sm sm:text-base font-bold text-base-content">
                            How does the SSL Certificate Checker prevent Server-Side Request Forgery (SSRF)?
                        </div>
                        <div class="collapse-content text-xs sm:text-sm text-base-content/75 leading-relaxed">
                            <p>Unlike third-party tools that naively fetch URLs, Tool4SaaS validates target hostnames through strict DNS resolution, rejecting private IP ranges (RFC 1918), local loopbacks, and cloud metadata endpoints (169.254.169.254). Outbound socket connections connect strictly to verified public IPs using TLS Server Name Indication (SNI) to prevent DNS rebinding.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</x-layouts.app>
