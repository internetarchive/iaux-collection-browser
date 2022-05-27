import { __decorate } from "tslib";
/* eslint-disable import/no-duplicates */
import { css, html, LitElement, nothing, } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import '@internetarchive/histogram-date-range';
import '@internetarchive/feature-feedback';
import '@internetarchive/collection-name-cache';
import eyeIcon from './assets/img/icons/eye';
import eyeClosedIcon from './assets/img/icons/eye-closed';
import chevronIcon from './assets/img/icons/chevron';
import { defaultSelectedFacets, } from './models';
const facetDisplayOrder = [
    'mediatype',
    'year',
    'subject',
    'collection',
    'creator',
    'language',
];
const aggregationToFacetOption = {
    subjectSorter: 'subject',
    mediatypeSorter: 'mediatype',
    languageSorter: 'language',
    creatorSorter: 'creator',
    collection: 'collection',
    year: 'year',
};
const facetTitles = {
    subject: 'Subject',
    mediatype: 'Media Type',
    language: 'Language',
    creator: 'Creator',
    collection: 'Collection',
    year: 'Year',
};
let CollectionFacets = class CollectionFacets extends LitElement {
    constructor() {
        super(...arguments);
        this.facetsLoading = false;
        this.fullYearAggregationLoading = false;
        this.collapsableFacets = false;
        this.showHistogramDatePicker = false;
        this.openFacets = {
            subject: false,
            mediatype: false,
            language: false,
            creator: false,
            collection: false,
            year: false,
        };
    }
    render() {
        return html `
      <div id="container" class="${this.facetsLoading ? 'loading' : ''}">
        ${this.showHistogramDatePicker && this.fullYearsHistogramAggregation
            ? html `
              <div class="facet-group">
                <h1>Year Published <feature-feedback></feature-feedback></h1>
                ${this.histogramTemplate}
              </div>
            `
            : nothing}
        ${this.mergedFacets.map(facetGroup => this.getFacetGroupTemplate(facetGroup))}
      </div>
    `;
    }
    updated(changed) {
        if (changed.has('selectedFacets')) {
            this.dispatchFacetsChangedEvent();
        }
    }
    dispatchFacetsChangedEvent() {
        const event = new CustomEvent('facetsChanged', {
            detail: this.selectedFacets,
        });
        this.dispatchEvent(event);
    }
    get currentYearsHistogramAggregation() {
        var _a;
        return (_a = this.aggregations) === null || _a === void 0 ? void 0 : _a.year_histogram;
    }
    get histogramTemplate() {
        const { fullYearsHistogramAggregation } = this;
        return html `
      <histogram-date-range
        .minDate=${fullYearsHistogramAggregation === null || fullYearsHistogramAggregation === void 0 ? void 0 : fullYearsHistogramAggregation.first_bucket_key}
        .maxDate=${fullYearsHistogramAggregation === null || fullYearsHistogramAggregation === void 0 ? void 0 : fullYearsHistogramAggregation.last_bucket_key}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .updateDelay=${100}
        missingDataMessage="..."
        .width=${180}
        .bins=${fullYearsHistogramAggregation === null || fullYearsHistogramAggregation === void 0 ? void 0 : fullYearsHistogramAggregation.buckets}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      ></histogram-date-range>
    `;
    }
    histogramDateRangeUpdated(e) {
        const { minDate, maxDate } = e.detail;
        const event = new CustomEvent('histogramDateRangeUpdated', {
            detail: { minDate, maxDate },
        });
        this.dispatchEvent(event);
    }
    /**
     * Combines the selected facets with the aggregations to create a single list of facets
     */
    get mergedFacets() {
        const facetGroups = [];
        facetDisplayOrder.forEach(facetKey => {
            var _a;
            const selectedFacetGroup = this.selectedFacetGroups.find(group => group.key === facetKey);
            const aggregateFacetGroup = this.aggregationFacetGroups.find(group => group.key === facetKey);
            // if the user selected a facet, but it's not in the aggregation, we add it as-is
            if (selectedFacetGroup && !aggregateFacetGroup) {
                facetGroups.push(selectedFacetGroup);
                return;
            }
            // if we don't have an aggregate facet group, don't add this to the list
            if (!aggregateFacetGroup)
                return;
            // start with either the selected group if we have one, or the aggregate group
            const facetGroup = selectedFacetGroup !== null && selectedFacetGroup !== void 0 ? selectedFacetGroup : aggregateFacetGroup;
            // attach the counts to the selected buckets
            const bucketsWithCount = (_a = selectedFacetGroup === null || selectedFacetGroup === void 0 ? void 0 : selectedFacetGroup.buckets.map(bucket => {
                const selectedBucket = aggregateFacetGroup.buckets.find(b => b.key === bucket.key);
                return selectedBucket
                    ? {
                        ...bucket,
                        count: selectedBucket.count,
                    }
                    : bucket;
            })) !== null && _a !== void 0 ? _a : [];
            // append any additional buckets that were not selected
            aggregateFacetGroup.buckets.forEach(bucket => {
                const existingBucket = bucketsWithCount.find(b => b.key === bucket.key);
                if (existingBucket)
                    return;
                bucketsWithCount.push(bucket);
            });
            facetGroup.buckets = bucketsWithCount.splice(0, 5);
            facetGroups.push(facetGroup);
        });
        return facetGroups;
    }
    /**
     * Converts the selected facets to a `FacetGroup` array,
     * which is easier to work with
     */
    get selectedFacetGroups() {
        if (!this.selectedFacets)
            return [];
        const facetGroups = Object.entries(this.selectedFacets).map(([key, selectedFacets]) => {
            const option = key;
            const title = facetTitles[option];
            const buckets = Object.entries(selectedFacets).map(([value, facetState]) => {
                var _a, _b;
                let displayText = value;
                // for selected languages, we store the language code instead of the
                // display name, so look up the name from the mapping
                if (option === 'language') {
                    displayText =
                        (_b = (_a = this.languageCodeHandler) === null || _a === void 0 ? void 0 : _a.getLanguageNameFromCodeString(value)) !== null && _b !== void 0 ? _b : value;
                }
                return {
                    displayText,
                    key: value,
                    count: 0,
                    state: facetState,
                };
            });
            return {
                title,
                key: option,
                buckets,
            };
        });
        return facetGroups;
    }
    /**
     * Converts the raw `aggregations` to `FacetGroups`, which are easier to use
     */
    get aggregationFacetGroups() {
        var _a;
        const facetGroups = [];
        Object.entries((_a = this.aggregations) !== null && _a !== void 0 ? _a : []).forEach(([key, buckets]) => {
            // the year_histogram data is in a different format so can't be handled here
            if (key === 'year_histogram')
                return;
            const option = this.getFacetOptionFromKey(key);
            const title = facetTitles[option];
            const castedBuckets = buckets.buckets;
            const facetBuckets = castedBuckets.map(bucket => {
                var _a, _b;
                let bucketKey = bucket.key;
                // for languages, we need to search by language code instead of the
                // display name, which is what we get from the search engine result
                if (option === 'language') {
                    // const languageCodeKey = languageToCodeMap[bucket.key];
                    bucketKey =
                        (_b = (_a = this.languageCodeHandler) === null || _a === void 0 ? void 0 : _a.getCodeStringFromLanguageName(`${bucket.key}`)) !== null && _b !== void 0 ? _b : bucket.key;
                    // bucketKey = languageCodeKey ?? bucket.key;
                }
                return {
                    displayText: `${bucket.key}`,
                    key: `${bucketKey}`,
                    count: bucket.doc_count,
                    state: 'none',
                };
            });
            const group = {
                title,
                key: option,
                buckets: facetBuckets,
            };
            facetGroups.push(group);
        });
        return facetGroups;
    }
    /**
     * Generate the template for a facet group with a header and the collapsible
     * chevron for the mobile view
     */
    getFacetGroupTemplate(facetGroup) {
        if (facetGroup.buckets.length === 0)
            return nothing;
        const { key } = facetGroup;
        const isOpen = this.openFacets[key];
        const collapser = html `
      <span class="collapser ${isOpen ? 'open' : ''}"> ${chevronIcon} </span>
    `;
        return html `
      <div class="facet-group ${this.collapsableFacets ? 'mobile' : ''}">
        <h1
          @click=${() => {
            const newOpenFacets = { ...this.openFacets };
            newOpenFacets[key] = !isOpen;
            this.openFacets = newOpenFacets;
        }}
          @keyup=${() => {
            const newOpenFacets = { ...this.openFacets };
            newOpenFacets[key] = !isOpen;
            this.openFacets = newOpenFacets;
        }}
        >
          ${this.collapsableFacets ? collapser : nothing} ${facetGroup.title}
        </h1>
        <div class="facet-group-content ${isOpen ? 'open' : ''}">
          ${this.getFacetTemplate(facetGroup)}
        </div>
      </div>
    `;
    }
    /**
     * Generate the list template for each bucket in a facet group
     */
    getFacetTemplate(facetGroup) {
        const bucketsNoFavorites = facetGroup.buckets.filter(bucket => bucket.key.startsWith('fav-') === false);
        const bucketsMaxSix = bucketsNoFavorites.slice(0, 6);
        return html `
      <ul class="facet-list">
        ${repeat(bucketsMaxSix, bucket => `${facetGroup.key}:${bucket.key}`, bucket => {
            var _a, _b;
            const showOnlyCheckboxId = `${facetGroup.key}:${bucket.key}-show-only`;
            const negativeCheckboxId = `${facetGroup.key}:${bucket.key}-negative`;
            // for collections, we need to asynchronously load the collection name
            // so we use the `async-collection-name` widget and for the rest, we have
            // a static value to use
            const bucketTextDisplay = facetGroup.key !== 'collection'
                ? html `${(_a = bucket.displayText) !== null && _a !== void 0 ? _a : bucket.key}`
                : html `
                    <async-collection-name
                      .collectionNameCache=${this.collectionNameCache}
                      .identifier=${bucket.key}
                      placeholder="-"
                    ></async-collection-name>
                  `;
            const facetHidden = bucket.state === 'hidden';
            const facetSelected = bucket.state === 'selected';
            const titleText = `${facetGroup.key}: ${(_b = bucket.displayText) !== null && _b !== void 0 ? _b : bucket.key}`;
            const onlyShowText = facetSelected
                ? `Show all ${facetGroup.key}s`
                : `Only show ${titleText}`;
            const hideText = `Hide ${titleText}`;
            const unhideText = `Unhide ${titleText}`;
            const showHideText = facetHidden ? unhideText : hideText;
            return html `
              <li>
                <div class="facet-row">
                  <div class="facet-checkbox">
                    <input
                      type="checkbox"
                      .name=${facetGroup.key}
                      .value=${bucket.key}
                      @click=${(e) => {
                this.facetClicked(e, bucket, false);
            }}
                      .checked=${facetSelected}
                      class="select-facet-checkbox"
                      title=${onlyShowText}
                      id=${showOnlyCheckboxId}
                    />
                    <input
                      type="checkbox"
                      id=${negativeCheckboxId}
                      .name=${facetGroup.key}
                      .value=${bucket.key}
                      @click=${(e) => {
                this.facetClicked(e, bucket, true);
            }}
                      .checked=${facetHidden}
                      class="hide-facet-checkbox"
                    />
                    <label
                      for=${negativeCheckboxId}
                      class="hide-facet-icon"
                      title=${showHideText}
                    >
                      ${facetHidden ? eyeClosedIcon : eyeIcon}
                    </label>
                  </div>

                  <label
                    for=${showOnlyCheckboxId}
                    class="facet-info-display"
                    title=${onlyShowText}
                  >
                    <div class="facet-title">${bucketTextDisplay}</div>
                    <div class="facet-count">${bucket.count}</div>
                  </label>
                </div>
              </li>
            `;
        })}
      </ul>
    `;
    }
    facetClicked(e, bucket, negative) {
        const target = e.target;
        const { checked, name, value } = target;
        if (checked) {
            this.facetChecked(name, value, negative);
        }
        else {
            this.facetUnchecked(name, value);
        }
    }
    facetChecked(key, value, negative) {
        const { selectedFacets } = this;
        let newFacets;
        if (selectedFacets) {
            newFacets = {
                ...selectedFacets,
            };
        }
        else {
            newFacets = defaultSelectedFacets;
        }
        newFacets[key][value] = negative ? 'hidden' : 'selected';
        this.selectedFacets = newFacets;
    }
    facetUnchecked(key, value) {
        const { selectedFacets } = this;
        let newFacets;
        if (selectedFacets) {
            newFacets = {
                ...selectedFacets,
            };
        }
        else {
            newFacets = defaultSelectedFacets;
        }
        delete newFacets[key][value];
        this.selectedFacets = newFacets;
    }
    /**
     * Parse the aggregate key title into the human readable title
     *
     * Example: user_aggs__terms__field:mediatypeSorter__size:6 => Media Type
     *
     * @param key
     * @returns
     */
    getFacetOptionFromKey(key) {
        const parts = key.split('__');
        const fieldNamePart = parts[2];
        const fieldName = fieldNamePart.split(':')[1];
        const facetMatch = Object.entries(aggregationToFacetOption).find(([key2]) => fieldName.includes(key2));
        const option = facetMatch === null || facetMatch === void 0 ? void 0 : facetMatch[1];
        if (!option)
            throw new Error(`Could not find facet option for key: ${key}`);
        return option;
    }
    static get styles() {
        return css `
      #container.loading {
        opacity: 0.5;
      }

      .collapser {
        display: inline-block;
        cursor: pointer;
        width: 10px;
        height: 10px;
      }

      .collapser svg {
        transition: transform 0.2s ease-in-out;
      }

      .collapser.open svg {
        transform: rotate(90deg);
      }

      .facet-group {
        margin-bottom: 2rem;
      }

      .facet-group h1 {
        margin-bottom: 0.7rem;
      }

      .facet-group.mobile h1 {
        cursor: pointer;
      }

      .facet-group-content {
        transition: max-height 0.2s ease-in-out;
      }

      .facet-group.mobile .facet-group-content {
        max-height: 0;
        overflow: hidden;
      }

      .facet-group.mobile .facet-group-content.open {
        max-height: 2000px;
      }

      h1 {
        font-size: 1.4rem;
        font-weight: 200;
        border-bottom: 1px solid rgb(232, 232, 232);
        padding-bottom: 3px;
        margin: 0;
      }

      ul.facet-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      ul.facet-list li {
        margin-bottom: 0.2rem;
      }

      .facet-checkbox {
        margin-right: 0.5rem;
        display: flex;
        align-items: center;
      }

      .facet-row {
        display: flex;
        align-items: start;
        font-weight: 500;
        font-size: 1.2rem;
      }

      .facet-info-display {
        display: flex;
        flex: 1;
        cursor: pointer;
      }

      .facet-title {
        flex: 1;
      }

      .facet-count {
        margin-left: 0.5rem;
      }

      .select-facet-checkbox {
        cursor: pointer;
        margin-right: 5px;
      }

      .hide-facet-checkbox {
        display: none;
      }

      .hide-facet-icon {
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], CollectionFacets.prototype, "aggregations", void 0);
__decorate([
    property({ type: Object })
], CollectionFacets.prototype, "fullYearsHistogramAggregation", void 0);
__decorate([
    property({ type: String })
], CollectionFacets.prototype, "minSelectedDate", void 0);
__decorate([
    property({ type: String })
], CollectionFacets.prototype, "maxSelectedDate", void 0);
__decorate([
    property({ type: Boolean })
], CollectionFacets.prototype, "facetsLoading", void 0);
__decorate([
    property({ type: Boolean })
], CollectionFacets.prototype, "fullYearAggregationLoading", void 0);
__decorate([
    property({ type: Object })
], CollectionFacets.prototype, "selectedFacets", void 0);
__decorate([
    property({ type: Boolean })
], CollectionFacets.prototype, "collapsableFacets", void 0);
__decorate([
    property({ type: Boolean })
], CollectionFacets.prototype, "showHistogramDatePicker", void 0);
__decorate([
    property({ type: Object })
], CollectionFacets.prototype, "languageCodeHandler", void 0);
__decorate([
    property({ type: Object })
], CollectionFacets.prototype, "collectionNameCache", void 0);
__decorate([
    state()
], CollectionFacets.prototype, "openFacets", void 0);
CollectionFacets = __decorate([
    customElement('collection-facets')
], CollectionFacets);
export { CollectionFacets };
//# sourceMappingURL=collection-facets.js.map