import { smartFacetEquals } from './smart-facet-equals';
/**
 * Removes any duplicated smart facets from the given array.
 * Smart facets are equal if they have the same `label` and same
 * set of facet refs. Only the first occurrence of a given smart
 * facet is kept.
 * @param facets The array of smart facets to deduplicate
 * @returns A new array containing the deduplicated set of facets
 */
export function dedupe(facets) {
    if (!Array.isArray(facets[0])) {
        const facetsUnnested = facets;
        let result = [...facetsUnnested];
        for (let i = 0; i < result.length; i++) {
            const curFacet = result[i];
            result = result.filter(sf => curFacet === sf || !smartFacetEquals(curFacet, sf));
        }
        return result;
    }
    const facetsNested = facets;
    const result = [];
    for (const curFacetArray of facetsNested) {
        const subresult = [];
        for (const curFacet of curFacetArray) {
            const existing = result.find(sfa => sfa.find(sf => smartFacetEquals(curFacet, sf)));
            if (!existing)
                subresult.push(curFacet);
        }
        if (subresult.length > 0) {
            result.push(subresult);
        }
    }
    return result;
}
