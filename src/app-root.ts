/* eslint-disable no-console */
import {
  AnalyticsEvent,
  AnalyticsManager,
} from '@internetarchive/analytics-manager';
import {
  SearchService,
  SearchType,
  StringField,
} from '@internetarchive/search-service';
import { LocalCache } from '@internetarchive/local-cache';
import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { CollectionNameCache } from '@internetarchive/collection-name-cache';

import type { ModalManagerInterface } from '@internetarchive/modal-manager';
import type { AnalyticsManagerInterface } from '@internetarchive/analytics-manager';
import type { CollectionBrowser } from '../src/collection-browser';

import '../src/collection-browser';

@customElement('app-root')
export class AppRoot extends LitElement {
  private searchService = SearchService.default;

  private resizeObserver = new SharedResizeObserver();

  private localCache = new LocalCache();

  private collectionNameCache = new CollectionNameCache({
    searchService: this.searchService,
    localCache: this.localCache,
  });

  @state() private currentPage?: number;

  @state() private searchQuery?: string;

  @state() private cellWidth: number = 18;

  @state() private cellHeight: number = 29;

  @state() private rowGap: number = 1.7;

  @state() private colGap: number = 1.7;

  @state() private loggedIn: boolean = false;

  @state() private searchType: SearchType = SearchType.METADATA;

  @property({ type: Object, reflect: false }) latestAction?: AnalyticsEvent;

  @query('#base-query-field') private baseQueryField!: HTMLInputElement;

  @query('#page-number-input') private pageNumberInput!: HTMLInputElement;

  @query('collection-browser') private collectionBrowser!: CollectionBrowser;

  @query('modal-manager') private modalManager!: ModalManagerInterface;

  private analyticsManager = new AnalyticsManager();

  private analyticsHandler: AnalyticsManagerInterface = {
    sendPing: this.sendAnalytics.bind(this),
    sendEvent: this.sendAnalytics.bind(this),
    sendEventNoSampling: this.sendAnalytics.bind(this),
  };

  private sendAnalytics(ae: AnalyticsEvent) {
    console.log('Analytics Received ----', ae);
    this.latestAction = ae;
    this.analyticsManager?.sendEventNoSampling(ae);
  }

  private searchPressed(e: Event) {
    e.preventDefault();
    this.searchQuery = this.baseQueryField.value;
    if ((this.currentPage ?? 1) > 1) {
      this.collectionBrowser.goToPage(this.currentPage ?? 1);
    }
  }

  private changePagePressed(e: Event) {
    e.preventDefault();
    this.currentPage = this.pageNumberInput.valueAsNumber;
    this.collectionBrowser.goToPage(this.currentPage);
  }

  protected override updated(changed: PropertyValues): void {
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
        <div id="search-and-page-inputs">
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
        </div>

        <div id="search-types">
          Search type:
          <input
            type="radio"
            id="metadata-search"
            name="search-type"
            value="metadata"
            checked
            @click=${this.searchTypeChanged}
          />
          <label for="metadata-search">Metadata</label>
          <input
            type="radio"
            id="fulltext-search"
            name="search-type"
            value="fulltext"
            @click=${this.searchTypeChanged}
          />
          <label for="fulltext-search">Full text</label>
        </div>

        <div id="toggle-controls">
          <button
            @click=${() => {
              const details =
                this.shadowRoot?.getElementById('cell-size-control');
              details?.classList.toggle('hidden');
              const rowGapControls =
                this.shadowRoot?.getElementById('cell-gap-control');
              rowGapControls?.classList.toggle('hidden');
            }}
          >
            Toggle Cell Controls
          </button>
          <button
            @click=${() => {
              const details = this.shadowRoot?.getElementById(
                'latest-event-details'
              );
              details?.classList.toggle('hidden');
            }}
          >
            Last Event Captured
          </button>
        </div>

        <div id="last-event">
          <pre id="latest-event-details" class="hidden">
            ${JSON.stringify(this.latestAction, null, 2)}
          </pre
          >
        </div>

        <div id="cell-controls" class="hidden">
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
            <div>
              <label for="show-facet-group-outline-check"
                >Show Facet Group Outlines:</label
              >
              <input
                type="checkbox"
                id="show-facet-group-outline-check"
                @click=${this.toggleFacetGroupOutline}
              />
            </div>
            <div>
              <label for="simulate-login">Simulate Login:</label>
              <input
                type="checkbox"
                id="simulate-login"
                @click=${this.loginChanged}
              />
            </div>
            <div>
              <label for="show-dummy-snippets">Show dummy snippets:</label>
              <input
                type="checkbox"
                id="show-dummy-snippets"
                @click=${this.snippetsChanged}
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
          .baseImageUrl=${'https://archive.org'}
          .searchService=${this.searchService}
          .searchType=${this.searchType}
          .resizeObserver=${this.resizeObserver}
          .collectionNameCache=${this.collectionNameCache}
          .showHistogramDatePicker=${true}
          .loggedIn=${this.loggedIn}
          .modalManager=${this.modalManager}
          .analyticsHandler=${this.analyticsHandler}
          @visiblePageChanged=${this.visiblePageChanged}
          @baseQueryChanged=${this.baseQueryChanged}
        >
        </collection-browser>
      </div>
      <modal-manager></modal-manager>
    `;
  }

  private baseQueryChanged(e: CustomEvent<{ baseQuery?: string }>) {
    this.searchQuery = e.detail.baseQuery;
  }

  private searchTypeChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    this.searchType =
      target.value === 'fulltext' ? SearchType.FULLTEXT : SearchType.METADATA;

    // Re-perform the current search with the new search target
    this.reperformCurrentSearch();
  }

  private loginChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
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

  private toggleFacetGroupOutline(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.collectionBrowser.classList.add('showFacetGroupOutlines');
      this.modalManager.classList.add('showFacetGroupOutlines');
    } else {
      this.collectionBrowser.classList.remove('showFacetGroupOutlines');
      this.modalManager.classList.remove('showFacetGroupOutlines');
    }
  }

  private async snippetsChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      // Decorate the default search service with a wrapper that adds
      // dummy snippets to any successful searches
      this.searchService = {
        async search(params, searchType) {
          const searchResponse = await SearchService.default.search(
            params,
            searchType
          );
          searchResponse.success?.response.results.forEach(result => {
            Object.defineProperty(result, 'highlight', {
              value: new StringField([
                'this is a text {{{snippet}}} block with potentially',
                'multiple {{{snippets}}} and such',
                'but the {{{snippet}}} block may be quite long perhaps',
                'depending on how many {{{snippet}}} matches there are',
                'there may be multiple lines of {{{snippets}}} to show',
                'but each {{{snippet}}} should be relatively short',
                'and {{{snippets}}} are each a {{{snippet}}} of text',
                'but every {{{snippet}}} might have multiple matches',
                'the {{{snippets}}} should be separated and surrounded by ellipses',
              ]),
            });
          });
          return searchResponse;
        },
      };
    } else {
      // Restore the default seach service
      this.searchService = SearchService.default;
    }

    // Re-perform the current search to show/hide the snippets immediately
    this.reperformCurrentSearch();
  }

  private async reperformCurrentSearch(): Promise<void> {
    const oldQuery = this.searchQuery;
    this.searchQuery = ''; // Should just reset to the placeholder
    await this.updateComplete;
    // For unclear reasons, Safari refuses to re-apply the old query until the next tick, hence:
    await new Promise(res => {
      setTimeout(res, 0);
    });
    this.searchQuery = oldQuery; // Re-apply the original query
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
      --primaryButtonBGColor: #194880;
      --ia-theme-link-color: #4b64ff;
    }

    /* add the following styles to ensure proper modal visibility */
    body.modal-manager-open {
      overflow: hidden;
    }
    modal-manager {
      display: none;
    }
    modal-manager[mode='open'] {
      display: block;
    }
    modal-manager.more-search-facets {
      --modalWidth: 85rem;
      --modalBorder: 2px solid var(--primaryButtonBGColor, #194880);
      --modalTitleLineHeight: 4rem;
      --modalTitleFontSize: 1.8rem;
      --modalCornerRadius: 0;
      --modalBottomPadding: 0;
      --modalBottomMargin: 0;
      --modalScrollOffset: 0;
      --modalCornerRadius: 0.5rem;
    }

    input,
    button {
      font-size: 1.6rem;
    }

    collection-browser {
      margin-top: 20rem;
    }

    modal-manager.showFacetGroupOutlines,
    collection-browser.showFacetGroupOutlines {
      --facet-row-border-top: 1px solid red;
      --facet-row-border-bottom: 1px solid blue;
    }

    #base-query-field {
      width: 300px;
    }

    #dev-tools {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1rem;
      border: 1px solid black;
      font-size: 1.4rem;
    }

    #dev-tools > * {
      display: flex;
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

    #last-event {
      background-color: aliceblue;
      padding: 5px;
      margin: 5px auto;
    }

    .hidden {
      display: none;
    }

    #toggle-controls {
      background-color: lightskyblue;
      padding: 5px;
      margin: 5px auto;
    }

    #search-types {
      margin: 5px auto;
      background-color: aliceblue;
      font-size: 1.6rem;
    }
  `;
}