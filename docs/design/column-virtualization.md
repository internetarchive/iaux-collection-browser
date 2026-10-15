# Horizontal column virtualization with page snapping

## Goal
A Lit component that scrolls thousands of fixed-width data columns horizontally.
Free scroll/fling during the gesture; on release, eases to the nearest page
boundary. Only a window of pages is in the DOM at any time.

## Constraints
- Dataset is fully in memory (thousands of column entries). No fetching.
- Column width is fixed and uniform. `colsPerPage` is derived from measured
  viewport width, so a page is never wider than the viewport.
- Lit + LitElement. Page count can reach the high hundreds.

## Chosen approach
Native scrolling over a full-width sizer, with absolutely positioned page
elements at computed offsets, plus CSS scroll-snap for the page easing.
Positions are pure arithmetic — no measurement, no size estimation.

### Windowing controller
```ts
export class PageWindow implements ReactiveController {
  first = 0;
  last = -1;
  private scroller?: HTMLElement;
  private viewportW = 0;
  private frame = 0;
  private ro?: ResizeObserver;

  constructor(
    private host: ReactiveControllerHost,
    private cfg: {colWidth: number; colsPerPage: number; total: number; buffer?: number}
  ) {
    host.addController(this);
  }

  get pageWidth() { return this.cfg.colWidth * this.cfg.colsPerPage; }
  get pageCount() { return Math.ceil(this.cfg.total / this.cfg.colsPerPage); }
  get totalWidth() { return this.cfg.colWidth * this.cfg.total; }

  attach = (el?: Element) => {
    if (!(el instanceof HTMLElement) || el === this.scroller) return;
    this.scroller = el;
    el.addEventListener('scroll', this.onScroll, {passive: true});
    this.ro = new ResizeObserver(([e]) => {
      this.viewportW = e.contentRect.width;
      this.recompute();
    });
    this.ro.observe(el);
  };

  private onScroll = () => {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.recompute();
    });
  };

  private recompute() {
    const pw = this.pageWidth;
    const buf = this.cfg.buffer ?? 1;
    const left = this.scroller!.scrollLeft;
    const first = Math.max(0, Math.floor(left / pw) - buf);
    const last = Math.min(this.pageCount - 1, Math.floor((left + this.viewportW) / pw) + buf);
    if (first === this.first && last === this.last) return; // most scroll events end here
    this.first = first;
    this.last = last;
    this.host.requestUpdate();
  }

  hostDisconnected() {
    this.scroller?.removeEventListener('scroll', this.onScroll);
    this.ro?.disconnect();
    if (this.frame) cancelAnimationFrame(this.frame);
  }
}
```

### Template
Snap alignment lives on permanent empty stubs, one per page, *not* on the
rendered pages. See "Snap targets" below for why.
```ts
render() {
  const w = this.win;
  const all = [];
  for (let i = 0; i < w.pageCount; i++) all.push(i);
  const live = [];
  for (let i = w.first; i <= w.last; i++) live.push(i);

  return html`
    <div class="scroller" ${ref(this.win.attach)}>
      <div class="sizer" style="width:${w.totalWidth}px">
        ${repeat(all, i => i, i => html`
          <div class="snap-stub"
               style="left:${i * w.pageWidth}px;width:${w.pageWidth}px"></div>`)}
        ${repeat(live, i => i, i => html`
          <div class="page"
               style="left:${i * w.pageWidth}px;width:${w.pageWidth}px">
            ${this.renderPage(i)}
          </div>`)}
      </div>
    </div>`;
}
```

### CSS
```css
.scroller {
  overflow-x: auto;
  overflow-y: hidden;
  contain: strict;              /* requires explicit dimensions on .scroller */
  scroll-snap-type: x mandatory;
  /* scroll-snap-stop stays at its default `normal` so a fling can cross
     many pages before resting. `always` would force one page per gesture. */
}
.sizer { position: relative; height: 100%; }
.snap-stub {
  position: absolute; top: 0; height: 100%;
  scroll-snap-align: start;
  pointer-events: none;
  contain: strict;
}
.page {
  position: absolute; top: 0; height: 100%;
  contain: content;
  content-visibility: auto;
  contain-intrinsic-size: auto none;
}
```

### Landed-page reporting
```ts
const onEnd = () => {
  this.currentPage = Math.round(el.scrollLeft / this.win.pageWidth);
};
if ('onscrollend' in window) {
  el.addEventListener('scrollend', onEnd);
} else {
  el.addEventListener('scroll', () => {
    clearTimeout(this.endTimer);
    this.endTimer = setTimeout(onEnd, 120);
  }, {passive: true});
}
```

## Invariants — do not "optimize" these away
1. **The early-out in `recompute` must stay.** Scroll fires far more often than
   the window changes. Re-render happens roughly once per page boundary
   crossed, not once per scroll event.
2. **Keyed `repeat()`, keyed by page index.** Switching to `map()` re-renders
   every live page on each window shift instead of creating one and removing one.
3. **Nothing reads layout in the scroll handler.** Viewport width comes from
   `ResizeObserver` only. No `getBoundingClientRect` on the scroll path.
4. **Cells are plain DOM inside a page component.** Do not make each cell its
   own custom element — element upgrade plus shadow-root creation will dominate
   every other cost here.

## Snap targets
The browser re-evaluates its snap target continuously as a fling decelerates.
If the target box isn't mounted, or gets unmounted by a window shift
mid-fling, the result is a visible jump or a landing on the wrong boundary —
intermittent, and only on fast flings. The stubs decouple snap geometry from
virtualization: they always exist, so the geometry is always complete. Empty,
contained, childless divs cost very little.

If page count ever reaches the tens of thousands, flip to the alternative:
move `scroll-snap-align` onto `.page`, and defer *shrinking* the window until
`scrollend` so a selected target is never unmounted while scrolling.

## Rejected alternatives (with reasons — do not substitute)
- **`@lit-labs/virtualizer`** — works horizontally via
  `flow({direction: 'horizontal'})`, but its value is measuring items of
  unknown size, which is exactly what we don't need. Still 0.7.x under the
  `@lit-labs` scope and self-described as late prerelease. Documented
  Chromium flow-layout jank from correcting size estimates during smooth
  scroll (maintainers say unfixable without replacing native scrolling with
  JS scrolling), plus a Safari first-render transform bug
  (https://github.com/lit/lit/issues/3243). Both stem from estimation.
- **TanStack Virtual** — good library, correct fallback *if column widths ever
  become variable*. Unnecessary overhead while widths are uniform.
- **`content-visibility: auto` alone** — skips layout/paint for offscreen
  pages but still creates all DOM. Used here as a second layer on top of
  windowing, not as a replacement.
- **JS-animated `scrollLeft`** — the only way to control snap easing, but it
  costs compositor-driven smoothness. Ship native snap first.

## Browser support notes
- Scroll snap: Baseline widely available since 2022 (Chrome 69, Firefox 68,
  Safari 11).
- `scrollend`: Baseline since Dec 2025 (Chrome 114, Firefox 109, Safari 26.2).
  Feature-detect with the timer fallback above if the support floor includes
  older Safari.
- `content-visibility`: Baseline 2024 (Chrome 85, Firefox 125, Safari 18);
  the web-features entry is more conservative about Safari. Treat as
  progressive enhancement — unsupported browsers just render everything.
- `scrollsnapchanging` (fires when the browser decides where it *will* land,
  useful for a live page indicator mid-fling): Chromium-only, Chrome 129+,
  no Firefox or Safari. Optional enhancement over the `scrollend` path only.

## Acceptance criteria
- [ ] Scrolling the full dataset keeps live page elements at `2*buffer + visible`;
      verify in DevTools that DOM node count stays flat.
- [ ] Performance profile during a sustained fling shows no layout thrash and
      re-render count proportional to pages crossed, not scroll events.
- [ ] Release mid-page always eases to a page boundary — test slow drag, fast
      fling across 50+ pages, trackpad, mouse wheel, and keyboard.
- [ ] Verified in Safari specifically (snap and first-render behavior).
- [ ] Resize recomputes `colsPerPage` and the window without losing position.
- [ ] `currentPage` is correct after every rest, including programmatic scrolls.

## Deferred
Page-element recycling (fixed slot pool, `pageIndex % N`, update data and
`left` in place). Only pursue if a profile shows element *creation* cost
during flings. Not needed up front.