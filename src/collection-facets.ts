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
import { repeat } from 'lit/directives/repeat.js';
import {
  Aggregation,
  Bucket,
  SearchServiceInterface,
} from '@internetarchive/search-service';
import '@internetarchive/histogram-date-range';
import '@internetarchive/feature-feedback';
import '@internetarchive/collection-name-cache';
import { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import { ModalConfig } from '@internetarchive/modal-manager';
import { ModalManagerInterface } from '@internetarchive/modal-manager';
import eyeIcon from './assets/img/icons/eye';
import eyeClosedIcon from './assets/img/icons/eye-closed';
import chevronIcon from './assets/img/icons/chevron';
import {
  FacetOption,
  SelectedFacets,
  FacetGroup,
  FacetBucket,
  defaultSelectedFacets,
} from './models';
import { LanguageCodeHandlerInterface } from './language-code-handler/language-code-handler';
import './collection-facets/more-facets-content';

const facetDisplayOrder: FacetOption[] = [
  'mediatype',
  'year',
  'subject',
  'collection',
  'creator',
  'language',
];

const aggregationToFacetOption: Record<string, FacetOption> = {
  subjectSorter: 'subject',
  mediatypeSorter: 'mediatype',
  languageSorter: 'language',
  creatorSorter: 'creator',
  collection: 'collection',
  year: 'year',
};

const facetTitles: Record<FacetOption, string> = {
  subject: 'Subject',
  mediatype: 'Media Type',
  language: 'Language',
  creator: 'Creator',
  collection: 'Collection',
  year: 'Year',
};

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
      const option = this.getFacetOptionFromKey(key);
      const title = facetTitles[option];
      const castedBuckets = buckets.buckets as Bucket[];
      const facetBuckets: FacetBucket[] = castedBuckets.map(bucket => {
        let bucketKey = bucket.key;
        // for languages, we need to search by language code instead of the
        // display name, which is what we get from the search engine result
        if (option === 'language') {
          // const languageCodeKey = languageToCodeMap[bucket.key];
          bucketKey =
            this.languageCodeHandler?.getCodeStringFromLanguageName(
              `${bucket.key}`
            ) ?? bucket.key;
          // bucketKey = languageCodeKey ?? bucket.key;
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
   */
  private searchMoreFacetsLink(
    facetGroup: FacetGroup
  ): TemplateResult | typeof nothing {
    // don't render More... link if you facets is < 5
    if (Object.keys(facetGroup.buckets).length < 5) return nothing;

    return html`<button
      class="more-link"
      @click=${() => {
        this.showMoreFacets(facetGroup);
      }}
    >
      More...
    </button>`;
  }

  async showMoreFacets(facetGroup: FacetGroup) {
    const facetAggrKey = Object.keys(aggregationToFacetOption).find(
      value => aggregationToFacetOption[value] === facetGroup.key
    );

    const headline = html`
      <span
        style="display:block;text-align:left;font-size:1.8rem;padding:0 1rem;"
      >
        ${facetTitles[facetGroup.key]}
        <img
          src="https://archive.org/images/filter-count.png"
          style="height: 1.5rem;vertical-align: baseline;"
          alt=""
        />
      </span>
    `;

    const message = html`
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
      message,
    });
    this.modalManager?.classList.add('more-search-facets');
    this.modalManager?.showModal({ config });
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
      <ul class="facet-list">
        ${repeat(
          bucketsMaxSix,
          bucket => `${facetGroup.key}:${bucket.key}`,
          bucket => {
            const showOnlyCheckboxId = `${facetGroup.key}:${bucket.key}-show-only`;
            const negativeCheckboxId = `${facetGroup.key}:${bucket.key}-negative`;

            // for collections, we need to asynchronously load the collection name
            // so we use the `async-collection-name` widget and for the rest, we have
            // a static value to use
            const bucketTextDisplay =
              facetGroup.key !== 'collection'
                ? html`${bucket.displayText ?? bucket.key}`
                : html`
                    <async-collection-name
                      .collectionNameCache=${this.collectionNameCache}
                      .identifier=${bucket.key}
                      placeholder="-"
                    ></async-collection-name>
                  `;

            const facetHidden = bucket.state === 'hidden';
            const facetSelected = bucket.state === 'selected';

            const titleText = `${facetGroup.key}: ${
              bucket.displayText ?? bucket.key
            }`;
            const onlyShowText = facetSelected
              ? `Show all ${facetGroup.key}s`
              : `Only show ${titleText}`;
            const hideText = `Hide ${titleText}`;
            const unhideText = `Unhide ${titleText}`;
            const showHideText = facetHidden ? unhideText : hideText;

            return html`
              <li>
                <div class="facet-row">
                  <div class="facet-checkbox">
                    <input
                      type="checkbox"
                      .name=${facetGroup.key}
                      .value=${bucket.key}
                      @click=${(e: Event) => {
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
                      @click=${(e: Event) => {
                        this.facetClicked(e, bucket, true);
                      }}
                      .checked=${facetHidden}
                      class="hide-facet-checkbox"
                    />
                    <label
                      for=${negativeCheckboxId}
                      class="hide-facet-icon${facetHidden ? ' active' : ''}"
                      title=${showHideText}
                    >
                      <span class="eye">${eyeIcon}</span>
                      <span class="eye-closed">${eyeClosedIcon}</span>
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
          }
        )}
      </ul>
    `;
  }

  private facetClicked(e: Event, bucket: FacetBucket, negative: boolean) {
    const target = e.target as HTMLInputElement;
    const { checked, name, value } = target;
    if (checked) {
      this.facetChecked(name as FacetOption, value, negative);
    } else {
      this.facetUnchecked(name as FacetOption, value);
    }
  }

  private facetChecked(key: FacetOption, value: string, negative: boolean) {
    const { selectedFacets } = this;
    let newFacets: SelectedFacets;
    if (selectedFacets) {
      newFacets = {
        ...selectedFacets,
      };
    } else {
      newFacets = defaultSelectedFacets;
    }
    newFacets[key][value] = negative ? 'hidden' : 'selected';
    this.selectedFacets = newFacets;
  }

  private facetUnchecked(key: FacetOption, value: string) {
    const { selectedFacets } = this;
    let newFacets: SelectedFacets;
    if (selectedFacets) {
      newFacets = {
        ...selectedFacets,
      };
    } else {
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
  private getFacetOptionFromKey(key: string): FacetOption {
    const parts = key.split('__');
    const fieldNamePart = parts[2];
    const fieldName = fieldNamePart.split(':')[1];
    const facetMatch = Object.entries(aggregationToFacetOption).find(([key2]) =>
      fieldName.includes(key2)
    );
    const option = facetMatch?.[1];
    if (!option) throw new Error(`Could not find facet option for key: ${key}`);
    return option;
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
        opacity: 0.3;
      }
      .hide-facet-icon:hover,
      .active {
        opacity: 1;
      }
      .hide-facet-icon:hover .eye,
      .hide-facet-icon .eye-closed {
        display: none;
      }
      .hide-facet-icon:hover .eye-closed,
      .hide-facet-icon.active .eye-closed {
        display: inline;
      }
      .hide-facet-icon.active .eye {
        display: none;
      }

      .more-link {
        font-size: 1.2rem;
        text-decoration: none;
        padding: 0px 4px;
        background: white;
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
