<x-card class="p-6 md:p-8" x-data="{
    converterMode: 'cgpa',
    cgpa: 8.5,
    scale: 'cbse',
    sgpaList: [
        { id: 1, sem: 'Semester 1', sgpa: 8.2, credits: 20 },
        { id: 2, sem: 'Semester 2', sgpa: 8.6, credits: 22 },
        { id: 3, sem: 'Semester 3', sgpa: 8.4, credits: 21 },
        { id: 4, sem: 'Semester 4', sgpa: 8.8, credits: 22 }
    ],
    nextSemId: 5,
    marksObtained: 465,
    totalMarks: 500,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('cgpa')) {
            const c = parseFloat(params.get('cgpa'));
            if (!isNaN(c) && c >= 0 && c <= 10) this.cgpa = c;
        }
        if (params.has('scale') && ['cbse', 'vtu', 'mumbai', 'aktu', 'generic'].includes(params.get('scale'))) {
            this.scale = params.get('scale');
        }
        if (params.has('mode') && ['cgpa', 'sgpa', 'marks'].includes(params.get('mode'))) {
            this.converterMode = params.get('mode');
        }
    },
    setScale(s) {
        this.scale = s;
    },
    setPreset(c, s) {
        this.cgpa = c;
        this.scale = s;
    },
    addSemester() {
        const num = this.sgpaList.length + 1;
        this.sgpaList.push({ id: this.nextSemId++, sem: 'Semester ' + num, sgpa: 8.5, credits: 20 });
    },
    removeSemester(id) {
        if (this.sgpaList.length > 1) {
            this.sgpaList = this.sgpaList.filter(s => s.id !== id);
        }
    },
    get percentage() {
        const c = parseFloat(this.cgpa) || 0;
        if (c <= 0) return '0.0';
        switch (this.scale) {
            case 'cbse':
                return (c * 9.5).toFixed(2);
            case 'vtu':
                return Math.max(0, (c - 0.75) * 10).toFixed(2);
            case 'mumbai':
                if (c < 7.0) {
                    return (7.1 + (7.25 * c)).toFixed(2);
                } else {
                    return Math.min(100, (7.4 * c) + 12).toFixed(2);
                }
            case 'aktu':
            case 'generic':
            default:
                return Math.min(100, c * 10).toFixed(2);
        }
    },
    get formulaExplanation() {
        const c = parseFloat(this.cgpa) || 0;
        switch (this.scale) {
            case 'cbse':
                return `CBSE Formula: Percentage = CGPA (${c}) × 9.5 = ${(c * 9.5).toFixed(2)}%`;
            case 'vtu':
                return `VTU Formula: Percentage = (CGPA (${c}) - 0.75) × 10 = ${Math.max(0, (c - 0.75) * 10).toFixed(2)}%`;
            case 'mumbai':
                if (c < 7.0) {
                    return `Mumbai University (<7.0): Percentage = 7.1 + (7.25 × ${c}) = ${(7.1 + (7.25 * c)).toFixed(2)}%`;
                } else {
                    return `Mumbai University (≥7.0): Percentage = (7.4 × ${c}) + 12 = ${Math.min(100, (7.4 * c) + 12).toFixed(2)}%`;
                }
            case 'aktu':
                return `AKTU / Anna University: Percentage = CGPA (${c}) × 10 = ${Math.min(100, c * 10).toFixed(2)}%`;
            default:
                return `Standard Linear: Percentage = CGPA (${c}) × 10 = ${Math.min(100, c * 10).toFixed(2)}%`;
        }
    },
    get equivalenceRows() {
        const points = [10.0, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0];
        return points.map(pt => {
            const cbsePct = (pt * 9.5).toFixed(1);
            const vtuPct = Math.max(0, (pt - 0.75) * 10).toFixed(1);
            let muPct = pt < 7.0 ? (7.1 + (7.25 * pt)).toFixed(1) : Math.min(100, (7.4 * pt) + 12).toFixed(1);
            const stdPct = (pt * 10).toFixed(1);
            return { pt, cbsePct, vtuPct, muPct, stdPct };
        });
    },
    get sgpaCalculation() {
        let totalCredits = 0;
        let weightedPoints = 0;
        this.sgpaList.forEach(s => {
            const c = parseFloat(s.credits) || 0;
            const pt = parseFloat(s.sgpa) || 0;
            totalCredits += c;
            weightedPoints += (pt * c);
        });
        const cumulativeCgpa = totalCredits > 0 ? (weightedPoints / totalCredits) : 0;
        const pct = (cumulativeCgpa * 9.5).toFixed(2);
        return {
            totalCredits: totalCredits,
            cumulativeCgpa: cumulativeCgpa.toFixed(2),
            percentage: pct
        };
    },
    get marksCalculation() {
        const obtained = parseFloat(this.marksObtained) || 0;
        const total = parseFloat(this.totalMarks) || 1;
        const pct = total > 0 ? Math.min(100, (obtained / total) * 100) : 0;
        const estCgpa = (pct / 9.5).toFixed(2);
        return {
            obtained: obtained,
            total: total,
            percentage: pct.toFixed(2),
            estimatedCgpa: estCgpa
        };
    }
}">
    <div class="space-y-6">
        <x-student-tools-nav active="cgpa-to-percentage-calculator" />

        {{-- Converter Mode Switcher Tabs --}}
        <div class="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-base-300">
            <div>
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/70 font-mono block">Conversion Mode</span>
                <span class="text-xs text-base-content/60">Switch between CGPA, SGPA-to-CGPA, and Marks Percentage</span>
            </div>
            <div class="join bg-base-200/80 p-1 rounded-2xl border border-base-300">
                <button
                    type="button"
                    @click="converterMode = 'cgpa'"
                    class="btn btn-sm rounded-xl join-item transition-all"
                    :class="converterMode === 'cgpa' ? 'bg-[#163300] text-[#9fe870] font-bold shadow-xs' : 'btn-ghost text-base-content/80'"
                >
                    🎓 CGPA to %
                </button>
                <button
                    type="button"
                    @click="converterMode = 'sgpa'"
                    class="btn btn-sm rounded-xl join-item transition-all"
                    :class="converterMode === 'sgpa' ? 'bg-[#163300] text-[#9fe870] font-bold shadow-xs' : 'btn-ghost text-base-content/80'"
                >
                    📊 SGPA to CGPA &amp; %
                </button>
                <button
                    type="button"
                    @click="converterMode = 'marks'"
                    class="btn btn-sm rounded-xl join-item transition-all"
                    :class="converterMode === 'marks' ? 'bg-[#163300] text-[#9fe870] font-bold shadow-xs' : 'btn-ghost text-base-content/80'"
                >
                    📝 Marks to %
                </button>
            </div>
        </div>

        {{-- MODE 1: CGPA to Percentage --}}
        <div x-show="converterMode === 'cgpa'" class="space-y-6">
            {{-- Board / University Selector Tabs --}}
            <div>
                <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">Select Educational Board or University Formula</span>
                <div class="flex flex-wrap gap-2">
                    <button
                        type="button"
                        @click="setScale('cbse')"
                        class="px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                        :class="scale === 'cbse' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28]'"
                    >
                        CBSE Board (9.5×)
                    </button>
                    <button
                        type="button"
                        @click="setScale('vtu')"
                        class="px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                        :class="scale === 'vtu' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28]'"
                    >
                        VTU Karnataka ([CGPA - 0.75] × 10)
                    </button>
                    <button
                        type="button"
                        @click="setScale('mumbai')"
                        class="px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                        :class="scale === 'mumbai' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28]'"
                    >
                        Mumbai University (Piecewise)
                    </button>
                    <button
                        type="button"
                        @click="setScale('aktu')"
                        class="px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                        :class="scale === 'aktu' ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28]'"
                    >
                        AKTU &amp; Anna University (10×)
                    </button>
                </div>
            </div>

            {{-- Interactive Inputs --}}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-base-200/50 p-5 rounded-2xl border border-base-300">
                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Cumulative Grade Point Average (CGPA)</label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.01"
                        value="8.50"
                        x-model.number="cgpa"
                        class="input input-bordered w-full rounded-xl font-mono text-2xl font-bold bg-base-100"
                        placeholder="8.50"
                    />
                    <span class="text-[11px] text-base-content/50 mt-1 block">Enter your 10-point scale CGPA</span>
                </div>

                <div class="bg-base-200/50 p-5 rounded-2xl border border-base-300 flex flex-col justify-between">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">1-Click Common Benchmarks</label>
                        <div class="flex flex-wrap gap-1.5">
                            <button type="button" @click="setPreset(9.5, scale)" class="px-3 py-1 rounded-lg bg-base-100 border border-base-300 text-xs font-mono font-bold hover:border-primary">9.5 CGPA</button>
                            <button type="button" @click="setPreset(8.8, scale)" class="px-3 py-1 rounded-lg bg-base-100 border border-base-300 text-xs font-mono font-bold hover:border-primary">8.8 CGPA</button>
                            <button type="button" @click="setPreset(8.0, scale)" class="px-3 py-1 rounded-lg bg-base-100 border border-base-300 text-xs font-mono font-bold hover:border-primary">8.0 CGPA</button>
                            <button type="button" @click="setPreset(7.2, scale)" class="px-3 py-1 rounded-lg bg-base-100 border border-base-300 text-xs font-mono font-bold hover:border-primary">7.2 CGPA</button>
                            <button type="button" @click="setPreset(6.5, scale)" class="px-3 py-1 rounded-lg bg-base-100 border border-base-300 text-xs font-mono font-bold hover:border-primary">6.5 CGPA</button>
                        </div>
                    </div>
                    <span class="text-[11px] text-base-content/50 mt-2 block">Matches official job eligibility cutoffs (UPSC, TCS, GATE)</span>
                </div>
            </div>

            {{-- Dynamic Result Banner --}}
            <div class="p-6 md:p-8 rounded-3xl bg-[#163300] text-white space-y-4 shadow-sm">
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                        <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Equivalent Aggregate Percentage</span>
                        <p class="font-mono text-4xl sm:text-5xl font-black mt-1 text-[#9fe870]" x-text="percentage + '%'">80.75%</p>
                    </div>
                    <div class="text-right">
                        <span class="px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-[#9fe870]/20 text-[#9fe870] border border-[#9fe870]/30" x-text="'10-Point Scale'">10-Point Scale</span>
                    </div>
                </div>

                <div class="pt-2 space-y-2">
                    <p class="text-base sm:text-lg font-medium text-white/90" x-text="formulaExplanation">CBSE Formula: Percentage = CGPA (8.5) × 9.5 = 80.75%</p>
                    <p class="text-xs text-white/60">
                        Calculated accurately according to official institutional conversion circulars for academic admissions and corporate verification.
                    </p>
                </div>
            </div>
        </div>

        {{-- MODE 2: SGPA to CGPA & % Converter --}}
        <div x-show="converterMode === 'sgpa'" class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="font-bold text-base text-base-content font-display">Multi-Semester SGPA to Cumulative CGPA Converter</h3>
                    <p class="text-xs text-base-content/60">Enter your semester Grade Point Average (SGPA) and credit hours for each completed semester</p>
                </div>
                <button type="button" @click="addSemester()" class="btn btn-sm btn-outline rounded-xl font-mono text-xs">
                    + Add Semester
                </button>
            </div>

            <div class="space-y-3">
                <template x-for="(s, idx) in sgpaList" :key="s.id">
                    <div class="grid grid-cols-12 gap-3 p-3 rounded-2xl bg-base-200/50 border border-base-300 items-center">
                        <div class="col-span-5 sm:col-span-4">
                            <span class="font-bold text-xs text-base-content font-mono block" x-text="s.sem"></span>
                        </div>
                        <div class="col-span-3 sm:col-span-3">
                            <input type="number" min="0" max="10" step="0.01" x-model.number="s.sgpa" class="input input-sm input-bordered w-full rounded-xl font-mono text-xs" placeholder="SGPA" />
                        </div>
                        <div class="col-span-3 sm:col-span-4">
                            <input type="number" min="1" max="40" step="1" x-model.number="s.credits" class="input input-sm input-bordered w-full rounded-xl font-mono text-xs" placeholder="Credits" />
                        </div>
                        <div class="col-span-1 text-right">
                            <button type="button" @click="removeSemester(s.id)" :disabled="sgpaList.length <= 1" class="btn btn-ghost btn-circle btn-xs text-error">✕</button>
                        </div>
                    </div>
                </template>
            </div>

            <div class="p-6 md:p-8 rounded-3xl bg-[#163300] text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Calculated Cumulative CGPA</span>
                    <p class="font-mono text-4xl sm:text-5xl font-black mt-1 text-[#9fe870]" x-text="sgpaCalculation.cumulativeCgpa"></p>
                    <span class="text-xs text-white/60 block mt-1" x-text="'Across ' + sgpaCalculation.totalCredits + ' completed credit units'"></span>
                </div>
                <div class="sm:text-right">
                    <span class="text-xs uppercase tracking-widest text-white/70 font-bold font-mono">CBSE / Standard % Equivalent</span>
                    <p class="font-mono text-3xl sm:text-4xl font-bold mt-1 text-white" x-text="sgpaCalculation.percentage + '%'"></p>
                    <span class="text-xs text-white/60 block mt-1">Formula: CGPA × 9.5</span>
                </div>
            </div>
        </div>

        {{-- MODE 3: Marks to Percentage Calculator --}}
        <div x-show="converterMode === 'marks'" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-base-200/50 p-5 rounded-2xl border border-base-300">
                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Marks Obtained</label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        x-model.number="marksObtained"
                        class="input input-bordered w-full rounded-xl font-mono text-2xl font-bold bg-base-100"
                        placeholder="465"
                    />
                    <span class="text-[11px] text-base-content/50 mt-1 block">Total marks scored across all subjects</span>
                </div>

                <div class="bg-base-200/50 p-5 rounded-2xl border border-base-300">
                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Total Maximum Marks</label>
                    <input
                        type="number"
                        min="1"
                        step="1"
                        x-model.number="totalMarks"
                        class="input input-bordered w-full rounded-xl font-mono text-2xl font-bold bg-base-100"
                        placeholder="500"
                    />
                    <span class="text-[11px] text-base-content/50 mt-1 block">Maximum achievable marks (e.g. 500 or 600)</span>
                </div>
            </div>

            <div class="p-6 md:p-8 rounded-3xl bg-[#163300] text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Exam Marks Percentage</span>
                    <p class="font-mono text-4xl sm:text-5xl font-black mt-1 text-[#9fe870]" x-text="marksCalculation.percentage + '%'"></p>
                    <span class="text-xs text-white/60 block mt-1" x-text="'Calculation: (' + marksCalculation.obtained + ' / ' + marksCalculation.total + ') × 100'"></span>
                </div>
                <div class="sm:text-right">
                    <span class="text-xs uppercase tracking-widest text-white/70 font-bold font-mono">Estimated 10-Point CGPA</span>
                    <p class="font-mono text-3xl sm:text-4xl font-bold mt-1 text-white" x-text="marksCalculation.estimatedCgpa"></p>
                    <span class="text-xs text-white/60 block mt-1">Formula: Percentage / 9.5</span>
                </div>
            </div>
        </div>

        {{-- Comparative University Conversion Table --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-3">
                Official CGPA to Percentage Conversion Matrix
            </h3>
            <div class="overflow-x-auto rounded-2xl border border-base-300">
                <table class="table table-sm w-full text-xs">
                    <thead class="bg-base-200/60 font-mono">
                        <tr>
                            <th>CGPA Score</th>
                            <th>CBSE (×9.5)</th>
                            <th>VTU ([CGPA-0.75]×10)</th>
                            <th>Mumbai University</th>
                            <th>Standard (×10.0)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-base-200">
                        <template x-for="(row, idx) in equivalenceRows" :key="idx">
                            <tr :class="parseFloat(cgpa).toFixed(1) === row.pt.toFixed(1) ? 'bg-[#e2f6d5] font-bold' : ''">
                                <td class="font-mono font-bold" x-text="row.pt.toFixed(1)"></td>
                                <td class="font-mono" x-text="row.cbsePct + '%'"></td>
                                <td class="font-mono" x-text="row.vtuPct + '%'"></td>
                                <td class="font-mono" x-text="row.muPct + '%'"></td>
                                <td class="font-mono" x-text="row.stdPct + '%'"></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
