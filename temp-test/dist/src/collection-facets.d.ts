import { LitElement, PropertyValues, TemplateResult } from 'lit';
import { Aggregation } from '@internetarchive/search-service';
import '@internetarchive/histogram-date-range';
import '@internetarchive/feature-feedback';
import '@internetarchive/collection-name-cache';
import { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import { FacetOption, SelectedFacets } from './models';
import { LanguageCodeHandlerInterface } from './language-code-handler/language-code-handler';
export declare class CollectionFacets extends LitElement {
    aggregations?: Record<string, Aggregation>;
    fullYearsHistogramAggregation?: Aggregation;
    minSelectedDate?: string;
    maxSelectedDate?: string;
    facetsLoading: boolean;
    fullYearAggregationLoading: boolean;
    selectedFacets?: SelectedFacets;
    collapsableFacets: boolean;
    showHistogramDatePicker: boolean;
    languageCodeHandler?: LanguageCodeHandlerInterface;
    collectionNameCache?: CollectionNameCacheInterface;
    openFacets: Record<FacetOption, boolean>;
    render(): TemplateResult<1>;
    updated(changed: PropertyValues): void;
    private dispatchFacetsChangedEvent;
    private get currentYearsHistogramAggregation();
    private get histogramTemplate();
    private histogramDateRangeUpdated;
    /**
     * Combines the selected facets with the aggregations to create a single list of facets
     */
    private get mergedFacets();
    /**
     * Converts the selected facets to a `FacetGroup` array,
     * which is easier to work with
     */
    private get selectedFacetGroups();
    /**
     * Converts the raw `aggregations` to `FacetGroups`, which are easier to use
     */
    private get aggregationFacetGroups();
    /**
     * Generate the template for a facet group with a header and the collapsible
     * chevron for the mobile view
     */
    private getFacetGroupTemplate;
    /**
     * Generate the list template for each bucket in a facet group
     */
    private getFacetTemplate;
    private facetClicked;
    private facetChecked;
    private facetUnchecked;
    /**
     * Parse the aggregate key title into the human readable title
     *
     * Example: user_aggs__terms__field:mediatypeSorter__size:6 => Media Type
     *
     * @param key
     * @returns
     */
    private getFacetOptionFromKey;
    static get styles(): import("lit").CSSResult;
}
