// Writes an ETD-layout vector store (ivf-meta.json, centroids.f16, cell.dir,
// cells.bin, cell-codes*.json/bin, docs.bin) from embed.mjs's float32 rows.
// Layout: the vector store described in src/etd/README.md.
// Vector id i is text docId i + 1 (same records, same order).
//
// Usage: node tools/static-index/vectors/build-vectors.mjs <records.jsonl> <vectors.f32> <out_dir> [ncell]
import { createReadStream, readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const [recordsPath, vecPath, outDir, ncellArg] = process.argv.slice(2);
const DIM = 384;
const vecBytes = readFileSync(vecPath);
const vectors = new Float32Array(vecBytes.buffer, vecBytes.byteOffset, vecBytes.byteLength / 4);
const N = vectors.length / DIM;
const NCELL = ncellArg ? Number(ncellArg) : Math.max(16, Math.round(Math.sqrt(N)));
const BUILT = new Date().toISOString().slice(0, 16).replace('T', ' ');
const log = msg => console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`);
log(`${N} vectors, ${NCELL} cells`);

// --- half floats -------------------------------------------------------------
const f32 = new Float32Array(1);
const u32 = new Uint32Array(f32.buffer);
function toHalf(value) {
  f32[0] = value;
  const x = u32[0];
  const sign = (x >>> 16) & 0x8000;
  let exp = ((x >>> 23) & 0xff) - 127 + 15;
  let mant = x & 0x7fffff;
  if (exp <= 0) {
    if (exp < -10) return sign;
    mant = (mant | 0x800000) >> (1 - exp);
    return sign | ((mant + 0x1000) >> 13);
  }
  if (exp >= 31) return sign | 0x7c00;
  const half = sign | (exp << 10) | ((mant + 0x1000) >> 13);
  return half;
}

// --- k-means on a sample, then assign every vector ----------------------------
function dot(a, ai, b, bi) {
  let s = 0;
  for (let k = 0; k < DIM; k += 1) s += a[ai + k] * b[bi + k];
  return s;
}
const sampleSize = Math.min(N, NCELL * 64);
const sample = [];
for (let i = 0; i < sampleSize; i += 1) sample.push(Math.floor((i * N) / sampleSize));
const centroids = new Float32Array(NCELL * DIM);
for (let c = 0; c < NCELL; c += 1) {
  centroids.set(vectors.subarray(sample[(c * 7919) % sampleSize] * DIM, sample[(c * 7919) % sampleSize] * DIM + DIM), c * DIM);
}
function nearest(v, vi) {
  let best = 0;
  let bestScore = -Infinity;
  for (let c = 0; c < NCELL; c += 1) {
    const s = dot(v, vi, centroids, c * DIM);
    if (s > bestScore) { bestScore = s; best = c; }
  }
  return best;
}
for (let iter = 0; iter < 8; iter += 1) {
  const sums = new Float64Array(NCELL * DIM);
  const counts = new Uint32Array(NCELL);
  for (const i of sample) {
    const c = nearest(vectors, i * DIM);
    counts[c] += 1;
    for (let k = 0; k < DIM; k += 1) sums[c * DIM + k] += vectors[i * DIM + k];
  }
  for (let c = 0; c < NCELL; c += 1) {
    if (!counts[c]) continue;
    let norm = 0;
    for (let k = 0; k < DIM; k += 1) norm += sums[c * DIM + k] ** 2;
    norm = Math.sqrt(norm) || 1;
    for (let k = 0; k < DIM; k += 1) centroids[c * DIM + k] = sums[c * DIM + k] / norm; // spherical k-means
  }
  log(`k-means iteration ${iter + 1}`);
}
const cellOf = new Uint32Array(N);
for (let i = 0; i < N; i += 1) {
  cellOf[i] = nearest(vectors, i * DIM);
  if (i % 100000 === 0 && i) log(`assigned ${i}`);
}
log('assigned all');

// --- rows grouped by cell ----------------------------------------------------
const counts = new Uint32Array(NCELL);
for (const c of cellOf) counts[c] += 1;
const cellDir = new Uint32Array(NCELL + 1);
for (let c = 0; c < NCELL; c += 1) cellDir[c + 1] = cellDir[c] + counts[c];
const next = cellDir.slice(0, NCELL);
const rowOrder = new Uint32Array(N);
for (let i = 0; i < N; i += 1) rowOrder[next[cellOf[i]]++] = i;

// 4-bit codes: value = (nibble - 8) * scale[d]
const scale = new Float32Array(DIM);
for (let i = 0; i < N; i += 1) for (let k = 0; k < DIM; k += 1) scale[k] = Math.max(scale[k], Math.abs(vectors[i * DIM + k]));
for (let k = 0; k < DIM; k += 1) scale[k] = (scale[k] || 1) / 7.5;
const ROWBYTES = 4 + DIM * 2;
const CODEBYTES = 4 + DIM / 2;
const cells = Buffer.alloc(N * ROWBYTES);
const codes = Buffer.alloc(N * CODEBYTES);
const nibble = (v, k) => Math.max(0, Math.min(15, Math.round(v / scale[k]) + 8));
rowOrder.forEach((i, r) => {
  cells.writeUInt32LE(i, r * ROWBYTES);
  codes.writeUInt32LE(i, r * CODEBYTES);
  for (let k = 0; k < DIM; k += 1) cells.writeUInt16LE(toHalf(vectors[i * DIM + k]), r * ROWBYTES + 4 + k * 2);
  for (let j = 0; j < DIM / 2; j += 1) {
    codes[r * CODEBYTES + 4 + j] = (nibble(vectors[i * DIM + 2 * j], 2 * j) << 4) | nibble(vectors[i * DIM + 2 * j + 1], 2 * j + 1);
  }
});
const centroidHalfs = Buffer.alloc(NCELL * DIM * 2);
for (let i = 0; i < NCELL * DIM; i += 1) centroidHalfs.writeUInt16LE(toHalf(centroids[i]), i * 2);
log('cells and codes written');

// --- docs.bin, in vector id order ---------------------------------------------
const FIELDS = { title: 150, host: 48, date: 10, landing: 92, lang: 8 };
const DOCBYTES = Object.values(FIELDS).reduce((a, b) => a + b, 0);
const docs = Buffer.alloc(N * DOCBYTES);
const list = v => (v === undefined || v === null || v === '' ? [] : Array.isArray(v) ? v : [v]).map(String);
const encoder = new TextEncoder();
function put(at, width, text) {
  let bytes = encoder.encode(text);
  if (bytes.length > width) {
    let cut = width;
    while (cut > 0 && (bytes[cut] & 0xc0) === 0x80) cut -= 1;
    bytes = bytes.subarray(0, cut);
  }
  docs.set(bytes, at);
}
let id = 0;
let rest = '';
outer: for await (const chunk of createReadStream(recordsPath, 'utf8')) {
  const parts = (rest + chunk).split('\n');
  rest = parts.pop() ?? '';
  for (const line of parts) {
    if (id >= N) break outer;
    if (!line) continue;
    const r = JSON.parse(line);
    if (r.mediatype === 'collection') continue;
    let at = id * DOCBYTES;
    const values = {
      title: list(r.title)[0] ?? String(r.identifier),
      host: list(r.creator)[0] ?? '',
      date: (list(r.date)[0] ?? '').slice(0, 10),
      landing: `https://archive.org/details/${r.identifier}`,
      lang: (list(r.language)[0] ?? '').slice(0, 8),
    };
    for (const [field, width] of Object.entries(FIELDS)) {
      put(at, width, values[field]);
      at += width;
    }
    id += 1;
  }
}
if (id !== N) throw new Error(`records gave ${id} docs for ${N} vectors`);

// --- write ---------------------------------------------------------------------
mkdirSync(outDir, { recursive: true });
const meta = {
  n: N, ncell: NCELL, dim: DIM, model: 'intfloat/multilingual-e5-small',
  rowbytes: ROWBYTES, docbytes: DOCBYTES, fields: FIELDS,
  vsnip: false, codes: true, code_bits: 4, built: BUILT,
};
writeFileSync(`${outDir}/ivf-meta.json`, JSON.stringify(meta));
writeFileSync(`${outDir}/centroids.f16`, centroidHalfs);
writeFileSync(`${outDir}/cell.dir`, Buffer.from(cellDir.buffer));
writeFileSync(`${outDir}/cells.bin`, cells);
writeFileSync(`${outDir}/cell-codes-meta.json`, JSON.stringify({ n: N, dim: DIM, bits: 4, rowbytes: CODEBYTES, scale: Array.from(scale), built: BUILT }));
writeFileSync(`${outDir}/cell-codes.bin`, codes);
writeFileSync(`${outDir}/docs.bin`, docs);
log(`wrote vector store to ${outDir}: ${N} docs, ${NCELL} cells`);
