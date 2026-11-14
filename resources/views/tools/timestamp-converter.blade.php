<x-tool-paper>
    <div x-data="{
        currentTs: Math.floor(Date.now() / 1000),
        timer: null,
        inputTs: Math.floor(Date.now() / 1000).toString(),
        outputDateUtc: '',
        outputDateLocal: '',
        inputDateStr: new Date().toISOString().slice(0, 16),
        outputConvertedTs: '',
        init() {
            this.timer = setInterval(() => {
                this.currentTs = Math.floor(Date.now() / 1000);
            }, 1000);
            this.convertFromTs();
            this.convertFromDate();
        },
        convertFromTs() {
            let val = parseInt(this.inputTs.trim(), 10);
            if (isNaN(val)) {
                this.outputDateUtc = 'Invalid Timestamp';
                this.outputDateLocal = '';
                return;
            }
            // If 13 digits, treat as milliseconds
            if (val > 9999999999) {
                val = val / 1000;
            }
            const d = new Date(val * 1000);
            this.outputDateUtc = d.toUTCString();
            this.outputDateLocal = d.toString();
        },
        convertFromDate() {
            const d = new Date(this.inputDateStr);
            if (isNaN(d.getTime())) {
                this.outputConvertedTs = 'Invalid Date';
                return;
            }
            this.outputConvertedTs = Math.floor(d.getTime() / 1000).toString();
        },
        useCurrent() {
            this.inputTs = this.currentTs.toString();
            this.convertFromTs();
        }
    }">
        {{-- Live Clock Banner (Wise Dark Polarity-Flipped Surface) --}}
        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
                <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Current Unix Epoch Time</span>
                <div class="text-4xl sm:text-5xl font-black font-mono mt-1 text-primary tracking-tight tabular-nums" x-text="currentTs"></div>
                <div class="text-xs text-[#868685] mt-1">Seconds elapsed since Jan 01 1970 00:00:00 (UTC)</div>
            </div>
            <button
                type="button"
                @click="useCurrent()"
                class="px-5 py-2.5 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0"
            >
                Use Current Epoch →
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {{-- Timestamp to Date --}}
            <div class="p-6 sm:p-7 rounded-3xl border border-base-300 bg-base-100 flex flex-col justify-between shadow-xs">
                <div>
                    <h3 class="font-bold text-lg mb-4 text-base-content font-display">Unix Timestamp → Human Date</h3>
                    <div class="mb-4">
                        <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 mb-1.5 font-mono">Enter Timestamp (Seconds or ms)</label>
                        <input
                            type="text"
                            x-model="inputTs"
                            @input="convertFromTs()"
                            class="input input-bordered rounded-2xl w-full font-mono text-sm p-4"
                        />
                    </div>

                    <div class="space-y-3">
                        <div class="p-4 rounded-2xl bg-base-200/70 text-xs border border-base-300/80">
                            <span class="text-base-content/60 block font-bold uppercase tracking-wider mb-1 font-mono">UTC / GMT Date:</span>
                            <span class="font-mono text-sm font-bold text-base-content" x-text="outputDateUtc"></span>
                        </div>
                        <div class="p-4 rounded-2xl bg-base-200/70 text-xs border border-base-300/80">
                            <span class="text-base-content/60 block font-bold uppercase tracking-wider mb-1 font-mono">Your Local Timezone:</span>
                            <span class="font-mono text-sm font-bold text-base-content" x-text="outputDateLocal"></span>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Date to Timestamp --}}
            <div class="p-6 sm:p-7 rounded-3xl border border-base-300 bg-base-100 flex flex-col justify-between shadow-xs">
                <div>
                    <h3 class="font-bold text-lg mb-4 text-base-content font-display">Human Date → Unix Timestamp</h3>
                    <div class="mb-4">
                        <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 mb-1.5 font-mono">Select Date &amp; Time</label>
                        <input
                            type="datetime-local"
                            x-model="inputDateStr"
                            @change="convertFromDate()"
                            class="input input-bordered rounded-2xl w-full text-sm p-4"
                        />
                    </div>

                    <div class="space-y-3">
                        <div class="p-4 rounded-2xl bg-base-200/70 text-xs border border-base-300/80">
                            <span class="text-base-content/60 block font-bold uppercase tracking-wider mb-1 font-mono">Computed Epoch Timestamp:</span>
                            <span class="font-mono text-xl font-black text-base-content tabular-nums" x-text="outputConvertedTs"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-tool-paper>
