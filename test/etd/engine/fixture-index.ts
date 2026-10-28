import { fnv1a, tokenize } from '../../../src/etd/engine/codec';

/**
 * Builds a small ETD index in memory, in the on-disk format the engine
 * reads, and serves it through a fake fetch that honors Range headers.
 *
 * The encoder here is written from the engine's decoders, so tests over it
 * prove the engine's parts agree with each other. Agreement with the real
 * indexer is what the live smoke test checks.
 */

export interface FixtureThesis {
  title: string;
  creators?: string;
  abstract?: string;
  institution?: string;
  date?: string;
  domain?: string;
  url?: string;
  /** The deflated snippet's abstract; defaults to `abstract`. */
  snippet?: string;
  /** Language code (ISO 639-1) for the facet rows; unknown when unset. */
  language?: string;
}

export interface FixtureOptions {
  /** Keep at most this many postings per term (impact order), like the real index. */
  keep?: number;
  version?: string;
  posfwd?: boolean;
  withSnippets?: boolean;
  /** Write facets-meta.json and facets.gz.json (default true). */
  withFacets?: boolean;
}

export const FIXTURE_BASE = 'https://archive.org/download/etd-fixture/';
export const FIXTURE_DATA =
  'https://ia800000.us.archive.org/1/items/etd-fixture/';

const FIELDS: [prefix: string, key: keyof FixtureThesis][] = [
  ['t:', 'title'],
  ['c:', 'creators'],
  ['a:', 'abstract'],
  ['i:', 'institution'],
];

export interface FixtureIndex {
  fetch: typeof fetch;
  /** Every url fetched, in order. */
  requests: { url: string; range?: string }[];
  /** Make the next request whose url contains this substring fail with HTTP 500. */
  failNext(urlPart: string): void;
}

export async function buildFixtureIndex(
  theses: FixtureThesis[],
  options: FixtureOptions = {},
): Promise<FixtureIndex> {
  const version = options.version ?? 'test1';
  const keep = options.keep ?? Number.POSITIVE_INFINITY;

  // term -> docId -> positions (field-local)
  const postingsByTerm = new Map<string, Map<number, number[]>>();
  theses.forEach((thesis, i) => {
    const docId = i + 1;
    for (const [prefix, key] of FIELDS) {
      tokenize(String(thesis[key] ?? '')).forEach((token, position) => {
        const term = prefix + token;
        const docs = postingsByTerm.get(term) ?? new Map<number, number[]>();
        const positions = docs.get(docId) ?? [];
        positions.push(position);
        docs.set(docId, positions);
        postingsByTerm.set(term, docs);
      });
    }
  });

  // postings.bin: per term, impact-ordered groups, truncated at `keep`
  const postingsParts: Uint8Array[] = [];
  let postingsSize = 0;
  const entries = new Map<
    string,
    { offset: number; length: number; df: number }
  >();
  for (const [term, docs] of postingsByTerm) {
    const all = [...docs.entries()].map(([docId, positions]) => ({
      docId,
      positions,
      // impact: a byte, higher for more occurrences
      impact: Math.min(255, positions.length * 10),
    }));
    all.sort((a, b) => b.impact - a.impact || a.docId - b.docId);
    const kept = all.slice(0, keep);

    const bytes: number[] = [];
    writeVarint(bytes, all.length);
    writeVarint(bytes, kept.length);
    let g = 0;
    while (g < kept.length) {
      const { impact } = kept[g];
      const group = [];
      while (g < kept.length && kept[g].impact === impact) {
        group.push(kept[g]);
        g += 1;
      }
      group.sort((a, b) => a.docId - b.docId);
      bytes.push(impact);
      writeVarint(bytes, group.length);
      let previous = 0;
      for (const posting of group) {
        writeVarint(bytes, posting.docId - previous);
        previous = posting.docId;
        writeVarint(bytes, posting.positions.length);
        let previousPosition = 0;
        for (const position of posting.positions) {
          writeVarint(bytes, position - previousPosition);
          previousPosition = position;
        }
      }
    }
    entries.set(term, {
      offset: postingsSize,
      length: bytes.length,
      df: all.length,
    });
    postingsParts.push(Uint8Array.from(bytes));
    postingsSize += bytes.length;
  }

  // dict.dir + dict.bin: entries bucketed by fnv1a & 0xffff
  const buckets = new Map<number, number[]>();
  const encoder = new TextEncoder();
  for (const [term, entry] of entries) {
    const bucket = fnv1a(term) & 0xffff;
    const bytes = buckets.get(bucket) ?? [];
    const termBytes = encoder.encode(term);
    writeVarint(bytes, termBytes.length);
    bytes.push(...termBytes);
    writeVarint(bytes, entry.offset);
    writeVarint(bytes, entry.length);
    writeVarint(bytes, entry.df);
    buckets.set(bucket, bytes);
  }
  const dictDir = new BigUint64Array(0x10001);
  const dictBytes: number[] = [];
  for (let b = 0; b < 0x10000; b += 1) {
    dictDir[b] = BigInt(dictBytes.length);
    dictBytes.push(...(buckets.get(b) ?? []));
  }
  dictDir[0x10000] = BigInt(dictBytes.length);

  // stubs.bin: 320-byte records
  const stubs = new Uint8Array(theses.length * 320);
  theses.forEach((thesis, i) => {
    const at = i * 320;
    putField(stubs, at, 0, 150, thesis.title);
    putField(stubs, at, 150, 198, thesis.creators ?? '');
    putField(stubs, at, 198, 208, thesis.date ?? '');
    putField(stubs, at, 208, 232, thesis.domain ?? '');
    putField(stubs, at, 232, 320, thesis.url ?? '');
  });

  // url.dir + url.bin, snip.dir + snippets.bin: n+1 u64 offsets each
  const urlPayloads = theses.map(t => encoder.encode(t.url ?? ''));
  const snippetPayloads = await Promise.all(
    theses.map(async t => {
      const text = t.snippet ?? t.abstract;
      return text
        ? deflate(JSON.stringify({ a: text, l: 'eng' }))
        : new Uint8Array();
    }),
  );
  const [urlDir, urlBin] = directory(urlPayloads);
  const [snipDir, snipBin] = directory(snippetPayloads);

  // posfwd.dir + posfwd.bin: each field's tokens, space-joined; creators as
  // one segment per author, ' ; '-separated, as the real indexer writes them.
  const posfwdPayloads = await Promise.all(
    theses.map(async t => {
      const text: Record<string, string> = {};
      const title = tokenize(t.title).join(' ');
      if (title) text.t = title;
      const creators = (t.creators ?? '')
        .split(';')
        .map(name => tokenize(name).join(' '))
        .filter(Boolean)
        .join(' ; ');
      if (creators) text.c = creators;
      const abstract = tokenize(t.abstract ?? '').join(' ');
      if (abstract) text.a = abstract;
      const institution = tokenize(t.institution ?? '').join(' ');
      if (institution) text.i = institution;
      return Object.keys(text).length
        ? deflate(JSON.stringify(text))
        : new Uint8Array();
    }),
  );
  const [posfwdDir, posfwdBin] = directory(posfwdPayloads);

  const meta = {
    v: version,
    n_docs: theses.length,
    stub_bytes: 320,
    positional: true,
    posfwd: options.posfwd ?? true,
    prefixed_fields: { t: 'title', c: 'creators', a: 'abstract' },
  };

  const files = new Map<string, Uint8Array>([
    ['dict.dir', new Uint8Array(dictDir.buffer)],
    ['dict.bin', Uint8Array.from(dictBytes)],
    ['postings.bin', concat(postingsParts)],
    ['stubs.bin', stubs],
    ['url.dir', urlDir],
    ['url.bin', urlBin],
  ]);
  if (options.withFacets !== false) {
    const [facetMeta, facetRows] = await facetFiles(theses);
    files.set('facets-meta.json', facetMeta);
    files.set('facets.gz.json', facetRows);
  }
  if (meta.posfwd) {
    files.set('posfwd.dir', posfwdDir);
    files.set('posfwd.bin', posfwdBin);
  }
  if (options.withSnippets !== false) {
    files.set('snip.dir', snipDir);
    files.set('snippets.bin', snipBin);
  }

  const requests: FixtureIndex['requests'] = [];
  const failures: string[] = [];

  const fakeFetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const headers = new Headers(init?.headers);
    const range = headers.get('Range') ?? undefined;
    requests.push({ url, range });
    if (init?.signal?.aborted) {
      throw new DOMException('The operation was aborted.', 'AbortError');
    }
    const failAt = failures.findIndex(part => url.includes(part));
    if (failAt >= 0) {
      failures.splice(failAt, 1);
      return new Response('', { status: 500 });
    }

    if (url.startsWith(`${FIXTURE_BASE}current.json`)) {
      // archive.org/download redirects to a storage server
      const response = new Response(JSON.stringify(meta), { status: 200 });
      Object.defineProperty(response, 'url', {
        value: `${FIXTURE_DATA}current.json`,
      });
      return response;
    }
    const match = url.match(/^(.*?)\.([^.?]+)\?v=/);
    const name = match?.[1].startsWith(FIXTURE_DATA)
      ? match[1].slice(FIXTURE_DATA.length)
      : undefined;
    const file =
      name !== undefined && match![2] === version ? files.get(name) : undefined;
    if (!file) return new Response('', { status: 404 });
    if (!range) return new Response(new Uint8Array(file), { status: 200 });
    return rangeResponse(file, range);
  }) as typeof fetch;

  return {
    fetch: fakeFetch,
    requests,
    failNext(urlPart: string) {
      failures.push(urlPart);
    },
  };
}

function rangeResponse(file: Uint8Array, header: string): Response {
  const spans = header
    .replace(/^bytes=/, '')
    .split(',')
    .map(part => part.trim().split('-').map(Number) as [number, number]);
  if (spans.length === 1) {
    const [start, end] = spans[0];
    return new Response(file.slice(start, end + 1), {
      status: 206,
      headers: { 'Content-Range': `bytes ${start}-${end}/${file.length}` },
    });
  }
  const boundary = 'FIXTUREBOUNDARY';
  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];
  for (const [start, end] of spans) {
    parts.push(
      encoder.encode(
        `\r\n--${boundary}\r\nContent-Type: application/octet-stream\r\nContent-Range: bytes ${start}-${end}/${file.length}\r\n\r\n`,
      ),
      file.slice(start, end + 1),
    );
  }
  parts.push(encoder.encode(`\r\n--${boundary}--\r\n`));
  return new Response(new Uint8Array(concat(parts)), {
    status: 206,
    headers: {
      'Content-Type': `multipart/byteranges; boundary=${boundary}`,
    },
  });
}

export function writeVarint(out: number[], value: number): void {
  let v = value;
  while (v >= 128) {
    out.push(v % 128 | 0x80);
    v = Math.floor(v / 128);
  }
  out.push(v);
}

function putField(
  stubs: Uint8Array,
  at: number,
  start: number,
  end: number,
  text: string,
): void {
  const bytes = new TextEncoder().encode(text).slice(0, end - start);
  stubs.set(bytes, at + start);
}

function directory(payloads: Uint8Array[]): [Uint8Array, Uint8Array] {
  const offsets = new BigUint64Array(payloads.length + 1);
  let size = 0;
  payloads.forEach((payload, i) => {
    offsets[i] = BigInt(size);
    size += payload.length;
  });
  offsets[payloads.length] = BigInt(size);
  return [new Uint8Array(offsets.buffer), concat(payloads)];
}

function concat(parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const part of parts) {
    out.set(part, at);
    at += part.length;
  }
  return out;
}

/** The year byte in year encoding 2: decades before 1900, years after. */
function yearByte(date: string | undefined): number {
  const year = Number.parseInt((date ?? '').slice(0, 4), 10);
  if (Number.isNaN(year) || year < 1700) return 0;
  if (year < 1900) return 1 + Math.floor((year - 1700) / 10);
  return Math.min(255, 21 + (year - 1900));
}

/** facets-meta.json and facets.gz.json, 8-byte rows as the real index has. */
async function facetFiles(
  theses: FixtureThesis[],
): Promise<[Uint8Array, Uint8Array]> {
  const langs = [
    ...new Set(theses.map(t => t.language).filter((l): l is string => !!l)),
  ];
  const stride = 8;
  const rows = new Uint8Array(theses.length * stride);
  theses.forEach((thesis, i) => {
    rows[i * stride] = yearByte(thesis.date);
    rows[i * stride + 4] = thesis.language
      ? langs.indexOf(thesis.language) + 1
      : 0;
  });
  const meta = new TextEncoder().encode(
    JSON.stringify({ n: theses.length, stride, year_enc: 2, langs }),
  );
  const gzipped = new Blob([rows])
    .stream()
    .pipeThrough(new CompressionStream('gzip'));
  return [meta, new Uint8Array(await new Response(gzipped).arrayBuffer())];
}

async function deflate(text: string): Promise<Uint8Array> {
  const stream = new Blob([text])
    .stream()
    .pipeThrough(new CompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}
