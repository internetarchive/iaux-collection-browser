import type { ReactiveController, ReactiveControllerHost } from 'lit';

/** How long the pointer must rest on a tile before its preview starts. */
export const HOVER_INTENT_MS = 300;
/** Keyboard focus waits a little longer, so tabbing through tiles stays quiet. */
export const FOCUS_INTENT_MS = 600;
export const LONG_PRESS_MS = 500;
/** How long the hover info pane waits on a tile that shows previews (a bit longer than one preview cycle). */
export const PREVIEW_PANE_DELAY_MS = 5000;
const LONG_PRESS_MOVE_TOLERANCE_PX = 10;

type Activation = 'hover' | 'focus' | 'long-press';

/** The tile whose preview is currently showing. Only one is ever active. */
let current: { owner: object; stop: () => void } | undefined;

/** Whether this user and connection should see animated previews at all. */
export function previewsAllowed(): boolean {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (connection?.saveData) return false;
  if (/^(slow-)?2g$/.test(connection?.effectiveType ?? '')) return false;
  return true;
}

/**
 * Decides when a tile's preview is active: after a hover-intent delay for a
 * mouse, on keyboard focus, and on long-press for touch. Starting one preview
 * stops whichever was active before.
 */
export class TilePreviewController implements ReactiveController {
  active = false;

  private timer?: number;

  private pressOrigin?: { x: number; y: number };

  private suppressClick = false;

  private suppressTimer?: number;

  /** Whether the press in progress is the one that started the preview. */
  private pressStartedPreview = false;

  constructor(
    private host: ReactiveControllerHost & HTMLElement,
    private options: { enabled: () => boolean },
  ) {
    host.addController(this);
  }

  hostConnected(): void {
    const h = this.host;
    h.addEventListener('pointerenter', this.onPointerEnter);
    h.addEventListener('pointerleave', this.onPointerLeave);
    h.addEventListener('pointerdown', this.onPointerDown);
    h.addEventListener('pointermove', this.onPointerMove);
    h.addEventListener('pointerup', this.onPointerUp);
    h.addEventListener('pointercancel', this.onPointerCancel);
    h.addEventListener('contextmenu', this.onContextMenu);
    h.addEventListener('click', this.onClick, true);
    h.addEventListener('focusin', this.onFocusIn);
    h.addEventListener('focusout', this.onFocusOut);
    h.addEventListener('keydown', this.onKeyDown);
  }

  hostDisconnected(): void {
    const h = this.host;
    h.removeEventListener('pointerenter', this.onPointerEnter);
    h.removeEventListener('pointerleave', this.onPointerLeave);
    h.removeEventListener('pointerdown', this.onPointerDown);
    h.removeEventListener('pointermove', this.onPointerMove);
    h.removeEventListener('pointerup', this.onPointerUp);
    h.removeEventListener('pointercancel', this.onPointerCancel);
    h.removeEventListener('contextmenu', this.onContextMenu);
    h.removeEventListener('click', this.onClick, true);
    h.removeEventListener('focusin', this.onFocusIn);
    h.removeEventListener('focusout', this.onFocusOut);
    h.removeEventListener('keydown', this.onKeyDown);
    this.deactivate();
  }

  /** Stops this tile's preview and any pending start. */
  deactivate(): void {
    window.clearTimeout(this.timer);
    window.clearTimeout(this.suppressTimer);
    this.timer = undefined;
    this.pressOrigin = undefined;
    this.pressStartedPreview = false;
    document.removeEventListener(
      'pointerdown',
      this.onOutsidePointerDown,
      true,
    );
    window.removeEventListener('scroll', this.onScroll, true);
    this.removeZoomGuards();
    if (current?.owner === this.host) current = undefined;
    if (this.active) {
      this.active = false;
      this.host.requestUpdate();
    }
  }

  private schedule(how: Activation, delay: number): void {
    window.clearTimeout(this.timer);
    if (!this.options.enabled() || !previewsAllowed()) return;
    this.timer = window.setTimeout(() => this.activate(how), delay);
    this.addZoomGuards();
  }

  /**
   * A pinch (a second finger, a Safari gesture or a trackpad ctrl+wheel) is a
   * zoom, not a request for a preview, so it cancels a pending or active one.
   * The listeners only exist while a preview is pending or showing.
   */
  private addZoomGuards(): void {
    document.addEventListener('pointerdown', this.onAnyPointerDown, true);
    window.addEventListener('gesturestart', this.onZoomGesture);
    window.addEventListener('wheel', this.onWheel, { passive: true });
  }

  private removeZoomGuards(): void {
    document.removeEventListener('pointerdown', this.onAnyPointerDown, true);
    window.removeEventListener('gesturestart', this.onZoomGesture);
    window.removeEventListener('wheel', this.onWheel);
  }

  private onAnyPointerDown = (e: PointerEvent): void => {
    if (e.pointerType === 'touch' && !e.isPrimary) this.deactivate();
  };

  private onZoomGesture = (): void => {
    this.deactivate();
  };

  private onWheel = (e: WheelEvent): void => {
    if (e.ctrlKey) this.deactivate();
  };

  private activate(how: Activation): void {
    if (!this.options.enabled() || !previewsAllowed()) return;
    if (current && current.owner !== this.host) current.stop();
    current = { owner: this.host, stop: () => this.deactivate() };
    this.active = true;
    this.host.requestUpdate();
    if (how === 'long-press') {
      this.pressStartedPreview = true;
      // A touch preview stays up until the next touch elsewhere or a scroll.
      document.addEventListener('pointerdown', this.onOutsidePointerDown, true);
      window.addEventListener('scroll', this.onScroll, true);
    }
  }

  private onPointerEnter = (e: PointerEvent): void => {
    if (e.pointerType === 'touch') return;
    this.schedule('hover', HOVER_INTENT_MS);
  };

  private onPointerLeave = (e: PointerEvent): void => {
    if (e.pointerType === 'touch') return;
    this.deactivate();
  };

  private onPointerDown = (e: PointerEvent): void => {
    if (e.pointerType !== 'touch') return;
    if (!this.options.enabled() || !previewsAllowed()) return;
    this.pressStartedPreview = false;
    this.pressOrigin = { x: e.clientX, y: e.clientY };
    this.schedule('long-press', LONG_PRESS_MS);
  };

  private onPointerMove = (e: PointerEvent): void => {
    if (!this.pressOrigin) return;
    const moved = Math.hypot(
      e.clientX - this.pressOrigin.x,
      e.clientY - this.pressOrigin.y,
    );
    if (moved > LONG_PRESS_MOVE_TOLERANCE_PX) this.onPointerCancel();
  };

  /** Ends a press. If it started the preview, the click that follows is swallowed. */
  private onPointerUp = (): void => {
    if (!this.pressOrigin) return;
    this.pressOrigin = undefined;
    if (this.pressStartedPreview) {
      this.pressStartedPreview = false;
      this.suppressClick = true;
      window.clearTimeout(this.suppressTimer);
      this.suppressTimer = window.setTimeout(() => {
        this.suppressClick = false;
      }, 400);
    } else {
      window.clearTimeout(this.timer);
    }
  };

  /** A cancelled or moved press never produces a click. */
  private onPointerCancel = (): void => {
    if (!this.pressOrigin) return;
    this.pressOrigin = undefined;
    this.pressStartedPreview = false;
    window.clearTimeout(this.timer);
  };

  private onClick = (e: MouseEvent): void => {
    if (!this.suppressClick) return;
    this.suppressClick = false;
    e.preventDefault();
    e.stopPropagation();
  };

  /** Keeps the long-press from opening the browser's link menu. */
  private onContextMenu = (e: Event): void => {
    if (this.pressOrigin || this.active) e.preventDefault();
  };

  private onFocusIn = (e: FocusEvent): void => {
    const target = e.composedPath()[0] as Element | undefined;
    if (target?.matches?.(':focus-visible')) {
      this.schedule('focus', FOCUS_INTENT_MS);
    }
  };

  private onFocusOut = (): void => {
    this.deactivate();
  };

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.deactivate();
  };

  private onOutsidePointerDown = (e: PointerEvent): void => {
    if (!e.composedPath().includes(this.host)) this.deactivate();
  };

  private onScroll = (): void => {
    this.deactivate();
  };
}
