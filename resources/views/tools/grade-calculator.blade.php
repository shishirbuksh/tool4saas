<x-card class="p-6 md:p-8" x-data="{
    rows: [
        { name: 'Assignments', weight: 30, score: 92 },
        { name: 'Midterm Exam', weight: 30, score: 85 },
        { name: 'Final Project', weight: 40, score: 90 }
    ],
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
            const w = parseFloat(r.weight) || 0;
            const s = parseFloat(r.score) || 0;
            totalWeight += w;
            weightedSum += s * (w / 100);
        });
        if (totalWeight === 0) return 0;
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
    }
}">
    <div class="space-y-6">
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
