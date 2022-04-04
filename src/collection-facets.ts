import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { Aggregation, Bucket } from '@internetarchive/search-service';
import '@internetarchive/histogram-date-range';
import '@internetarchive/feature-feedback';

type FacetOption =
  | 'subject'
  | 'mediatype'
  | 'language'
  | 'creator'
  | 'collection'
  | 'year';

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

interface FacetBucket {
  // for some facets, we augment the key with a display value
  displayText?: string;
  key: string;
  count: number;
  selected: boolean;
}

interface FacetGroup {
  title: string;
  key: string;
  buckets: FacetBucket[];
}

@customElement('collection-facets')
export class CollectionFacets extends LitElement {
  @property({ type: Object }) aggregations?: Record<string, Aggregation>;

  @property({ type: Object }) fullYearsHistogramAggregation?: Aggregation;

  @property({ type: Object }) selectedFacets: Record<string, string[]> = {};

  @property({ type: Boolean }) facetsLoading = false;

  @property({ type: Boolean }) fullYearAggregationLoading = false;

  private get hydratedSelectedFacets(): Record<string, string[]> {
    const { selectedFacets } = this;
    const hydratedSelectedFacets: Record<string, string[]> = {};
    Object.entries(selectedFacets).forEach(([key]) => {
      const values = hydratedSelectedFacets[key];
      const title = facetTitles[key as FacetOption];
      hydratedSelectedFacets[title] = values || [];
      delete hydratedSelectedFacets[key];
    });
    return hydratedSelectedFacets;
  }

  render() {
    return html`
      <div id="container" class="${this.facetsLoading ? 'loading' : ''}">
        <div class="facet-group">
          <h1>Year Published <feature-feedback></feature-feedback></h1>
          ${this.histogramTemplate}
        </div>

        ${this.mergedFacets.map(
          facetGroup =>
            html`
              <div class="facet-group">
                <h1>${facetGroup.title}</h1>
                ${this.getFacetTemplate(facetGroup)}
              </div>
            `
        )}
      </div>
    `;
  }

  private get currentYearsHistogramAggregation(): Aggregation | undefined {
    return this.aggregations?.year_histogram;
  }

  private get histogramTemplate() {
    const { currentYearsHistogramAggregation, fullYearsHistogramAggregation } =
      this;
    return html`
      <histogram-date-range
        .minDate=${`${fullYearsHistogramAggregation?.first_bucket_key}`}
        .maxDate=${`${fullYearsHistogramAggregation?.last_bucket_key}`}
        .minSelectedDate=${`${currentYearsHistogramAggregation?.first_bucket_key}`}
        .maxSelectedDate=${`${currentYearsHistogramAggregation?.last_bucket_key}`}
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
          if (selectedBucket) {
            return {
              ...bucket,
              count: selectedBucket.count,
            };
          }
          return bucket;
        }) ?? [];

      // append any additional buckets that were not selected
      aggregateFacetGroup.buckets.forEach(bucket => {
        const existingBucket = bucketsWithCount.find(b => b.key === bucket.key);
        if (existingBucket) return;
        bucketsWithCount.push(bucket);
      });
      facetGroup.buckets = bucketsWithCount.splice(0, 5);

      if (facetGroup.buckets.length === 0) return;

      facetGroups.push(facetGroup);
    });

    return facetGroups;
  }

  /**
   * Converts the raw `selectedFacets` to `FacetGroups`, which are easier to use
   */
  private get selectedFacetGroups(): FacetGroup[] {
    const selectedFacetGroups: FacetGroup[] = [];
    Object.entries(this.selectedFacets).forEach(([key, buckets]) => {
      const title = facetTitles[key as FacetOption];
      const group = {
        title,
        key,
        buckets: buckets.map(bucket => ({
          key: bucket,
          count: 0,
          selected: true,
        })),
      };
      selectedFacetGroups.push(group);
    });
    return selectedFacetGroups;
  }

  /**
   * Converts the raw `aggregations` to `FacetGroups`, which are easier to use
   */
  private get aggregationFacetGroups(): FacetGroup[] {
    const facetGroups: FacetGroup[] = [];
    Object.entries(this.aggregations ?? []).forEach(([key, buckets]) => {
      if (key === 'year_histogram') return;
      const option = this.getFacetOptionFromKey(key);
      const title = facetTitles[option];
      const castedBuckets = buckets.buckets as Bucket[];
      const facetBuckets: FacetBucket[] = castedBuckets.map(bucket => ({
        key: `${bucket.key}`,
        count: bucket.doc_count,
        selected: false,
      }));
      const group: FacetGroup = {
        title,
        key: option,
        buckets: facetBuckets,
      };
      facetGroups.push(group);
    });
    return facetGroups;
  }

  private getFacetTemplate(facetGroup: FacetGroup) {
    return html`
      <ul class="facet-list">
        ${repeat(
          facetGroup.buckets,
          bucket => `${facetGroup.key}:${bucket.key}`,
          bucket => html`
            <li>
              <label class="facet-row">
                <div class="facet-checkbox">
                  <input
                    type="checkbox"
                    .name=${facetGroup.key}
                    .value=${bucket.key}
                    @click=${this.facetToggled}
                    ?checked=${bucket.selected}
                  />
                </div>
                <div class="facet-title">${bucket.key}</div>
                <div class="facet-count">${bucket.count}</div>
              </label>
            </li>
          `
        )}
      </ul>
    `;
  }

  private facetChecked(name: string, value: string) {
    const { selectedFacets } = this;
    const facetClone = { ...selectedFacets };
    const currentFacetValues = facetClone[name];
    if (currentFacetValues) {
      currentFacetValues.push(value);
      facetClone[name] = currentFacetValues;
    } else {
      facetClone[name] = [value];
    }
    this.selectedFacets = facetClone;
  }

  private facetUnchecked(name: string, value: string) {
    const { selectedFacets } = this;
    const facetClone = { ...selectedFacets };
    let currentFacetValues = selectedFacets[name];
    if (currentFacetValues) {
      currentFacetValues = currentFacetValues.filter(el => el !== value);
      facetClone[name] = currentFacetValues;
      if (currentFacetValues.length === 0) {
        delete facetClone[name];
      }
    }
    this.selectedFacets = facetClone;
  }

  private facetToggled(e: Event) {
    const target = e.target as HTMLInputElement;
    const { checked, name, value } = target;
    if (checked) {
      this.facetChecked(name, value);
    } else {
      this.facetUnchecked(name, value);
    }

    const event = new CustomEvent<Record<string, string[]>>('facetsChanged', {
      detail: this.selectedFacets,
    });
    this.dispatchEvent(event);
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

      h1 {
        font-size: 1.4rem;
        font-weight: 200;
        border-bottom: 1px solid rgb(232, 232, 232);
        padding-bottom: 3px;
        margin: 24px 0 14px 0;
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
      }

      .facet-row {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 1.2rem;
      }

      .facet-title {
        flex: 1;
      }

      .facet-count {
        margin-left: 0.5rem;
      }
    `;
  }
}
