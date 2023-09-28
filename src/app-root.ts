/* eslint-disable no-console */
import {
  AnalyticsEvent,
  AnalyticsManager,
} from '@internetarchive/analytics-manager';
import {
  SearchService,
  SearchServiceInterface,
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
  private searchService: SearchServiceInterface =
    this.initSearchServiceFromUrlParams();

  private resizeObserver = new SharedResizeObserver();

  private localCache = new LocalCache();

  private collectionNameCache = new CollectionNameCache({
    searchService: this.searchService,
    localCache: this.localCache,
  });

  @state() private currentPage?: number;

  @state() private searchQuery?: string;

  @state() private withinCollection?: string;

  @state() private cellWidth: number = 18;

  @state() private cellHeight: number = 29;

  @state() private rowGap: number = 1.7;

  @state() private colGap: number = 1.7;

  @state() private loggedIn: boolean = false;

  @state() private searchType: SearchType = SearchType.METADATA;

  @property({ type: Object, reflect: false }) latestAction?: AnalyticsEvent;

  @query('#base-query-field') private baseQueryField!: HTMLInputElement;

  @query('#base-collection-field')
  private baseCollectionField!: HTMLInputElement;

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
    this.analyticsManager?.sendEvent(ae);
  }

  private initSearchServiceFromUrlParams() {
    const params = new URL(window.location.href).searchParams;
    return new SearchService({
      includeCredentials: false,
      baseUrl: params.get('search_base_url') ?? undefined,
      servicePath: params.get('search_service_path') ?? undefined,
      debuggingEnabled: !!params.get('debugging') ?? undefined,
    });
  }

  private searchPressed(e: Event) {
    e.preventDefault();
    this.searchQuery = this.baseQueryField.value;
    this.collectionBrowser.searchType = this.searchType;

    this.goToCurrentPage();
  }

  private collectionChanged(e: Event) {
    e.preventDefault();
    this.withinCollection = this.baseCollectionField.value;
    this.collectionBrowser.withinCollection = this.withinCollection;

    this.goToCurrentPage();
  }

  private goToCurrentPage() {
    const page = this.currentPage ?? 1;
    if (page > 1) {
      this.collectionBrowser.goToPage(page);
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

  private get getClass() {
    const searchParams = new URLSearchParams(window.location.search);

    return searchParams.get('hide-dev-tools') ? 'hidden' : '';
  }

  render() {
    return html`
      <div class="dev-tool-container">
        <div id="dev-tools" class=${this.getClass}>
          <div id="search-and-page-inputs">
            <form @submit=${this.searchPressed}>
              <label for="base-query-field"> Query: </label>
              <input
                type="text"
                id="base-query-field"
                .value=${this.searchQuery ?? ''}
              />
              <input type="submit" value="Search" />
            </form>
            <form @submit=${this.changePagePressed}>
              <label for="page-number-input"> Page: </label>
              <input type="number" value="1" id="page-number-input" />
              <input type="submit" value="Go" />
            </form>
          </div>
          <div>
            <form @submit=${this.collectionChanged}>
              <label for="base-collection-field"> Within collection: </label>
              <input
                type="text"
                id="base-collection-field"
                .value=${this.withinCollection ?? ''}
              />
              <input type="submit" value="Search" />
            </form>
          </div>

          <div id="search-types">
            Search type:
            <span class="search-type">
              <input
                type="radio"
                id="metadata-search"
                name="search-type"
                value="metadata"
                .checked=${this.searchType === SearchType.METADATA}
                @click=${this.searchTypeSelected}
              />
              <label for="metadata-search">Metadata</label>
            </span>
            <span class="search-type">
              <input
                type="radio"
                id="fulltext-search"
                name="search-type"
                value="fulltext"
                .checked=${this.searchType === SearchType.FULLTEXT}
                @click=${this.searchTypeSelected}
              />
              <label for="fulltext-search">Full text</label>
            </span>
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
                <label for="cell-width-slider">Min cell width:</label>
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
          <div id="checkbox-controls">
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="show-outline-check"
                @click=${this.outlineChanged}
              />
              <label for="show-outline-check">Show cell outlines</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="show-facet-group-outline-check"
                @click=${this.toggleFacetGroupOutline}
              />
              <label for="show-facet-group-outline-check">
                Show facet group outlines
              </label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="simulate-login"
                @click=${this.loginChanged}
              />
              <label for="simulate-login">Simulate login</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="show-dummy-snippets"
                @click=${this.snippetsChanged}
              />
              <label for="show-dummy-snippets">Show dummy snippets</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="show-dummy-reviews"
                @click=${this.reviewsChanged}
              />
              <label for="show-dummy-snippets">Show dummy reviews</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-date-picker"
                checked
                @click=${this.datePickerChanged}
              />
              <label for="enable-date-picker">Enable date picker</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-management"
                @click=${this.manageModeCheckboxChanged}
              />
              <label for="enable-management">Enable manage mode</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-facet-top-view"
                @click=${this.facetTopViewCheckboxChanged}
              />
              <label for="enable-facet-top-view">Show facet top view</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-cb-top-view"
                @click=${this.cbToViewCheckboxChanged}
              />
              <label for="enable-cb-top-view">Show CB top view</label>
            </div>
          </div>
        </div>
        <button id="toggle-dev-tools-btn" @click=${this.toggleDevTools}>
          Toggle Search Controls
        </button>
      </div>
      <div id="collection-browser-container">
        <collection-browser
          .baseNavigationUrl=${'https://archive.org'}
          .baseImageUrl=${'https://archive.org'}
          .searchService=${this.searchService}
          .resizeObserver=${this.resizeObserver}
          .collectionNameCache=${this.collectionNameCache}
          .showHistogramDatePicker=${true}
          .loggedIn=${this.loggedIn}
          .modalManager=${this.modalManager}
          .analyticsHandler=${this.analyticsHandler}
          @visiblePageChanged=${this.visiblePageChanged}
          @baseQueryChanged=${this.baseQueryChanged}
          @searchTypeChanged=${this.searchTypeChanged}
          @manageModeChanged=${this.manageModeChanged}
        >
        </collection-browser>
      </div>
      <modal-manager></modal-manager>
    `;
  }

  private baseQueryChanged(e: CustomEvent<{ baseQuery?: string }>): void {
    this.searchQuery = e.detail.baseQuery;
  }

  /** Handler for search type changes coming from collection browser */
  private searchTypeChanged(e: CustomEvent<SearchType>): void {
    this.searchType = e.detail;
  }

  /** Handler for user input selecting a search type */
  private searchTypeSelected(e: Event) {
    const target = e.target as HTMLInputElement;
    this.searchType =
      target.value === 'fulltext' ? SearchType.FULLTEXT : SearchType.METADATA;
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

  private toggleDevTools() {
    const pageUrl = new URL(window.location.href);
    const { searchParams } = pageUrl;

    if (searchParams.get('hide-dev-tools')) {
      searchParams.delete('hide-dev-tools');
    } else {
      searchParams.set('hide-dev-tools', 'true');
    }

    this.shadowRoot?.getElementById('dev-tools')?.classList.toggle('hidden');

    if (window.history.replaceState) {
      window.history.replaceState(
        {
          path: pageUrl.toString(),
        },
        '',
        pageUrl.toString()
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

  private async reviewsChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      // Decorate the default search service with a wrapper that adds
      // dummy reviews to any successful searches
      this.searchService = {
        async search(params, searchType) {
          const searchResponse = await SearchService.default.search(
            params,
            searchType
          );
          searchResponse.success?.response.results.forEach(result => {
            Object.defineProperty(result, 'review', {
              value: {
                id: '12345',
                title: 'My Great Review',
                body: 'This item is really great and that is why I am leaving this review on it and giving it all five of the review stars. '.repeat(
                  10
                ),
                starRating: 5,
              },
            });
          });
          return searchResponse;
        },
      };
    } else {
      // Restore the default seach service
      this.searchService = SearchService.default;
    }

    // Re-perform the current search to show/hide the reviews immediately
    this.reperformCurrentSearch();
  }

  private async reperformCurrentSearch(): Promise<void> {
    const oldQuery = this.searchQuery;
    this.searchQuery = '-'; // Should just reset to the placeholder
    await this.updateComplete;
    // For unclear reasons, Safari refuses to re-apply the old query until the next tick, hence:
    await new Promise(res => {
      setTimeout(res, 0);
    });
    this.searchQuery = oldQuery; // Re-apply the original query
  }

  private datePickerChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    this.collectionBrowser.showHistogramDatePicker = target.checked;

    // When disabling the date picker from the demo app, also clear any existing date range params
    if (!this.collectionBrowser.showHistogramDatePicker) {
      this.collectionBrowser.minSelectedDate = undefined;
      this.collectionBrowser.maxSelectedDate = undefined;
    }
  }

  /**
   * Handler for when collection browser's manage mode changes.
   * This lets us disable the checkbox in the dev panel when the user cancels out
   * of manage mode from within collection browser.
   */
  private manageModeChanged(e: CustomEvent<boolean>): void {
    const manageCheckbox = this.shadowRoot?.querySelector(
      '#enable-management'
    ) as HTMLInputElement;
    if (manageCheckbox) manageCheckbox.checked = e.detail;
  }

  /**
   * Handler for when the dev panel's "Enable manage mode" checkbox is changed.
   */
  private manageModeCheckboxChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    this.collectionBrowser.isManageView = target.checked;
  }

  /**
   * Handler for when the dev panel's "Show facet top view" checkbox is changed.
   */
  private facetTopViewCheckboxChanged(e: Event) {
    const target = e.target as HTMLInputElement;

    const p = document.createElement('p');
    p.style.setProperty('border', '1px solid #000');
    p.textContent = 'New stuff as a child.';
    p.style.setProperty('height', '20rem');
    p.style.backgroundColor = '#00000';
    p.setAttribute('slot', 'facet-top-slot');

    if (target.checked) {
      this.collectionBrowser.appendChild(p);
    } else {
      this.collectionBrowser.removeChild(
        this.collectionBrowser.lastElementChild as Element
      );
    }
  }

  /**
   * Handler for when the dev panel's "Show cb top view" checkbox is changed.
   */
  private cbToViewCheckboxChanged(e: Event) {
    const target = e.target as HTMLInputElement;

    const p = document.createElement('p');
    p.style.setProperty('border', '1px solid #000');
    p.textContent = 'My Favorite list header.';
    p.style.setProperty('height', '10rem');
    p.style.backgroundColor = '#00000';
    p.setAttribute('slot', 'cb-top-slot');

    if (target.checked) {
      this.collectionBrowser.appendChild(p);
    } else {
      this.collectionBrowser.removeChild(
        this.collectionBrowser.lastElementChild as Element
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
    modal-manager.expanded-date-picker {
      --modalWidth: 58rem;
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

    modal-manager.showFacetGroupOutlines,
    collection-browser.showFacetGroupOutlines {
      --facet-row-border-top: 1px solid red;
      --facet-row-border-bottom: 1px solid blue;
    }

    collection-browser {
      /* Same as production */
      max-width: 135rem;
      margin: auto;
    }

    #collection-browser-container {
      /* Same as production */
      padding-left: 0.5rem;
      margin-bottom: 2rem;
    }

    #base-query-field {
      width: 300px;
    }

    .dev-tool-container {
      position: relative;
    }
    #dev-tools {
      position: relative;
      top: 0;
      left: 0;
      z-index: 1;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1rem;
      border: 1px solid black;
      font-size: 1.4rem;
      width: 75%;
      background: #ffffffb3;
    }

    #dev-tools > * {
      display: flex;
    }

    #toggle-dev-tools-btn {
      position: fixed;
      left: 77.4%;
      top: 0;
      background: red;
      padding: 5px;
      color: white;
      font-size: 1.4rem;
      margin: 0;
      z-index: 1;
      cursor: pointer;
    }

    #search-and-page-inputs {
      flex-wrap: wrap;
      row-gap: 2px;
    }

    #search-and-page-inputs > form {
      margin-right: 1rem;
    }

    #search-and-page-inputs label {
      display: inline-block;
      min-width: 50px;
    }

    #page-number-input {
      width: 75px;
    }

    .search-type {
      margin-right: 1rem;
    }

    #cell-controls {
      display: flex;
      flex-wrap: wrap;
    }

    #cell-controls label {
      display: inline-block;
      width: 10rem;
    }

    #cell-size-control,
    #cell-gap-control {
      flex-basis: calc(50% - 1rem);
      flex-grow: 1;
    }

    #cell-gap-control {
      margin-left: 1rem;
    }

    #checkbox-controls {
      padding-top: 0.5rem;
      flex-wrap: wrap;
    }

    .checkbox-control {
      flex-basis: 50%;
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
