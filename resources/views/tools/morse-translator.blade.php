<x-card class="p-6 md:p-8" x-data="{
    mode: 'encode',
    input: '',
    copied: false,
    morseMap: {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', ' ': '/'
    },
    get output() {
        if (!this.input) return '';
        if (this.mode === 'encode') {
            return this.input.toUpperCase().split('').map(c => this.morseMap[c] || c).join(' ');
        } else {
            const rev = {};
            for (const [k, v] of Object.entries(this.morseMap)) { rev[v] = k; }
            return this.input.trim().split(/\s+/).map(c => rev[c] || (c === '/' ? ' ' : '')).join('');
        }
    },
    copy() {
        if (!this.output) return;
        navigator.clipboard.writeText(this.output);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div class="join">
                <button type="button" @click="mode = 'encode'" class="btn btn-sm join-item" :class="mode === 'encode' ? 'btn-primary' : 'btn-outline'">Text to Morse</button>
                <button type="button" @click="mode = 'decode'" class="btn btn-sm join-item" :class="mode === 'decode' ? 'btn-primary' : 'btn-outline'">Morse to Text</button>
            </div>
            <button type="button" @click="input = ''" class="btn btn-ghost btn-sm rounded-[10px]">Clear</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70" x-text="mode === 'encode' ? 'Standard English Input' : 'Morse Code Input (. and -)'"></label>
                <textarea
                    x-model="input"
                    rows="6"
                    :placeholder="mode === 'encode' ? 'Type English text here (e.g. SOS)...' : 'Type Morse code here (e.g. ... --- ...)...'"
                    class="textarea textarea-bordered w-full rounded-[16px] text-base font-mono bg-base-100 dark:bg-base-200"
                ></textarea>
            </div>

            <div>
                <div class="flex justify-between items-center mb-2">
                    <label class="text-xs font-bold uppercase tracking-wider text-base-content/70" x-text="mode === 'encode' ? 'Translated Morse Output' : 'Translated English Output'"></label>
                    <button type="button" @click="copy()" :disabled="!output" class="btn btn-xs btn-primary rounded-[8px]">
                        <span x-show="!copied">Copy Output</span>
                        <span x-show="copied" x-cloak>✓ Copied</span>
                    </button>
                </div>
                <div class="p-4 rounded-[16px] bg-base-200/50 border border-base-300 min-h-[148px] font-mono text-base break-all" x-text="output || 'Output will appear in real time...'"></div>
            </div>
        </div>

        {{-- Technical Comparison: International Morse Code Standards Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                International Morse Code Timing &amp; Radiotelegraphy Standards Matrix (ITU-R M.1677-1)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Signal Element / Space</th>
                            <th>Relative Duration (Units)</th>
                            <th>Audio / Optical Representation</th>
                            <th>ITU Transmission Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Dot / Dit (.)</td>
                            <td class="font-mono font-bold">1 unit</td>
                            <td class="font-mono">Short tone (beep) or flash</td>
                            <td>Fundamental baseline time unit of Morse transmission</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Dash / Dah (-)</td>
                            <td class="font-mono font-bold">3 units</td>
                            <td class="font-mono">Long continuous tone</td>
                            <td>Exactly three times the duration of one dit (3 × dot)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Intra-Character Space</td>
                            <td class="font-mono">1 unit</td>
                            <td class="font-mono">Silence</td>
                            <td>Pause between individual dots and dashes of the same letter</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Inter-Character Space</td>
                            <td class="font-mono">3 units</td>
                            <td class="font-mono">Medium silence</td>
                            <td>Pause separating distinct letters within the same word</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Inter-Word Space</td>
                            <td class="font-mono font-bold">7 units</td>
                            <td class="font-mono">Long silence or slash ( / )</td>
                            <td>Pause separating complete words in a sentence</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-error">SOS Emergency Distress</td>
                            <td class="font-mono">... --- ...</td>
                            <td class="font-mono text-error font-bold">Continuous prosign (no inter-char pause)</td>
                            <td>International maritime distress signal (1906 Berlin Convention)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
