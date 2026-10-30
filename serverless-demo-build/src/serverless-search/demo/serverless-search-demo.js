var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { html, css, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import '../../collection-browser';
import '@internetarchive/modal-manager';
import { EtdSearchService } from '../../etd/etd-search-service';
import { StaticEtdEngine } from '../../etd/engine/static-etd-engine';
import { ETD_FACETS } from '../../etd/etd-facets';
import { ETD_VECTOR_FACETS } from '../../etd/etd-vector-facets';
import { ETD_VECTOR_SEARCH } from '../../etd/etd-search-source';
import { StaticVectorEngine } from '../../etd/engine/vector/static-vector-engine';
import '../../etd/demo/etd-vector-status';
import '../../etd/compare/etd-compare-panel';
import { observeFacets, } from '../../etd/demo/observe-facets';
import '../../etd/demo/etd-facet-summary';
import '../../etd/demo/etd-found-facets';
import { etdRequestFromParams } from '../../etd/etd-query';
import '../../etd/demo/etd-file-check';
import { DemoRestorationStateHandler } from './demo-restoration-state-handler';
import { DEFAULT_ETD_ITEM, checkItemIndex, etdIndexUrls, hasVectorIndex, parseItemIdentifier, } from '../../etd/demo/item-index';
/**
 * Searches to start from in etd-search, each run as if typed into the
 * search box. The quoted one shows the live page's query syntax: a phrase,
 * then AND.
 */
export const ETD_PRESET_QUERIES = [
    'sea ice',
    '"sea ice" AND antarctic',
    'climate change adaptation',
    'machine learning',
    'educação',
];
/** Searches to start from in dl-search, Democracy's Library. */
export const DL_PRESET_QUERIES = [
    'census',
    'social security',
    'highway safety',
    '"clean water" AND act',
    'Aruba',
];
/**
 * Preset searches by item. They're about what that item holds, so an item
 * with none here gets no presets.
 */
export const PRESET_QUERIES_BY_ITEM = {
    [DEFAULT_ETD_ITEM]: ETD_PRESET_QUERIES,
    'dl-search': DL_PRESET_QUERIES,
};
/** Items with a static index, to switch to in a click. */
export const KNOWN_ITEMS = [
    { item: DEFAULT_ETD_ITEM, holds: 'theses and dissertations' },
    { item: 'dl-search', holds: "Democracy's Library" },
];
/**
 * The serverless search demo: collection-browser searching the ETD theses
 * & dissertations index in the browser, with no search backend, under a
 * panel of demo controls that can be shown or hidden.
 *
 * One element so a page can load it whole, e.g. from esm.archive.org, and
 * get this collection-browser with it. The index is read through
 * /etd-index/ (or /item-index/<id>/ for `etd_item`), so the page serving
 * it needs those paths until the index files are CORS-readable.
 */
let ServerlessSearchDemo = class ServerlessSearchDemo extends LitElement {
    constructor() {
        super(...arguments);
        /** Where "How it works" links; no link when empty. */
        this.docsUrl = 'etd/static-index-search.html';
        /** Where the ETD demo reads its index and live page from. */
        this.etdIndex = etdIndexUrls(new URL(window.location.href).searchParams);
        /**
         * How ETD results are ranked: by the words (text rank), or by meaning
         * (vector rank), as the live page's two tabs. Kept in the url as
         * `etd_rank=vec`.
         */
        this.etdRank = new URL(window.location.href).searchParams.get('etd_rank') === 'vec'
            ? 'vector'
            : 'text';
        /** The services for each ranking, built once each. */
        this.etdServices = {};
        /**
         * Whether to compare with the live page. `etd_compare=0` leaves it out,
         * for timing: its iframe boots the live page, which reads files too.
         */
        this.etdCompare = new URL(window.location.href).searchParams.get('etd_compare') !== '0';
        this.etdModel = { state: 'idle' };
        /** Whether the ETD panel is hidden: shown unless `hide-etd-controls` says so. */
        this.etdControlsHidden = ['', 'true'].includes(new URLSearchParams(window.location.search).get('hide-etd-controls') ??
            'false');
        this.resizeObserver = new SharedResizeObserver();
        /** Opens on the detailed list rather than tiles. */
        this.restorationStateHandler = new DemoRestorationStateHandler('list-detail');
    }
    /**
     * The search service's own facets and whether it can search by filters
     * alone, for one that declares them (any serverless search does).
     */
    get declaredSearch() {
        const service = this.searchService;
        return service?.extraFacetGroups
            ? service
            : undefined;
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.etdRank === 'text') {
            this.searchService ??= this.etdService('text');
        }
        this.checkVectorIndex();
    }
    /**
     * Turns off ranking by meaning for an item with no vector index. A url
     * asking for it then ranks by words instead of searching nothing.
     */
    async checkVectorIndex() {
        this.vectorIndexFound ??= await hasVectorIndex(this.etdIndex.baseUrl);
        if (this.etdRank === 'vector' && !this.vectorIndexFound) {
            this.etdRank = 'text';
            const url = new URL(window.location.href);
            url.searchParams.delete('etd_rank');
            window.history.replaceState(window.history.state, '', url.href);
        }
        this.searchService ??= this.etdService(this.etdRank);
    }
    /** The collection-browser inside, for a host's dev tools. */
    get collectionBrowser() {
        return this.cb;
    }
    updated(changed) {
        if (changed.has('searchQuery') && this.cb) {
            this.cb.baseQuery = this.searchQuery;
        }
    }
    /** The ETD search service for a ranking, built on first use. */
    etdService(rank) {
        const built = this.etdServices[rank];
        if (built)
            return built;
        const service = rank === 'vector'
            ? new EtdSearchService({
                engine: this.vectorEngine(),
                kind: ETD_VECTOR_SEARCH,
            })
            : new EtdSearchService({ engine: this.textEngine() });
        const observed = observeFacets(service, facets => {
            // A slow facets request from the other ranking can land after a switch.
            if (this.searchService === observed)
                this.etdFacets = facets;
        }, params => {
            if (this.searchService !== observed)
                return;
            this.etdRequest = etdRequestFromParams(params, rank === 'vector' ? ETD_VECTOR_FACETS : ETD_FACETS);
        });
        this.etdServices[rank] = observed;
        return observed;
    }
    /** The text engine, built on first use. */
    textEngine() {
        if (this.etdEngine)
            return this.etdEngine;
        this.etdEngine = new StaticEtdEngine({
            baseUrl: this.etdIndex.baseUrl,
            facets: ETD_FACETS,
        });
        this.etdEngine
            .fileCheck()
            .then(check => {
            this.etdTextFileCheck = check;
        })
            .catch(() => { });
        return this.etdEngine;
    }
    /**
     * The vector engine, built on first use. Its search runs in a worker
     * (`etd_vec_worker=0` runs it in the page instead); `etd_vec_parallel` and
     * `etd_model_parallel` set how many reads are in flight, for measuring.
     */
    vectorEngine() {
        if (this.etdVectorEngine)
            return this.etdVectorEngine;
        const params = new URL(window.location.href).searchParams;
        const number = (name) => {
            const value = Number(params.get(name));
            return value > 0 ? value : undefined;
        };
        this.etdVectorEngine = new StaticVectorEngine({
            baseUrl: this.etdIndex.baseUrl,
            facets: ETD_VECTOR_FACETS,
            worker: params.get('etd_vec_worker') === '0'
                ? undefined
                : () => this.workerFactory?.() ??
                    new Worker(new URL('../../etd/engine/vector/vector-worker.ts', import.meta.url), { type: 'module' }),
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
            .catch(() => { });
        return this.etdVectorEngine;
    }
    /** Switches the ranking, keeping the query, and says so in the url. */
    etdRankChanged(e) {
        const rank = e.target.value;
        if (rank === this.etdRank)
            return;
        const url = new URL(window.location.href);
        if (rank === 'vector')
            url.searchParams.set('etd_rank', 'vec');
        else
            url.searchParams.delete('etd_rank');
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
    etdPreloadVector() {
        if (!this.vectorIndexFound)
            return;
        this.vectorEngine()
            .preload()
            .catch(() => { });
    }
    render() {
        return html `
      <button
        type="button"
        id="toggle-etd-controls-btn"
        aria-controls="etd-controls"
        aria-expanded=${String(!this.etdControlsHidden)}
        @click=${this.toggleEtdControls}
      >
        ${this.etdControlsHidden ? 'Show' : 'Hide'} demo controls
      </button>
      ${this.etdControlsTemplate}
      <div id="collection-browser-container">
        <collection-browser
          facetPaneVisible
          .extraFacetGroups=${this.declaredSearch?.extraFacetGroups ?? []}
          ?allowFilterOnlySearch=${!!this.declaredSearch?.allowFilterOnlySearch}
          .baseNavigationUrl=${''}
          .baseImageUrl=${'https://archive.org'}
          .searchService=${this.searchService}
          .resizeObserver=${this.resizeObserver}
          .restorationStateHandler=${this.restorationStateHandler}
          .showHistogramDatePicker=${true}
          .modalManager=${this.modalManager}
          .analyticsHandler=${this.analyticsHandler}
          .pageContext=${'search'}
          @baseQueryChanged=${this.baseQueryChanged}
        >
          ${this.etdRankTemplate}
        </collection-browser>
      </div>
      <modal-manager></modal-manager>
    `;
    }
    baseQueryChanged(e) {
        this.searchQuery = e.detail.baseQuery;
    }
    /** Shows or hides the ETD panel, keeping the choice in the URL. */
    toggleEtdControls() {
        this.etdControlsHidden = !this.etdControlsHidden;
        const pageUrl = new URL(window.location.href);
        // Leave the param off when the panel is shown, the default.
        if (this.etdControlsHidden) {
            pageUrl.searchParams.set('hide-etd-controls', 'true');
        }
        else {
            pageUrl.searchParams.delete('hide-etd-controls');
        }
        window.history.replaceState?.({ path: pageUrl.toString() }, '', pageUrl.toString());
    }
    /**
     * The switch between ranking by words and by meaning, in collection-browser's
     * facets column, between the results count and the date picker.
     */
    get etdRankTemplate() {
        return html `
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
            ?disabled=${this.vectorIndexFound === false}
            aria-describedby=${this.vectorIndexFound === false
            ? 'etd-rank-no-vector'
            : nothing}
          />
          Meaning <span class="etd-rank-note">(vector rank)</span>
          ${this.vectorIndexFound === false
            ? html `<span id="etd-rank-no-vector" class="etd-rank-note">
                This item has no vector index.
              </span>`
            : nothing}
        </label>
      </fieldset>
    `;
    }
    /** How a search by meaning is going, in the ETD panel. */
    get etdVectorStatusTemplate() {
        return this.etdRank === 'vector'
            ? html `<etd-vector-status
          .model=${this.etdModel}
          .search=${this.etdVectorSearch}
        ></etd-vector-status>`
            : nothing;
    }
    /**
     * The ETD demo's controls, grouped: its own search box, a summary of the
     * service's own facets in the results, and the panel comparing against
     * the live page.
     */
    get etdControlsTemplate() {
        return html `
      <section
        id="etd-controls"
        aria-labelledby="etd-controls-heading"
        ?hidden=${this.etdControlsHidden}
      >
        <h2 id="etd-controls-heading">
          Serverless search
          <span class="etd-controls-note">
            static index in the browser, no search backend
          </span>
        </h2>
        ${this.docsUrl
            ? html `<p id="etd-docs">
              <a href=${this.docsUrl} target="_blank" rel="noopener">
                How it works: the Static Index Search proposal
                <span class="sr-only">(opens in a new tab)</span>
              </a>
            </p>`
            : nothing}
        ${this.etdItemTemplate} ${this.etdSearchTemplate}
        ${this.etdPresetsTemplate} ${this.etdVectorStatusTemplate}
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
          itemId=${this.etdIndex.item ?? nothing}
          .text=${this.etdTextFileCheck}
          .vector=${this.etdVectorFileCheck}
        ></etd-file-check>
        ${this.etdCompare
            ? html `<etd-compare-panel
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
    get etdBrowseTemplate() {
        const browse = (label, filter) => {
            const url = new URL(window.location.href);
            url.search = '';
            url.searchParams.set('search_service', 'etd');
            for (const name of ['etd_item', 'etd_base_url']) {
                const value = new URL(window.location.href).searchParams.get(name);
                if (value !== null)
                    url.searchParams.set(name, value);
            }
            url.searchParams.append('and[]', filter);
            return html `<li><a href=${url.href}>${label}</a></li>`;
        };
        return html `
      <nav id="etd-browse" aria-label="Browse without a search">
        <span>Or browse:</span>
        <ul>
          ${browse('From the 2000s', 'year:[2000 TO 2009]')}
          ${browse('In Portuguese', 'language:"Portuguese"')}
        </ul>
      </nav>
    `;
    }
    /**
     * Picks the archive.org item whose static index the demo searches. Takes
     * an identifier or an archive.org details/download url, typed, pasted or
     * dropped, and switches only once the item's current.json checks out.
     */
    get etdItemTemplate() {
        const { item, rejectedItem } = this.etdIndex;
        const status = this.etdItemStatus?.message ??
            (rejectedItem !== undefined
                ? `etd_item “${rejectedItem}” isn't an archive.org identifier, so this is searching ${DEFAULT_ETD_ITEM}.`
                : '');
        return html `
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
        <div id="known-items" role="group" aria-labelledby="known-items-label">
          <span id="known-items-label">Or pick one:</span>
          ${KNOWN_ITEMS.map(known => html `<button
                type="submit"
                name="known-item"
                value=${known.item}
                aria-pressed=${known.item === item ? 'true' : 'false'}
                ?disabled=${this.etdItemStatus?.busy}
              >
                ${known.item}
                <span class="known-item-holds">${known.holds}</span>
              </button>`)}
        </div>
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
    etdItemDragOver(e) {
        // Lets the whole form take a drop, not just the field.
        e.preventDefault();
    }
    /** A dropped link or text replaces the field and is checked at once. */
    etdItemDropped(e) {
        const text = e.dataTransfer?.getData('text/uri-list').split(/\r?\n/)[0] ||
            e.dataTransfer?.getData('text/plain');
        if (!text)
            return;
        e.preventDefault();
        const form = e.currentTarget;
        const field = form.elements.namedItem('item');
        field.value = text.trim();
        form.requestSubmit();
    }
    async etdItemPressed(e) {
        e.preventDefault();
        const form = e.target;
        const field = form.elements.namedItem('item');
        // A known-item button submits its own item, as if typed in
        const picked = e.submitter;
        if (picked?.name === 'known-item')
            field.value = picked.value;
        const item = parseItemIdentifier(field.value);
        if (!item) {
            this.etdItemStatus = {
                busy: false,
                message: "That isn't an archive.org item. Try an identifier like etd-search, or a link to archive.org/details/… or archive.org/download/….",
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
        }
        else {
            url.searchParams.set('etd_item', item);
        }
        // The engine is built once, from the url, so a reload switches it.
        window.location.assign(url.href);
    }
    /** The ETD search box, which searches both pages. */
    get etdSearchTemplate() {
        return html `
      <form id="etd-search" role="search" @submit=${this.etdSearchPressed}>
        <label for="etd-query-field">
          Search this item, here and on its live search page:
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
    get etdPresetsTemplate() {
        const { item } = this.etdIndex;
        const queries = item ? PRESET_QUERIES_BY_ITEM[item] : undefined;
        if (!queries?.length)
            return nothing;
        return html `
      <div id="etd-presets" role="group" aria-labelledby="etd-presets-label">
        <span id="etd-presets-label">Try a search:</span>
        ${queries.map(query => html `<button
              type="button"
              @click=${() => {
            this.searchQuery = query;
        }}
            >
              ${query}
            </button>`)}
      </div>
    `;
    }
    etdSearchPressed(e) {
        e.preventDefault();
        const form = e.target;
        const field = form.elements.namedItem('query');
        this.searchQuery = field.value;
    }
    static { this.styles = css `
    :host {
      display: block;
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
      --modalBottomPadding: 0;
      --modalScrollOffset: 0;
      --modalCornerRadius: 0.5rem;
    }
    modal-manager.expanded-date-picker {
      --modalWidth: 58rem;
      --modalBorder: 2px solid var(--primaryButtonBGColor, #194880);
      --modalTitleLineHeight: 4rem;
      --modalTitleFontSize: 1.8rem;
      --modalBottomPadding: 0;
      --modalBottomMargin: 0;
      --modalScrollOffset: 0;
      --modalCornerRadius: 0.5rem;
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

    #toggle-etd-controls-btn {
      margin: 1rem 1rem 0;
      font-size: 1.4rem;
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

    #known-items {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.4rem 0.6rem;
    }
    #known-items button {
      font-size: 1.4rem;
      padding: 0.3rem 1rem;
      border: 1px solid #2c5f8f;
      border-radius: 4px;
      background: white;
      color: #1d3f61;
      cursor: pointer;
    }
    #known-items button[aria-pressed='true'] {
      background: #2c5f8f;
      color: white;
    }
    #known-items button:hover:not([aria-pressed='true']),
    #known-items button:focus-visible {
      background: #e8f0f8;
    }
    #known-items button[aria-pressed='true']:focus-visible {
      background: #1d3f61;
    }
    .known-item-holds {
      font-size: 1.2rem;
      opacity: 0.8;
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

    #etd-presets {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.4rem 0.6rem;
      margin: 0.6rem 0;
      font-size: 1.4rem;
    }
    #etd-presets button {
      font-size: 1.4rem;
      padding: 0.3rem 1rem;
      border: 1px solid #2c5f8f;
      border-radius: 4px;
      background: white;
      color: #1d3f61;
      cursor: pointer;
    }
    #etd-presets button:hover,
    #etd-presets button:focus-visible {
      background: #e8f0f8;
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
      flex-wrap: wrap;
      align-items: center;
      gap: 0.1rem 0.4rem;
      cursor: pointer;
    }
    #etd-rank label:has(input:disabled) {
      cursor: default;
    }
    /* On its own line, under the label's words rather than the radio */
    #etd-rank-no-vector {
      flex-basis: 100%;
      padding-left: 1.7rem;
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
  `; }
};
__decorate([
    property({ attribute: false })
], ServerlessSearchDemo.prototype, "workerFactory", void 0);
__decorate([
    property({ type: String })
], ServerlessSearchDemo.prototype, "docsUrl", void 0);
__decorate([
    property({ attribute: false })
], ServerlessSearchDemo.prototype, "analyticsHandler", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "etdItemStatus", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "etdRank", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "etdTextFileCheck", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "etdVectorFileCheck", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "etdModel", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "etdVectorSearch", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "searchService", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "vectorIndexFound", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "etdFacets", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "etdRequest", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "etdControlsHidden", void 0);
__decorate([
    state()
], ServerlessSearchDemo.prototype, "searchQuery", void 0);
__decorate([
    query('collection-browser')
], ServerlessSearchDemo.prototype, "cb", void 0);
__decorate([
    query('modal-manager')
], ServerlessSearchDemo.prototype, "modalManager", void 0);
ServerlessSearchDemo = __decorate([
    customElement('serverless-search-demo')
], ServerlessSearchDemo);
export { ServerlessSearchDemo };
