import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

@customElement('more-facets-pagination')
export class MoreFacetsPagination extends LitElement {
  @property({ type: Number }) startPage?: number;

  @property({ type: Number }) step?: any | undefined;

  @property({ type: Number }) paginationSize?: any | undefined;

  @query('.facets-paging') private pagination!: HTMLElement;

  @state() page = 1;

  firstUpdated() {
    this.buildPagination();
  }

  private buildPagination() {
    const pageNumberFragment = document.createRange().createContextualFragment(`
      <a>&#9668;</a>
      <div class="page-numbers"></div>
      <a>&#9658;</a>
    `);

    const pageNumberElement = pageNumberFragment.querySelector(
      `.page-numbers`
    ) as any;

    // Calculate the startPage and endPage.
    let startPage = this.page - this.step;
    let endPage = this.page + this.step;

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
            `<a ${this.page === 1 ? 'class="current"' : ''}>1</a><i>...</i>`
          )
      );
    }

    // create middle nodes
    for (let page = startPage; page <= endPage; page += 1) {
      pageNumberElement.appendChild(
        document
          .createRange()
          .createContextualFragment(
            `<a ${this.page === page ? 'class="current"' : ''}>${page}</a>`
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
              this.page === this.paginationSize ? 'class="current"' : ''
            }>${this.paginationSize}</a>`
          )
      );
    }

    // click action on middle "a" elements
    pageNumberFragment.querySelectorAll(`.page-numbers a`).forEach(aElem => {
      aElem.addEventListener('click', e => {
        const input = e.target as HTMLInputElement;
        this.page = +input.innerText;
        this.buildPagination();
        this.emitPageNumberClick();
      });
    });

    // click action on previous and next button
    const [aPrev, ...others] = pageNumberFragment.querySelectorAll<HTMLElement>(
      `a`
    ) as any;
    aPrev.addEventListener(`click`, () => {
      this.page -= 1;
      if (this.page < 1) {
        this.page = 1;
      }
      this.buildPagination();
      this.emitPageNumberClick();
    });

    // click action on next button
    others.at(-1).addEventListener(`click`, () => {
      this.page += 1;
      if (this.page > this.paginationSize) {
        this.page = this.paginationSize;
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
        detail: { page: this.page },
      })
    );
  }

  render() {
    return html`<div class="facets-paging"></div>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      .facets-paging {
        user-select: none;
        margin: 1rem 0px;
        background-color: rgb(239, 239, 239);
        text-align: center;
        font-size: 3.2rem;
      }

      .facets-paging a,
      .facets-paging i {
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

      .page-numbers {
        display: inline-block;
      }

      .facets-paging a.current {
        background: black;
        color: white;
      }
    `;
  }
}
