// Embeds Democracy's Library records with multilingual-e5-small, the way the
// ETD page embeds queries (transformers.js 3.0.2, q8, mean pooling,
// normalised), with e5's "passage: " prefix for documents.
//
// Records are taken in the text build's order with its filter (collections
// skipped), so vector id i is text docId i + 1.
//
// Usage: node tools/static-index/vectors/embed.mjs <records.jsonl> <out.f32> [limit] [batch]
import { createReadStream, openSync, writeSync, closeSync } from 'node:fs';
import { env, pipeline } from '@huggingface/transformers';

const [inPath, outPath, limitArg, batchArg] = process.argv.slice(2);
const LIMIT = limitArg ? Number(limitArg) : Infinity;
const BATCH = batchArg ? Number(batchArg) : 32;
// Shards: embed docs START.. (in the text build's numbering) with THREADS threads.
const START = Number(process.env.START ?? 0);
const THREADS = process.env.THREADS ? Number(process.env.THREADS) : undefined;
const MAX_CHARS = 600;

env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = new URL('../models/', import.meta.url).pathname;

const list = v => (v === undefined || v === null || v === '' ? [] : Array.isArray(v) ? v : [v]).map(String);
const plain = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

async function* jsonLines(path) {
  let rest = '';
  for await (const chunk of createReadStream(path, 'utf8')) {
    const parts = (rest + chunk).split('\n');
    rest = parts.pop() ?? '';
    yield* parts;
  }
  if (rest) yield rest;
}

const DIM = 384;
const WINDOW = 4096; // texts sorted by length within a window, so batches pad less
const extractor = await pipeline('feature-extraction', 'Xenova/multilingual-e5-small', {
  dtype: 'q8',
  ...(THREADS ? { session_options: { intraOpNumThreads: THREADS, interOpNumThreads: 1 } } : {}),
});
let seen = 0; // non-collection records read so far, the text build's docId - 1
const out = openSync(outPath, 'w');
const started = Date.now();
let done = 0;
let batch = []; // the current window, in file order

async function flush() {
  if (!batch.length) return;
  const order = batch.map((_, i) => i).sort((a, b) => batch[a].length - batch[b].length);
  const vectors = new Float32Array(batch.length * DIM);
  for (let s = 0; s < order.length; s += BATCH) {
    const ids = order.slice(s, s + BATCH);
    const result = await extractor(ids.map(i => batch[i]), { pooling: 'mean', normalize: true });
    ids.forEach((i, k) => vectors.set(result.data.subarray(k * DIM, (k + 1) * DIM), i * DIM));
  }
  writeSync(out, Buffer.from(vectors.buffer));
  done += batch.length;
  batch = [];
  const secs = (Date.now() - started) / 1000;
  console.log(`${done} docs, ${(done / secs).toFixed(0)}/s`);
}

for await (const line of jsonLines(inPath)) {
  if (done + batch.length >= LIMIT) break;
  if (!line) continue;
  if (seen < START && !line.includes('"mediatype": "collection"')) {
    // fast skip without parsing; the check below keeps the count exact
    const r0 = JSON.parse(line);
    if (r0.mediatype !== 'collection') seen += 1;
    continue;
  }
  const r = JSON.parse(line);
  if (r.mediatype === 'collection') continue;
  seen += 1;
  const title = list(r.title)[0] ?? String(r.identifier);
  const description = plain(list(r.description).join(' '));
  batch.push(`passage: ${title}. ${description}`.slice(0, MAX_CHARS));
  if (batch.length === WINDOW) await flush();
}
await flush();
closeSync(out);
const secs = (Date.now() - started) / 1000;
console.log(`done: ${done} docs in ${secs.toFixed(1)}s, ${(done / secs).toFixed(0)}/s -> ${outPath}`);
