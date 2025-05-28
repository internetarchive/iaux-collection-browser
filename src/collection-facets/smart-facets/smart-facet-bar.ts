import {
  css,
  html,
  LitElement,
  TemplateResult,
  CSSResultGroup,
  nothing,
  PropertyValues,
} from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { customElement, property, state } from 'lit/decorators.js';
import type { Aggregation, Bucket } from '@internetarchive/search-service';
import type { CollectionTitles } from '../../data-source/models';
import type { FacetOption, SelectedFacets } from '../../models';
import { updateSelectedFacetBucket } from '../../utils/facet-utils';
import { SmartQueryHeuristicGroup } from './smart-facet-heuristics';
import type { SmartFacetDropdown } from './smart-facet-dropdown';
import type { SmartFacet, SmartFacetEvent } from './models';
import { smartFacetEquals } from './smart-facet-equals';
import { dedupe } from './dedupe';
import filterIcon from '../../assets/img/icons/filter';

import './smart-facet-button';
import './smart-facet-dropdown';
import { log } from '../../utils/log';

const fieldPrefixes: Partial<Record<FacetOption, string>> = {
  collection: 'Collection: ',
  creator: 'By: ',
  subject: 'About: ',
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

@customElement('smart-facet-bar')
export class SmartFacetBar extends LitElement {
  @property({ type: String }) query?: string;

  @property({ type: Object }) aggregations?: Record<string, Aggregation>;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  /** The map from collection identifiers to their titles */
  @property({ type: Object })
  collectionTitles?: CollectionTitles;

  @property({ type: Boolean }) filterToggleActive = false;

  @state() private heuristicRecs: SmartFacet[] = [];

  @state() private smartFacets: SmartFacet[][] = [];

  @state() private lastAggregations?: Record<string, Aggregation>;

  //
  // COMPONENT LIFECYCLE METHODS
  //

  render() {
    return html`
      <div id="smart-facets-container">
        ${this.filtersToggleTemplate}
        ${repeat(
          this.smartFacets,
          f =>
            `${f[0].label}|${f[0].facets[0].facetType}|${f[0].facets[0].bucketKey}`,
          facet => this.makeSmartFacet(facet),
        )}
      </div>
    `;
  }

  protected willUpdate(changed: PropertyValues): void {
    let shouldUpdateSmartFacets = false;

    if (changed.has('query')) {
      log('query change', changed.get('query'), this.query);
      this.lastAggregations = undefined;
      shouldUpdateSmartFacets = true;
    }

    if (
      changed.has('aggregations') &&
      !this.lastAggregations &&
      this.aggregations &&
      Object.keys(this.aggregations).length > 0
    ) {
      log('aggs change', changed.get('aggregations'), this.aggregations);
      this.lastAggregations = this.aggregations;
      shouldUpdateSmartFacets = true;
    }

    if (shouldUpdateSmartFacets) {
      log('should update smart facets, doing so...');
      this.updateSmartFacets();
    }
  }

  private async updateSmartFacets(): Promise<void> {
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

  private makeSmartFacet(facets: SmartFacet[]) {
    if (facets.length === 0) {
      return nothing;
    }
    if (facets.length === 1) {
      return this.smartFacetButton(facets[0]);
    }
    return this.smartFacetDropdown(facets);
  }

  private smartFacetButton(facet: SmartFacet) {
    return html`
      <smart-facet-button
        .facetInfo=${facet}
        .labelPrefix=${fieldPrefixes[facet.facets[0].facetType]}
        .selected=${facet.selected ?? false}
        @facetClick=${this.facetClicked}
      ></smart-facet-button>
    `;
  }

  private smartFacetDropdown(facets: SmartFacet[]) {
    return html`
      <smart-facet-dropdown
        .facetInfo=${facets}
        .labelPrefix=${fieldPrefixes[facets[0].facets[0].facetType]}
        .activeFacetRef=${facets[0].facets[0]}
        @facetClick=${this.facetDropdownClicked}
        @dropdownClick=${this.onDropdownClick}
      ></smart-facet-dropdown>
    `;
  }

  private get filtersToggleTemplate(): TemplateResult {
    return html`
      <button
        id="filters-toggle"
        class=${this.filterToggleActive ? 'active' : ''}
        title="${this.filterToggleActive ? 'Hide' : 'Show'} filters pane"
        @click=${this.filterToggleClicked}
      >
        ${filterIcon}
      </button>
    `;
  }

  private get facetsToDisplay(): SmartFacet[][] {
    const facets: SmartFacet[][] = [];

    if (this.heuristicRecs.length > 0) {
      for (const rec of this.heuristicRecs) {
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
        if (!agg) continue;
        if (agg.buckets.length === 0) continue;
        if (['lending', 'year_histogram'].includes(key)) continue;
        if (typeof agg.buckets[0] === 'number') continue;

        if (
          key === 'mediatype' &&
          this.selectedFacets &&
          Object.values(this.selectedFacets.mediatype).some(
            bucket => bucket.state !== 'none',
          )
        ) {
          continue;
        }

        const facetType = key as FacetOption;
        const buckets = agg.buckets as Bucket[];

        const unusedBuckets = buckets.filter(b => {
          const selectedFacetBucket = this.selectedFacets?.[facetType][b.key];
          if (selectedFacetBucket && selectedFacetBucket.state !== 'none') {
            return false;
          }
          return true;
        });

        if (facetType === 'mediatype') {
          facets.push(
            [this.toSmartFacet(facetType, [unusedBuckets[0]])],
            [this.toSmartFacet(facetType, [unusedBuckets[1]])],
          );
        } else if (facetType === 'collection' || facetType === 'subject') {
          const topBuckets = unusedBuckets.slice(0, 5);
          facets.push(topBuckets.map(b => this.toSmartFacet(facetType, [b])));
        } else {
          facets.push([this.toSmartFacet(facetType, [unusedBuckets[0]])]);
        }
      }
    }

    return facets;
  }

  private toSmartFacet(
    facetType: FacetOption,
    buckets: Bucket[],
    // prefix = true
  ): SmartFacet {
    return {
      facets: buckets.map(bucket => {
        let displayText = capitalize(bucket.key.toString());
        if (facetType === 'collection') {
          const title = this.collectionTitles?.get(bucket.key.toString());
          if (title) displayText = title;
        }

        return {
          facetType,
          bucketKey: bucket.key.toString(),
          displayText,
        };
      }),
    } as SmartFacet;
  }

  private facetClicked(e: CustomEvent<SmartFacetEvent>): void {
    if (!e.detail.smartFacet.selected) {
      this.smartFacets = [
        [{ ...e.detail.smartFacet, selected: true }],
        ...this.smartFacets.filter(f => f[0] !== e.detail.smartFacet),
      ];
    }

    for (const facet of e.detail.details) {
      this.selectedFacets = updateSelectedFacetBucket(
        this.selectedFacets,
        facet.facetType,
        facet.bucket,
        true,
      );
    }

    const event = new CustomEvent<SelectedFacets>('facetsChanged', {
      detail: this.selectedFacets,
    });
    this.dispatchEvent(event);
  }

  private facetDropdownClicked(e: CustomEvent<SmartFacetEvent>): void {
    if (
      this.smartFacets.find(sf => smartFacetEquals(sf[0], e.detail.smartFacet))
    ) {
      return;
    }

    this.smartFacets = [
      [{ ...e.detail.smartFacet, selected: true }],
      ...this.smartFacets,
    ];

    for (const facet of e.detail.details) {
      this.selectedFacets = updateSelectedFacetBucket(
        this.selectedFacets,
        facet.facetType,
        facet.bucket,
        true,
      );
    }

    const event = new CustomEvent<SelectedFacets>('facetsChanged', {
      detail: this.selectedFacets,
    });
    this.dispatchEvent(event);
  }

  private onDropdownClick(e: CustomEvent<SmartFacetDropdown>): void {
    log('smart bar: onDropdownClick', e.detail);
    this.shadowRoot
      ?.querySelectorAll('smart-facet-dropdown')
      .forEach(dropdown => {
        if (dropdown !== e.detail) {
          log('closing', dropdown);
          (dropdown as SmartFacetDropdown).close();
        }
      });
  }

  private filterToggleClicked(): void {
    this.dispatchEvent(new CustomEvent('filtersToggled'));
  }

  //
  // STYLES
  //

  static get styles(): CSSResultGroup {
    return css`
      #smart-facets-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px 10px;
        padding: 10px 0;
      }

      #filters-toggle {
        margin: 0;
        border: 0;
        padding: 5px 8px;
        border-radius: 50%;
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
    `;
  }
}
