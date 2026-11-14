<x-tool-paper x-data="{
    birthDate: '1995-06-15',
    targetDate: new Date().toISOString().slice(0, 10),
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
    totalWeeks: 0,
    totalHours: 0,
    nextBirthdayDays: 0,
    calculate() {
        if (!this.birthDate) return;
        const b = new Date(this.birthDate + 'T00:00:00');
        const t = new Date((this.targetDate || new Date().toISOString().slice(0, 10)) + 'T00:00:00');
        if (isNaN(b.getTime()) || isNaN(t.getTime())) return;

        let y = t.getFullYear() - b.getFullYear();
        let m = t.getMonth() - b.getMonth();
        let d = t.getDate() - b.getDate();

        if (d < 0) {
            m -= 1;
            const prevMonthDays = new Date(t.getFullYear(), t.getMonth(), 0).getDate();
            d += prevMonthDays;
        }

        if (m < 0) {
            y -= 1;
            m += 12;
        }

        this.years = Math.max(0, y);
        this.months = Math.max(0, m);
        this.days = Math.max(0, d);

        const diffMs = t.getTime() - b.getTime();
        this.totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
        this.totalWeeks = Math.floor(this.totalDays / 7);
        this.totalHours = this.totalDays * 24;

        // Next birthday
        let nextBday = new Date(t.getFullYear(), b.getMonth(), b.getDate());
        if (nextBday < t) {
            nextBday = new Date(t.getFullYear() + 1, b.getMonth(), b.getDate());
        }
        this.nextBirthdayDays = Math.ceil((nextBday.getTime() - t.getTime()) / (1000 * 60 * 60 * 24));
    },
    init() {
        this.calculate();
    }
}">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div class="form-control">
            <label class="label py-1"><span class="label-text font-semibold text-sm">Date of Birth</span></label>
            <input type="date" x-model="birthDate" @change="calculate()" class="input input-bordered rounded-xl w-full text-base" />
        </div>
        <div class="form-control">
            <label class="label py-1"><span class="label-text font-semibold text-sm">Age on Date</span></label>
            <input type="date" x-model="targetDate" @change="calculate()" class="input input-bordered rounded-xl w-full text-base" />
        </div>
    </div>

    {{-- Wise Signature Polarity-Flipped Dark Hero Card --}}
    <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white text-center mb-6 shadow-sm border border-[#242a20]">
        <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Calculated Exact Age</span>
        <div class="text-3xl sm:text-5xl font-black text-primary my-3 tracking-tight font-display">
            <span x-text="years"></span> Years, <span x-text="months"></span> Months, <span x-text="days"></span> Days
        </div>
        <p class="text-xs sm:text-sm text-[#868685]">
            Next birthday occurs in <span class="inline-block px-2.5 py-0.5 rounded-full bg-[#242a20] text-primary font-bold text-xs"><span x-text="nextBirthdayDays"></span> days</span>
        </p>
    </div>

    {{-- Detailed Metrics Breakdown --}}
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase font-mono">Total Days</div>
            <div class="text-xl font-black text-base-content mt-1 tabular-nums" x-text="totalDays.toLocaleString()"></div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase font-mono">Total Weeks</div>
            <div class="text-xl font-black text-base-content mt-1 tabular-nums" x-text="totalWeeks.toLocaleString()"></div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase font-mono">Total Hours</div>
            <div class="text-xl font-black text-base-content mt-1 tabular-nums" x-text="totalHours.toLocaleString()"></div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase font-mono">Total Months</div>
            <div class="text-xl font-black text-base-content mt-1 tabular-nums" x-text="(years * 12 + months).toLocaleString()"></div>
        </div>
    </div>
</x-tool-paper>
