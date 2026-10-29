/**
 * Describing an item that can be searched in the browser, from a static
 * index it publishes: no search backend, just files read with HTTP Range.
 *
 * Two halves:
 * - the **manifest** is published by the item, next to its index files, and
 *   says what's in them: fields, record layout, facet columns;
 * - the **config** is held by the client, and says how to search and show
 *   it: which record fields make a hit, which facets to show and how.
 *
 * `checkConfig` checks every name a config uses against the manifest.
 * See README.md in this folder.
 */

/** Published next to the index files: what's in them. */
export interface StaticIndexManifest {
  format: 'ia-static-index';
  formatVersion: 1;
  /**
   * The build's version. Every index file is published as
   * `<name>.<version>`, so a rebuild never mixes files from two builds.
   */
  version: string;
  docCount: number;
  text: TextIndex;
  records: RecordLayout;
  /**
   * Whether posfwd.dir/posfwd.bin exist: each doc's full word list per
   * field, for checking that words sit side by side.
   */
  positions?: boolean;
  facets?: FacetRows;
}

/** The searchable text: dictionary and postings, one prefix per field. */
export interface TextIndex {
  fields: TextField[];
  /**
   * How the postings' impacts were computed at build time. Informational:
   * impacts are precomputed, so the engine doesn't need it.
   */
  bm25?: { k1: number; b: number };
  /**
   * Search-time ranking the index author tuned, by field key. A config can
   * override any part of it.
   */
  ranking?: Ranking;
}

export interface Ranking {
  /** Multiplied onto each posting's impact. */
  fieldWeights: Record<string, number>;
  /** Multiplier when every query word lands in this one field of a doc. */
  sameFieldBoost: Record<string, number>;
  /** m adjacent query words multiply a doc's score by 1 + proximity * (m - 1). */
  proximity: number;
}

export interface TextField {
  /** The field's name, e.g. 'creators'. */
  key: string;
  /** Its prefix in dictionary terms: 'c' for 'c:smith'. */
  prefix: string;
  /**
   * The query words that search this field alone: ['creator', 'author']
   * makes `author:smith` search creators. The key isn't an alias unless
   * listed.
   */
  aliases?: string[];
  /** Average length in words, from the build. Informational. */
  avgLength?: number;
  /** Build-time weight baked into the impacts. Informational. */
  indexWeight?: number;
}

/** stubs.bin: one fixed-size record per doc, holding what a hit shows. */
export interface RecordLayout {
  /** Bytes per record. */
  bytes: number;
  /** NUL-padded UTF-8 fields at fixed byte offsets, end exclusive. */
  fields: { key: string; start: number; end: number }[];
  /**
   * Fields that can be cut short in the record, held whole per doc in a
   * .dir/.bin pair: the .dir is docId-aligned offsets into the .bin.
   */
  overflow?: { field: string; dir: string; bin: string }[];
  /** The field shown as a hit's snippet: deflated JSON, in a .dir/.bin pair. */
  snippet?: { field: string; dir: string; bin: string };
}

/** One fixed-size row of facet values per doc, in one file read whole. */
export interface FacetRows {
  file: string;
  /** Bytes per row. */
  stride: number;
  /** Whether the file is gzipped. */
  gzip: boolean;
  columns: FacetColumn[];
}

/**
 * Where a facet value sits in a row. A byte of 0 means unknown, except in
 * flags. A byte can hold more than one column (e.g. flag bits below a
 * packed value); each reads only its own bits.
 */
export type FacetColumn =
  /** A code from a list: byte n means codes[n - 1]. */
  | { key: string; kind: 'code'; byte: number; codes: string[] }
  /**
   * A year. Encoding 1: 1900 + byte. Encoding 2: bytes 1-20 are the decades
   * 1700-1890 (as their first year), 21-255 the years 1900-2134.
   */
  | { key: string; kind: 'year'; byte: number; encoding: 1 | 2 }
  /**
   * Named bits across one or more bytes, the first lowest: bytes [1, 6]
   * puts byte 6 at bits 8-15. Bits no name uses are ignored.
   */
  | {
      key: string;
      kind: 'flags';
      bytes: number[];
      bits: Record<string, number>;
    }
  /** A code packed into some bits of a byte: (byte >> shift) & mask. */
  | {
      key: string;
      kind: 'packed';
      byte: number;
      shift: number;
      mask: number;
      codes: Record<string, number>;
    };

/** Held by the client: how to search and show an index. */
export interface StaticSearchConfig {
  /** Where the index is published: current.json and the versioned files. */
  baseUrl: string;
  /** Overrides the manifest's ranking, part by part. */
  ranking?: Partial<Ranking>;
  /** The record fields a hit is made of, by record field key. */
  hit: { title: string; creators?: string; date?: string; url: string };
  facets: FacetConfig[];
}

/** One facet, as collection-browser shows it. */
export interface FacetConfig {
  key: string;
  title: string;
  pluralTitle: string;
  /** Shown after this facet group (a facet's key, or a column's). */
  after?: string;
  /** A match needs any picked value (default) or all of them. */
  combine?: 'any' | 'all';
  /** Where a doc's values for this facet come from. */
  from: FacetSource;
  /** How value codes are named; the code itself when absent. */
  names?: FacetNames;
}

export type FacetSource =
  /** A code or packed column's value; `unknownAs` names docs without one. */
  | { column: string; unknownAs?: string }
  /** Each named flag a doc has is one of its values. */
  | { flags: string[] }
  /** Each value is a rule over a doc's flags. */
  | { derived: Record<string, FlagRule> };

export type FlagRule =
  | { flag: string }
  | { anyFlag: string[] }
  | { notFlag: string };

export type FacetNames =
  /** A name per code. */
  | { from: 'table'; labels: Record<string, string> }
  /**
   * The browser's English names (Intl.DisplayNames) for ISO codes, with
   * `overrides` first.
   */
  | {
      from: 'intl';
      type: 'language' | 'region';
      overrides?: Record<string, string>;
    };
