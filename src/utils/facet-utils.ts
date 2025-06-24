import { AggregationSortType } from '@internetarchive/search-service';
import {
  FacetOption,
  getDefaultSelectedFacets,
  type FacetBucket,
  type SelectedFacets,
} from '../models';

// This file contains several helper functions designed to make working immutably
// with SelectedFacet objects and FacetGroups cleaner & easier.

/**
 * Calls the given function for each FacetBucket specified in the given SelectedFacets
 * object. The function is always called with the facet type, bucket key, bucket object,
 * and the given SelectedFacets object.
 *
 * @param selectedFacets The SelectedFacets object whose buckets should be iterated over
 * @param fn The function to apply to each facet bucket.
 *
 * @example
 * forEachFacetBucket(
 *   myFacets,
 *   (facetType, bucketKey, bucket) => {
 *     if (facetType === 'collection' && bucket.state === 'hidden') {
 *       console.log(`Excluding any results in the ${bucketKey} collection`);
 *     }
 *   }
 * );
 */
export function forEachFacetBucket(
  selectedFacets: SelectedFacets | undefined,
  fn: (
    facetType: FacetOption,
    bucketKey: string,
    bucket: FacetBucket,
    selectedFacets: SelectedFacets,
  ) => unknown,
): void {
  if (!selectedFacets) return;
  for (const [facetType, facetBuckets] of Object.entries(selectedFacets)) {
    for (const [bucketKey, bucket] of Object.entries(facetBuckets)) {
      fn(facetType as FacetOption, bucketKey, bucket, selectedFacets);
    }
  }
}

/**
 * Returns a new SelectedFacets object having only the specified bucket changed to
 * reflect its new provided value. The bucket key is determined from the provided
 * `bucket` itself.
 * @param selectedFacets The SelectedFacets object to produce an updated clone of
 * @param facetType The type of facet to be modified (e.g., 'mediatype', 'subject', ...)
 * @param bucket The new bucket that should be present on the result
 * @param omitNoneState If set to true, the returned object will omit the given
 * bucket entirely if it is updated to state `'none'`. Default is false, which leaves
 * the `'none'` state in place.
 */
export function updateSelectedFacetBucket(
  selectedFacets: SelectedFacets | undefined,
  facetType: FacetOption,
  bucket: FacetBucket,
  omitNoneState = false,
): SelectedFacets {
  const defaultedSelectedFacets = selectedFacets ?? getDefaultSelectedFacets();
  const newFacets: SelectedFacets = {
    ...defaultedSelectedFacets,
    [facetType]: {
      ...defaultedSelectedFacets[facetType],
      [bucket.key]: bucket,
    },
  };

  if (omitNoneState && bucket.state === 'none') {
    delete newFacets[facetType]?.[bucket.key];
  }

  return newFacets;
}

/**
 * Creates a clone of the given SelectedFacets object.
 *
 * Note that the underlying FacetBucket objects are not deep-cloned -- they will
 * be references to the same objects as in the input. However, the objects
 * containing the FacetBuckets for each FacetOption are created anew.
 *
 * If the provided argument is undefined, returns an empty SelectedFacets object.
 *
 * @param selectedFacets The SelectedFacets object to be cloned
 */
export function cloneSelectedFacets(
  selectedFacets: SelectedFacets | undefined,
): SelectedFacets {
  const cloneResult = getDefaultSelectedFacets();
  forEachFacetBucket(selectedFacets, (facetType, bucketKey, bucket) => {
    if (!cloneResult[facetType]) cloneResult[facetType] = {};
    cloneResult[facetType][bucketKey] = bucket;
  });
  return cloneResult;
}

/**
 * Creates a new SelectedFacets object representing a merge of the `source` facets object
 * into the `destination` facets object. Any facets existing in `source` take precedence
 * over those in `destination` in the event of conflicts.
 *
 * The resulting SelectedFacets object is normalized to omit any facet buckets whose
 * state is `'none'` in the merged result. Consequently, any facets buckets with state
 * `'none'` in `source` will always be absent from the end result. Likewise, any facet
 * buckets with state `'none'` in `destination` will be absent _unless_ they are also
 * present in `source` with a state of `'selected'` or `'hidden'` (in which case `source`
 * takes precedence as usual).
 *
 * @param source The source of the new facets to merge in. Any facet buckets existing in
 * this `source` object will take precedence over those in `destination` having the same
 * key, if they exist in both. Any facet buckets that are _not_ present in `source` will
 * remain unmodified from their state in `destination`, if they are present there at all.
 * @param destination The destination onto which facets should be merged. Note that this
 * object is _not_ re-used for the return value, but it is conceptually the "existing base"
 * onto which the source facets are merged.
 */
export function mergeSelectedFacets(
  destination: SelectedFacets | undefined,
  source: SelectedFacets | undefined,
): SelectedFacets {
  const mergeResult = cloneSelectedFacets(destination);
  forEachFacetBucket(source, (facetType, bucketKey, bucket) => {
    if (!mergeResult[facetType]) mergeResult[facetType] = {};
    mergeResult[facetType][bucketKey] = bucket;
  });

  // Normalize any 'none' states on the result (from either source or destination)
  forEachFacetBucket(mergeResult, (facetType, bucketKey, bucket) => {
    if (bucket.state === 'none') {
      delete mergeResult[facetType]?.[bucketKey];
    }
  });

  return mergeResult;
}

/**
 * Defines the order of states in which to display SelectedFacets buckets
 */
const BUCKET_STATE_ORDER = ['selected', 'hidden', 'none'];

/**
 * Sorts the provided FacetBuckets so that:
 * - Any selected items come first
 * - Any hidden items come after all the selected items
 * - Any unselected / unhidden items come last
 *
 * Within each of the above groups, the buckets will be sorted according to
 * the provided sort type, or by their bucket count by default.
 *
 * The sort is performed in-place using `Array.sort`, so the return value is
 * a reference to the same array that was passed in, only sorted.
 *
 * @param buckets The array of facet buckets to sort
 * @param sort (Optional) How buckets within each state group should be sorted.
 * Defaults to `AggregationSortType.COUNT` (i.e., descending by bucket count).
 */
export function sortBucketsBySelectionState(
  buckets: FacetBucket[],
  sort = AggregationSortType.COUNT,
) {
  return buckets.sort((a, b) => {
    const aStateIndex = BUCKET_STATE_ORDER.indexOf(a.state);
    const bStateIndex = BUCKET_STATE_ORDER.indexOf(b.state);
    const stateDiff = aStateIndex - bStateIndex; // Sort bucket states primarily in the order defined by BUCKET_STATE_ORDER

    let secondaryDiff;
    if (sort === AggregationSortType.ALPHABETICAL) {
      secondaryDiff = a.key.localeCompare(b.key); // Ascending alphabetically by bucket key
    } else if (sort === AggregationSortType.NUMERIC) {
      secondaryDiff = Number(b.key) - Number(a.key); // Descending numerically by bucket key
    } else {
      secondaryDiff = b.count - a.count; // Descending by bucket count
    }

    return stateDiff || secondaryDiff; // Primary sort on state, secondary sort on the given sort type (defaulting to descending count)
  });
}
