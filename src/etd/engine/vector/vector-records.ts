import type { EtdCallOptions } from '../../etd-engine';
import { decodeSnippet, span } from '../records';
import type { VectorStoreFiles } from './vector-files';

/**
 * A vector store doc as shown: from docs.bin (one fixed-width row per doc:
 * title, host, date, landing url, language) and vsnip.dir/vsnip.bin (its
 * abstract, the same deflated JSON as the text index's snippets).
 *
 * Ported from etd-search/search.html (vecWarm, vecDisplayOf, vecSnippetFor).
 */
export interface VectorDoc {
  /** The doc's id in the vector store: its docs.bin row, 0-based. */
  did: number;
  title: string;
  host: string;
  date: string;
  /** Landing url, cut to docs.bin's field width. */
  landing: string;
  /** Language codes, comma-separated, e.g. 'en' or 'de,en'. */
  lang: string;
  snippet?: string;
}

/** How many docs to keep for re-reading: a few searches' worth of pages. */
const RECENT_DOCS = 2000;

/** Rows per request and requests at once, for `rows`: see rangesInParallel. */
const ROWS_PER_REQUEST = 64;
const ROW_REQUESTS_IN_FLIGHT = 6;

export class VectorRecords {
  private constructor(
    private readonly files: VectorStoreFiles,
    /** vsnip.bin size, from vsnip.dir's sentinel; 0 = no abstracts. */
    private readonly snippetsSize: number,
  ) {}

  static async load(
    files: VectorStoreFiles,
    options?: EtdCallOptions,
  ): Promise<VectorRecords> {
    let snippetsSize = 0;
    // Gated on the manifest's flag, so an older store never gets a read at
    // files it doesn't have.
    if (files.meta.vsnip) {
      try {
        const sentinel = await files.range(
          'vsnip.dir',
          files.meta.n * 8,
          8,
          options,
        );
        snippetsSize = Number(
          new DataView(
            sentinel.buffer,
            sentinel.byteOffset,
            sentinel.byteLength,
          ).getBigUint64(0, true),
        );
      } catch (err) {
        if (options?.signal?.aborted) throw err;
      }
    }
    return new VectorRecords(files, snippetsSize);
  }

  /**
   * Docs for vector ids from their docs.bin rows alone, in the given order:
   * one wave, no abstract. For describing many matches, not showing them.
   */
  async rows(
    dids: readonly number[],
    options?: EtdCallOptions,
  ): Promise<VectorDoc[]> {
    const { n, docbytes, fields } = this.files.meta;
    const ids = dids.filter(d => Number.isInteger(d) && d >= 0 && d < n);
    const rows = await this.files.rangesInParallel(
      'docs.bin',
      ids.map(d => [d * docbytes, docbytes] as const),
      ROWS_PER_REQUEST,
      ROW_REQUESTS_IN_FLIGHT,
      options,
    );
    return ids.map((did, i) => ({ did, ...decodeRow(rows[i], fields) }));
  }

  /** Docs for vector ids, in the given order; ids out of range are skipped. */
  async read(
    dids: readonly number[],
    options?: EtdCallOptions,
  ): Promise<VectorDoc[]> {
    const { n } = this.files.meta;
    const ids = dids.filter(d => Number.isInteger(d) && d >= 0 && d < n);
    const missing = [...new Set(ids.filter(d => !this.recent.has(d)))];
    if (missing.length) {
      const docs = await this.readUncached(missing, options);
      // Kept briefly: a first answer's docs are mostly the final one's too.
      if (this.recent.size + docs.length > RECENT_DOCS) this.recent.clear();
      for (const doc of docs) this.recent.set(doc.did, doc);
    }
    return ids
      .map(did => this.recent.get(did))
      .filter((doc): doc is VectorDoc => doc !== undefined);
  }

  /** Docs read lately, by vector id. */
  private readonly recent = new Map<number, VectorDoc>();

  private async readUncached(
    ids: readonly number[],
    options?: EtdCallOptions,
  ): Promise<VectorDoc[]> {
    const { docbytes, fields } = this.files.meta;
    // Wave 1: rows and abstract directory entries. Wave 2: the abstracts.
    const [rows, dirs] = await Promise.all([
      this.files.ranges(
        'docs.bin',
        ids.map(d => [d * docbytes, docbytes] as const),
        256,
        options,
      ),
      this.snippetsSize
        ? this.files.ranges(
            'vsnip.dir',
            ids.map(d => [d * 8, 16] as const),
            512,
            options,
          )
        : Promise.resolve([] as Uint8Array[]),
    ]);
    const spans = ids.map((_, i) => {
      const s = span(dirs[i]);
      return s && s[0] + s[1] <= this.snippetsSize ? s : undefined;
    });
    const wanted = spans.filter((s): s is [number, number] => s !== undefined);
    const compressed = await this.files.ranges(
      'vsnip.bin',
      wanted,
      64,
      options,
    );
    let next = 0;
    return Promise.all(
      ids.map(async (did, i) => {
        const doc: VectorDoc = { did, ...decodeRow(rows[i], fields) };
        if (spans[i]) {
          const bytes = compressed[next];
          next += 1;
          const snippet =
            bytes?.length === spans[i]![1]
              ? await decodeSnippet(bytes)
              : undefined;
          if (snippet) doc.snippet = snippet;
        }
        return doc;
      }),
    );
  }
}

const decoder = new TextDecoder();

/** A docs.bin row's NUL-padded UTF-8 fields. */
export function decodeRow(
  row: Uint8Array,
  widths: VectorStoreFiles['meta']['fields'],
): Omit<VectorDoc, 'did' | 'snippet'> {
  let at = 0;
  const take = (width: number) => {
    const field = row.subarray(at, at + width);
    at += width;
    const nul = field.indexOf(0);
    // A field cut mid-character ends in U+FFFD: drop it, as the live page does.
    return decoder
      .decode(nul < 0 ? field : field.subarray(0, nul))
      .replace(/�+$/, '');
  };
  return {
    title: take(widths.title),
    host: take(widths.host),
    date: take(widths.date),
    landing: take(widths.landing),
    lang: take(widths.lang),
  };
}
