<x-layouts.app>
    @push('seo')
        <x-seo
            :title="$metaTitle"
            :description="$metaDescription"
            :canonical="$canonical"
            :jsonLd="$jsonLd ?? null"
        />
    @endpush

    <div
        x-data="{
            searchQuery: '',
            hasMatches(query) {
                if (!query) return true;
                const q = query.toLowerCase().trim();
                return this.toolsData.some(t => t.searchStr.includes(q));
            },
            countCategoryMatches(categoryTools, query) {
                if (!query) return categoryTools.length;
                const q = query.toLowerCase().trim();
                return categoryTools.filter(t => t.searchStr.includes(q)).length;
            }
        }"
        class="min-h-screen"
    >
        {{-- Wise-Style Signature Hero Band (Sage Canvas + Weight-900 Display Headline + Interactive Card) --}}
        <section class="py-12 sm:py-20 border-b border-base-300 bg-base-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {{-- Left Column: Brand Statement & Instant Tool Search --}}
                    <div class="lg:col-span-7 space-y-6 text-left">
                        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-xs uppercase tracking-wider shadow-xs">
                            <span class="w-2 h-2 rounded-full bg-[#2ead4b] animate-pulse"></span>
                            <span>{{ $counts['visible'] }} Free Utilities · 100% Client-Side Privacy</span>
                        </div>

                        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-base-content leading-[1.05] font-display">
                            Free tools.<br/>
                            <span class="text-primary-content bg-primary px-3.5 py-1 rounded-2xl inline-block mt-1">Zero friction.</span>
                        </h1>

                        <p class="text-lg sm:text-xl text-base-content/80 max-w-xl font-normal leading-relaxed">
                            Fast, private utilities for finance, math, text, and security. No accounts, no subscriptions, and your data never leaves your browser.
                        </p>

                        {{-- Instant Search Input (Wise styled pill input) --}}
                        <div class="relative max-w-xl pt-2">
                            <div class="absolute inset-y-0 left-0 pl-5 pt-2 flex items-center pointer-events-none text-base-content/50">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                x-model="searchQuery"
                                placeholder="Search 127 tools (e.g. invoice, percentage, QR, JSON, PDF, BMI)..."
                                class="w-full pl-13 pr-10 py-4 rounded-full bg-base-100 border border-base-300 text-base-content placeholder:text-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base shadow-sm transition-all"
                            />
                            <div x-show="searchQuery.length > 0" style="display: none;" class="absolute inset-y-0 right-0 pr-4 pt-2 flex items-center">
                                <button
                                    type="button"
                                    @click="searchQuery = ''"
                                    class="w-7 h-7 rounded-full bg-base-200 text-base-content/70 hover:bg-base-300 flex items-center justify-center text-xs font-bold"
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {{-- Category Quick Jump Pills --}}
                        <div class="flex flex-wrap items-center gap-2 pt-1">
                            <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 mr-1 font-mono">Jump to:</span>
                            @foreach($grouped as $group)
                                <a
                                    href="#category-{{ $group['category']->id }}"
                                    class="px-3.5 py-1.5 rounded-full bg-base-100 border border-base-300 text-xs font-semibold text-base-content hover:border-primary hover:bg-[#e2f6d5] transition-all"
                                >
                                    {{ $group['category']->label }}
                                </a>
                            @endforeach
                        </div>
                    </div>

                    {{-- Right Column: Wise-Style Signature Interactive Widget --}}
                    <div
                        class="lg:col-span-5"
                        x-data="{
                            amount: 1000,
                            rate: 7.5,
                            years: 5,
                            get total() {
                                const p = Math.max(0, parseFloat(this.amount) || 0);
                                const r = Math.max(0, parseFloat(this.rate) || 0) / 100;
                                const y = Math.max(1, parseFloat(this.years) || 1);
                                return Math.round(p * Math.pow(1 + r, y));
                            },
                            get interest() {
                                return Math.max(0, this.total - (parseFloat(this.amount) || 0));
                            }
                        }"
                    >
                        <div class="bg-base-100 border border-base-300 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                            <div class="flex items-center justify-between mb-5">
                                <div class="flex items-center gap-2.5">
                                    <span class="w-3 h-3 rounded-full bg-primary"></span>
                                    <span class="font-black text-sm text-base-content font-display">Live Growth Calculator</span>
                                </div>
                                <span class="badge badge-sm bg-[#e2f6d5] text-[#054d28] font-bold border-none px-2.5 py-1">
                                    Instant Calc
                                </span>
                            </div>

                            <div class="space-y-4">
                                {{-- Input 1: Starting Principal --}}
                                <div class="p-4 rounded-2xl bg-base-200/60 border border-base-300/80">
                                    <label class="block text-xs font-bold text-base-content/60 uppercase tracking-wider mb-1">
                                        Principal Amount ($)
                                    </label>
                                    <div class="flex items-center justify-between">
                                        <input
                                            type="number"
                                            x-model.number="amount"
                                            class="w-full bg-transparent text-2xl font-black text-base-content focus:outline-none tabular-nums"
                                            min="0"
                                            step="100"
                                        />
                                        <span class="badge badge-neutral text-xs font-bold px-2.5 py-1">USD</span>
                                    </div>
                                </div>

                                {{-- Input 2: Rate & Years --}}
                                <div class="grid grid-cols-2 gap-3">
                                    <div class="p-3.5 rounded-2xl bg-base-200/60 border border-base-300/80">
                                        <label class="block text-[11px] font-bold text-base-content/60 uppercase tracking-wider mb-1">Annual Return</label>
                                        <div class="flex items-center">
                                            <input type="number" step="0.5" x-model.number="rate" class="w-full bg-transparent font-black text-lg focus:outline-none tabular-nums" />
                                            <span class="text-xs font-bold text-base-content/50">%</span>
                                        </div>
                                    </div>
                                    <div class="p-3.5 rounded-2xl bg-base-200/60 border border-base-300/80">
                                        <label class="block text-[11px] font-bold text-base-content/60 uppercase tracking-wider mb-1">Time Horizon</label>
                                        <div class="flex items-center">
                                            <input type="number" x-model.number="years" class="w-full bg-transparent font-black text-lg focus:outline-none tabular-nums" min="1" max="50" />
                                            <span class="text-xs font-bold text-base-content/50">Yrs</span>
                                        </div>
                                    </div>
                                </div>

                                {{-- Result Display: Dark Pill Card with Vivid Lime Accent --}}
                                <div class="p-5 rounded-2xl bg-[#0e0f0c] text-white flex items-center justify-between">
                                    <div>
                                        <span class="block text-[11px] uppercase tracking-wider text-[#868685] font-mono">Projected Balance</span>
                                        <span class="text-3xl font-black text-primary tabular-nums" x-text="'$' + Number(total).toLocaleString()">$1,436</span>
                                        <span class="block text-xs text-[#868685] mt-0.5">
                                            +$<span x-text="Number(interest).toLocaleString()">436</span> in interest
                                        </span>
                                    </div>
                                    <a
                                        href="{{ url('/compound-interest-calculator') }}"
                                        class="px-4 py-2 rounded-full bg-primary text-primary-content text-xs font-bold hover:bg-[#cdffad] transition-all shadow-xs shrink-0"
                                    >
                                        Full Tool →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {{-- Wise Feature Cards Band (3-Up Cards matching Wise Card Archetypes) --}}
        <section class="py-12 sm:py-16 border-b border-base-300 bg-base-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {{-- Card 1: Sage Surface --}}
                    <div class="p-7 rounded-3xl bg-base-200/70 border border-base-300 flex flex-col justify-between">
                        <div>
                            <div class="w-11 h-11 rounded-2xl bg-[#e2f6d5] text-[#054d28] font-black flex items-center justify-center mb-4 text-xl">
                                🔒
                            </div>
                            <h3 class="font-bold text-lg text-base-content font-display mb-1.5">100% Client-Side Privacy</h3>
                            <p class="text-sm text-base-content/75 leading-relaxed">
                                Your files, financial inputs, passwords, and source code never leave your browser. Zero cloud logging.
                            </p>
                        </div>
                    </div>

                    {{-- Card 2: Lime Surface --}}
                    <div class="p-7 rounded-3xl bg-[#e2f6d5] border border-[#c5edab] text-[#0e0f0c] flex flex-col justify-between">
                        <div>
                            <div class="w-11 h-11 rounded-2xl bg-primary text-primary-content font-black flex items-center justify-center mb-4 text-xl">
                                ⚡
                            </div>
                            <h3 class="font-black text-lg text-[#054d28] font-display mb-1.5">Zero Accounts, Zero Paywalls</h3>
                            <p class="text-sm text-[#054d28]/85 leading-relaxed">
                                No paywalls, no signup modals, and no API rate-limits. Every utility loads instantly and runs offline.
                            </p>
                        </div>
                    </div>

                    {{-- Card 3: Polarity-Flipped Dark Surface --}}
                    <div class="p-7 rounded-3xl bg-[#0e0f0c] border border-[#242a20] text-white flex flex-col justify-between">
                        <div>
                            <div class="w-11 h-11 rounded-2xl bg-[#242a20] text-primary font-black flex items-center justify-center mb-4 text-xl">
                                📐
                            </div>
                            <h3 class="font-bold text-lg text-primary font-display mb-1.5">Standardized Accuracy</h3>
                            <p class="text-sm text-[#868685] leading-relaxed">
                                Formulas verified against WHO, CFPB, and IEEE standards. Deterministic computations tested across browsers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {{-- Categorized Tool Directory with Live Search Filter --}}
        <main id="main-content" class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span id="tools" class="scroll-mt-24"></span>
            {{-- Search Results Banner (When Search Query Active) --}}
            <div x-show="searchQuery.trim().length > 0" class="mb-8 p-4 rounded-2xl bg-base-100 border border-base-300 flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Filtering by:</span>
                    <span class="badge badge-primary font-bold text-xs" x-text="searchQuery"></span>
                </div>
                <button
                    type="button"
                    @click="searchQuery = ''"
                    class="text-xs font-bold text-primary hover:underline"
                >
                    Clear Filter
                </button>
            </div>

            <div class="space-y-16">
                @foreach($grouped as $group)
                    @php
                        $groupTools = $group['tools'];
                    @endphp
                    <div
                        id="category-{{ $group['category']->id }}"
                        class="scroll-mt-24"
                    >
                        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-base-300 pb-4">
                            <div>
                                <h2 class="text-2xl sm:text-3xl font-extrabold text-base-content font-display">
                                    {{ $group['category']->label }}
                                </h2>
                                <p class="text-sm text-base-content/70 mt-1">
                                    {{ $group['category']->description }}
                                </p>
                            </div>
                            <a
                                href="{{ route('category.show', $group['category']->id) }}"
                                class="inline-flex items-center gap-1.5 text-sm font-bold text-base-content hover:text-primary transition-colors shrink-0"
                            >
                                <span>Browse all {{ count($groupTools) }} utilities</span>
                                <span>→</span>
                            </a>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            @foreach($groupTools as $tool)
                                <a
                                    href="{{ url('/' . $tool->slug) }}"
                                    x-show="searchQuery === '' || '{{ strtolower(addslashes($tool->title . ' ' . $tool->short . ' ' . implode(' ', $tool->keywords))) }}'.includes(searchQuery.toLowerCase().trim())"
                                    class="bg-base-100 border border-base-300 hover:border-primary hover:shadow-lg transition-all p-6 rounded-3xl flex flex-col justify-between group no-underline"
                                >
                                    <div>
                                        <div class="flex items-center justify-between mb-3">
                                            <span class="badge badge-sm badge-outline text-[11px] font-semibold border-base-300">
                                                {{ $group['category']->label }}
                                            </span>
                                            <span class="text-[11px] font-bold text-[#054d28] bg-[#e2f6d5] px-2.5 py-0.5 rounded-full">
                                                Free
                                            </span>
                                        </div>
                                        <h3 class="font-bold text-lg text-base-content group-hover:text-base-content font-display flex items-center justify-between">
                                            <span>{{ $tool->title }}</span>
                                        </h3>
                                        <p class="text-xs text-base-content/70 mt-2 line-clamp-2 leading-relaxed">
                                            {{ $tool->short }}
                                        </p>
                                    </div>
                                    <div class="mt-5 pt-3 border-t border-base-200 flex items-center justify-between text-xs font-semibold text-base-content/70 group-hover:text-base-content">
                                        <span>Use utility</span>
                                        <span class="w-7 h-7 rounded-full bg-base-200 group-hover:bg-primary group-hover:text-primary-content flex items-center justify-center transition-all text-sm font-bold">
                                            →
                                        </span>
                                    </div>
                                </a>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            </div>
        </main>
    </div>
</x-layouts.app>
