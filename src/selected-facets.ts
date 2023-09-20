import {
  facetTitles,
  type FacetBucket,
  type FacetGroup,
  type FacetOption,
  type FacetValue,
  lendingFacetDisplayNames,
  LendingFacetKey,
} from './models';

/**
 * A record of all the facet buckets for a particular facet type, indexed by their bucket key
 */
export type FacetBucketsRecord = Record<FacetValue, FacetBucket>;

// Implementing this model ensures that every facet type is accounted for
type SelectedFacetsModel = Record<FacetOption, FacetBucketsRecord>;

const VALID_FACET_OPTIONS: Set<FacetOption> = new Set([
  'collection',
  'creator',
  'language',
  'lending',
  'mediatype',
  'subject',
  'year',
]);

/**
 * A class to hold, query, and manipulate state about selected/hidden facets.
 */
export class SelectedFacets implements SelectedFacetsModel {
  readonly collection: FacetBucketsRecord = {};

  readonly creator: FacetBucketsRecord = {};

  readonly language: FacetBucketsRecord = {};

  readonly lending: FacetBucketsRecord = {};

  readonly mediatype: FacetBucketsRecord = {};

  readonly subject: FacetBucketsRecord = {};

  readonly year: FacetBucketsRecord = {};

  constructor(initValues?: Partial<SelectedFacetsModel>) {
    if (initValues) {
      for (const [facetType, buckets] of Object.entries(initValues)) {
        if (VALID_FACET_OPTIONS.has(facetType as FacetOption)) {
          for (const [bucketKey, bucket] of Object.entries(buckets)) {
            this[facetType as FacetOption][bucketKey] = { ...bucket };
          }
        }
      }
    }
  }

  /**
   * Executes the given function on every facet bucket within the current SelectedFacets object.
   * @param fn The function to execute for each facet bucket
   */
  forEach(
    fn: (
      bucket: FacetBucket,
      bucketKey: FacetValue,
      facetType: FacetOption
    ) => unknown
  ): void {
    for (const [facetType, buckets] of Object.entries(
      this as SelectedFacetsModel
    )) {
      for (const [bucketKey, bucket] of Object.entries(buckets)) {
        fn(bucket, bucketKey, facetType as FacetOption);
      }
    }
  }

  /**
   * Executes the given function on every facet type within the current SelectedFacets object.
   * Similar to `SelectedFacets.forEach`, but operating on the full set of buckets for each type
   * (rather than individual buckets).
   * @param fn The function to execute for each facet type
   */
  forEachFacetType(
    fn: (buckets: FacetBucketsRecord, facetType: FacetOption) => unknown
  ): void {
    for (const [facetType, buckets] of Object.entries(
      this as SelectedFacetsModel
    )) {
      fn(buckets, facetType as FacetOption);
    }
  }

  /**
   * Like `Array.some`, returns whether the given predicate function returns true for
   * any of the facet buckets contained in this object.
   * @param predicate Function returning a boolean for each bucket
   * @returns Whether any of the facet buckets satisfy the predicate
   */
  some(
    predicate: (
      bucket: FacetBucket,
      bucketKey: FacetValue,
      facetType: FacetOption
    ) => boolean
  ): boolean {
    for (const [facetType, buckets] of Object.entries(
      this as SelectedFacetsModel
    )) {
      for (const [bucketKey, bucket] of Object.entries(buckets)) {
        if (predicate(bucket, bucketKey, facetType as FacetOption)) return true;
      }
    }

    return false;
  }

  /**
   * Like `Array.every`, returns whether the given predicate function returns true for
   * *all* of the facet buckets contained in this object.
   * @param predicate Function returning a boolean for each bucket
   * @returns Whether all of the facet buckets satisfy the predicate
   */
  every(
    predicate: (
      bucket: FacetBucket,
      bucketKey: FacetValue,
      facetType: FacetOption
    ) => boolean
  ): boolean {
    for (const [facetType, buckets] of Object.entries(
      this as SelectedFacetsModel
    )) {
      for (const [bucketKey, bucket] of Object.entries(buckets)) {
        if (!predicate(bucket, bucketKey, facetType as FacetOption))
          return false;
      }
    }

    return true;
  }

  /**
   * Returns a new SelectedFacets object deeply cloned from this one (same contents).
   */
  clone(): SelectedFacets {
    return new SelectedFacets(this);
  }

  /**
   * Returns a new SelectedFacets object cloned from this one with all of the given `otherFacets`
   * applied overtop. Facets from this object will be overwritten by those in `otherFacets`
   * that have the same facet type and bucket key.
   *
   * @param otherFacets The other SelectedFacets object to merge into this one.
   */
  merge(otherFacets?: SelectedFacets): SelectedFacets {
    const merged = this.clone();
    otherFacets?.forEach((bucket, bucketKey, facetType) => {
      merged[facetType][bucketKey] = { ...bucket };
    });

    return merged;
  }

  /**
   * Returns a new SelectedFacets object with facet buckets normalized, such that any
   * buckets with a state of 'none' are removed entirely.
   */
  normalize(): SelectedFacets {
    const normalized = this.clone();
    normalized.forEach((bucket, bucketKey, facetType) => {
      if (bucket.state === 'none') {
        delete normalized[facetType][bucketKey];
      }
    });

    return normalized;
  }

  /**
   * Converts this SelectedFacets object into an array of equivalent FacetGroups.
   */
  toFacetGroups(): FacetGroup[] {
    const facetGroups: Record<string, FacetGroup> = {};

    this.forEach((bucket, bucketKey, facetType) => {
      const title = facetTitles[facetType];
      let displayText = bucketKey;

      // For lending facets, convert the key to a more readable format
      if (facetType === 'lending') {
        displayText =
          lendingFacetDisplayNames[bucketKey as LendingFacetKey] ?? bucketKey;
      }

      if (!facetGroups[facetType]) {
        facetGroups[facetType] = {
          title,
          key: facetType,
          buckets: [],
        };
      }

      facetGroups[facetType].buckets.push({
        displayText,
        key: bucketKey,
        count: bucket.count,
        state: bucket.state,
      });
    });

    return Object.values(facetGroups);
  }
}
