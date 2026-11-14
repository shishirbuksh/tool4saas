@props([
    'tool',
    'category',
    'seeAlso' => [],
    'relatedTools' => [],
    'relatedHeading' => 'More Utilities',
    'ymylType' => null,
])

<main id="main-content" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
    {{-- Breadcrumbs --}}
    <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-6">
        <ul>
            <li><a href="{{ route('home') }}" class="hover:text-primary font-medium">Home</a></li>
            @if($category)
                <li><a href="{{ route('category.show', $category->id) }}" class="hover:text-primary font-medium">{{ $category->label }}</a></li>
            @endif
            <li class="text-base-content font-bold">{{ $tool->title }}</li>
        </ul>
    </nav>

    {{-- Hero Heading & TL;DR (Wise display typography) --}}
    <header class="mb-10">
        <div class="flex items-center gap-2.5 mb-3.5">
            @if($category)
                <span class="badge badge-outline border-base-300 text-xs font-semibold uppercase tracking-wider">
                    {{ $category->label }}
                </span>
            @endif
            <span class="badge badge-sm border-none bg-[#e2f6d5] text-[#054d28] font-bold text-[11px] px-3 py-1 rounded-full">
                100% Client-Side Privacy
            </span>
        </div>

        <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-base-content mb-4 font-display">
            {{ $tool->title }}
        </h1>

        <p class="text-lg sm:text-xl text-base-content/80 font-normal leading-relaxed max-w-3xl tldr-passage">
            {{ $tool->description }}
        </p>
    </header>

    {{-- YMYL Disclaimer --}}
    @if($ymylType)
        <x-ymyl-disclaimer :type="$ymylType" />
    @endif

    {{-- Main Interactive Tool Island (Wise white rounded-3xl container) --}}
    <section aria-label="{{ $tool->title }} interactive utility" class="my-10">
        {{ $slot }}
    </section>

    {{-- Quick "See Also" Chips (Wise rounded pill buttons) --}}
    @if(!empty($seeAlso))
        <div class="flex items-center flex-wrap gap-2 my-10 pt-6 border-t border-base-300">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 mr-1">See Also:</span>
            @foreach($seeAlso as $also)
                <a href="{{ url('/' . $also['slug']) }}" class="px-3.5 py-1.5 rounded-full bg-base-100 border border-base-300 text-xs font-semibold text-base-content hover:border-primary hover:bg-[#e2f6d5] transition-all">
                    {{ $also['title'] }}
                </a>
            @endforeach
        </div>
    @endif

    {{-- How-To Steps (Wise rounded-3xl cards with lime step numbers) --}}
    @if(!empty($tool->howTo))
        <section aria-label="Step-by-step instructions" class="my-14">
            <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-base-content mb-6 font-display">
                How to Use the {{ $tool->title }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                @foreach($tool->howTo as $index => $step)
                    <div class="bg-base-100 border border-base-300 p-6 rounded-3xl flex flex-col justify-between shadow-sm">
                        <div>
                            <div class="w-8 h-8 rounded-full bg-primary text-primary-content font-black text-xs flex items-center justify-center mb-3.5 shadow-sm">
                                {{ $index + 1 }}
                            </div>
                            <h3 class="font-bold text-base text-base-content mb-1.5 font-display">{{ $step['name'] }}</h3>
                            <p class="text-sm text-base-content/75 leading-relaxed">{{ $step['text'] }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </section>
    @endif

    {{-- Comprehensive Guide Sections --}}
    @if(!empty($tool->guide))
        <section aria-label="In-depth guide and reference" class="my-14 prose max-w-none">
            @foreach($tool->guide as $section)
                <div class="mb-10">
                    <h2 class="text-2xl font-bold text-base-content mb-3 font-display">{{ $section['heading'] }}</h2>
                    <p class="text-base text-base-content/80 leading-relaxed mb-4">{{ $section['body'] }}</p>
                </div>
            @endforeach
        </section>
    @endif

    {{-- FAQ Accordion (Wise rounded-2xl collapse) --}}
    @if(!empty($tool->faq))
        <section aria-label="Frequently asked questions" class="my-14">
            <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-base-content mb-6 font-display">
                Frequently Asked Questions
            </h2>
            <div class="space-y-3.5">
                @foreach($tool->faq as $f)
                    <div class="collapse collapse-plus bg-base-100 border border-base-300 rounded-2xl shadow-sm">
                        <input type="radio" name="tool-faq" />
                        <div class="collapse-title font-bold text-base text-base-content font-display">
                            {{ $f['question'] }}
                        </div>
                        <div class="collapse-content text-sm text-base-content/80 leading-relaxed">
                            <p class="pt-2">{{ $f['answer'] }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </section>
    @endif

    {{-- Related Tools Mesh --}}
    @if(!empty($relatedTools))
        <section aria-label="Related utilities" class="mt-16 pt-10 border-t border-base-300">
            <h2 class="text-xl font-bold text-base-content mb-4 font-display">{{ $relatedHeading }}</h2>
            <div class="flex flex-wrap gap-2.5">
                @foreach($relatedTools as $rel)
                    <a
                        href="{{ url('/' . $rel['slug']) }}"
                        class="inline-flex items-center px-4 py-2 rounded-full bg-base-100 border border-base-300 text-sm font-semibold text-base-content hover:border-primary hover:text-primary transition-all"
                        title="{{ $rel['title'] }} – {{ $rel['short'] }}"
                    >
                        {{ $rel['title'] }}
                    </a>
                @endforeach
            </div>
        </section>
    @endif

    {{-- E-E-A-T Author & Reviewer Attribution Box --}}
    <aside class="mt-14 p-7 rounded-3xl bg-base-100 border border-base-300 flex items-start gap-4.5 shadow-sm">
        <div class="w-12 h-12 rounded-2xl bg-primary text-primary-content font-black text-lg flex items-center justify-center shrink-0">
            4S
        </div>
        <div>
            <h4 class="font-bold text-sm text-base-content font-display">Tool4SaaS Editorial &amp; Engineering Team</h4>
            <p class="text-xs text-base-content/70 mt-1.5 leading-relaxed">
                Reviewed and maintained by our in-house engineering team. Each algorithm and client-side processing script is tested across Chrome, Firefox, Safari, and Edge to guarantee mathematical accuracy, zero server data egress, and WCAG accessibility standards.
            </p>
        </div>
    </aside>
</main>
