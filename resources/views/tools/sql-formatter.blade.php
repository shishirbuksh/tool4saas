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
        window.copyTextSafe(this.output);
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
                <textarea aria-label="Input SQL Statement"
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
                <textarea aria-label="Formatted query will appear here"
                    x-model="output"
                    readonly
                    rows="12"
                    placeholder="Formatted query will appear here..."
                    class="textarea textarea-bordered rounded-2xl bg-base-200/50 w-full font-mono text-xs leading-relaxed p-4"
                ></textarea>
            </div>
        </div>

        {{-- Technical Comparison: Major SQL Dialects Syntax Standards Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                ANSI SQL Standards &amp; Relational Dialect Differences: PostgreSQL vs. MySQL vs. T-SQL vs. SQLite Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Relational Database</th>
                            <th>Identifier Quoting</th>
                            <th>String Concatenation</th>
                            <th>Pagination Syntax</th>
                            <th>JSON Column Support</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">PostgreSQL (16+)</td>
                            <td class="font-mono">Double quotes: <code class="font-mono">&quot;users&quot;</code></td>
                            <td class="font-mono font-bold">|| (Pipe operator)</td>
                            <td class="font-mono">LIMIT n OFFSET o / FETCH FIRST</td>
                            <td class="font-bold text-success font-mono">Native JSONB with GIN index indexing</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">MySQL (8.0+) / MariaDB</td>
                            <td class="font-mono">Backticks: <code class="font-mono">`users`</code></td>
                            <td class="font-mono">CONCAT(str1, str2)</td>
                            <td class="font-mono font-bold">LIMIT offset, count</td>
                            <td class="font-mono">Binary JSON with functional indexes</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Microsoft SQL Server (T-SQL)</td>
                            <td class="font-mono">Square brackets: <code class="font-mono">[users]</code></td>
                            <td class="font-mono">+ (Plus operator) or CONCAT()</td>
                            <td class="font-mono">OFFSET o ROWS FETCH NEXT n ROWS ONLY</td>
                            <td class="font-mono">NVARCHAR(MAX) with ISJSON() &amp; JSON_VALUE()</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">SQLite (3.x)</td>
                            <td class="font-mono">Double quotes or backticks</td>
                            <td class="font-mono">|| (Pipe operator)</td>
                            <td class="font-mono">LIMIT n OFFSET o</td>
                            <td class="font-mono">JSON1 extension functions (JSONB in 3.45+)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
