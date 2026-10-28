import type { EtdCallOptions, EtdRecord } from '../etd-engine';
import { readOffsetPair } from './codec';
import type { EtdIndexFiles } from './index-files';

/**
 * Reads display records. Everything is docId-aligned, so no lookups:
 * - stubs.bin: one fixed 320-byte record per doc (title, creators, date,
 *   domain, and the landing url cut to 88 bytes);
 * - url.dir/url.bin: the full landing url, for the ~2.5% the stub truncates;
 * - snip.dir/snippets.bin: a deflated JSON abstract, when the doc has one.
 * A page of records is read in two waves of multi-range requests.
 *
 * Ported from etd-search/search.html (page build p110).
 */
export class EtdRecords {
  private constructor(
    private readonly files: EtdIndexFiles,
    /** snippets.bin size, from snip.dir's sentinel entry; 0 = no snippets. */
    private readonly snippetsSize: number,
  ) {}

  static async load(
    files: EtdIndexFiles,
    options?: EtdCallOptions,
  ): Promise<EtdRecords> {
    let snippetsSize = 0;
    try {
      // snip.dir has n_docs + 1 entries; the last is snippets.bin's size.
      const sentinel = await files.range(
        'snip.dir',
        files.meta.n_docs * 8,
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
      // Snippets are optional: records still show without abstracts.
    }
    return new EtdRecords(files, snippetsSize);
  }

  /**
   * Reads records for docIds, in the given order. Ids out of range are
   * skipped.
   */
  async read(
    docIds: readonly number[],
    options?: EtdCallOptions,
  ): Promise<EtdRecord[]> {
    const { n_docs: nDocs, stub_bytes: stubBytes } = this.files.meta;
    const ids = docIds.filter(d => Number.isInteger(d) && d >= 1 && d <= nDocs);
    if (!ids.length) return [];

    // Wave 1: stubs and both directories.
    const [stubs, urlDirs, snipDirs] = await Promise.all([
      this.files.ranges(
        'stubs.bin',
        ids.map(d => [(d - 1) * stubBytes, stubBytes] as const),
        256,
        options,
      ),
      this.files.ranges(
        'url.dir',
        ids.map(d => [(d - 1) * 8, 16] as const),
        512,
        options,
      ),
      this.snippetsSize
        ? this.files.ranges(
            'snip.dir',
            ids.map(d => [(d - 1) * 8, 16] as const),
            512,
            options,
          )
        : Promise.resolve([] as Uint8Array[]),
    ]);

    // Wave 2: the url and snippet bytes those directories point at.
    const urlSpans = ids.map((_, i) => span(urlDirs[i]));
    const snipSpans = ids.map((_, i) => {
      const s = span(snipDirs[i]);
      return s && s[0] + s[1] <= this.snippetsSize ? s : undefined;
    });
    const [urls, snippets] = await Promise.all([
      this.readSpans('url.bin', urlSpans, 256, options),
      this.readSpans('snippets.bin', snipSpans, 64, options),
    ]);

    const decoder = new TextDecoder();
    return Promise.all(
      ids.map(async (docId, i) => {
        const stub = decodeStub(stubs[i]);
        const url = urls[i] ? decoder.decode(urls[i]) : stub.url;
        const record: EtdRecord = {
          docId,
          title: stub.title,
          creators: stub.creators,
          date: stub.date,
          domain: stub.domain,
          url,
        };
        const snippet = snippets[i] && (await decodeSnippet(snippets[i]!));
        if (snippet) record.snippet = snippet;
        return record;
      }),
    );
  }

  private async readSpans(
    name: string,
    spans: (readonly [number, number] | undefined)[],
    rangesPerRequest: number,
    options?: EtdCallOptions,
  ): Promise<(Uint8Array | undefined)[]> {
    const wanted = spans.filter(
      (s): s is readonly [number, number] => s !== undefined,
    );
    const reads = await this.files.ranges(
      name,
      wanted,
      rangesPerRequest,
      options,
    );
    const out: (Uint8Array | undefined)[] = [];
    let next = 0;
    for (const s of spans) {
      out.push(s ? reads[next] : undefined);
      if (s) next += 1;
    }
    return out;
  }
}

/** [offset, length] from a 16-byte directory entry; undefined if empty. */
export function span(
  entry: Uint8Array | undefined,
): [number, number] | undefined {
  if (!entry || entry.length < 16) return undefined;
  const [start, end] = readOffsetPair(entry);
  return end > start && start >= 0 ? [start, end - start] : undefined;
}

export interface EtdStub {
  title: string;
  creators: string;
  date: string;
  domain: string;
  url: string;
}

const stubDecoder = new TextDecoder();

/**
 * Decodes a 320-byte stub: NUL-padded UTF-8 fields at fixed byte offsets.
 */
export function decodeStub(bytes: Uint8Array | undefined): EtdStub {
  if (!bytes || bytes.length < 320) {
    return { title: '', creators: '', date: '', domain: '', url: '' };
  }
  return {
    title: stubField(bytes, 0, 150),
    creators: stubField(bytes, 150, 198),
    date: stubField(bytes, 198, 208),
    domain: stubField(bytes, 208, 232),
    url: stubField(bytes, 232, 320),
  };
}

function stubField(bytes: Uint8Array, start: number, end: number): string {
  const field = bytes.subarray(start, end);
  const nul = field.indexOf(0);
  // A byte-width cut can leave a partial UTF-8 sequence at the end, which
  // decodes to U+FFFD. Only a trailing one is the cut's; drop it.
  return stubDecoder
    .decode(nul < 0 ? field : field.subarray(0, nul))
    .replace(/�+$/, '');
}

/**
 * The native-language abstract from a deflated snippet member
 * (`{ a: abstract, l: language, e: English translation, ... }`), as plain
 * text. Undefined when the member is unreadable: snippets are optional.
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
