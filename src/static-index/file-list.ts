/**
 * An archive.org item's own list of its files, as the item's version record
 * when its index files aren't versioned by name.
 *
 * archive.org/metadata/<id>/files lists every file with its size and last
 * change time, and (unlike most of an item's files) can be read from any
 * origin. A file published under a fixed name, such as a vector store's
 * cells.bin, can be replaced without its manifest changing; keyed by its
 * own size and change time, the browser cache can't hand back old bytes
 * for it, and a size that doesn't fit the manifest shows up before a search
 * reads it (see size-rules.ts).
 */

/** One file in the list. */
export interface FileListEntry {
  name: string;
  /** Bytes. */
  size: number;
  /** Last change, in seconds since 1970. */
  mtime: number;
}

/** The files of one item, by name. */
export class ItemFileList {
  private readonly byName: Map<string, FileListEntry>;

  constructor(
    readonly itemId: string,
    entries: readonly FileListEntry[],
  ) {
    this.byName = new Map(entries.map(entry => [entry.name, entry]));
  }

  get(name: string): FileListEntry | undefined {
    return this.byName.get(name);
  }

  /**
   * A cache key for the file as it is now, `<mtime>-<size>`; undefined for
   * a file the list doesn't have.
   */
  cacheKey(name: string): string | undefined {
    const entry = this.byName.get(name);
    return entry && `${entry.mtime}-${entry.size}`;
  }
}

/** archive.org identifiers: letters, digits, '.', '-' and '_'. */
const ITEM_ID = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

/**
 * The archive.org item a base url reads from: `…/download/<id>/…`,
 * `…/details/<id>`, or a local proxy's `/item-index/<id>/`. Undefined for
 * any other url (another host, a proxy path we don't know).
 */
export function itemIdFromUrl(url: string): string | undefined {
  let path: string;
  try {
    path = new URL(url, 'http://localhost/').pathname;
  } catch {
    return undefined;
  }
  const match = path.match(/\/(?:download|details|item-index)\/([^/]+)/);
  const id = match && decodeURIComponent(match[1]);
  return id && ITEM_ID.test(id) ? id : undefined;
}

export const METADATA_BASE_URL = 'https://archive.org/metadata/';

/**
 * Reads an item's file list. Never throws (but for an abort): an item
 * whose list can't be read is searched as before, without the list.
 */
export async function loadItemFileList(
  itemId: string,
  options: {
    fetch?: typeof fetch;
    signal?: AbortSignal;
    metadataBaseUrl?: string;
  } = {},
): Promise<ItemFileList | undefined> {
  const fetchFn = options.fetch ?? fetch.bind(globalThis);
  const base = options.metadataBaseUrl ?? METADATA_BASE_URL;
  try {
    const response = await fetchFn(
      `${base}${encodeURIComponent(itemId)}/files`,
      { signal: options.signal },
    );
    if (!response.ok) return undefined;
    const body = (await response.json()) as { result?: unknown };
    if (!Array.isArray(body.result)) return undefined;
    const entries: FileListEntry[] = [];
    for (const file of body.result as Record<string, unknown>[]) {
      const size = Number(file.size);
      const mtime = Number(file.mtime);
      if (
        typeof file.name === 'string' &&
        Number.isSafeInteger(size) &&
        Number.isFinite(mtime)
      ) {
        entries.push({ name: file.name, size, mtime });
      }
    }
    return new ItemFileList(itemId, entries);
  } catch (err) {
    if (options.signal?.aborted) throw err;
    return undefined;
  }
}
