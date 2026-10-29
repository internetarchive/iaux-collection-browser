function facetRefEquals(ref1, ref2) {
    if (ref1 === undefined)
        return ref2 !== undefined;
    if (ref2 === undefined)
        return ref1 !== undefined;
    return ref1.facetType === ref2.facetType && ref1.bucketKey === ref2.bucketKey;
}
export function smartFacetEquals(sf1, sf2) {
    return (sf1.label === sf2.label &&
        sf1.facets.length === sf2.facets.length &&
        sf1.facets.every((sf, i) => facetRefEquals(sf, sf2.facets[i])));
}
