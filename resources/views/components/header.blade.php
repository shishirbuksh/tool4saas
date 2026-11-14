@php
    $categories = app(\App\Services\ToolRegistryService::class)->categories();
@endphp

<header
    x-data="{ mobileMenuOpen: false }"
    class="sticky top-0 z-40 w-full border-b border-base-300 bg-base-100/95 backdrop-blur-md transition-colors"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {{-- Brand Logo (Wise style: Bold display face + Vivid Lime accent badge) --}}
        <div class="flex items-center gap-8">
            <a href="{{ route('home') }}" class="flex items-center gap-2.5 group no-underline">
                <span class="w-9 h-9 rounded-xl bg-primary text-primary-content flex items-center justify-center text-sm font-black tracking-tight shadow-sm group-hover:scale-105 transition-transform">
                    4S
                </span>
                <span class="font-extrabold text-xl tracking-tight text-base-content font-display">
                    Tool4SaaS
                </span>
            </a>

            {{-- Desktop Navigation Links --}}
            <nav aria-label="Main Navigation" class="hidden md:flex items-center gap-1 text-sm font-semibold text-base-content/80">
                <a href="{{ route('home') }}#tools" class="px-3.5 py-2 rounded-full hover:bg-base-200 hover:text-base-content transition-colors">
                    All Tools
                </a>

                {{-- Categories Dropdown --}}
                <div class="dropdown dropdown-hover">
                    <div tabindex="0" role="button" class="px-3.5 py-2 rounded-full hover:bg-base-200 hover:text-base-content transition-colors flex items-center gap-1 cursor-pointer">
                        <span>Categories</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <ul tabindex="0" class="dropdown-content menu p-3 shadow-2xl bg-base-100 rounded-3xl w-72 border border-base-300 z-50 mt-1">
                        @foreach($categories as $category)
                            <li>
                                <a href="{{ route('category.show', $category->id) }}" class="rounded-xl py-2 px-3 hover:bg-base-200 flex flex-col items-start gap-0.5">
                                    <span class="font-bold text-sm text-base-content">{{ $category->label }}</span>
                                    <span class="text-xs text-base-content/60 line-clamp-1">{{ $category->description }}</span>
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>

                <a href="{{ route('blog.index') }}" class="px-3.5 py-2 rounded-full hover:bg-base-200 hover:text-base-content transition-colors">
                    Guides &amp; Blog
                </a>

                <a href="{{ route('about') }}" class="px-3.5 py-2 rounded-full hover:bg-base-200 hover:text-base-content transition-colors">
                    About
                </a>
            </nav>
        </div>

        {{-- Actions: Theme Toggle + Wise Signature Lime CTA Pill + Mobile Hamburger --}}
        <div class="flex items-center gap-2 sm:gap-3">
            <x-theme-toggle />

            {{-- Desktop CTA --}}
            <a
                href="{{ route('home') }}#tools"
                class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-content font-bold text-sm hover:bg-[#cdffad] active:scale-95 transition-all shadow-sm"
            >
                <span>Browse 127 Tools</span>
                <span class="text-xs">→</span>
            </a>

            {{-- Mobile Menu Hamburger Button (min 44x44 touch target) --}}
            <button
                type="button"
                @click="mobileMenuOpen = !mobileMenuOpen"
                class="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-base-200 text-base-content hover:bg-base-300 focus:outline-none transition-colors"
                aria-label="Toggle mobile menu"
                :aria-expanded="mobileMenuOpen"
            >
                <svg x-show="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg x-show="mobileMenuOpen" style="display: none;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>

    {{-- Mobile Dropdown Drawer --}}
    <div
        x-show="mobileMenuOpen"
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0 -translate-y-2"
        x-transition:enter-end="opacity-100 translate-y-0"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 -translate-y-2"
        style="display: none;"
        @click.outside="mobileMenuOpen = false"
        class="md:hidden border-t border-base-300 bg-base-100 px-4 pt-4 pb-6 shadow-2xl max-h-[85vh] overflow-y-auto"
    >
        <div class="space-y-4">
            {{-- Mobile Quick Actions --}}
            <div class="pt-1">
                <a
                    href="{{ route('home') }}#tools"
                    @click="mobileMenuOpen = false"
                    class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-content font-bold text-base hover:bg-[#cdffad] transition-all shadow-sm"
                >
                    <span>Browse All 127 Tools</span>
                    <span>→</span>
                </a>
            </div>

            {{-- Mobile Nav Links --}}
            <nav class="flex flex-col gap-1 text-sm font-semibold text-base-content">
                <a
                    href="{{ route('home') }}"
                    @click="mobileMenuOpen = false"
                    class="px-4 py-2.5 rounded-xl hover:bg-base-200 transition-colors flex items-center justify-between"
                >
                    <span>Home</span>
                    <span class="text-xs text-base-content/50">→</span>
                </a>
                <a
                    href="{{ route('blog.index') }}"
                    @click="mobileMenuOpen = false"
                    class="px-4 py-2.5 rounded-xl hover:bg-base-200 transition-colors flex items-center justify-between"
                >
                    <span>Guides &amp; Blog</span>
                    <span class="text-xs text-base-content/50">→</span>
                </a>
                <a
                    href="{{ route('about') }}"
                    @click="mobileMenuOpen = false"
                    class="px-4 py-2.5 rounded-xl hover:bg-base-200 transition-colors flex items-center justify-between"
                >
                    <span>About Tool4SaaS</span>
                    <span class="text-xs text-base-content/50">→</span>
                </a>
            </nav>

            {{-- Categories Section in Mobile Drawer --}}
            <div class="pt-3 border-t border-base-200">
                <div class="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
                    Tool Categories
                </div>
                <div class="grid grid-cols-2 gap-1.5">
                    @foreach($categories as $category)
                        <a
                            href="{{ route('category.show', $category->id) }}"
                            @click="mobileMenuOpen = false"
                            class="px-3 py-2 rounded-xl bg-base-200/60 hover:bg-base-200 text-xs font-semibold text-base-content truncate transition-colors"
                        >
                            {{ $category->label }}
                        </a>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</header>
