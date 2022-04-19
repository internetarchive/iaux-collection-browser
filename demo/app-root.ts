import { SearchService } from '@internetarchive/search-service';
import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import type { CollectionBrowser } from '../src/collection-browser';
import '../src/collection-browser';

@customElement('app-root')
export class AppRoot extends LitElement {
  private searchService = SearchService.default;

  private resizeObserver = new SharedResizeObserver();

  @state() private currentPage?: number;

  @state() private searchQuery?: string;

  @state() private cellWidth: number = 18;

  @state() private cellHeight: number = 29;

  @state() private rowGap: number = 1.7;

  @state() private colGap: number = 1.7;

  @query('#base-query-field') private baseQueryField!: HTMLInputElement;

  @query('#page-number-input') private pageNumberInput!: HTMLInputElement;

  @query('collection-browser') private collectionBrowser!: CollectionBrowser;

  private searchPressed(e: Event) {
    e.preventDefault();
    this.searchQuery = this.baseQueryField.value;
    if ((this.currentPage ?? 1) > 1) {
      this.collectionBrowser.goToPage(this.currentPage ?? 1);
    }
    this.currentPage = 1;
  }

  private changePagePressed(e: Event) {
    e.preventDefault();
    this.currentPage = this.pageNumberInput.valueAsNumber;
    this.collectionBrowser.goToPage(this.currentPage);
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('currentPage') && this.currentPage) {
      this.pageNumberInput.value = this.currentPage.toString();
    }

    if (changed.has('searchQuery')) {
      this.queryUpdated();
    }
  }

  private queryUpdated() {
    this.collectionBrowser.baseQuery = this.searchQuery;
  }

  render() {
    return html`
      <div id="dev-tools">
        <form @submit=${this.searchPressed}>
          Query:
          <input
            type="text"
            id="base-query-field"
            .value=${this.searchQuery ?? ''}
          />
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

        <div id="cell-controls">
          <div id="cell-size-control">
            <div>
              <label for="cell-width-slider">Minimum cell width:</label>
              <input
                type="range"
                min="10"
                max="100"
                value="18"
                step="0.1"
                id="cell-width-slider"
                @input=${this.widthChanged}
              />
              <span>${this.cellWidth}rem</span>
            </div>
            <div>
              <label for="cell-height-slider">Cell height:</label>
              <input
                type="range"
                min="10"
                max="100"
                value="29"
                step="0.1"
                id="cell-height-slider"
                @input=${this.heightChanged}
              />
              <span>${this.cellHeight}rem</span>
            </div>
            <div>
              <label for="show-outline-check">Show outlines:</label>
              <input
                type="checkbox"
                id="show-outline-check"
                @click=${this.outlineChanged}
              />
            </div>
          </div>
          <div id="cell-gap-control">
            <div>
              <label for="cell-row-gap-slider">Row gap:</label>
              <input
                type="range"
                min="0"
                max="5"
                value="1.7"
                step="0.1"
                id="cell-row-gap-slider"
                @input=${this.rowGapChanged}
              />
              <span>${this.rowGap}rem</span>
            </div>
            <div>
              <label for="cell-col-gap-slider">Col gap:</label>
              <input
                type="range"
                min="0"
                max="5"
                value="1.7"
                step="0.1"
                id="cell-col-gap-slider"
                @input=${this.colGapChanged}
              />
              <span>${this.colGap}rem</span>
            </div>
          </div>
        </div>
      </div>

      <div id="collection-browser-container">
        <collection-browser
          .baseNavigationUrl=${'https://archive.org'}
          .searchService=${this.searchService}
          .resizeObserver=${this.resizeObserver}
          @visiblePageChanged=${this.visiblePageChanged}
        >
        </collection-browser>
      </div>
    `;
  }

  private outlineChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.collectionBrowser.style.setProperty(
        '--infiniteScrollerCellOutline',
        '1px solid #33D1FF'
      );
    } else {
      this.collectionBrowser.style.removeProperty(
        '--infiniteScrollerCellOutline'
      );
    }
  }

  private rowGapChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.rowGap = parseFloat(input.value);
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserRowGap',
      `${input.value}rem`
    );
  }

  private colGapChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.colGap = parseFloat(input.value);
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserColGap',
      `${input.value}rem`
    );
  }

  private widthChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.cellWidth = parseFloat(input.value);
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserCellMinWidth',
      `${input.value}rem`
    );
  }

  private heightChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.cellHeight = parseFloat(input.value);
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

  static styles = css`
    :host {
      display: block;
    }

    input,
    button {
      font-size: 1.6rem;
    }

    collection-browser {
      margin-top: 30rem;
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

    #cell-controls {
      display: flex;
    }

    #cell-controls label {
      display: inline-block;
      width: 10rem;
    }

    #cell-gap-control {
      margin-left: 1rem;
    }
  `;
}
