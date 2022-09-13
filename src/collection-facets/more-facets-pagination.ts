import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import arrowLeftIcon from '../assets/img/icons/arrow-left';
import arrowRightIcon from '../assets/img/icons/arrow-right';

@customElement('more-facets-pagination')
export class MoreFacetsPagination extends LitElement {
  /**
   * Total number of pages
   */
  @property({ type: Number }) size?: any | undefined;

  /**
   * Number of pages can be moved in back/forward
   */
  @property({ type: Number }) step = 2;

  @state() pages?: number[] = [];

  @state() currentPage = 1;

  firstUpdated() {
    this.observePageCount();
  }

  /** creates `this.pages` array that notes which pages to draw
   * - `0` is elipses marker
   * - rule: selected page is centered between -2/+2 pages
   * - outlier: first page selected, show _1_ 2 3 ... N
   * - outlier: second page selected, show 1 _2_ 3 4 ... N
   * - outlier: last page selected, show 1 ... N-2 N-1 _N_
   * - outlier: if page count = 7, & selected is either [2, 3, 4, 5, 6], show all pages
   */
  observePageCount() {
    this.pages = []; /* `0` is elipses marker */

    const paginatorMaxPagesToShow = 7;
    const atMinThreshold = this.size <= paginatorMaxPagesToShow;

    /** Display outliers  */
    if (this.size < 5) {
      // display all pages
      this.pages = [...Array(this.size).keys()].map(i => i + 1);
      return;
    }

    if (this.currentPage === 1) {
      // first page
      this.pages = [1, 2, 3, 0, this.size];
      return;
    }

    if (this.currentPage === this.size) {
      // last page
      this.pages = [1, 0, this.size - 2, this.size - 1, this.size];
      return;
    }

    if (this.currentPage === 2 && this.size === paginatorMaxPagesToShow) {
      this.pages = [1, 2, 3, 4, 0, this.size];
      return;
    }

    if (this.currentPage === 6 && this.size === paginatorMaxPagesToShow) {
      this.pages = [1, 0, 4, 5, this.size - 1, this.size];
      return;
    }

    if (
      atMinThreshold &&
      this.currentPage > 1 &&
      this.currentPage < paginatorMaxPagesToShow
    ) {
      this.pages = [...Array(this.size).keys()].map(i => i + 1);
      return;
    }

    /* The rest here calculates the range to display in "page window" */
    let startPage = this.currentPage - this.step;
    let endPage = this.currentPage + this.step;

    if (startPage <= 0) {
      endPage += -startPage + 1;
      startPage = 1;
    }

    if (endPage >= this.size) {
      startPage = Math.max(startPage - (endPage - this.size), 1);
      endPage = this.size;
    }

    if (startPage === 2) {
      endPage -= 1;
    }

    if (endPage === this.size - 1) {
      startPage += 1;
    }

    // create first page node
    this.createFirstNode(startPage);

    // create middle pages node
    this.createMiddelNode(startPage, endPage);

    // create last page node
    this.createLastNode(endPage);
  }

  private createFirstNode(startPage: number) {
    if (startPage > 1) {
      this.pages?.push(1);
    }
    if (startPage > 2) {
      this.pages?.push(0); // let's asssume 0 is for ellipsis template
    }
  }

  private createMiddelNode(startPage: number, endPage: number) {
    for (let page = startPage; page <= endPage; page += 1) {
      this.pages?.push(page);
    }
  }

  private createLastNode(endPage: number) {
    if (endPage < this.size - 1) {
      this.pages?.push(0); // let's asssume 0 is for ellipsis template
    }
    if (endPage < this.size) {
      this.pages?.push(this.size);
    }
  }

  private get getEllipsisTemplate() {
    return html`<i>...</i>`;
  }

  private emitPageClick() {
    this.dispatchEvent(
      new CustomEvent('pageNumberClicked', {
        detail: { page: this.currentPage },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onRewind() {
    this.currentPage -= 1;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    this.observePageCount();
    this.emitPageClick();
  }

  private onForward() {
    this.currentPage += 1;
    if (this.currentPage > this.size) {
      this.currentPage = this.size;
    }
    this.observePageCount();
    this.emitPageClick();
  }

  private onChange(page: number) {
    this.currentPage = page;
    this.observePageCount();
    this.emitPageClick();
  }

  private getPageTemplate(page: number) {
    return html`
      <button
        @click="${() => this.onChange(page)}"
        class="${this.currentPage === page ? 'current' : nothing}"
      >
        ${page}
      </button>
    `;
  }

  private get getPagesTemplate(): TemplateResult | typeof nothing {
    if (!this.pages || !this.pages.length) {
      return nothing;
    }

    return html`
      ${this.pages?.map(
        page =>
          html`${page !== 0
            ? this.getPageTemplate(page)
            : this.getEllipsisTemplate}`
      )}
    `;
  }

  render() {
    return html`
      <div class="facets-pagination">
        <button class="arrow-icon" @click=${this.onRewind}>
          <span class="sr-only">Rewind pagination:</span>
          ${arrowLeftIcon}
        </button>
        <div class="page-numbers">${this.getPagesTemplate}</div>
        <button class="arrow-icon" @click=${this.onForward}>
          <span class="sr-only">Forward pagination:</span>
          ${arrowRightIcon}
        </button>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .facets-pagination {
        user-select: none;
        margin-top: 10px;
        background-color: #eee;
        text-align: center;
      }
      .facets-pagination button {
        border: none;
        background: none;
      }
      .facets-pagination .arrow-icon {
        width: 2.5rem;
        vertical-align: middle;
      }
      .facets-pagination .arrow-icon svg {
        height: 14px;
      }
      .facets-pagination button,
      .facets-pagination i {
        background: none;
        border: 0;
        cursor: pointer;
        border-radius: 100%;
        margin: 10px;
        padding: 5px;
        font-size: 1.4rem;
        vertical-align: middle;
        display: inline-block;
        min-width: 2.5rem;
      }
      .facets-pagination i {
        cursor: auto;
        display: inline;
      }
      .facets-pagination button.current {
        background: black;
        color: white;
      }
      .page-numbers {
        display: inline-block;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    `;
  }
}
