import { StaticRecords } from '../../static-index/records';
import type { StaticRecord } from '../../static-index/records';
import type { EtdCallOptions, EtdRecord } from '../etd-engine';
import type { EtdIndexFiles } from './index-files';
import { etdTextRecords } from './layouts';

/**
 * Reads display records, through the generic reader
 * (static-index/records.ts) and the text index's layout (layouts.ts):
 * - stubs.bin: one fixed 320-byte record per doc (title, creators, date,
 *   domain, and the landing url cut to 88 bytes);
 * - url.dir/url.bin: the full landing url, for the ~2.5% the stub truncates;
 * - snip.dir/snippets.bin: a deflated JSON abstract, when the doc has one.
 * A page of records is read in two waves of multi-range requests.
 *
 * Ported from etd-search/search.html (page build p110).
 */
export class EtdRecords {
  private constructor(private readonly records: StaticRecords) {}

  static async load(
    files: EtdIndexFiles,
    options?: EtdCallOptions,
  ): Promise<EtdRecords> {
    const space = {
      count: files.meta.n_docs,
      firstId: 1 as const,
      records: etdTextRecords(files.meta),
    };
    return new EtdRecords(await StaticRecords.load(files, space, options));
  }

  /**
   * Reads records for docIds from their stubs alone, in the given order:
   * one wave, no snippet, and the url as the stub has it (cut short for
   * ~2.5%). For describing many matches, not showing them. Ids out of range
   * are skipped.
   */
  async stubs(
    docIds: readonly number[],
    options?: EtdCallOptions,
  ): Promise<EtdRecord[]> {
    return (await this.records.fields(docIds, options)).map(record =>
      etdRecord(record),
    );
  }

  /**
   * Reads records for docIds, in the given order. Ids out of range are
   * skipped.
   */
  async read(
    docIds: readonly number[],
    options?: EtdCallOptions,
  ): Promise<EtdRecord[]> {
    return (await this.records.read(docIds, options)).map(record =>
      etdRecord(record),
    );
  }
}

/** An ETD record from what the generic reader read. */
function etdRecord({ id, fields, snippet }: StaticRecord): EtdRecord {
  const record: EtdRecord = {
    docId: id,
    title: fields.title,
    creators: fields.creators,
    date: fields.date,
    domain: fields.domain,
    url: fields.url,
  };
  if (snippet) record.snippet = snippet;
  return record;
}
