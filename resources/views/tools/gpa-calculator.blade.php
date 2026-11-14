<x-tool-paper x-data="{
    courses: [
        { id: 1, name: 'Course 1', grade: 4.0, credits: 3 },
        { id: 2, name: 'Course 2', grade: 3.7, credits: 4 },
        { id: 3, name: 'Course 3', grade: 3.3, credits: 3 },
        { id: 4, name: 'Course 4', grade: 4.0, credits: 3 }
    ],
    nextId: 5,
    addCourse() {
        this.courses.push({ id: this.nextId++, name: 'Course ' + this.courses.length, grade: 4.0, credits: 3 });
    },
    removeCourse(id) {
        if (this.courses.length > 1) {
            this.courses = this.courses.filter(c => c.id !== id);
        }
    },
    get totalCredits() {
        return this.courses.reduce((acc, c) => acc + (parseFloat(c.credits) || 0), 0);
    },
    get totalPoints() {
        return this.courses.reduce((acc, c) => acc + ((parseFloat(c.grade) || 0) * (parseFloat(c.credits) || 0)), 0);
    },
    get gpa() {
        if (this.totalCredits <= 0) return 0;
        return (this.totalPoints / this.totalCredits).toFixed(2);
    },
    get percentage() {
        return Math.round((this.gpa / 4) * 100);
    }
}">
    <div class="space-y-6">
        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Cumulative Grade Point Average</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="gpa"></span> <span class="text-2xl font-mono text-white">/ 4.0</span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Equivalent to approx. <span class="text-white font-bold" x-text="percentage + '%'"></span> academic grade score
            </p>
        </div>

        {{-- Courses Table/Grid --}}
        <div class="p-6 rounded-3xl bg-base-100 border border-base-300 space-y-4">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Enrolled Courses &amp; Units</span>
                <button
                    type="button"
                    @click="addCourse()"
                    class="px-4 py-1.5 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-xs font-bold transition-all shadow-xs"
                >
                    + Add Course
                </button>
            </div>

            <div class="space-y-3">
                <template x-for="c in courses" :key="c.id">
                    <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 rounded-2xl bg-base-200/50 border border-base-300">
                        <div class="sm:col-span-5">
                            <input type="text" x-model="c.name" placeholder="Course Name" class="input input-bordered rounded-xl w-full text-xs" />
                        </div>
                        <div class="sm:col-span-3">
                            <select x-model.number="c.grade" class="select select-bordered rounded-xl w-full text-xs">
                                <option value="4.0">A (4.0)</option>
                                <option value="3.7">A- (3.7)</option>
                                <option value="3.3">B+ (3.3)</option>
                                <option value="3.0">B (3.0)</option>
                                <option value="2.7">B- (2.7)</option>
                                <option value="2.3">C+ (2.3)</option>
                                <option value="2.0">C (2.0)</option>
                                <option value="1.7">C- (1.7)</option>
                                <option value="1.0">D (1.0)</option>
                                <option value="0.0">F (0.0)</option>
                            </select>
                        </div>
                        <div class="sm:col-span-3">
                            <input type="number" x-model.number="c.credits" min="0.5" max="20" step="0.5" placeholder="Credits" class="input input-bordered rounded-xl w-full text-xs font-mono" />
                        </div>
                        <div class="sm:col-span-1 text-right">
                            <button
                                type="button"
                                @click="removeCourse(c.id)"
                                :disabled="courses.length <= 1"
                                class="btn btn-ghost btn-circle btn-xs text-error disabled:opacity-30"
                                title="Remove course"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        {{-- Summary Cards --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Credit Hours</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums" x-text="totalCredits"></div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Grade Points (Quality Points)</span>
                <div class="text-2xl font-black text-primary mt-1 font-display tabular-nums" x-text="totalPoints.toFixed(1)"></div>
            </div>
        </div>
    </div>
</x-tool-paper>
