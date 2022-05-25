import type { MediaType } from '@internetarchive/field-parsers';
export interface TileModel {
    averageRating?: number;
    collectionIdentifier?: string;
    collectionName?: string;
    collections: string[];
    commentCount: number;
    creator?: string;
    creators: string[];
    dateAdded?: Date;
    dateArchived?: Date;
    datePublished?: Date;
    dateReviewed?: Date;
    description?: string;
    favCount: number;
    identifier: string;
    issue?: string;
    itemCount: number;
    mediatype: MediaType;
    source?: string;
    subjects: string[];
    title: string;
    viewCount: number;
    volume?: string;
    loginRequired: boolean;
    contentWarning: boolean;
}
export declare type CollectionDisplayMode = 'grid' | 'list-compact' | 'list-detail';
export declare type TileDisplayMode = 'grid' | 'list-compact' | 'list-detail' | 'list-header';
/**
 * This is mainly used to set the cookies for the collection display mode.
 *
 * It allows the user to set different modes for different contexts (collection page, search page, etc).
 */
export declare type CollectionBrowserContext = 'collection' | 'search';
/**
 * The sort fields shown in the sort filter bar
 */
export declare enum SortField {
    'relevance' = "relevance",
    'views' = "views",
    'title' = "title",
    'datearchived' = "datearchived",
    'date' = "date",
    'datereviewed' = "datereviewed",
    'dateadded' = "dateadded",
    'creator' = "creator"
}
/**
 * The metadata fields we sort by that map to the SortFields above
 */
export declare type MetadataSortField = 'week' | 'titleSorter' | 'date' | 'creatorSorter' | 'publicdate' | 'reviewdate' | 'addeddate';
export declare const SortFieldDisplayName: {
    [key in SortField]: string;
};
/**
 * Maps the SortField above to the corresponding Metadata field in the API.
 */
export declare const SortFieldToMetadataField: {
    [key in SortField]: MetadataSortField | null;
};
/**
 * Maps the Metadata field to the corresponding SortField field in the API.
 */
export declare const MetadataFieldToSortField: {
    [key in MetadataSortField]: SortField;
};
export declare type FacetOption = 'subject' | 'mediatype' | 'language' | 'creator' | 'collection' | 'year';
export declare type SelectedFacetState = 'selected' | 'hidden';
export declare type FacetState = SelectedFacetState | 'none';
export interface FacetBucket {
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
export declare type FacetValue = string;
export declare type SelectedFacets = Record<FacetOption, Record<FacetValue, SelectedFacetState>>;
export declare const defaultSelectedFacets: SelectedFacets;
