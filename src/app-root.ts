import {
  AnalyticsEvent,
  AnalyticsManager,
} from '@internetarchive/analytics-manager';
import {
  PageElementName,
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
import { InfiniteScroller } from '@internetarchive/infinite-scroller';
import { TileDispatcher } from './tiles/tile-dispatcher';
import { EtdSearchService } from './etd/etd-search-service';
import { StaticEtdEngine } from './etd/engine/static-etd-engine';
import { ETD_FACETS } from './etd/etd-facets';
import { ETD_VECTOR_FACETS } from './etd/etd-vector-facets';
import { ETD_VECTOR_SEARCH } from './etd/etd-search-source';
import { StaticVectorEngine } from './etd/engine/vector/static-vector-engine';
import type { EtdFileCheck } from './etd/engine/file-checks';
import type { VectorSearchStatus } from './etd/engine/vector/static-vector-engine';
import type { ModelState } from './etd/engine/vector/vector-searcher';
import './etd/demo/etd-vector-status';
import type { FacetDeclaringSearchService } from './serverless-search/serverless-search-service';
import './etd/compare/etd-compare-panel';
import { observeFacets, type ObservedFacets } from './etd/demo/observe-facets';
import './etd/demo/etd-facet-summary';
import './etd/demo/etd-found-facets';
import { etdRequestFromParams } from './etd/etd-query';
import type { EtdRequest } from './etd/etd-query';
import './etd/demo/etd-file-check';
import {
  DEFAULT_ETD_ITEM,
  checkItemIndex,
  etdIndexUrls,
  parseItemIdentifier,
} from './etd/demo/item-index';

@customElement('app-root')
export class AppRoot extends LitElement {
  /**
   * `?search_service=etd` browses the ETD theses & dissertations index
   * (searched in the browser, no backend) instead of archive.org. The index
   * is read through the dev server's /etd-index proxy (see vite.config.ts);
   * `etd_item` searches another archive.org item's static index instead,
   * through /item-index/<id>/, and `etd_base_url` points it anywhere. Each
   * search also runs on the live etd-search page, and a panel shows how the
   * two rankings differ.
   */
  private readonly isEtdSearch =
    new URL(window.location.href).searchParams.get('search_service') === 'etd';

  /** Where the ETD demo reads its index and live page from. */
  private readonly etdIndex = etdIndexUrls(
    new URL(window.location.href).searchParams,
  );

  /** What the item form last said: checking, or why it didn't switch. */
  @state() private etdItemStatus?: { busy: boolean; message: string };

  private etdEngine?: StaticEtdEngine;

  /**
   * How ETD results are ranked: by the words (text rank), or by meaning
   * (vector rank), as the live page's two tabs. Kept in the url as
   * `etd_rank=vec`.
   */
  @state() private etdRank: 'text' | 'vector' =
    new URL(window.location.href).searchParams.get('etd_rank') === 'vec'
      ? 'vector'
      : 'text';

  /** Built on first use: a text-only visit never loads the model. */
  private etdVectorEngine?: StaticVectorEngine;

  /** Each index's files checked against the item's file list, once loaded. */
  @state() private etdTextFileCheck?: EtdFileCheck;

  @state() private etdVectorFileCheck?: EtdFileCheck;

  /** The services for each ranking, built once each. */
  private etdServices: {
    text?: SearchServiceInterface;
    vector?: SearchServiceInterface;
  } = {};

  /**
   * Whether to compare with the live page. `etd_compare=0` leaves it out,
   * for timing: its iframe boots the live page, which reads files too.
   */
  private readonly etdCompare =
    new URL(window.location.href).searchParams.get('etd_compare') !== '0';

  @state() private etdModel: ModelState = { state: 'idle' };

  @state() private etdVectorSearch?: VectorSearchStatus;

  /**
   * The search service's own facets and whether it can search by filters
   * alone, for one that declares them (any serverless search does).
   */
  private get declaredSearch(): FacetDeclaringSearchService | undefined {
    const service = this.searchService as Partial<FacetDeclaringSearchService>;
    return service.extraFacetGroups
      ? (service as FacetDeclaringSearchService)
      : undefined;
  }

  @state() private searchService: SearchServiceInterface =
    this.initSearchServiceFromUrlParams();

  /** The facets collection-browser last got from the ETD service. */
  @state() private etdFacets?: ObservedFacets;

  /** The search collection-browser is showing: its words and filters. */
  @state() private etdRequest?: EtdRequest;

  /** Whether the ETD panel is hidden: shown unless `hide-etd-controls` says so. */
  @state() private etdControlsHidden = ['', 'true'].includes(
    new URLSearchParams(window.location.search).get('hide-etd-controls') ??
      'false',
  );

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

  @state() private profileElement?: PageElementName;

  @state() private withinProfile?: string;

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
    if (this.isEtdSearch) return this.etdService(this.etdRank);
    return new SearchService({
      includeCredentials: false,
      baseUrl: params.get('search_base_url') ?? undefined,
      servicePath: params.get('search_service_path') ?? undefined,
      debuggingEnabled: !!params.get('debugging'),
    });
  }

  /** The ETD search service for a ranking, built on first use. */
  private etdService(rank: 'text' | 'vector'): SearchServiceInterface {
    const built = this.etdServices[rank];
    if (built) return built;
    const service =
      rank === 'vector'
        ? new EtdSearchService({
            engine: this.vectorEngine(),
            kind: ETD_VECTOR_SEARCH,
          })
        : new EtdSearchService({ engine: this.textEngine() });
    const observed = observeFacets(
      service,
      facets => {
        // A slow facets request from the other ranking can land after a switch.
        if (this.searchService === observed) this.etdFacets = facets;
      },
      params => {
        if (this.searchService !== observed) return;
        this.etdRequest = etdRequestFromParams(
          params,
          rank === 'vector' ? ETD_VECTOR_FACETS : ETD_FACETS,
        );
      },
    );
    this.etdServices[rank] = observed;
    return observed;
  }

  /** The text engine, built on first use. */
  private textEngine(): StaticEtdEngine {
    if (this.etdEngine) return this.etdEngine;
    this.etdEngine = new StaticEtdEngine({
      baseUrl: this.etdIndex.baseUrl,
      facets: ETD_FACETS,
    });
    this.etdEngine
      .fileCheck()
      .then(check => {
        this.etdTextFileCheck = check;
      })
      .catch(() => {});
    return this.etdEngine;
  }

  /**
   * The vector engine, built on first use. Its search runs in a worker
   * (`etd_vec_worker=0` runs it in the page instead); `etd_vec_parallel` and
   * `etd_model_parallel` set how many reads are in flight, for measuring.
   */
  private vectorEngine(): StaticVectorEngine {
    if (this.etdVectorEngine) return this.etdVectorEngine;
    const params = new URL(window.location.href).searchParams;
    const number = (name: string) => {
      const value = Number(params.get(name));
      return value > 0 ? value : undefined;
    };
    this.etdVectorEngine = new StaticVectorEngine({
      baseUrl: this.etdIndex.baseUrl,
      facets: ETD_VECTOR_FACETS,
      worker:
        params.get('etd_vec_worker') === '0'
          ? undefined
          : () =>
              new Worker(
                new URL(
                  './etd/engine/vector/vector-worker.ts',
                  import.meta.url,
                ),
                { type: 'module' },
              ),
      modelParallel: number('etd_model_parallel'),
      scan: { parallel: number('etd_vec_parallel') },
      // `etd_vec_progressive=0` waits for the whole scan, to compare timings.
      progressive: params.get('etd_vec_progressive') !== '0',
      onModel: model => {
        this.etdModel = model;
      },
      onSearch: search => {
        this.etdVectorSearch = search;
      },
    });
    this.etdVectorEngine
      .fileCheck()
      .then(check => {
        this.etdVectorFileCheck = check;
      })
      .catch(() => {});
    return this.etdVectorEngine;
  }

  /** Switches the ranking, keeping the query, and says so in the url. */
  private etdRankChanged(e: Event) {
    const rank = (e.target as HTMLInputElement).value as 'text' | 'vector';
    if (rank === this.etdRank) return;
    const url = new URL(window.location.href);
    if (rank === 'vector') url.searchParams.set('etd_rank', 'vec');
    else url.searchParams.delete('etd_rank');
    window.history.replaceState(window.history.state, '', url.href);
    this.etdRank = rank;
    this.etdFacets = undefined;
    this.etdRequest = undefined;
    this.searchService = this.etdService(rank);
  }

  /**
   * A sign someone may search by meaning: start loading the model (135 MB
   * the first time) and centroids, so the search doesn't wait for them.
   */
  private etdPreloadVector() {
    this.vectorEngine()
      .preload()
      .catch(() => {});
  }

  /**
   * The switch between ranking by words and by meaning, in collection-browser's
   * facets column, between the results count and the date picker.
   */
  private get etdRankTemplate() {
    return html`
      <fieldset
        id="etd-rank"
        slot="facets-header-slot"
        @change=${this.etdRankChanged}
      >
        <legend>Rank results by</legend>
        <label>
          <input
            type="radio"
            name="etd-rank"
            value="text"
            .checked=${this.etdRank === 'text'}
          />
          Words <span class="etd-rank-note">(text rank)</span>
        </label>
        <label
          @pointerenter=${this.etdPreloadVector}
          @focusin=${this.etdPreloadVector}
        >
          <input
            type="radio"
            name="etd-rank"
            value="vector"
            .checked=${this.etdRank === 'vector'}
          />
          Meaning <span class="etd-rank-note">(vector rank)</span>
        </label>
      </fieldset>
    `;
  }

  /** How a search by meaning is going, in the ETD panel. */
  private get etdVectorStatusTemplate() {
    return this.etdRank === 'vector'
      ? html`<etd-vector-status
          .model=${this.etdModel}
          .search=${this.etdVectorSearch}
        ></etd-vector-status>`
      : nothing;
  }

  /**
   * The ETD demo's controls, grouped: its own search box, a summary of the
   * service's own facets in the results, the facets found in the results'
   * own records, and the panel comparing against the live page.
   */
  private get etdControlsTemplate() {
    return html`
      <section
        id="etd-controls"
        aria-labelledby="etd-controls-heading"
        ?hidden=${this.etdControlsHidden}
      >
        <h2 id="etd-controls-heading">
          ETD theses search
          <span class="etd-controls-note">
            static index in the browser, no search backend
          </span>
        </h2>
        <p id="etd-docs">
          <a href="etd/static-index-search.html" target="_blank" rel="noopener">
            How it works: the Static Index Search proposal
            <span class="sr-only">(opens in a new tab)</span>
          </a>
        </p>
        ${this.etdItemTemplate} ${this.etdSearchTemplate}
        ${this.etdVectorStatusTemplate}
        ${this.etdRank === 'text' ? this.etdBrowseTemplate : nothing}
        <etd-facet-summary
          .groups=${this.declaredSearch?.extraFacetGroups ?? []}
          .facets=${this.etdFacets}
        ></etd-facet-summary>
        <etd-found-facets
          .engine=${this.etdRank === 'vector'
            ? this.etdVectorEngine
            : this.etdEngine}
          .request=${this.etdRequest}
        ></etd-found-facets>
        <etd-file-check
          .text=${this.etdTextFileCheck}
          .vector=${this.etdVectorFileCheck}
        ></etd-file-check>
        ${this.etdCompare
          ? html`<etd-compare-panel
              .engine=${this.etdRank === 'vector'
                ? this.etdVectorEngine
                : this.etdEngine}
              .rank=${this.etdRank}
              .query=${this.searchQuery}
              .pageUrl=${this.etdIndex.pageUrl}
            ></etd-compare-panel>`
          : nothing}
      </section>
    `;
  }

  /**
   * Searches by filters alone, with no query (collection-browser's
   * allowFilterOnlySearch): changing the query clears filters, so without a
   * link these only start from the URL.
   */
  private get etdBrowseTemplate() {
    const browse = (label: string, filter: string) => {
      const url = new URL(window.location.href);
      url.search = '';
      url.searchParams.set('search_service', 'etd');
      for (const name of ['etd_item', 'etd_base_url']) {
        const value = new URL(window.location.href).searchParams.get(name);
        if (value !== null) url.searchParams.set(name, value);
      }
      url.searchParams.append('and[]', filter);
      return html`<li><a href=${url.href}>${label}</a></li>`;
    };
    return html`
      <nav id="etd-browse" aria-label="Browse theses without a search">
        <span>Or browse:</span>
        <ul>
          ${browse('Theses from the 2000s', 'year:[2000 TO 2009]')}
          ${browse('Theses in Portuguese', 'language:"Portuguese"')}
        </ul>
      </nav>
    `;
  }

  /**
   * Picks the archive.org item whose static index the demo searches. Takes
   * an identifier or an archive.org details/download url, typed, pasted or
   * dropped, and switches only once the item's current.json checks out.
   */
  private get etdItemTemplate() {
    const { item, rejectedItem } = this.etdIndex;
    const status =
      this.etdItemStatus?.message ??
      (rejectedItem !== undefined
        ? `etd_item “${rejectedItem}” isn't an archive.org identifier, so this is searching ${DEFAULT_ETD_ITEM}.`
        : '');
    return html`
      <form
        id="etd-item"
        @submit=${this.etdItemPressed}
        @dragover=${this.etdItemDragOver}
        @drop=${this.etdItemDropped}
      >
        <label for="etd-item-field">Item to search:</label>
        <input
          type="text"
          id="etd-item-field"
          name="item"
          .value=${item ?? ''}
          placeholder="etd-search, or an archive.org/details/… link"
          autocomplete="off"
          spellcheck="false"
          aria-describedby="etd-item-status"
          aria-invalid=${this.etdItemStatus && !this.etdItemStatus.busy
            ? 'true'
            : 'false'}
        />
        <button type="submit" ?disabled=${this.etdItemStatus?.busy}>
          Search this item
        </button>
        <p
          id="etd-item-status"
          role="status"
          class=${this.etdItemStatus?.busy ? '' : 'error'}
        >
          ${status}
        </p>
      </form>
    `;
  }

  private etdItemDragOver(e: DragEvent) {
    // Lets the whole form take a drop, not just the field.
    e.preventDefault();
  }

  /** A dropped link or text replaces the field and is checked at once. */
  private etdItemDropped(e: DragEvent) {
    const text =
      e.dataTransfer?.getData('text/uri-list').split(/\r?\n/)[0] ||
      e.dataTransfer?.getData('text/plain');
    if (!text) return;
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const field = form.elements.namedItem('item') as HTMLInputElement;
    field.value = text.trim();
    form.requestSubmit();
  }

  private async etdItemPressed(e: SubmitEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const field = form.elements.namedItem('item') as HTMLInputElement;
    const item = parseItemIdentifier(field.value);
    if (!item) {
      this.etdItemStatus = {
        busy: false,
        message:
          "That isn't an archive.org item. Try an identifier like etd-search, or a link to archive.org/details/… or archive.org/download/….",
      };
      return;
    }
    if (item === this.etdIndex.item) {
      this.etdItemStatus = undefined;
      return;
    }

    this.etdItemStatus = { busy: true, message: `Checking ${item}…` };
    const check = await checkItemIndex(item);
    if (!check.ok) {
      this.etdItemStatus = { busy: false, message: check.message };
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('etd_base_url');
    if (item === DEFAULT_ETD_ITEM) {
      url.searchParams.delete('etd_item');
    } else {
      url.searchParams.set('etd_item', item);
    }
    // The engine is built once, from the url, so a reload switches it.
    window.location.assign(url.href);
  }

  /** The ETD search box, which searches both pages. */
  private get etdSearchTemplate() {
    return html`
      <form id="etd-search" role="search" @submit=${this.etdSearchPressed}>
        <label for="etd-query-field">
          Search theses, here and on the live etd-search page:
        </label>
        <input
          type="search"
          id="etd-query-field"
          name="query"
          .value=${this.searchQuery ?? ''}
        />
        <button type="submit">Search</button>
      </form>
    `;
  }

  private etdSearchPressed(e: SubmitEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const field = form.elements.namedItem('query') as HTMLInputElement;
    this.searchQuery = field.value;
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
    } else {
      // Ensure we reset the initial page
      this.collectionBrowser.initialPageNumber = 1;
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
    return this.devToolsHidden ? 'hidden' : '';
  }

  /**
   * Whether the search controls are hidden: `hide-dev-tools` says so, and
   * without it they start hidden for the ETD demo, which has its own box.
   */
  private get devToolsHidden(): boolean {
    const param = new URLSearchParams(window.location.search).get(
      'hide-dev-tools',
    );
    if (param === null) return this.isEtdSearch;
    return !!param && param !== 'false';
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
          ${this.isEtdSearch
            ? html`<div>
                <button
                  type="button"
                  id="toggle-etd-controls-btn"
                  aria-controls="etd-controls"
                  aria-expanded=${String(!this.etdControlsHidden)}
                  @click=${this.toggleEtdControls}
                >
                  ${this.etdControlsHidden ? 'Show' : 'Hide'} ETD controls
                </button>
              </div>`
            : nothing}

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
                @change=${(e: Event) => {
                  const val = (e.target as HTMLInputElement).value.trim();
                  this.withinProfile = val || undefined;
                }}
              />
            </div>
            <details class="profile-element-controls">
              <summary>
                Profile tab
                (profileElement)${this.profileElement
                  ? html`: <strong>${this.profileElement}</strong>`
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
                ${(
                  [
                    'uploads',
                    'favorites',
                    'reviews',
                    'collections',
                    'lending',
                    'web_archives',
                    'forum_posts',
                  ] as PageElementName[]
                ).map(
                  tab => html`
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
                  `,
                )}
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
      ${this.isEtdSearch ? this.etdControlsTemplate : nothing}
      <div id="collection-browser-container">
        <collection-browser
          facetPaneVisible
          .extraFacetGroups=${this.declaredSearch?.extraFacetGroups ?? []}
          ?allowFilterOnlySearch=${!!this.declaredSearch?.allowFilterOnlySearch}
          .baseNavigationUrl=${this.isEtdSearch ? '' : 'https://archive.org'}
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
            ? html`<div slot="sortbar-left-slot">Sort Slot</div>`
            : nothing}
          ${this.toggleSlots
            ? html`<div slot="facet-top-slot">Facet Slot</div>`
            : nothing}
          ${this.isEtdSearch ? this.etdRankTemplate : nothing}
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

  private minimalTilesChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    const scroller = this.collectionBrowser?.shadowRoot!.querySelector(
      'infinite-scroller',
    ) as InfiniteScroller;
    const tileDispatchers = [
      ...scroller.shadowRoot!.querySelectorAll('tile-dispatcher'),
    ] as TileDispatcher[];

    if (target.checked) {
      tileDispatchers?.forEach(tile => (tile.layoutType = 'minimal'));
    } else {
      tileDispatchers?.forEach(tile => (tile.layoutType = 'default'));
    }
  }

  private toggleDevTools() {
    const pageUrl = new URL(window.location.href);
    const { searchParams } = pageUrl;

    // Leave the param off when the new state is the default.
    const hide = !this.devToolsHidden;
    if (hide === this.isEtdSearch) {
      searchParams.delete('hide-dev-tools');
    } else {
      searchParams.set('hide-dev-tools', String(hide));
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

  /** Shows or hides the ETD panel, keeping the choice in the URL. */
  private toggleEtdControls() {
    this.etdControlsHidden = !this.etdControlsHidden;
    const pageUrl = new URL(window.location.href);
    // Leave the param off when the panel is shown, the default.
    if (this.etdControlsHidden) {
      pageUrl.searchParams.set('hide-etd-controls', 'true');
    } else {
      pageUrl.searchParams.delete('hide-etd-controls');
    }
    window.history.replaceState?.(
      { path: pageUrl.toString() },
      '',
      pageUrl.toString(),
    );
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
   * Handler for when the dev panel's "Enable tile action buttons" checkbox is changed.
   */
  private tileActionsCheckboxChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    this.collectionBrowser.tileActions = target.checked
      ? [{ id: 'demo-action', label: 'Return' }]
      : [];
  }

  /**
   * Handler for tile action button clicks (logs to console for QA).
   */
  private handleTileActionClicked(
    e: CustomEvent<{ actionId: string; model: unknown }>,
  ) {
    console.log('Tile action clicked:', e.detail.actionId, e.detail.model);
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

  private profileElementChanged(e: Event) {
    const input = e.target as HTMLInputElement;
    this.profileElement = (input.value as PageElementName) || undefined;
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
    #etd-controls {
      margin: 1rem;
      padding: 1rem 1.5rem 0.5rem;
      background: #eef3f9;
      border: 1px solid #b6c8dd;
      border-left: 6px solid #2c5f8f;
      border-radius: 4px;
    }

    #etd-controls h2 {
      margin: 0 0 0.8rem;
      /* Clear the fixed search-controls toggle, at left: 77.4% */
      max-width: calc(77.4% - 3rem);
      font-size: 2rem;
      color: #1d3f61;
    }

    .etd-controls-note {
      margin-left: 0.5rem;
      font-size: 1.3rem;
      font-weight: normal;
      color: #4a5a6a;
    }

    #etd-docs {
      margin: 0 0 1rem;
    }

    #etd-docs a {
      display: inline-block;
      padding: 0.4rem 1rem;
      border: 1px solid #2c5f8f;
      border-radius: 4px;
      background: white;
      color: #1d3f61;
      font-size: 1.4rem;
      text-decoration: none;
    }

    #etd-docs a:hover {
      background: #e8edf2;
    }

    #etd-docs a:focus-visible {
      outline: 2px solid #3a4fd6;
      outline-offset: 2px;
    }

    /* Read by screen readers, not shown */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    #etd-item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.8rem;
      font-size: 1.4rem;
    }

    #etd-item-field {
      flex: 0 1 30rem;
      font-size: 1.4rem;
      padding: 0.3rem 0.6rem;
      border: 1px solid #8aa3bd;
      border-radius: 4px;
    }

    #etd-item button {
      font-size: 1.4rem;
      padding: 0.3rem 1rem;
    }

    #etd-item-status {
      flex-basis: 100%;
      margin: 0;
    }

    #etd-item-status:empty {
      display: none;
    }

    #etd-item-status.error {
      color: #a3261a;
    }

    #etd-search {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.6rem;
    }

    #etd-query-field {
      flex: 1 1 30rem;
      font-size: 1.8rem;
      padding: 0.5rem 0.8rem;
      border: 1px solid #8aa3bd;
      border-radius: 4px;
    }

    #etd-search button {
      font-size: 1.6rem;
      padding: 0.5rem 1.4rem;
      border: none;
      border-radius: 4px;
      background: #2c5f8f;
      color: white;
      cursor: pointer;
    }

    #etd-browse {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem 1rem;
      margin: 0.6rem 0;
      font-size: 1.4rem;
    }

    #etd-browse ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem 1rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    #etd-browse a {
      color: #1d3f61;
    }

    #etd-rank {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin: 1rem 0 0;
      padding: 0;
      border: none;
      font-size: 1.4rem;
    }

    #etd-rank legend {
      padding: 0;
      margin-bottom: 0.4rem;
      font-weight: bold;
    }

    #etd-rank label {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
    }

    .etd-rank-note {
      font-size: 1.2rem;
      color: #4a5a6a;
    }

    #etd-controls etd-compare-panel {
      background: white;
    }

    #etd-controls[hidden] {
      display: none;
    }

    #etd-controls etd-facet-summary,
    #etd-controls etd-file-check {
      margin: 0.75rem 0;
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
  `;
}
