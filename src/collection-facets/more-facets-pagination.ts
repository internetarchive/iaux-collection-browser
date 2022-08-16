import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
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

  observePageCount() {
    this.pages = [];
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
      this.pages?.push(0); // let's asssume 0 is for ellipsis template
    }
  }

  private createMiddelNode(startPage: number, endPage: number) {
    for (let page = startPage; page <= endPage; page += 1) {
      this.pages?.push(page);
    }
  }

  private createLastNode(endPage: number) {
    if (endPage < this.size) {
      this.pages?.push(0); // let's asssume 0 is for ellipsis template
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

  private get getPagesTemplate() {
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
        font-size: 3.2rem;
      }
      .facets-pagination button {
        border: none;
        background: none;
      }
      .facets-pagination .arrow-icon {
        width: 2.5rem;
        vertical-align: initial;
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
