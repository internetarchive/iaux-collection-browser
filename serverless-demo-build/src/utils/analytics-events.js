/**
 * Analytics categories and events. Used when building actions in
 */
export var analyticsCategories;
(function (analyticsCategories) {
    analyticsCategories["default"] = "collection-browser";
})(analyticsCategories || (analyticsCategories = {}));
export var analyticsActions;
(function (analyticsActions) {
    analyticsActions["sortBy"] = "sortBy";
    analyticsActions["filterByCreator"] = "filterByCreator";
    analyticsActions["filterByTitle"] = "filterByTitle";
    analyticsActions["displayMode"] = "displayMode";
    analyticsActions["loadDesktopView"] = "loadDesktopView";
    analyticsActions["loadMobileView"] = "loadMobileView";
    analyticsActions["facetSelected"] = "facetSelected";
    analyticsActions["facetDeselected"] = "facetDeselected";
    analyticsActions["facetNegativeSelected"] = "facetNegativeSelected";
    analyticsActions["facetNegativeDeselected"] = "facetNegativeDeselected";
    analyticsActions["mobileFacetsToggled"] = "mobileFacetsToggled";
    analyticsActions["partOfCollectionClicked"] = "partOfCollectionClicked";
    analyticsActions["histogramChanged"] = "histogramChanged";
    analyticsActions["histogramChangedFromModal"] = "histogramChangedFromModal";
    analyticsActions["histogramExpanded"] = "histogramExpanded";
    analyticsActions["resultSelected"] = "resultSelected";
    analyticsActions["moreFacetsPageChange"] = "moreFacetsPageChange";
    analyticsActions["showMoreFacetsModal"] = "showMoreFacetsModal";
    analyticsActions["closeMoreFacetsModal"] = "closeMoreFacetsModal";
    analyticsActions["applyMoreFacetsModal"] = "applyMoreFacetsModal";
})(analyticsActions || (analyticsActions = {}));
