export type MediaType =
  | 'collection'
  | 'item'
  | 'account'
  | 'audio'
  | 'video'
  | 'image';

export interface TileModel {
  identifier: string;
  title: string;
  mediatype: MediaType;
  viewCount: number;
  itemCount: number;
  favCount: number;
  commentCount: number;
  description?: string;
  collectionIdentifier?: string;
  collectionName?: string;
}

export type CollectionDisplayMode = 'grid' | 'list-compact' | 'list-detail';
