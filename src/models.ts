import type { MediaType } from '@internetarchive/field-parsers';

export interface TileModel {
  averageRating?: number;
  collectionIdentifier?: string;
  collectionName?: string;
  collections: string[];
  commentCount: number;
  creator?: string;
  creators: string[];
  dateAdded?: Date; // Date added to public search (software-defined) [from: addeddate]
  dateArchived?: Date; // Date archived (software-defined) item created on archive.org [from: publicdate]
  datePublished?: Date; // Date work published in the world (user-defined) [from: date]
  dateReviewed?: Date; // Date reviewed (user-created) most recent review [from: reviewdate]
  description?: string;
  favCount: number;
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
  'relevance' = 'relevance',
  'alltimeview' = 'alltimeview',
  'weeklyview' = 'weeklyview',
  'title' = 'title',
  'datearchived' = 'datearchived',
  'date' = 'date',
  'datereviewed' = 'datereviewed',
  'dateadded' = 'dateadded',
  'creator' = 'creator',
}

/**
 * The metadata fields we sort by that map to the SortFields above
 */
export type MetadataSortField =
  | 'downloads'
  | 'week'
  | 'titleSorter'
  | 'date'
  | 'creatorSorter'
  | 'publicdate'
  | 'reviewdate'
  | 'addeddate';

export const SortFieldDisplayName: {
  [key in SortField]: string;
} = {
  relevance: 'Relevance',
  alltimeview: 'All-time Views',
  weeklyview: 'Weekly Views',
  title: 'Title',
  datearchived: 'Date Archived',
  date: 'Date Published',
  datereviewed: 'Date Reviewed',
  dateadded: 'Date Added',
  creator: 'Creator',
};

/**
 * Maps the SortField above to the corresponding Metadata field in the API.
 */
export const SortFieldToMetadataField: {
  [key in SortField]: MetadataSortField | null;
} = {
  relevance: null,
  alltimeview: 'downloads',
  weeklyview: 'week',
  title: 'titleSorter',
  datearchived: 'publicdate',
  date: 'date',
  datereviewed: 'reviewdate',
  dateadded: 'addeddate',
  creator: 'creatorSorter',
};

/**
 * Maps the Metadata field to the corresponding SortField field in the API.
 */
export const MetadataFieldToSortField: {
  [key in MetadataSortField]: SortField;
} = {
  week: SortField.weeklyview,
  downloads: SortField.alltimeview,
  titleSorter: SortField.title,
  date: SortField.date,
  publicdate: SortField.datearchived,
  reviewdate: SortField.datereviewed,
  addeddate: SortField.dateadded,
  creatorSorter: SortField.creator,
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

export type FacetValue = string;

export type SelectedFacets = Record<
  FacetOption,
  Record<FacetValue, FacetBucket>
>;

export const defaultSelectedFacets: SelectedFacets = {
  subject: {},
  lending: {},
  mediatype: {},
  language: {},
  creator: {},
  collection: {},
  year: {},
};

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
 * A record of which collections should be suppressed from being displayed
 * as facets or in an item's list of collections.
 */
export const suppressedCollections: Record<string, boolean> = {
  deemphasize: true,
  community: true,
};
