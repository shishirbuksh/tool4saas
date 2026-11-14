<x-layouts.app>
    @push('seo')
        <x-seo
            :title="$metaTitle"
            :description="$metaDescription"
            :canonical="$canonical"
            :jsonLd="$jsonLd ?? null"
        />
    @endpush

    <main id="main-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
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
                {{ $category->label }} Tools
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
                        <h2 class="font-bold text-xl text-base-content group-hover:text-primary transition-colors font-display">
                            {{ $tool->title }}
                        </h2>
                        <p class="text-sm text-base-content/70 mt-2.5 line-clamp-3 leading-relaxed">
                            {{ $tool->description }}
                        </p>
                    </div>

                    <div class="mt-8 pt-4 border-t border-base-200 flex items-center justify-between text-xs font-bold text-base-content group-hover:text-primary transition-colors">
                        <span>Launch utility</span>
                        <span class="w-7 h-7 rounded-full bg-base-200 group-hover:bg-primary group-hover:text-primary-content flex items-center justify-center transition-all text-sm">
                            →
                        </span>
                    </div>
                </a>
            @endforeach
        </div>
    </main>
</x-layouts.app>
