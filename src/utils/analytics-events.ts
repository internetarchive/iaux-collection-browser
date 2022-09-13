/**
 * Analytics categories and events. Used when building actions in
 */
export enum analyticsCategories {
  default = 'collection-browser',
}

export enum analyticsActions {
  sortBy = 'sortBy',
  filterByCreator = 'filterByCreator',
  filterByTitle = 'filterByTitle',
  displayMode = 'displayMode',
  facetSelected = 'facetSelected',
  facetDeselected = 'facetDeselected',
  facetNegativeSelected = 'facetNegativeSelected',
  facetNegativeDeselected = 'facetNegativeDeselected',
  histogramChanged = 'histogramChanged',
  resultSelected = 'resultSelected',
}
