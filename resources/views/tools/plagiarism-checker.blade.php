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

        {{-- Technical Comparison: Plagiarism Typologies & Detection Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Academic &amp; Editorial Plagiarism Typologies, Signatures &amp; Severity Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Plagiarism Classification</th>
                            <th>Text Manipulation Method</th>
                            <th>Detection Algorithmic Signature</th>
                            <th>Academic &amp; Legal Severity</th>
                            <th>Remediation Protocol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-error">Direct / Verbatim Plagiarism</td>
                            <td>Exact word-for-word copy without quotes or attribution</td>
                            <td class="font-bold text-error font-mono">100% exact n-gram string match</td>
                            <td class="font-bold text-error">Severe (Failing grade, expulsion, DMCA takedown)</td>
                            <td>Enclose in quotation marks and provide explicit formal citation</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-warning">Mosaic / Patchwriting</td>
                            <td>Interweaving phrases from multiple sources with minor synonym swaps</td>
                            <td class="font-mono">High Jaccard similarity &amp; shared sentence cadence</td>
                            <td class="text-error font-semibold">High (Academic dishonesty violation)</td>
                            <td>Synthesize ideas entirely in your own voice; cite all underlying claims</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Paraphrasing without Citation</td>
                            <td>Rewriting source concepts using new vocabulary without attribution</td>
                            <td class="font-mono">Semantic cosine vector similarity</td>
                            <td class="text-warning font-semibold">Moderate (Misattribution)</td>
                            <td>Credit original researcher / author for foundational insights</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Self-Plagiarism (Duplicate Publication)</td>
                            <td>Reusing previously submitted coursework or published papers without permission</td>
                            <td class="font-mono">Repository cross-database match (Turnitin)</td>
                            <td class="text-warning font-semibold">Moderate to High (Copyright transfer breach)</td>
                            <td>Obtain instructor/publisher permission; cite previous publication</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
