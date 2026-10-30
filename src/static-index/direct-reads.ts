import { loadItemFileList } from './file-list';

/**
 * Whether the browser can read an item's index files straight from
 * archive.org, file by file, and why not for those it can't.
 *
 * archive.org's datanodes only send a CORS header for some file names, so a
 * page on another origin can read some of an item's files and not others.
 * The demo reads through a local proxy where it has one; this shows what
 * would break without it.
 */

/** One file's read. */
export interface DirectRead {
  file: string;
  /** Why it can't be read; undefined when it can. */
  blocked?: string;
}

export const DOWNLOAD_BASE_URL = 'https://archive.org/download/';

/** What the browser reports for a read refused for want of a CORS header. */
export const NO_CORS_REASON =
  "archive.org sent no CORS header for it (or the network failed; a browser can't tell which)";

/** An index file's version stamp, as in dict.dir.20261029-69300a. */
const VERSION_STAMP = /\.\d{8}-[0-9a-z]+/;

/** Files in an item that the demo never reads. */
const NOT_INDEX =
  /^(__ia_spool|history|vendor)\/|_(files|meta)\.xml$|_meta\.sqlite$|\.(torrent|html|js|png|jpg|txt|md)$|^__ia_thumb/;

/**
 * The index files a search reads: the current version's files, and the
 * unversioned ones (the vector store and the model). Older versions and
 * the item's own pages and records are left out.
 */
export function indexFiles(
  names: readonly string[],
  version: string,
): string[] {
  return names.filter(name => {
    if (NOT_INDEX.test(name)) return false;
    return VERSION_STAMP.test(name) ? name.includes(version) : true;
  });
}

/** Reads the first byte of each file from archive.org, a few at a time. */
export async function checkDirectReads(
  itemId: string,
  files: readonly string[],
  options: {
    fetch?: typeof fetch;
    downloadBaseUrl?: string;
    parallel?: number;
  } = {},
): Promise<DirectRead[]> {
  const fetchFn = options.fetch ?? fetch.bind(globalThis);
  const base = `${options.downloadBaseUrl ?? DOWNLOAD_BASE_URL}${encodeURIComponent(itemId)}/`;
  const reads: DirectRead[] = new Array(files.length);
  let next = 0;
  const worker = async () => {
    while (next < files.length) {
      const index = next++;
      const file = files[index];
      reads[index] = { file, blocked: await readBlocked(fetchFn, base + file) };
    }
  };
  await Promise.all(
    Array.from(
      { length: Math.min(options.parallel ?? 6, files.length) },
      worker,
    ),
  );
  return reads;
}

async function readBlocked(
  fetchFn: typeof fetch,
  url: string,
): Promise<string | undefined> {
  try {
    const response = await fetchFn(url, { headers: { Range: 'bytes=0-0' } });
    return response.ok ? undefined : `HTTP ${response.status}`;
  } catch {
    return NO_CORS_REASON;
  }
}

/**
 * The item's index files and whether each can be read straight from
 * archive.org. Undefined when the file list or current.json can't be read.
 */
export async function checkItemDirectReads(
  itemId: string,
  options: { fetch?: typeof fetch; downloadBaseUrl?: string } = {},
): Promise<DirectRead[] | undefined> {
  const fetchFn = options.fetch ?? fetch.bind(globalThis);
  const base = options.downloadBaseUrl ?? DOWNLOAD_BASE_URL;
  const [list, version] = await Promise.all([
    loadItemFileList(itemId, { fetch: fetchFn }),
    fetchFn(`${base}${encodeURIComponent(itemId)}/current.json?t=${Date.now()}`)
      .then(response => (response.ok ? response.json() : undefined))
      .then(current => (current as { v?: unknown } | undefined)?.v)
      .catch(() => undefined),
  ]);
  if (!list || typeof version !== 'string') return undefined;
  return checkDirectReads(itemId, indexFiles(list.names, version), options);
}
