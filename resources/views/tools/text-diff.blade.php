<x-tool-paper x-data="{
    originalText: 'The fast brown fox jumps over the lazy dog in the meadow.',
    modifiedText: 'The quick brown fox leaps over the sleepy dog in the garden.',
    get diffParts() {
        const A = this.originalText.split(/(\s+)/);
        const B = this.modifiedText.split(/(\s+)/);

        let start = 0;
        while (start < A.length && start < B.length && A[start] === B[start]) {
            start++;
        }
        let endA = A.length - 1;
        let endB = B.length - 1;
        while (endA >= start && endB >= start && A[endA] === B[endB]) {
            endA--;
            endB--;
        }

        const midA = A.slice(start, endA + 1);
        const midB = B.slice(start, endB + 1);

        const res = [];
        for (let k = 0; k < start; k++) res.push({ t: 'same', v: A[k] });

        const n = midA.length;
        const m = midB.length;

        if (n * m > 400000) {
            for (let k = 0; k < n; k++) res.push({ t: 'del', v: midA[k] });
            for (let k = 0; k < m; k++) res.push({ t: 'add', v: midB[k] });
        } else {
            const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
            for (let i = n - 1; i >= 0; i--) {
                for (let j = m - 1; j >= 0; j--) {
                    dp[i][j] = midA[i] === midB[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
            let i = 0;
            let j = 0;
            while (i < n && j < m) {
                if (midA[i] === midB[j]) {
                    res.push({ t: 'same', v: midA[i] });
                    i++;
                    j++;
                } else if (dp[i + 1][j] >= dp[i][j + 1]) {
                    res.push({ t: 'del', v: midA[i] });
                    i++;
                } else {
                    res.push({ t: 'add', v: midB[j] });
                    j++;
                }
            }
            while (i < n) {
                res.push({ t: 'del', v: midA[i] });
                i++;
            }
            while (j < m) {
                res.push({ t: 'add', v: midB[j] });
                j++;
            }
        }

        for (let k = endA + 1; k < A.length; k++) {
            res.push({ t: 'same', v: A[k] });
        }

        return res;
    },
    clear() {
        this.originalText = '';
        this.modifiedText = '';
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Original Text</label>
                <textarea aria-label="Original Text"
                    x-model="originalText"
                    rows="7"
                    placeholder="Enter original text..."
                    class="textarea textarea-bordered rounded-2xl w-full text-sm leading-relaxed p-4 bg-base-100"
                ></textarea>
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Modified Text</label>
                <textarea aria-label="Modified Text"
                    x-model="modifiedText"
                    rows="7"
                    placeholder="Enter modified text to compare..."
                    class="textarea textarea-bordered rounded-2xl w-full text-sm leading-relaxed p-4 bg-base-100"
                ></textarea>
            </div>
        </div>

        {{-- Visual Diff Output --}}
        <div>
            <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Word-by-Word Diff View</span>
                <div class="flex items-center gap-3 text-xs font-mono">
                    <span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded-xs bg-[#e2f6d5] border border-[#2ead4b]"></span> Added</span>
                    <span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded-xs bg-[#d03238]/15 border border-[#d03238]"></span> Deleted</span>
                </div>
            </div>

            <div class="p-6 sm:p-8 rounded-3xl bg-base-200/50 border border-base-300 min-h-[120px] text-base leading-loose font-mono select-text">
                <template x-for="(part, idx) in diffParts" :key="idx">
                    <span>
                        <template x-if="part.t === 'same'">
                            <span x-text="part.v"></span>
                        </template>
                        <template x-if="part.t === 'del'">
                            <span class="bg-[#d03238]/20 text-[#a7000d] line-through px-1 rounded-xs" x-text="part.v"></span>
                        </template>
                        <template x-if="part.t === 'add'">
                            <span class="bg-[#e2f6d5] text-[#054d28] font-bold px-1 rounded-xs" x-text="part.v"></span>
                        </template>
                    </span>
                </template>
            </div>
        </div>

        {{-- Technical Comparison: Diff Algorithms Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Text Difference &amp; Git Diff Algorithms Comparison Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Algorithm</th>
                            <th>Computational Complexity</th>
                            <th>Code Readability Quality</th>
                            <th>Best Engineering Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Myers Algorithm (Default)</td>
                            <td class="font-mono">O(N × D)</td>
                            <td>Finds minimal Shortest Edit Script (SES)</td>
                            <td>Git standard diff engine, Unix diff, command line</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Histogram Diff</td>
                            <td class="font-mono">O(N) Average</td>
                            <td>Anchors on low-frequency unique tokens</td>
                            <td>Git --histogram, reduces noise in refactored code</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Patience Diff</td>
                            <td class="font-mono">O(N log N)</td>
                            <td>Superior matching of moved functions and classes</td>
                            <td>Git --patience, complex merge conflict resolution</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Word-Level / Inline Diff</td>
                            <td class="font-mono">Token Splitting</td>
                            <td>Highlights exact typographical alterations</td>
                            <td>Tool4SaaS in-browser diff, document editing</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
