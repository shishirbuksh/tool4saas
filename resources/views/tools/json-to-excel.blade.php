<x-card class="p-6 md:p-8" x-data="{
    input: '[{\x22id\x22:1,\x22name\x22:\x22Alice\x22,\x22role\x22:\x22Engineer\x22},{\x22id\x22:2,\x22name\x22:\x22Bob\x22,\x22role\x22:\x22Designer\x22}]',
    downloadCsv() {
        try {
            const data = JSON.parse(this.input);
            if (!Array.isArray(data) || !data.length) return alert('JSON must be an array of objects.');
            const headers = Object.keys(data[0]);
            let csv = headers.join(',') + '\n';
            data.forEach(row => {
                csv += headers.map(h => JSON.stringify(row[h] !== undefined ? row[h] : '')).join(',') + '\n';
            });
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'export.csv';
            a.click();
        } catch(e) {
            alert('Invalid JSON: ' + e.message);
        }
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">JSON Array Input</label>
            <textarea
                x-model="input"
                rows="8"
                placeholder='[{"id": 1, "name": "Item"}]'
                class="textarea textarea-bordered w-full rounded-[16px] text-xs font-mono bg-base-100 dark:bg-base-200"
            ></textarea>
        </div>

        <button type="button" @click="downloadCsv()" class="btn btn-primary rounded-[12px] font-bold">
            Export & Download CSV (Excel Compatible)
        </button>

        {{-- Technical Comparison: Structured Data Exchange Formats Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Structured Data Formats: JSON vs. CSV vs. Excel XLSX vs. Parquet Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Data Format</th>
                            <th>Schema &amp; Type Safety</th>
                            <th>Nested Object / Array Support</th>
                            <th>Excel &amp; BI Native Compatibility</th>
                            <th>Typical Production Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">JSON (.json)</td>
                            <td class="font-mono">Implicit (Numbers, Strings, Booleans)</td>
                            <td class="text-success font-semibold">Native (Arbitrary nesting)</td>
                            <td class="text-warning font-semibold">Requires Power Query import</td>
                            <td>REST APIs, NoSQL documents, state serialization</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">CSV (.csv)</td>
                            <td class="font-mono text-warning">None (All plain strings)</td>
                            <td class="text-error font-semibold">Flat 2D tabular only</td>
                            <td class="text-success font-bold">100% universal 1-click open</td>
                            <td>Spreadsheet data sharing, database bulk dumps</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Excel (.xlsx)</td>
                            <td class="font-mono font-bold">Rich (Formulas, cell types, styles)</td>
                            <td class="font-mono">Multi-sheet workbooks</td>
                            <td class="text-success font-bold">Native Microsoft Office standard</td>
                            <td>Financial modeling, executive dashboards, pivot tables</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Parquet (.parquet)</td>
                            <td class="font-mono font-bold text-success">Strict binary columnar schema</td>
                            <td class="text-success font-semibold">Yes (Complex nested structures)</td>
                            <td class="font-mono">Via Power BI / DuckDB</td>
                            <td>Big Data analytics (Snowflake, BigQuery, Databricks)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
