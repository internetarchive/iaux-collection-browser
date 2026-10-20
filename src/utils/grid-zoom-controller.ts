import {
  clampGestureScale,
  GRID_ZOOM_COLUMNS,
  zoomLevelForScale,
} from './grid-zoom';

export interface Point {
  x: number;
  y: number;
}

/** What the controller needs from the element that owns the grid. */
export interface GridZoomHost<Anchor = unknown> {
  /** The element the gestures are listened on and the preview transform is applied to. */
  getSurface(): HTMLElement | undefined;
  /** How many columns the grid is showing right now. */
  getColumns(): number;
  /** The zoom level that is currently in effect. */
  getLevel(): number;
  /** Notes what is under `focal` (viewport coordinates) before anything is scaled. */
  captureAnchor(focal: Point): Anchor | undefined;
  /**
   * Switches the layout to `level`, keeping the captured anchor under `focal`.
   * Resolves once the new layout is in place.
   */
  commitLevel(level: number, focal: Point, anchor?: Anchor): Promise<void>;
}

const SETTLE_MS = 180;
const WHEEL_IDLE_MS = 160;
const WHEEL_SENSITIVITY = 0.01;
const MAX_WHEEL_STEP = 30;

type GestureSource = 'pointer' | 'wheel' | 'safari' | 'programmatic';

interface SafariGestureEvent extends UIEvent {
  scale: number;
  clientX: number;
  clientY: number;
}

/**
 * Turns pinch gestures, ctrl+wheel (trackpad pinch in Chrome/Firefox), Safari
 * gesture events and ctrl/cmd +/- into zoom level changes on the tile grid.
 *
 * While a gesture is in progress the grid is scaled with a CSS transform
 * around the pinch point. When it ends, the transform eases to the size of the
 * level it snapped to, then the real layout is swapped in.
 */
export class GridZoomController<Anchor = unknown> {
  private surface?: HTMLElement;

  private source?: GestureSource;

  private startColumns = 1;

  private scale = 1;

  private focal: Point = { x: 0, y: 0 };

  private anchor?: Anchor;

  private settling = false;

  /** The latest level asked for while a zoom was still settling. */
  private pendingLevel?: number;

  private pointers = new Map<number, Point>();

  private startDistance = 0;

  private wheelTimer = 0;

  private hovering = false;

  private lastPointer?: Point;

  constructor(private host: GridZoomHost<Anchor>) {}

  /** Starts listening. Safe to call again after the surface element has changed. */
  connect(): void {
    const surface = this.host.getSurface();
    if (!surface || surface === this.surface) return;
    this.disconnect();
    this.surface = surface;

    surface.style.touchAction = 'pan-x pan-y';
    surface.addEventListener('pointerdown', this.pointerDown);
    surface.addEventListener('pointermove', this.pointerMove);
    surface.addEventListener('pointerup', this.pointerEnd);
    surface.addEventListener('pointercancel', this.pointerEnd);
    surface.addEventListener('pointerleave', this.pointerLeave);
    surface.addEventListener('wheel', this.wheel, { passive: false });
    surface.addEventListener('gesturestart', this.safariStart);
    surface.addEventListener('gesturechange', this.safariChange);
    surface.addEventListener('gestureend', this.safariEnd);
    window.addEventListener('keydown', this.keyDown);
  }

  disconnect(): void {
    const { surface } = this;
    if (surface) {
      surface.style.touchAction = '';
      surface.removeEventListener('pointerdown', this.pointerDown);
      surface.removeEventListener('pointermove', this.pointerMove);
      surface.removeEventListener('pointerup', this.pointerEnd);
      surface.removeEventListener('pointercancel', this.pointerEnd);
      surface.removeEventListener('pointerleave', this.pointerLeave);
      surface.removeEventListener('wheel', this.wheel);
      surface.removeEventListener('gesturestart', this.safariStart);
      surface.removeEventListener('gesturechange', this.safariChange);
      surface.removeEventListener('gestureend', this.safariEnd);
      this.clearTransform();
      surface.style.transition = '';
      surface.style.opacity = '';
    }
    window.removeEventListener('keydown', this.keyDown);
    window.clearTimeout(this.wheelTimer);
    this.pointers.clear();
    this.source = undefined;
    this.settling = false;
    this.pendingLevel = undefined;
    this.hovering = false;
    this.lastPointer = undefined;
    this.surface = undefined;
  }

  /** Moves to `level` with the same animated settle a pinch gets. */
  async zoomToLevel(level: number, focal?: Point): Promise<void> {
    if (this.source || this.settling) {
      this.pendingLevel = level;
      return;
    }
    const columns = this.host.getColumns();
    const targetColumns = GRID_ZOOM_COLUMNS[level];
    if (targetColumns === undefined || level === this.host.getLevel()) return;
    this.begin('programmatic', focal ?? this.viewportCenter());
    await this.finish(targetColumns / columns);
  }

  private begin(source: GestureSource, focal: Point): void {
    const { surface } = this;
    if (!surface || this.source || this.settling) return;
    this.source = source;
    this.focal = focal;
    this.scale = 1;
    this.startColumns = this.host.getColumns();
    this.anchor = this.host.captureAnchor(focal);

    const rect = surface.getBoundingClientRect();
    surface.style.transformOrigin = `${focal.x - rect.left}px ${focal.y - rect.top}px`;
    surface.style.willChange = 'transform';
    surface.style.transition = 'none';
  }

  private update(scale: number): void {
    if (!this.source || !this.surface) return;
    this.scale = clampGestureScale(this.startColumns, scale);
    this.surface.style.transform = `scale(${this.scale})`;
  }

  /**
   * Ends the gesture, snapping to the level its scale is closest to. When
   * `forcedRatio` is given (zooming to a specific level), that level is used.
   */
  private async finish(forcedRatio?: number): Promise<void> {
    const { surface } = this;
    if (!surface || !this.source) return;
    const { focal, anchor } = this;
    const targetLevel =
      forcedRatio !== undefined
        ? zoomLevelForScale(this.startColumns, 1 / forcedRatio)
        : zoomLevelForScale(this.startColumns, this.scale);
    const targetColumns = GRID_ZOOM_COLUMNS[targetLevel];
    this.source = undefined;
    this.settling = true;

    // The scale at which the current tiles are the size the target level's tiles will be.
    const settledScale = this.startColumns / targetColumns;
    surface.style.transition = `transform ${SETTLE_MS}ms ease-out`;
    surface.style.transform = `scale(${settledScale})`;
    await new Promise<void>(resolve => {
      window.setTimeout(resolve, SETTLE_MS + 20);
    });

    if (!this.surface) return;
    if (targetLevel !== this.host.getLevel()) {
      // Swap layouts behind a brief fade so the reflow isn't seen mid-way.
      surface.style.transition = 'none';
      surface.style.opacity = '0';
      this.clearTransform();
      try {
        await this.host.commitLevel(targetLevel, focal, anchor);
      } finally {
        surface.style.transition = 'opacity 120ms ease-in';
        surface.style.opacity = '';
      }
    } else {
      this.clearTransform();
    }
    this.settling = false;

    const { pendingLevel } = this;
    this.pendingLevel = undefined;
    if (pendingLevel !== undefined) this.zoomToLevel(pendingLevel, focal);
  }

  private clearTransform(): void {
    const { surface } = this;
    if (!surface) return;
    surface.style.transform = '';
    surface.style.transformOrigin = '';
    surface.style.willChange = '';
  }

  private viewportCenter(): Point {
    const rect = this.surface?.getBoundingClientRect();
    const top = Math.max(0, rect?.top ?? 0);
    const bottom = Math.min(window.innerHeight, rect?.bottom ?? 0);
    return {
      x: (rect?.left ?? 0) + (rect?.width ?? window.innerWidth) / 2,
      y: top + Math.max(0, bottom - top) / 2,
    };
  }

  // Touch pinch: two pointers

  private pointerDown = (e: PointerEvent): void => {
    if (e.pointerType !== 'touch') return;
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 2 && !this.source) {
      const [a, b] = [...this.pointers.values()];
      this.startDistance = Math.hypot(a.x - b.x, a.y - b.y);
      if (this.startDistance > 0) {
        this.begin('pointer', { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
      }
    }
  };

  private pointerMove = (e: PointerEvent): void => {
    this.lastPointer = { x: e.clientX, y: e.clientY };
    this.hovering = true;
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.source === 'pointer' && this.pointers.size >= 2) {
      const [a, b] = [...this.pointers.values()];
      this.update(Math.hypot(a.x - b.x, a.y - b.y) / this.startDistance);
    }
  };

  private pointerEnd = (e: PointerEvent): void => {
    if (!this.pointers.delete(e.pointerId)) return;
    if (this.source === 'pointer' && this.pointers.size < 2) this.finish();
  };

  private pointerLeave = (): void => {
    this.hovering = false;
  };

  // Trackpad pinch in Chrome and Firefox arrives as ctrl+wheel

  private wheel = (e: WheelEvent): void => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    if (this.settling) return;
    if (!this.source) this.begin('wheel', { x: e.clientX, y: e.clientY });
    if (this.source !== 'wheel') return;

    const step = Math.max(-MAX_WHEEL_STEP, Math.min(MAX_WHEEL_STEP, e.deltaY));
    this.update(this.scale * Math.exp(-step * WHEEL_SENSITIVITY));
    window.clearTimeout(this.wheelTimer);
    this.wheelTimer = window.setTimeout(() => {
      if (this.source === 'wheel') this.finish();
    }, WHEEL_IDLE_MS);
  };

  // Safari reports pinches (trackpad and touch) as gesture events

  private safariStart = (e: Event): void => {
    const { clientX, clientY } = e as SafariGestureEvent;
    e.preventDefault();
    // Touch pinches also produce pointer events; the gesture events win.
    if (this.source === 'pointer') this.source = undefined;
    this.begin('safari', { x: clientX, y: clientY });
  };

  private safariChange = (e: Event): void => {
    e.preventDefault();
    if (this.source === 'safari') this.update((e as SafariGestureEvent).scale);
  };

  private safariEnd = (e: Event): void => {
    e.preventDefault();
    if (this.source === 'safari') this.finish();
  };

  // ctrl/cmd + and - while the pointer or focus is on the grid

  private keyDown = (e: KeyboardEvent): void => {
    if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
    const inGrid =
      this.hovering ||
      (this.surface && e.composedPath().includes(this.surface));
    if (!inGrid) return;

    const level = this.host.getLevel();
    let target: number;
    if (e.key === '=' || e.key === '+') target = level - 1;
    else if (e.key === '-' || e.key === '_') target = level + 1;
    else return;

    if (target < 0 || target >= GRID_ZOOM_COLUMNS.length) return;
    e.preventDefault();
    this.zoomToLevel(target, this.hovering ? this.lastPointer : undefined);
  };
}
