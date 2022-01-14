import { SearchService } from '@internetarchive/search-service';
import { html, css, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import {
  SortDirection,
  SortParam,
} from '@internetarchive/search-service/dist/src/search-params';
import type { CollectionBrowser } from '../src/collection-browser';
import '../src/collection-browser';
import { CollectionDisplayMode } from '../src/models';

@customElement('app-root')
export class AppRoot extends LitElement {
  private searchService = SearchService.default;

  @query('#base-query-field') private baseQueryField!: HTMLInputElement;

  @query('#page-number-input') private pageNumberInput!: HTMLInputElement;

  @query('collection-browser') private collectionBrowser!: CollectionBrowser;

  private searchPressed(e: Event) {
    e.preventDefault();
    const baseQuery = this.baseQueryField.value;
    this.collectionBrowser.initialPageNumber =
      this.pageNumberInput.valueAsNumber;
    if (baseQuery !== this.collectionBrowser.baseQuery) {
      this.collectionBrowser.baseQuery = baseQuery;
    }
  }

  firstUpdated(): void {
    const url = new URL(window.location.href);
    const pageNumber = url.searchParams.get('page');
    const searchQuery = url.searchParams.get('query');
    if (pageNumber) {
      this.pageNumberInput.value = pageNumber;
      this.collectionBrowser.initialPageNumber = parseInt(pageNumber, 10);
    }
    if (searchQuery) {
      this.baseQueryField.value = searchQuery;
      this.collectionBrowser.baseQuery = searchQuery;
    }
  }

  render() {
    return html`
      <div id="dev-tools">
        <form @submit=${this.searchPressed}>
          Query:
          <input type="text" id="base-query-field" value="collection:etree" />
          Page: <input type="number" value="1" id="page-number-input" />
          <input type="submit" value="Search" />
        </form>

        <button
          @click=${() => {
            this.collectionBrowser.showDeleteButtons =
              !this.collectionBrowser.showDeleteButtons;
          }}
        >
          Toggle Delete Mode
        </button>

        <sort-filter-bar
          @sortDirectionChanged=${this.sortDirectionChanged}
          @displayModeChanged=${this.displayModeChanged}
        ></sort-filter-bar>
      </div>

      <collection-browser
        .baseNavigationUrl=${'https://archive.org'}
        .searchService=${this.searchService}
        .baseQuery=${'collection:etree'}
        @visiblePageChanged=${this.visiblePageChanged}
      >
      </collection-browser>
    `;
  }

  private currentPage = 1;

  private visiblePageChanged(e: CustomEvent<{ pageNumber: number }>) {
    const { pageNumber } = e.detail;
    if (pageNumber === this.currentPage) return;
    this.currentPage = pageNumber;
    const url = new URL(window.location.href);
    if (pageNumber > 1) {
      url.searchParams.set('page', pageNumber.toString());
    } else {
      url.searchParams.delete('page');
    }
    window.history.pushState({ page: pageNumber }, '', url.toString());
  }

  private sortDirectionChanged(e: CustomEvent<{ direction: 'asc' | 'desc' }>) {
    const sortField = this.collectionBrowser.sortParam.field;
    const sortDirection = e.detail.direction;
    this.collectionBrowser.sortParam = new SortParam(
      sortField,
      sortDirection as SortDirection
    );
  }

  private displayModeChanged(
    e: CustomEvent<{ displayMode: CollectionDisplayMode }>
  ) {
    this.collectionBrowser.displayMode = e.detail.displayMode;
  }

  static styles = css`
    :host {
      display: block;
    }

    input,
    button {
      font-size: 1.6rem;
    }

    collection-browser {
      margin-top: 15rem;
    }

    #base-query-field {
      width: 300px;
    }

    #dev-tools {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.9);
      padding: 0.5rem 1rem;
    }
  `;
}
