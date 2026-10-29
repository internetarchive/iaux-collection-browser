import type {
  FacetColumn,
  FacetConfig,
  FacetNames,
  FacetRows,
  FlagRule,
} from './manifest';

/**
 * Reading a doc's facet values the way a manifest and config describe
 * them, with no index-specific code: what a generic engine counts and
 * filters by.
 */

/** One doc's facet row, read through the manifest's columns. */
export interface FacetRow {
  /** A code, packed or year column's value; undefined when unknown. */
  value(column: string): string | undefined;
  /** Whether the doc has the named flag, in any flags column. */
  hasFlag(name: string): boolean;
}

/** A year byte as a calendar year; 0 when unknown. See FacetColumn. */
export function yearFromByte(byte: number, encoding: 1 | 2 = 1): number {
  if (!byte) return 0;
  if (encoding !== 2) return 1900 + byte;
  return byte <= 20 ? 1700 + 10 * (byte - 1) : 1900 + (byte - 21);
}

/** Reads rows laid out as `rows` describes. */
export function facetRowReader(rows: FacetRows): (row: Uint8Array) => FacetRow {
  const columns = new Map(rows.columns.map(column => [column.key, column]));
  const flagColumns = rows.columns.filter(
    (column): column is Extract<FacetColumn, { kind: 'flags' }> =>
      column.kind === 'flags',
  );
  // packed value -> code, per packed column
  const packedCodes = new Map(
    rows.columns.flatMap(column =>
      column.kind === 'packed'
        ? [
            [
              column.key,
              new Map(
                Object.entries(column.codes).map(([code, n]) => [n, code]),
              ),
            ] as const,
          ]
        : [],
    ),
  );

  return row => ({
    value(key) {
      const column = columns.get(key);
      if (!column) return undefined;
      const byte = column.kind === 'flags' ? 0 : (row[column.byte] ?? 0);
      switch (column.kind) {
        case 'code':
          return byte ? column.codes[byte - 1] : undefined;
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
        if (!bit) return false;
        const flags = column.bytes.reduce(
          (all, at, i) => all | ((row[at] ?? 0) << (8 * i)),
          0,
        );
        return (flags & bit) !== 0;
      });
    },
  });
}

/** A doc's values (codes) for a facet. */
export function facetValues(facet: FacetConfig, row: FacetRow): string[] {
  const { from } = facet;
  if ('column' in from) {
    const value = row.value(from.column) ?? from.unknownAs;
    return value === undefined ? [] : [value];
  }
  if ('flags' in from) return from.flags.filter(flag => row.hasFlag(flag));
  return Object.entries(from.derived)
    .filter(([, rule]) => passes(rule, row))
    .map(([value]) => value);
}

function passes(rule: FlagRule, row: FacetRow): boolean {
  if ('flag' in rule) return row.hasFlag(rule.flag);
  if ('notFlag' in rule) return !row.hasFlag(rule.notFlag);
  return rule.anyFlag.some(flag => row.hasFlag(flag));
}

const displayNames = new Map<string, Intl.DisplayNames | null>();

/** A value code's shown name; the code itself when nothing names it. */
export function facetLabel(
  names: FacetNames | undefined,
  code: string,
): string {
  if (!names) return code;
  if (names.from === 'table') return names.labels[code] ?? code;
  if (names.overrides?.[code]) return names.overrides[code];
  if (!displayNames.has(names.type)) {
    try {
      displayNames.set(
        names.type,
        new Intl.DisplayNames(['en'], { type: names.type }),
      );
    } catch {
      displayNames.set(names.type, null);
    }
  }
  try {
    return displayNames.get(names.type)?.of(code) ?? code;
  } catch {
    return code; // not a well-formed code
  }
}
