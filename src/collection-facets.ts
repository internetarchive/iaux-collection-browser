import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { Aggregation, Bucket } from '@internetarchive/search-service';
import '@internetarchive/histogram-date-range';
import '@internetarchive/feature-feedback';
import eyeIcon from './assets/img/icons/eye';
import eyeClosedIcon from './assets/img/icons/eye-closed';
import type {
  FacetOption,
  SelectedFacets,
  FacetGroup,
  FacetBucket,
} from './models';

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
  @property({ type: Object }) aggregations?: Record<string, Aggregation>;

  @property({ type: Object }) fullYearsHistogramAggregation?: Aggregation;

  @property({ type: Boolean }) facetsLoading = false;

  @property({ type: Boolean }) fullYearAggregationLoading = false;

  // @property({ type: Object }) selectedFacets: Record<string, string[]> = {};

  // @property({ type: Object }) negativeFacets: Record<string, string[]> = {};

  // @property({})

  @state() private selectedFacets: SelectedFacets = {
    subject: {},
    mediatype: {},
    language: {},
    creator: {},
    collection: {},
    year: {},
  };

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
    const { currentYearsHistogramAggregation, fullYearsHistogramAggregation } =
      this;
    return html`
      <histogram-date-range
        .minDate=${fullYearsHistogramAggregation?.first_bucket_key}
        .maxDate=${fullYearsHistogramAggregation?.last_bucket_key}
        .minSelectedDate=${currentYearsHistogramAggregation?.first_bucket_key}
        .maxSelectedDate=${currentYearsHistogramAggregation?.last_bucket_key}
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
   * Combines the selected and hidden facets with the aggregations to create a single list of facets
   */
  private get mergedFacets(): FacetGroup[] {
    const facetGroups: FacetGroup[] = [];

    facetDisplayOrder.forEach(facetKey => {
      const selectedFacetGroup = this.selectedFacetGroups.find(
        group => group.key === facetKey
      );
      // const negativeFacetGroup = this.negativeFacetGroups.find(
      //   group => group.key === facetKey
      // );
      const aggregateFacetGroup = this.aggregationFacetGroups.find(
        group => group.key === facetKey
      );

      // if the user selected a facet, but it's not in the aggregation, we add it as-is
      if (selectedFacetGroup && !aggregateFacetGroup) {
        facetGroups.push(selectedFacetGroup);
        return;
      }

      // if the user hid a facet, but it's not in the aggregation, we add it as-is
      // if (negativeFacetGroup && !aggregateFacetGroup) {
      //   facetGroups.push(negativeFacetGroup);
      //   return;
      // }

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
      // negativeFacetGroup?.buckets.map(bucket => {
      //   const selectedBucket = aggregateFacetGroup.buckets.find(
      //     b => b.key === bucket.key
      //   );
      //   if (selectedBucket) {
      //     return {
      //       ...bucket,
      //       count: selectedBucket.count,
      //     };
      //   }
      //   return bucket;
      // }) ??
      // [];

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

  // private get selectedFacetGroups(): FacetGroup[] {
  //   return this.getFacetGroups(this.selectedFacets, false);
  // }

  // private get negativeFacetGroups(): FacetGroup[] {
  //   return this.getFacetGroups(this.negativeFacets, true);
  // }

  // /**
  //  * Converts the raw selected or negative facets to a `FacetGroup` array,
  //  * which is easier to work with
  //  */
  // private getFacetGroups(
  //   facets: Record<string, string[]>,
  //   negative: boolean
  // ): FacetGroup[] {
  //   const facetGroups: FacetGroup[] = [];
  //   Object.entries(facets).forEach(([key, buckets]) => {
  //     const title = facetTitles[key as FacetOption];
  //     const facetBuckets: FacetBucket[] = buckets.map(bucket => ({
  //       key: bucket,
  //       count: 0,
  //       state: negative ? 'hidden' : 'selected',
  //     }));
  //     const group = {
  //       title,
  //       key,
  //       buckets: facetBuckets,
  //     };
  //     facetGroups.push(group);
  //   });
  //   return facetGroups;
  // }

  // key: string;
  // value: string;
  // state: SelectedFacetState;

  /**
   * Converts the selected facets to a `FacetGroup` array,
   * which is easier to work with
   */
  private get selectedFacetGroups(): FacetGroup[] {
    const facetGroups: FacetGroup[] = Object.entries(this.selectedFacets).map(
      ([key, selectedFacets]) => {
        const option = key as FacetOption;
        const title = facetTitles[option];

        const buckets: FacetBucket[] = Object.entries(selectedFacets).map(
          ([value, facetState]) => ({
            key: value,
            count: 0,
            state: facetState,
          })
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
      if (key === 'year_histogram') return;
      const option = this.getFacetOptionFromKey(key);
      const title = facetTitles[option];
      const castedBuckets = buckets.buckets as Bucket[];
      const facetBuckets: FacetBucket[] = castedBuckets.map(bucket => ({
        key: `${bucket.key}`,
        count: bucket.doc_count,
        state: 'none',
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
          bucket => {
            const negativeCheckboxId = `${facetGroup.key}:${bucket.key}-negative`;
            if (bucket.key === 'etree') {
              console.debug('bucket', bucket, bucket.state);
            }
            return html`
              <li>
                <label class="facet-row">
                  <div class="facet-checkbox">
                    <input
                      type="checkbox"
                      .name=${facetGroup.key}
                      .value=${bucket.key}
                      @click=${(e: Event) => {
                        this.facetClicked(e, bucket, false);
                      }}
                      .checked=${bucket.state === 'selected'}
                      class="select-facet-checkbox"
                    />
                    <input
                      type="checkbox"
                      id=${negativeCheckboxId}
                      .name=${facetGroup.key}
                      .value=${bucket.key}
                      @click=${(e: Event) => {
                        this.facetClicked(e, bucket, true);
                      }}
                      .checked=${bucket.state === 'hidden'}
                      class="hide-facet-checkbox"
                    />
                    <label for=${negativeCheckboxId} class="hide-facet-icon">
                      ${bucket.state === 'hidden' ? eyeClosedIcon : eyeIcon}
                    </label>
                  </div>
                  <div class="facet-title">${bucket.key}</div>
                  <div class="facet-count">${bucket.count}</div>
                </label>
              </li>
            `;
          }
        )}
      </ul>
    `;
  }

  // private facetChecked(name: string, value: string) {
  //   const { selectedFacets } = this;
  //   const facetClone = { ...selectedFacets };
  //   const currentFacetValues = facetClone[name];
  //   if (currentFacetValues) {
  //     currentFacetValues.push(value);
  //     facetClone[name] = currentFacetValues;
  //   } else {
  //     facetClone[name] = [value];
  //   }
  //   this.selectedFacets = facetClone;
  // }

  // private facetUnchecked(name: string, value: string) {
  //   const { selectedFacets } = this;
  //   const facetClone = { ...selectedFacets };
  //   let currentFacetValues = selectedFacets[name];
  //   if (currentFacetValues) {
  //     currentFacetValues = currentFacetValues.filter(el => el !== value);
  //     facetClone[name] = currentFacetValues;
  //     if (currentFacetValues.length === 0) {
  //       delete facetClone[name];
  //     }
  //   }
  //   this.selectedFacets = facetClone;
  // }

  private facetClicked(e: Event, bucket: FacetBucket, negative: boolean) {
    const target = e.target as HTMLInputElement;
    const { checked, name, value } = target;
    console.debug('facet clicked', checked, name, value, negative);
    if (checked) {
      this.facetChecked(name as FacetOption, value, negative);
    } else {
      this.facetUnchecked(name as FacetOption, value);
    }
  }

  private negativeFacetToggled(e: Event) {
    const target = e.target as HTMLInputElement;
    const { checked, name, value } = target;
    if (checked) {
      this.facetChecked(name as FacetOption, value, true);
    } else {
      this.facetUnchecked(name as FacetOption, value);
    }

    // const event = new CustomEvent<Record<string, string[]>>(
    //   'negativeFacetsChanged',
    //   {
    //     detail: this.negativeFacets,
    //   }
    // );
    // this.dispatchEvent(event);
  }

  private facetChecked(key: FacetOption, value: string, negative: boolean) {
    const { selectedFacets } = this;
    const facetClone = { ...selectedFacets };
    facetClone[key][value] = negative ? 'hidden' : 'selected';
    this.selectedFacets = facetClone;
  }

  private facetUnchecked(key: FacetOption, value: string) {
    const { selectedFacets } = this;
    const facetClone = { ...selectedFacets };
    delete facetClone[key][value];
    this.selectedFacets = facetClone;
  }

  // private facetHidden(name: string, value: string) {
  //   const { negativeFacets } = this;
  //   const facetClone = { ...negativeFacets };
  //   const currentFacetValues = facetClone[name];
  //   if (currentFacetValues) {
  //     currentFacetValues.push(value);
  //     facetClone[name] = currentFacetValues;
  //   } else {
  //     facetClone[name] = [value];
  //   }
  //   this.negativeFacets = facetClone;
  // }

  // private facetUnhidden(name: string, value: string) {
  //   const { negativeFacets } = this;
  //   const facetClone = { ...negativeFacets };
  //   let currentFacetValues = negativeFacets[name];
  //   if (currentFacetValues) {
  //     currentFacetValues = currentFacetValues.filter(el => el !== value);
  //     facetClone[name] = currentFacetValues;
  //     if (currentFacetValues.length === 0) {
  //       delete facetClone[name];
  //     }
  //   }
  //   this.negativeFacets = facetClone;
  // }

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
        display: flex;
        align-items: center;
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

      .select-facet-checkbox {
        margin-right: 5px;
      }

      .hide-facet-checkbox {
        /* display: none; */
      }

      .hide-facet-icon {
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    `;
  }
}
