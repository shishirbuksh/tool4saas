@props(['active' => null])

@php
    $studentTools = [
        [
            'slug' => 'attendance-calculator',
            'name' => 'Attendance & Bunk',
            'icon' => '🏫',
            'badge' => '75% Rule',
        ],
        [
            'slug' => 'final-grade-calculator',
            'name' => 'Final Exam Target',
            'icon' => '🎯',
            'badge' => 'Required',
        ],
        [
            'slug' => 'cgpa-to-percentage-calculator',
            'name' => 'CGPA to % Converter',
            'icon' => '🇮🇳',
            'badge' => 'CBSE/VTU',
        ],
        [
            'slug' => 'gpa-calculator',
            'name' => 'College GPA (4.0)',
            'icon' => '📊',
            'badge' => 'Weighted',
        ],
        [
            'slug' => 'grade-calculator',
            'name' => 'Weighted Course Grade',
            'icon' => '⚖️',
            'badge' => 'Syllabus',
        ],
        [
            'slug' => 'student-loan-calculator',
            'name' => 'Student Loan Payoff',
            'icon' => '💳',
            'badge' => 'High CPC',
        ],
        [
            'slug' => 'scientific-calculator',
            'name' => 'Scientific Calculator',
            'icon' => '🔬',
            'badge' => 'STEM',
        ],
        [
            'slug' => 'fraction-calculator',
            'name' => 'Fraction Calculator',
            'icon' => '➗',
            'badge' => 'Math',
        ],
    ];
@endphp

<div class="mb-6 p-3 rounded-2xl bg-base-200/70 border border-base-300">
    <div class="flex items-center justify-between gap-2 mb-2 px-1">
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#2ead4b] animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/70 font-mono">
                🎓 Student Tools Suite — Quick Switch
            </span>
        </div>
        <a
            href="{{ route('student-tools') }}"
            class="text-xs font-bold text-primary hover:underline flex items-center gap-1 group no-underline"
        >
            <span>Browse All 13 Student Tools</span>
            <span class="group-hover:translate-x-0.5 transition-transform">→</span>
        </a>
    </div>

    {{-- Horizontal Scrollable Pill Carousel --}}
    <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        @foreach($studentTools as $tool)
            @php
                $isActive = $active === $tool['slug'];
            @endphp
            <a
                href="{{ url('/' . $tool['slug']) }}"
                class="px-3.5 py-2 rounded-xl border flex items-center gap-1.5 whitespace-nowrap transition-all min-h-[38px] no-underline shrink-0 {{ $isActive ? 'bg-[#163300] text-[#9fe870] border-[#163300] font-bold shadow-xs' : 'bg-base-100 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28] hover:border-primary font-medium' }}"
            >
                <span>{{ $tool['icon'] }}</span>
                <span>{{ $tool['name'] }}</span>
                @if($isActive)
                    <span class="px-1.5 py-0.5 rounded-md bg-[#9fe870]/20 text-[#9fe870] text-[10px] font-mono uppercase font-bold">Active</span>
                @endif
            </a>
        @endforeach

        <a
            href="{{ route('student-tools') }}"
            class="px-3.5 py-2 rounded-xl bg-primary text-primary-content font-bold whitespace-nowrap transition-all min-h-[38px] no-underline shrink-0 hover:bg-[#cdffad] flex items-center gap-1 shadow-xs"
        >
            <span>All Hub Tools</span>
            <span>→</span>
        </a>
    </div>
</div>
