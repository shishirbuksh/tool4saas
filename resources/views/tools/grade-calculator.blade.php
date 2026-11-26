<x-card class="p-6 md:p-8" x-data="{
    mode: 'weighted',
    currentGrade: 85,
    targetGrade: 90,
    finalWeight: 30,
    rows: [
        { name: 'Assignments', weight: 30, score: 92 },
        { name: 'Midterm Exam', weight: 30, score: 85 },
        { name: 'Final Project', weight: 40, score: 90 }
    ],
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('mode') && ['weighted', 'final'].includes(params.get('mode'))) {
            this.mode = params.get('mode');
        }
        if (params.has('current')) {
            const val = parseFloat(params.get('current'));
            if (!isNaN(val) && val >= 0) this.currentGrade = val;
        }
        if (params.has('target')) {
            const val = parseFloat(params.get('target'));
            if (!isNaN(val) && val >= 0) this.targetGrade = val;
        }
        if (params.has('weight')) {
            const val = parseFloat(params.get('weight'));
            if (!isNaN(val) && val > 0 && val <= 100) this.finalWeight = val;
        }
    },
    setCollegePreset() {
        this.rows = [
            { name: 'Homework & Quizzes', weight: 30, score: 90 },
            { name: 'Midterm Exam', weight: 30, score: 82 },
            { name: 'Final Exam', weight: 40, score: 88 }
        ];
    },
    setStemPreset() {
        this.rows = [
            { name: 'Laboratory Reports', weight: 25, score: 95 },
            { name: 'Quizzes', weight: 15, score: 85 },
            { name: 'Midterm Exam', weight: 25, score: 78 },
            { name: 'Final Exam', weight: 35, score: 84 }
        ];
    },
    setHighSchoolPreset() {
        this.rows = [
            { name: 'Unit Tests', weight: 40, score: 88 },
            { name: 'Homework Assignments', weight: 30, score: 96 },
            { name: 'Projects & Labs', weight: 20, score: 90 },
            { name: 'Participation', weight: 10, score: 100 }
        ];
    },
    addRow() {
        this.rows.push({ name: 'Quiz / Homework', weight: 10, score: 80 });
    },
    removeRow(idx) {
        this.rows.splice(idx, 1);
    },
    get weightedGrade() {
        let totalWeight = 0;
        let weightedSum = 0;
        this.rows.forEach(r => {
            const w = Math.max(0, parseFloat(r.weight) || 0);
            const s = Math.max(0, parseFloat(r.score) || 0);
            totalWeight += w;
            weightedSum += s * (w / 100);
        });
        if (totalWeight <= 0) return '0.0';
        return (weightedSum / (totalWeight / 100)).toFixed(1);
    },
    get letterGrade() {
        const g = parseFloat(this.weightedGrade) || 0;
        if (g >= 93) return 'A';
        if (g >= 90) return 'A-';
        if (g >= 87) return 'B+';
        if (g >= 83) return 'B';
        if (g >= 80) return 'B-';
        if (g >= 70) return 'C';
        if (g >= 60) return 'D';
        return 'F';
    },
    get neededFinalScore() {
        const cur = Math.max(0, parseFloat(this.currentGrade) || 0);
        const tgt = Math.max(0, parseFloat(this.targetGrade) || 0);
        const w = Math.max(0, Math.min(100, parseFloat(this.finalWeight) || 0)) / 100;
        if (w <= 0) return '0.0';
        if (w >= 1) return tgt.toFixed(1);
        const needed = (tgt - (cur * (1 - w))) / w;
        return needed.toFixed(1);
    }
}">
    <div class="space-y-6">
        <x-student-tools-nav active="grade-calculator" />

        {{-- Mode Switcher Tabs --}}
        <div class="flex gap-1.5 p-1.5 rounded-full bg-base-200 border border-base-300 inline-flex">
            <button
                type="button"
                class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                :class="mode === 'weighted' ? 'bg-[#163300] text-[#9fe870] shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                @click="mode = 'weighted'"
            >
                Weighted Syllabus Grade
            </button>
            <button
                type="button"
                class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                :class="mode === 'final' ? 'bg-[#163300] text-[#9fe870] shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                @click="mode = 'final'"
            >
                Final Exam Target Needed
            </button>
        </div>

        {{-- Tab 1: Weighted Grade Calculator --}}
        <div x-show="mode === 'weighted'" class="space-y-6">
            {{-- Quick Syllabus Presets --}}
            <div>
                <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">1-Click Syllabus Presets</span>
                <div class="flex flex-wrap gap-2">
                    <button type="button" @click="setCollegePreset()" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">College Standard (30/30/40)</button>
                    <button type="button" @click="setStemPreset()" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">STEM Lab Course (4 Components)</button>
                    <button type="button" @click="setHighSchoolPreset()" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">High School Honors</button>
                </div>
            </div>

            <div class="space-y-3">
                <template x-for="(r, idx) in rows" :key="idx">
                    <div class="flex items-center gap-3 p-3 rounded-[14px] bg-base-200/50 border border-base-300">
                        <input type="text" x-model="r.name" placeholder="Assessment Name" class="input input-sm input-bordered flex-1 rounded-[8px]" />
                        <div class="flex items-center gap-1 w-28">
                            <input type="number" min="0" max="100" x-model="r.weight" placeholder="Weight" class="input input-sm input-bordered w-full rounded-[8px] text-center" />
                            <span class="text-xs text-base-content/60 font-bold">%</span>
                        </div>
                        <div class="flex items-center gap-1 w-28">
                            <input type="number" min="0" max="100" x-model="r.score" placeholder="Score" class="input input-sm input-bordered w-full rounded-[8px] text-center" />
                            <span class="text-xs text-base-content/60 font-bold">%</span>
                        </div>
                        <button type="button" @click="removeRow(idx)" class="btn btn-ghost btn-xs text-error" x-show="rows.length > 1">✕</button>
                    </div>
                </template>

                <button type="button" @click="addRow()" class="btn btn-outline btn-sm rounded-[10px]">
                    + Add Assessment Item
                </button>
            </div>

            <div class="p-6 rounded-[20px] bg-[#163300] text-white flex items-center justify-between">
                <div>
                    <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Cumulative Weighted Grade</span>
                    <p class="font-mono text-4xl font-extrabold mt-1 text-[#9fe870]" x-text="weightedGrade + '%'"></p>
                </div>
                <div class="text-right">
                    <span class="text-xs text-white/70 uppercase tracking-widest">Letter Scale</span>
                    <p class="font-mono text-4xl font-black text-white mt-1" x-text="letterGrade"></p>
                </div>
            </div>
        </div>

        {{-- Tab 2: Final Exam Target Needed --}}
        <div x-show="mode === 'final'" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Current Class Grade (%)</label>
                    <input type="number" min="0" max="100" step="0.5" x-model="currentGrade" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Target Desired Grade (%)</label>
                    <input type="number" min="0" max="100" step="0.5" x-model="targetGrade" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Final Exam Weight (%)</label>
                    <input type="number" min="1" max="99" step="1" x-model="finalWeight" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
                </div>
            </div>

            <div class="p-6 sm:p-8 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Score Needed on Final Exam</span>
                <p class="font-mono text-4xl sm:text-5xl font-extrabold mt-2 text-[#9fe870]" x-text="neededFinalScore + '%'"></p>
                <p class="text-xs text-white/80 mt-2">
                    To finish the course with an overall grade of <span class="font-bold text-white" x-text="targetGrade + '%'"></span> when your current grade is <span class="font-bold text-white" x-text="currentGrade + '%'"></span> and the final exam counts for <span class="font-bold text-white" x-text="finalWeight + '%'"></span> of your final mark.
                </p>
            </div>
        </div>

        {{-- Technical Comparison: Syllabus Grading Categories & Typical Weights Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                College &amp; High School Syllabus Grade Weights vs. Impact Sensitivity Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Assessment Category</th>
                            <th>Typical Weight (%)</th>
                            <th>Frequency / Volume</th>
                            <th>Impact on Final 100% Grade</th>
                            <th>Best Study &amp; Optimization Strategy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Final Exam / Capstone</td>
                            <td class="font-mono font-bold text-error">30% – 40%</td>
                            <td class="font-mono">1 comprehensive exam</td>
                            <td class="font-bold text-error font-mono">Very High (±1 letter grade)</td>
                            <td>High-yield practice exams, spaced retrieval review</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Midterm Exams</td>
                            <td class="font-mono font-bold">20% – 30%</td>
                            <td class="font-mono">1 to 2 midterms</td>
                            <td class="font-bold text-warning font-mono">High (±0.5 letter grade)</td>
                            <td>Early benchmark; utilize office hours for missed concepts</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Homework / Problem Sets</td>
                            <td class="font-mono">15% – 25%</td>
                            <td class="font-mono">Weekly (10–14 sets)</td>
                            <td class="font-mono">Moderate (Consistent buffer)</td>
                            <td>Submit 100% on time; secure full credit foundation</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Quizzes / Reading Checks</td>
                            <td class="font-mono">10% – 15%</td>
                            <td class="font-mono">5 to 10 short checks</td>
                            <td class="font-mono">Low to Moderate</td>
                            <td>Review pre-lecture assigned readings and key vocabulary</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Class Participation &amp; Labs</td>
                            <td class="font-mono">5% – 10%</td>
                            <td class="font-mono">Daily / weekly</td>
                            <td class="font-mono text-success">Low (Free grade safety net)</td>
                            <td>Active attendance and collaborative group engagement</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
