import { encodeHalf } from '../../../../src/etd/engine/vector/f16';
import type { IvfMeta } from '../../../../src/etd/engine/vector/vector-files';
import { deflate, directory, rangeResponse } from '../fixture-index';

/**
 * Builds a small vector store in memory, in the on-disk format the vector
 * engine reads (ivf-meta.json, centroids.f16, cell.dir, cells.bin,
 * cell-codes.bin, cell-facets.bin, docs.bin, vsnip.dir/vsnip.bin and their
 * metas), and serves it through a fake fetch that honors Range headers.
 *
 * The encoders follow the live page's decoders (f16buf, cqLUT, readCell,
 * vecWarm), and the real store's metas, so tests over this check the
 * engine reads the formats as the live page does.
 */

export interface FixtureVectorDoc {
  title: string;
  /** Its vector; `dim` numbers. */
  vector: number[];
  /** The cell (cluster) it's filed in. */
  cell: number;
  host?: string;
  date?: string;
  landing?: string;
  lang?: string;
  abstract?: string;
  /** Calendar year for the facet row; unknown when unset. */
  year?: number;
  /** Facet flags by name, as cell-facets-meta's flag_bits names them. */
  flags?: string[];
  /** Repository host for the facet row (its domains table). */
  domain?: string;
}

export interface FixtureVectorOptions {
  /** One vector per cell. */
  centroids: number[][];
  /** Write cell-codes.bin and its meta (default true). */
  withCodes?: boolean;
  /** Write cell-facets.bin and its meta (default true). */
  withFacets?: boolean;
  /** Overrides for cell-codes-meta.json, e.g. another build's stamp. */
  codesMeta?: Record<string, unknown>;
  /** Overrides for cell-facets-meta.json. */
  facetsMeta?: Record<string, unknown>;
  /** Code step per dimension (default 0.02). */
  scale?: number;
  /**
   * Serve archive.org's file list for the item (otherwise it 404s): every
   * file at its real size, changed at `mtime`, but for `sizes`' overrides;
   * `extra` lists files the store doesn't hold, by size.
   */
  fileList?: {
    mtime?: number;
    sizes?: Record<string, number>;
    extra?: Record<string, number>;
  };
  /** Serve a current.json with this many text docs (otherwise it 404s). */
  textDocs?: number;
  /**
   * Write doc-vectors.bin (cells.bin's rows in vector id order) and say so
   * in ivf-meta.json. `ids` overrides each row's id, to fake a stale file.
   */
  docVectors?: { ids?: number[] };
  /** ivf-meta.json's text_v: the word build the vector ids line up with. */
  textV?: string;
}

export const FIXTURE_VECTOR_BASE = 'https://archive.org/download/vec-fixture/';
export const FIXTURE_VECTOR_DATA =
  'https://ia800000.us.archive.org/1/items/vec-fixture/';

export const FIXTURE_BUILT = '2026-10-12 11:31';

export const FIXTURE_FILE_LIST_URL =
  'https://archive.org/metadata/vec-fixture/files';

/** cell-facets-meta.json's flag bits, as in the real store. */
export const VECTOR_FLAG_BITS: Record<string, number> = {
  oai: 1,
  ia: 2,
  wbm: 4,
  hasInstitution: 8,
  archived: 16,
  complete: 32,
  hasTitle: 64,
  hasAbstract: 128,
};

const FIELDS = { title: 40, host: 20, date: 10, landing: 60, lang: 8 };

export interface FixtureVectorStore {
  fetch: typeof fetch;
  requests: { url: string; range?: string }[];
  /** Each doc's vector id (docs.bin row), by its index in the input. */
  dids: number[];
  /** The rows of cells.bin, in order: which input doc each one is. */
  rowDocs: number[];
  /** Requests whose url names this file. */
  requestsTo(name: string): { url: string; range?: string }[];
}

export async function buildFixtureVectorStore(
  docs: FixtureVectorDoc[],
  options: FixtureVectorOptions,
): Promise<FixtureVectorStore> {
  const { centroids } = options;
  const dim = centroids[0].length;
  const ncell = centroids.length;
  const scale = options.scale ?? 0.02;
  // Doc ids are input order; rows are cell order, as the real store's.
  const dids = docs.map((_, i) => i);
  const rowDocs = docs
    .map((doc, i) => ({ doc, i }))
    .sort((a, b) => a.doc.cell - b.doc.cell || a.i - b.i)
    .map(({ i }) => i);

  const cellDir = new Uint32Array(ncell + 1);
  for (const doc of docs) cellDir[doc.cell + 1] += 1;
  for (let c = 0; c < ncell; c += 1) cellDir[c + 1] += cellDir[c];

  const rowbytes = 4 + dim * 2;
  const codeBytes = 4 + dim / 2;
  const cells = new Uint8Array(docs.length * rowbytes);
  const codes = new Uint8Array(docs.length * codeBytes);
  const facets = new Uint8Array(docs.length * 8);
  const domains = [
    ...new Set(docs.map(doc => doc.domain).filter((d): d is string => !!d)),
  ];
  rowDocs.forEach((i, row) => {
    const doc = docs[i];
    const cellView = new DataView(cells.buffer, row * rowbytes, rowbytes);
    cellView.setUint32(0, dids[i], true);
    doc.vector.forEach((v, j) =>
      cellView.setUint16(4 + j * 2, encodeHalf(v), true),
    );

    const codeView = new DataView(codes.buffer, row * codeBytes, codeBytes);
    codeView.setUint32(0, dids[i], true);
    // The residual to the cell's centroid, 4 bits a dimension, unsigned.
    const centroid = centroids[doc.cell].map(c => halfValue(c));
    const code = (j: number) =>
      Math.max(
        0,
        Math.min(15, Math.round((doc.vector[j] - centroid[j]) / scale) + 8),
      );
    for (let j = 0; j < dim / 2; j += 1) {
      codeView.setUint8(4 + j, (code(2 * j) << 4) | code(2 * j + 1));
    }

    const at = row * 8;
    facets[at] = doc.year ? doc.year - 1900 : 0;
    facets[at + 1] = (doc.flags ?? []).reduce(
      (bits, flag) => bits | (VECTOR_FLAG_BITS[flag] ?? 0),
      0,
    );
    const domain = doc.domain ? domains.indexOf(doc.domain) + 1 : 0;
    facets[at + 2] = domain & 0xff;
    facets[at + 3] = domain >> 8;
  });

  const docbytes = Object.values(FIELDS).reduce((a, b) => a + b, 0);
  const docsBin = new Uint8Array(docs.length * docbytes);
  docs.forEach((doc, i) => {
    let at = dids[i] * docbytes;
    for (const [field, width] of Object.entries(FIELDS)) {
      const value = (doc[field as keyof typeof FIELDS] as string) ?? '';
      docsBin.set(new TextEncoder().encode(value).slice(0, width), at);
      at += width;
    }
  });
  const [vsnipDir, vsnipBin] = directory(
    await Promise.all(
      docs.map(async doc =>
        doc.abstract
          ? deflate(JSON.stringify({ a: doc.abstract, l: doc.lang ?? 'en' }))
          : new Uint8Array(0),
      ),
    ),
  );

  const centroidBytes = new Uint8Array(ncell * dim * 2);
  const centroidView = new DataView(centroidBytes.buffer);
  centroids.forEach((centroid, c) =>
    centroid.forEach((v, j) =>
      centroidView.setUint16((c * dim + j) * 2, encodeHalf(v), true),
    ),
  );

  // doc-vectors.bin: cells.bin's rows, in vector id order.
  const docVectors = new Uint8Array(docs.length * rowbytes);
  rowDocs.forEach((i, row) => {
    const at = dids[i] * rowbytes;
    docVectors.set(cells.subarray(row * rowbytes, (row + 1) * rowbytes), at);
    const id = options.docVectors?.ids?.[dids[i]];
    if (id !== undefined) {
      new DataView(docVectors.buffer, at, 4).setUint32(0, id, true);
    }
  });

  const meta: IvfMeta = {
    n: docs.length,
    ncell,
    dim,
    model: 'intfloat/multilingual-e5-small',
    rowbytes,
    docbytes,
    fields: FIELDS,
    vsnip: true,
    codes: options.withCodes !== false,
    built: FIXTURE_BUILT,
  };
  if (options.docVectors) meta.doc_vectors = true;
  if (options.textV) meta.text_v = options.textV;
  const json = (value: unknown) =>
    new TextEncoder().encode(JSON.stringify(value));
  const files = new Map<string, Uint8Array>([
    ['centroids.f16', centroidBytes],
    ['cell.dir', new Uint8Array(cellDir.buffer)],
    ['cells.bin', cells],
    ['docs.bin', docsBin],
    ['vsnip.dir', vsnipDir],
    ['vsnip.bin', vsnipBin],
  ]);
  if (options.docVectors) files.set('doc-vectors.bin', docVectors);
  if (options.withCodes !== false) {
    files.set('cell-codes.bin', codes);
    files.set(
      'cell-codes-meta.json',
      json({
        n: docs.length,
        dim,
        bits: 4,
        rowbytes: codeBytes,
        order: 'cells.bin row order',
        scale: Array.from({ length: dim }, () => scale),
        built: FIXTURE_BUILT,
        ...options.codesMeta,
      }),
    );
  }
  if (options.withFacets !== false) {
    files.set('cell-facets.bin', facets);
    files.set(
      'cell-facets-meta.json',
      json({
        n: docs.length,
        stride: 8,
        order: 'cells.bin row order',
        flag_bits: VECTOR_FLAG_BITS,
        domains,
        ...options.facetsMeta,
      }),
    );
  }

  const requests: FixtureVectorStore['requests'] = [];
  const fakeFetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const range = new Headers(init?.headers).get('Range') ?? undefined;
    requests.push({ url, range });
    if (init?.signal?.aborted) {
      throw new DOMException('The operation was aborted.', 'AbortError');
    }
    if (url === FIXTURE_FILE_LIST_URL && options.fileList) {
      const { mtime = 1791831785, sizes = {}, extra = {} } = options.fileList;
      const result = [
        ...[...files].map(([name, bytes]) => ({
          name,
          size: String(sizes[name] ?? bytes.length),
          mtime: String(mtime),
        })),
        ...Object.entries(extra).map(([name, size]) => ({
          name,
          size: String(size),
          mtime: String(mtime),
        })),
      ];
      return new Response(JSON.stringify({ result }), { status: 200 });
    }
    if (
      url.startsWith(`${FIXTURE_VECTOR_BASE}current.json`) &&
      options.textDocs
    ) {
      return new Response(JSON.stringify({ n_docs: options.textDocs }), {
        status: 200,
      });
    }
    if (url.startsWith(`${FIXTURE_VECTOR_BASE}ivf-meta.json`)) {
      // archive.org/download redirects to a storage server
      const response = new Response(json(meta), { status: 200 });
      Object.defineProperty(response, 'url', {
        value: `${FIXTURE_VECTOR_DATA}ivf-meta.json`,
      });
      return response;
    }
    const name = url.startsWith(FIXTURE_VECTOR_DATA)
      ? url.slice(FIXTURE_VECTOR_DATA.length).replace(/\?.*$/, '')
      : undefined;
    const file = name !== undefined ? files.get(name) : undefined;
    if (!file) return new Response('', { status: 404 });
    if (!range) return new Response(new Uint8Array(file), { status: 200 });
    return rangeResponse(file, range);
  }) as typeof fetch;

  return {
    fetch: fakeFetch,
    requests,
    dids,
    rowDocs,
    requestsTo: name =>
      requests.filter(r => r.url.startsWith(`${FIXTURE_VECTOR_DATA}${name}?`)),
  };
}

/** A number as the f16 the store keeps it as. */
export function halfValue(value: number): number {
  const h = encodeHalf(value);
  const sign = h & 0x8000 ? -1 : 1;
  const exponent = (h & 0x7c00) >> 10;
  const fraction = h & 0x3ff;
  if (exponent === 0) return sign * 2 ** -14 * (fraction / 1024);
  return sign * 2 ** (exponent - 15) * (1 + fraction / 1024);
}
