<x-card class="p-6 md:p-8" x-data="{
    originalText: '',
    suspectText: '',
    get similarity() {
        if (!this.originalText.trim() || !this.suspectText.trim()) return null;
        const setA = new Set(this.originalText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/));
        const setB = new Set(this.suspectText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/));
        
        let intersection = 0;
        setB.forEach(w => {
            if (setA.has(w)) intersection++;
        });
        const total = Math.max(setA.size, setB.size);
        const sim = Math.round((intersection / total) * 100);
        return {
            percentage: sim,
            matchingWords: intersection,
            uniqueA: setA.size,
            uniqueB: setB.size
        };
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Original Source Text</label>
                <textarea x-model="originalText" rows="7" placeholder="Paste source reference text..." class="textarea textarea-bordered w-full rounded-[16px] text-sm"></textarea>
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Comparison / Suspect Text</label>
                <textarea x-model="suspectText" rows="7" placeholder="Paste text to compare for similarity..." class="textarea textarea-bordered w-full rounded-[16px] text-sm"></textarea>
            </div>
        </div>

        <template x-if="similarity">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white flex items-center justify-between">
                <div>
                    <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Vocabulary Overlap & Similarity</span>
                    <p class="font-mono text-4xl font-extrabold mt-1 text-[#9fe870]" x-text="similarity.percentage + '%'"></p>
                    <p class="text-xs text-white/70 mt-1" x-text="similarity.matchingWords + ' overlapping unique vocabulary terms detected'"></p>
                </div>
                <div class="badge badge-lg font-bold" :class="similarity.percentage > 40 ? 'badge-error' : 'badge-primary'" x-text="similarity.percentage > 40 ? 'High Overlap' : 'Low Overlap'"></div>
            </div>
        </template>
    </div>
</x-card>
