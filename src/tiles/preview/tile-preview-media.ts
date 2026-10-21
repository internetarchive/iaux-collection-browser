/** What a tile preview shows, resolved from an item's file list. */
export type TilePreviewMedia =
  | { kind: 'video'; src: string; start: number; fallbackUrls: string[] }
  | { kind: 'slides'; urls: string[]; fit: 'contain' | 'cover' }
  | { kind: 'audio'; src: string; start: number; waveform?: string }
  | { kind: 'zoom' };

interface ItemFile {
  name: string;
  format?: string;
  length?: string;
  size?: string;
}

/** Clip and snippet length, in seconds. */
export const PREVIEW_CLIP_SECONDS = 4;

/** What the previews are allowed to fetch. */
export interface TilePreviewOptions {
  /**
   * Play a real clip of the movie, taken from its smallest playable derivative.
   * A clip costs up to about 4 MB per preview (the browser buffers ahead), so by
   * default movies cycle a few of their stored frame thumbnails instead (about
   * 35 KB). Movies with no playable derivative always use the frames.
   */
  clips?: boolean;
  /**
   * The most a clip may be expected to download, in bytes (default 8 MB).
   * Movies whose cheapest playable derivative is estimated to cost more get the
   * frame thumbnails instead. See `estimateClipBytes`.
   */
  clipBudgetBytes?: number;
  /**
   * Play video clips and audio snippets with sound. Only takes effect once the
   * page has been activated by a click or key press; otherwise the browser
   * refuses and the preview stays muted.
   */
  sound?: boolean;
}

const MAX_SLIDES = 4;
const MAX_FRAMES = 6;
const MIN_CLIP_SOURCE_SECONDS = 8;
export const DEFAULT_CLIP_BUDGET_BYTES = 8_000_000;
/** Seconds of media a browser buffers ahead once playback starts. */
const BUFFER_AHEAD_SECONDS = 45;
/** Rough size of the mp4 index (moov) per second of media. */
const INDEX_BYTES_PER_SECOND = 1000;
const MAX_IMAGE_BYTES = 1_500_000;
const PAGE_NUMBERS = [1, 3, 5, 8];

const cache = new Map<string, Promise<TilePreviewMedia>>();

/**
 * Resolves the preview media for an item. One request at most per item per
 * page load (none for texts and fallbacks), and the result, including a
 * failure, is cached so re-hovering never hits the network again.
 */
export function resolvePreviewMedia(
  identifier: string,
  mediatype: string,
  baseUrl = 'https://archive.org',
  options: TilePreviewOptions = {},
): Promise<TilePreviewMedia> {
  const clipKey = options.clips
    ? `clip${options.clipBudgetBytes ?? DEFAULT_CLIP_BUDGET_BYTES}`
    : '';
  const key = `${baseUrl}|${identifier}|${clipKey}`;
  let pending = cache.get(key);
  if (!pending) {
    pending = resolve(identifier, mediatype, baseUrl, options).catch(() => ({
      kind: 'zoom' as const,
    }));
    cache.set(key, pending);
  }
  return pending;
}

/** Test hook. */
export function clearPreviewMediaCache(): void {
  cache.clear();
}

async function resolve(
  identifier: string,
  mediatype: string,
  baseUrl: string,
  options: TilePreviewOptions,
): Promise<TilePreviewMedia> {
  const download = (name: string) =>
    `${baseUrl}/download/${identifier}/${name
      .split('/')
      .map(encodeURIComponent)
      .join('/')}`;

  // Page images come from the BookReader endpoint, so no file list is needed.
  // Pages that don't exist are dropped when they fail to load.
  if (mediatype === 'texts') {
    return {
      kind: 'slides',
      fit: 'contain',
      urls: PAGE_NUMBERS.map(n => download(`page/n${n}_w300.jpg`)),
    };
  }

  const files = await fetchFiles(identifier, baseUrl);

  if (mediatype === 'movies') {
    // Frames are spread across the whole film, skipping the first (the cover).
    const frames = spread(
      files
        .filter(f => f.format === 'Thumbnail')
        .map(f => f.name)
        .sort()
        .slice(1),
      MAX_FRAMES,
    ).map(download);

    const clip = options.clips
      ? cheapestPlayable(
          files,
          options.clipBudgetBytes ?? DEFAULT_CLIP_BUDGET_BYTES,
        )
      : undefined;
    if (clip) {
      return {
        kind: 'video',
        src: download(clip.name),
        start: clipStart(clip.length),
        fallbackUrls: frames,
      };
    }
    return frames.length > 1
      ? { kind: 'slides', fit: 'cover', urls: frames }
      : { kind: 'zoom' };
  }

  if (mediatype === 'audio' || mediatype === 'etree') {
    const mp3 = files
      .filter(f => f.name.toLowerCase().endsWith('.mp3'))
      .sort((a, b) => a.name.localeCompare(b.name))[0];
    if (!mp3) return { kind: 'zoom' };
    const png = files.find(f => f.name === mp3.name.replace(/\.mp3$/i, '.png'));
    return {
      kind: 'audio',
      src: download(mp3.name),
      start: startAt(mp3.length),
      waveform: png && download(png.name),
    };
  }

  if (mediatype === 'image') {
    const images = files
      .filter(
        f =>
          f.format === 'JPEG' &&
          Number(f.size ?? 0) > 0 &&
          Number(f.size) <= MAX_IMAGE_BYTES,
      )
      .map(f => download(f.name))
      .slice(0, MAX_SLIDES);
    return images.length > 1
      ? { kind: 'slides', fit: 'cover', urls: images }
      : { kind: 'zoom' };
  }

  return { kind: 'zoom' };
}

async function fetchFiles(
  identifier: string,
  baseUrl: string,
): Promise<ItemFile[]> {
  const res = await fetch(`${baseUrl}/metadata/${identifier}/files`);
  if (!res.ok) return [];
  const body = await res.json();
  return Array.isArray(body.result) ? body.result : [];
}

/**
 * What playing a derivative is expected to download. A browser buffers about
 * `BUFFER_AHEAD_SECONDS` of media ahead and reads the whole mp4 index first, so
 * the cost follows bitrate and duration, not the length of the clip we show. A
 * file of unknown duration costs its whole size.
 */
export function estimateClipBytes(file: ItemFile): number {
  const size = Number(file.size);
  const seconds = parseLength(file.length);
  if (!seconds) return size;
  const bytesPerSecond = size / seconds;
  return Math.min(
    size,
    bytesPerSecond * BUFFER_AHEAD_SECONDS + seconds * INDEX_BYTES_PER_SECOND,
  );
}

/**
 * The derivative this browser can play that is cheapest to preview (mp4 or
 * webm, at least a few seconds long), or none when even that one is over
 * `budget`.
 */
function cheapestPlayable(
  files: ItemFile[],
  budget: number,
): ItemFile | undefined {
  const video = document.createElement('video');
  const cheapest = files
    .filter(f => {
      const ext = f.name.toLowerCase().split('.').pop();
      const type =
        ext === 'webm'
          ? 'video/webm'
          : ext === 'mp4' || ext === 'm4v'
            ? 'video/mp4'
            : '';
      const seconds = parseLength(f.length);
      return (
        !!type &&
        f.format !== 'Thumbnail' &&
        Number(f.size) > 0 &&
        (seconds === 0 || seconds >= MIN_CLIP_SOURCE_SECONDS) &&
        !!video.canPlayType(type)
      );
    })
    .sort((a, b) => estimateClipBytes(a) - estimateClipBytes(b))[0];
  return cheapest && estimateClipBytes(cheapest) <= budget
    ? cheapest
    : undefined;
}

/** Seconds into a film to start at: 10% in, to skip leading black, capped at 60. */
function clipStart(length?: string): number {
  const seconds = parseLength(length);
  if (!seconds) return 0;
  return Math.max(
    0,
    Math.min(60, Math.floor(seconds / 10), seconds - PREVIEW_CLIP_SECONDS),
  );
}

/** Picks `count` evenly spaced entries from `list`. */
function spread<T>(list: T[], count: number): T[] {
  if (list.length <= count) return list;
  return Array.from(
    { length: count },
    (_, i) => list[Math.floor((i * list.length) / count)],
  );
}

/** Seconds into the media to start at: a third of the way in, capped at 60. */
function startAt(length?: string): number {
  const seconds = parseLength(length);
  if (!seconds) return 0;
  return Math.max(
    0,
    Math.min(60, Math.floor(seconds / 3), seconds - PREVIEW_CLIP_SECONDS),
  );
}

/** Parses a file `length`, either plain seconds ("16.23") or "mm:ss" / "h:mm:ss". */
function parseLength(length?: string): number {
  if (!length) return 0;
  const parts = length.split(':').map(Number);
  if (parts.some(Number.isNaN)) return 0;
  return parts.reduce((total, part) => total * 60 + part, 0);
}
