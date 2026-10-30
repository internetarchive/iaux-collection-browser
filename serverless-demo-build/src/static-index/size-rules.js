export function checkSizes(rules, list) {
    const checks = rules.map((rule) => {
        const extra = rule.extraBytes ?? 0;
        const expectedSize = rule.rows * rule.rowBytes + extra;
        const entry = list.get(rule.file);
        if (!entry)
            return { rule, status: 'unlisted', expectedSize };
        if (entry.size === expectedSize) {
            return { rule, status: 'ok', expectedSize, size: entry.size };
        }
        const rows = (entry.size - extra) / rule.rowBytes;
        return {
            rule,
            status: 'mismatch',
            expectedSize,
            size: entry.size,
            fitsRows: Number.isInteger(rows) && rows >= 0 ? rows : undefined,
        };
    });
    const failedLayers = [
        ...new Set(checks
            .filter(check => check.status === 'mismatch')
            .map(check => check.rule.layer)),
    ];
    return { checks, failedLayers };
}
/** A mismatch in words, e.g. for an error or the demo's file report. */
export function describeMismatch(check) {
    const { rule } = check;
    const fits = check.fitsRows === undefined
        ? "which isn't a whole number of rows"
        : `which fits ${check.fitsRows.toLocaleString('en-US')} ${rule.rowsOf}`;
    return (`${rule.file} is ${check.size?.toLocaleString('en-US')} bytes, ${fits}; ` +
        `the manifest says ${rule.rows.toLocaleString('en-US')} ${rule.rowsOf}`);
}
