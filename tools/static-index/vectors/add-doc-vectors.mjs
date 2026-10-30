// Adds doc-vectors.bin to a built vector store: cells.bin's row format
// (u32 vector id LE, then dim × f16 LE) but in vector id order, so the
// engine can read the vectors of given docs directly (re-rank). Also adds
// doc_vectors and text_v to ivf-meta.json and restamps `built` there and in
// cell-codes-meta.json (the engine requires the two to match).
//
// Usage: node tools/static-index/vectors/add-doc-vectors.mjs <vectors.f32> <store_dir> <text_v>
import { readFileSync, writeFileSync } from 'node:fs';

const [vecPath, dir, textV] = process.argv.slice(2);
const DIM = 384;
const bytes = readFileSync(vecPath);
const vectors = new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
const N = vectors.length / DIM;
const meta = JSON.parse(readFileSync(`${dir}/ivf-meta.json`, 'utf8'));
if (meta.n !== N || meta.dim !== DIM) throw new Error(`store has n=${meta.n} dim=${meta.dim}, vectors give ${N}`);

// The same float -> half conversion build_vectors.mjs used for cells.bin.
const f32 = new Float32Array(1);
const u32 = new Uint32Array(f32.buffer);
function toHalf(value) {
  f32[0] = value;
  const x = u32[0];
  const sign = (x >>> 16) & 0x8000;
  const exp = ((x >>> 23) & 0xff) - 127 + 15;
  let mant = x & 0x7fffff;
  if (exp <= 0) {
    if (exp < -10) return sign;
    mant = (mant | 0x800000) >> (1 - exp);
    return sign | ((mant + 0x1000) >> 13);
  }
  if (exp >= 31) return sign | 0x7c00;
  return sign | (exp << 10) | ((mant + 0x1000) >> 13);
}

const ROWBYTES = 4 + DIM * 2;
const out = Buffer.alloc(N * ROWBYTES);
for (let i = 0; i < N; i += 1) {
  out.writeUInt32LE(i, i * ROWBYTES);
  for (let k = 0; k < DIM; k += 1) out.writeUInt16LE(toHalf(vectors[i * DIM + k]), i * ROWBYTES + 4 + k * 2);
}
writeFileSync(`${dir}/doc-vectors.bin`, out);

const built = new Date().toISOString().slice(0, 19).replace('T', ' ');
writeFileSync(`${dir}/ivf-meta.json`, JSON.stringify({ ...meta, doc_vectors: true, text_v: textV, built }));
const codesMeta = JSON.parse(readFileSync(`${dir}/cell-codes-meta.json`, 'utf8'));
writeFileSync(`${dir}/cell-codes-meta.json`, JSON.stringify({ ...codesMeta, built }));
console.log(`${dir}: doc-vectors.bin ${out.length} bytes (${N} × ${ROWBYTES}), text_v ${textV}, built ${built}`);
