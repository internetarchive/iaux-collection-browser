import type { MediaType } from '@internetarchive/field-parsers';
import {
  AggregationSortType,
  SortDirection,
} from '@internetarchive/search-service';

export interface TileModel {
  averageRating?: number;
  checked: boolean; // Whether this tile is currently checked for item management functions
  collectionIdentifier?: string;
  collectionName?: string;
  collectionFilesCount: number;
  collections: string[];
  collectionSize: number;
  commentCount: number;
  creator?: string;
  creators: string[];
  dateAdded?: Date; // Date added to public search (software-defined) [from: addeddate]
  dateArchived?: Date; // Date archived (software-defined) item created on archive.org [from: publicdate]
  datePublished?: Date; // Date work published in the world (user-defined) [from: date]
  dateReviewed?: Date; // Date reviewed (user-created) most recent review [from: reviewdate]
  description?: string;
  favCount: number;
  href?: string;
  identifier: string;
  issue?: string;
  itemCount: number;
  mediatype: MediaType;
  source?: string;
  snippets?: string[];
  subjects: string[];
  title: string;
  viewCount: number;
  volume?: string;
  weeklyViewCount?: number;
  loginRequired: boolean;
  contentWarning: boolean;
}

export type CollectionDisplayMode = 'grid' | 'list-compact' | 'list-detail';

export type TileDisplayMode =
  | 'grid'
  | 'list-compact'
  | 'list-detail'
  | 'list-header';

/**
 * This is mainly used to set the cookies for the collection display mode.
 *
 * It allows the user to set different modes for different contexts (collection page, search page, etc).
 */
export type CollectionBrowserContext = 'collection' | 'search';

/**
 * The sort fields shown in the sort filter bar
 */
export enum SortField {
  'default' = 'default',
  'unrecognized' = 'unrecognized',
  'relevance' = 'relevance',
  'alltimeview' = 'alltimeview',
  'weeklyview' = 'weeklyview',
  'title' = 'title',
  'date' = 'date',
  'datearchived' = 'datearchived',
  'datereviewed' = 'datereviewed',
  'dateadded' = 'dateadded',
  'datefavorited' = 'datefavorited',
  'creator' = 'creator',
}

export interface SortOption {
  /**
   * The SortField enum member corresponding to this option.
   */
  field: SortField;

  /**
   * The default sort direction to apply when this sort option is first selected.
   */
  defaultSortDirection: SortDirection | null;

  /**
   * Whether this sort option allows its sort direction to be changed from the default.
   */
  canSetDirection: boolean;

  /**
   * Whether this sort option may appear in the sort bar.
   */
  shownInSortBar: boolean;

  /**
   * Whether this sort option should be saved to the URL.
   * If false, then no `sort` param will be added to the URL when this sort option
   * is selected.
   */
  shownInURL: boolean;

  /**
   * Whether this sort option is passed to the search service.
   * If false, then no sort param will be passed to the search service at all when
   * this sort option is selected.
   */
  handledBySearchService: boolean;

  /**
   * The string identifying this sort field to the search service & backend API.
   */
  searchServiceKey?: string;

  /**
   * The human-readable name to use for this option in the sort bar (if applicable).
   */
  displayName: string;

  /**
   * A list of URL param keys that should be mapped to this sort option.
   * E.g., both `title` and `titleSorter` in the URL map to the `SortField.title` option.
   */
  urlNames: (string | null | undefined)[];
}

export const SORT_OPTIONS: Record<SortField, SortOption> = {
  // Default sort is the case where the user has not specified a sort option via the sort bar or URL.
  // In these cases, we defer to whatever sort the backend chooses.
  // For the search page, the default is always relevance sort.
  // For collection pages _without a query_, the default is usually weekly views, but this can be
  // overridden by the collection's `sort-by` metadata entry. If a query _is_ specified, then the
  // default is again relevance sort.
  // For fav-* collections only, the default is instead sorting by date favorited.
  [SortField.default]: {
    field: SortField.default,
    defaultSortDirection: null,
    canSetDirection: false,
    shownInSortBar: false,
    shownInURL: false,
    handledBySearchService: false, // We rely on the PPS default sort handling in these cases
    displayName: '',
    urlNames: ['', null, undefined], // Empty or nullish sort params result in default sorting
  },
  // Unrecognized sort is the case where the user has specified a sort in the URL, but it is not
  // one of the options listed in this map. We still want these unrecognized sorts to be applied
  // when searching, but they are not displayed in the sort bar and we do not actively manage
  // their URL param beyond flipping the direction as needed.
  [SortField.unrecognized]: {
    field: SortField.unrecognized,
    defaultSortDirection: null,
    canSetDirection: true,
    shownInSortBar: false,
    shownInURL: false,
    handledBySearchService: true, // The unrecognized sort param is passed along as-is
    displayName: '',
    urlNames: [],
  },
  // Relevance sort is unique in that it does not produce a URL param when it is set.
  // It is only available when there is a user-specified query that relevancy can be scored against.
  // Therefore, it does not appear as a sort bar option when browsing a collection with no query set.
  [SortField.relevance]: {
    field: SortField.relevance,
    defaultSortDirection: null,
    canSetDirection: false,
    shownInSortBar: true,
    shownInURL: false,
    handledBySearchService: false,
    displayName: 'Relevance',
    urlNames: ['_score'],
  },
  [SortField.alltimeview]: {
    field: SortField.alltimeview,
    defaultSortDirection: 'desc',
    canSetDirection: true,
    shownInSortBar: true,
    shownInURL: true,
    handledBySearchService: true,
    searchServiceKey: 'downloads',
    displayName: 'All-time views',
    urlNames: ['downloads'],
  },
  [SortField.weeklyview]: {
    field: SortField.weeklyview,
    defaultSortDirection: 'desc',
    canSetDirection: true,
    shownInSortBar: true,
    shownInURL: true,
    handledBySearchService: true,
    searchServiceKey: 'week',
    displayName: 'Weekly views',
    urlNames: ['week'],
  },
  [SortField.title]: {
    field: SortField.title,
    defaultSortDirection: 'asc',
    canSetDirection: true,
    shownInSortBar: true,
    shownInURL: true,
    handledBySearchService: true,
    searchServiceKey: 'titleSorter',
    displayName: 'Title',
    urlNames: ['title', 'titleSorter'],
  },
  [SortField.date]: {
    field: SortField.date,
    defaultSortDirection: 'desc',
    canSetDirection: true,
    shownInSortBar: true,
    shownInURL: true,
    handledBySearchService: true,
    searchServiceKey: 'date',
    displayName: 'Date published',
    urlNames: ['date'],
  },
  [SortField.datearchived]: {
    field: SortField.datearchived,
    defaultSortDirection: 'desc',
    canSetDirection: true,
    shownInSortBar: true,
    shownInURL: true,
    handledBySearchService: true,
    searchServiceKey: 'publicdate',
    displayName: 'Date archived',
    urlNames: ['publicdate'],
  },
  [SortField.datereviewed]: {
    field: SortField.datereviewed,
    defaultSortDirection: 'desc',
    canSetDirection: true,
    shownInSortBar: true,
    shownInURL: true,
    handledBySearchService: true,
    searchServiceKey: 'reviewdate',
    displayName: 'Date reviewed',
    urlNames: ['reviewdate'],
  },
  [SortField.dateadded]: {
    field: SortField.dateadded,
    defaultSortDirection: 'desc',
    canSetDirection: true,
    shownInSortBar: true,
    shownInURL: true,
    handledBySearchService: true,
    searchServiceKey: 'addeddate',
    displayName: 'Date added',
    urlNames: ['addeddate'],
  },
  [SortField.datefavorited]: {
    field: SortField.datefavorited,
    defaultSortDirection: 'desc',
    canSetDirection: false,
    shownInSortBar: true, // But only when viewing fav-* collections
    shownInURL: false,
    handledBySearchService: false,
    searchServiceKey: 'favoritedate',
    displayName: 'Date favorited',
    urlNames: ['favoritedate'],
  },
  [SortField.creator]: {
    field: SortField.creator,
    defaultSortDirection: 'asc',
    canSetDirection: true,
    shownInSortBar: true,
    shownInURL: true,
    handledBySearchService: true,
    searchServiceKey: 'creatorSorter',
    displayName: 'Creator',
    urlNames: ['creator', 'creatorSorter'],
  },
};

/**
 * Returns the SortOption corresponding to the given API sort name, or
 * the "unrecognized" SortOption if none matches.
 */
export function sortOptionFromAPIString(sortName?: string | null): SortOption {
  return (
    Object.values(SORT_OPTIONS).find(opt =>
      opt.urlNames.some(name => sortName === name)
    ) ?? SORT_OPTIONS[SortField.unrecognized]
  );
}

/** A union of the fields that permit prefix filtering (e.g., alphabetical filtering) */
export type PrefixFilterType = 'title' | 'creator';

/** A map from prefixes (e.g., initial letters) to the number of items matching that prefix */
export type PrefixFilterCounts = Record<string, number>;

/**
 * A map from prefix filter types to the corresponding aggregation keys
 * that are needed to fetch the filter counts from the backend.
 */
export const prefixFilterAggregationKeys: Record<PrefixFilterType, string> = {
  title: 'firstTitle',
  creator: 'firstCreator',
};

export type FacetOption =
  | 'subject'
  | 'lending'
  | 'mediatype'
  | 'language'
  | 'creator'
  | 'collection'
  | 'year';

export type SelectedFacetState = 'selected' | 'hidden';

export type FacetState = SelectedFacetState | 'none';

export interface FacetBucket {
  // for some facets, we augment the key with a display value
  displayText?: string;
  key: string;
  count: number;
  state: FacetState;
}

export interface FacetGroup {
  title: string;
  key: FacetOption;
  buckets: FacetBucket[];
}

export type FacetEventDetails = {
  key: FacetOption;
  state: FacetState;
  negative: boolean;
};

export type FacetValue = string;

export type SelectedFacets = Record<
  FacetOption,
  Record<FacetValue, FacetBucket>
>;

export const getDefaultSelectedFacets = (): SelectedFacets => ({
  subject: {},
  lending: {},
  mediatype: {},
  language: {},
  creator: {},
  collection: {},
  year: {},
});

export const facetDisplayOrder: FacetOption[] = [
  'mediatype',
  'lending',
  'year',
  'subject',
  'collection',
  'creator',
  'language',
];

export const facetTitles: Record<FacetOption, string> = {
  subject: 'Subject',
  lending: 'Availability',
  mediatype: 'Media Type',
  language: 'Language',
  creator: 'Creator',
  collection: 'Collection',
  year: 'Year',
};

/**
 * The default sort type to use for each facet type
 */
export const defaultFacetSort: Record<FacetOption, AggregationSortType> = {
  subject: AggregationSortType.COUNT,
  lending: AggregationSortType.COUNT,
  mediatype: AggregationSortType.COUNT,
  language: AggregationSortType.COUNT,
  creator: AggregationSortType.COUNT,
  collection: AggregationSortType.COUNT,
  year: AggregationSortType.NUMERIC,
};

/**
 * The sort type corresponding to facet bucket values, for each facet type
 * (i.e., the opposite of "sort by count" for that type).
 */
export const valueFacetSort: Record<FacetOption, AggregationSortType> = {
  subject: AggregationSortType.ALPHABETICAL,
  lending: AggregationSortType.ALPHABETICAL,
  mediatype: AggregationSortType.ALPHABETICAL,
  language: AggregationSortType.ALPHABETICAL,
  creator: AggregationSortType.ALPHABETICAL,
  collection: AggregationSortType.ALPHABETICAL,
  year: AggregationSortType.NUMERIC,
};

export type LendingFacetKey =
  | 'is_lendable'
  | 'is_borrowable'
  | 'available_to_borrow'
  | 'is_browsable'
  | 'available_to_browse'
  | 'is_readable'
  | 'available_to_waitlist';

/**
 * Maps valid lending keys to whether they should be visible in the facet sidebar
 */
export const lendingFacetKeysVisibility: Record<LendingFacetKey, boolean> = {
  is_lendable: true,
  is_borrowable: false,
  available_to_borrow: true,
  is_browsable: false,
  available_to_browse: false,
  is_readable: true,
  available_to_waitlist: false,
};

/**
 * Maps valid, visible lending keys to their facet sidebar display text
 */
export const lendingFacetDisplayNames: Partial<
  Record<LendingFacetKey, string>
> = {
  is_lendable: 'Lending Library',
  available_to_borrow: 'Borrow 14 Days',
  is_readable: 'Always Available',
};

/**
 * A record of which admin-only collections should be suppressed from being displayed
 * as facets or in an item's list of collections.
 */
export const suppressedCollections: Record<string, boolean> = {
  deemphasize: true,
  community: true,
  stream_only: true,
  samples_only: true,
  test_collection: true,
  printdisabled: true,
  'openlibrary-ol': true,
  nationalemergencylibrary: true,
  china: true,
  americana: true,
  toronto: true,
};
