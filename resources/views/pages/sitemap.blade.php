@php
    $categories = app(\App\Services\ToolRegistryService::class)->categories();
    $allTools = app(\App\Services\ToolRegistryService::class)->all();
@endphp

<x-layouts.app>
    @push('seo')
        <x-seo
            title="HTML Sitemap – All Free Tools & Categories | Tool4SaaS"
            description="Complete index of all 127 free online calculators, formatters, generators, converters, and PDF tools on Tool4SaaS."
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
                @php
                    $tools = array_values(array_filter($allTools, fn ($t) => $t->category === $category->id && !$t->isNoindex));
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
        </div>
    </div>
</x-layouts.app>
