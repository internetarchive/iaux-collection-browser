import { fnv1a, tokenize } from '../../../src/etd/engine/codec';
import { institutionKey } from '../../../src/etd/engine/institutions';

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
  /** Country code (ISO 3166 alpha-2) for the facet rows. */
  country?: string;
  /** Degree level code ('phd', 'masters', ...); unknown when unset. */
  level?: 'phd' | 'masters' | 'bachelors' | 'other';
  /** Facet flags by name, as facets-meta's flag_bits names them. */
  flags?: string[];
  /** Its id in the institution list (1-based into `institutions`). */
  institutionId?: number;
}

/** An entry in the fixture's institution list. */
export interface FixtureInstitution {
  label: string;
  country?: string;
  /** Other names it's looked up by; its label always is. */
  aliases?: string[];
}

export interface FixtureOptions {
  /** Keep at most this many postings per term (impact order), like the real index. */
  keep?: number;
  version?: string;
  posfwd?: boolean;
  withSnippets?: boolean;
  /** Write facets-meta.json and facets.gz.json (default true). */
  withFacets?: boolean;
  /** Write the institution list's files (inst-meta.json, ...) with these. */
  institutions?: FixtureInstitution[];
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
  /**
   * Make the next request whose url contains this substring fail, with HTTP
   * 500 unless given another status (502 is retried; 500 isn't).
   */
  failNext(urlPart: string, status?: number): void;
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
  if (options.institutions) {
    for (const [name, bytes] of await institutionFiles(
      theses,
      options.institutions,
    )) {
      files.set(name, bytes);
    }
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
  const failures: { urlPart: string; status: number }[] = [];

  const fakeFetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const headers = new Headers(init?.headers);
    const range = headers.get('Range') ?? undefined;
    requests.push({ url, range });
    if (init?.signal?.aborted) {
      throw new DOMException('The operation was aborted.', 'AbortError');
    }
    const failAt = failures.findIndex(f => url.includes(f.urlPart));
    if (failAt >= 0) {
      const [{ status }] = failures.splice(failAt, 1);
      return new Response('', { status });
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
    failNext(urlPart: string, status = 500) {
      failures.push({ urlPart, status });
    },
  };
}

export function rangeResponse(file: Uint8Array, header: string): Response {
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

export function directory(payloads: Uint8Array[]): [Uint8Array, Uint8Array] {
  const offsets = new BigUint64Array(payloads.length + 1);
  let size = 0;
  payloads.forEach((payload, i) => {
    offsets[i] = BigInt(size);
    size += payload.length;
  });
  offsets[payloads.length] = BigInt(size);
  return [new Uint8Array(offsets.buffer), concat(payloads)];
}

export function concat(parts: Uint8Array[]): Uint8Array {
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

/** The real index's flag bits (facets-meta.json, 2026-10-26 build). */
const FLAG_BITS: Record<string, number> = {
  oai: 1,
  ia: 2,
  wbm: 4,
  hasInstitution: 8,
  archived: 16,
  complete: 32,
  hasTitle: 64,
  hasAbstract: 128,
  libcat: 256,
  printed: 512,
};

/** The real index's degree level layout: byte 6, bits 2-4. */
const LEVELS = {
  byte: 6,
  shift: 2,
  mask: 7,
  codes: { phd: 1, masters: 2, bachelors: 3, other: 4 },
};

/** facets-meta.json and facets.gz.json, 8-byte rows as the real index has. */
async function facetFiles(
  theses: FixtureThesis[],
): Promise<[Uint8Array, Uint8Array]> {
  const listOf = (values: (string | undefined)[]) => [
    ...new Set(values.filter((v): v is string => !!v)),
  ];
  const langs = listOf(theses.map(t => t.language));
  const countries = listOf(theses.map(t => t.country));
  const stride = 8;
  const rows = new Uint8Array(theses.length * stride);
  theses.forEach((thesis, i) => {
    const at = i * stride;
    const flags = (thesis.flags ?? []).reduce(
      (all, name) => all | (FLAG_BITS[name] ?? 0),
      0,
    );
    rows[at] = yearByte(thesis.date);
    rows[at + 1] = flags & 0xff;
    rows[at + 4] = thesis.language ? langs.indexOf(thesis.language) + 1 : 0;
    rows[at + 5] = thesis.country ? countries.indexOf(thesis.country) + 1 : 0;
    const level = thesis.level ? LEVELS.codes[thesis.level] : 0;
    rows[at + 6] = (flags >> 8) | (level << LEVELS.shift);
  });
  const meta = new TextEncoder().encode(
    JSON.stringify({
      n: theses.length,
      stride,
      year_enc: 2,
      langs,
      countries,
      flag_bits: FLAG_BITS,
      levels: LEVELS,
    }),
  );
  const gzipped = new Blob([rows])
    .stream()
    .pipeThrough(new CompressionStream('gzip'));
  return [meta, new Uint8Array(await new Response(gzipped).arrayBuffer())];
}

/**
 * The institution list's files, as the real index lays them out: ids
 * (u16, gzipped), labels (TSV lines with u32 offsets) and the alias index
 * (lines bucketed by a normalized name's first two characters).
 */
async function institutionFiles(
  theses: FixtureThesis[],
  institutions: FixtureInstitution[],
): Promise<[string, Uint8Array][]> {
  const encoder = new TextEncoder();
  const ids = new Uint16Array(theses.map(t => t.institutionId ?? 0));
  const gzipped = new Uint8Array(
    await new Response(
      new Blob([ids]).stream().pipeThrough(new CompressionStream('gzip')),
    ).arrayBuffer(),
  );

  const lines = institutions.map((inst, i) =>
    encoder.encode(
      `Q${i + 1}\t${inst.label}\t${inst.country ?? ''}\t${
        theses.filter(t => t.institutionId === i + 1).length
      }\n`,
    ),
  );
  const labelsDir = new Uint32Array(lines.length + 1);
  lines.forEach((line, i) => {
    labelsDir[i + 1] = labelsDir[i] + line.length;
  });

  // normalized name -> ids
  const aliases = new Map<string, Set<number>>();
  institutions.forEach((inst, i) => {
    for (const name of [inst.label, ...(inst.aliases ?? [])]) {
      const key = institutionKey(name);
      aliases.set(key, (aliases.get(key) ?? new Set()).add(i + 1));
    }
  });
  const buckets: Record<string, [number, number]> = {};
  const aliasParts: Uint8Array[] = [];
  let aliasSize = 0;
  const byBucket = new Map<string, string[]>();
  for (const [key, keyIds] of [...aliases].sort(([a], [b]) =>
    a < b ? -1 : 1,
  )) {
    const bucket = key.slice(0, 2);
    byBucket.set(bucket, [
      ...(byBucket.get(bucket) ?? []),
      `${key}\t${[...keyIds].join(',')}\n`,
    ]);
  }
  for (const [bucket, bucketLines] of byBucket) {
    const bytes = encoder.encode(bucketLines.join(''));
    buckets[bucket] = [aliasSize, bytes.length];
    aliasParts.push(bytes);
    aliasSize += bytes.length;
  }

  const meta = {
    n: theses.length,
    stride: 2,
    k: institutions.length,
    bin: 'inst.bin',
    gz: 'inst.gz.json',
    labels: {
      bin: 'inst-labels.bin',
      dir: 'inst-labels.dir',
      cols: ['qid', 'label', 'country', 'n_docs'],
    },
    alias: { bin: 'inst-alias.bin', dir: 'inst-alias.json' },
  };
  return [
    ['inst-meta.json', encoder.encode(JSON.stringify(meta))],
    ['inst.bin', new Uint8Array(ids.buffer)],
    ['inst.gz.json', gzipped],
    ['inst-labels.bin', concat(lines)],
    ['inst-labels.dir', new Uint8Array(labelsDir.buffer)],
    [
      'inst-alias.json',
      encoder.encode(
        JSON.stringify({
          norm: 'nfkd-strip-marks-casefold-nonword-to-space-collapse-drop-leading-the',
          buckets,
        }),
      ),
    ],
    ['inst-alias.bin', concat(aliasParts)],
  ];
}

export async function deflate(text: string): Promise<Uint8Array> {
  const stream = new Blob([text])
    .stream()
    .pipeThrough(new CompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}
