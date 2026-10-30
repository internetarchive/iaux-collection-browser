var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing, } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import { SearchType, AggregationSortType, } from '@internetarchive/search-service';
import { localized, msg, str } from '@lit/localize';
import { suppressedCollections, getDefaultSelectedFacets, tvMoreFacetSort, } from '../models';
import { facetGroupInfo, } from '../utils/extra-facet-groups';
import '@internetarchive/elements/ia-status-indicator/ia-status-indicator';
import '@internetarchive/elements/ia-clearable-text-input/ia-clearable-text-input';
import './more-facets-scroller';
import { analyticsActions, analyticsCategories, } from '../utils/analytics-events';
import './toggle-switch';
import { srOnlyStyle } from '../styles/sr-only';
import checkIcon from '../assets/img/icons/check';
import eyeClosedIcon from '../assets/img/icons/eye-closed';
import closeCircleDark from '../assets/img/icons/close-circle-dark';
import { mergeSelectedFacets, updateSelectedFacetBucket, } from '../utils/facet-utils';
import { filterTextIncludes, normalizeFilterText, } from '../utils/normalize-filter-text';
import { log } from '../utils/log';
import { MORE_FACETS__MAX_AGGREGATIONS } from './models';
let MoreFacetsContent = class MoreFacetsContent extends LitElement {
    constructor() {
        super(...arguments);
        /** Facet groups beyond collection-browser's own, for titles and sorts. */
        this.extraFacetGroups = [];
        /**
         * Whether we are waiting for facet data to load.
         * We begin with this set to true so that we show an initial loading indicator.
         */
        this.facetsLoading = true;
        this.sortedBy = AggregationSortType.COUNT;
        this.isTvSearch = false;
        /**
         * An object holding any changes the patron has made to their facet selections
         * within the modal dialog but which they have not yet applied. These are
         * eventually merged into the existing `selectedFacets` when the patron applies
         * their changes, or discarded if they cancel/close the dialog.
         */
        this.unappliedFacetChanges = getDefaultSelectedFacets();
        /**
         * Text the patron has entered to narrow down the facet values shown.
         */
        this.filterText = '';
        /**
         * Whether the search for this facet's values failed, either with an error
         * result or by throwing.
         */
        this.loadFailed = false;
        /**
         * The buckets from `facetGroup` that match `filterText`, in display order.
         * Derived in `willUpdate`.
         */
        this.filteredBuckets = [];
        /**
         * Each bucket's display text in the normalized form that filtering compares
         * against, keyed by bucket key. Filled lazily so that each value is only
         * normalized once, however many times the filter text changes.
         */
        this.filterKeys = new Map();
        /**
         * The values currently selected or hidden, in the order they were selected.
         * Shown as chiclets above the list. Derived in `willUpdate`.
         */
        this.chosenBuckets = [];
        /**
         * Close more facets modal on Escape click
         */
        this.escapeHandler = (e) => {
            if (e.key === 'Escape')
                this.modalManager?.closeModal();
        };
    }
    willUpdate(changed) {
        if (changed.has('aggregations')) {
            this.filterKeys.clear();
        }
        const facetGroupChanged = changed.has('aggregations') ||
            changed.has('sortedBy') ||
            changed.has('selectedFacets') ||
            changed.has('unappliedFacetChanges');
        if (facetGroupChanged) {
            // Convert the merged selected facets & aggregations into a facet group
            this.facetGroup = this.mergedFacets;
            this.chosenBuckets = this.listChosenBuckets();
        }
        if (facetGroupChanged || changed.has('filterText')) {
            this.filteredBuckets = this.filterBuckets();
        }
        // If any of the search properties change, it triggers a facet fetch
        if (changed.has('facetKey') ||
            changed.has('query') ||
            changed.has('searchType') ||
            changed.has('filterMap')) {
            this.facetsLoading = true;
            this.loadFailed = false;
            this.sortedBy =
                this.searchType === SearchType.TV &&
                    this.facetKey &&
                    Object.prototype.hasOwnProperty.call(tvMoreFacetSort, this.facetKey)
                    ? tvMoreFacetSort[this.facetKey]
                    : (this.groupInfo?.sort ?? AggregationSortType.COUNT);
            this.updateSpecificFacets();
        }
    }
    updated(changed) {
        // A new filter or sort order shows different values, so start over from
        // the first page rather than somewhere in the middle of them.
        if (changed.has('filterText') || changed.has('sortedBy')) {
            this.scroller?.scrollToPage(0);
        }
        // A removed chiclet took its focused button with it; move focus to the
        // chiclet that took its place, or back to the filter field if none are left.
        if (this.chicletFocusIndex !== undefined) {
            const buttons = this.shadowRoot?.querySelectorAll('.chiclet-remove') ?? [];
            const index = Math.min(this.chicletFocusIndex, buttons.length - 1);
            this.chicletFocusIndex = undefined;
            (buttons[index] ?? this.filterInput)?.focus();
        }
    }
    firstUpdated() {
        this.setupEscapeListeners();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this.escapeHandler);
    }
    setupEscapeListeners() {
        if (this.modalManager) {
            document.addEventListener('keydown', this.escapeHandler);
        }
    }
    /**
     * Whether facet requests are for the search_results page type (either defaulted or explicitly).
     */
    get isSearchResultsPage() {
        // Default page type is search_results when none is specified, so we check
        // for undefined as well.
        const pageType = this.pageSpecifierParams?.pageType;
        return pageType === undefined || pageType === 'search_results';
    }
    /**
     * Get specific facets data from search-service API based of currently query params
     * - this.aggregations - hold result of search service and being used for further processing.
     */
    async updateSpecificFacets() {
        if (!this.facetKey)
            return; // Can't fetch facets if we don't know what type of facets we need!
        const trimmedQuery = this.query?.trim();
        if (!trimmedQuery && this.isSearchResultsPage)
            return; // The search page _requires_ a query
        const aggregations = {
            simpleParams: [this.facetKey],
        };
        const aggregationsSize = MORE_FACETS__MAX_AGGREGATIONS; // Only request the 10K highest-count facets
        const params = {
            ...this.pageSpecifierParams,
            query: trimmedQuery || '',
            identifiers: this.identifiers,
            filters: this.filterMap,
            aggregations,
            aggregationsSize,
            rows: 0, // todo - do we want server-side pagination with offset/page/limit flag?
        };
        try {
            const results = await this.searchService?.search(params, this.searchType);
            const response = results?.success?.response;
            if (!response) {
                log('More facets search failed', results?.error);
                this.loadFailed = true;
                this.aggregations = undefined;
                return;
            }
            // Record collection titles before the aggregations, so that they're
            // available for sorting & filtering once the facet group is built.
            const { collectionTitles } = response;
            if (collectionTitles) {
                for (const [id, title] of Object.entries(collectionTitles)) {
                    this.collectionTitles?.set(id, title);
                }
            }
            this.aggregations = response.aggregations;
        }
        catch (err) {
            log('More facets search threw', err);
            this.loadFailed = true;
            this.aggregations = undefined;
        }
        finally {
            this.facetsLoading = false;
        }
    }
    /**
     * Combines the selected facets with the aggregations into the single list of
     * values the dialog shows. Selected and hidden values keep their place in the
     * current sort order rather than moving to the front; the chiclets above the
     * list are what call them out.
     */
    get mergedFacets() {
        if (!this.facetKey || !this.selectedFacets)
            return undefined;
        const { aggregationFacetGroup } = this;
        // If we don't have any aggregations, then there is nothing to show yet
        if (!aggregationFacetGroup)
            return undefined;
        const selections = this.currentSelections;
        // Mark each aggregated value with its selection state, if it has one
        const buckets = aggregationFacetGroup.buckets.map(bucket => {
            const selection = selections[bucket.key];
            return selection ? { ...bucket, state: selection.state } : bucket;
        });
        // Values selected before the dialog opened can be missing from the
        // aggregations (a hidden value is excluded from the results it would be
        // counted in). Slot them in where the current sort puts them, so they can
        // still be changed from the list.
        const aggregatedKeys = new Set(buckets.map(b => b.key));
        const preexisting = this.selectedFacets[this.facetKey] ?? {};
        for (const [key, data] of Object.entries(preexisting)) {
            if (aggregatedKeys.has(key))
                continue;
            this.insertInSortOrder(buckets, {
                displayText: this.displayTextFor(key),
                key,
                count: data.count,
                state: selections[key]?.state ?? data.state,
            });
        }
        // For TV creator facets, uppercase the display text
        if (this.facetKey === 'creator' && this.isTvSearch) {
            buckets.forEach(b => {
                b.displayText = (b.displayText ?? b.key)?.toLocaleUpperCase();
                const channelLabel = this.tvChannelAliases?.get(b.displayText);
                if (channelLabel && channelLabel !== b.displayText) {
                    b.extraNote = `(${channelLabel})`;
                }
            });
        }
        return { ...aggregationFacetGroup, buckets };
    }
    /**
     * This facet type's selections: the ones made before the dialog opened,
     * overridden by any unapplied changes made in it. Values stay in the order
     * they were first selected, and cleared ones remain with state `'none'`.
     */
    get currentSelections() {
        if (!this.facetKey)
            return {};
        return {
            ...this.selectedFacets?.[this.facetKey],
            ...this.unappliedFacetChanges[this.facetKey],
        };
    }
    /**
     * The values that are currently selected or hidden, in the order they were
     * selected, as they appear in `facetGroup`.
     */
    listChosenBuckets() {
        const byKey = new Map(this.facetGroup?.buckets.map(b => [b.key, b]));
        // Without a list (e.g. the search failed), fall back on the selections
        // themselves, so they can still be seen and cleared.
        return Object.entries(this.currentSelections)
            .map(([key, selection]) => byKey.get(key) ?? {
            ...selection,
            displayText: this.displayTextFor(key),
        })
            .filter(bucket => bucket.state !== 'none');
    }
    /**
     * Inserts `bucket` ahead of the first bucket that the current sort would put
     * after it.
     */
    insertInSortOrder(buckets, bucket) {
        const index = buckets.findIndex(b => this.compareForSort(bucket, b) < 0);
        buckets.splice(index === -1 ? buckets.length : index, 0, bucket);
    }
    /**
     * Orders two buckets the way the aggregations are ordered for the current
     * sort (see `getSortedBuckets` in search-service).
     */
    compareForSort(a, b) {
        switch (this.sortedBy) {
            case AggregationSortType.ALPHABETICAL:
                return (a.displayText ?? a.key).localeCompare(b.displayText ?? b.key);
            case AggregationSortType.NUMERIC:
                return Number(b.key) - Number(a.key);
            default:
                return b.count - a.count;
        }
    }
    /**
     * The text patrons see for a bucket: the collection title for collections,
     * and the bucket key for everything else.
     */
    displayTextFor(key) {
        const collectionTitle = this.facetKey === 'collection'
            ? this.collectionTitles?.get(key)
            : undefined;
        return collectionTitle ?? key;
    }
    /**
     * Converts the raw `aggregations` for the current facet key to a `FacetGroup`,
     * which is easier to work with.
     */
    get aggregationFacetGroup() {
        if (!this.aggregations || !this.facetKey)
            return undefined;
        const currentAggregation = this.aggregations[this.facetKey];
        if (!currentAggregation)
            return undefined;
        const facetGroupTitle = this.groupInfo?.title ?? this.facetKey;
        // Order the facets according to the current sort option
        let sortedBuckets = currentAggregation.getSortedBuckets(this.sortedBy);
        if (this.facetKey === 'collection') {
            // we are not showing fav- collections or certain deemphasized collections in facets
            sortedBuckets = sortedBuckets?.filter(bucket => {
                const bucketKey = bucket?.key?.toString();
                return (!suppressedCollections[bucketKey] && !bucketKey?.startsWith('fav-'));
            });
        }
        // Construct the array of facet buckets from the aggregation buckets
        const facetBuckets = sortedBuckets.map(bucket => {
            const bucketKeyStr = `${bucket.key}`;
            return {
                displayText: this.displayTextFor(bucketKeyStr),
                key: bucketKeyStr,
                count: bucket.doc_count,
                state: 'none',
            };
        });
        // Collections sorted alphabetically should be in order of the titles
        // patrons see, not of the identifiers that getSortedBuckets used.
        if (this.facetKey === 'collection' &&
            this.sortedBy === AggregationSortType.ALPHABETICAL) {
            facetBuckets.sort((a, b) => (a.displayText ?? a.key).localeCompare(b.displayText ?? b.key));
        }
        return {
            title: facetGroupTitle,
            key: this.facetKey,
            buckets: facetBuckets,
        };
    }
    /**
     * The buckets whose visible text contains the filter text, ignoring case,
     * accents and punctuation.
     */
    filterBuckets() {
        const buckets = this.facetGroup?.buckets ?? [];
        const needle = normalizeFilterText(this.filterText);
        if (!needle.spaced)
            return buckets;
        return buckets.filter(bucket => filterTextIncludes(this.filterKeyFor(bucket), needle));
    }
    filterKeyFor(bucket) {
        let filterKey = this.filterKeys.get(bucket.key);
        if (filterKey === undefined) {
            const visibleText = [bucket.displayText ?? bucket.key, bucket.extraNote]
                .filter(Boolean)
                .join(' ');
            filterKey = normalizeFilterText(visibleText);
            this.filterKeys.set(bucket.key, filterKey);
        }
        return filterKey;
    }
    /**
     * Whether the patron's filter text has ruled out every value
     */
    get noValuesMatch() {
        const isFiltering = normalizeFilterText(this.filterText).spaced !== '';
        return isFiltering && this.filteredBuckets.length === 0;
    }
    get moreFacetsTemplate() {
        const valuesLabel = this.facetKey
            ? msg(str `${this.groupInfo?.title ?? this.facetKey} values`)
            : undefined;
        return html `
      <more-facets-scroller
        .facetType=${this.facetKey}
        .extraFacetGroups=${this.extraFacetGroups}
        .buckets=${this.filteredBuckets}
        .collectionTitles=${this.collectionTitles}
        ?omitHideButtons=${this.facetGroup?.buckets.length === 1}
        label=${ifDefined(valuesLabel)}
        @facetClick=${this.facetClicked}
        @pageChanged=${this.pageChanged}
      ></more-facets-scroller>
      ${when(this.loadFailed, () => this.loadErrorTemplate, () => when(this.noValuesMatch, () => this.noMatchesTemplate))}
    `;
    }
    /**
     * A chiclet for each selected or hidden value, each with a button to clear it
     */
    get chicletsTemplate() {
        const valuesName = this.groupInfo?.pluralTitle ?? '';
        return html `
      <ul class="chiclets" aria-label=${msg(str `Selected ${valuesName}`)}>
        ${repeat(this.chosenBuckets, bucket => bucket.key, (bucket, index) => this.chicletTemplate(bucket, index))}
      </ul>
    `;
    }
    chicletTemplate(bucket, index) {
        const isHidden = bucket.state === 'hidden';
        const text = [bucket.displayText ?? bucket.key, bucket.extraNote]
            .filter(Boolean)
            .join(' ');
        const removeLabel = isHidden
            ? msg(str `Unhide ${text}`)
            : msg(str `Deselect ${text}`);
        return html `
      <li class="chiclet" title=${text}>
        <span class="chiclet-icon" aria-hidden="true"
          >${isHidden ? eyeClosedIcon : checkIcon}</span
        >
        <span class="sr-only"
          >${isHidden ? msg('Hidden:') : msg('Selected:')}</span
        >
        <span class="chiclet-text">${text}</span>
        <button
          type="button"
          class="chiclet-remove"
          aria-label=${removeLabel}
          @click=${() => this.chicletRemoved(bucket, index)}
        >
          ${closeCircleDark}
        </button>
      </li>
    `;
    }
    get noMatchesTemplate() {
        return html `<p class="facets-message no-matches" role="status">
      ${msg('No matching values found.')}
    </p>`;
    }
    get loadErrorTemplate() {
        return html `<p class="facets-message load-error" role="alert">
      ${msg('Sorry, these values couldn’t be loaded. Please try again later.')}
    </p>`;
    }
    get loaderTemplate() {
        return html `
      <ia-status-indicator
        class="facets-loader"
        mode="loading"
      ></ia-status-indicator>
    `;
    }
    get footerTemplate() {
        return html `
      <div class="footer">
        <button class="btn btn-cancel" type="button" @click=${this.cancelClick}>
          ${msg('Cancel')}
        </button>
        <button
          class="btn btn-submit"
          type="button"
          @click=${this.applySearchFacetsClicked}
        >
          ${msg('Apply filters')}
        </button>
      </div>
    `;
    }
    sortFacetAggregation(facetSortType) {
        this.sortedBy = facetSortType;
        this.dispatchEvent(new CustomEvent('sortedFacets', { detail: this.sortedBy }));
    }
    /** Title and sorts for this dialog's facet group. */
    get groupInfo() {
        return this.facetKey
            ? facetGroupInfo(this.facetKey, this.extraFacetGroups)
            : undefined;
    }
    get modalHeaderTemplate() {
        const facetSort = this.sortedBy ?? this.groupInfo?.sort;
        const defaultSwitchSide = facetSort === AggregationSortType.COUNT ? 'left' : 'right';
        const valuesName = this.groupInfo?.pluralTitle ?? '';
        // From the facet key rather than the facet group, which is missing
        // until the values load (or if they fail to)
        const title = this.groupInfo?.title ?? '';
        return html `<span class="sr-only">${msg('More facets for:')}</span>
      <span class="title">${title}</span>
      <span class="header-controls">
        <span class="sort-controls">
          <label class="sort-label">${msg('Sort by:')}</label>
          ${this.facetKey
            ? html `<toggle-switch
                class="sort-toggle"
                leftValue=${AggregationSortType.COUNT}
                leftLabel=${msg('Count')}
                rightValue=${this.groupInfo?.valueSort ??
                AggregationSortType.ALPHABETICAL}
                .rightLabel=${title}
                side=${defaultSwitchSide}
                @change=${(e) => {
                this.sortFacetAggregation(Number(e.detail));
            }}
              ></toggle-switch>`
            : nothing}
        </span>
        <span class="filter-controls">
          <label class="filter-label">${msg('Filter by:')}</label>
          <ia-clearable-text-input
            class="filter-input"
            .value=${this.filterText}
            .placeholder=${msg(str `Search ${valuesName}…`)}
            .screenReaderLabel=${msg(str `Filter ${valuesName}`)}
            .clearButtonScreenReaderLabel=${msg('Clear filter')}
            @input=${this.filterTextChanged}
          ></ia-clearable-text-input>
        </span>
      </span>`;
    }
    render() {
        return html `
      ${this.facetsLoading
            ? this.loaderTemplate
            : html `
            <section id="more-facets">
              <div class="header-content">${this.modalHeaderTemplate}</div>
              ${when(this.chosenBuckets.length, () => this.chicletsTemplate)}
              <div class="facets-content">${this.moreFacetsTemplate}</div>
              ${this.footerTemplate}
            </section>
          `}
    `;
    }
    /**
     * Handler for typing in (or clearing) the filter text field
     */
    filterTextChanged(e) {
        const input = e.target;
        this.filterText = input.value;
    }
    facetClicked(e) {
        if (!this.facetKey)
            return;
        this.unappliedFacetChanges = updateSelectedFacetBucket(this.unappliedFacetChanges, this.facetKey, e.detail.bucket);
    }
    /**
     * Clears the selection a chiclet stands for, which removes the chiclet and
     * unchecks the value in the list.
     */
    chicletRemoved(bucket, index) {
        if (!this.facetKey)
            return;
        this.unappliedFacetChanges = updateSelectedFacetBucket(this.unappliedFacetChanges, this.facetKey, { ...bucket, state: 'none' });
        this.chicletFocusIndex = index;
    }
    pageChanged(e) {
        this.analyticsHandler?.sendEvent({
            category: analyticsCategories.default,
            action: analyticsActions.moreFacetsPageChange,
            label: `${e.detail + 1}`,
        });
    }
    applySearchFacetsClicked() {
        const mergedSelections = mergeSelectedFacets(this.selectedFacets, this.unappliedFacetChanges);
        const event = new CustomEvent('facetsChanged', {
            detail: mergedSelections,
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
        // Reset the unapplied changes back to default, now that they have been applied
        this.unappliedFacetChanges = getDefaultSelectedFacets(this.extraFacetGroups);
        this.modalManager?.closeModal();
        this.analyticsHandler?.sendEvent({
            category: analyticsCategories.default,
            action: `${analyticsActions.applyMoreFacetsModal}`,
            label: `${this.facetKey}`,
        });
    }
    cancelClick() {
        // Reset the unapplied changes back to default
        this.unappliedFacetChanges = getDefaultSelectedFacets(this.extraFacetGroups);
        this.modalManager?.closeModal();
        this.analyticsHandler?.sendEvent({
            category: analyticsCategories.default,
            action: analyticsActions.closeMoreFacetsModal,
            label: `${this.facetKey}`,
        });
    }
    static get styles() {
        const modalSubmitButton = css `var(--primaryButtonBGColor, #194880)`;
        return [
            srOnlyStyle,
            css `
        section#more-facets {
          padding: 10px;
        }

        .header-content .title {
          display: block;
          text-align: left;
          font-size: 1.8rem;
          padding: 0 10px;
          font-weight: bold;
        }

        .header-controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 20px;
          padding: 5px 10px 0;
        }

        /* Each label stays on the same line as its control when these wrap */
        .sort-controls,
        .filter-controls {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        .sort-label,
        .filter-label {
          font-size: 1.3rem;
        }

        .sort-toggle {
          font-weight: normal;
        }

        .filter-input {
          --input-height: 2.5rem;
          --input-font-size: 1.3rem;
          --input-border-radius: 4px;
          --input-padding: 4px 8px;
          --input-focused-border-color: ${modalSubmitButton};
          width: 16rem;
        }

        .chiclets {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin: 0;
          padding: 10px 10px 0;
          list-style: none;
          /* About three rows; any more scroll, so the values stay in view */
          max-height: 7.8rem;
          overflow-y: auto;
        }

        .chiclet {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          max-width: 24rem;
          padding: 2px 3px 2px 6px;
          border: 1px solid ${modalSubmitButton};
          border-radius: 5px;
          background: #fff;
          color: #2c2c2c;
          font-size: 1.2rem;
          line-height: normal;
        }

        .chiclet-icon {
          display: flex;
          flex: none;
        }

        .chiclet-icon svg {
          width: 12px;
          height: 12px;
        }

        .chiclet-text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .chiclet-remove {
          display: flex;
          flex: none;
          padding: 2px;
          border: none;
          border-radius: 50%;
          background: none;
          cursor: pointer;
        }

        .chiclet-remove svg {
          width: 10px;
          height: 10px;
          opacity: 0.55;
        }

        .chiclet-remove:hover svg,
        .chiclet-remove:focus-visible svg {
          opacity: 1;
        }

        .facets-content {
          position: relative;
          font-size: 1.2rem;
          padding: 10px 0;
        }

        .facets-message {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          font-size: 1.4rem;
          color: #666;
        }

        .facets-loader {
          --icon-width: 70px;
          margin-bottom: 20px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .btn {
          border: none;
          padding: 10px;
          margin-bottom: 10px;
          width: auto;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
        }
        .btn-cancel {
          background-color: #2c2c2c;
          color: white;
        }
        .btn-submit {
          background-color: ${modalSubmitButton};
          color: white;
        }
        .footer {
          text-align: center;
        }

        @media (max-width: 560px) {
          /* The filter gets a line of its own here, so let it fill that line */
          .filter-controls {
            flex: 1 1 auto;
          }
          .filter-input {
            flex: 1 1 auto;
            width: auto;
            min-width: 12rem;
            --input-font-size: 1.2rem;
          }
        }
      `,
        ];
    }
};
__decorate([
    property({ type: String })
], MoreFacetsContent.prototype, "facetKey", void 0);
__decorate([
    property({ type: Array, attribute: false })
], MoreFacetsContent.prototype, "extraFacetGroups", void 0);
__decorate([
    property({ type: String })
], MoreFacetsContent.prototype, "query", void 0);
__decorate([
    property({ type: Array })
], MoreFacetsContent.prototype, "identifiers", void 0);
__decorate([
    property({ type: Object })
], MoreFacetsContent.prototype, "filterMap", void 0);
__decorate([
    property({ type: Number })
], MoreFacetsContent.prototype, "searchType", void 0);
__decorate([
    property({ type: Object })
], MoreFacetsContent.prototype, "pageSpecifierParams", void 0);
__decorate([
    property({ type: Object })
], MoreFacetsContent.prototype, "collectionTitles", void 0);
__decorate([
    property({ type: Object })
], MoreFacetsContent.prototype, "tvChannelAliases", void 0);
__decorate([
    property({ type: Boolean })
], MoreFacetsContent.prototype, "facetsLoading", void 0);
__decorate([
    property({ type: Object })
], MoreFacetsContent.prototype, "selectedFacets", void 0);
__decorate([
    property({ type: Number })
], MoreFacetsContent.prototype, "sortedBy", void 0);
__decorate([
    property({ type: Boolean })
], MoreFacetsContent.prototype, "isTvSearch", void 0);
__decorate([
    property({ type: Object })
], MoreFacetsContent.prototype, "modalManager", void 0);
__decorate([
    property({ type: Object })
], MoreFacetsContent.prototype, "searchService", void 0);
__decorate([
    property({ type: Object, attribute: false })
], MoreFacetsContent.prototype, "analyticsHandler", void 0);
__decorate([
    state()
], MoreFacetsContent.prototype, "aggregations", void 0);
__decorate([
    state()
], MoreFacetsContent.prototype, "facetGroup", void 0);
__decorate([
    state()
], MoreFacetsContent.prototype, "unappliedFacetChanges", void 0);
__decorate([
    state()
], MoreFacetsContent.prototype, "filterText", void 0);
__decorate([
    state()
], MoreFacetsContent.prototype, "loadFailed", void 0);
__decorate([
    query('more-facets-scroller')
], MoreFacetsContent.prototype, "scroller", void 0);
__decorate([
    query('ia-clearable-text-input')
], MoreFacetsContent.prototype, "filterInput", void 0);
MoreFacetsContent = __decorate([
    customElement('more-facets-content'),
    localized()
], MoreFacetsContent);
export { MoreFacetsContent };
