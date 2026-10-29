import { fnv1a, readVarint } from './codec';
/** Bucket count: terms are bucketed by the low 16 bits of their hash. */
const BUCKETS = 0x10000;
/**
 * The term dictionary. dict.dir (loaded whole, ~0.5MB) holds each bucket's
 * start in dict.bin; a bucket is a run of entries
 * `varint termLength, term bytes, varint offset, varint length, varint df`.
 */
export class EtdDictionary {
    constructor(files, bucketStarts) {
        this.files = files;
        this.bucketStarts = bucketStarts;
    }
    static async load(files, options) {
        const buffer = await files.arrayBuffer('dict.dir', options);
        const starts = new BigUint64Array(buffer);
        if (starts.length < BUCKETS + 1) {
            throw new Error(`dict.dir: ${starts.length} entries, need ${BUCKETS + 1}`);
        }
        return new EtdDictionary(files, starts);
    }
    /**
     * Looks up terms (prefixed, e.g. 't:climate'). Terms not in the index are
     * absent from the result. All buckets are read in one multi-range request.
     */
    async lookup(terms, options) {
        const byBucket = new Map();
        for (const term of new Set(terms)) {
            const bucket = fnv1a(term) & (BUCKETS - 1);
            const inBucket = byBucket.get(bucket) ?? [];
            inBucket.push(term);
            byBucket.set(bucket, inBucket);
        }
        const buckets = [...byBucket.entries()].filter(([bucket]) => this.bucketEnd(bucket) > this.bucketStart(bucket));
        const reads = await this.files.ranges('dict.bin', buckets.map(([bucket]) => [
            this.bucketStart(bucket),
            this.bucketEnd(bucket) - this.bucketStart(bucket),
        ]), 256, options);
        const entries = new Map();
        buckets.forEach(([, bucketTerms], i) => {
            const found = readBucket(reads[i], bucketTerms);
            for (const [term, entry] of found)
                entries.set(term, entry);
        });
        return entries;
    }
    bucketStart(bucket) {
        return Number(this.bucketStarts[bucket]);
    }
    bucketEnd(bucket) {
        return Number(this.bucketStarts[bucket + 1]);
    }
}
/**
 * Finds the wanted terms in one bucket's bytes.
 */
export function readBucket(bytes, terms) {
    const encoder = new TextEncoder();
    const wanted = terms.map(term => [term, encoder.encode(term)]);
    const found = new Map();
    let i = 0;
    while (i < bytes.length) {
        let termLength;
        [termLength, i] = readVarint(bytes, i);
        const termBytes = bytes.subarray(i, i + termLength);
        i += termLength;
        let offset;
        let length;
        let docFrequency;
        [offset, i] = readVarint(bytes, i);
        [length, i] = readVarint(bytes, i);
        [docFrequency, i] = readVarint(bytes, i);
        for (const [term, encoded] of wanted) {
            if (encoded.length === termLength &&
                encoded.every((byte, k) => byte === termBytes[k])) {
                found.set(term, { offset, length, docFrequency });
            }
        }
    }
    return found;
}
