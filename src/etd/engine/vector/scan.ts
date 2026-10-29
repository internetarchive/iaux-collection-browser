import type { EtdCallOptions } from '../../etd-engine';
import { decodeHalfs } from './f16';
import type { VectorStoreFiles } from './vector-files';

/**
 * Search by meaning over the vector store (IVF): score the query against
 * every cell's centroid, read the best cells' rows with Range reads, score
 * each row, then re-score the best few exactly.
 *
 * Ported from etd-search/search.html (vecBoot, vectorScanVec, cqLUT,
 * vecRerank, loadVecFacets; vector store built 2026-10-12). The ranking is
 * the same as the live page's; what differs is how bytes arrive:
 * - cells are read `parallel` at a time (the live page: 4), and a big cell
 *   is split into ranges of at most `chunkBytes`, so one dense cell doesn't
 *   hold up the rest;
 * - the facet rows are read alongside the exact re-score, not after the
 *   results are shown.
 */

/** cell-codes-meta.json: rows quantised to 4 (or 8) bits a dimension. */
export interface CellCodesMeta {
  n: number;
  dim: number;
  bits: number;
  /** A u32 doc id, then dim * bits / 8 bytes. */
  rowbytes: number;
  /** Per dimension: a code step's size. */
  scale: number[];
  built?: string;
}

/** cell-facets-meta.json: an 8-byte facet row per cells.bin row. */
export interface CellFacetsMeta {
  n: number;
  stride: number;
  /** Flag name -> bit in the flags byte, as in the text index's facets-meta. */
  flag_bits?: Record<string, number>;
  /** Repository hosts; a row's domain is index + 1, 0 when none. */
  domains?: string[];
  year_enc?: number;
}

/** What a search needs loaded once: ~12.7 MB, read on first use. */
export interface VectorIndex {
  files: VectorStoreFiles;
  /** ncell * dim, as numbers. */
  centroids: Float32Array;
  /** Cumulative row counts: cell k is rows cellDir[k] up to cellDir[k + 1]. */
  cellDir: Uint32Array;
  /** Quantised rows, when the store has them and they match it. */
  codes?: { bits: number; rowbytes: number; scale: Float32Array };
  /** Facet rows' meta, when the store has them and they match it. */
  facets?: CellFacetsMeta;
}

export async function loadVectorIndex(
  files: VectorStoreFiles,
  options?: EtdCallOptions,
): Promise<VectorIndex> {
  const { meta } = files;
  const [centroidBytes, cellDirBytes, codesMeta, facetsMeta] =
    await Promise.all([
      files.arrayBuffer('centroids.f16', options),
      files.arrayBuffer('cell.dir', options),
      meta.codes
        ? files.optionalJson<CellCodesMeta>('cell-codes-meta.json', options)
        : undefined,
      files.optionalJson<CellFacetsMeta>('cell-facets-meta.json', options),
    ]);
  if (centroidBytes.byteLength !== meta.ncell * meta.dim * 2) {
    throw new Error('ETD vector store: centroids.f16 is the wrong size');
  }
  const cellDir = new Uint32Array(cellDirBytes);
  if (cellDir.length !== meta.ncell + 1 || cellDir[meta.ncell] !== meta.n) {
    throw new Error("ETD vector store: cell.dir doesn't match ivf-meta.json");
  }
  return {
    files,
    centroids: decodeHalfs(
      new Uint8Array(centroidBytes),
      0,
      meta.ncell * meta.dim,
    ),
    cellDir,
    codes: checkedCodes(codesMeta, files),
    // The n check guards against a facet file left over from another build.
    facets: facetsMeta?.n === meta.n ? facetsMeta : undefined,
  };
}

/**
 * The quantised rows' meta, if it belongs to this build. Stricter than the
 * facets' check, as on the live page: codes from another build would rank
 * wrongly with nothing downstream to notice.
 */
function checkedCodes(
  codes: CellCodesMeta | undefined,
  files: VectorStoreFiles,
): VectorIndex['codes'] {
  const { meta } = files;
  if (!codes) return undefined;
  if (
    codes.n !== meta.n ||
    codes.built !== meta.built ||
    codes.dim !== meta.dim ||
    !(codes.bits === 4 || codes.bits === 8) ||
    codes.rowbytes !== 4 + ((codes.dim * codes.bits) >> 3) ||
    codes.scale?.length !== codes.dim
  ) {
    return undefined;
  }
  return {
    bits: codes.bits,
    rowbytes: codes.rowbytes,
    scale: Float32Array.from(codes.scale),
  };
}

/** Cells scanned per query, as on the live page (the recall knob). */
export const DEFAULT_NPROBE = 32;

/** Rows re-scored exactly from cells.bin, as on the live page. */
export const DEFAULT_RERANK = 400;

/** Cell reads in flight at once. Browsers allow 6 connections a host. */
export const DEFAULT_PARALLEL = 6;

/** A cell bigger than this is read as several ranges. */
export const DEFAULT_CHUNK_BYTES = 2_000_000;

export interface ScanOptions extends EtdCallOptions {
  nprobe?: number;
  rerank?: number;
  parallel?: number;
  chunkBytes?: number;
  /** Called as cells arrive. */
  onProgress?: (progress: ScanProgress) => void;
  /**
   * Called once, before the last cell, with the best rows so far by their
   * 4-bit scores: a first answer to show while the rest arrives.
   */
  onEarly?: (early: EarlyScan) => void;
  /** Call onEarly after this many cells (default 4)... */
  earlyCells?: number;
  /** ...or this many ms into the scan (default 3000), whichever is first. */
  earlyMs?: number;
}

/** The best rows of the cells read so far, best first. */
export interface EarlyScan {
  /** Vector ids (docs.bin rows, 0-based). */
  dids: Uint32Array;
  /** Their 4-bit (approximate) scores. */
  scores: Float64Array;
  /** Rows scored so far, of which these are the best. */
  candidates: number;
  progress: ScanProgress;
}

/** The first answer and when to give it: after 4 cells or 3 s. */
export const DEFAULT_EARLY_CELLS = 4;

export const DEFAULT_EARLY_MS = 3000;

export interface ScanProgress {
  cellsDone: number;
  cells: number;
  /** Bytes, requests and retried requests so far, for this scan. */
  bytes: number;
  requests: number;
  retries: number;
}

/**
 * Every row of the probed cells, scored. Arrays are by candidate (the rows
 * of the probed cells, best cell first); `order` lists candidates best
 * first.
 */
export interface ScanResult {
  /** Each candidate's doc id in the vector store (docs.bin row, 0-based). */
  dids: Uint32Array;
  /** Each candidate's row in cells.bin. */
  rows: Uint32Array;
  scores: Float64Array;
  /** Candidates by score, best first. */
  order: Uint32Array;
  /** How many of the best had their score re-computed exactly. */
  exact: number;
  /** Facet row bytes by candidate; undefined when the store has none. */
  facets?: { years: Uint8Array; flags: Uint8Array; domains: Uint16Array };
  /** What the facet bytes mean: flag bits, repository names, year encoding. */
  facetMeta?: CellFacetsMeta;
  /** The cells scanned, best first. */
  cells: number[];
  bytes: number;
  requests: number;
  /** Requests asked again after a 5xx or no answer. */
  retries: number;
  /** Milliseconds: reading and scoring cells, then re-scoring and facets. */
  timings: { scan: number; rerank: number };
}

/**
 * The best `nprobe` cells for a query vector, best first, with each one's
 * centroid score.
 */
export function probeCells(
  index: VectorIndex,
  query: Float32Array,
  nprobe: number,
): { cells: number[]; scores: number[] } {
  const { centroids } = index;
  const { ncell, dim } = index.files.meta;
  const scored: [number, number][] = new Array(ncell);
  for (let c = 0; c < ncell; c += 1) {
    let s = 0;
    const base = c * dim;
    for (let j = 0; j < dim; j += 1) s += centroids[base + j] * query[j];
    scored[c] = [c, s];
  }
  scored.sort((a, b) => b[1] - a[1]);
  const picked = scored.slice(0, Math.min(nprobe, ncell));
  return { cells: picked.map(p => p[0]), scores: picked.map(p => p[1]) };
}

/**
 * The query's score table for quantised rows: one entry per (byte, value),
 * so a row is dim / 2 lookups at 4 bits. Codes are stored unsigned (code +
 * 2^(bits-1)). The live page's cqLUT.
 */
export function codesTable(
  codes: NonNullable<VectorIndex['codes']>,
  query: Float32Array,
): Float32Array {
  const bytes = codes.rowbytes - 4;
  const { scale } = codes;
  const table = new Float32Array(bytes * 256);
  for (let j = 0; j < bytes; j += 1) {
    if (codes.bits === 8) {
      const f = query[j] * scale[j];
      for (let b = 0; b < 256; b += 1) table[(j << 8) | b] = f * (b - 128);
    } else {
      const high = query[2 * j] * scale[2 * j];
      const low = query[2 * j + 1] * scale[2 * j + 1];
      for (let b = 0; b < 256; b += 1) {
        table[(j << 8) | b] = high * ((b >> 4) - 8) + low * ((b & 15) - 8);
      }
    }
  }
  return table;
}

/** A range of one probed cell's rows, read as one request. */
interface Chunk {
  /** The cell's place among the probed cells. */
  pick: number;
  /** Global rows [from, to). */
  from: number;
  to: number;
}

export async function scanVectors(
  index: VectorIndex,
  query: Float32Array,
  options: ScanOptions = {},
): Promise<ScanResult> {
  const started = performance.now();
  const { files, cellDir, codes } = index;
  const { dim, rowbytes } = files.meta;
  const before = { ...files.stats };
  const nprobe = options.nprobe ?? DEFAULT_NPROBE;
  const parallel = Math.max(1, options.parallel ?? DEFAULT_PARALLEL);
  const chunkBytes = options.chunkBytes ?? DEFAULT_CHUNK_BYTES;

  const probe = probeCells(index, query, nprobe);
  const { cells } = probe;

  // Each probed cell's rows get a fixed place in the candidate arrays, so
  // cells can arrive in any order and the facet rows land beside them.
  const starts: number[] = [];
  let total = 0;
  for (const cell of cells) {
    starts.push(total);
    total += cellDir[cell + 1] - cellDir[cell];
  }
  const dids = new Uint32Array(total);
  const rows = new Uint32Array(total);
  const scores = new Float64Array(total);
  /** Which candidates have been scored, for a first answer mid-scan. */
  const scored = new Uint8Array(total);

  const scanBytes = codes ? codes.rowbytes : rowbytes;
  const rowsPerChunk = Math.max(1, Math.floor(chunkBytes / scanBytes));
  const chunks: Chunk[] = [];
  const chunksLeft: number[] = [];
  cells.forEach((cell, pick) => {
    const r0 = cellDir[cell];
    const r1 = cellDir[cell + 1];
    chunksLeft.push(0);
    for (let from = r0; from < r1; from += rowsPerChunk) {
      chunks.push({ pick, from, to: Math.min(r1, from + rowsPerChunk) });
      chunksLeft[pick] += 1;
    }
  });

  const table = codes && codesTable(codes, query);
  const exactRow = new Float32Array(dim);
  const scoreChunk = (chunk: Chunk, bytes: Uint8Array) => {
    const cellStart = cellDir[cells[chunk.pick]];
    let at = starts[chunk.pick] + (chunk.from - cellStart);
    const count = Math.min(
      chunk.to - chunk.from,
      (bytes.length / scanBytes) | 0,
    );
    for (let r = 0, o = 0; r < count; r += 1, o += scanBytes, at += 1) {
      dids[at] =
        bytes[o] |
        (bytes[o + 1] << 8) |
        (bytes[o + 2] << 16) |
        (bytes[o + 3] * 0x1000000);
      rows[at] = chunk.from + r;
      if (table) {
        // <q, v> = <q, centroid> + <q, residual>: the centroid's part is the
        // cell's probe score, the same for every row.
        let s = probe.scores[chunk.pick];
        for (let j = 0, n = scanBytes - 4; j < n; j += 1) {
          s += table[(j << 8) | bytes[o + 4 + j]];
        }
        scores[at] = s;
        scored[at] = 1;
      } else {
        decodeHalfs(bytes, o + 4, dim, exactRow);
        let s = 0;
        for (let j = 0; j < dim; j += 1) s += exactRow[j] * query[j];
        scores[at] = s;
        scored[at] = 1;
      }
    }
  };

  let next = 0;
  let cellsDone = 0;
  const progress = () => ({
    cellsDone,
    cells: cells.length,
    bytes: files.stats.bytes - before.bytes,
    requests: files.stats.requests - before.requests,
    retries: files.stats.retries - before.retries,
  });
  // The first answer: once, after enough cells or time, never after the last.
  let earlySent = !options.onEarly;
  const earlyCells = options.earlyCells ?? DEFAULT_EARLY_CELLS;
  const earlyMs = options.earlyMs ?? DEFAULT_EARLY_MS;
  const sendEarly = () => {
    if (earlySent || !cellsDone || cellsDone >= cells.length) return;
    if (cellsDone < earlyCells && performance.now() - started < earlyMs) {
      return;
    }
    earlySent = true;
    options.onEarly!(
      earlyScan(
        dids,
        scores,
        scored,
        options.rerank ?? DEFAULT_RERANK,
        progress(),
      ),
    );
  };
  const fileName = codes ? 'cell-codes.bin' : 'cells.bin';
  await Promise.all(
    Array.from({ length: Math.min(parallel, chunks.length) }, async () => {
      while (next < chunks.length) {
        const chunk = chunks[next];
        next += 1;

        const bytes = await files.range(
          fileName,
          chunk.from * scanBytes,
          (chunk.to - chunk.from) * scanBytes,
          options,
        );
        scoreChunk(chunk, bytes);
        chunksLeft[chunk.pick] -= 1;
        if (!chunksLeft[chunk.pick]) {
          cellsDone += 1;
          options.onProgress?.(progress());
        }
        sendEarly();
      }
    }),
  );
  // Empty cells count as done too.
  cellsDone = cells.length;
  const scanned = performance.now();

  const order = rankOrder(scores);
  const rerank = codes ? Math.min(options.rerank ?? DEFAULT_RERANK, total) : 0;
  const [exact, facets] = await Promise.all([
    rescore(index, query, order, rows, scores, rerank, options),
    readFacets(index, cells, starts, total, options),
  ]);

  return {
    dids,
    rows,
    scores,
    order,
    exact,
    facets,
    facetMeta: facets && index.facets,
    cells,
    bytes: files.stats.bytes - before.bytes,
    requests: files.stats.requests - before.requests,
    retries: files.stats.retries - before.retries,
    timings: {
      scan: scanned - started,
      rerank: performance.now() - scanned,
    },
  };
}

/** The best `count` scored candidates so far, best first. */
function earlyScan(
  dids: Uint32Array,
  scores: Float64Array,
  scored: Uint8Array,
  count: number,
  progress: ScanProgress,
): EarlyScan {
  const done: number[] = [];
  for (let i = 0; i < scored.length; i += 1) if (scored[i]) done.push(i);
  done.sort((a, b) => scores[b] - scores[a] || a - b);
  const best = done.slice(0, count);
  return {
    dids: Uint32Array.from(best, i => dids[i]),
    scores: Float64Array.from(best, i => scores[i]),
    candidates: done.length,
    progress,
  };
}

/** Candidates by score, best first; ties keep their candidate order. */
function rankOrder(scores: Float64Array): Uint32Array {
  const order = Array.from({ length: scores.length }, (_, i) => i);
  order.sort((a, b) => scores[b] - scores[a] || a - b);
  return Uint32Array.from(order);
}

/**
 * Re-scores the best `count` candidates from their exact rows in cells.bin,
 * in one multi-range request, and re-sorts just them: an approximate score
 * from further down must never outrank an exact one it lost to. A failed
 * read keeps the approximate scores: this improves the ranking, it doesn't
 * gate it. Returns how many were re-scored.
 */
async function rescore(
  index: VectorIndex,
  query: Float32Array,
  order: Uint32Array,
  rows: Uint32Array,
  scores: Float64Array,
  count: number,
  options: EtdCallOptions,
): Promise<number> {
  if (!count) return 0;
  const { rowbytes, dim } = index.files.meta;
  const head = Array.from(order.subarray(0, count));
  let buffers: Uint8Array[];
  try {
    buffers = await index.files.ranges(
      'cells.bin',
      head.map(c => [rows[c] * rowbytes, rowbytes] as const),
      count,
      options,
    );
  } catch (err) {
    if (options.signal?.aborted) throw err;
    return 0;
  }
  const vector = new Float32Array(dim);
  let exact = 0;
  head.forEach((candidate, i) => {
    const bytes = buffers[i];
    if (!bytes || bytes.length < rowbytes) return; // keep the approximate score
    decodeHalfs(bytes, 4, dim, vector);
    let s = 0;
    for (let j = 0; j < dim; j += 1) s += vector[j] * query[j];
    scores[candidate] = s;
    exact += 1;
  });
  head.sort((a, b) => scores[b] - scores[a] || a - b);
  order.set(head);
  return exact;
}

/**
 * The probed cells' facet rows (8 bytes a row, in cells.bin row order), in
 * one multi-range request, placed by candidate. Undefined when the store
 * has none or the read fails: results still show, without facets.
 */
async function readFacets(
  index: VectorIndex,
  cells: number[],
  starts: number[],
  total: number,
  options: EtdCallOptions,
): Promise<ScanResult['facets']> {
  const { facets: meta, cellDir, files } = index;
  if (!meta) return undefined;
  const stride = meta.stride || 8;
  const spans = cells.map(
    cell =>
      [
        cellDir[cell] * stride,
        (cellDir[cell + 1] - cellDir[cell]) * stride,
      ] as const,
  );
  const wanted = spans
    .map((span, pick) => ({ span, pick }))
    .filter(({ span }) => span[1] > 0);
  let buffers: Uint8Array[];
  try {
    buffers = await files.ranges(
      'cell-facets.bin',
      wanted.map(w => w.span),
      64,
      options,
    );
  } catch (err) {
    if (options.signal?.aborted) throw err;
    return undefined;
  }
  const years = new Uint8Array(total);
  const flags = new Uint8Array(total);
  const domains = new Uint16Array(total);
  wanted.forEach(({ pick }, i) => {
    const bytes = buffers[i];
    const rowCount = Math.floor(bytes.length / stride);
    for (let r = 0, at = starts[pick]; r < rowCount; r += 1, at += 1) {
      const o = r * stride;
      years[at] = bytes[o];
      flags[at] = bytes[o + 1];
      domains[at] = bytes[o + 2] | (bytes[o + 3] << 8);
    }
  });
  return { years, flags, domains };
}
