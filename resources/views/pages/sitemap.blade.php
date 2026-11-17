@php
    $categories = app(\App\Services\ToolRegistryService::class)->categories();
    $allTools = app(\App\Services\ToolRegistryService::class)->all();
@endphp

<x-layouts.app>
    @php
        $toolCount = count($allTools);
    @endphp

    @push('seo')
        <x-seo
            title="HTML Sitemap – All Free Tools & Categories | Tool4SaaS"
            description="Complete index of all {{ $toolCount }} free online calculators, formatters, generators, converters, and PDF tools on Tool4SaaS."
            canonical="{{ route('sitemap.html') }}"
        />
    @endpush

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-6">
            <ul>
                <li><a href="{{ route('home') }}" class="hover:text-primary">Home</a></li>
                <li class="text-base-content font-medium">Sitemap</li>
            </ul>
        </nav>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-base-content tracking-tight mb-4">
            HTML Sitemap
        </h1>
        <p class="text-base text-base-content/75 mb-12 max-w-2xl">
            Quick directory access to every tool, guide, category, and reference utility available across Tool4SaaS.
        </p>

        <div class="space-y-12">
            @foreach($categories as $category)
                @if(!$category->isIndexable())
                    @continue
                @endif
                @php
                    $tools = array_values(array_filter($allTools, fn ($t) => $t->category === $category->id && $t->isIndexable()));
                @endphp
                <div class="border-b border-base-300 pb-8">
                    <h2 class="text-2xl font-bold text-base-content mb-2 flex items-center justify-between">
                        <a href="{{ route('category.show', $category->id) }}" class="hover:text-primary transition-colors">
                            {{ $category->label }}
                        </a>
                        <span class="text-xs font-normal text-base-content/60">{{ count($tools) }} tools</span>
                    </h2>
                    <p class="text-sm text-base-content/70 mb-4">{{ $category->description }}</p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        @foreach($tools as $tool)
                            <a
                                href="{{ url('/' . $tool->slug) }}"
                                class="p-3 rounded-xl bg-base-100 border border-base-300 hover:border-primary text-sm font-medium text-base-content hover:text-primary transition-all flex items-center justify-between"
                            >
                                <span>{{ $tool->title }}</span>
                                <span class="text-xs text-base-content/40 font-mono">→</span>
                            </a>
                        @endforeach
                    </div>
                </div>
            @endforeach

            @php
                $blogService = app(\App\Services\BlogService::class);
                $pillars = $blogService->getAllPillars();
            @endphp
            <div class="border-b border-base-300 pb-8">
                <h2 class="text-2xl font-bold text-base-content mb-2 flex items-center justify-between">
                    <a href="{{ route('blog.index') }}" class="hover:text-primary transition-colors">
                        Guides &amp; Technical Tutorials
                    </a>
                    <span class="text-xs font-normal text-base-content/60">{{ count($pillars) }} guide hubs</span>
                </h2>
                <p class="text-sm text-base-content/70 mb-6">In-depth technical guides, step-by-step walkthroughs, and practical tutorials.</p>

                <div class="space-y-6">
                    @foreach($pillars as $pillar)
                        @php
                            $clusters = array_values(array_filter(
                                $blogService->getClustersForPillar($pillar->pillar),
                                fn ($c) => !$c->isNoindex
                            ));
                        @endphp
                        <div class="p-5 rounded-2xl bg-base-100 border border-base-300">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <a
                                    href="{{ url('/blog/' . $pillar->pillar) }}"
                                    class="text-base font-bold text-base-content hover:text-primary font-display flex items-center gap-2"
                                >
                                    <span>{{ $pillar->title }}</span>
                                    <span class="text-xs text-primary font-mono">→</span>
                                </a>
                                <span class="text-xs text-base-content/50 font-mono">{{ count($clusters) }} tutorials</span>
                            </div>
                            @if(!empty($clusters))
                                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2 border-t border-base-200">
                                    @foreach($clusters as $cluster)
                                        <a
                                            href="{{ url('/blog/' . $pillar->pillar . '/' . $cluster->slug) }}"
                                            class="text-xs text-base-content/75 hover:text-primary transition-colors line-clamp-1 py-1 flex items-center gap-1.5"
                                        >
                                            <span class="text-base-content/40 font-bold">•</span>
                                            <span>{{ $cluster->title }}</span>
                                        </a>
                                    @endforeach
                                </div>
                            @endif
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</x-layouts.app>
