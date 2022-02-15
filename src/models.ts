import type { MediaType } from '@internetarchive/field-parsers';

export interface TileModel {
  identifier: string;
  title: string;
  dateAdded?: Date;
  date?: Date;
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
