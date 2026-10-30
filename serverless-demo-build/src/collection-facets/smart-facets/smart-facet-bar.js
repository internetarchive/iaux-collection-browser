var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing, } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { customElement, property, state } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { updateSelectedFacetBucket } from '../../utils/facet-utils';
import { SmartQueryHeuristicGroup } from './smart-facet-heuristics';
import { smartFacetEquals } from './smart-facet-equals';
import { dedupe } from './dedupe';
import { log } from '../../utils/log';
import filterIcon from '../../assets/img/icons/filter';
import './smart-facet-button';
import './smart-facet-dropdown';
const fieldPrefixes = {
    collection: 'Collection: ',
    creator: 'By: ',
    subject: 'About: ',
};
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
let SmartFacetBar = class SmartFacetBar extends LitElement {
    constructor() {
        super(...arguments);
        this.filterToggleShown = false;
        this.filterToggleActive = false;
        this.heuristicRecs = [];
        this.smartFacets = [];
    }
    //
    // COMPONENT LIFECYCLE METHODS
    //
    render() {
        if (!this.query)
            return nothing;
        const shouldShowLabel = !!this.label && this.smartFacets.length > 0;
        return html `
      <div id="smart-facets-container">
        ${this.filtersToggleTemplate}
        ${shouldShowLabel
            ? html `<p id="filters-label">${this.label}</p>`
            : nothing}
        ${repeat(this.smartFacets, f => `${f[0].label}|${f[0].facets[0].facetType}|${f[0].facets[0].bucketKey}`, facet => this.makeSmartFacet(facet))}
      </div>
    `;
    }
    willUpdate(changed) {
        let shouldUpdateSmartFacets = false;
        if (changed.has('query')) {
            log('query change', changed.get('query'), this.query);
            this.lastAggregations = undefined;
            shouldUpdateSmartFacets = true;
        }
        if (changed.has('aggregations') &&
            !this.lastAggregations &&
            this.aggregations &&
            Object.keys(this.aggregations).length > 0) {
            log('aggs change', changed.get('aggregations'), this.aggregations);
            this.lastAggregations = this.aggregations;
            shouldUpdateSmartFacets = true;
        }
        if (shouldUpdateSmartFacets) {
            log('should update smart facets, doing so...');
            this.updateSmartFacets();
        }
    }
    refresh() {
        this.lastAggregations = this.aggregations;
        this.updateSmartFacets();
    }
    deselectAll() {
        for (const sf of this.smartFacets) {
            for (const facet of sf) {
                facet.selected = false;
            }
        }
        this.requestUpdate();
    }
    async updateSmartFacets() {
        log('updating smart facets');
        if (this.query) {
            this.heuristicRecs =
                await new SmartQueryHeuristicGroup().getRecommendedFacets(this.query);
            log('heuristic recs are', this.heuristicRecs);
            this.smartFacets = dedupe(this.facetsToDisplay);
            log('smart facets are', this.smartFacets);
        }
    }
    //
    // OTHER METHODS
    //
    makeSmartFacet(facets) {
        if (facets.length === 0) {
            return nothing;
        }
        if (facets.length === 1) {
            return this.smartFacetButton(facets[0]);
        }
        return this.smartFacetDropdown(facets);
    }
    smartFacetButton(facet) {
        return html `
      <smart-facet-button
        .facetInfo=${facet}
        .labelPrefix=${fieldPrefixes[facet.facets[0].facetType]}
        .selected=${facet.selected ?? false}
        @facetClick=${this.facetClicked}
      ></smart-facet-button>
    `;
    }
    smartFacetDropdown(facets) {
        return html `
      <smart-facet-dropdown
        .facetInfo=${facets}
        .labelPrefix=${fieldPrefixes[facets[0].facets[0].facetType]}
        .activeFacetRef=${facets[0].facets[0]}
        @facetClick=${this.dropdownOptionClicked}
        @dropdownClick=${this.dropdownClicked}
      ></smart-facet-dropdown>
    `;
    }
    get filtersToggleTemplate() {
        if (!this.filterToggleShown)
            return nothing;
        return html `
      <button
        id="filters-toggle"
        class=${this.filterToggleActive ? 'active' : ''}
        title=${this.filterToggleActive
            ? msg('Hide filters pane')
            : msg('Show filters pane')}
        @click=${this.filterToggleClicked}
      >
        ${filterIcon}
      </button>
    `;
    }
    get facetsToDisplay() {
        const facets = [];
        if (this.heuristicRecs.length > 0) {
            for (const rec of this.heuristicRecs) {
                // Suppress mediatype-only facets for now.
                if (rec.facets.length === 1 && rec.facets[0].facetType === 'mediatype')
                    continue;
                facets.push([rec]);
            }
        }
        if (this.lastAggregations) {
            const keys = [
                'mediatype',
                'year',
                'language',
                'creator',
                'subject',
                'collection',
            ];
            for (const key of keys) {
                const agg = this.lastAggregations[key];
                if (!agg)
                    continue;
                if (agg.buckets.length === 0)
                    continue;
                if (['lending', 'year_histogram', 'date_histogram'].includes(key))
                    continue;
                if (typeof agg.buckets[0] === 'number')
                    continue;
                if (key === 'mediatype' &&
                    this.selectedFacets &&
                    Object.values(this.selectedFacets.mediatype ?? {}).some(bucket => bucket.state !== 'none')) {
                    continue;
                }
                const facetType = key;
                const buckets = agg.buckets;
                const unusedBuckets = buckets.filter(b => {
                    const selectedFacetBucket = this.selectedFacets?.[facetType]?.[b.key];
                    if (selectedFacetBucket && selectedFacetBucket.state !== 'none') {
                        return false;
                    }
                    return true;
                });
                if (facetType === 'mediatype') {
                    continue;
                    // Don't include mediatype bubbles
                }
                else if (facetType === 'collection' || facetType === 'subject') {
                    const topBuckets = unusedBuckets.slice(0, 5);
                    facets.push(topBuckets.map(b => this.toSmartFacet(facetType, [b])));
                }
                else {
                    facets.push([this.toSmartFacet(facetType, [unusedBuckets[0]])]);
                }
            }
        }
        return facets;
    }
    toSmartFacet(facetType, buckets) {
        return {
            facets: buckets.map(bucket => {
                let displayText = capitalize(bucket.key.toString());
                if (facetType === 'collection') {
                    const title = this.collectionTitles?.get(bucket.key.toString());
                    if (title)
                        displayText = title;
                }
                return {
                    facetType,
                    bucketKey: bucket.key.toString(),
                    displayText,
                };
            }),
        };
    }
    /**
     * Toggles the state of the given smart facet, and updates the selected facets accordingly.
     */
    toggleSmartFacet(facet, details) {
        let newState;
        if (facet.selected) {
            // When deselected, leave the smart facet where it is
            newState = 'none';
            this.smartFacets = this.smartFacets.map(f => {
                if (f[0] === facet)
                    return [{ ...facet, selected: false }];
                return f;
            });
        }
        else {
            // When selected, move the toggled smart facet to the front of the list
            newState = 'selected';
            this.smartFacets = [
                [{ ...facet, selected: true }],
                ...this.smartFacets.filter(f => f[0] !== facet),
            ];
        }
        this.updateSelectedFacets(details.map(facet => ({
            ...facet,
            bucket: {
                ...facet.bucket,
                state: newState,
            },
        })));
    }
    /**
     * Updates the selected facet buckets for each of the given facets,
     * and emits a `facetsChanged` event to notify parent components of
     * the new state.
     */
    updateSelectedFacets(facets) {
        for (const facet of facets) {
            this.selectedFacets = updateSelectedFacetBucket(this.selectedFacets, facet.facetType, facet.bucket, true);
        }
        const event = new CustomEvent('facetsChanged', {
            detail: this.selectedFacets,
        });
        this.dispatchEvent(event);
    }
    /**
     * Handler for when a smart facet button is clicked
     */
    facetClicked(e) {
        this.toggleSmartFacet(e.detail.smartFacet, e.detail.details);
    }
    /**
     * Handler for when an option in a smart facet dropdown menu is selected
     */
    dropdownOptionClicked(e) {
        const existingFacet = this.smartFacets.find(sf => sf.length === 1 && smartFacetEquals(sf[0], e.detail.smartFacet));
        if (existingFacet) {
            // The facet already exists outside the dropdown, so just select it there
            this.toggleSmartFacet(existingFacet[0], e.detail.details);
            return;
        }
        // Otherwise, prepend a new smart facet for the selected option
        this.smartFacets = [
            [{ ...e.detail.smartFacet, selected: true }],
            ...this.smartFacets,
        ];
        this.updateSelectedFacets(e.detail.details);
    }
    /**
     * Handler for when any dropdown is clicked (whether button, caret, or menu item)
     */
    dropdownClicked(e) {
        log('smart bar: onDropdownClick', e.detail);
        this.shadowRoot
            ?.querySelectorAll('smart-facet-dropdown')
            .forEach(dropdown => {
            if (dropdown !== e.detail) {
                log('closing', dropdown);
                dropdown.close();
            }
        });
    }
    filterToggleClicked() {
        this.dispatchEvent(new CustomEvent('filtersToggled'));
    }
    //
    // STYLES
    //
    static get styles() {
        return css `
      #smart-facets-container {
        display: flex;
        align-items: center;
        gap: 5px 10px;
        padding: 10px 0;
        white-space: nowrap;
        overflow: scroll hidden;
        scrollbar-width: none;
      }

      #filters-toggle {
        margin: 0;
        border: 0;
        padding: 5px 8px;
        border-radius: 5px;
        background: white;
        color: #2c2c2c;
        border: 1px solid #194880;
        font-size: 1.4rem;
        font-family: inherit;
        text-decoration: none;
        cursor: pointer;
      }

      #filters-toggle.active {
        background: #194880;
        color: white;
      }

      #filters-toggle > svg {
        width: 12px;
        filter: invert(0.16667);
        vertical-align: -1px;
      }

      #filters-toggle.active > svg {
        filter: invert(1);
      }

      #filters-label {
        font-size: 1.4rem;
        font-weight: var(--smartFacetLabelFontWeight, normal);
        margin: 0 -5px 0 0;
      }
    `;
    }
};
__decorate([
    property({ type: String })
], SmartFacetBar.prototype, "query", void 0);
__decorate([
    property({ type: Object })
], SmartFacetBar.prototype, "aggregations", void 0);
__decorate([
    property({ type: Object })
], SmartFacetBar.prototype, "selectedFacets", void 0);
__decorate([
    property({ type: Object })
], SmartFacetBar.prototype, "collectionTitles", void 0);
__decorate([
    property({ type: Boolean })
], SmartFacetBar.prototype, "filterToggleShown", void 0);
__decorate([
    property({ type: Boolean })
], SmartFacetBar.prototype, "filterToggleActive", void 0);
__decorate([
    property({ type: String })
], SmartFacetBar.prototype, "label", void 0);
__decorate([
    state()
], SmartFacetBar.prototype, "heuristicRecs", void 0);
__decorate([
    state()
], SmartFacetBar.prototype, "smartFacets", void 0);
__decorate([
    state()
], SmartFacetBar.prototype, "lastAggregations", void 0);
SmartFacetBar = __decorate([
    customElement('smart-facet-bar'),
    localized()
], SmartFacetBar);
export { SmartFacetBar };
