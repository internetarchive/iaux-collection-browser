// Serves a built static index the way archive.org's storage servers do for
// the engine: CORS, single and multi-range reads, query strings ignored.
// Usage: node tools/static-index/serve-index.mjs <dir> [port]
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { join, normalize } from 'node:path';

const [dir, portArg] = process.argv.slice(2);
const port = Number(portArg ?? 8787);
const cache = new Map();

createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Range');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Content-Length');
  if (req.method === 'OPTIONS') return res.writeHead(204).end();

  const name = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^\/+/, '');
  if (!name || name.includes('..')) return res.writeHead(404).end();
  let file = cache.get(name);
  if (!file) {
    try {
      statSync(join(dir, name));
      file = readFileSync(join(dir, name));
      cache.set(name, file);
    } catch {
      return res.writeHead(404).end();
    }
  }
  const range = req.headers.range;
  if (!range) {
    res.writeHead(200, { 'Content-Length': file.length, 'Accept-Ranges': 'bytes' });
    return res.end(file);
  }
  const spans = range.replace(/^bytes=/, '').split(',').map(part => {
    const [s, e] = part.trim().split('-');
    const start = s === '' ? file.length - Number(e) : Number(s);
    const end = s === '' || e === '' ? file.length - 1 : Math.min(Number(e), file.length - 1);
    return [start, end];
  });
  if (spans.length === 1) {
    const [start, end] = spans[0];
    res.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${file.length}`, 'Content-Length': end - start + 1 });
    return res.end(file.subarray(start, end + 1));
  }
  const boundary = 'LOCALINDEXBOUNDARY';
  const parts = [];
  for (const [start, end] of spans) {
    parts.push(Buffer.from(`\r\n--${boundary}\r\nContent-Type: application/octet-stream\r\nContent-Range: bytes ${start}-${end}/${file.length}\r\n\r\n`));
    parts.push(file.subarray(start, end + 1));
  }
  parts.push(Buffer.from(`\r\n--${boundary}--\r\n`));
  const body = Buffer.concat(parts);
  res.writeHead(206, { 'Content-Type': `multipart/byteranges; boundary=${boundary}`, 'Content-Length': body.length });
  res.end(body);
}).listen(port, () => console.log(`serving ${dir} on http://localhost:${port}/`));
