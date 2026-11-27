<x-card class="p-6 md:p-8" x-data="{
    attended: 42,
    total: 50,
    targetPercent: 75,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('attended')) {
            const a = parseFloat(params.get('attended'));
            if (!isNaN(a) && a >= 0) this.attended = a;
        }
        if (params.has('total')) {
            const t = parseFloat(params.get('total'));
            if (!isNaN(t) && t > 0) this.total = t;
        }
        if (params.has('target')) {
            const tgt = parseFloat(params.get('target'));
            if (!isNaN(tgt) && tgt > 0 && tgt <= 100) this.targetPercent = tgt;
        }
    },
    setPreset(target) {
        this.targetPercent = target;
    },
    get currentPercent() {
        const t = Math.max(0, parseFloat(this.total) || 0);
        const a = Math.max(0, Math.min(t, parseFloat(this.attended) || 0));
        if (t <= 0) return '0.0';
        return ((a / t) * 100).toFixed(1);
    },
    get isSafe() {
        const t = Math.max(0, parseFloat(this.total) || 0);
        const a = Math.max(0, Math.min(t, parseFloat(this.attended) || 0));
        const target = Math.max(0, Math.min(100, parseFloat(this.targetPercent) || 75)) / 100;
        if (t <= 0) return false;
        return (a + 1e-9) >= (target * t);
    },
    get maxBunks() {
        const t = Math.max(0, parseFloat(this.total) || 0);
        const a = Math.max(0, Math.min(t, parseFloat(this.attended) || 0));
        const target = Math.max(0, Math.min(100, parseFloat(this.targetPercent) || 75)) / 100;
        if (!this.isSafe || target <= 0) return 0;
        return Math.max(0, Math.floor(((a + 1e-9) - (target * t)) / target));
    },
    get classesNeeded() {
        const t = Math.max(0, parseFloat(this.total) || 0);
        const a = Math.max(0, Math.min(t, parseFloat(this.attended) || 0));
        const target = Math.max(0, Math.min(100, parseFloat(this.targetPercent) || 75)) / 100;
        if (this.isSafe || target >= 1) return 0;
        return Math.max(0, Math.ceil(((target * t) - (a + 1e-9)) / (1 - target)));
    },
    get futureProjections() {
        const t = parseFloat(this.total) || 0;
        const a = parseFloat(this.attended) || 0;
        return [
            { label: 'Next 5 Classes Attended', pct: t > 0 ? (((a + 5) / (t + 5)) * 100).toFixed(1) : '0.0' },
            { label: 'Next 10 Classes Attended', pct: t > 0 ? (((a + 10) / (t + 10)) * 100).toFixed(1) : '0.0' },
            { label: 'Next 5 Classes Missed (Bunked)', pct: t > 0 ? ((a / (t + 5)) * 100).toFixed(1) : '0.0' },
        ];
    }
}">
    <div class="space-y-6">
        <x-student-tools-nav active="attendance-calculator" />

        {{-- Quick 1-Click Regulatory Attendance Presets --}}
        <div>
            <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">1-Click University Attendance Targets</span>
            <div class="flex flex-wrap gap-2">
                <button
                    type="button"
                    @click="setPreset(75)"
                    class="px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                    :class="targetPercent === 75 ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28]'"
                >
                    75% Standard (UGC / AICTE / CBSE)
                </button>
                <button
                    type="button"
                    @click="setPreset(80)"
                    class="px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                    :class="targetPercent === 80 ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28]'"
                >
                    80% Medical &amp; Bar Council
                </button>
                <button
                    type="button"
                    @click="setPreset(85)"
                    class="px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                    :class="targetPercent === 85 ? 'bg-[#163300] text-[#9fe870] border-[#163300] shadow-xs' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-[#e2f6d5] hover:text-[#054d28]'"
                >
                    85% Strict Engineering Quota
                </button>
            </div>
        </div>

        {{-- Interactive Inputs --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Classes Attended</label>
                <input aria-label="Classes Attended"
                    type="number"
                    min="0"
                    value="42"
                    x-model.number="attended"
                    class="input input-bordered w-full rounded-xl font-mono text-xl font-bold bg-base-100"
                    placeholder="42"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Lectures and lab sessions present</span>
            </div>

            <div class="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Total Classes Held</label>
                <input aria-label="Total Classes Held"
                    type="number"
                    min="1"
                    value="50"
                    x-model.number="total"
                    class="input input-bordered w-full rounded-xl font-mono text-xl font-bold bg-base-100"
                    placeholder="50"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Total semester classes delivered to date</span>
            </div>

            <div class="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Required Target (%)</label>
                <input aria-label="Required Target (%)"
                    type="number"
                    min="1"
                    max="100"
                    value="75"
                    x-model.number="targetPercent"
                    class="input input-bordered w-full rounded-xl font-mono text-xl font-bold bg-base-100"
                    placeholder="75"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Minimum cutoff percentage needed</span>
            </div>
        </div>

        {{-- Dynamic Result Banner (Wise Forest Green Card) --}}
        <div class="p-6 md:p-8 rounded-3xl bg-[#163300] text-white space-y-4 shadow-sm">
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                    <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Current Attendance Standing</span>
                    <p class="font-mono text-4xl sm:text-5xl font-black mt-1 text-[#9fe870]" x-text="currentPercent + '%'">84.0%</p>
                </div>
                <div class="text-right">
                    <span
                        class="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider"
                        :class="isSafe ? 'bg-[#9fe870]/20 text-[#9fe870] border border-[#9fe870]/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'"
                        x-text="isSafe ? 'Above Target (Safe)' : 'Shortage Alert (Critical)'"
                    ></span>
                </div>
            </div>

            <template x-if="isSafe">
                <div class="space-y-2 pt-2">
                    <p class="text-base sm:text-lg font-medium text-white/90">
                        You can safely bunk the next <span class="font-mono font-black text-[#9fe870] text-2xl" x-text="maxBunks"></span> class(es) and still maintain your target attendance of <span class="font-bold text-white" x-text="targetPercent + '%'"></span>.
                    </p>
                    <p class="text-xs text-white/60">
                        After missing <span x-text="maxBunks"></span> classes, your projected attendance will be at or slightly above <span x-text="targetPercent + '%'"></span>.
                    </p>
                </div>
            </template>

            <template x-if="!isSafe">
                <div class="space-y-2 pt-2">
                    <p class="text-base sm:text-lg font-medium text-white/90">
                        Attendance deficit! You must attend the next <span class="font-mono font-black text-red-300 text-2xl" x-text="classesNeeded"></span> consecutive class(es) without taking any leave to restore your attendance to <span class="font-bold text-white" x-text="targetPercent + '%'"></span>.
                    </p>
                    <p class="text-xs text-white/60">
                        Missing even one additional class will increase the recovery requirement by 4 additional consecutive attendances.
                    </p>
                </div>
            </template>
        </div>

        {{-- Projection Matrix --}}
        <div class="bg-base-100 rounded-2xl border border-base-300 p-5 space-y-3">
            <h4 class="text-xs font-bold text-base-content/70 uppercase tracking-wider font-mono">Future Attendance Trajectory</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <template x-for="(proj, idx) in futureProjections" :key="idx">
                    <div class="p-3 rounded-xl bg-base-200/50 border border-base-300 flex items-center justify-between">
                        <span class="text-xs font-medium text-base-content/80" x-text="proj.label"></span>
                        <span class="font-mono font-extrabold text-sm text-base-content" x-text="proj.pct + '%'"></span>
                    </div>
                </template>
            </div>
        </div>

        {{-- Regulatory Reference Table --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-3">
                Standard Higher Education Attendance Quotas by Regulatory Council
            </h3>
            <div class="overflow-x-auto rounded-2xl border border-base-300">
                <table class="table table-sm w-full text-xs">
                    <thead class="bg-base-200/60 font-mono">
                        <tr>
                            <th>Regulatory Council / Board</th>
                            <th>Mandatory Cutoff</th>
                            <th>Medical Leave Condonation</th>
                            <th>Exam Debarment Penalty</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-base-200">
                        <tr>
                            <td class="font-semibold">UGC / AICTE (Engineering &amp; Sciences)</td>
                            <td class="font-mono font-bold text-[#163300] dark:text-[#9fe870]">75.0%</td>
                            <td>Down to 65% with official medical certificate</td>
                            <td>Detained from semester end-term exams</td>
                        </tr>
                        <tr>
                            <td class="font-semibold">National Medical Commission (NMC / MBBS)</td>
                            <td class="font-mono font-bold text-[#163300] dark:text-[#9fe870]">75% Theory / 80% Practical</td>
                            <td>Strict; rarely condoned</td>
                            <td>Non-eligible for university professional exams</td>
                        </tr>
                        <tr>
                            <td class="font-semibold">Bar Council of India (BCI / Law Degrees)</td>
                            <td class="font-mono font-bold text-[#163300] dark:text-[#9fe870]">70.0%</td>
                            <td>Down to 65% on dean recommendation</td>
                            <td>Debarred from taking LL.B semester exams</td>
                        </tr>
                        <tr>
                            <td class="font-semibold">CBSE / State Secondary School Boards</td>
                            <td class="font-mono font-bold text-[#163300] dark:text-[#9fe870]">75.0%</td>
                            <td>Up to 15% condonation by regional director</td>
                            <td>Admit card withheld for board examinations</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
