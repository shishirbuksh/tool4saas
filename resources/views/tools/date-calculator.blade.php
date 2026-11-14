<x-tool-paper x-data="{
    mode: 'diff',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    shiftDays: 30,
    shiftOp: 'add',
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
                        <input type="date" x-model="startDate" class="input input-bordered rounded-xl w-full text-sm font-mono" />
                    </div>
                    <div class="form-control">
                        <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">End Date</span></label>
                        <input type="date" x-model="endDate" class="input input-bordered rounded-xl w-full text-sm font-mono" />
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
                        <div class="text-2xl font-black text-primary mt-1 font-display tabular-nums">
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
                        <input type="date" x-model="startDate" class="input input-bordered rounded-xl w-full text-sm font-mono" />
                    </div>
                    <div class="form-control">
                        <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Operation</span></label>
                        <select x-model="shiftOp" class="select select-bordered rounded-xl w-full text-sm">
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
    </div>
</x-tool-paper>
