<x-layouts.app>
    @push('seo')
        <x-seo
            :title="$metaTitle"
            :description="$metaDescription"
            :canonical="$canonical"
            :isNoindex="$isNoindex ?? false"
            :jsonLd="$jsonLd ?? null"
        />
    @endpush

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {{-- Breadcrumb --}}
        <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-8">
            <ul>
                <li><a href="{{ route('home') }}" class="hover:text-primary font-medium">Home</a></li>
                <li><span class="text-base-content/50">Categories</span></li>
                <li class="text-base-content font-bold">{{ $category->label }}</li>
            </ul>
        </nav>

        {{-- Wise Category Header --}}
        <header class="mb-14 max-w-4xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-xs uppercase tracking-wider mb-4">
                <span>{{ count($tools) }} Online Utilities</span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-base-content tracking-tight mb-4 font-display">
                {{ str_ends_with($category->label, 'Tools') ? $category->label : "{$category->label} Tools" }}
            </h1>
            <p class="text-lg sm:text-xl text-base-content/75 leading-relaxed font-normal">
                {{ $category->description }}
            </p>
        </header>

        {{-- Tools Grid (Wise white rounded-3xl cards on sage canvas) --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($tools as $tool)
                <a
                    href="{{ url('/' . $tool->slug) }}"
                    class="bg-base-100 border border-base-300 hover:border-primary/80 hover:shadow-xl transition-all p-7 rounded-3xl flex flex-col justify-between group no-underline"
                >
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="badge badge-sm badge-outline text-[11px] font-semibold border-base-300">
                                {{ $category->label }}
                            </span>
                            <span class="text-[11px] font-bold text-[#054d28] bg-[#e2f6d5] px-2.5 py-0.5 rounded-full">
                                Free &amp; Local
                            </span>
                        </div>
                        <h2 class="font-bold text-xl text-base-content group-hover:text-[#163300] dark:group-hover:text-[#9fe870] transition-colors font-display">
                            {{ $tool->title }}
                        </h2>
                        <p class="text-sm text-base-content/70 mt-2.5 line-clamp-3 leading-relaxed">
                            {{ $tool->description }}
                        </p>
                    </div>

                    <div class="mt-8 pt-4 border-t border-base-200 flex items-center justify-between text-xs font-bold text-base-content group-hover:text-[#163300] dark:group-hover:text-[#9fe870] transition-colors">
                        <span>Launch utility</span>
                        <span class="w-7 h-7 rounded-full bg-base-200 group-hover:bg-primary group-hover:text-primary-content flex items-center justify-center transition-all text-sm">
                            →
                        </span>
                    </div>
                </a>
            @endforeach
        </div>

        {{-- Educational Guide Callout for Category --}}
        @if(!empty($categoryGuide))
            <section aria-label="Category tutorial guide" class="mt-16 p-7 sm:p-8 rounded-3xl bg-base-100 border border-base-300 shadow-sm">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 {{ !empty($categoryGuide['relatedPosts']) ? 'border-b border-base-200' : '' }}">
                    <div class="max-w-2xl">
                        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-xs uppercase tracking-wider mb-2.5">
                            <span>📖 {{ $categoryGuide['badge'] }}</span>
                        </div>
                        <h2 class="text-xl sm:text-2xl font-black text-base-content font-display tracking-tight">
                            {{ $categoryGuide['title'] }}
                        </h2>
                        <p class="text-sm text-base-content/75 mt-2 leading-relaxed">
                            {{ $categoryGuide['description'] }}
                        </p>
                    </div>
                    <a
                        href="{{ $categoryGuide['url'] }}"
                        class="px-6 py-3 rounded-full bg-primary text-primary-content font-bold text-sm hover:bg-[#cdffad] transition-all shrink-0 text-center shadow-xs self-start md:self-auto"
                    >
                        Read Complete Guide →
                    </a>
                </div>

                @if(!empty($categoryGuide['relatedPosts']))
                    <div class="pt-5">
                        <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 font-mono mb-3 block">
                            Related In-Depth Tutorials:
                        </span>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            @foreach($categoryGuide['relatedPosts'] as $relPost)
                                <a
                                    href="{{ $relPost['url'] }}"
                                    class="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 hover:border-primary hover:bg-base-100 transition-all text-xs font-semibold text-base-content hover:text-[#163300] dark:hover:text-[#9fe870] flex items-center justify-between group no-underline"
                                >
                                    <span class="line-clamp-1">{{ $relPost['title'] }}</span>
                                    <span class="text-[#163300] dark:text-[#9fe870] font-bold opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                                </a>
                            @endforeach
                        </div>
                    </div>
                @endif
            </section>
        @endif

        {{-- Browse Sibling Categories --}}
        @if(!empty($otherCategories))
            <section aria-label="Browse more categories" class="mt-16 pt-10 border-t border-base-300">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-xl font-extrabold text-base-content font-display">
                            Explore More Tool Categories
                        </h2>
                        <p class="text-xs text-base-content/60 mt-0.5">
                            Discover free, client-side productivity utilities across all domains.
                        </p>
                    </div>
                    <a href="{{ route('home') }}#tools" class="text-xs font-bold text-[#163300] dark:text-[#9fe870] hover:underline">
                        View All Tools →
                    </a>
                </div>
                <div class="flex flex-wrap gap-2.5">
                    @foreach($otherCategories as $other)
                        <a
                            href="{{ route('category.show', $other->id) }}"
                            class="px-4 py-2 rounded-full bg-base-100 border border-base-300 text-xs font-semibold text-base-content hover:border-primary hover:bg-[#e2f6d5] hover:text-[#054d28] transition-all inline-flex items-center min-h-[40px]"
                        >
                            {{ $other->label }}
                        </a>
                    @endforeach
                </div>
            </section>
        @endif
    </div>
</x-layouts.app>
