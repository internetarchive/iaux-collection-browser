/**
 * Analytics categories and events. Used when building actions in
 */
export const analyticsCategories = {
  browsing: 'CollectionBrowser-Browsing',
  sorting: 'CollectionBrowser-Sorting',
  displayMode: 'CollectionBrowser-DisplayMode',
};

export const analyticsActions = {
  selectedFacetsChanged: 'selectedFacetsChanged',
  selectedFacetsGroupChanged: 'selectedFacetsGroupChanged',
  displayModeChanged: 'displayModeChanged',
  searchResultsChanged: 'searchResultsChanged',
  histogramDateRangeUpdated: 'histogramDateRangeUpdated',
  visiblePageChanged: 'visiblePageChanged',
  selectedSortParamChanged: 'selectedSortParamChanged',
};

export type DetailEvent = {
  category: string;
  action: string;
  value?: string | null | Object;
};
