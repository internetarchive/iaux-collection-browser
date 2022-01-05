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
  collectionIdentifier?: string;
  collectionName?: string;
}
