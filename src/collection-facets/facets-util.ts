import { aggregationToFacetOption, FacetOption } from '../models';

/**
 * Parse the aggregate key title into the human readable title
 *
 * Example: user_aggs__terms__field:mediatypeSorter__size:6 => Media Type
 *
 * @param key
 * @returns
 */
export function getFacetOptionFromKey(key: string): FacetOption {
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
