import { SearchService } from '@internetarchive/search-service';
import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import {
  SortDirection,
  SortParam,
} from '@internetarchive/search-service/dist/src/search-params';
import type { CollectionBrowser } from '../src/collection-browser';
import '../src/collection-browser';
import { CollectionDisplayMode } from '../src/models';
import { SortFilterBar } from '../src/sort-filter-bar/sort-filter-bar';

@customElement('app-root')
export class AppRoot extends LitElement {
  private searchService = SearchService.default;

  @state() private currentPage?: number;

  @state() private searchQuery?: string;

  @state() private sortParam?: SortParam;

  @query('#base-query-field') private baseQueryField!: HTMLInputElement;

  @query('#page-number-input') private pageNumberInput!: HTMLInputElement;

  @query('collection-browser') private collectionBrowser!: CollectionBrowser;

  @query('sort-filter-bar') private sortFilterBar!: SortFilterBar;

  private searchPressed(e: Event) {
    e.preventDefault();
    this.searchQuery = this.baseQueryField.value;
    this.currentPage = this.pageNumberInput.valueAsNumber;
  }

  protected firstUpdated(): void {
    this.loadStateFromUrl();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('currentPage')) {
      console.debug(
        'currentPage changed',
        this.currentPage,
        changed.get('currentPage')
      );
      this.currentPageUpdated();
    }

    if (changed.has('searchQuery')) {
      console.debug(
        'searchQuery changed',
        this.searchQuery,
        changed.get('searchQuery')
      );
      this.queryUpdated();
    }

    if (changed.has('sortParam')) {
      console.debug(
        'sortParam changed',
        this.sortParam,
        changed.get('sortParam')
      );
      this.sortParamUpdated();
    }
  }

  private loadStateFromUrl() {
    const url = new URL(window.location.href);
    const pageNumber = url.searchParams.get('page');
    const searchQuery = url.searchParams.get('query');
    const sortQuery = url.searchParams.get('sort');
    if (pageNumber) {
      const parsed = parseInt(pageNumber, 10);
      this.currentPage = parsed;
    } else {
      this.currentPage = 1;
    }
    if (searchQuery) {
      this.searchQuery = searchQuery;
    } else {
      this.searchQuery = 'collection:etree';
    }
    if (sortQuery) {
      const [field, direction] = sortQuery.split(' ');
      console.debug('sort query', field, direction);
      this.sortParam = new SortParam(field, direction as SortDirection);
    } else {
      this.sortParam = new SortParam('date', 'desc');
    }
  }

  private queryUpdated() {
    this.collectionBrowser.baseQuery = this.searchQuery;
    this.updateUrl();
  }

  private currentPageUpdated() {
    if (!this.currentPage) return;
    this.pageNumberInput.value = this.currentPage.toString();
    this.collectionBrowser.initialPageNumber = this.currentPage;
    this.updateUrl();
  }

  private sortParamUpdated() {
    if (!this.sortParam) return;
    this.collectionBrowser.sortParam = this.sortParam;
    this.sortFilterBar.sortDirection = this.sortParam.direction;
    this.updateUrl();
  }

  private updateUrl() {
    const url = new URL(window.location.href);
    if (this.sortParam) {
      url.searchParams.set('sort', this.sortParam.asString);
    }

    if (this.searchQuery) {
      url.searchParams.set('query', this.searchQuery);
    }

    if (this.currentPage) {
      if (this.currentPage > 1) {
        url.searchParams.set('page', this.currentPage.toString());
      } else {
        url.searchParams.delete('page');
      }
    }

    window.history.pushState(
      {
        page: this.currentPage,
        query: this.searchQuery,
      },
      '',
      url.toString()
    );
  }

  render() {
    return html`
      <div id="dev-tools">
        <form @submit=${this.searchPressed}>
          Query:
          <input type="text" id="base-query-field" .value=${this.searchQuery} />
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

  private visiblePageChanged(e: CustomEvent<{ pageNumber: number }>) {
    const { pageNumber } = e.detail;
    if (pageNumber === this.currentPage) return;
    this.currentPage = pageNumber;
  }

  private sortDirectionChanged(e: CustomEvent<{ direction: 'asc' | 'desc' }>) {
    const sortField = this.collectionBrowser.sortParam.field;
    const sortDirection = e.detail.direction;
    console.debug('sortDirectionChanged', sortField, sortDirection);
    this.sortParam = new SortParam(sortField, sortDirection as SortDirection);
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
