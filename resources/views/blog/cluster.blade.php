<x-layouts.app :meta="$meta" :jsonLd="$jsonLd">
    <div class="max-w-7xl mx-auto py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        {{-- Breadcrumbs --}}
        <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-8">
            <ul>
                <li><a href="/" class="hover:text-primary font-medium">Home</a></li>
                <li><a href="/blog" class="hover:text-primary font-medium">Blog</a></li>
                <li><a href="/blog/{{ $pillarMeta->pillar }}" class="hover:text-primary font-medium">{{ $pillarMeta->shortLabel }}</a></li>
                <li class="text-base-content font-bold max-w-xs truncate">{{ $post->title }}</li>
            </ul>
        </nav>

        {{-- Wise Article Header --}}
        <div class="max-w-4xl mb-10">
            <h1 class="text-3xl md:text-5xl font-black tracking-tight mb-4 text-balance font-display text-base-content">
                {{ $post->title }}
            </h1>
            <p class="text-lg md:text-xl text-base-content/80 leading-relaxed mb-6 font-normal">
                {{ $post->description }}
            </p>
            <div class="text-xs text-base-content/60 flex flex-wrap items-center gap-2">
                <span>By <a href="/author" class="font-bold text-base-content hover:text-primary transition-colors">Tool4SaaS Editorial Team</a></span>
                <span>·</span>
                <time datetime="{{ $post->published }}">Published {{ date('M j, Y', strtotime($post->published)) }}</time>
                <span>·</span>
                <time datetime="{{ $post->updated }}">Updated {{ date('M j, Y', strtotime($post->updated)) }}</time>
                <span>·</span>
                <span>{{ $post->readingMinutes }} min read</span>
            </div>
        </div>

        {{-- Tool CTA Banner (Wise Green Pill Button) --}}
        @if (count($post->toolSlugs) > 0)
            @php $mainTool = $post->toolSlugs[0]; @endphp
            <div class="bg-base-100 border border-base-300 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-xs uppercase tracking-wider mb-2">
                        <span>Free Online Tool</span>
                    </div>
                    <h2 class="text-xl font-bold font-display text-base-content">Use the {{ ucwords(str_replace('-', ' ', $mainTool)) }} online</h2>
                    <p class="text-sm text-base-content/75 mt-1">Runs 100% locally in your browser. No signup, completely private and instant.</p>
                </div>
                <a href="/{{ $mainTool }}" class="px-6 py-3 rounded-full bg-primary text-primary-content font-bold text-sm hover:bg-[#cdffad] transition-all shrink-0 text-center shadow-sm">
                    Open Tool Online →
                </a>
            </div>
        @endif

        {{-- Two-column content layout --}}
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
            {{-- Main article body (3 cols) --}}
            <div class="lg:col-span-3 min-w-0">
                <article class="blog-body prose max-w-none">
                    {!! $post->html !!}
                </article>

                {{-- Back to Main Pillar Hub Link --}}
                <div class="mt-14 p-7 sm:p-8 rounded-3xl border border-base-300 bg-base-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 font-mono">Complete Guide Hub</span>
                        <h3 class="text-xl font-bold font-display text-base-content mt-1">{{ $pillarMeta->title }}</h3>
                        <p class="text-xs text-base-content/70 mt-1">Explore all related tutorials, comparison tables, and calculators.</p>
                    </div>
                    <a href="/blog/{{ $pillarMeta->pillar }}" class="px-5 py-2.5 rounded-full border border-base-300 bg-base-200 font-bold text-xs text-base-content hover:border-primary hover:text-primary transition-all shrink-0 text-center">
                        View Hub Index →
                    </a>
                </div>

                {{-- FAQs Section (Wise rounded-2xl collapse) --}}
                @if (count($post->faqs) > 0)
                    <section class="mt-14">
                        <h2 class="text-2xl font-black tracking-tight mb-6 font-display text-base-content">Frequently Asked Questions</h2>
                        <div class="space-y-3.5">
                            @foreach ($post->faqs as $faq)
                                <div class="collapse collapse-plus bg-base-100 border border-base-300 rounded-2xl shadow-sm">
                                    <input type="checkbox" />
                                    <div class="collapse-title text-base font-bold text-base-content font-display">
                                        {{ $faq['question'] }}
                                    </div>
                                    <div class="collapse-content text-sm text-base-content/80 leading-relaxed">
                                        <p class="pt-2">{{ $faq['answer'] }}</p>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </section>
                @endif
            </div>

            {{-- Sidebar (1 col) --}}
            <aside class="space-y-6 lg:sticky lg:top-24">
                @if (count($post->toc) > 0)
                    <div class="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-sm">
                        <h3 class="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-3.5 font-mono">On this page</h3>
                        <nav class="space-y-2 text-xs max-h-[60vh] overflow-y-auto">
                            @foreach ($post->toc as $item)
                                <a href="#{{ $item['id'] }}" class="block text-base-content/75 hover:text-primary py-0.5 transition-colors {{ ($item['level'] ?? 2) > 2 ? 'pl-3 text-[11px]' : 'font-semibold' }}">
                                    {{ $item['text'] }}
                                </a>
                            @endforeach
                        </nav>
                    </div>
                @endif

                @if (count($related) > 0)
                    <div class="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-sm">
                        <h3 class="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-3.5 font-mono">Related Tutorials</h3>
                        <ul class="space-y-3 text-xs">
                            @foreach ($related as $rel)
                                <li>
                                    <a href="{{ $rel->kind === 'pillar' ? '/blog/' . $rel->pillar : '/blog/' . $rel->pillar . '/' . $rel->slug }}" class="hover:text-primary block font-semibold text-base-content transition-colors">
                                        {{ $rel->title }}
                                    </a>
                                    <span class="text-[11px] text-base-content/50">{{ $rel->readingMinutes }} min read</span>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </aside>
        </div>
    </div>
</x-layouts.app>
