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
    </div>
</x-card>
