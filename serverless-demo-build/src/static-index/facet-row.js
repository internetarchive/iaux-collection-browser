/** A year byte as a calendar year; 0 when unknown. See FacetColumn. */
export function yearFromByte(byte, encoding = 1) {
    if (!byte)
        return 0;
    if (encoding !== 2)
        return 1900 + byte;
    return byte <= 20 ? 1700 + 10 * (byte - 1) : 1900 + (byte - 21);
}
/**
 * Reads rows laid out as `rows` describes, and each doc's ids from
 * `docValues` (a DocValues file's ids, unpacked, by key).
 */
export function facetRowReader(rows, docValues = {}) {
    const columns = new Map(rows.columns.map(column => [column.key, column]));
    const flagColumns = rows.columns.filter((column) => column.kind === 'flags');
    // packed value -> code, per packed column
    const packedCodes = new Map(rows.columns.flatMap(column => column.kind === 'packed'
        ? [
            [
                column.key,
                new Map(Object.entries(column.codes).map(([code, n]) => [n, code])),
            ],
        ]
        : []));
    return (row, docId) => ({
        value(key) {
            const ids = docValues[key];
            if (ids) {
                const id = docId === undefined ? 0 : (ids[docId - 1] ?? 0);
                return id ? String(id) : undefined;
            }
            const column = columns.get(key);
            if (!column)
                return undefined;
            const byte = column.kind === 'flags' ? 0 : (row[column.byte] ?? 0);
            switch (column.kind) {
                case 'code': {
                    const n = column.width === 2
                        ? byte | ((row[column.byte + 1] ?? 0) << 8)
                        : byte;
                    return n ? column.codes[n - 1] : undefined;
                }
                case 'year': {
                    const year = yearFromByte(byte, column.encoding);
                    return year ? String(year) : undefined;
                }
                case 'packed':
                    return packedCodes
                        .get(column.key)
                        ?.get((byte >> column.shift) & column.mask);
                default:
                    return undefined;
            }
        },
        hasFlag(name) {
            return flagColumns.some(column => {
                const bit = column.bits[name];
                if (!bit)
                    return false;
                const flags = column.bytes.reduce((all, at, i) => all | ((row[at] ?? 0) << (8 * i)), 0);
                return (flags & bit) !== 0;
            });
        },
    });
}
/** A doc's values (codes) for a facet. */
export function facetValues(facet, row) {
    const { from } = facet;
    if ('column' in from) {
        const value = row.value(from.column) ?? from.unknownAs;
        return value === undefined ? [] : [value];
    }
    if ('flags' in from)
        return from.flags.filter(flag => row.hasFlag(flag));
    return Object.entries(from.derived)
        .filter(([, rule]) => passes(rule, row))
        .map(([value]) => value);
}
function passes(rule, row) {
    if ('flag' in rule)
        return row.hasFlag(rule.flag);
    if ('notFlag' in rule)
        return !row.hasFlag(rule.notFlag);
    return rule.anyFlag.some(flag => row.hasFlag(flag));
}
/**
 * The name each of a doc value's ids is shown under, from its labels file
 * (`text`), indexed by id - 1. See FacetNames.
 */
export function labelNames(names, labels, text) {
    const at = (column) => labels.columns.indexOf(column);
    const rows = text
        .replace(/\n$/, '')
        .split('\n')
        .map(line => line.split('\t'));
    const label = (row) => row[at(names.column)] || row[0];
    const uses = new Map();
    for (const row of rows)
        uses.set(label(row), (uses.get(label(row)) ?? 0) + 1);
    return rows.map(row => {
        const shared = names.whenShared && row[at(names.whenShared)];
        return uses.get(label(row)) > 1 && shared
            ? `${label(row)} (${shared})`
            : label(row);
    });
}
const displayNames = new Map();
/**
 * A value code's shown name; the code itself when nothing names it. Labels
 * names come from a file, so they're read with labelNames instead.
 */
export function facetLabel(names, code) {
    if (!names || names.from === 'labels')
        return code;
    if (names.from === 'table')
        return names.labels[code] ?? code;
    if (names.overrides?.[code])
        return names.overrides[code];
    if (!displayNames.has(names.type)) {
        try {
            displayNames.set(names.type, new Intl.DisplayNames(['en'], { type: names.type }));
        }
        catch {
            displayNames.set(names.type, null);
        }
    }
    try {
        return displayNames.get(names.type)?.of(code) ?? code;
    }
    catch {
        return code; // not a well-formed code
    }
}
