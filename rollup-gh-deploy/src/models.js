/**
 * The sort fields shown in the sort filter bar
 */
export var SortField;
(function (SortField) {
    SortField["relevance"] = "relevance";
    SortField["views"] = "views";
    SortField["title"] = "title";
    SortField["datearchived"] = "datearchived";
    SortField["date"] = "date";
    SortField["datereviewed"] = "datereviewed";
    SortField["dateadded"] = "dateadded";
    SortField["creator"] = "creator";
})(SortField || (SortField = {}));
export const SortFieldDisplayName = {
    relevance: 'Relevance',
    views: 'Views',
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
export const SortFieldToMetadataField = {
    relevance: null,
    views: 'week',
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
export const MetadataFieldToSortField = {
    titleSorter: SortField.title,
    date: SortField.date,
    publicdate: SortField.datearchived,
    reviewdate: SortField.datereviewed,
    addeddate: SortField.dateadded,
    creatorSorter: SortField.creator,
    week: SortField.views,
};
export const defaultSelectedFacets = {
    subject: {},
    mediatype: {},
    language: {},
    creator: {},
    collection: {},
    year: {},
};
//# sourceMappingURL=models.js.map