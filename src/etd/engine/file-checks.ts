import { itemIdFromUrl } from '../../static-index/file-list';
import type { SizeReport, SizeRule } from '../../static-index/size-rules';

/**
 * The ETD item's size rules: what each fixed-width file's size must be,
 * given current.json and ivf-meta.json. See static-index/size-rules.ts.
 *
 * The text index's files carry its version in their names, so they can't
 * drift apart; their rule is a check that current.json and the files agree.
 * The vector store's files have fixed names and are republished on their
 * own, so they can.
 */

export const ETD_ITEM_ID = 'etd-search';

/** The demo's dev and preview servers proxy the ETD item here. */
const ETD_PROXY_PATH = /\/etd-index\/?$/;

/** The archive.org item a base url reads, for its file list. */
export function etdItemId(baseUrl: string): string | undefined {
  const id = itemIdFromUrl(baseUrl);
  if (id) return id;
  try {
    const { pathname } = new URL(baseUrl, 'http://localhost/');
    return ETD_PROXY_PATH.test(pathname) ? ETD_ITEM_ID : undefined;
  } catch {
    return undefined;
  }
}

export const WORD_SEARCH = 'word search';
export const MEANING_SEARCH = 'search by meaning';
/**
 * vrow2txt.bin / txt2vrow.bin: vector ids to text doc ids and back; and
 * doc-vectors.bin, read to re-rank word results by meaning.
 */
export const MEANING_WORDS_MAP = 'meaning-to-words map';

/** The current.json fields the rules use (EtdIndexMeta's). */
interface TextCounts {
  v?: string;
  n_docs: number;
  stub_bytes: number;
}

/** The ivf-meta.json fields the rules use (IvfMeta's). */
interface VectorCounts {
  n: number;
  ncell: number;
  dim: number;
  rowbytes: number;
  docbytes: number;
  vsnip?: boolean;
  codes?: boolean;
  code_bits?: number;
  doc_vectors?: boolean;
}

export function textSizeRules(meta: TextCounts): SizeRule[] {
  return [
    {
      file: meta.v ? `stubs.bin.${meta.v}` : 'stubs.bin',
      layer: WORD_SEARCH,
      rows: meta.n_docs,
      rowsOf: 'records',
      rowBytes: meta.stub_bytes,
    },
  ];
}

/**
 * The vector store's rules. `textDocs` (current.json's n_docs) adds
 * txt2vrow.bin's, which has one entry per text doc.
 */
export function vectorSizeRules(
  meta: VectorCounts,
  textDocs?: number,
): SizeRule[] {
  const vectors = (file: string, rowBytes: number, extraBytes?: number) => ({
    file,
    layer: MEANING_SEARCH,
    rows: meta.n,
    rowsOf: 'vectors',
    rowBytes,
    extraBytes,
  });
  const rules: SizeRule[] = [
    {
      file: 'centroids.f16',
      layer: MEANING_SEARCH,
      rows: meta.ncell,
      rowsOf: 'clusters',
      rowBytes: meta.dim * 2,
    },
    {
      file: 'cell.dir',
      layer: MEANING_SEARCH,
      rows: meta.ncell + 1,
      rowsOf: 'cluster offsets',
      rowBytes: 4,
    },
    vectors('cells.bin', meta.rowbytes),
    vectors('docs.bin', meta.docbytes),
    vectors('cell-facets.bin', 8),
  ];
  if (meta.codes) {
    rules.push(
      vectors('cell-codes.bin', 4 + (meta.dim * (meta.code_bits ?? 4)) / 8),
    );
  }
  // n + 1 offsets: the last is vsnip.bin's size.
  if (meta.vsnip) rules.push(vectors('vsnip.dir', 8, 8));
  rules.push({ ...vectors('vrow2txt.bin', 4), layer: MEANING_WORDS_MAP });
  // Only re-ranking word results reads it, so it can't stop meaning search.
  if (meta.doc_vectors) {
    rules.push({
      ...vectors('doc-vectors.bin', meta.rowbytes),
      layer: MEANING_WORDS_MAP,
    });
  }
  if (textDocs) {
    rules.push({
      file: 'txt2vrow.bin',
      layer: MEANING_WORDS_MAP,
      rows: textDocs,
      rowsOf: 'records',
      rowBytes: 4,
    });
  }
  return rules;
}

/** What a file check found, for the demo's report. */
export interface EtdFileCheck {
  /** The item whose file list was read. */
  itemId?: string;
  /** Undefined when the list couldn't be read: nothing was checked. */
  sizes?: SizeReport;
}
