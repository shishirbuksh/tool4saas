<x-tool-paper>
    <div x-data="{
        type: 'paragraphs',
        count: 3,
        startWithLorem: true,
        output: '',
        copied: false,
        wordsPool: [
            'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
            'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
            'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut',
            'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
            'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
            'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt',
            'mollit', 'anim', 'id', 'est', 'laborum'
        ],
        generate() {
            let res = [];
            const n = Math.max(1, Math.min(100, parseInt(this.count, 10) || 1));

            if (this.type === 'words') {
                for (let i = 0; i < n; i++) {
                    res.push(this.wordsPool[i % this.wordsPool.length]);
                }
                this.output = res.join(' ');
            } else if (this.type === 'sentences') {
                for (let s = 0; s < n; s++) {
                    let len = 6 + Math.floor(Math.random() * 8);
                    let sent = [];
                    for (let i = 0; i < len; i++) {
                        sent.push(this.wordsPool[Math.floor(Math.random() * this.wordsPool.length)]);
                    }
                    let capitalized = sent[0].charAt(0).toUpperCase() + sent[0].slice(1);
                    sent[0] = capitalized;
                    res.push(sent.join(' ') + '.');
                }
                this.output = res.join(' ');
            } else {
                for (let p = 0; p < n; p++) {
                    let sents = [];
                    let sentCount = 4 + Math.floor(Math.random() * 4);
                    for (let s = 0; s < sentCount; s++) {
                        let len = 6 + Math.floor(Math.random() * 8);
                        let sent = [];
                        for (let i = 0; i < len; i++) {
                            sent.push(this.wordsPool[Math.floor(Math.random() * this.wordsPool.length)]);
                        }
                        sent[0] = sent[0].charAt(0).toUpperCase() + sent[0].slice(1);
                        sents.push(sent.join(' ') + '.');
                    }
                    res.push(sents.join(' '));
                }
                if (this.startWithLorem && res.length > 0) {
                    res[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' + res[0];
                }
                this.output = res.join('\n\n');
            }
        },
        copy() {
            if (!this.output) return;
            navigator.clipboard.writeText(this.output);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        },
        init() {
            this.generate();
        }
    }">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 mb-1 font-mono">Generation Type</label>
                <select x-model="type" @change="generate()" class="select select-bordered w-full select-sm rounded-xl">
                    <option value="paragraphs">Paragraphs</option>
                    <option value="sentences">Sentences</option>
                    <option value="words">Words</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 mb-1 font-mono">Count</label>
                <input type="number" x-model="count" @input="generate()" min="1" max="100" class="input input-bordered w-full input-sm rounded-xl" />
            </div>
            <div class="sm:col-span-2 flex items-end">
                <button
                    type="button"
                    @click="generate()"
                    class="px-5 py-2 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-xs sm:text-sm w-full transition-all shadow-xs"
                >
                    Regenerate Text
                </button>
            </div>
        </div>

        <div class="relative">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Generated Dummy Text</span>
                <button
                    type="button"
                    @click="copy()"
                    :disabled="!output"
                    class="px-3.5 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                >
                    <span x-text="copied ? 'Copied!' : 'Copy to Clipboard'"></span>
                </button>
            </div>
            <textarea
                x-model="output"
                readonly
                rows="10"
                class="textarea textarea-bordered rounded-3xl bg-base-200/50 w-full text-base leading-relaxed p-5"
            ></textarea>
        </div>
    </div>
</x-tool-paper>
