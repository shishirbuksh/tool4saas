<x-tool-paper x-data="{
    input: &quot;select u.id, u.name, o.total, count(i.id) as item_count from users u inner join orders o on u.id = o.user_id left join items i on o.id = i.order_id where o.status = 'completed' and o.total > 100 group by u.id, u.name, o.total order by o.total desc limit 10;&quot;,
    output: '',
    copied: false,
    formatSql() {
        if (!this.input.trim()) {
            this.output = '';
            return;
        }

        const keywords = [
            'SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN',
            'JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET',
            'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'UNION ALL', 'UNION'
        ];

        let sql = this.input.trim();

        // Capitalize keywords and format newlines
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw.replace(/ /g, '\\s+')}\\b`, 'gi');
            sql = sql.replace(regex, `\n${kw}`);
        });

        // Split by lines, indent clauses
        const lines = sql.split('\n').map(l => l.trim()).filter(Boolean);
        const formatted = lines.map(line => {
            const isTopLevel = keywords.some(kw => line.toUpperCase().startsWith(kw));
            return isTopLevel ? line : `  ${line}`;
        }).join('\n');

        this.output = formatted.trim();
    },
    copy() {
        if (!this.output) return;
        navigator.clipboard.writeText(this.output);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    },
    clear() {
        this.input = '';
        this.output = '';
    },
    init() {
        this.formatSql();
    }
}">
    <div class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl sm:rounded-full bg-base-200 border border-base-300">
            <div class="flex items-center gap-2">
                <button
                    type="button"
                    @click="formatSql()"
                    class="px-5 py-2 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-xs sm:text-sm transition-all shadow-xs"
                >
                    Format SQL Query
                </button>
            </div>
            <div class="flex items-center gap-2 pr-2">
                <button
                    type="button"
                    @click="clear()"
                    class="px-3 py-1 rounded-full text-xs font-bold text-error hover:bg-error/10 transition-colors"
                >
                    Clear All
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Input SQL Statement</label>
                <textarea
                    x-model="input"
                    rows="12"
                    placeholder="Paste unformatted SQL query here..."
                    class="textarea textarea-bordered rounded-2xl w-full font-mono text-xs leading-relaxed p-4 bg-base-100"
                ></textarea>
            </div>

            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Clean Formatted SQL</label>
                    <button
                        type="button"
                        @click="copy()"
                        :disabled="!output"
                        class="px-3.5 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                    >
                        <span x-text="copied ? 'Copied!' : 'Copy SQL'"></span>
                    </button>
                </div>
                <textarea
                    x-model="output"
                    readonly
                    rows="12"
                    placeholder="Formatted query will appear here..."
                    class="textarea textarea-bordered rounded-2xl bg-base-200/50 w-full font-mono text-xs leading-relaxed p-4"
                ></textarea>
            </div>
        </div>
    </div>
</x-tool-paper>
