import type { SmartFacet } from './models';
import { smartFacetEquals } from './smart-facet-equals';

/**
 * Removes any duplicated smart facets from the given array.
 * Smart facets are equal if they have the same `label` and same
 * set of facet refs. Only the first occurrence of a given smart
 * facet is kept.
 * @param facets The array of smart facets to deduplicate
 * @returns A new array containing the deduplicated set of facets
 */
export function dedupe<T extends SmartFacet[] | SmartFacet[][]>(facets: T): T {
  if (!Array.isArray(facets[0])) {
    const facetsUnnested = facets as SmartFacet[];

    let result: SmartFacet[] = [...facetsUnnested];
    for (const curFacet of facetsUnnested) {
      result = result.filter(
        sf => curFacet === sf || !smartFacetEquals(curFacet, sf),
      );
    }

    return result as T;
  }

  const facetsNested = facets as SmartFacet[][];

  const result: SmartFacet[][] = [];
  for (const curFacetArray of facetsNested) {
    const subresult: SmartFacet[] = [];
    for (const curFacet of curFacetArray) {
      const existing = result.find(sfa =>
        sfa.find(sf => smartFacetEquals(curFacet, sf)),
      );
      if (!existing) subresult.push(curFacet);
    }
    if (subresult.length > 0) {
      result.push(subresult);
    }
  }

  return result as T;
}
