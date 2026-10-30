import type {
  HitRole,
  RecordField,
  RecordLayout,
} from '../../static-index/manifest';
import type { EtdIndexMeta } from './index-files';
import type { IvfMeta } from './vector/vector-files';

/**
 * ETD's record layouts, as static-index layouts: the engines read records
 * through them, and etdItemManifest publishes them, so the two can't
 * disagree.
 */

/**
 * stubs.bin's 320-byte layout. current.json gives only its size (checked
 * by checkIndexFormat), so the offsets are written out here.
 */
export const ETD_STUB_FIELDS: RecordField[] = [
  { key: 'title', start: 0, end: 150, role: 'title' },
  { key: 'creators', start: 150, end: 198, role: 'creators' },
  { key: 'date', start: 198, end: 208, role: 'date' },
  { key: 'domain', start: 208, end: 232 },
  // cut to 88 bytes; url.dir/url.bin hold it whole
  { key: 'url', start: 232, end: 320, role: 'url' },
];

/** The text index's records: stubs, the whole url, the abstract. */
export function etdTextRecords(meta: EtdIndexMeta): RecordLayout {
  return {
    file: 'stubs.bin',
    bytes: meta.stub_bytes,
    fields: ETD_STUB_FIELDS,
    overflow: [{ field: 'url', dir: 'url.dir', bin: 'url.bin' }],
    snippet: { field: 'abstract', dir: 'snip.dir', bin: 'snippets.bin' },
  };
}

/** What docs.bin's fields are to a hit. */
const VECTOR_ROLES: Partial<Record<string, HitRole>> = {
  title: 'title',
  date: 'date',
  landing: 'url',
};

/**
 * The vector store's records: docs.bin's NUL-padded fields, in ivf-meta's
 * order and widths, and the abstract when the store has vsnip.
 */
export function etdVectorRecords(ivf: IvfMeta): RecordLayout {
  let start = 0;
  const fields = Object.entries(ivf.fields).map(([key, width]) => {
    const field: RecordField = { key, start, end: start + width };
    const role = VECTOR_ROLES[key];
    if (role) field.role = role;
    start += width;
    return field;
  });
  return {
    file: 'docs.bin',
    bytes: ivf.docbytes,
    fields,
    snippet: ivf.vsnip
      ? { field: 'abstract', dir: 'vsnip.dir', bin: 'vsnip.bin' }
      : undefined,
  };
}
