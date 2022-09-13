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
  Record<FacetValue, SelectedFacetState>
>;

export const defaultSelectedFacets: SelectedFacets = {
  subject: {},
  mediatype: {},
  language: {},
  creator: {},
  collection: {},
  year: {},
};
