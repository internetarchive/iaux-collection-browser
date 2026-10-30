var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, unsafeCSS, } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { guard } from 'lit/directives/guard.js';
import { ref } from 'lit/directives/ref.js';
import { repeat } from 'lit/directives/repeat.js';
import { localized, msg } from '@lit/localize';
import arrowLeftIcon from '../assets/img/icons/arrow-left';
import arrowRightIcon from '../assets/img/icons/arrow-right';
import { srOnlyStyle } from '../styles/sr-only';
import { facetRowStyles, facetRowTemplate, getFacetState, } from './facet-row-template';
import { PageWindow } from './page-window';
import { MORE_FACETS__COLUMN_WIDTH, MORE_FACETS__ROWS_PER_COLUMN, } from './models';
/** Height in px reserved below the columns for the horizontal scrollbar */
const SCROLLBAR_SIZE = 12;
/**
 * A long list of facet buckets laid out top to bottom in fixed-width columns
 * that scroll horizontally and snap to whole pages. Only the pages around the
 * viewport are in the DOM, so thousands of values stay responsive.
 *
 * Rows are plain DOM rather than `<facet-row>` elements, and one listener
 * handles every row's checkbox clicks.
 *
 * See docs/design/column-virtualization.md before changing the windowing.
 *
 * @fires facetClick - A row's checkbox was clicked. Detail: `FacetEventDetails`
 * @fires pageChanged - The scroller came to rest on a different page. Detail:
 *   the 0-based page index
 */
let MoreFacetsScroller = class MoreFacetsScroller extends LitElement {
    constructor() {
        super(...arguments);
        /** Every bucket to show, in display order */
        this.buckets = [];
        /** How many buckets to stack in each column before starting the next one */
        this.rowsPerColumn = MORE_FACETS__ROWS_PER_COLUMN;
        /**
         * Whether rows leave out their hide (eye) button, unless the value is
         * already hidden. Set it when the facet has only one value in all, since
         * hiding that would leave no results. Don't base it on how many rows are
         * showing: a filter that leaves a single row still needs its hide button.
         */
        this.omitHideButtons = false;
        this.win = new PageWindow(this, {
            colWidth: MORE_FACETS__COLUMN_WIDTH,
            total: 0,
            onRest: page => this.rested(page),
        });
        /** The last page reported in a `pageChanged` event */
        this.reportedPage = 0;
    }
    /** The page resting at the start of the viewport */
    get currentPage() {
        return this.win.currentPage;
    }
    /** How many pages the buckets span at the current width */
    get pageCount() {
        return this.win.pageCount;
    }
    /** Scrolls so that `page` rests at the start of the viewport */
    scrollToPage(page, behavior = 'auto') {
        this.win.scrollToPage(page, behavior);
    }
    willUpdate(changed) {
        if (changed.has('buckets') || changed.has('rowsPerColumn')) {
            this.win.setTotal(Math.ceil(this.buckets.length / this.rowsPerColumn));
        }
        this.keepFocusOnScreen();
    }
    render() {
        const w = this.win;
        const live = [];
        for (let i = w.first; i <= w.last; i++)
            live.push(i);
        return html `
      <div class="scroll-nav">
        ${this.arrowTemplate('prev')}
        <div class="frame">
          <div
            class="scroller"
            role="group"
            aria-label=${ifDefined(this.label)}
            tabindex=${w.pageCount > 0 ? 0 : -1}
            style="--rowsPerColumn: ${this.rowsPerColumn}"
            ${ref(w.attach)}
            @click=${this.rowClicked}
            @focusin=${this.rowFocused}
          >
            <div class="sizer" style="width:${w.totalWidth}px">
              ${guard([w.pageCount, w.pageWidth, w.totalWidth], () => this.snapStubsTemplate())}
              ${repeat(live, i => i, i => html `<div
                    class="page"
                    data-page=${i}
                    style="left:${i * w.pageWidth}px;width:${w.pageSpan(i)}px"
                  >
                    ${this.pageTemplate(i)}
                  </div>`)}
            </div>
          </div>
        </div>
        ${this.arrowTemplate('next')}
      </div>
    `;
    }
    /**
     * One empty snap target per page, always mounted. The browser keeps
     * re-picking its snap target while a fling decelerates, so the targets must
     * not come and go with the window of rendered pages.
     */
    snapStubsTemplate() {
        const w = this.win;
        const all = Array.from({ length: w.pageCount }, (_, i) => i);
        return html `${repeat(all, i => i, i => html `<div
          class="snap-stub"
          style="left:${i * w.pageWidth}px;width:${w.pageSpan(i)}px"
        ></div>`)}`;
    }
    /** The columns of rows on page `page` */
    pageTemplate(page) {
        const { facetType, buckets, rowsPerColumn } = this;
        if (!facetType)
            return [];
        const { colsPerPage } = this.win;
        const firstCol = page * colsPerPage;
        const endCol = Math.min(firstCol + colsPerPage, Math.ceil(buckets.length / rowsPerColumn));
        const columns = [];
        for (let col = firstCol; col < endCol; col++) {
            const start = col * rowsPerColumn;
            const rows = buckets.slice(start, start + rowsPerColumn);
            columns.push(html `<div class="column">
          ${rows.map(bucket => facetRowTemplate({
                facetType,
                extraFacetGroups: this.extraFacetGroups,
                bucket,
                collectionTitles: this.collectionTitles,
                omitHideButton: this.omitHideButtons,
            }))}
        </div>`);
        }
        return columns;
    }
    arrowTemplate(direction) {
        const { currentPage, pageCount } = this.win;
        const isPrev = direction === 'prev';
        const disabled = isPrev ? currentPage <= 0 : currentPage >= pageCount - 1;
        // Arrows keep their space even when there's nothing to scroll to, so that
        // showing them never changes how many columns fit.
        const classes = classMap({
            'scroll-arrow': true,
            [direction]: true,
            unneeded: pageCount <= 1,
        });
        return html `<button
      type="button"
      class=${classes}
      ?disabled=${disabled}
      aria-label=${isPrev
            ? msg('Show previous page of values')
            : msg('Show next page of values')}
      @click=${() => this.arrowClicked(isPrev ? -1 : 1)}
    >
      ${isPrev ? arrowLeftIcon : arrowRightIcon}
    </button>`;
    }
    /**
     * Handles clicks on any row's checkboxes. The rows have no listeners of
     * their own.
     */
    rowClicked(e) {
        const input = e.target;
        const { facetType } = this;
        if (!(input instanceof HTMLInputElement) || !facetType)
            return;
        const bucket = this.buckets.find(b => b.key === input.value);
        if (!bucket)
            return;
        const negative = input.classList.contains('hide-facet-checkbox');
        this.dispatchEvent(new CustomEvent('facetClick', {
            detail: {
                facetType,
                bucket: { ...bucket, state: getFacetState(input.checked, negative) },
                negative,
            },
        }));
    }
    /**
     * When focus comes into the rows from outside them, or from the scroller
     * itself (a tab stop just before the rows), keeps it on the page being
     * shown. Otherwise Tab lands on the mounted page before this one, and
     * Shift+Tab on the last one after it, and the browser scrolls there.
     * Moving from row to row is left alone, so Tab and Shift+Tab still carry on
     * into the next or previous page.
     */
    rowFocused(e) {
        const { scroller } = this;
        const row = e.target;
        if (!scroller || !(row instanceof HTMLElement) || row === scroller)
            return;
        const from = e.relatedTarget;
        const fromRows = from instanceof Node && from !== scroller && scroller.contains(from);
        if (fromRows)
            return;
        const page = Number(row.closest('.page')?.dataset.page);
        const { currentPage } = this.win;
        if (Number.isNaN(page) || page === currentPage)
            return;
        const rowsOnPage = [
            ...scroller.querySelectorAll(`.page[data-page="${currentPage}"] input`),
        ].filter(input => !input.closest('[hidden]'));
        const target = page < currentPage ? rowsOnPage[0] : rowsOnPage[rowsOnPage.length - 1];
        target?.focus({ preventScroll: true });
        // Whatever moved focus may also scroll to the row it picked: in the
        // dialog, modal-manager's focus trap already has, before this event; the
        // browser's own Tab does just after this handler returns. Put the page
        // back now, and again before the next frame is painted (and before the
        // window is recomputed, so this page stays mounted).
        this.win.scrollToPage(currentPage);
        requestAnimationFrame(() => this.win.scrollToPage(currentPage));
    }
    /**
     * If a row has focus and its page is about to leave the window, moves focus
     * to the scroller itself. Otherwise focus would fall back to the document
     * when the page is removed, and the arrow keys would stop scrolling. The
     * scroller being a tab stop matters here: modal-manager's focus trap only
     * moves Tab between tabbable elements, and from anything else it goes back
     * to the start of the dialog.
     */
    keepFocusOnScreen() {
        const focusedPage = this.shadowRoot?.activeElement?.closest('.page');
        if (!focusedPage)
            return;
        const page = Number(focusedPage.dataset.page);
        if (page >= this.win.first && page <= this.win.last)
            return;
        this.scroller?.focus({ preventScroll: true });
    }
    arrowClicked(step) {
        // Count from where an earlier click is already headed, so that clicking
        // twice quickly moves two pages.
        const from = this.pendingPage ?? this.win.currentPage;
        const target = Math.max(0, Math.min(from + step, this.win.pageCount - 1));
        this.pendingPage = target;
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        this.win.scrollToPage(target, reduceMotion ? 'auto' : 'smooth');
    }
    rested(page) {
        this.pendingPage = undefined;
        if (page === this.reportedPage)
            return;
        this.reportedPage = page;
        this.dispatchEvent(new CustomEvent('pageChanged', { detail: page }));
    }
    static get styles() {
        const colWidth = unsafeCSS(`${MORE_FACETS__COLUMN_WIDTH}px`);
        const scrollbarSize = unsafeCSS(`${SCROLLBAR_SIZE}px`);
        const ownCss = css `
      :host {
        display: block;
        --colWidth: ${colWidth};
        --facetRowHeight: 2.4rem;
      }

      .scroll-nav {
        display: flex;
        align-items: center;
      }

      .frame {
        flex: 1 1 auto;
        min-width: 0;
        container-type: inline-size;
      }

      .scroller {
        /* Fallback where round() is unsupported: fill the frame */
        width: 100%;
        /* Otherwise round down to whole columns, so none is ever cut off */
        width: max(
          round(down, 100cqi, var(--colWidth)),
          min(100cqi, var(--colWidth))
        );
        height: calc(
          var(--rowsPerColumn) * var(--facetRowHeight) + ${scrollbarSize}
        );
        margin: 0 auto;
        outline-offset: 2px;
        overflow-x: auto;
        overflow-y: hidden;
        contain: strict;
        scroll-snap-type: x mandatory;
        /* scroll-snap-stop stays at its default 'normal' so a fling can cross
           many pages before resting. 'always' would force one page per gesture. */
      }

      /* Keep the scrollbar visible, so it's clear there is more to see */
      .scroller::-webkit-scrollbar {
        height: ${scrollbarSize};
      }
      .scroller::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 6px;
      }
      .scroller::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 6px;
      }
      .scroller::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      /* Chrome ignores the rules above once these are set, so only Firefox gets them */
      @supports not selector(::-webkit-scrollbar) {
        .scroller {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }
      }

      .sizer {
        position: relative;
        height: 100%;
      }

      .snap-stub {
        position: absolute;
        top: 0;
        height: 100%;
        scroll-snap-align: start;
        pointer-events: none;
        contain: strict;
      }

      .page {
        position: absolute;
        top: 0;
        height: 100%;
        display: flex;
        contain: content;
        content-visibility: auto;
        contain-intrinsic-size: auto none;
      }

      .column {
        flex: none;
        width: var(--colWidth);
        box-sizing: border-box;
        padding: 0 0.75rem;
      }

      /* Rows are a fixed height with one line of text, so every column holds
         exactly rowsPerColumn rows. The full text is in the row's tooltip. */
      .facet-row-container {
        height: var(--facetRowHeight);
        box-sizing: border-box;
        align-items: center;
      }
      .facet-info-display {
        flex-wrap: nowrap;
        min-width: 0;
      }
      .facet-title {
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: normal;
      }
      .facet-count {
        flex: none;
        padding-left: 0.5rem;
      }

      .scroll-arrow {
        flex: none;
        width: 2.4rem;
        padding: 0.5rem;
        background: none;
        border: none;
        cursor: pointer;
      }
      .scroll-arrow svg {
        height: 14px;
        fill: #2c2c2c;
      }
      .scroll-arrow:disabled {
        opacity: 0.3;
        cursor: default;
      }
      .scroll-arrow.unneeded {
        visibility: hidden;
      }

      /* Touch screens swipe; the space is better spent on the column */
      @media (max-width: 560px) {
        .scroll-arrow {
          display: none;
        }
      }
    `;
        return [srOnlyStyle, facetRowStyles, ownCss];
    }
};
__decorate([
    property({ type: String })
], MoreFacetsScroller.prototype, "facetType", void 0);
__decorate([
    property({ type: Array, attribute: false })
], MoreFacetsScroller.prototype, "extraFacetGroups", void 0);
__decorate([
    property({ type: Array })
], MoreFacetsScroller.prototype, "buckets", void 0);
__decorate([
    property({ type: Object })
], MoreFacetsScroller.prototype, "collectionTitles", void 0);
__decorate([
    property({ type: Number })
], MoreFacetsScroller.prototype, "rowsPerColumn", void 0);
__decorate([
    property({ type: Boolean })
], MoreFacetsScroller.prototype, "omitHideButtons", void 0);
__decorate([
    property({ type: String })
], MoreFacetsScroller.prototype, "label", void 0);
__decorate([
    query('.scroller')
], MoreFacetsScroller.prototype, "scroller", void 0);
MoreFacetsScroller = __decorate([
    customElement('more-facets-scroller'),
    localized()
], MoreFacetsScroller);
export { MoreFacetsScroller };
