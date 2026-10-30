import type { EtdCallOptions } from '../etd-engine';
import { fnv1a, readVarint } from './codec';
import type { EtdIndexFiles } from './index-files';

/**
 * Where a term's posting list sits in postings.bin, and how many documents
 * hold the term (which the stored list may not cover: lists are truncated).
 */
export interface EtdTermEntry {
  offset: number;
  length: number;
  docFrequency: number;
}

/** Bucket count: terms are bucketed by the low 16 bits of their hash. */
const BUCKETS = 0x10000;

/**
 * The term dictionary. dict.dir (loaded whole, ~0.5MB) holds each bucket's
 * start in dict.bin; a bucket is a run of entries
 * `varint termLength, term bytes, varint offset, varint length, varint df`.
 */
export class EtdDictionary {
  private constructor(
    private readonly files: EtdIndexFiles,
    private readonly bucketStarts: BigUint64Array,
  ) {}

  static async load(
    files: EtdIndexFiles,
    options?: EtdCallOptions,
  ): Promise<EtdDictionary> {
    const buffer = await files.arrayBuffer('dict.dir', options);
    const starts = new BigUint64Array(buffer);
    if (starts.length < BUCKETS + 1) {
      throw new Error(
        `dict.dir: ${starts.length} entries, need ${BUCKETS + 1}`,
      );
    }
    return new EtdDictionary(files, starts);
  }

  /**
   * Looks up terms (prefixed, e.g. 't:climate'). Terms not in the index are
   * absent from the result. All buckets are read in one multi-range request.
   */
  async lookup(
    terms: readonly string[],
    options?: EtdCallOptions,
  ): Promise<Map<string, EtdTermEntry>> {
    const byBucket = new Map<number, string[]>();
    for (const term of new Set(terms)) {
      const bucket = fnv1a(term) & (BUCKETS - 1);
      const inBucket = byBucket.get(bucket) ?? [];
      inBucket.push(term);
      byBucket.set(bucket, inBucket);
    }

    const buckets = [...byBucket.entries()].filter(
      ([bucket]) => this.bucketEnd(bucket) > this.bucketStart(bucket),
    );
    const reads = await this.files.ranges(
      'dict.bin',
      buckets.map(([bucket]) => [
        this.bucketStart(bucket),
        this.bucketEnd(bucket) - this.bucketStart(bucket),
      ]),
      256,
      options,
    );

    const entries = new Map<string, EtdTermEntry>();
    buckets.forEach(([, bucketTerms], i) => {
      const found = readBucket(reads[i], bucketTerms);
      for (const [term, entry] of found) entries.set(term, entry);
    });
    return entries;
  }

  private bucketStart(bucket: number): number {
    return Number(this.bucketStarts[bucket]);
  }

  private bucketEnd(bucket: number): number {
    return Number(this.bucketStarts[bucket + 1]);
  }
}

/**
 * Finds the wanted terms in one bucket's bytes.
 */
export function readBucket(
  bytes: Uint8Array,
  terms: readonly string[],
): Map<string, EtdTermEntry> {
  const encoder = new TextEncoder();
  const wanted = terms.map(term => [term, encoder.encode(term)] as const);
  const found = new Map<string, EtdTermEntry>();

  let i = 0;
  while (i < bytes.length) {
    let termLength: number;
    [termLength, i] = readVarint(bytes, i);
    const termBytes = bytes.subarray(i, i + termLength);
    i += termLength;
    let offset: number;
    let length: number;
    let docFrequency: number;
    [offset, i] = readVarint(bytes, i);
    [length, i] = readVarint(bytes, i);
    [docFrequency, i] = readVarint(bytes, i);

    for (const [term, encoded] of wanted) {
      if (
        encoded.length === termLength &&
        encoded.every((byte, k) => byte === termBytes[k])
      ) {
        found.set(term, { offset, length, docFrequency });
      }
    }
  }
  return found;
}
