var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AnalyticsManager, } from '@internetarchive/analytics-manager';
import { SearchService, SearchType, } from '@internetarchive/search-service';
import { html, css, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import '../src/collection-browser';
import './serverless-search/demo/serverless-search-demo';
let AppRoot = class AppRoot extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * `?search_service=etd` shows the serverless search demo instead: the ETD
         * theses & dissertations index, searched in the browser with no backend,
         * in its own collection-browser under its own controls (see
         * serverless-search-demo.ts). The index is read through the dev server's
         * /etd-index and /item-index/<id>/ proxies (see vite.config.ts).
         */
        this.isEtdSearch = new URL(window.location.href).searchParams.get('search_service') === 'etd';
        this.searchService = this.initSearchServiceFromUrlParams();
        this.resizeObserver = new SharedResizeObserver();
        this.toggleSlots = false;
        this.cellWidth = 18;
        this.cellHeight = 29;
        this.rowGap = 1.7;
        this.colGap = 1.7;
        this.suppressFacets = false;
        this.lazyLoadFacets = false;
        this.loggedIn = false;
        this.searchType = SearchType.METADATA;
        this.analyticsManager = new AnalyticsManager();
        this.analyticsHandler = {
            sendPing: this.sendAnalytics.bind(this),
            sendEvent: this.sendAnalytics.bind(this),
            sendEventNoSampling: this.sendAnalytics.bind(this),
        };
    }
    /**
     * The search service's own facets and whether it can search by filters
     * alone, for one that declares them (any serverless search does).
     */
    get declaredSearch() {
        const service = this.searchService;
        return service.extraFacetGroups
            ? service
            : undefined;
    }
    /** The collection-browser the dev tools drive: the demo's, in the ETD demo. */
    get collectionBrowser() {
        return this.serverlessDemo?.collectionBrowser ?? this.ownCollectionBrowser;
    }
    sendAnalytics(ae) {
        console.log('Analytics Received ----', ae);
        this.latestAction = ae;
        this.analyticsManager?.sendEvent(ae);
    }
    initSearchServiceFromUrlParams() {
        const params = new URL(window.location.href).searchParams;
        return new SearchService({
            includeCredentials: false,
            baseUrl: params.get('search_base_url') ?? undefined,
            servicePath: params.get('search_service_path') ?? undefined,
            debuggingEnabled: !!params.get('debugging'),
        });
    }
    searchPressed(e) {
        e.preventDefault();
        this.searchQuery = this.baseQueryField.value;
        this.collectionBrowser.searchType = this.searchType;
        this.goToCurrentPage();
    }
    collectionChanged(e) {
        e.preventDefault();
        this.withinCollection = this.baseCollectionField.value;
        this.collectionBrowser.withinCollection = this.withinCollection;
        this.goToCurrentPage();
    }
    goToCurrentPage() {
        const page = this.currentPage ?? 1;
        if (page > 1) {
            this.collectionBrowser.goToPage(page);
        }
        else {
            // Ensure we reset the initial page
            this.collectionBrowser.initialPageNumber = 1;
        }
    }
    changePagePressed(e) {
        e.preventDefault();
        this.currentPage = this.pageNumberInput.valueAsNumber;
        this.collectionBrowser.goToPage(this.currentPage);
    }
    updated(changed) {
        if (changed.has('currentPage') && this.currentPage) {
            this.pageNumberInput.value = this.currentPage.toString();
        }
        if (changed.has('searchQuery')) {
            this.queryUpdated();
        }
    }
    queryUpdated() {
        this.collectionBrowser.baseQuery = this.searchQuery;
    }
    get getClass() {
        return this.devToolsHidden ? 'hidden' : '';
    }
    /**
     * Whether the search controls are hidden: `hide-dev-tools` says so, and
     * without it they start hidden for the ETD demo, which has its own box.
     */
    get devToolsHidden() {
        const param = new URLSearchParams(window.location.search).get('hide-dev-tools');
        if (param === null)
            return this.isEtdSearch;
        return !!param && param !== 'false';
    }
    render() {
        return html `
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
            const details = this.shadowRoot?.getElementById('cell-size-control');
            details?.classList.toggle('hidden');
            const rowGapControls = this.shadowRoot?.getElementById('cell-gap-control');
            rowGapControls?.classList.toggle('hidden');
        }}
            >
              Toggle Cell Controls
            </button>
            <button
              @click=${() => {
            const details = this.shadowRoot?.getElementById('latest-event-details');
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
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-tile-actions"
                @click=${this.tileActionsCheckboxChanged}
              />
              <label for="enable-tile-actions"
                >Enable tile action buttons</label
              >
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
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="minimal-tiles-check"
                @click=${this.minimalTilesChanged}
              />
              <label for="minimal-tiles-check">Minimal tile layouts</label>
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
            <div class="text-input-control">
              <label for="within-profile-input">withinProfile</label>
              <input
                type="text"
                id="within-profile-input"
                placeholder="e.g. @foobar"
                @change=${(e) => {
            const val = e.target.value.trim();
            this.withinProfile = val || undefined;
        }}
              />
            </div>
            <details class="profile-element-controls">
              <summary>
                Profile tab
                (profileElement)${this.profileElement
            ? html `: <strong>${this.profileElement}</strong>`
            : ''}
              </summary>
              <div class="profile-element-options">
                <div class="checkbox-control">
                  <input
                    type="radio"
                    id="profile-none"
                    name="profile-element"
                    value=""
                    checked
                    @click=${this.profileElementChanged}
                  />
                  <label for="profile-none">None</label>
                </div>
                ${[
            'uploads',
            'favorites',
            'reviews',
            'collections',
            'lending',
            'web_archives',
            'forum_posts',
        ].map(tab => html `
                    <div class="checkbox-control">
                      <input
                        type="radio"
                        id="profile-${tab}"
                        name="profile-element"
                        value="${tab}"
                        @click=${this.profileElementChanged}
                      />
                      <label for="profile-${tab}">${tab}</label>
                    </div>
                  `)}
              </div>
            </details>
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
      ${this.isEtdSearch
            ? html `<serverless-search-demo
            .analyticsHandler=${this.analyticsHandler}
          ></serverless-search-demo>`
            : this.collectionBrowserTemplate}
      <modal-manager></modal-manager>
    `;
    }
    get collectionBrowserTemplate() {
        return html `
      <div id="collection-browser-container">
        <collection-browser
          facetPaneVisible
          .extraFacetGroups=${this.declaredSearch?.extraFacetGroups ?? []}
          ?allowFilterOnlySearch=${!!this.declaredSearch?.allowFilterOnlySearch}
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
          .withinProfile=${this.withinProfile}
          .profileElement=${this.profileElement}
          .pageContext=${'search'}
          @visiblePageChanged=${this.visiblePageChanged}
          @baseQueryChanged=${this.baseQueryChanged}
          @searchTypeChanged=${this.searchTypeChanged}
          @manageModeChanged=${this.manageModeChanged}
          @itemRemovalRequested=${this.handleItemRemovalRequest}
          @itemManagerRequested=${this.handleItemManagerRequest}
          @tileActionClicked=${this.handleTileActionClicked}
        >
          ${this.toggleSlots
            ? html `<div slot="sortbar-left-slot">Sort Slot</div>`
            : nothing}
          ${this.toggleSlots
            ? html `<div slot="facet-top-slot">Facet Slot</div>`
            : nothing}
        </collection-browser>
      </div>
    `;
    }
    async setPlaceholderType(type) {
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
    baseQueryChanged(e) {
        this.searchQuery = e.detail.baseQuery;
    }
    /** Handler for search type changes coming from collection browser */
    searchTypeChanged(e) {
        this.searchType = e.detail;
    }
    /** Handler for user input selecting a search type */
    searchTypeSelected(e) {
        const target = e.target;
        this.searchType = this.searchTypeFromSelectedOption(target.value);
    }
    searchTypeFromSelectedOption(option) {
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
    loginChanged(e) {
        const target = e.target;
        if (target.checked) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
    }
    outlineChanged(e) {
        const target = e.target;
        if (target.checked) {
            this.collectionBrowser.style.setProperty('--infiniteScrollerCellOutline', '1px solid #33D1FF');
        }
        else {
            this.collectionBrowser.style.removeProperty('--infiniteScrollerCellOutline');
        }
    }
    minimalTilesChanged(e) {
        const target = e.target;
        const scroller = this.collectionBrowser?.shadowRoot.querySelector('infinite-scroller');
        const tileDispatchers = [
            ...scroller.shadowRoot.querySelectorAll('tile-dispatcher'),
        ];
        if (target.checked) {
            tileDispatchers?.forEach(tile => (tile.layoutType = 'minimal'));
        }
        else {
            tileDispatchers?.forEach(tile => (tile.layoutType = 'default'));
        }
    }
    toggleDevTools() {
        const pageUrl = new URL(window.location.href);
        const { searchParams } = pageUrl;
        // Leave the param off when the new state is the default.
        const hide = !this.devToolsHidden;
        if (hide === this.isEtdSearch) {
            searchParams.delete('hide-dev-tools');
        }
        else {
            searchParams.set('hide-dev-tools', String(hide));
        }
        this.shadowRoot?.getElementById('dev-tools')?.classList.toggle('hidden');
        if (window.history.replaceState) {
            window.history.replaceState({
                path: pageUrl.toString(),
            }, '', pageUrl.toString());
        }
    }
    toggleFacetGroupOutline(e) {
        const target = e.target;
        if (target.checked) {
            this.collectionBrowser.classList.add('showFacetGroupOutlines');
            this.modalManager.classList.add('showFacetGroupOutlines');
        }
        else {
            this.collectionBrowser.classList.remove('showFacetGroupOutlines');
            this.modalManager.classList.remove('showFacetGroupOutlines');
        }
    }
    datePickerChanged(e) {
        const target = e.target;
        this.collectionBrowser.showHistogramDatePicker = target.checked;
        // When disabling the date picker from the demo app, also clear any existing date range params
        if (!this.collectionBrowser.showHistogramDatePicker) {
            this.collectionBrowser.minSelectedDate = undefined;
            this.collectionBrowser.maxSelectedDate = undefined;
        }
    }
    facetsChanged(e) {
        const target = e.target;
        this.suppressFacets = !target.checked;
    }
    lazyLoadFacetsChanged(e) {
        const target = e.target;
        this.lazyLoadFacets = target.checked;
    }
    /**
     * Handler for when collection browser's manage mode changes.
     * This lets us disable the checkbox in the dev panel when the user cancels out
     * of manage mode from within collection browser.
     */
    manageModeChanged(e) {
        const manageCheckbox = this.shadowRoot?.querySelector('#enable-management');
        if (manageCheckbox)
            manageCheckbox.checked = e.detail;
    }
    /**
     * Handler for item removal
     */
    handleItemRemovalRequest(e) {
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
            }
            else {
                // looking for failure?
                this.collectionBrowser.showRemoveItemsErrorModal();
            }
        }, 2000); // let's wait to see processing modal
    }
    /**
     * Handler when item manage requested
     */
    handleItemManagerRequest(e) {
        console.log('itemManagerRequested: ', e.detail.items);
    }
    /**
     * Handler for when the dev panel's "Enable manage mode" checkbox is changed.
     */
    manageModeCheckboxChanged(e) {
        const target = e.target;
        this.collectionBrowser.isManageView = target.checked;
        this.collectionBrowser.manageViewLabel =
            'Select items to remove (customizable texts)';
    }
    /**
     * Handler when the dev panel's "Enable manage mode -> Search" checkbox is changed.
     */
    SearchManageModeCheckboxChanged(e) {
        const target = e.target;
        this.collectionBrowser.pageContext = target.checked
            ? 'search'
            : 'collection';
    }
    /**
     * Handler for when the dev panel's "Enable smart facet bar" checkbox is changed.
     */
    smartFacetBarCheckboxChanged(e) {
        const target = e.target;
        this.collectionBrowser.showSmartFacetBar = target.checked;
    }
    /**
     * Handler for when the dev panel's "Enable tile action buttons" checkbox is changed.
     */
    tileActionsCheckboxChanged(e) {
        const target = e.target;
        this.collectionBrowser.tileActions = target.checked
            ? [{ id: 'demo-action', label: 'Return' }]
            : [];
    }
    /**
     * Handler for tile action button clicks (logs to console for QA).
     */
    handleTileActionClicked(e) {
        console.log('Tile action clicked:', e.detail.actionId, e.detail.model);
    }
    /**
     * Handler for when the dev panel's "Show facet top slot" checkbox is changed.
     */
    facetTopSlotCheckboxChanged(e) {
        const target = e.target;
        const p = document.createElement('p');
        p.style.setProperty('border', '1px solid #000');
        p.textContent = 'New stuff as a child.';
        p.style.setProperty('height', '20rem');
        p.style.backgroundColor = '#00000';
        p.setAttribute('slot', 'facet-top-slot');
        if (target.checked) {
            this.collectionBrowser.appendChild(p);
        }
        else {
            this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild);
        }
    }
    toggleSlotOptions() {
        this.toggleSlots = !this.toggleSlots;
    }
    resultLastTileSlotCheckboxChanged(e) {
        const target = e.target;
        const div = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = 'Upload';
        div.setAttribute('slot', 'result-last-tile');
        div.setAttribute('class', 'result-last-tile');
        div.appendChild(title);
        if (target.checked) {
            this.collectionBrowser.appendChild(div);
        }
        else {
            this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild);
        }
    }
    /**
     * Handler for when the dev panel's "Show cb top slot" checkbox is changed.
     */
    cbTopSlotCheckboxChanged(e) {
        const target = e.target;
        const p = document.createElement('p');
        p.style.setProperty('border', '1px solid #000');
        p.textContent = 'My Favorite list header.';
        p.style.setProperty('height', '10rem');
        p.style.backgroundColor = '#00000';
        p.setAttribute('slot', 'cb-top-slot');
        if (target.checked) {
            this.collectionBrowser.appendChild(p);
        }
        else {
            this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild);
        }
    }
    /**
     * Handler for when the dev panel's "Show sort bar top left slot" checkbox is changed.
     */
    sortBarLeftSlotCheckboxChanged(e) {
        const target = e.target;
        if (target.checked) {
            const div = document.createElement('div');
            div.style.setProperty('border', '1px solid #000');
            div.textContent = 'Btn';
            div.style.setProperty('height', '3rem');
            div.style.setProperty('width', '3rem');
            div.setAttribute('slot', 'sort-options-left');
            this.collectionBrowser.appendChild(div);
        }
        else {
            const slottedEl = this.collectionBrowser.querySelector('[slot="sort-options-left"]');
            if (slottedEl)
                this.collectionBrowser.removeChild(slottedEl);
        }
    }
    /**
     * Handler for when the dev panel's "Show sort bar top right slot" checkbox is changed.
     */
    sortBarRightSlotCheckboxChanged(e) {
        const target = e.target;
        if (target.checked) {
            const div = document.createElement('div');
            div.style.setProperty('border', '1px solid #000');
            div.textContent = 'Search bar';
            div.style.setProperty('height', '3rem');
            div.style.setProperty('width', '15rem');
            div.setAttribute('slot', 'sort-options-right');
            this.collectionBrowser.appendChild(div);
        }
        else {
            const slottedEl = this.collectionBrowser.querySelector('[slot="sort-options-right"]');
            if (slottedEl)
                this.collectionBrowser.removeChild(slottedEl);
        }
    }
    rowGapChanged(e) {
        const input = e.target;
        this.rowGap = parseFloat(input.value);
        this.collectionBrowser.style.setProperty('--collectionBrowserRowGap', `${input.value}rem`);
    }
    colGapChanged(e) {
        const input = e.target;
        this.colGap = parseFloat(input.value);
        this.collectionBrowser.style.setProperty('--collectionBrowserColGap', `${input.value}rem`);
    }
    widthChanged(e) {
        const input = e.target;
        this.cellWidth = parseFloat(input.value);
        this.collectionBrowser.style.setProperty('--collectionBrowserCellMinWidth', `${input.value}rem`);
    }
    heightChanged(e) {
        const input = e.target;
        this.cellHeight = parseFloat(input.value);
        this.collectionBrowser.style.setProperty('--collectionBrowserCellMinHeight', `${input.value}rem`);
        this.collectionBrowser.style.setProperty('--collectionBrowserCellMaxHeight', `${input.value}rem`);
    }
    visiblePageChanged(e) {
        const { pageNumber } = e.detail;
        if (pageNumber === this.currentPage)
            return;
        this.currentPage = pageNumber;
    }
    /**
     * Handler for when the dev panel's "Replace sort options" checkbox is changed.
     */
    replaceSortOptionsChanged(e) {
        const target = e.target;
        if (target.checked) {
            const p = document.createElement('p');
            p.style.setProperty('border', '1px solid #000');
            p.textContent = 'New stuff as a child.';
            p.style.setProperty('height', '20px');
            p.setAttribute('slot', 'sort-options');
            this.collectionBrowser.appendChild(p);
            this.collectionBrowser.enableSortOptionsSlot = true;
        }
        else {
            const slottedEl = this.collectionBrowser.querySelector('[slot="sort-options"]');
            if (slottedEl)
                this.collectionBrowser.removeChild(slottedEl);
            this.collectionBrowser.enableSortOptionsSlot = false;
        }
    }
    profileElementChanged(e) {
        const input = e.target;
        this.profileElement = input.value || undefined;
    }
    static { this.styles = css `
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
      --modalBottomPadding: 0;
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

    .profile-element-controls {
      margin-top: 4px;
    }

    .profile-element-controls summary {
      cursor: pointer;
      user-select: none;
    }

    .profile-element-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 8px;
      margin-top: 4px;
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
  `; }
};
__decorate([
    state()
], AppRoot.prototype, "searchService", void 0);
__decorate([
    state()
], AppRoot.prototype, "toggleSlots", void 0);
__decorate([
    state()
], AppRoot.prototype, "currentPage", void 0);
__decorate([
    state()
], AppRoot.prototype, "searchQuery", void 0);
__decorate([
    state()
], AppRoot.prototype, "withinCollection", void 0);
__decorate([
    state()
], AppRoot.prototype, "cellWidth", void 0);
__decorate([
    state()
], AppRoot.prototype, "cellHeight", void 0);
__decorate([
    state()
], AppRoot.prototype, "rowGap", void 0);
__decorate([
    state()
], AppRoot.prototype, "colGap", void 0);
__decorate([
    state()
], AppRoot.prototype, "suppressFacets", void 0);
__decorate([
    state()
], AppRoot.prototype, "lazyLoadFacets", void 0);
__decorate([
    state()
], AppRoot.prototype, "loggedIn", void 0);
__decorate([
    state()
], AppRoot.prototype, "searchType", void 0);
__decorate([
    state()
], AppRoot.prototype, "profileElement", void 0);
__decorate([
    state()
], AppRoot.prototype, "withinProfile", void 0);
__decorate([
    property({ type: Object, reflect: false })
], AppRoot.prototype, "latestAction", void 0);
__decorate([
    query('#base-query-field')
], AppRoot.prototype, "baseQueryField", void 0);
__decorate([
    query('#base-collection-field')
], AppRoot.prototype, "baseCollectionField", void 0);
__decorate([
    query('#page-number-input')
], AppRoot.prototype, "pageNumberInput", void 0);
__decorate([
    query('collection-browser')
], AppRoot.prototype, "ownCollectionBrowser", void 0);
__decorate([
    query('serverless-search-demo')
], AppRoot.prototype, "serverlessDemo", void 0);
__decorate([
    query('modal-manager')
], AppRoot.prototype, "modalManager", void 0);
AppRoot = __decorate([
    customElement('app-root')
], AppRoot);
export { AppRoot };
