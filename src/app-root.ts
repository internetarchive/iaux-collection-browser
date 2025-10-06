import {
  AnalyticsEvent,
  AnalyticsManager,
} from '@internetarchive/analytics-manager';
import {
  SearchService,
  SearchServiceInterface,
  SearchType,
} from '@internetarchive/search-service';
import { html, css, LitElement, PropertyValues, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';

import type { ModalManagerInterface } from '@internetarchive/modal-manager';
import type { AnalyticsManagerInterface } from '@internetarchive/analytics-manager';
import type { CollectionBrowser } from '../src/collection-browser';

import '../src/collection-browser';

@customElement('app-root')
export class AppRoot extends LitElement {
  private searchService: SearchServiceInterface =
    this.initSearchServiceFromUrlParams();

  private resizeObserver = new SharedResizeObserver();

  @state() private toggleSlots: boolean = false;

  @state() private currentPage?: number;

  @state() private searchQuery?: string;

  @state() private withinCollection?: string;

  @state() private cellWidth: number = 18;

  @state() private cellHeight: number = 29;

  @state() private rowGap: number = 1.7;

  @state() private colGap: number = 1.7;

  @state() private suppressFacets: boolean = false;

  @state() private lazyLoadFacets: boolean = false;

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
      debuggingEnabled: !!params.get('debugging'),
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
                id="default-search"
                name="search-type"
                value="default"
                .checked=${this.searchType === SearchType.DEFAULT}
                @click=${this.searchTypeSelected}
              />
              <label for="default-search">Default</label>
            </span>
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
            <span class="search-type">
              <input
                type="radio"
                id="tv-search"
                name="search-type"
                value="tv"
                .checked=${this.searchType === SearchType.TV}
                @click=${this.searchTypeSelected}
              />
              <label for="tv-search">TV</label>
            </span>
            <span class="search-type">
              <input
                type="radio"
                id="radio-search"
                name="search-type"
                value="radio"
                .checked=${this.searchType === SearchType.RADIO}
                @click=${this.searchTypeSelected}
              />
              <label for="radio-search">Radio</label>
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
                  'latest-event-details',
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

          <fieldset class="cell-controls">
            <legend>Cell Controls</legend>
            <div>
              <label for="cell-width-slider">Cell width:</label>
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
          </fieldset>

          <fieldset class="other-controls">
            <legend>Other Controls</legend>
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
                id="enable-date-picker"
                checked
                @click=${this.datePickerChanged}
              />
              <label for="enable-date-picker">Enable date picker</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-facets"
                checked
                @click=${this.facetsChanged}
              />
              <label for="enable-facets">Enable facets</label>
            </div>
            <div class="checkbox-control indent">
              <input
                type="checkbox"
                id="lazy-load-facets"
                ?disabled=${this.suppressFacets}
                @click=${this.lazyLoadFacetsChanged}
              />
              <label for="lazy-load-facets">Lazy load facets</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-management"
                @click=${this.manageModeCheckboxChanged}
              />
              <label for="enable-management">Enable manage mode</label>
            </div>
            <div class="checkbox-control indent">
              <input
                type="checkbox"
                id="enable-search-management"
                @click=${this.SearchManageModeCheckboxChanged}
              />
              <label for="enable-search-management">Search</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-smart-facet-bar"
                @click=${this.smartFacetBarCheckboxChanged}
              />
              <label for="enable-smart-facet-bar">Enable smart facet bar</label>
            </div>
          </fieldset>

          <fieldset class="cb-visual-appearance">
            <legend>CB Visual Appearance</legend>
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
                id="show-outline-check"
                @click=${this.outlineChanged}
              />
              <label for="show-outline-check">Show cell outlines</label>
            </div>
          </fieldset>

          <fieldset class="user-profile-controls">
            <legend>User Profile Controls</legend>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-facet-top-slot"
                @click=${this.facetTopSlotCheckboxChanged}
              />
              <label for="enable-facet-top-slot">Show facet top slot</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-cb-top-slot"
                @click=${this.cbTopSlotCheckboxChanged}
              />
              <label for="enable-cb-top-slot">Show CB top slot</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-sortbar-left-slot"
                @click=${this.sortBarLeftSlotCheckboxChanged}
              />
              <label for="enable-sortbar-left-slot"
                >Show sortbar left slot</label
              >
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-sortbar-right-slot"
                @click=${this.sortBarRightSlotCheckboxChanged}
              />
              <label for="enable-sortbar-right-slot"
                >Show sortbar right slot</label
              >
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-result-last-tile-slot"
                @click=${this.resultLastTileSlotCheckboxChanged}
              />
              <label for="enable-result-last-tile-slot">
                Show result last tile slot
              </label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-replaced-sort-options"
                @click=${this.replaceSortOptionsChanged}
              />
              <label for="enable-replaced-sort-options">
                Show replaced sort options
              </label>
            </div>
          </fieldset>

          <fieldset class="user-profile-controls">
            <legend>Set Placeholder Types</legend>
            <div class="checkbox-control">
              <input
                id="enable-loading-placeholder"
                type="radio"
                @click=${() => this.setPlaceholderType('loading-placeholder')}
                name="placeholder-radio"
              />
              <label for="enable-loading-placeholder"
                >Loading Placeholder</label
              >
            </div>
            <div class="checkbox-control">
              <input
                id="enable-empty-placeholder"
                type="radio"
                @click=${() => this.setPlaceholderType('error-placeholder')}
                value="empty-placeholder"
                name="placeholder-radio"
              />
              <label for="enable-empty-placeholder">Empty Placeholder</label>
            </div>
          </fieldset>
        </div>
        <button id="toggle-dev-tools-btn" @click=${this.toggleDevTools}>
          Toggle Search Controls
        </button>
      </div>
      <div id="collection-browser-container">
        <collection-browser
          facetPaneVisible
          .baseNavigationUrl=${'https://archive.org'}
          .baseImageUrl=${'https://archive.org'}
          .searchService=${this.searchService}
          .resizeObserver=${this.resizeObserver}
          .showHistogramDatePicker=${true}
          .suppressFacets=${this.suppressFacets}
          .lazyLoadFacets=${this.lazyLoadFacets}
          .loggedIn=${this.loggedIn}
          .modalManager=${this.modalManager}
          .analyticsHandler=${this.analyticsHandler}
          .pageContext=${'search'}
          @visiblePageChanged=${this.visiblePageChanged}
          @baseQueryChanged=${this.baseQueryChanged}
          @searchTypeChanged=${this.searchTypeChanged}
          @manageModeChanged=${this.manageModeChanged}
          @itemRemovalRequested=${this.handleItemRemovalRequest}
          @itemManagerRequested=${this.handleItemManagerRequest}
        >
          ${this.toggleSlots
            ? html`<div slot="sortbar-left-slot">Sort Slot</div>`
            : nothing}
          ${this.toggleSlots
            ? html`<div slot="facet-top-slot">Facet Slot</div>`
            : nothing}
        </collection-browser>
      </div>
      <modal-manager></modal-manager>
    `;
  }

  private async setPlaceholderType(type: string) {
    switch (type) {
      case 'loading-placeholder':
        this.collectionBrowser.baseQuery = '';
        this.collectionBrowser.suppressPlaceholders = true;
        this.collectionBrowser.clearResultsOnEmptyQuery = true;
        this.requestUpdate();
        await this.collectionBrowser.updateComplete;
        break;
      default:
        break;
    }
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
    this.searchType = this.searchTypeFromSelectedOption(target.value);
  }

  private searchTypeFromSelectedOption(option: string): SearchType {
    switch (option) {
      case 'metadata':
        return SearchType.METADATA;
      case 'fulltext':
        return SearchType.FULLTEXT;
      case 'tv':
        return SearchType.TV;
      case 'radio':
        return SearchType.RADIO;
      default:
        return SearchType.DEFAULT;
    }
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
        '1px solid #33D1FF',
      );
    } else {
      this.collectionBrowser.style.removeProperty(
        '--infiniteScrollerCellOutline',
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
        pageUrl.toString(),
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

  private datePickerChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    this.collectionBrowser.showHistogramDatePicker = target.checked;

    // When disabling the date picker from the demo app, also clear any existing date range params
    if (!this.collectionBrowser.showHistogramDatePicker) {
      this.collectionBrowser.minSelectedDate = undefined;
      this.collectionBrowser.maxSelectedDate = undefined;
    }
  }

  private facetsChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    this.suppressFacets = !target.checked;
  }

  private lazyLoadFacetsChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    this.lazyLoadFacets = target.checked;
  }

  /**
   * Handler for when collection browser's manage mode changes.
   * This lets us disable the checkbox in the dev panel when the user cancels out
   * of manage mode from within collection browser.
   */
  private manageModeChanged(e: CustomEvent<boolean>): void {
    const manageCheckbox = this.shadowRoot?.querySelector(
      '#enable-management',
    ) as HTMLInputElement;
    if (manageCheckbox) manageCheckbox.checked = e.detail;
  }

  /**
   * Handler for item removal
   */
  private handleItemRemovalRequest(e: CustomEvent) {
    this.collectionBrowser.showRemoveItemsProcessingModal();
    console.log('itemRemovalRequested: ', e.detail.items);

    setTimeout(() => {
      // execute item-removal-service, and response is successfully deleted
      const status = false;

      if (status) {
        // looking for success?
        this.collectionBrowser.isManageView = false;
        this.modalManager?.closeModal();
        this.modalManager?.classList.remove('remove-items');
      } else {
        // looking for failure?
        this.collectionBrowser.showRemoveItemsErrorModal();
      }
    }, 2000); // let's wait to see processing modal
  }

  /**
   * Handler when item manage requested
   */
  private handleItemManagerRequest(e: CustomEvent) {
    console.log('itemManagerRequested: ', e.detail.items);
  }

  /**
   * Handler for when the dev panel's "Enable manage mode" checkbox is changed.
   */
  private manageModeCheckboxChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    this.collectionBrowser.isManageView = target.checked;
    this.collectionBrowser.manageViewLabel =
      'Select items to remove (customizable texts)';
  }

  /**
   * Handler when the dev panel's "Enable manage mode -> Search" checkbox is changed.
   */
  private SearchManageModeCheckboxChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    this.collectionBrowser.pageContext = target.checked
      ? 'search'
      : 'collection';
  }

  /**
   * Handler for when the dev panel's "Enable smart facet bar" checkbox is changed.
   */
  private smartFacetBarCheckboxChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    this.collectionBrowser.showSmartFacetBar = target.checked;
  }

  /**
   * Handler for when the dev panel's "Show facet top slot" checkbox is changed.
   */
  private facetTopSlotCheckboxChanged(e: Event) {
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
        this.collectionBrowser.lastElementChild as Element,
      );
    }
  }

  private toggleSlotOptions() {
    this.toggleSlots = !this.toggleSlots;
  }

  private resultLastTileSlotCheckboxChanged(e: Event) {
    const target = e.target as HTMLInputElement;

    const div = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = 'Upload';

    div.setAttribute('slot', 'result-last-tile');
    div.setAttribute('class', 'result-last-tile');
    div.appendChild(title);

    if (target.checked) {
      this.collectionBrowser.appendChild(div);
    } else {
      this.collectionBrowser.removeChild(
        this.collectionBrowser.lastElementChild as Element,
      );
    }
  }

  /**
   * Handler for when the dev panel's "Show cb top slot" checkbox is changed.
   */
  private cbTopSlotCheckboxChanged(e: Event) {
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
        this.collectionBrowser.lastElementChild as Element,
      );
    }
  }

  /**
   * Handler for when the dev panel's "Show sort bar top left slot" checkbox is changed.
   */
  private sortBarLeftSlotCheckboxChanged(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      const div = document.createElement('div');
      div.style.setProperty('border', '1px solid #000');
      div.textContent = 'Btn';
      div.style.setProperty('height', '3rem');
      div.style.setProperty('width', '3rem');
      div.setAttribute('slot', 'sort-options-left');

      this.collectionBrowser.appendChild(div);
    } else {
      const slottedEl = this.collectionBrowser.querySelector(
        '[slot="sort-options-left"]',
      );
      if (slottedEl) this.collectionBrowser.removeChild(slottedEl);
    }
  }

  /**
   * Handler for when the dev panel's "Show sort bar top right slot" checkbox is changed.
   */
  private sortBarRightSlotCheckboxChanged(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      const div = document.createElement('div');
      div.style.setProperty('border', '1px solid #000');
      div.textContent = 'Search bar';
      div.style.setProperty('height', '3rem');
      div.style.setProperty('width', '15rem');
      div.setAttribute('slot', 'sort-options-right');

      this.collectionBrowser.appendChild(div);
    } else {
      const slottedEl = this.collectionBrowser.querySelector(
        '[slot="sort-options-right"]',
      );
      if (slottedEl) this.collectionBrowser.removeChild(slottedEl);
    }
  }

  private rowGapChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.rowGap = parseFloat(input.value);
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserRowGap',
      `${input.value}rem`,
    );
  }

  private colGapChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.colGap = parseFloat(input.value);
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserColGap',
      `${input.value}rem`,
    );
  }

  private widthChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.cellWidth = parseFloat(input.value);
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserCellMinWidth',
      `${input.value}rem`,
    );
  }

  private heightChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.cellHeight = parseFloat(input.value);
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserCellMinHeight',
      `${input.value}rem`,
    );
    this.collectionBrowser.style.setProperty(
      '--collectionBrowserCellMaxHeight',
      `${input.value}rem`,
    );
  }

  private visiblePageChanged(e: CustomEvent<{ pageNumber: number }>) {
    const { pageNumber } = e.detail;
    if (pageNumber === this.currentPage) return;
    this.currentPage = pageNumber;
  }

  /**
   * Handler for when the dev panel's "Replace sort options" checkbox is changed.
   */
  private replaceSortOptionsChanged(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      const p = document.createElement('p');
      p.style.setProperty('border', '1px solid #000');
      p.textContent = 'New stuff as a child.';
      p.style.setProperty('height', '20px');
      p.setAttribute('slot', 'sort-options');

      this.collectionBrowser.appendChild(p);
      this.collectionBrowser.enableSortOptionsSlot = true;
    } else {
      const slottedEl = this.collectionBrowser.querySelector(
        '[slot="sort-options"]',
      );
      if (slottedEl) this.collectionBrowser.removeChild(slottedEl);
      this.collectionBrowser.enableSortOptionsSlot = false;
    }
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
    modal-manager.remove-items {
      --modalWidth: 58rem;
      --modalBorder: 2px solid var(--primaryButtonBGColor, #194880);
      --modalTitleLineHeight: 4rem;
      --modalTitleFontSize: 1.8rem;
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

    .cell-controls {
      display: flex;
      flex-wrap: wrap;
    }
    .cell-controls div {
      display: flex;
      align-items: center;
    }
    .cell-controls input[type='range'] {
      width: 120px;
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
    .checkbox-control.indent {
      margin-left: 10px;
    }
    .checkbox-control label {
      user-select: none;
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

    // slots
    div[slot='cb-top-slot'] {
      height: 50px;
      border: 1px solid red;
      background: bisque;
    }
    div[slot='facet-top-slot'] {
      border: 1px solid red;
      width: 100%;
      height: 150px;
      background-color: darkseagreen;
    }
    div[slot='sort-slot-left'] {
      height: 50px;
      border: 1px solid red;
      background: bisque;
    }

    /* user profile controls */
    .user-profile-controls {
      width: fit-content;
    }

    fieldset {
      display: inline-block !important;
    }

    .result-last-tile {
      border-radius: 4px;
      background-color: white;
      border: 3px dashed #555;
      box-shadow: none;
      display: grid;
      align-content: center;
    }
    .result-last-tile:hover {
      box-shadow: rgba(8, 8, 32, 0.8) 0 0 6px 2px;
      transition: box-shadow 0.1s ease 0s;
      cursor: pointer;
      border: 3px dashed #4b64ff;
    }
    .result-last-tile h3 {
      margin-bottom: 4rem;
      margin: 0px auto;
      font-size: 2.8rem;
      color: rgb(44, 44, 44);
      font-weight: 200;
      text-align: center;
    }
  `;
}
