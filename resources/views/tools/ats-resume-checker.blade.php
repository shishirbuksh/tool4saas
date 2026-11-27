<x-card class="p-6 md:p-8" x-data="{
    resume: '',
    job: '',
    stopwords: ['the','and','a','to','of','in','for','is','on','that','by','this','with','i','you','it','not','or','be','are','from','at','as','your','all','have','new','more','an','was','we','will','home','can','us','about','if','page','my','has','search','free','but','our','one','other','do','no','information','time','they','site','he','up','may','what','which','their','news','out','use','any','there','see','only','so','his','when','contact','here','business','who','web','also','now','help','get','pm','view','online','c','e','first','am','been','would','how','were','me','s','services','some','these','click','its','like','service','x','than','find','price','date','back','top','people','had','list','name','just','over','state','year','day','into','email','two','health','n','re','next','used','go','b','good','any','com'],
    get keywords() {
        if (!this.job.trim()) return [];
        const words = this.job.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !this.stopwords.includes(w));
        return Array.from(new Set(words)).slice(0, 30);
    },
    get matched() {
        if (!this.resume.trim() || !this.keywords.length) return [];
        const r = this.resume.toLowerCase();
        return this.keywords.filter(k => r.includes(k));
    },
    get missing() {
        if (!this.keywords.length) return [];
        return this.keywords.filter(k => !this.matched.includes(k));
    },
    get score() {
        if (!this.keywords.length) return 0;
        return Math.round((this.matched.length / this.keywords.length) * 100);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Your Resume Content</label>
                <textarea aria-label="Your Resume Content"
                    x-model="resume"
                    rows="8"
                    placeholder="Paste resume text, skills, employment history..."
                    class="textarea textarea-bordered w-full rounded-[16px] text-sm leading-relaxed bg-base-100 dark:bg-base-200"
                ></textarea>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Target Job Description</label>
                <textarea aria-label="Target Job Description"
                    x-model="job"
                    rows="8"
                    placeholder="Paste target job responsibilities, skills, requirements..."
                    class="textarea textarea-bordered w-full rounded-[16px] text-sm leading-relaxed bg-base-100 dark:bg-base-200"
                ></textarea>
            </div>
        </div>

        <template x-if="job.trim()">
            <div class="space-y-4">
                <div class="flex items-center justify-between p-6 rounded-[20px] bg-[#163300] text-white">
                    <div>
                        <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">ATS Match Score</span>
                        <p class="font-mono text-4xl font-extrabold mt-1 text-[#9fe870]" x-text="score + '%'"></p>
                    </div>
                    <div class="text-right">
                        <span class="text-xs text-white/70">Matched Keywords:</span>
                        <p class="font-mono text-xl font-bold mt-1" x-text="matched.length + ' / ' + keywords.length"></p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 rounded-[16px] bg-base-200/50 border border-base-300">
                        <h4 class="font-bold text-xs uppercase tracking-wider text-success mb-3" x-text="'Found in Resume (' + matched.length + ')'"></h4>
                        <div class="flex flex-wrap gap-1.5">
                            <template x-for="kw in matched" :key="kw">
                                <span class="badge badge-success badge-sm font-semibold" x-text="kw"></span>
                            </template>
                        </div>
                    </div>

                    <div class="p-4 rounded-[16px] bg-base-200/50 border border-base-300">
                        <h4 class="font-bold text-xs uppercase tracking-wider text-error mb-3" x-text="'Missing Job Keywords (' + missing.length + ')'"></h4>
                        <div class="flex flex-wrap gap-1.5">
                            <template x-for="kw in missing" :key="kw">
                                <span class="badge badge-error badge-outline badge-sm font-semibold" x-text="kw"></span>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        {{-- Technical Comparison: Leading ATS Platform Parsing Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Enterprise ATS Engines (Workday vs. Taleo vs. Greenhouse vs. Lever) Compatibility Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>ATS Platform</th>
                            <th>Market Segment</th>
                            <th>Recommended File Format</th>
                            <th>Multi-Column / Table Handling</th>
                            <th>Header / Footer Parsing Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Workday</td>
                            <td>Fortune 500 &amp; Global Enterprises</td>
                            <td class="font-mono font-bold">.docx or clean .pdf</td>
                            <td class="text-error font-semibold">Fails / Scrambles text order</td>
                            <td>Completely skipped (Never put contact info in header)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Oracle Taleo</td>
                            <td>Legacy Enterprise &amp; Government</td>
                            <td class="font-mono font-bold">Plain text or .docx</td>
                            <td class="text-error font-semibold">Strict linear single-column only</td>
                            <td>Ignored by optical parser</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Greenhouse</td>
                            <td>Tech Startups, Scale-ups &amp; SaaS</td>
                            <td class="font-mono">Standard .pdf or .docx</td>
                            <td class="text-warning font-semibold">Moderate (Reads left-to-right)</td>
                            <td>Parsed correctly in modern builds</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Lever</td>
                            <td>Mid-market &amp; Fast-growth Tech</td>
                            <td class="font-mono">Standard .pdf</td>
                            <td class="text-warning font-semibold">Extracts clean text layer</td>
                            <td>Preserves contact metadata</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">iCIMS</td>
                            <td>Healthcare, Retail &amp; Manufacturing</td>
                            <td class="font-mono">.docx or PDF</td>
                            <td class="text-error font-semibold">Requires simple tables or none</td>
                            <td>Often stripped during ingestion</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
