/**
 * Describing an item that can be searched in the browser, from a static
 * index it publishes: no search backend, just files read with HTTP Range.
 *
 * Two halves:
 * - the **manifest** is published by the item, next to its index files, and
 *   says what's in them: id spaces, records, facet columns, and per search
 *   its fields, or its vectors and the model that made them;
 * - the **config** is held by the client, and says how to search and show
 *   it: which record fields make a hit, which facets to show and how.
 *
 * `checkConfig` checks every name a config uses against the manifest.
 * See README.md in this folder.
 */

/**
 * Published by the item as static-index.json, next to its index files:
 * every set of docs it has (id spaces) and every way to search them.
 * The file has a fixed name and is read fresh. A publish step writes it
 * once the build's files have landed, from the build's own copy,
 * static-index.<version>.json.
 */
export interface StaticItemManifest {
  format: 'ia-static-index';
  formatVersion: 2;
  /**
   * Each set of docs with ids of its own, by key: its records, facets and
   * doc values. Two searches over different id spaces return different
   * docs, even when they describe the same things (ETD's text index and
   * vector store).
   */
  idSpaces: Record<string, IdSpace>;
  /** Each way to search, by key: words or meaning, over one id space. */
  searches: Record<string, StaticSearch>;
  /**
   * The build before this one, whose manifest is
   * static-index.<previous>.json. Its files are kept until the next
   * publish, so a reader can fall back to it whole when this build's
   * files aren't on every server yet (a 404). Only that build's manifest
   * describes its files: counts and sizes differ between builds.
   */
  previous?: string;
}

/**
 * How a group of files is named, so a rebuild never mixes two builds'
 * files.
 *
 * - `versioned`: every file is `<name>.<version><suffix>` and never
 *   changes, so it caches forever and a rebuild can't be read half old,
 *   half new. Use this for a new index. archive.org's servers only allow
 *   cross-origin reads of some extensions, `.json` among them, so a file
 *   a browser reads from another origin needs `suffix: '.json'`.
 * - `stamped`: fixed names, read as `<name>?v=<built>`, overwritten by a
 *   rebuild. A reader that loaded the old manifest can then read new
 *   bytes, which is why sidecars carry stamps to check. ETD's vector store
 *   is published this way.
 */
export type FileSet =
  | { naming: 'versioned'; version: string; suffix?: string }
  | { naming: 'stamped'; built: string };

/** A set of docs with their own ids. */
export interface IdSpace {
  /** How many docs; ids run firstId..firstId + count - 1. */
  count: number;
  /** 1 for ETD's text docIds, 0 for its vector ids (docs.bin rows). */
  firstId: 0 | 1;
  files: FileSet;
  records: RecordLayout;
  /** Facet rows in id order. */
  facets?: FacetRows;
  /** Values too many to fit a facet row's byte, each in files of its own. */
  docValues?: DocValues[];
}

export type StaticSearch = TextSearch | VectorSearch;

/** Search by words: a dictionary and postings, one prefix per field. */
export interface TextSearch {
  kind: 'text';
  /** The id space it returns: an `idSpaces` key. */
  ids: string;
  files: FileSet;
  text: TextIndex;
  /**
   * Whether posfwd.dir/posfwd.bin exist: each doc's full word list per
   * field, for checking that words sit side by side.
   */
  positions?: boolean;
}

/**
 * Search by meaning: the query is embedded in the browser with `model`,
 * scored against the cells' centroids, and the best cells' rows are
 * scored (from `codes` when there are any), then the best `rerank`
 * re-scored exactly.
 */
export interface VectorSearch {
  kind: 'vector';
  /** The id space its rows' ids are in. */
  ids: string;
  files: FileSet;
  /** Vector size. */
  dim: number;
  cells: {
    count: number;
    /** One vector per cell, 16-bit floats. */
    centroids: string;
    /** u32 cumulative row counts: cell k is rows dir[k] up to dir[k + 1]. */
    dir: string;
    /** Per row, in cell order: a u32 id, then `dim` 16-bit floats. */
    rows: string;
    /** Bytes per row: 4 + dim * 2. */
    rowBytes: number;
  };
  /**
   * The rows again, each dimension's difference from its centroid in
   * `bits`: a u32 id, then dim * bits / 8 bytes. Used only when its meta
   * matches; otherwise rows are scored exactly.
   */
  codes?: Sidecar & { bits: 4 | 8; rowBytes: number };
  /**
   * Facet rows in `cells.rows` order, not id order, so a scan reads a
   * cell's facets with the same range arithmetic as its rows. Used only
   * when its meta matches; otherwise results have no facets.
   */
  facets?: Sidecar & FacetRows;
  model: ModelBlock;
  settings: VectorSettings;
}

/** A search setting the stored vectors' recall depends on. */
export interface VectorSettings {
  /** Cells read per query. */
  nprobe: number;
  /** Best rows re-scored exactly. */
  rerank: number;
  /** Measured recall@10 by nprobe, for whoever tunes it. Informational. */
  recallAt10?: Record<number, number>;
}

/**
 * A file built apart from the rest of its search, with a small JSON meta
 * of its own. The meta's `mustMatch` fields have to equal the search's
 * (n: rows, built: the stamp, dim: vector size) before the file is used;
 * a mismatch means it's from another build, and it's ignored, never an
 * error. Only a stamped file set can mismatch.
 */
export interface Sidecar {
  file: string;
  meta?: string;
  mustMatch: SidecarKey[];
}

export type SidecarKey = 'n' | 'built' | 'dim';

/**
 * The model the stored vectors were made with. A query has to be embedded
 * the same way, or it lands somewhere else in the space.
 */
export interface ModelBlock {
  /** What the model is, e.g. 'intfloat/multilingual-e5-small'. */
  id: string;
  /** Where its files are in the item, ending in '/'. */
  path: string;
  dtype: 'q8' | 'fp16' | 'fp32';
  /** Put before every query, e.g. e5's 'query: '. */
  queryPrefix: string;
  pooling: 'mean' | 'cls';
  normalize: boolean;
  /**
   * The library that embedded the stored vectors. Another build can embed
   * differently. Only a version: the client maps it to a script it pins
   * (see model.ts), so an item's JSON never picks code to run.
   */
  library: { name: string; version: string };
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

/** One fixed-size record per doc, holding what a hit shows. */
export interface RecordLayout {
  /** e.g. stubs.bin. Record n is at (id - firstId) * bytes. */
  file: string;
  /** Bytes per record. */
  bytes: number;
  /** NUL-padded UTF-8 fields at fixed byte offsets, end exclusive. */
  fields: RecordField[];
  /**
   * Fields that can be cut short in the record, held whole per doc in a
   * .dir/.bin pair: the .dir is docId-aligned offsets into the .bin.
   */
  overflow?: { field: string; dir: string; bin: string }[];
  /** The field shown as a hit's snippet: deflated JSON, in a .dir/.bin pair. */
  snippet?: { field: string; dir: string; bin: string };
}

export interface RecordField {
  key: string;
  start: number;
  end: number;
  /**
   * What the field is to a hit, so a client with no config for this item
   * can still show one. Each role is used once at most.
   */
  role?: HitRole;
}

export type HitRole = 'title' | 'creators' | 'date' | 'url';

/** One fixed-size row of facet values per doc (or per vector row). */
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
  /**
   * A code from a list: n means codes[n - 1]. `width` 2 reads bytes byte
   * and byte + 1, little-endian, for lists over 255 (ETD's repositories).
   */
  | {
      key: string;
      kind: 'code';
      byte: number;
      width?: 1 | 2;
      codes: string[];
    }
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

/**
 * One value per doc from a long list (e.g. ETD's 7,648 institutions), in
 * files of its own: an id per doc, the ids' labels, and optionally the
 * names a query can use for them.
 */
export interface DocValues {
  /** Named by a facet's `from: { column }`, like a facet column. */
  key: string;
  /** Each doc's id, little-endian, docId order; 0 means unknown. */
  file: string;
  /** Whether the file is gzipped. */
  gzip: boolean;
  /** Bytes per id. */
  bytes: 2 | 4;
  /** How many ids there are; they run 1..count. */
  count: number;
  /**
   * One line per id, in id order, of tab-separated `columns`. `dir` holds
   * each line's offset (u32), for reading a few lines by Range.
   */
  labels: { file: string; dir: string; columns: string[] };
  /**
   * Names, spellings and acronyms -> ids. `dir` is JSON: each bucket's
   * [offset, length] in `bin`, keyed by a normalized name's first two
   * characters. `bin` lines are `name\tid,id,...`.
   */
  lookup?: {
    dir: string;
    bin: string;
    /**
     * How names are normalized before lookup. The one kind so far:
     * NFKC then NFKD, marks stripped, lowercased, anything but letters,
     * digits, '_' and spaces as a space, spaces collapsed, a leading
     * "the " dropped.
     */
    normalize: 'nfkd-strip-marks-casefold-nonword-to-space-collapse-drop-leading-the';
    /**
     * The query fields that look a value up here first: a known name
     * filters by its ids; anything else searches the text field as usual.
     */
    queryFields: string[];
  };
}

/** Held by the client: how to search and show an item's index. */
export interface StaticItemConfig {
  /** Where the index is published: static-index.json and its files. */
  baseUrl: string;
  /** How to show each search, by the manifest's `searches` key. */
  searches: Record<string, SearchConfig>;
}

export interface SearchConfig {
  /**
   * Prefixed to a doc's 1-based position in its id space to make a hit's
   * identifier ('etd-', 'etdv-'; see identifiers.ts). Searches over
   * different id spaces need different ones.
   */
  identifierPrefix: string;
  /** The record fields a hit is made of, by record field key. */
  hit: { title: string; creators?: string; date?: string; url: string };
  /**
   * A text search's facets read its id space's rows and doc values; a
   * vector search's read its own rows.
   */
  facets: FacetConfig[];
  /** Text searches: overrides the manifest's ranking, part by part. */
  ranking?: Partial<Ranking>;
  /** Vector searches: overrides the owner's settings, for measuring. */
  settings?: Partial<VectorSettings>;
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
  /**
   * A code or packed column's value, or a doc value's id; `unknownAs`
   * names docs without one.
   */
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
    }
  /**
   * A doc value's labels file: its `column` (the first column where that's
   * empty), with `whenShared` added in parentheses ('Heidelberg University (DE)') where ids share a label.
   * Ids sharing both still share a name, and so count as one value.
   */
  | { from: 'labels'; column: string; whenShared?: string };
