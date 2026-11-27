<x-tool-paper x-data="{
    mode: 'diff',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    shiftDays: 30,
    shiftOp: 'add',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('mode') && ['diff', 'shift'].includes(params.get('mode'))) this.mode = params.get('mode');
        if (params.has('start')) this.startDate = params.get('start');
        if (params.has('end')) this.endDate = params.get('end');
        if (params.has('days')) this.shiftDays = parseInt(params.get('days'), 10) || this.shiftDays;
        if (params.has('op') && ['add', 'sub'].includes(params.get('op'))) this.shiftOp = params.get('op');
    },
    setPreset(mode, days, op) {
        this.mode = mode;
        this.shiftDays = days;
        if (op) this.shiftOp = op;
    },
    get diffDays() {
        if (!this.startDate || !this.endDate) return 0;
        const d1 = new Date(this.startDate);
        const d2 = new Date(this.endDate);
        const diff = Math.round((d2.getTime() - d1.getTime()) / 86400000);
        return isNaN(diff) ? 0 : diff;
    },
    get diffWeeks() {
        return (Math.abs(this.diffDays) / 7).toFixed(1);
    },
    get diffMonths() {
        return (Math.abs(this.diffDays) / 30.4375).toFixed(1);
    },
    get shiftedDateString() {
        if (!this.startDate) return '';
        const d = new Date(this.startDate);
        const days = (parseInt(this.shiftDays, 10) || 0) * (this.shiftOp === 'add' ? 1 : -1);
        d.setDate(d.getDate() + days);
        return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Popular Date Shifts:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset('shift', 30, 'add')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    +30 Days from Today
                </button>
                <button type="button" @click="setPreset('shift', 60, 'add')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    +60 Days from Today
                </button>
                <button type="button" @click="setPreset('shift', 90, 'add')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    +90 Days (Quarter)
                </button>
                <button type="button" @click="setPreset('shift', 30, 'sub')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    −30 Days Ago
                </button>
            </div>
        </div>

        {{-- Mode Selector --}}
        <div class="flex items-center gap-2 p-1.5 rounded-full bg-base-200 border border-base-300 w-fit">
            <button
                type="button"
                @click="mode = 'diff'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'diff' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Date Difference
            </button>
            <button
                type="button"
                @click="mode = 'shift'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'shift' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Add / Subtract Days
            </button>
        </div>

        {{-- Mode 1: Difference --}}
        <template x-if="mode === 'diff'">
            <div class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Start Date</span></label>
                        <input aria-label="Start Date" type="date" x-model="startDate" class="input input-bordered rounded-xl w-full text-sm font-mono" />
                    </div>
                    <div class="form-control">
                        <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">End Date</span></label>
                        <input aria-label="End Date" type="date" x-model="endDate" class="input input-bordered rounded-xl w-full text-sm font-mono" />
                    </div>
                </div>

                <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Total Duration</span>
                    <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                        <span x-text="Math.abs(diffDays)"></span> <span class="text-2xl font-mono text-white">days</span>
                    </div>
                    <p class="text-xs sm:text-sm text-[#868685]">
                        <span x-text="diffDays >= 0 ? 'From start to end date' : 'End date is in the past'"></span>
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                        <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Weeks</span>
                        <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                            <span x-text="diffWeeks"></span> weeks
                        </div>
                    </div>
                    <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                        <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Approx. Months</span>
                        <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                            <span x-text="diffMonths"></span> months
                        </div>
                    </div>
                    <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                        <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Hours</span>
                        <div class="text-2xl font-black text-[#163300] dark:text-[#9fe870] mt-1 font-display tabular-nums">
                            <span x-text="(Math.abs(diffDays) * 24).toLocaleString()"></span> hrs
                        </div>
                    </div>
                </div>
            </div>
        </template>

        {{-- Mode 2: Shift --}}
        <template x-if="mode === 'shift'">
            <div class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div class="form-control">
                        <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Base Date</span></label>
                        <input aria-label="Base Date" type="date" x-model="startDate" class="input input-bordered rounded-xl w-full text-sm font-mono" />
                    </div>
                    <div class="form-control">
                        <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Operation</span></label>
                        <select aria-label="Operation" x-model="shiftOp" class="select select-bordered rounded-xl w-full text-sm">
                            <option value="add">Add (+)</option>
                            <option value="sub">Subtract (−)</option>
                        </select>
                    </div>
                    <x-numeric-field label="Days Count" model="shiftDays" suffix="Days" min="1" max="10000" placeholder="30" />
                </div>

                <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Calculated Destination Date</span>
                    <div class="text-2xl sm:text-4xl font-black text-primary my-3 font-display">
                        <span x-text="shiftedDateString"></span>
                    </div>
                    <p class="text-xs sm:text-sm text-[#868685]">
                        <span x-text="shiftOp === 'add' ? 'Added' : 'Subtracted'"></span> <span x-text="shiftDays"></span> days from <span x-text="startDate"></span>
                    </p>
                </div>
            </div>
        </template>

        {{-- Technical Comparison: Day Count Conventions Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Calendar Days vs. Business Days vs. Accounting Day-Count Conventions Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Convention System</th>
                            <th>Weekend &amp; Holiday Treatment</th>
                            <th>Annual Days Base</th>
                            <th>Standard Industry Usage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Calendar Days (Actual/Actual)</td>
                            <td>Includes all 7 days of the week</td>
                            <td class="font-mono">365 or 366 Days</td>
                            <td>Civil contracts, age, SaaS subscription cycles</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Business Days (Working Days)</td>
                            <td>Excludes Saturdays, Sundays &amp; federal holidays</td>
                            <td class="font-mono">~250–252 Days</td>
                            <td>Shipping ETAs, legal court filings, banking clearing</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">30 / 360 (Bond Basis)</td>
                            <td>Assumes each month has exactly 30 days</td>
                            <td class="font-mono">360 Days</td>
                            <td>Corporate bonds, US municipal bonds, mortgages</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Actual / 360 (Money Market)</td>
                            <td>Exact calendar days elapsed</td>
                            <td class="font-mono">360 Days</td>
                            <td>US Treasury bills, commercial paper, bank lines</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
