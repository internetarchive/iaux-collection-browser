import type { ItemFileList } from './file-list';

/**
 * Checking that an item's fixed-width files fit the counts its manifests
 * give, from the item's file list alone: no file is read.
 *
 * A file of fixed-size rows is `rows × rowBytes + extraBytes` long, so its
 * size says how many rows it was built for. When an item replaces some of
 * its files and not others, the sizes stop agreeing with the manifest; the
 * layer those files serve can then be switched off with a reason, instead
 * of reading one build's rows with another build's ids.
 */

export interface SizeRule {
  file: string;
  /** What the file serves, e.g. 'vector search'; a failed rule turns it off. */
  layer: string;
  /** Rows the manifest says the file holds. */
  rows: number;
  /** What the rows are, for messages: 'records', 'vectors'. */
  rowsOf: string;
  rowBytes: number;
  /** Bytes beyond the rows, e.g. an offsets table's final entry. */
  extraBytes?: number;
}

export type SizeStatus =
  /** The size fits the manifest. */
  | 'ok'
  /** The size doesn't fit: the file was built for something else. */
  | 'mismatch'
  /**
   * The list doesn't have the file: just uploaded (the list lags a few
   * minutes), or not there. Not taken as a failure.
   */
  | 'unlisted';

export interface SizeCheck {
  rule: SizeRule;
  status: SizeStatus;
  expectedSize: number;
  size?: number;
  /** For a mismatch: the rows the file's size does fit, when it fits whole rows. */
  fitsRows?: number;
}

/** Every rule checked against the list, and the layers that failed. */
export interface SizeReport {
  checks: SizeCheck[];
  /** Layers with a mismatched file, in rule order. */
  failedLayers: string[];
}

export function checkSizes(
  rules: readonly SizeRule[],
  list: ItemFileList,
): SizeReport {
  const checks = rules.map((rule): SizeCheck => {
    const extra = rule.extraBytes ?? 0;
    const expectedSize = rule.rows * rule.rowBytes + extra;
    const entry = list.get(rule.file);
    if (!entry) return { rule, status: 'unlisted', expectedSize };
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
    ...new Set(
      checks
        .filter(check => check.status === 'mismatch')
        .map(check => check.rule.layer),
    ),
  ];
  return { checks, failedLayers };
}

/** A mismatch in words, e.g. for an error or the demo's file report. */
export function describeMismatch(check: SizeCheck): string {
  const { rule } = check;
  const fits =
    check.fitsRows === undefined
      ? "which isn't a whole number of rows"
      : `which fits ${check.fitsRows.toLocaleString('en-US')} ${rule.rowsOf}`;
  return (
    `${rule.file} is ${check.size?.toLocaleString('en-US')} bytes, ${fits}; ` +
    `the manifest says ${rule.rows.toLocaleString('en-US')} ${rule.rowsOf}`
  );
}
