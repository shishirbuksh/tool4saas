<x-card class="p-6 md:p-8" x-data="{
    currentGrade: 85,
    targetGrade: 90,
    finalWeight: 30,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('current')) {
            const c = parseFloat(params.get('current'));
            if (!isNaN(c) && c >= 0) this.currentGrade = c;
        }
        if (params.has('target')) {
            const t = parseFloat(params.get('target'));
            if (!isNaN(t) && t >= 0) this.targetGrade = t;
        }
        if (params.has('weight')) {
            const w = parseFloat(params.get('weight'));
            if (!isNaN(w) && w > 0 && w < 100) this.finalWeight = w;
        }
    },
    setPreset(cur, tgt, w) {
        this.currentGrade = cur;
        this.targetGrade = tgt;
        this.finalWeight = w;
    },
    get neededScore() {
        const cur = parseFloat(this.currentGrade) || 0;
        const tgt = parseFloat(this.targetGrade) || 0;
        const w = (parseFloat(this.finalWeight) || 0) / 100;
        if (w <= 0 || w >= 1) return '0.0';
        const needed = (tgt - (cur * (1 - w))) / w;
        return needed.toFixed(1);
    },
    get difficultyStatus() {
        const val = parseFloat(this.neededScore);
        if (val <= 0) return { label: 'Already Secured', color: 'bg-[#9fe870]/20 text-[#9fe870] border-[#9fe870]/30', desc: 'You already have enough points to reach this target grade even if you score zero on the final exam.' };
        if (val <= 70) return { label: 'Comfortable', color: 'bg-[#9fe870]/20 text-[#9fe870] border-[#9fe870]/30', desc: 'Easily achievable with standard coursework review and steady exam preparation.' };
        if (val <= 85) return { label: 'Realistic with Focus', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', desc: 'Moderate challenge; requires thorough review of core syllabus units and past tests.' };
        if (val <= 100) return { label: 'High Difficulty', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30', desc: 'Demands an almost flawless exam performance; prioritize all study time for this subject.' };
        return { label: 'Mathematically Impossible', color: 'bg-red-500/20 text-red-300 border-red-500/30', desc: 'This grade cannot be attained based on syllabus weightings unless your instructor offers extra credit.' };
    },
    get letterBreakdown() {
        const cur = parseFloat(this.currentGrade) || 0;
        const w = (parseFloat(this.finalWeight) || 0) / 100;
        if (w <= 0 || w >= 1) return [];
        const targets = [
            { grade: 'A (93%)', target: 93 },
            { grade: 'A- (90%)', target: 90 },
            { grade: 'B+ (87%)', target: 87 },
            { grade: 'B (83%)', target: 83 },
            { grade: 'B- (80%)', target: 80 },
            { grade: 'C (73%)', target: 73 },
            { grade: 'Pass / D (60%)', target: 60 },
        ];
        return targets.map(t => {
            const req = (t.target - (cur * (1 - w))) / w;
            return {
                grade: t.grade,
                target: t.target,
                needed: req <= 0 ? '0.0%' : (req > 100 ? req.toFixed(1) + '% (Extra Credit)' : req.toFixed(1) + '%'),
                possible: req <= 100,
            };
        });
    }
}">
    <div class="space-y-6">
        <x-student-tools-nav active="final-grade-calculator" />

        {{-- Quick Presets --}}
        <div>
            <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">1-Click Syllabus Presets</span>
            <div class="flex flex-wrap gap-2">
                <button
                    type="button"
                    @click="setPreset(85, 90, 30)"
                    class="px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                    :class="currentGrade === 85 && targetGrade === 90 && finalWeight === 30 ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28]'"
                >
                    College Standard (Final 30% · Want 90% A)
                </button>
                <button
                    type="button"
                    @click="setPreset(78, 80, 40)"
                    class="px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                    :class="currentGrade === 78 && targetGrade === 80 && finalWeight === 40 ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28]'"
                >
                    Heavy Final (Final 40% · Want 80% B)
                </button>
                <button
                    type="button"
                    @click="setPreset(91, 93, 20)"
                    class="px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                    :class="currentGrade === 91 && targetGrade === 93 && finalWeight === 20 ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28]'"
                >
                    High School AP (Final 20% · Want 93% A)
                </button>
            </div>
        </div>

        {{-- Interactive Inputs --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Current Class Grade (%)</label>
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    x-model.number="currentGrade"
                    class="input input-bordered w-full rounded-xl font-mono text-xl font-bold bg-base-100"
                    placeholder="85"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Your current running syllabus average</span>
            </div>

            <div class="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Desired Final Grade (%)</label>
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    x-model.number="targetGrade"
                    class="input input-bordered w-full rounded-xl font-mono text-xl font-bold bg-base-100"
                    placeholder="90"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Target grade you want to finish with</span>
            </div>

            <div class="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Final Exam Weight (%)</label>
                <input
                    type="number"
                    min="1"
                    max="99"
                    step="1"
                    x-model.number="finalWeight"
                    class="input input-bordered w-full rounded-xl font-mono text-xl font-bold bg-base-100"
                    placeholder="30"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">How much the final exam counts in syllabus</span>
            </div>
        </div>

        {{-- Dynamic Result Banner (Wise Forest Green Card) --}}
        <div class="p-6 md:p-8 rounded-3xl bg-[#163300] text-white space-y-4 shadow-sm">
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                    <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Required Final Exam Score</span>
                    <p class="font-mono text-4xl sm:text-5xl font-black mt-1 text-[#9fe870]" x-text="neededScore + '%'"></p>
                </div>
                <div class="text-right">
                    <span
                        class="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider border"
                        :class="difficultyStatus.color"
                        x-text="difficultyStatus.label"
                    ></span>
                </div>
            </div>

            <div class="pt-2 space-y-2">
                <p class="text-base sm:text-lg font-medium text-white/90">
                    To finish the course with a <span class="font-mono font-bold text-[#9fe870]" x-text="targetGrade + '%'"></span>, you need to score at least <span class="font-mono font-black text-2xl text-[#9fe870]" x-text="neededScore + '%'"></span> on your final exam.
                </p>
                <p class="text-xs text-white/70" x-text="difficultyStatus.desc"></p>
            </div>
        </div>

        {{-- Letter Grade Target Matrix --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-3">
                Score Requirements for Alternate Letter Grades
            </h3>
            <div class="overflow-x-auto rounded-2xl border border-base-300">
                <table class="table table-sm w-full text-xs">
                    <thead class="bg-base-200/60 font-mono">
                        <tr>
                            <th>Target Grade</th>
                            <th>Minimum Syllabus Cutoff</th>
                            <th>Required Final Exam Score</th>
                            <th>Feasibility</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-base-200">
                        <template x-for="(row, idx) in letterBreakdown" :key="idx">
                            <tr>
                                <td class="font-semibold" x-text="row.grade"></td>
                                <td class="font-mono" x-text="row.target + '%'"></td>
                                <td class="font-mono font-bold" :class="row.possible ? 'text-primary' : 'text-error'" x-text="row.needed"></td>
                                <td>
                                    <span
                                        class="badge badge-xs font-bold"
                                        :class="row.possible ? 'badge-success text-[#054d28]' : 'badge-error text-white'"
                                        x-text="row.possible ? 'Possible' : 'Unachievable'"
                                    ></span>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
