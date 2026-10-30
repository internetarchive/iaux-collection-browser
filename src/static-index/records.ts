import type { IdSpace } from './manifest';
import type { CallOptions, RangeFiles } from './range-files';

/**
 * Reads what hits show, for any id space a manifest describes: a fixed-size
 * record per id, any field held whole in an overflow pair, and the snippet.
 * Everything is id-aligned, so there are no lookups: a page of records is
 * two waves of multi-range requests, the records and directory entries,
 * then the bytes those entries point at.
 *
 * A `.dir` holds count + 1 little-endian u64 offsets into its `.bin`; the
 * last is the `.bin`'s size. A snippet is deflated JSON, its text in `a`.
 *
 * Generalised from ETD's two readers (etd-search/search.html, page build
 * p110: the text index's stubs and the vector store's docs.bin).
 */

/** A record as read: its fields by key, and its snippet when it has one. */
export interface StaticRecord {
  id: number;
  fields: Record<string, string>;
  snippet?: string;
}

/** Ranges per multi-range request, per file. */
const RECORDS_PER_REQUEST = 256;
const DIRS_PER_REQUEST = 512;
const OVERFLOWS_PER_REQUEST = 256;
const SNIPPETS_PER_REQUEST = 64;

export class StaticRecords {
  private constructor(
    private readonly files: RangeFiles,
    private readonly space: Pick<IdSpace, 'count' | 'firstId' | 'records'>,
    /** The snippet .bin's size, from its .dir's last entry; 0 = none. */
    private readonly snippetsSize: number,
  ) {}

  /**
   * Reads the snippet directory's last entry, so a snippet is never read
   * past its file. Snippets are optional: if that read fails, records show
   * without them.
   */
  static async load(
    files: RangeFiles,
    space: Pick<IdSpace, 'count' | 'firstId' | 'records'>,
    options?: CallOptions,
  ): Promise<StaticRecords> {
    let snippetsSize = 0;
    const { snippet } = space.records;
    if (snippet) {
      try {
        const sentinel = await files.range(
          snippet.dir,
          space.count * 8,
          8,
          options,
        );
        snippetsSize = Number(
          new DataView(
            sentinel.buffer,
            sentinel.byteOffset,
            sentinel.byteLength,
          ).getBigUint64(0, true),
        );
      } catch (err) {
        if (options?.signal?.aborted) throw err;
      }
    }
    return new StaticRecords(files, space, snippetsSize);
  }

  /** Records for ids, in the given order; ids out of range are skipped. */
  async read(
    ids: readonly number[],
    options?: CallOptions,
  ): Promise<StaticRecord[]> {
    const { count, firstId, records: layout } = this.space;
    const wanted = ids.filter(
      id => Number.isInteger(id) && id >= firstId && id < firstId + count,
    );
    if (!wanted.length) return [];
    const at = (id: number) => id - firstId;
    const dirEntries = (dir: string) =>
      this.files.ranges(
        dir,
        wanted.map(id => [at(id) * 8, 16] as const),
        DIRS_PER_REQUEST,
        options,
      );
    const overflow = layout.overflow ?? [];
    const { snippet } = layout;

    // Wave 1: the records and every directory's entries.
    const [rows, overflowDirs, snippetDirs] = await Promise.all([
      this.files.ranges(
        layout.file,
        wanted.map(id => [at(id) * layout.bytes, layout.bytes] as const),
        RECORDS_PER_REQUEST,
        options,
      ),
      Promise.all(overflow.map(pair => dirEntries(pair.dir))),
      snippet && this.snippetsSize
        ? dirEntries(snippet.dir)
        : Promise.resolve([] as Uint8Array[]),
    ]);

    // Wave 2: the bytes those entries point at.
    const snippetSpans = wanted.map((_, i) => {
      const s = span(snippetDirs[i]);
      return s && s[0] + s[1] <= this.snippetsSize ? s : undefined;
    });
    const [overflows, snippets] = await Promise.all([
      Promise.all(
        overflow.map((pair, k) =>
          this.readSpans(
            pair.bin,
            wanted.map((_, i) => span(overflowDirs[k][i])),
            OVERFLOWS_PER_REQUEST,
            options,
          ),
        ),
      ),
      snippet
        ? this.readSpans(
            snippet.bin,
            snippetSpans,
            SNIPPETS_PER_REQUEST,
            options,
          )
        : Promise.resolve([]),
    ]);

    const decoder = new TextDecoder();
    return Promise.all(
      wanted.map(async (id, i) => {
        const record: StaticRecord = {
          id,
          fields: decodeRecord(rows[i], layout),
        };
        overflow.forEach((pair, k) => {
          const whole = overflows[k][i];
          if (whole) record.fields[pair.field] = decoder.decode(whole);
        });
        const bytes = snippets[i];
        // A short read is a broken snippet, not a shorter one.
        const text =
          bytes && bytes.length === snippetSpans[i]![1]
            ? await decodeSnippet(bytes)
            : undefined;
        if (text) record.snippet = text;
        return record;
      }),
    );
  }

  private async readSpans(
    name: string,
    spans: (readonly [number, number] | undefined)[],
    rangesPerRequest: number,
    options?: CallOptions,
  ): Promise<(Uint8Array | undefined)[]> {
    const reads = await this.files.ranges(
      name,
      spans.filter((s): s is readonly [number, number] => s !== undefined),
      rangesPerRequest,
      options,
    );
    let next = 0;
    return spans.map(s => (s ? reads[next++] : undefined));
  }
}

const fieldDecoder = new TextDecoder();

/**
 * A record's fields: NUL-padded UTF-8 at fixed byte offsets. A record
 * shorter than the layout (a failed read) has every field empty.
 */
export function decodeRecord(
  bytes: Uint8Array | undefined,
  layout: IdSpace['records'],
): Record<string, string> {
  const whole = !!bytes && bytes.length >= layout.bytes;
  return Object.fromEntries(
    layout.fields.map(({ key, start, end }) => [
      key,
      whole ? decodeField(bytes.subarray(start, end)) : '',
    ]),
  );
}

function decodeField(field: Uint8Array): string {
  const nul = field.indexOf(0);
  // A byte-width cut can leave a partial UTF-8 sequence at the end, which
  // decodes to U+FFFD. Only a trailing one is the cut's; drop it.
  return fieldDecoder
    .decode(nul < 0 ? field : field.subarray(0, nul))
    .replace(/�+$/, '');
}

/** [offset, length] from a 16-byte directory entry; undefined if empty. */
export function span(
  entry: Uint8Array | undefined,
): [number, number] | undefined {
  if (!entry || entry.length < 16) return undefined;
  const view = new DataView(entry.buffer, entry.byteOffset, entry.byteLength);
  const start = Number(view.getBigUint64(0, true));
  const end = Number(view.getBigUint64(8, true));
  return end > start && start >= 0 ? [start, end - start] : undefined;
}

/**
 * The text of a deflated snippet member (`{ a: text, ... }`, e.g. ETD's
 * `{ a: abstract, l: language, e: English translation }`), as plain text.
 * Undefined when the member is unreadable: snippets are optional.
 */
export async function decodeSnippet(
  compressed: Uint8Array,
): Promise<string | undefined> {
  try {
    const stream = new Blob([new Uint8Array(compressed)])
      .stream()
      .pipeThrough(new DecompressionStream('deflate'));
    const json = JSON.parse(
      new TextDecoder().decode(await new Response(stream).arrayBuffer()),
    ) as { a?: string };
    const text = plainText(json.a ?? '');
    return text || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Some repositories file abstracts as HTML: keep the text, drop the markup.
 */
export function plainText(text: string): string {
  if (!text || (!text.includes('<') && !text.includes('&'))) return text;
  const doc = new DOMParser().parseFromString(
    `<body>${text.replace(/<\s*(br|\/p|\/div|\/li)\s*\/?>/gi, ' ')}</body>`,
    'text/html',
  );
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}
