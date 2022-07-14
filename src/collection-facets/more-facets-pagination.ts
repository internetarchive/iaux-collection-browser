import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

@customElement('more-facets-pagination')
export class MoreFacetsPagination extends LitElement {
  @property({ type: Number }) paginationSize?: any | undefined;

  @property({ type: Number }) step?: any | undefined;

  @query('.facets-pagination') private pagination!: HTMLElement;

  @state() currentPage = 1;

  firstUpdated() {
    this.buildPagination();
  }

  private buildPagination() {
    const pageNumberFragment = document.createRange().createContextualFragment(`
      <a>&#706;</a>
      <div class="page-numbers"></div>
      <a>&#707;</a>
    `);

    const pageNumberElement = pageNumberFragment.querySelector(
      `.page-numbers`
    ) as any;

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

    // create first node
    if (startPage > 1) {
      pageNumberElement.appendChild(
        document
          .createRange()
          .createContextualFragment(
            `<a ${
              this.currentPage === 1 ? 'class="current"' : ''
            }>1</a><i>...</i>`
          )
      );
    }

    // create middle nodes
    for (let page = startPage; page <= endPage; page += 1) {
      pageNumberElement.appendChild(
        document
          .createRange()
          .createContextualFragment(
            `<a ${
              this.currentPage === page ? 'class="current"' : ''
            }>${page}</a>`
          )
      );
    }

    // create last node
    if (endPage < this.paginationSize) {
      pageNumberElement.appendChild(
        document
          .createRange()
          .createContextualFragment(
            `<i>...</i><a ${
              this.currentPage === this.paginationSize ? 'class="current"' : ''
            }>${this.paginationSize}</a>`
          )
      );
    }

    // click action on middle "a" elements
    pageNumberFragment.querySelectorAll(`.page-numbers a`).forEach(aElem => {
      aElem.addEventListener('click', e => {
        const input = e.target as HTMLInputElement;
        this.currentPage = +input.innerText;
        this.buildPagination();
        this.emitPageNumberClick();
      });
    });

    // click action on previous and next button
    const [aPrev, ...others] = pageNumberFragment.querySelectorAll<HTMLElement>(
      `a`
    ) as any;
    aPrev.addEventListener(`click`, () => {
      this.currentPage -= 1;
      if (this.currentPage < 1) {
        this.currentPage = 1;
      }
      this.buildPagination();
      this.emitPageNumberClick();
    });

    // click action on next button
    others.at(-1).addEventListener(`click`, () => {
      this.currentPage += 1;
      if (this.currentPage > this.paginationSize) {
        this.currentPage = this.paginationSize;
      }
      this.buildPagination();
      this.emitPageNumberClick();
    });

    this.pagination.innerHTML = '';
    this.pagination.append(pageNumberFragment);
  }

  private emitPageNumberClick() {
    this.dispatchEvent(
      new CustomEvent('pageNumberClicked', {
        detail: { page: this.currentPage },
      })
    );
  }

  render() {
    return html`<div class="facets-pagination"></div>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      .facets-pagination {
        user-select: none;
        margin: 1rem 0px;
        background-color: rgb(239, 239, 239);
        text-align: center;
        font-size: 3.2rem;
      }

      .facets-pagination a,
      .facets-pagination i {
        background: none;
        border: 0;
        cursor: pointer;
        border-radius: 100%;
        margin: 1rem;
        font-size: 1.4rem;
        vertical-align: middle;
        display: inline-block;
        min-width: 1.5rem;
        padding: 0.5rem;
      }
      .facets-pagination a.current {
        background: black;
        color: white;
      }

      .page-numbers {
        display: inline-block;
      }
    `;
  }
}
