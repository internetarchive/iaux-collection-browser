/* eslint-disable import/no-duplicates */
import {
  css,
  html,
  LitElement,
  PropertyValues,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  Aggregation,
  Bucket,
  SearchServiceInterface,
} from '@internetarchive/search-service';
import '@internetarchive/histogram-date-range';
import '@internetarchive/feature-feedback';
import '@internetarchive/collection-name-cache';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import {
  ModalConfig,
  ModalManagerInterface,
} from '@internetarchive/modal-manager';
import chevronIcon from './assets/img/icons/chevron';
import {
  FacetOption,
  SelectedFacets,
  FacetGroup,
  FacetBucket,
  facetDisplayOrder,
  facetTitles,
  aggregationToFacetOption,
} from './models';
import type { LanguageCodeHandlerInterface } from './language-code-handler/language-code-handler';
import { getFacetOptionFromKey } from './collection-facets/facets-util';
import './collection-facets/more-facets-content';
import './collection-facets/facets-template';

@customElement('collection-facets')
export class CollectionFacets extends LitElement {
  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: Object }) aggregations?: Record<string, Aggregation>;

  @property({ type: Object }) fullYearsHistogramAggregation?: Aggregation;

  @property({ type: String }) minSelectedDate?: string;

  @property({ type: String }) maxSelectedDate?: string;

  @property({ type: Boolean }) facetsLoading = false;

  @property({ type: Boolean }) fullYearAggregationLoading = false;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: Boolean }) collapsableFacets = false;

  @property({ type: Boolean }) showHistogramDatePicker = false;

  @property({ type: String }) fullQuery?: string;

  @property({ type: Object }) modalManager?: ModalManagerInterface;

  @property({ type: Object })
  languageCodeHandler?: LanguageCodeHandlerInterface;

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  @state() openFacets: Record<FacetOption, boolean> = {
    subject: false,
    mediatype: false,
    language: false,
    creator: false,
    collection: false,
    year: false,
  };

  /**
   * If listed facets on page more then this number,
   * - show the more link button just below the facets group
   */
  private moreLinkEligibilityCount = 5;

  render() {
    return html`
      <div id="container" class="${this.facetsLoading ? 'loading' : ''}">
        ${this.showHistogramDatePicker && this.fullYearsHistogramAggregation
          ? html`
              <div class="facet-group">
                <h1>Year Published <feature-feedback></feature-feedback></h1>
                ${this.histogramTemplate}
              </div>
            `
          : nothing}
        ${this.mergedFacets.map(facetGroup =>
          this.getFacetGroupTemplate(facetGroup)
        )}
      </div>
    `;
  }

  updated(changed: PropertyValues) {
    if (changed.has('selectedFacets')) {
      this.dispatchFacetsChangedEvent();
    }
  }

  // TODO: want to fire analytics?
  private dispatchFacetsChangedEvent() {
    const event = new CustomEvent<SelectedFacets>('facetsChanged', {
      detail: this.selectedFacets,
    });
    this.dispatchEvent(event);
  }

  private get currentYearsHistogramAggregation(): Aggregation | undefined {
    return this.aggregations?.year_histogram;
  }

  private get histogramTemplate() {
    const { fullYearsHistogramAggregation } = this;
    return html`
      <histogram-date-range
        .minDate=${fullYearsHistogramAggregation?.first_bucket_key}
        .maxDate=${fullYearsHistogramAggregation?.last_bucket_key}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .updateDelay=${100}
        missingDataMessage="..."
        .width=${180}
        .bins=${fullYearsHistogramAggregation?.buckets as number[]}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      ></histogram-date-range>
    `;
  }

  private histogramDateRangeUpdated(
    e: CustomEvent<{
      minDate: string;
      maxDate: string;
    }>
  ) {
    const { minDate, maxDate } = e.detail;
    const event = new CustomEvent('histogramDateRangeUpdated', {
      detail: { minDate, maxDate },
    });
    this.dispatchEvent(event);
  }

  /**
   * Combines the selected facets with the aggregations to create a single list of facets
   */
  private get mergedFacets(): FacetGroup[] {
    const facetGroups: FacetGroup[] = [];

    facetDisplayOrder.forEach(facetKey => {
      const selectedFacetGroup = this.selectedFacetGroups.find(
        group => group.key === facetKey
      );
      const aggregateFacetGroup = this.aggregationFacetGroups.find(
        group => group.key === facetKey
      );

      // if the user selected a facet, but it's not in the aggregation, we add it as-is
      if (selectedFacetGroup && !aggregateFacetGroup) {
        facetGroups.push(selectedFacetGroup);
        return;
      }

      // if we don't have an aggregate facet group, don't add this to the list
      if (!aggregateFacetGroup) return;

      // start with either the selected group if we have one, or the aggregate group
      const facetGroup = selectedFacetGroup ?? aggregateFacetGroup;

      // attach the counts to the selected buckets
      const bucketsWithCount =
        selectedFacetGroup?.buckets.map(bucket => {
          const selectedBucket = aggregateFacetGroup.buckets.find(
            b => b.key === bucket.key
          );
          return selectedBucket
            ? {
                ...bucket,
                count: selectedBucket.count,
              }
            : bucket;
        }) ?? [];

      // append any additional buckets that were not selected
      aggregateFacetGroup.buckets.forEach(bucket => {
        const existingBucket = bucketsWithCount.find(b => b.key === bucket.key);
        if (existingBucket) return;
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
  private get selectedFacetGroups(): FacetGroup[] {
    if (!this.selectedFacets) return [];

    const facetGroups: FacetGroup[] = Object.entries(this.selectedFacets).map(
      ([key, selectedFacets]) => {
        const option = key as FacetOption;
        const title = facetTitles[option];

        const buckets: FacetBucket[] = Object.entries(selectedFacets).map(
          ([value, facetState]) => {
            let displayText = value;
            // for selected languages, we store the language code instead of the
            // display name, so look up the name from the mapping
            if (option === 'language') {
              displayText =
                this.languageCodeHandler?.getLanguageNameFromCodeString(
                  value
                ) ?? value;
            }
            return {
              displayText,
              key: value,
              count: 0,
              state: facetState,
            };
          }
        );

        return {
          title,
          key: option,
          buckets,
        };
      }
    );

    return facetGroups;
  }

  /**
   * Converts the raw `aggregations` to `FacetGroups`, which are easier to use
   */
  private get aggregationFacetGroups(): FacetGroup[] {
    const facetGroups: FacetGroup[] = [];
    Object.entries(this.aggregations ?? []).forEach(([key, buckets]) => {
      // the year_histogram data is in a different format so can't be handled here
      if (key === 'year_histogram') return;
      const option = getFacetOptionFromKey(key);
      const title = facetTitles[option];
      const castedBuckets = buckets.buckets as Bucket[];
      const facetBuckets: FacetBucket[] = castedBuckets.map(bucket => {
        let bucketKey = bucket.key;
        // for languages, we need to search by language code instead of the
        // display name, which is what we get from the search engine result
        if (option === 'language') {
          bucketKey =
            this.languageCodeHandler?.getCodeStringFromLanguageName(
              `${bucket.key}`
            ) ?? bucket.key;
        }
        return {
          displayText: `${bucket.key}`,
          key: `${bucketKey}`,
          count: bucket.doc_count,
          state: 'none',
        };
      });
      const group: FacetGroup = {
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
  private getFacetGroupTemplate(
    facetGroup: FacetGroup
  ): TemplateResult | typeof nothing {
    if (facetGroup.buckets.length === 0) return nothing;
    const { key } = facetGroup;
    const isOpen = this.openFacets[key];
    const collapser = html`
      <span class="collapser ${isOpen ? 'open' : ''}"> ${chevronIcon} </span>
    `;

    return html`
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
          ${this.searchMoreFacetsLink(facetGroup)}
        </div>
      </div>
    `;
  }

  /**
   * Generate the More... link button just below the facets group
   *
   * TODO: want to fire analytics?
   */
  private searchMoreFacetsLink(
    facetGroup: FacetGroup
  ): TemplateResult | typeof nothing {
    // don't render More... link if the number of facets is < this.moreLinkEligibilityCount
    if (Object.keys(facetGroup.buckets).length < this.moreLinkEligibilityCount)
      return nothing;

    return html`<button
      class="more-link"
      @click=${() => {
        this.showMoreFacetsModal(facetGroup);
      }}
    >
      More...
    </button>`;
  }

  async showMoreFacetsModal(facetGroup: FacetGroup): Promise<void> {
    const facetAggrKey = Object.keys(aggregationToFacetOption).find(
      value => aggregationToFacetOption[value] === facetGroup.key
    );

    // TODO - lets move sr-only style into modal-manager component as well
    const headline = html`
      <span
        style="display:block;text-align:left;font-size:1.8rem;padding:0 10px;"
      >
        <span class="sr-only">More facets for:</span>
        ${facetTitles[facetGroup.key]}
        <img
          src="https://archive.org/images/filter-count.png"
          style="height: 1.5rem;vertical-align: baseline;"
          alt=""
        />
      </span>
    `;

    const someContent = html`
      <more-facets-content
        @facetsChanged=${(e: CustomEvent) => {
          const event = new CustomEvent<SelectedFacets>('facetsChanged', {
            detail: e.detail,
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);
        }}
        .facetKey=${facetGroup.key}
        .facetAggregationKey=${facetAggrKey}
        .fullQuery=${this.fullQuery}
        .modalManager=${this.modalManager}
        .searchService=${this.searchService}
        .collectionNameCache=${this.collectionNameCache}
        .languageCodeHandler=${this.languageCodeHandler}
        .selectedFacets=${this.selectedFacets}
      >
      </more-facets-content>
    `;

    const config = new ModalConfig({
      bodyColor: '#fff',
      headerColor: '#194880',
      showHeaderLogo: false,
      closeOnBackdropClick: true, // TODO: want to fire analytics
      title: html`Select filters`,
      headline,
    });
    this.modalManager?.classList.add('more-search-facets');
    this.modalManager?.showModal({
      config,
      customModalContent: someContent,
    });
  }

  /**
   * Generate the list template for each bucket in a facet group
   */
  private getFacetTemplate(facetGroup: FacetGroup): TemplateResult {
    const bucketsNoFavorites = facetGroup.buckets.filter(
      bucket => bucket.key.startsWith('fav-') === false
    );
    const bucketsMaxSix = bucketsNoFavorites.slice(0, 6);

    return html`
      <facets-template
        .facetKey=${facetGroup?.key}
        .facetTitle=${facetGroup?.title}
        .facetBucket=${bucketsMaxSix}
        .facetGroup=${facetGroup}
        .type="page"
        .selectedFacets=${this.selectedFacets}
        @selectedFacetsChanged=${(e: CustomEvent) => {
          const event = new CustomEvent<SelectedFacets>('facetsChanged', {
            detail: e.detail,
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);
        }}
      ></facets-template>
    `;
  }

  static get styles() {
    return css`
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

      more-facets-content {
        
      } 
      .more-link {
        font-size: 1.2rem;
        text-decoration: none;
        padding: 0px 4px;
        background: inherit;
        border: 0;
        color: blue;
        cursor: pointer;
      }
      .sorting-icon {
        cursor: pointer;
      }
    `;
  }
}
