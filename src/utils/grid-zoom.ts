import type { LayoutType } from '../tiles/models';

/**
 * The column counts the tile grid can snap to when pinch-zoom is enabled,
 * from the biggest tiles to the densest thumbnail mosaic.
 */
export const GRID_ZOOM_COLUMNS = [1, 2, 3, 4, 6, 8, 12] as const;

/** The column gap (in px) used at each zoom level, indexed like `GRID_ZOOM_COLUMNS`. */
const GRID_ZOOM_GAPS = [17, 17, 14, 12, 8, 5, 2] as const;

/** Levels at or beyond this many columns use the tiles' minimal layout. */
const MINIMAL_LAYOUT_COLUMNS = 6;

/** Levels at or beyond this many columns show only thumbnails. */
const THUMBNAIL_ONLY_COLUMNS = 8;

/** How far past the biggest or smallest level a gesture can stretch before snapping. */
const MAX_OVERSHOOT = 1.15;

export const GRID_ZOOM_STORAGE_KEY = 'ia-collection-browser-grid-zoom';

export const MIN_ZOOM_LEVEL = 0;
export const MAX_ZOOM_LEVEL = GRID_ZOOM_COLUMNS.length - 1;

/** Returns the index of the zoom level whose column count is closest to `columns`. */
export function nearestZoomLevel(columns: number): number {
  let best = 0;
  let bestDistance = Infinity;
  GRID_ZOOM_COLUMNS.forEach((levelColumns, level) => {
    const distance = Math.abs(Math.log(levelColumns / columns));
    if (distance < bestDistance) {
      best = level;
      bestDistance = distance;
    }
  });
  return best;
}

export function clampZoomLevel(level: number): number {
  return Math.min(MAX_ZOOM_LEVEL, Math.max(MIN_ZOOM_LEVEL, Math.round(level)));
}

/**
 * Clamps a gesture scale so the tiles can't be stretched past the biggest or
 * smallest level (with a little give so the limit feels soft).
 * A scale above 1 means bigger tiles, so fewer columns.
 */
export function clampGestureScale(startColumns: number, scale: number): number {
  const maxScale =
    (startColumns / GRID_ZOOM_COLUMNS[MIN_ZOOM_LEVEL]) * MAX_OVERSHOOT;
  const minScale =
    startColumns / GRID_ZOOM_COLUMNS[MAX_ZOOM_LEVEL] / MAX_OVERSHOOT;
  return Math.min(maxScale, Math.max(minScale, scale));
}

/** The level a gesture of the given scale should settle on. */
export function zoomLevelForScale(startColumns: number, scale: number): number {
  return nearestZoomLevel(startColumns / scale);
}

/** Reads a persisted zoom level (stored as a column count), if there is a valid one. */
export function loadStoredZoomLevel(): number | undefined {
  try {
    const stored = Number(localStorage.getItem(GRID_ZOOM_STORAGE_KEY));
    if (!stored) return undefined;
    return nearestZoomLevel(stored);
  } catch {
    return undefined;
  }
}

export function storeZoomLevel(level: number | undefined): void {
  try {
    if (level === undefined) {
      localStorage.removeItem(GRID_ZOOM_STORAGE_KEY);
    } else {
      localStorage.setItem(
        GRID_ZOOM_STORAGE_KEY,
        String(GRID_ZOOM_COLUMNS[level]),
      );
    }
  } catch {
    // Storage can be unavailable (private windows, blocked site data).
  }
}

/**
 * The inline CSS variables that give the infinite scroller `level`'s layout.
 * `gridWidth` is the scroller's width in px, which sets the thumbnail size
 * at the levels that show only thumbnails.
 */
export function zoomLevelStyles(
  level: number,
  gridWidth: number,
): Record<string, string> {
  const columns = GRID_ZOOM_COLUMNS[level];
  const gap = GRID_ZOOM_GAPS[level];
  // Sized so that exactly `columns` tracks fit (the hair subtracted keeps
  // rounding from dropping a column).
  const minWidth = `calc((100% - ${(columns - 1) * gap}px) / ${columns} - 0.5px)`;
  const styles: Record<string, string> = {
    '--infiniteScrollerCellMinWidth': minWidth,
    '--infiniteScrollerColGap': `${gap}px`,
    '--infiniteScrollerRowGap': `${gap}px`,
    '--infiniteScrollerCellMinHeight': '0px',
  };
  if (columns >= THUMBNAIL_ONLY_COLUMNS && gridWidth > 0) {
    const tileWidth = Math.floor((gridWidth - (columns - 1) * gap) / columns);
    styles['--imgBlockHeight'] = `${tileWidth}px`;
    styles['--imgHeight'] = `${tileWidth}px`;
  } else {
    styles['--infiniteScrollerCellMinHeight'] =
      columns >= 6 ? '12rem' : '22.5rem';
  }
  return styles;
}

/** The tile layout to use at `level`: dense levels drop details, the densest show only thumbnails. */
export function zoomLayoutType(level: number): LayoutType | undefined {
  const columns = GRID_ZOOM_COLUMNS[level];
  if (columns >= THUMBNAIL_ONLY_COLUMNS) return 'thumbnail-only';
  if (columns >= MINIMAL_LAYOUT_COLUMNS) return 'minimal';
  return undefined;
}
