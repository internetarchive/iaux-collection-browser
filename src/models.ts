import type { MediaType } from '@internetarchive/field-parsers';

export interface TileModel {
  identifier: string;
  title: string;
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
}

export type CollectionDisplayMode = 'grid' | 'list-compact' | 'list-detail';
