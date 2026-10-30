import { checkIndexFormat, type EtdIndexMeta } from '../engine/index-files';

/**
 * Demo-only: which archive.org item the ETD demo searches. By default it's
 * etd-search, through the dev server's /etd-index proxy; `etd_item=<id>`
 * points it at another item's static index, through /item-index/<id>/.
 */

/** The item the demo searches when the URL doesn't name one. */
export const DEFAULT_ETD_ITEM = 'etd-search';

/**
 * archive.org identifier characters. Only these reach the proxy path, so
 * nothing like `../` can.
 */
const IDENTIFIER = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

const ARCHIVE_HOSTS = new Set(['archive.org', 'www.archive.org']);

/**
 * The item identifier in what someone typed, pasted or dropped: a bare
 * identifier, an archive.org/details/<id> url, or an archive.org/download/<id>/…
 * url. Undefined for anything else.
 */
export function parseItemIdentifier(text: string): string | undefined {
  const trimmed = text.trim();
  if (IDENTIFIER.test(trimmed)) return trimmed;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return undefined;
  }
  if (!['http:', 'https:'].includes(url.protocol)) return undefined;
  if (!ARCHIVE_HOSTS.has(url.hostname)) return undefined;
  const [, kind, id] = url.pathname.split('/');
  if (kind !== 'details' && kind !== 'download') return undefined;
  const identifier = decodeURIComponent(id ?? '');
  return IDENTIFIER.test(identifier) ? identifier : undefined;
}

/** Where the demo reads its index and live page from. */
export interface EtdIndexUrls {
  /** The index directory, for StaticEtdEngine. */
  baseUrl: string;
  /** The item's own search.html, for the compare panel. */
  pageUrl: string;
  /**
   * The item searched. With `etd_base_url`, only when that is an item's own
   * archive.org/download/<id>/ folder.
   */
  item?: string;
  /** An `etd_item` value that isn't an identifier, so was ignored. */
  rejectedItem?: string;
}

/** The proxied directory of an item's files. */
export function itemIndexUrl(item: string): string {
  return item === DEFAULT_ETD_ITEM ? '/etd-index/' : `/item-index/${item}/`;
}

/**
 * The item whose archive.org download folder `url` is, read straight from
 * archive.org: https://archive.org/download/<id>/, and nothing deeper.
 */
function downloadFolderItem(url: string): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }
  const match = parsed.pathname.match(/^\/download\/([^/]+)\/?$/);
  if (!ARCHIVE_HOSTS.has(parsed.hostname) || !match) return undefined;
  const item = decodeURIComponent(match[1]);
  return IDENTIFIER.test(item) ? item : undefined;
}

/**
 * The index and live page to use, from the demo's url parameters:
 * `etd_base_url` first, then `etd_item`, then etd-search.
 */
export function etdIndexUrls(params: URLSearchParams): EtdIndexUrls {
  const raw = params.get('etd_item');
  const parsed = raw === null ? undefined : parseItemIdentifier(raw);
  const rejectedItem = raw !== null && !parsed ? raw : undefined;
  const item = parsed ?? DEFAULT_ETD_ITEM;
  const itemUrl = itemIndexUrl(item);

  const baseUrl = params.get('etd_base_url');
  if (baseUrl !== null) {
    const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return {
      baseUrl,
      pageUrl: `${base}search.html`,
      item: downloadFolderItem(baseUrl),
      rejectedItem,
    };
  }
  return {
    baseUrl: itemUrl,
    pageUrl: `${itemUrl}search.html`,
    item,
    rejectedItem,
  };
}

/**
 * Whether the index at `baseUrl` has a vector store to search by meaning:
 * its ivf-meta.json, which not every item has (dl-search doesn't).
 */
export async function hasVectorIndex(
  baseUrl: string,
  fetchFn: typeof fetch = fetch.bind(globalThis),
): Promise<boolean> {
  try {
    const response = await fetchFn(`${baseUrl}ivf-meta.json?t=${Date.now()}`);
    return response.ok;
  } catch {
    return false;
  }
}

/** Whether an item holds an index the engine can read, and if not, why. */
export type ItemIndexCheck = { ok: true } | { ok: false; message: string };

/**
 * Reads an item's current.json and checks it describes an index this engine
 * reads, before the demo switches to it.
 */
export async function checkItemIndex(
  item: string,
  fetchFn: typeof fetch = fetch.bind(globalThis),
): Promise<ItemIndexCheck> {
  let response: Response;
  try {
    response = await fetchFn(
      `${itemIndexUrl(item)}current.json?t=${Date.now()}`,
    );
  } catch (err) {
    return { ok: false, message: `Couldn't reach ${item}: ${reason(err)}.` };
  }
  if (response.status === 404) {
    return {
      ok: false,
      message: `${item} doesn't have a current.json, so it isn't a static search index this demo can read.`,
    };
  }
  if (!response.ok) {
    return {
      ok: false,
      message: `Couldn't read ${item}'s current.json (HTTP ${response.status}).`,
    };
  }

  let meta: EtdIndexMeta;
  try {
    meta = (await response.json()) as EtdIndexMeta;
  } catch {
    return {
      ok: false,
      message: `${item}'s current.json isn't JSON, so it isn't a static search index this demo can read.`,
    };
  }
  if (typeof meta !== 'object' || meta === null) {
    return {
      ok: false,
      message: `${item}'s current.json isn't an index manifest, so it isn't a static search index this demo can read.`,
    };
  }
  try {
    checkIndexFormat(meta);
  } catch (err) {
    return {
      ok: false,
      message: `${item} has a current.json, but not in a format this engine reads: ${reason(err)}.`,
    };
  }
  return { ok: true };
}

function reason(err: unknown): string {
  return (err instanceof Error ? err.message : String(err)).replace(
    /^ETD index: /,
    '',
  );
}
