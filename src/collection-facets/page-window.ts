import type { ReactiveController, ReactiveControllerHost } from 'lit';

export type PageWindowConfig = {
  /** Width in px of every column. Columns are uniform. */
  colWidth: number;

  /** Total number of columns in the dataset. */
  total: number;

  /** Pages kept mounted on each side of the visible ones. Defaults to 1. */
  buffer?: number;

  /**
   * Called each time the scroller comes to rest (or is re-laid out), with the
   * page it rests on. Fires even when that page hasn't changed.
   */
  onRest?: (page: number) => void;
};

const supportsScrollEnd = 'onscrollend' in window;

/**
 * Windowing controller for a horizontal scroller of fixed-width columns that
 * snaps to page boundaries. Tracks which pages should be in the DOM (`first`
 * through `last`) and which page the scroller last came to rest on.
 *
 * All positions are arithmetic on `colWidth`; the only measurement is the
 * scroller's width, which comes from a ResizeObserver.
 *
 * See docs/design/column-virtualization.md before changing this, especially
 * its invariants.
 */
export class PageWindow implements ReactiveController {
  /** Index of the first mounted page. */
  first = 0;

  /** Index of the last mounted page, or -1 when nothing is mounted. */
  last = -1;

  /** How many columns fit in the scroller, derived from its measured width. */
  colsPerPage = 1;

  /** The page the scroller last came to rest on. */
  currentPage = 0;

  private scroller?: HTMLElement;

  private viewportW = 0;

  private frame = 0;

  private landFrame = 0;

  private endTimer = 0;

  private ro?: ResizeObserver;

  /** Page to realign to once the host has re-rendered at a new page width. */
  private realignTo?: number;

  /** Whether to re-check the resting page once the host has re-rendered. */
  private relandAfterUpdate = false;

  constructor(
    private host: ReactiveControllerHost,
    private cfg: PageWindowConfig,
  ) {
    host.addController(this);
  }

  get pageWidth(): number {
    return this.cfg.colWidth * this.colsPerPage;
  }

  get pageCount(): number {
    return Math.ceil(this.cfg.total / this.colsPerPage);
  }

  get totalWidth(): number {
    return this.cfg.colWidth * this.cfg.total;
  }

  /**
   * Width of page `i`. Every page is `pageWidth` except a partial last page,
   * which is trimmed so that nothing extends the scroll area past `totalWidth`.
   */
  pageSpan(i: number): number {
    return Math.min(this.pageWidth, this.totalWidth - i * this.pageWidth);
  }

  /** Updates the number of columns, e.g. when the dataset is filtered. */
  setTotal(total: number): void {
    if (total === this.cfg.total) return;
    this.cfg.total = total;
    this.recompute(true);
    // The sizer hasn't resized yet, so wait for the host to render before
    // reading where the scroller rests.
    this.relandAfterUpdate = true;
  }

  /** Scrolls so that `page` sits at the start of the viewport. */
  scrollToPage(page: number, behavior: ScrollBehavior = 'auto'): void {
    const target = Math.max(0, Math.min(page, this.pageCount - 1));
    this.scroller?.scrollTo({ left: target * this.pageWidth, behavior });
  }

  /** Ref callback for the scroll container. */
  attach = (el?: Element): void => {
    const next = el instanceof HTMLElement ? el : undefined;
    if (next === this.scroller) return;
    this.detach();
    if (!next) return;

    this.scroller = next;
    next.addEventListener('scroll', this.onScroll, { passive: true });
    if (supportsScrollEnd) {
      next.addEventListener('scrollend', this.onScrollEnd);
    } else {
      next.addEventListener('scroll', this.onScrollIdle, { passive: true });
    }

    this.ro = new ResizeObserver(([e]) => this.onResize(e.contentRect.width));
    this.ro.observe(next);
  };

  hostUpdated(): void {
    const el = this.scroller;
    if (!el) return;
    // A resize changed the page width. The host has now moved the snap stubs,
    // so put the page that held the anchor column back at the start.
    if (this.realignTo !== undefined) {
      const target = this.realignTo * this.pageWidth;
      // After a layout change WebKit re-snaps to the snap point with the same
      // index as before, which is now a different column. Assigning the
      // position the scroller already has is a no-op that doesn't update that
      // index, so nudge it first.
      if (el.scrollLeft === target) el.scrollLeft = target + 1;
      el.scrollLeft = target;
      this.realignTo = undefined;
      this.relandAfterUpdate = true;
    }
    if (this.relandAfterUpdate && !this.landFrame) {
      this.relandAfterUpdate = false;
      // Next frame, so as not to update the host again from inside its update
      this.landFrame = requestAnimationFrame(() => {
        this.landFrame = 0;
        this.land();
      });
    }
  }

  hostDisconnected(): void {
    this.detach();
  }

  private detach(): void {
    const el = this.scroller;
    if (!el) return;
    el.removeEventListener('scroll', this.onScroll);
    el.removeEventListener('scroll', this.onScrollIdle);
    el.removeEventListener('scrollend', this.onScrollEnd);
    this.ro?.disconnect();
    this.ro = undefined;
    if (this.frame) cancelAnimationFrame(this.frame);
    if (this.landFrame) cancelAnimationFrame(this.landFrame);
    this.frame = 0;
    this.landFrame = 0;
    clearTimeout(this.endTimer);
    this.scroller = undefined;
  }

  private onResize(width: number): void {
    const el = this.scroller;
    if (!el) return;
    this.viewportW = width;

    const colsPerPage = Math.max(1, Math.floor(width / this.cfg.colWidth));
    if (colsPerPage === this.colsPerPage) {
      this.recompute();
      return;
    }

    // Columns never move (column c always starts at c * colWidth); only the
    // page boundaries do. Keep the leftmost visible column on screen by
    // realigning to whichever new page contains it.
    const anchorCol = Math.round(el.scrollLeft / this.cfg.colWidth);
    this.colsPerPage = colsPerPage;
    this.realignTo = Math.floor(anchorCol / colsPerPage);
    this.recompute(true);
  }

  private onScroll = (): void => {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.recompute();
    });
  };

  /** Fallback for browsers without `scrollend`: treat 120ms of quiet as rest. */
  private onScrollIdle = (): void => {
    clearTimeout(this.endTimer);
    this.endTimer = window.setTimeout(this.onScrollEnd, 120);
  };

  private onScrollEnd = (): void => {
    this.land();
  };

  private recompute(force = false): void {
    const el = this.scroller;
    if (!el) return;
    const pw = this.pageWidth;
    const buf = this.cfg.buffer ?? 1;
    const left = el.scrollLeft;
    const first = Math.max(0, Math.floor(left / pw) - buf);
    // Floor on both edges, so that first and last shift together at each page
    // boundary rather than one just before it and one just after.
    const last = Math.min(
      this.pageCount - 1,
      Math.floor((left + this.viewportW) / pw) + buf,
    );
    // Most scroll events end here: the window only changes at page boundaries
    if (!force && first === this.first && last === this.last) return;
    this.first = first;
    this.last = last;
    this.host.requestUpdate();
  }

  /** Records which page the scroller is resting on. */
  private land(): void {
    const el = this.scroller;
    if (!el) return;
    const left = el.scrollLeft;
    const maxLeft = this.totalWidth - this.viewportW;
    // A partial last page can't reach its own snap point, so resting at the
    // far end counts as landing on the last page.
    const atEnd = left >= maxLeft - 1;
    const page = atEnd ? this.pageCount - 1 : Math.round(left / this.pageWidth);
    const clamped = Math.max(0, Math.min(page, this.pageCount - 1));
    if (clamped !== this.currentPage) {
      this.currentPage = clamped;
      this.host.requestUpdate();
    }
    this.cfg.onRest?.(clamped);
  }
}
