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
    this.currentPage = 1;
    this.collectionBrowser.goToPage(this.currentPage ?? 1);
  }

  private changePagePressed(e: Event) {
    e.preventDefault();
    this.currentPage = this.pageNumberInput.valueAsNumber;
    this.collectionBrowser.goToPage(this.currentPage);
  }

  protected firstUpdated(): void {
    this.loadStateFromUrl();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('currentPage') && this.currentPage) {
      this.pageNumberInput.value = this.currentPage.toString();
      this.updateUrl();
    }

    if (changed.has('searchQuery')) {
      this.queryUpdated();
    }

    if (changed.has('sortParam')) {
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
      this.collectionBrowser.goToPage(parsed);
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
      this.sortParam = new SortParam(field, direction as SortDirection);
    } else {
      this.sortParam = new SortParam('date', 'desc');
    }
  }

  private queryUpdated() {
    this.collectionBrowser.baseQuery = this.searchQuery;
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
          <input type="submit" value="Search" />
        </form>

        <form @submit=${this.changePagePressed}>
          Page: <input type="number" value="1" id="page-number-input" />
          <input type="submit" value="Go" />
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

        <div>
          Cell width:
          <input
            type="range"
            min="10"
            max="100"
            value="18"
            step="0.1"
            @input=${this.widthChanged}
          />
          Cell height:
          <input
            type="range"
            min="10"
            max="100"
            value="29"
            step="0.1"
            @input=${this.heightChanged}
          />
        </div>
      </div>

      <collection-browser
        .baseNavigationUrl=${'https://archive.org'}
        .searchService=${this.searchService}
        @visiblePageChanged=${this.visiblePageChanged}
      >
      </collection-browser>
    `;
  }

  private widthChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserCellMinWidth',
      `${input.value}rem`
    );
  }

  private heightChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserCellMinHeight',
      `${input.value}rem`
    );
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserCellMaxHeight',
      `${input.value}rem`
    );
  }

  private visiblePageChanged(e: CustomEvent<{ pageNumber: number }>) {
    const { pageNumber } = e.detail;
    if (pageNumber === this.currentPage) return;
    this.currentPage = pageNumber;
  }

  private sortDirectionChanged(e: CustomEvent<{ direction: 'asc' | 'desc' }>) {
    const sortField = this.collectionBrowser.sortParam?.field ?? 'date';
    const sortDirection = e.detail.direction;
    this.sortParam = new SortParam(sortField, sortDirection as SortDirection);
    this.currentPage = 1;
    this.collectionBrowser.goToPage(this.currentPage);
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
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1rem;
      border: 1px solid black;
    }
  `;
}
