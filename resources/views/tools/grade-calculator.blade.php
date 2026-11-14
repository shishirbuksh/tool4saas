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
    </div>
</x-card>
