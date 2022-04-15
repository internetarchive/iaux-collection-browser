import type { MediaType } from '@internetarchive/field-parsers';

export interface TileModel {
  identifier: string;
  title: string;
  averageRating?: number;
  dateAdded?: Date; // Date added to public search (software-defined) [from: addeddate]
  dateArchived?: Date; // Date archived (software-defined) item created on archive.org [from: publicdate]
  dateReviewed?: Date; // Date reviewed (user-created) most recent review [from: reviewdate]
  datePublished?: Date; // Date work published in the world (user-defined) [from: date]
  mediatype: MediaType;
  viewCount: number;
  itemCount: number;
  favCount: number;
  commentCount: number;
  description?: string;
  collectionIdentifier?: string;
  collectionName?: string;
  creator?: string;
  collections: string[];
}

export type CollectionDisplayMode = 'grid' | 'list-compact' | 'list-detail';

export type CollectionBrowserContext = 'collection' | 'search';

/**
 * The sort fields shown in the sort filter bar
 */
export type SortField =
  | 'relevance'
  | 'views'
  | 'title'
  | 'datearchived'
  | 'datepublished'
  | 'datereviewed'
  | 'dateadded'
  | 'creator';

/**
 * The metadata fields we sort by that map to the SortFields above
 */
export type MetadataSortField =
  | 'week'
  | 'titleSorter'
  | 'date'
  | 'creatorSorter'
  | 'publicdate'
  | 'reviewdate'
  | 'addeddate';

/**
 * Maps the SortField above to the corresponding Metadata field in the API.
 */
export const SortFieldToMetadataField: {
  [key in SortField]: MetadataSortField | null;
} = {
  relevance: null,
  views: 'week',
  title: 'titleSorter',
  datearchived: 'date',
  datepublished: 'publicdate',
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
  titleSorter: 'title',
  date: 'datearchived',
  publicdate: 'datepublished',
  reviewdate: 'datereviewed',
  addeddate: 'dateadded',
  creatorSorter: 'creator',
  week: 'views',
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
