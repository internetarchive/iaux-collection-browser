/**
 * Format primitives of the ETD static index.
 *
 * Ported from etd-search/search.html (page build p110, index build
 * 20261026-5e5902). These must match the indexer (impact_index.py) exactly:
 * a term tokenized or hashed differently here is a term the index can't find.
 */

/** Token characters: digits, a-z, Latin-1/Extended, Greek..Greek Extended, CJK, Hangul. */
const TOKEN_RE = /[0-9a-zà-ɏͰ-῿぀-鿿가-힯]+/gu;

/** CJK and Hangul, which the index stores as overlapping character bigrams. */
const CJK_RE = /[぀-鿿가-힯]/u;

/**
 * Splits text into index tokens: NFC-normalized, lowercased runs of token
 * characters. A CJK/Hangul run longer than two characters becomes its
 * overlapping two-character bigrams.
 */
export function tokenize(text: string): string[] {
  const out: string[] = [];
  for (const match of (text || '')
    .normalize('NFC')
    .toLowerCase()
    .matchAll(TOKEN_RE)) {
    const token = match[0];
    if (token.length > 2 && CJK_RE.test(token)) {
      for (let i = 0; i < token.length - 1; i += 1) {
        out.push(token.slice(i, i + 2));
      }
    } else {
      out.push(token);
    }
  }
  return out;
}

const encoder = new TextEncoder();

/**
 * 32-bit FNV-1a over the term's UTF-8 bytes. The low 16 bits pick the
 * term's dictionary bucket.
 */
export function fnv1a(term: string): number {
  let hash = 0x811c9dc5;
  for (const byte of encoder.encode(term)) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/**
 * Reads an unsigned LEB128 varint at `offset`. Returns the value and the
 * offset just past it. Uses multiplication, not shifts, so values past 2^31
 * (postings offsets run to ~8GB) stay exact.
 */
export function readVarint(
  bytes: Uint8Array,
  offset: number,
): [number, number] {
  let value = 0;
  let scale = 1;
  let i = offset;
  for (;;) {
    if (i >= bytes.length) {
      throw new RangeError(`varint runs past the end of its buffer at ${i}`);
    }
    const byte = bytes[i];
    i += 1;
    value += (byte & 0x7f) * scale;
    if (!(byte & 0x80)) return [value, i];
    scale *= 128;
  }
}
