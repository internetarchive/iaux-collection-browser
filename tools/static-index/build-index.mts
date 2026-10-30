/**
 * Proof-of-concept build: Democracy's Library records -> an index in ETD's
 * on-disk layout, so today's ETD engine can search it unchanged.
 *
 * Encoding follows collection-browser's test/etd/engine/fixture-index.ts
 * (itself written from the engine's decoders), with real BM25 impacts and
 * flat arrays so 1.2M records fit in memory. Throwaway: the real builder
 * writes the v2 manifest instead.
 *
 * Usage: node --max-old-space-size=24000 tools/static-index/build-index.mts <records.jsonl> <out_dir> [limit]
 */
import { createReadStream, mkdirSync, writeFileSync } from 'node:fs';

import { deflateSync, gzipSync } from 'node:zlib';
import { fnv1a, tokenize } from '../../src/etd/engine/codec.ts';

/** Copied from collection-browser src/etd/engine/institutions.ts (that file can't be type-stripped). */
function institutionKey(name: string): string {
  let key = name
    .normalize('NFKC')
    .normalize('NFKD')
    .replace(/\p{M}+/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}_\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (key.startsWith('the ')) key = key.slice(4);
  return key;
}

const [inPath, outDir, limitArg] = process.argv.slice(2);
const LIMIT = limitArg ? Number(limitArg) : Infinity;
const VERSION = process.env.DL_VERSION ?? '20261029-dl1';
const KEEP = 50000; // postings kept per term, by impact
const K1 = 1.2;
const B = 0.75;
const MAX_ABSTRACT_CHARS = 2000;
const MAX_SNIPPET_CHARS = 600;

// The source collections in Democracy's Library's query, as an
// institution list (the ETD engine's one long-list facet).
const SOURCES: [id: string, label: string, country?: string][] = [
  ['fedlink', 'FEDLINK (US federal libraries)', 'US'],
  ['aruba', 'Aruba', 'AW'],
  ['nasa', 'NASA', 'US'],
  ['USGovernmentDocuments', 'US Government Documents', 'US'],
  ['sim_microfilm', 'Microfilm: government documents'],
  ['governmentpublications', 'Government Publications'],
  ['instituteofgovernmentalstudieslibrary', 'Institute of Governmental Studies Library', 'US'],
  ['ualbertaeducationguides', 'University of Alberta education guides', 'CA'],
  ['albertagovernmentpublications', 'Alberta Government Publications', 'CA'],
  ['lacbac', 'Library and Archives Canada', 'CA'],
  ['library_and_archives_canada', 'Library and Archives Canada', 'CA'],
  ['us_census', 'US Census Bureau', 'US'],
];
const SOURCE_IDS = new Map(SOURCES.map(([id], i) => [id, i + 1]));

// Folds the language values seen in the export to one code each.
const LANGUAGE_FOLD: Record<string, string> = {
  eng: 'en', english: 'en', en: 'en', en_us: 'en', 'english-handwritten': 'en',
  dut: 'nl', dutch: 'nl', nld: 'nl', nl: 'nl',
  pap: 'pap', papiamento: 'pap',
  fre: 'fr', fra: 'fr', french: 'fr', fr: 'fr',
  spa: 'es', spanish: 'es', es: 'es',
  ger: 'de', deu: 'de', german: 'de', de: 'de',
  jpn: 'ja', japanese: 'ja', rus: 'ru', russian: 'ru',
  chi: 'zh', zho: 'zh', chinese: 'zh', por: 'pt', portuguese: 'pt',
  ita: 'it', italian: 'it', kor: 'ko', korean: 'ko', ara: 'ar', arabic: 'ar',
};

const FLAG_BITS: Record<string, number> = {
  oai: 1, ia: 2, wbm: 4, hasInstitution: 8, archived: 16, complete: 32,
  hasTitle: 64, hasAbstract: 128, libcat: 256, printed: 512,
};
const LEVELS = { byte: 6, shift: 2, mask: 7, codes: { phd: 1, masters: 2, bachelors: 3, other: 4 } };

const encoder = new TextEncoder();
const list = (v: unknown): string[] =>
  v === undefined || v === null || v === '' ? [] : (Array.isArray(v) ? v : [v]).map(String);
const plain = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

interface Doc {
  title: string;
  creators: string;
  abstract: string;
  institution: string;
  snippet: string;
  date: string;
  domain: string;
  url: string;
  language?: string;
  country?: string;
  institutionId: number;
  flags: number;
}

function toDoc(r: Record<string, unknown>): Doc | undefined {
  if (r.mediatype === 'collection') return undefined;
  const id = String(r.identifier);
  const description = plain(list(r.description).join(' '));
  const subjects = list(r.subject).join('; ');
  const collections = list(r.collection);
  const sourceId = SOURCES.find(([sid]) => collections.includes(sid))?.[0];
  const source = sourceId ? SOURCES[SOURCE_IDS.get(sourceId)! - 1] : undefined;
  const rawLanguage = list(r.language)[0]?.toLowerCase().trim();
  const title = list(r.title)[0] ?? id;
  let flags = FLAG_BITS.ia;
  if (title) flags |= FLAG_BITS.hasTitle;
  if (description) flags |= FLAG_BITS.hasAbstract;
  if (source) flags |= FLAG_BITS.hasInstitution;
  return {
    title,
    creators: list(r.creator).join('; '),
    abstract: `${description} ${subjects}`.slice(0, MAX_ABSTRACT_CHARS),
    institution: source?.[1] ?? '',
    snippet: description.slice(0, MAX_SNIPPET_CHARS),
    date: (list(r.date)[0] ?? '').slice(0, 10),
    domain: String(r.mediatype ?? ''),
    url: `https://archive.org/details/${id}`,
    language: rawLanguage ? LANGUAGE_FOLD[rawLanguage] : undefined,
    country: source?.[2],
    institutionId: sourceId ? SOURCE_IDS.get(sourceId)! : 0,
    flags,
  };
}

// --- read -----------------------------------------------------------------
const started = Date.now();
const log = (msg: string) => console.log(`[${((Date.now() - started) / 1000).toFixed(0)}s] ${msg}`);

const FIELDS: [prefix: string, key: keyof Doc][] = [
  ['t:', 'title'], ['c:', 'creators'], ['a:', 'abstract'], ['i:', 'institution'],
];
// term -> flat [docId, position, docId, position, ...], docIds ascending
const occurrences = new Map<string, number[]>();
const fieldLengths = FIELDS.map(() => [] as number[]);
const docs: Doc[] = [];

// Split on '\n' only: readline also breaks on U+2028/U+2029, which some
// descriptions carry inside JSON strings.
async function* jsonLines(path: string) {
  let rest = '';
  for await (const chunk of createReadStream(path, 'utf8')) {
    const parts = (rest + chunk).split('\n');
    rest = parts.pop() ?? '';
    yield* parts;
  }
  if (rest) yield rest;
}
for await (const line of jsonLines(inPath)) {
  if (docs.length >= LIMIT) break;
  if (!line) continue;
  const doc = toDoc(JSON.parse(line));
  if (!doc) continue;
  docs.push(doc);
  const docId = docs.length;
  FIELDS.forEach(([prefix, key], f) => {
    const tokens = tokenize(String(doc[key] ?? ''));
    fieldLengths[f].push(tokens.length);
    tokens.forEach((token, position) => {
      const term = prefix + token;
      let occ = occurrences.get(term);
      if (!occ) occurrences.set(term, (occ = []));
      occ.push(docId, position);
    });
  });
  if (docId % 100000 === 0) log(`read ${docId} docs, ${occurrences.size} terms`);
}
log(`read ${docs.length} docs, ${occurrences.size} terms`);

// --- postings + dictionary ---------------------------------------------------
class Bytes {
  buf = Buffer.alloc(1 << 20);
  length = 0;
  ensure(n: number) {
    if (this.length + n <= this.buf.length) return;
    let size = this.buf.length * 2;
    while (size < this.length + n) size *= 2;
    const next = Buffer.alloc(size);
    this.buf.copy(next, 0, 0, this.length);
    this.buf = next;
  }
  byte(b: number) { this.ensure(1); this.buf[this.length++] = b; }
  varint(value: number) {
    let v = value;
    while (v >= 128) { this.byte((v % 128) | 0x80); v = Math.floor(v / 128); }
    this.byte(v);
  }
  bytes(b: Uint8Array) { this.ensure(b.length); this.buf.set(b, this.length); this.length += b.length; }
  done() { return this.buf.subarray(0, this.length); }
}

const prefixField = new Map(FIELDS.map(([prefix], f) => [prefix, f]));
const avgLength = fieldLengths.map(ls => ls.reduce((a, b) => a + b, 0) / Math.max(1, ls.length));
const N = docs.length;

const postings = new Bytes();
const buckets = new Map<number, Bytes>();
let termCount = 0;
for (const [term, occ] of occurrences) {
  const f = prefixField.get(term.slice(0, 2))!;
  // group positions by doc (occ is docId-ascending)
  const group: { docId: number; positions: number[]; impact: number }[] = [];
  for (let i = 0; i < occ.length; i += 2) {
    const last = group[group.length - 1];
    if (last && last.docId === occ[i]) last.positions.push(occ[i + 1]);
    else group.push({ docId: occ[i], positions: [occ[i + 1]], impact: 0 });
  }
  const df = group.length;
  const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
  for (const p of group) {
    const tf = p.positions.length;
    const len = fieldLengths[f][p.docId - 1];
    const score = (idf * tf * (K1 + 1)) / (tf + K1 * (1 - B + (B * len) / avgLength[f]));
    p.impact = Math.max(1, Math.min(255, Math.round(score * 16)));
  }
  group.sort((a, b) => b.impact - a.impact || a.docId - b.docId);
  const kept = group.slice(0, KEEP);

  const offset = postings.length;
  postings.varint(df);
  postings.varint(kept.length);
  let g = 0;
  while (g < kept.length) {
    const impact = kept[g].impact;
    const start = g;
    while (g < kept.length && kept[g].impact === impact) g += 1;
    const same = kept.slice(start, g).sort((a, b) => a.docId - b.docId);
    postings.byte(impact);
    postings.varint(same.length);
    let previous = 0;
    for (const p of same) {
      postings.varint(p.docId - previous);
      previous = p.docId;
      postings.varint(p.positions.length);
      let previousPosition = 0;
      for (const position of p.positions) {
        postings.varint(position - previousPosition);
        previousPosition = position;
      }
    }
  }
  const bucket = fnv1a(term) & 0xffff;
  let entry = buckets.get(bucket);
  if (!entry) buckets.set(bucket, (entry = new Bytes()));
  const termBytes = encoder.encode(term);
  entry.varint(termBytes.length);
  entry.bytes(termBytes);
  entry.varint(offset);
  entry.varint(postings.length - offset);
  entry.varint(df);
  occurrences.set(term, []); // free as we go
  termCount += 1;
  if (termCount % 500000 === 0) log(`postings for ${termCount} terms`);
}
occurrences.clear();
const dictDir = new BigUint64Array(0x10001);
const dict = new Bytes();
for (let b = 0; b < 0x10000; b += 1) {
  dictDir[b] = BigInt(dict.length);
  const entry = buckets.get(b);
  if (entry) dict.bytes(entry.done());
}
dictDir[0x10000] = BigInt(dict.length);
log(`postings ${postings.length} bytes, dict ${dict.length} bytes`);

// --- records, overflow, snippets, posfwd ------------------------------------
function putField(stubs: Buffer, at: number, start: number, end: number, text: string) {
  let bytes = encoder.encode(text);
  if (bytes.length > end - start) {
    // cut at a character boundary
    let cut = end - start;
    while (cut > 0 && (bytes[cut] & 0xc0) === 0x80) cut -= 1;
    bytes = bytes.subarray(0, cut);
  }
  stubs.set(bytes, at + start);
}
const stubs = Buffer.alloc(N * 320);
docs.forEach((d, i) => {
  const at = i * 320;
  putField(stubs, at, 0, 150, d.title);
  putField(stubs, at, 150, 198, d.creators);
  putField(stubs, at, 198, 208, d.date);
  putField(stubs, at, 208, 232, d.domain);
  putField(stubs, at, 232, 320, d.url);
});

function directory(payload: (d: Doc) => Uint8Array): [Buffer, Buffer] {
  const offsets = new BigUint64Array(N + 1);
  const bin = new Bytes();
  docs.forEach((d, i) => {
    offsets[i] = BigInt(bin.length);
    bin.bytes(payload(d));
  });
  offsets[N] = BigInt(bin.length);
  return [Buffer.from(offsets.buffer), bin.done()];
}
const empty = new Uint8Array();
const [urlDir, urlBin] = directory(d => encoder.encode(d.url));
const [snipDir, snipBin] = directory(d =>
  d.snippet ? deflateSync(JSON.stringify({ a: d.snippet, l: 'eng' })) : empty,
);
const [posfwdDir, posfwdBin] = directory(d => {
  const text: Record<string, string> = {};
  const title = tokenize(d.title).join(' ');
  if (title) text.t = title;
  const creators = d.creators.split(';').map(n => tokenize(n).join(' ')).filter(Boolean).join(' ; ');
  if (creators) text.c = creators;
  const abstract = tokenize(d.abstract).join(' ');
  if (abstract) text.a = abstract;
  const institution = tokenize(d.institution).join(' ');
  if (institution) text.i = institution;
  return Object.keys(text).length ? deflateSync(JSON.stringify(text)) : empty;
});
log('records, snippets and posfwd done');

// --- facets ------------------------------------------------------------------
function yearByte(date: string): number {
  const year = Number.parseInt(date.slice(0, 4), 10);
  if (Number.isNaN(year) || year < 1700 || year > 2134) return 0;
  if (year < 1900) return 1 + Math.floor((year - 1700) / 10);
  return Math.min(255, 21 + (year - 1900));
}
const byCount = (values: (string | undefined)[]) => {
  const counts = new Map<string, number>();
  for (const v of values) if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1]).map(([v]) => v).slice(0, 255);
};
const langs = byCount(docs.map(d => d.language));
const countries = byCount(docs.map(d => d.country));
const stride = 8;
const rows = Buffer.alloc(N * stride);
docs.forEach((d, i) => {
  const at = i * stride;
  rows[at] = yearByte(d.date);
  rows[at + 1] = d.flags & 0xff;
  const li = d.language ? langs.indexOf(d.language) : -1;
  rows[at + 4] = li >= 0 ? li + 1 : 0;
  const ci = d.country ? countries.indexOf(d.country) : -1;
  rows[at + 5] = ci >= 0 ? ci + 1 : 0;
  rows[at + 6] = d.flags >> 8;
});
const facetsMeta = { n: N, stride, year_enc: 2, langs, countries, flag_bits: FLAG_BITS, levels: LEVELS };

// --- institutions (source collections) ---------------------------------------
const instIds = new Uint16Array(docs.map(d => d.institutionId));
const instCounts = new Map<number, number>();
for (const id of instIds) if (id) instCounts.set(id, (instCounts.get(id) ?? 0) + 1);
const labelLines = SOURCES.map(([id, label, country], i) =>
  encoder.encode(`${id}\t${label}\t${country ?? ''}\t${instCounts.get(i + 1) ?? 0}\n`),
);
const labelsDir = new Uint32Array(labelLines.length + 1);
labelLines.forEach((l, i) => { labelsDir[i + 1] = labelsDir[i] + l.length; });
const aliasMap = new Map<string, Set<number>>();
SOURCES.forEach(([id, label], i) => {
  for (const name of [label, id]) {
    const key = institutionKey(name);
    aliasMap.set(key, (aliasMap.get(key) ?? new Set()).add(i + 1));
  }
});
const aliasBuckets: Record<string, [number, number]> = {};
const aliasBin = new Bytes();
const byBucket = new Map<string, string[]>();
for (const [key, ids] of [...aliasMap].sort(([a], [b]) => (a < b ? -1 : 1))) {
  const bucket = key.slice(0, 2);
  byBucket.set(bucket, [...(byBucket.get(bucket) ?? []), `${key}\t${[...ids].join(',')}\n`]);
}
for (const [bucket, bucketLines] of byBucket) {
  const bytes = encoder.encode(bucketLines.join(''));
  aliasBuckets[bucket] = [aliasBin.length, bytes.length];
  aliasBin.bytes(bytes);
}
const instMeta = {
  n: N, stride: 2, k: SOURCES.length, bin: 'inst.bin', gz: 'inst.gz.json',
  labels: { bin: 'inst-labels.bin', dir: 'inst-labels.dir', cols: ['qid', 'label', 'country', 'n_docs'] },
  alias: { bin: 'inst-alias.bin', dir: 'inst-alias.json' },
};

// --- write -------------------------------------------------------------------
mkdirSync(outDir, { recursive: true });
const files: [string, Uint8Array][] = [
  ['dict.dir', Buffer.from(dictDir.buffer)],
  ['dict.bin', dict.done()],
  ['postings.bin', postings.done()],
  ['stubs.bin', stubs],
  ['url.dir', urlDir], ['url.bin', urlBin],
  ['snip.dir', snipDir], ['snippets.bin', snipBin],
  ['posfwd.dir', posfwdDir], ['posfwd.bin', posfwdBin],
  ['facets-meta.json', encoder.encode(JSON.stringify(facetsMeta))],
  ['facets.gz.json', gzipSync(rows)],
  ['inst-meta.json', encoder.encode(JSON.stringify(instMeta))],
  ['inst.bin', Buffer.from(instIds.buffer)],
  ['inst.gz.json', gzipSync(Buffer.from(instIds.buffer))],
  ['inst-labels.bin', Buffer.concat(labelLines)],
  ['inst-labels.dir', Buffer.from(labelsDir.buffer)],
  ['inst-alias.json', encoder.encode(JSON.stringify({ norm: 'nfkd-strip-marks-casefold-nonword-to-space-collapse-drop-leading-the', buckets: aliasBuckets }))],
  ['inst-alias.bin', aliasBin.done()],
];
for (const [name, bytes] of files) writeFileSync(`${outDir}/${name}.${VERSION}`, bytes);
const current = {
  v: VERSION,
  n_docs: N,
  stub_bytes: 320,
  positional: true,
  posfwd: true,
  prefixed_fields: { t: 'title', c: 'creators', a: 'abstract' },
};
writeFileSync(`${outDir}/current.json`, JSON.stringify(current));
log(`wrote ${files.length + 1} files to ${outDir}: ${N} docs, ${termCount} terms`);
