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
  subject?: string;
  source?: string;
  collections: string[];
}

export type CollectionDisplayMode = 'grid' | 'list-compact' | 'list-detail';

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
