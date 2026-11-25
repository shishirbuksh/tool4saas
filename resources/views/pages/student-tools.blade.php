<x-layouts.app>
    @push('seo')
        <x-seo
            title="Free Student Tools &amp; Study Calculators — Attendance, GPA, Finals"
            description="Free online student tools: calculate 75% attendance bunk limits, final exam target scores, CGPA to percentage, and 4.0 GPA with zero signup and 100% privacy."
            canonical="{{ url('/student-tools') }}"
        />
    @endpush

    <div
        x-data="{
            searchQuery: '',
            selectedCategory: 'all',
            tools: [
                {
                    slug: 'attendance-calculator',
                    name: 'Attendance & Bunk Calculator',
                    category: 'attendance',
                    categoryLabel: 'Attendance & Finals',
                    badge: '75% Mandatory Rule',
                    icon: '🏫',
                    description: 'Calculate your college attendance percentage and find out how many classes you can safely bunk or must attend to maintain 75% or 80%.',
                    features: ['75% UGC/AICTE presets', 'Bunk margin calculation', 'Recovery class quota']
                },
                {
                    slug: 'final-grade-calculator',
                    name: 'Final Exam Grade Calculator',
                    category: 'attendance',
                    categoryLabel: 'Attendance & Finals',
                    badge: 'Exam Target',
                    icon: '🎯',
                    description: 'Determine the exact score you need on your final exam to pass or secure an A, B, or C based on your syllabus category weightings.',
                    features: ['Weighted syllabus algebra', 'Alternate letter grade matrix', 'Difficulty status meter']
                },
                {
                    slug: 'cgpa-to-percentage-calculator',
                    name: 'CGPA to Percentage Calculator',
                    category: 'gpa',
                    categoryLabel: 'GPA & Grades',
                    badge: 'CBSE, VTU & Uni Scales',
                    icon: '🇮🇳',
                    description: 'Convert 10-point CGPA to equivalent percentage using official CBSE 9.5 multiplier, VTU, Mumbai University, and standard formulas.',
                    features: ['CBSE 9.5x official rule', 'VTU [CGPA-0.75]x10', 'Mumbai Uni piecewise engine']
                },
                {
                    slug: 'gpa-calculator',
                    name: 'College & High School GPA Calculator',
                    category: 'gpa',
                    categoryLabel: 'GPA & Grades',
                    badge: '4.0 Scale & Weighted',
                    icon: '📊',
                    description: 'Calculate cumulative semester GPA on standard 4.0 scale with support for AP, IB, and college course unit credit weightings.',
                    features: ['Dean\'s list 3.92 benchmark', 'Letter grade conversions', 'Credit hour weighting']
                },
                {
                    slug: 'grade-calculator',
                    name: 'Weighted Course Grade Calculator',
                    category: 'gpa',
                    categoryLabel: 'GPA & Grades',
                    badge: 'Syllabus Planner',
                    icon: '⚖️',
                    description: 'Compute overall weighted course average across homework assignments, quizzes, lab reports, midterms, and final exam categories.',
                    features: ['Custom weight percentages', 'Multi-assessment rows', 'College & STEM lab presets']
                },
                {
                    slug: 'percentage-calculator',
                    name: 'Percentage & Marks Calculator',
                    category: 'gpa',
                    categoryLabel: 'GPA & Grades',
                    badge: 'Exam Marks',
                    icon: '🔢',
                    description: 'Calculate exam marks percentage, fraction of totals, percentage increase, discounts, and proportional academic mark distributions.',
                    features: ['Marks to percentage', 'Percentage of a number', 'Step-by-step breakdown']
                },
                {
                    slug: 'scientific-calculator',
                    name: 'Scientific Calculator',
                    category: 'math',
                    categoryLabel: 'Math & STEM',
                    badge: 'Trig & Calculus',
                    icon: '🔬',
                    description: 'Advanced browser scientific calculator supporting trigonometry, logarithms, roots, powers, factorials, and Deg/Rad angle modes.',
                    features: ['PEMDAS hierarchy', 'Trigonometric functions', 'Logarithmic calculations']
                },
                {
                    slug: 'fraction-calculator',
                    name: 'Fraction & Mixed Number Calculator',
                    category: 'math',
                    categoryLabel: 'Math & STEM',
                    badge: 'Mixed Fractions',
                    icon: '➗',
                    description: 'Add, subtract, multiply, and divide proper, improper, and mixed fractions with automatic unlike-denominator simplification.',
                    features: ['Greatest common divisor', 'Unlike denominators', 'Decimal fraction conversion']
                },
                {
                    slug: 'percentage-change',
                    name: 'Percentage Change & Growth Calculator',
                    category: 'math',
                    categoryLabel: 'Math & STEM',
                    badge: 'Score Growth',
                    icon: '📈',
                    description: 'Measure score improvement, test score changes, grade growth, and percentage difference between baseline and final exams.',
                    features: ['Percent increase / decrease', 'Initial vs final values', 'Absolute difference']
                },
                {
                    slug: 'word-counter',
                    name: 'Essay Word & Reading Time Counter',
                    category: 'writing',
                    categoryLabel: 'Writing & Essays',
                    badge: 'Essay Helper',
                    icon: '📝',
                    description: 'Count words, characters, sentences, paragraphs, and estimated speech and reading times for thesis papers and term essays.',
                    features: ['Character limits tracker', 'Reading time estimator', 'Keyword density checker']
                },
                {
                    slug: 'plagiarism-checker',
                    name: 'Plagiarism & Text Similarity Checker',
                    category: 'writing',
                    categoryLabel: 'Writing & Essays',
                    badge: 'Originality Check',
                    icon: '🔍',
                    description: 'Compare essay drafts, assignments, and reference papers to identify matching phrases and uncredited text overlap locally.',
                    features: ['100% private comparison', 'N-gram phrase matching', 'Zero data transmission']
                },
                {
                    slug: 'typing-speed-test',
                    name: 'Typing Speed Test (WPM & Accuracy)',
                    category: 'writing',
                    categoryLabel: 'Writing & Essays',
                    badge: 'WPM Test',
                    icon: '⌨️',
                    description: 'Test and improve typing words per minute (WPM), keystroke accuracy, and error rate before taking timed online examinations.',
                    features: ['1-minute speed trials', 'Live gross & net WPM', 'Real-time accuracy analysis']
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
                            <li class="text-base-content font-bold">Student Tools Suite</li>
                        </ul>
                    </nav>

                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-xs uppercase tracking-wider shadow-xs">
                        <span class="w-2 h-2 rounded-full bg-[#2ead4b] animate-pulse"></span>
                        <span>12 Free Academic Utilities · 100% Client-Side Privacy</span>
                    </div>

                    <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-base-content leading-tight font-display">
                        All Student Tools in <span class="text-primary-content bg-primary px-3.5 py-1 rounded-2xl inline-block mt-1">One Place.</span>
                    </h1>

                    <p class="text-base sm:text-lg text-base-content/80 leading-relaxed">
                        Calculate 75% attendance bunk limits, predict final exam target scores, convert CBSE/VTU CGPA to percentages, calculate GPA, and solve math problems. Zero signups, zero server logging, and runs 100% in your browser.
                    </p>

                    {{-- Search Input --}}
                    <div class="relative pt-2">
                        <div class="absolute inset-y-0 left-0 pl-4 pt-2 flex items-center pointer-events-none text-base-content/50">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            x-model="searchQuery"
                            placeholder="Filter student tools (e.g. bunk, attendance, gpa, cbse, finals, essay, fraction)..."
                            class="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-base-100 border border-base-300 text-base-content placeholder:text-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-xs"
                        />
                        <button
                            x-show="searchQuery.length > 0"
                            style="display: none;"
                            type="button"
                            @click="searchQuery = ''"
                            class="absolute inset-y-0 right-0 pr-4 pt-2 flex items-center text-xs font-bold text-base-content/60 hover:text-base-content"
                        >
                            ✕
                        </button>
                    </div>

                    {{-- Category Filter Pills --}}
                    <div class="flex flex-wrap items-center gap-2 pt-1">
                        <button
                            type="button"
                            @click="selectedCategory = 'all'"
                            class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all min-h-[38px]"
                            :class="selectedCategory === 'all' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-[#e2f6d5]'"
                        >
                            All Student Tools (12)
                        </button>
                        <button
                            type="button"
                            @click="selectedCategory = 'attendance'"
                            class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all min-h-[38px]"
                            :class="selectedCategory === 'attendance' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-[#e2f6d5]'"
                        >
                            🏫 Attendance &amp; Finals
                        </button>
                        <button
                            type="button"
                            @click="selectedCategory = 'gpa'"
                            class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all min-h-[38px]"
                            :class="selectedCategory === 'gpa' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-[#e2f6d5]'"
                        >
                            📊 GPA &amp; Grade Conversions
                        </button>
                        <button
                            type="button"
                            @click="selectedCategory = 'math'"
                            class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all min-h-[38px]"
                            :class="selectedCategory === 'math' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-[#e2f6d5]'"
                        >
                            🔬 Math &amp; STEM
                        </button>
                        <button
                            type="button"
                            @click="selectedCategory = 'writing'"
                            class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all min-h-[38px]"
                            :class="selectedCategory === 'writing' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-[#e2f6d5]'"
                        >
                            ✍️ Writing &amp; Research
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {{-- Tools Grid Section --}}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h2 class="text-xl sm:text-2xl font-black text-base-content font-display">
                        <span x-text="filteredTools.length"></span> Student Utilities Ready to Launch
                    </h2>
                    <p class="text-xs text-base-content/60 font-mono mt-1">
                        Select any tool below to compute results instantly in your browser with zero data storage.
                    </p>
                </div>
            </div>

            {{-- Grid of Tools --}}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <template x-for="tool in filteredTools" :key="tool.slug">
                    <div class="bg-base-100 border border-base-300 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-primary hover:shadow-md transition-all flex flex-col justify-between group">
                        <div class="space-y-4">
                            <div class="flex items-start justify-between gap-3">
                                <div class="w-12 h-12 rounded-2xl bg-base-200 border border-base-300 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                                    <span x-text="tool.icon"></span>
                                </div>
                                <span class="px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-[#e2f6d5] text-[#054d28]" x-text="tool.badge"></span>
                            </div>

                            <div>
                                <h3 class="text-lg font-bold text-base-content font-display group-hover:text-primary transition-colors" x-text="tool.name"></h3>
                                <p class="text-xs text-base-content/70 mt-2 leading-relaxed" x-text="tool.description"></p>
                            </div>

                            {{-- Feature Chips --}}
                            <div class="flex flex-wrap gap-1.5 pt-2">
                                <template x-for="(feat, fIdx) in tool.features" :key="fIdx">
                                    <span class="px-2 py-0.5 rounded-md bg-base-200/80 text-[10px] font-mono text-base-content/70" x-text="'✓ ' + feat"></span>
                                </template>
                            </div>
                        </div>

                        {{-- Action Launch Button --}}
                        <div class="pt-6 mt-6 border-t border-base-200">
                            <a
                                :href="'/' + tool.slug"
                                class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-base-200 group-hover:bg-[#163300] text-base-content group-hover:text-[#9fe870] font-bold text-xs sm:text-sm transition-all no-underline shadow-xs"
                            >
                                <span>Open Tool</span>
                                <span class="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>
                </template>
            </div>

            {{-- Empty State --}}
            <div x-show="filteredTools.length === 0" style="display: none;" class="text-center py-16 bg-base-100 rounded-3xl border border-base-300 p-8">
                <span class="text-4xl block mb-2">🔍</span>
                <h3 class="text-lg font-bold">No student tools match your search</h3>
                <p class="text-xs text-base-content/60 mt-1">Try searching for keywords like "bunk", "attendance", "grade", "gpa", or "fraction".</p>
                <button type="button" @click="searchQuery = ''; selectedCategory = 'all'" class="btn btn-sm btn-primary rounded-xl font-bold mt-4">
                    Clear Filters
                </button>
            </div>

            {{-- Educational Method & Privacy Guarantee Card --}}
            <div class="mt-14 bg-base-100 border border-base-300 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-xs uppercase tracking-wider">
                    <span>Student Privacy Guarantee</span>
                </div>
                <h3 class="text-2xl font-black text-base-content font-display">
                    Why Students Worldwide Trust Tool4SaaS
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-base-content/80 leading-relaxed">
                    <div class="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-2">
                        <span class="font-bold text-sm text-base-content block">🔒 100% Browser Local</span>
                        <p>Unlike university portals and third-party grade trackers, your grades, syllabus marks, and attendance counts are processed locally in your browser. Zero data leaves your device.</p>
                    </div>
                    <div class="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-2">
                        <span class="font-bold text-sm text-base-content block">⚡ Instant Calculation</span>
                        <p>No waiting for page reloads or database queries. All algebraic calculations, WAM sums, and attendance formulas update in real time as you adjust input values.</p>
                    </div>
                    <div class="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-2">
                        <span class="font-bold text-sm text-base-content block">🎓 Multi-Board Standards</span>
                        <p>Our algorithms follow official institutional guidelines from UGC, AICTE, CBSE (9.5 multiplier), VTU, Mumbai University, US 4.0 GPA standards, and STEM grading conventions.</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</x-layouts.app>
