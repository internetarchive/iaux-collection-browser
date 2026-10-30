import { AggregationSortType } from '@internetarchive/search-service';
import { RESERVED_FACET_GROUP_KEYS, defaultFacetSort, facetPluralTitles, facetTitles, valueFacetSort, } from '../models';
import { log } from './log';
function isBuiltIn(key) {
    return Object.prototype.hasOwnProperty.call(facetTitles, key);
}
/**
 * The extra facet groups that are safe to use: not reserved, not one of
 * collection-browser's own groups, not empty, and each key only once.
 * Rejected groups are logged and left out.
 */
export function validExtraFacetGroups(groups) {
    const seen = new Set();
    return (groups ?? []).filter(group => {
        const key = group?.key;
        const reason = !key
            ? 'an empty key'
            : RESERVED_FACET_GROUP_KEYS.has(key)
                ? 'a reserved key'
                : isBuiltIn(key)
                    ? "a built-in group's key"
                    : seen.has(key)
                        ? 'a key already used'
                        : undefined;
        if (reason) {
            log(`extraFacetGroups: ignoring "${key}", ${reason}`);
            return false;
        }
        seen.add(key);
        return true;
    });
}
/**
 * Title and sorts for a facet group: collection-browser's own tables for its
 * groups, else the matching extra group. Undefined for a key neither knows.
 */
export function facetGroupInfo(key, extraGroups = []) {
    if (isBuiltIn(key)) {
        return {
            title: facetTitles[key],
            pluralTitle: facetPluralTitles[key],
            sort: defaultFacetSort[key],
            valueSort: valueFacetSort[key],
        };
    }
    const extra = extraGroups.find(group => group.key === key);
    if (!extra)
        return undefined;
    const sort = extra.sort ?? AggregationSortType.COUNT;
    return {
        title: extra.title,
        pluralTitle: extra.pluralTitle,
        sort,
        valueSort: sort === AggregationSortType.NUMERIC
            ? AggregationSortType.NUMERIC
            : AggregationSortType.ALPHABETICAL,
    };
}
/**
 * A sidebar order with the extra groups placed in it: each after the group
 * its `after` names, else at the end, in the order given. With no extra
 * groups, `order` itself, so a render that passes it on changes nothing.
 */
export function withExtraFacetOrder(order, extraGroups = []) {
    if (!extraGroups.length)
        return order;
    const result = [...order];
    for (const group of extraGroups) {
        if (result.includes(group.key))
            continue;
        const at = group.after === undefined ? -1 : result.indexOf(group.after);
        if (at < 0)
            result.push(group.key);
        else
            result.splice(at + 1, 0, group.key);
    }
    return result;
}
