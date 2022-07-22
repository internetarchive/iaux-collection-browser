import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import arrowLeftIcon from '../assets/img/icons/arrow-left';
import arrowRightIcon from '../assets/img/icons/arrow-right';

@customElement('more-facets-pagination')
export class MoreFacetsPagination extends LitElement {
  @property({ type: Number }) paginationSize?: any | undefined;

  @property({ type: Number }) step?: any | undefined;

  @query('.page-numbers') private pageNumberElement!: HTMLElement;

  @state() currentPage = 1;

  firstUpdated() {
    this.buildPagination();
  }

  private buildPagination() {
    this.pageNumberElement.innerHTML = '';

    // Calculate the startPage and endPage.
    let startPage = this.currentPage - this.step;
    let endPage = this.currentPage + this.step;

    if (startPage <= 0) {
      endPage += -startPage + 1;
      startPage = 1;
    }

    if (endPage >= this.paginationSize) {
      startPage = Math.max(startPage - (endPage - this.paginationSize), 1);
      endPage = this.paginationSize;
    }

    // create first number node
    if (startPage > 1) {
      this.addPageNumber(1);
      this.addEllipsis();
    }

    // create middle numbers node
    for (let page = startPage; page <= endPage; page += 1) {
      this.addPageNumber(page);
    }

    // create last number node
    if (endPage < this.paginationSize) {
      this.addEllipsis();
      this.addPageNumber(this.paginationSize);
    }
  }

  private addPageNumber(page?: number) {
    const pageElement = document.createElement('button');
    pageElement.innerText = page as any;
    if (this.currentPage === page) {
      pageElement.classList.add('current');
    }

    // TODO: google analytics???
    pageElement.addEventListener('click', () => {
      this.currentPage = page as any;
      this.buildPagination();
      this.emitPageNumberClick();
    });

    this.pageNumberElement.appendChild(pageElement);
  }

  private addEllipsis() {
    const ellipsisElement = document.createElement('i');
    ellipsisElement.innerText = '...';
    this.pageNumberElement.appendChild(ellipsisElement);
  }

  private emitPageNumberClick() {
    this.dispatchEvent(
      new CustomEvent('pageNumberClicked', {
        detail: { page: this.currentPage },
      })
    );
  }

  private previousPageClicked() {
    this.currentPage -= 1;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    this.buildPagination();
    this.emitPageNumberClick();
  }

  private nextPageClicked() {
    this.currentPage += 1;
    if (this.currentPage > this.paginationSize) {
      this.currentPage = this.paginationSize;
    }
    this.buildPagination();
    this.emitPageNumberClick();
  }

  render() {
    return html`
      <div class="facets-pagination">
        <button class="arrow-icon" @click=${this.previousPageClicked}>
          ${arrowLeftIcon}
        </button>
        <div class="page-numbers"></div>
        <button class="arrow-icon" @click=${this.nextPageClicked}>
          ${arrowRightIcon}
        </button>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .facets-pagination {
        user-select: none;
        margin-top: 1rem;
        background-color: rgb(239, 239, 239);
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
        margin: 1rem;
        padding: 0.5rem;
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
    `;
  }
}
