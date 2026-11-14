<x-layouts.app :meta="$meta" :jsonLd="$jsonLd">
    <div class="max-w-7xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        {{-- Breadcrumbs --}}
        <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-8">
            <ul>
                <li><a href="/" class="hover:text-primary font-medium">Home</a></li>
                <li class="text-base-content font-bold">Blog</li>
            </ul>
        </nav>

        {{-- Wise Header --}}
        <div class="mb-14 max-w-3xl">
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-xs uppercase tracking-wider mb-4">
                Free Educational Guides
            </span>
            <h1 class="text-4xl md:text-6xl font-black tracking-tight text-base-content font-display mb-4">
                Guides &amp; Tutorials
            </h1>
            <p class="text-lg md:text-xl text-base-content/75 leading-relaxed font-normal">
                Deep walkthroughs for our productivity tools. Every guide includes worked mathematical examples, regulatory benchmarks, and practical workflows.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
            @foreach ($sections as $section)
                <div class="bg-base-100 border border-base-300 hover:border-primary/80 hover:shadow-xl transition-all p-7 sm:p-8 rounded-3xl flex flex-col justify-between group">
                    <div>
                        <div class="flex items-center gap-2 mb-3.5">
                            <span class="px-3 py-1 rounded-full bg-base-200 text-base-content font-mono text-[11px] font-bold uppercase tracking-wider">
                                {{ count($section['clusters']) }} Tutorials · ~{{ number_format($section['words']) }} words
                            </span>
                        </div>
                        <a href="/blog/{{ $section['meta']->pillar }}" class="no-underline group">
                            <h2 class="text-2xl font-black tracking-tight text-base-content group-hover:text-primary transition-colors font-display">
                                {{ $section['meta']->title }}
                            </h2>
                        </a>
                        <p class="text-sm text-base-content/75 mt-3 mb-6 line-clamp-3 leading-relaxed">
                            {{ $section['meta']->description }}
                        </p>

                        @if (count($section['clusters']) > 0)
                            <div class="space-y-2.5 mb-6 pt-4 border-t border-base-200">
                                <span class="text-xs font-bold uppercase tracking-wider text-base-content/50">Top tutorials:</span>
                                <ul class="space-y-2 text-sm">
                                    @foreach (array_slice($section['clusters'], 0, 3) as $cluster)
                                        <li>
                                            <a href="/blog/{{ $section['meta']->pillar }}/{{ $cluster->slug }}" class="hover:text-primary text-base-content/85 line-clamp-1 transition-colors flex items-center gap-1.5 font-medium">
                                                <span class="text-primary font-bold">→</span>
                                                <span>{{ $cluster->title }}</span>
                                            </a>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                    </div>

                    <div class="pt-5 border-t border-base-200 flex items-center justify-between">
                        <span class="text-xs font-semibold text-base-content/60">Comprehensive guide</span>
                        <a href="/blog/{{ $section['meta']->pillar }}" class="inline-flex items-center gap-1 text-sm font-bold text-base-content group-hover:text-primary transition-colors">
                            <span>Read guide</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</x-layouts.app>
