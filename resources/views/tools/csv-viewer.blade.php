<x-tool-paper x-data="{
    input: `id,name,department,salary,status
1,Sarah Connor,Security,95000,Active
2,John Doe,Engineering,115000,Active
3,Jane Smith,Product,105000,On Leave
4,Michael Scott,Management,75000,Active
5,Pam Beesly,Administration,55000,Active`,
    search: '',
    sortCol: null,
    sortAsc: true,
    get parsed() {
        if (!this.input.trim()) return { headers: [], rows: [] };
        const lines = this.input.trim().split(/\r?\n/);
        if (!lines.length) return { headers: [], rows: [] };
        const headers = lines[0].split(',').map(h => h.trim().replace(/^&quot;|&quot;$/g, ''));
        const rows = [];
        for (let i = 1; i < lines.length; i++) {
            const vals = lines[i].split(',').map(v => v.trim().replace(/^&quot;|&quot;$/g, ''));
            const obj = {};
            headers.forEach((h, idx) => {
                obj[h] = vals[idx] || '';
            });
            rows.push(obj);
        }
        return { headers, rows };
    },
    get filteredRows() {
        let list = this.parsed.rows;
        if (this.search.trim()) {
            const q = this.search.toLowerCase();
            list = list.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
        }
        if (this.sortCol) {
            list.sort((a, b) => {
                const va = a[this.sortCol];
                const vb = b[this.sortCol];
                const na = Number(va);
                const nb = Number(vb);
                if (!isNaN(na) && !isNaN(nb)) {
                    return this.sortAsc ? na - nb : nb - na;
                }
                return this.sortAsc ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
            });
        }
        return list;
    },
    toggleSort(col) {
        if (this.sortCol === col) {
            this.sortAsc = !this.sortAsc;
        } else {
            this.sortCol = col;
            this.sortAsc = true;
        }
    },
    exportJson() {
        const json = JSON.stringify(this.filteredRows, null, 2);
        navigator.clipboard.writeText(json);
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">CSV Source Text</label>
            <textarea
                x-model="input"
                rows="6"
                placeholder="name,role,email&#10;Alice,Developer,alice@example.com"
                class="textarea textarea-bordered rounded-3xl w-full text-xs font-mono p-4 bg-base-100"
            ></textarea>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex-1 max-w-sm">
                <input
                    type="text"
                    x-model="search"
                    placeholder="Search table rows..."
                    class="input input-bordered rounded-full input-sm w-full text-xs"
                />
            </div>
            <button
                type="button"
                @click="exportJson()"
                :disabled="!filteredRows.length"
                class="px-4 py-1.5 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-40"
            >
                Copy Visible Rows as JSON
            </button>
        </div>

        {{-- Interactive Table Container --}}
        <div class="p-6 rounded-3xl bg-base-100 border border-base-300 space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
                    Showing <span x-text="filteredRows.length"></span> of <span x-text="parsed.rows.length"></span> rows
                </span>
                <span class="text-xs text-base-content/50 font-mono">Click column headers to sort</span>
            </div>

            <div class="overflow-x-auto max-h-80">
                <table class="table table-sm w-full font-mono">
                    <thead>
                        <tr class="text-base-content/70 border-b border-base-300">
                            <template x-for="h in parsed.headers" :key="h">
                                <th @click="toggleSort(h)" class="cursor-pointer hover:text-primary select-none whitespace-nowrap">
                                    <span x-text="h"></span>
                                    <span class="text-[10px] ml-1" x-text="sortCol === h ? (sortAsc ? '▲' : '▼') : '↕'"></span>
                                </th>
                            </template>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-base-200">
                        <template x-for="(row, idx) in filteredRows" :key="idx">
                            <tr class="hover:bg-base-200/40">
                                <template x-for="h in parsed.headers" :key="h">
                                    <td class="whitespace-nowrap" x-text="row[h]"></td>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
