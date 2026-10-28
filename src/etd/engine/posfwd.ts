import type { EtdCallOptions } from '../etd-engine';
import type { EtdIndexFiles } from './index-files';
import { span } from './records';

/**
 * Reads posfwd: each doc's complete field text as index tokens, for exact
 * word-adjacency checks. The postings are impact-truncated, so a common
 * word's positions are missing for most docs; posfwd is the doc's own
 * untruncated text instead.
 *
 * posfwd.dir is docId-aligned u64 offsets (n_docs + 1, the last being
 * posfwd.bin's size); each [start, end) in posfwd.bin is a deflated JSON
 * member of space-joined tokens per field, empty fields left out.
 *
 * Ported from etd-search/search.html (bootPosfwd, posfwdWarm, phraseInDoc;
 * page build p112).
 */

/** One doc's token text, per field: title, creators, abstract, institution, ORCID. */
export interface PosfwdText {
  t?: string;
  c?: string;
  a?: string;
  i?: string;
  o?: string;
}

/** posfwd field key for each index field prefix. */
const FIELD_KEYS: Record<string, keyof PosfwdText> = {
  't:': 't',
  'c:': 'c',
  'a:': 'a',
  'i:': 'i',
  'o:': 'o',
};

const ALL_FIELDS: (keyof PosfwdText)[] = ['t', 'c', 'a', 'i', 'o'];

/** Docs kept in the read cache; a query's boost reads 200. */
const CACHE_SIZE = 2000;

export class EtdPosfwd {
  /** docId -> its text, or null for a doc with none. */
  private readonly cache = new Map<number, PosfwdText | null>();

  /** docId -> the read already fetching it, shared by concurrent callers. */
  private readonly pending = new Map<number, Promise<void>>();

  private constructor(
    private readonly files: EtdIndexFiles,
    /** posfwd.bin size, from posfwd.dir's sentinel entry. */
    private readonly size: number,
  ) {}

  /**
   * Opens posfwd, or resolves undefined when the index has none (or its
   * directory can't be read): it's optional, only ordering depends on it.
   */
  static async load(
    files: EtdIndexFiles,
    options?: EtdCallOptions,
  ): Promise<EtdPosfwd | undefined> {
    if (!files.meta.posfwd) return undefined;
    try {
      const sentinel = await files.range(
        'posfwd.dir',
        files.meta.n_docs * 8,
        8,
        options,
      );
      const size = Number(
        new DataView(
          sentinel.buffer,
          sentinel.byteOffset,
          sentinel.byteLength,
        ).getBigUint64(0, true),
      );
      return size > 0 ? new EtdPosfwd(files, size) : undefined;
    } catch (err) {
      if (options?.signal?.aborted) throw err;
      return undefined;
    }
  }

  /** A doc's text, if it has been read; undefined if not (yet). */
  get(docId: number): PosfwdText | null | undefined {
    return this.cache.get(docId);
  }

  /**
   * Reads the text of `docIds` into the cache. Docs another call is already
   * fetching are waited on, not fetched again (the demo's compare panel and
   * collection-browser query the same engine at once); if that call fails,
   * or is aborted, this one fetches them itself.
   */
  async read(
    docIds: readonly number[],
    options?: EtdCallOptions,
  ): Promise<void> {
    const nDocs = this.files.meta.n_docs;
    const missing = [...new Set(docIds)].filter(
      d => Number.isInteger(d) && d >= 1 && d <= nDocs && !this.cache.has(d),
    );
    if (!missing.length) return;

    const shared = new Set<Promise<void>>();
    const own: number[] = [];
    for (const docId of missing) {
      const inFlight = this.pending.get(docId);
      if (inFlight) shared.add(inFlight);
      else own.push(docId);
    }

    const mine = own.length ? this.fetch(own, options) : undefined;
    if (mine) {
      for (const docId of own) this.pending.set(docId, mine);
      const forget = () => {
        for (const docId of own) {
          if (this.pending.get(docId) === mine) this.pending.delete(docId);
        }
      };
      mine.then(forget, forget);
    }

    // Another caller's failure (or abort) isn't this call's: retry its docs.
    await Promise.all([...shared].map(read => read.catch(() => {})));
    const stillMissing = missing.filter(
      d => !own.includes(d) && !this.cache.has(d),
    );
    await Promise.all([
      mine,
      stillMissing.length ? this.read(stillMissing, options) : undefined,
    ]);
  }

  /**
   * Fetches docs into the cache, in two multi-range waves (directory
   * entries, then members). A doc with no text is remembered as null.
   */
  private async fetch(
    missing: readonly number[],
    options?: EtdCallOptions,
  ): Promise<void> {
    const dirs = await this.files.ranges(
      'posfwd.dir',
      missing.map(d => [(d - 1) * 8, 16] as const),
      512,
      options,
    );
    const wanted: (readonly [number, number])[] = [];
    const wantedIds: number[] = [];
    missing.forEach((docId, i) => {
      const s = span(dirs[i]);
      if (!s || s[0] + s[1] > this.size) {
        this.remember(docId, null); // no text for this doc
        return;
      }
      wanted.push(s);
      wantedIds.push(docId);
    });

    const members = await this.files.ranges('posfwd.bin', wanted, 48, options);
    await Promise.all(
      wantedIds.map(async (docId, i) => {
        this.remember(docId, await decodePosfwd(members[i]));
      }),
    );
  }

  private remember(docId: number, text: PosfwdText | null): void {
    this.cache.delete(docId);
    this.cache.set(docId, text);
    if (this.cache.size > CACHE_SIZE) {
      this.cache.delete(this.cache.keys().next().value!);
    }
  }
}

/** Inflates one posfwd member; null when it's unreadable. */
export async function decodePosfwd(
  compressed: Uint8Array | undefined,
): Promise<PosfwdText | null> {
  if (!compressed) return null;
  try {
    const stream = new Blob([new Uint8Array(compressed)])
      .stream()
      .pipeThrough(new DecompressionStream('deflate'));
    return JSON.parse(
      new TextDecoder().decode(await new Response(stream).arrayBuffer()),
    ) as PosfwdText;
  } catch {
    return null;
  }
}

/**
 * Whether `tokens` (two or more) appear adjacent, in order, in one of the
 * doc's fields: in `prefix`'s field only when given, else in any.
 *
 * Creators are lenient about names: the tokens may appear in either order,
 * with other names between them, within one author ("carl feynman" matches
 * "Feynman, Carl Richard"), but never across two co-authors.
 */
export function phraseInDoc(
  text: PosfwdText | null | undefined,
  tokens: readonly string[],
  prefix?: string,
): boolean {
  if (!text || tokens.length < 2) return false;
  const needle = ` ${tokens.join(' ')} `;
  const fields = prefix ? [FIELD_KEYS[prefix] ?? 't'] : ALL_FIELDS;
  for (const field of fields) {
    const haystack = text[field];
    if (!haystack) continue;
    if (` ${haystack} `.includes(needle)) return true;
    if (field === 'c' && inOneName(haystack, tokens)) return true;
  }
  return false;
}

/**
 * Whether `tokens` are an ordered subsequence of one author's name tokens,
 * the name doubled so either name order works.
 */
function inOneName(creators: string, tokens: readonly string[]): boolean {
  for (const author of creators.split(';')) {
    const name = author.trim().split(/\s+/).filter(Boolean);
    if (!name.length) continue;
    let matched = 0;
    for (const token of name.concat(name)) {
      if (token === tokens[matched]) {
        matched += 1;
        if (matched === tokens.length) return true;
      }
    }
  }
  return false;
}
