import { StaticRecords } from '../../../static-index/records';
import type { StaticRecord } from '../../../static-index/records';
import type { EtdCallOptions } from '../../etd-engine';
import { etdVectorRecords } from '../layouts';
import type { VectorStoreFiles } from './vector-files';

/**
 * A vector store doc as shown: from docs.bin (one fixed-width row per doc:
 * title, host, date, landing url, language) and vsnip.dir/vsnip.bin (its
 * abstract, the same deflated JSON as the text index's snippets), read
 * through the generic reader (static-index/records.ts).
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

export class VectorRecords {
  private constructor(
    private readonly files: VectorStoreFiles,
    private readonly records: StaticRecords,
  ) {}

  static async load(
    files: VectorStoreFiles,
    options?: EtdCallOptions,
  ): Promise<VectorRecords> {
    const space = {
      count: files.meta.n,
      firstId: 0 as const,
      // Its snippet pair only when the manifest's flag says so, so an older
      // store never gets a read at files it doesn't have.
      records: etdVectorRecords(files.meta),
    };
    return new VectorRecords(
      files,
      await StaticRecords.load(files, space, options),
    );
  }

  /**
   * Docs for vector ids from their docs.bin rows alone, in the given order:
   * one wave, no abstract. For describing many matches, not showing them.
   */
  async rows(
    dids: readonly number[],
    options?: EtdCallOptions,
  ): Promise<VectorDoc[]> {
    return (await this.records.fields(dids, options)).map(record =>
      vectorDoc(record),
    );
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
    return (await this.records.read(ids, options)).map(record =>
      vectorDoc(record),
    );
  }
}

/** A vector store doc from what the generic reader read. */
function vectorDoc({ id, fields, snippet }: StaticRecord): VectorDoc {
  const doc: VectorDoc = {
    did: id,
    title: fields.title,
    host: fields.host,
    date: fields.date,
    landing: fields.landing,
    lang: fields.lang,
  };
  if (snippet) doc.snippet = snippet;
  return doc;
}
