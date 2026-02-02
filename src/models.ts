import type { TemplateResult } from 'lit';
import { msg } from '@lit/localize';
import type { MediaType } from '@internetarchive/field-parsers';
import {
  AggregationSortType,
  HitType,
  SearchReview,
  SearchResult,
  SortDirection,
} from '@internetarchive/search-service';
import { collapseRepeatedQuotes } from './utils/collapse-repeated-quotes';
import { resolveMediatype } from './utils/resolve-mediatype';

import { loginRequiredIcon } from './assets/img/icons/login-required';
import { restrictedIcon } from './assets/img/icons/restricted';

/**
 * Flags that can affect the visibility of content on a tile
 */
interface TileFlags {
  loginRequired: boolean;
  contentWarning: boolean;
}

/**
 * Different types of tile overlays, corresponding to the above flags.
 */
export type TileOverlayType = 'login-required' | 'content-warning';

export const TILE_OVERLAY_TEXT: Record<TileOverlayType, string> = {
  'login-required': msg('Log in to view this item'),
  'content-warning': msg('Content may be inappropriate'),
};

export const TILE_OVERLAY_ICONS: Record<TileOverlayType, TemplateResult> = {
  'login-required': loginRequiredIcon,
  'content-warning': restrictedIcon,
};

/**
 * What type of request produced a given set of hits:
 *  - `search_query`: Hits produced by an explicit user query and/or applied filters on any page
 *  - `collection_members`: Hits produced for a collection page without any query or filters
 *  - `profile_tab`: Hits produced for a tab of the profile page without any query or filters
 *  - `unknown`: Hits produced via any other means
 */
export type HitRequestSource =
  | 'search_query'
  | 'collection_members'
  | 'profile_tab'
  | 'unknown';

/**
 * Class for converting & storing raw search results in the correct format for UI tiles.
 */
export class TileModel {
  /** For TV hits. List of identifiers for any commercials contained. */
  adIds?: string[];

  averageRating?: number;

  /** For Web Archive hits on profile pages. List of capture dates for the current URL. */
  captureDates?: Date[];

  /** Whether this tile is currently checked for item management functions */
  checked: boolean;

  collectionIdentifier?: string;

  collectionName?: string;

  collectionFilesCount: number;

  collections: string[];

  collectionSize: number;

  commentCount: number;

  creator?: string;

  creators: string[];

  /** A string representation of the publication date, used strictly for passing preformatted dates to the parent */
  dateStr?: string;

  /** Date added to public search (software-defined) [from MD field: addeddate] */
  dateAdded?: Date;

  /** Date archived (software-defined) item created on archive.org [from MD field: publicdate] */
  dateArchived?: Date;

  /** Date work published in the world (user-defined) [from MD field: date] */
  datePublished?: Date;

  /** Date reviewed (user-created) most recent review [from MD field: reviewdate] */
  dateReviewed?: Date;

  description?: string;

  /** For TV hits. List of URLs for any fact-checks of the contained clips. */
  factChecks?: string[];

  favCount: number;

  hitRequestSource: HitRequestSource;

  hitType?: HitType;

  href?: string;

  identifier?: string;

  /** Whether this model represents a TV clip */
  isClip?: boolean;

  issue?: string;

  itemCount: number;

  mediatype: MediaType;

  review?: SearchReview;

  source?: string;

  snippets?: string[];

  subjects: string[];

  thumbnailUrl?: string;

  title: string;

  tvClipCount?: number;

  viewCount?: number;

  volume?: string;

  weeklyViewCount?: number;

  loginRequired: boolean;

  contentWarning: boolean;

  constructor(
    result: SearchResult,
    hitRequestSource: HitRequestSource = 'unknown',
  ) {
    const flags = this.getFlags(result);

    this.adIds = result.ad_id?.values;
    this.averageRating = result.avg_rating?.value;
    this.captureDates = result.capture_dates?.values;
    this.checked = false;
    this.collections = result.collection?.values ?? [];
    this.collectionFilesCount = result.collection_files_count?.value ?? 0;
    this.collectionSize = result.collection_size?.value ?? 0;
    this.commentCount = result.num_reviews?.value ?? 0;
    this.creator = result.creator?.value;
    this.creators = result.creator?.values ?? [];
    this.dateAdded = result.addeddate?.value;
    this.dateArchived = result.publicdate?.value;
    this.datePublished = result.date?.value;
    this.dateReviewed = result.reviewdate?.value;
    this.description = result.description?.values.join('\n');
    this.factChecks = result.factcheck?.values;
    this.favCount = result.num_favorites?.value ?? 0;
    this.hitRequestSource = hitRequestSource;
    this.hitType = result.rawMetadata?.hit_type;
    this.href = collapseRepeatedQuotes(
      result.review?.__href__ ?? result.__href__?.value,
    );
    this.identifier = TileModel.cleanIdentifier(result.identifier);
    this.isClip = result.is_clip?.value;
    this.issue = result.issue?.value;
    this.itemCount = result.item_count?.value ?? 0;
    this.mediatype = resolveMediatype(result);
    this.review = result.review;
    this.snippets = result.highlight?.values ?? [];
    this.source = result.source?.value;
    this.subjects = result.subject?.values ?? [];
    this.thumbnailUrl = result.__img__?.value;
    this.title = result.title?.value ?? '';
    this.tvClipCount = result.num_clips?.value ?? 0;
    this.volume = result.volume?.value;
    this.viewCount = result.downloads?.value;
    this.weeklyViewCount = result.week?.value;
    this.loginRequired = flags.loginRequired;
    this.contentWarning = flags.contentWarning;
  }

  /**
   * Copies the contents of this TileModel onto a new instance
   */
  clone(): TileModel {
    const cloned = new TileModel({});
    cloned.adIds = this.adIds;
    cloned.averageRating = this.averageRating;
    cloned.captureDates = this.captureDates;
    cloned.checked = this.checked;
    cloned.collections = this.collections;
    cloned.collectionFilesCount = this.collectionFilesCount;
    cloned.collectionSize = this.collectionSize;
    cloned.commentCount = this.commentCount;
    cloned.creator = this.creator;
    cloned.creators = this.creators;
    cloned.dateStr = this.dateStr;
    cloned.dateAdded = this.dateAdded;
    cloned.dateArchived = this.dateArchived;
    cloned.datePublished = this.datePublished;
    cloned.dateReviewed = this.dateReviewed;
    cloned.description = this.description;
    cloned.factChecks = this.factChecks;
    cloned.favCount = this.favCount;
    cloned.hitRequestSource = this.hitRequestSource;
    cloned.hitType = this.hitType;
    cloned.href = this.href;
    cloned.identifier = this.identifier;
    cloned.isClip = this.isClip;
    cloned.issue = this.issue;
    cloned.itemCount = this.itemCount;
    cloned.mediatype = this.mediatype;
    cloned.snippets = this.snippets;
    cloned.source = this.source;
    cloned.subjects = this.subjects;
    cloned.thumbnailUrl = this.thumbnailUrl;
    cloned.title = this.title;
    cloned.tvClipCount = this.tvClipCount;
    cloned.volume = this.volume;
    cloned.viewCount = this.viewCount;
    cloned.weeklyViewCount = this.weeklyViewCount;
    cloned.loginRequired = this.loginRequired;
    cloned.contentWarning = this.contentWarning;
    return cloned;
  }

  /**
   * Whether this model represents the result of a TV search query.
   */
  get isTvSearchResult(): boolean {
    return (
      this.hitType === 'tv_clip' && this.hitRequestSource === 'search_query'
    );
  }

  /**
   * Determines the appropriate tile flags for the given search result
   * (login required and/or content warning)
   */
  private getFlags(result: SearchResult): TileFlags {
    const flags: TileFlags = {
      loginRequired: false,
      contentWarning: false,
    };

    // Check if item and item in "modifying" collection, setting above flags
    if (
      result.collection?.values.length &&
      result.mediatype?.value !== 'collection'
    ) {
      for (const collection of result.collection?.values ?? []) {
        if (collection === 'loggedin') {
          flags.loginRequired = true;
          if (flags.contentWarning) break;
        }
        if (collection === 'no-preview') {
          flags.contentWarning = true;
          if (flags.loginRequired) break;
        }
      }
    }

    return flags;
  }

  private static cleanIdentifier(
    identifier: string | undefined,
  ): string | undefined {
    // Some identifiers (e.g., from Whisper) represent documents rather than items, and
    // are suffixed with values that need to be stripped. Those values are separated
    // from the item identifier itself with '|'.
    const barIndex = identifier?.indexOf('|') ?? -1;
    const cleaned = barIndex > 0 ? identifier?.slice(0, barIndex) : identifier;
    return cleaned;
  }
}

export type RequestKind = 'full' | 'hits' | 'aggregations';

export type CollectionDisplayMode = 'grid' | 'list-compact' | 'list-detail';

export type TileDisplayMode =
  | 'grid'
  | 'list-compact'
  | 'list-detail'
  | 'list-header';

/**
 * This is mainly used to set the cookies for the collection display mode.
 *
 * It allows the user to set different modes for different contexts (collection page, search page, profile page etc).
 */
export type CollectionBrowserContext = 'collection' | 'search' | 'profile';

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

/**
 * Views-related sort fields
 */
export const ALL_VIEWS_SORT_FIELDS = [
  SortField.weeklyview,
  SortField.alltimeview,
] as const;
export type ViewsSortField = (typeof ALL_VIEWS_SORT_FIELDS)[number];

/**
 * Date-related sort fields
 */
export const ALL_DATE_SORT_FIELDS = [
  SortField.datefavorited,
  SortField.date,
  SortField.datearchived,
  SortField.datereviewed,
  SortField.dateadded,
] as const;
export type DateSortField = (typeof ALL_DATE_SORT_FIELDS)[number];

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
      opt.urlNames.some(name => sortName === name),
    ) ?? SORT_OPTIONS[SortField.unrecognized]
  );
}

export const defaultSortAvailability: Record<SortField, boolean> = {
  [SortField.relevance]: true,
  [SortField.weeklyview]: true,
  [SortField.alltimeview]: true,
  [SortField.title]: true,
  [SortField.datefavorited]: false,
  [SortField.date]: true,
  [SortField.datearchived]: true,
  [SortField.datereviewed]: true,
  [SortField.dateadded]: true,
  [SortField.creator]: true,
  [SortField.default]: false,
  [SortField.unrecognized]: false,
};

export const favoritesSortAvailability: Record<SortField, boolean> = {
  ...defaultSortAvailability,
  [SortField.datefavorited]: true,
};

export const tvSortAvailability: Record<SortField, boolean> = {
  ...defaultSortAvailability,
  [SortField.date]: false,
  [SortField.datereviewed]: false,
  [SortField.dateadded]: false,
};

export const defaultProfileElementSorts: Record<
  string,
  Exclude<SortField, SortField.default>
> = {
  uploads: SortField.datearchived,
  reviews: SortField.datereviewed,
  collections: SortField.datearchived,
  web_archives: SortField.datearchived,
};

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

/**
 * Different facet loading strategies that can be used with collection browser.
 *  - `eager`: Facet data is always loaded as soon as a search is performed
 *  - `lazy-mobile`: In the desktop layout, functions exactly as `eager`.
 *     In the mobile layout, facet data will only be loaded once the "Filters" accordion is opened.
 *  - `opt-in-or-login`: Same as `opt-in` for guest users not logged into an account, but same as `eager` for
 *     any logged in user.
 *  - `opt-in`: In the desktop layout, facet data will only be loaded after the user presses a "Load Facets" button.
 *     In the mobile layout, functions exactly as `lazy-mobile`.
 *  - `off`: Facet data will never be loaded, and a message will be displayed in place of facets
 *     indicating that they are unavailable.
 */
export type FacetLoadStrategy =
  | 'eager'
  | 'lazy-mobile'
  | 'opt-in-or-login'
  | 'opt-in'
  | 'off';

/**
 * Union of the facet types that are available in the sidebar.
 */
export type FacetOption =
  | 'subject'
  | 'lending'
  | 'mediatype'
  | 'language'
  | 'creator'
  | 'collection'
  | 'year'
  // TV-specific facet options:
  | 'clip_type'
  | 'program'
  | 'person'
  | 'sponsor';

export type SelectedFacetState = 'selected' | 'hidden';

export type FacetState = SelectedFacetState | 'none';

export interface FacetBucket {
  key: string;
  count: number;
  state: FacetState;
  // for some facets, we augment the key with a display value
  displayText?: string;
  // for TV channel facets, we add a parenthesized secondary name
  extraNote?: string;
}

export interface FacetGroup {
  title: string;
  key: FacetOption;
  buckets: FacetBucket[];
}

/**
 * Information about a user interaction event on a facet.
 */
export type FacetEventDetails = {
  /**
   * The type of facet that was interacted with (e.g., 'mediatype', 'language', ...).
   */
  facetType: FacetOption;
  /**
   * The bucket corresponding to the facet that was interacted with, including the
   * updated state of the facet after the interaction.
   */
  bucket: FacetBucket;
  /**
   * Whether the interaction occurred on a negative facet.
   */
  negative: boolean;
};

export type FacetValue = string;

export type SelectedFacets = Partial<
  Record<FacetOption, Record<FacetValue, FacetBucket>>
>;

export const getDefaultSelectedFacets = (): Required<SelectedFacets> => ({
  subject: {},
  lending: {},
  mediatype: {},
  language: {},
  creator: {},
  collection: {},
  year: {},
  clip_type: {},
  program: {},
  person: {},
  sponsor: {},
});

/**
 * For TV search results, what types of TV clips to restrict the results to.
 */
export type TvClipFilterType = 'commercial' | 'fact check' | 'quote';

/**
 * Map from allowed TV filtering parameters in the URL to their corresponding filter type
 */
export const tvClipURLParamsToFilters: Record<string, TvClipFilterType> = {
  only_commercials: 'commercial',
  only_factchecks: 'fact check',
  only_quotes: 'quote',
};

/**
 * Facet display order when presenting results for all search types *except* TV (see below).
 */
export const defaultFacetDisplayOrder: FacetOption[] = [
  'mediatype',
  // 'lending', Commenting this out removes the lending facet from the sidebar for now
  'year',
  'subject',
  'collection',
  'creator',
  'language',
];

/**
 * Specialized facet ordering when displaying TV search results
 */
export const tvFacetDisplayOrder: FacetOption[] = [
  'program',
  'creator',
  'year',
  'subject',
  'person',
  'language',
  'clip_type',
];

/**
 * Human-readable titles for each facet group.
 */
export const facetTitles: Record<FacetOption, string> = {
  subject: 'Subject',
  lending: 'Availability',
  mediatype: 'Media Type',
  language: 'Language',
  creator: 'Creator',
  collection: 'Collection',
  year: 'Year',
  clip_type: 'Clip Type',
  program: 'Program',
  person: 'Person',
  sponsor: 'Sponsor',
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
  year: AggregationSortType.NUMERIC, // Year facets are ordered by their numeric value by default
  clip_type: AggregationSortType.COUNT,
  program: AggregationSortType.COUNT,
  person: AggregationSortType.COUNT,
  sponsor: AggregationSortType.COUNT,
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
  year: AggregationSortType.NUMERIC, // Year facets' values should be compared numerically, not lexicographically (year 2001 > year 3)
  clip_type: AggregationSortType.ALPHABETICAL,
  program: AggregationSortType.ALPHABETICAL,
  person: AggregationSortType.ALPHABETICAL,
  sponsor: AggregationSortType.ALPHABETICAL,
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

/**
 * A record of manageable item
 */
export interface ManageableItem {
  identifier: string;
  title?: string;
  dateStr?: string;
  date?: string;
}

/**
 * Possible states for whether & how the user has overridden their user preference
 * for blurring behavior on tiles with sensitive content.
 *  - `no-override`: The user has not overridden their user preference, so simply
 *    respect the preference as given.
 *  - `on`: The user has overridden their preference and wants tile blurring enabled.
 *  - `off`: The user has overridden their preference and wants tile blurring disabled.
 */
export type TileBlurOverrideState = 'no-override' | 'on' | 'off';
