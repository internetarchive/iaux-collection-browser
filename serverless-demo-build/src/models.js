import { msg } from '@lit/localize';
import { AggregationSortType, } from '@internetarchive/search-service';
import { collapseRepeatedQuotes } from './utils/collapse-repeated-quotes';
import { resolveMediatype } from './utils/resolve-mediatype';
import { loginRequiredIcon } from './assets/img/icons/login-required';
import { restrictedIcon } from './assets/img/icons/restricted';
export const TILE_OVERLAY_TEXT = {
    get 'login-required'() {
        return msg('Log in to view this item');
    },
    get 'content-warning'() {
        return msg('Content may be inappropriate');
    },
};
export const TILE_OVERLAY_ICONS = {
    'login-required': loginRequiredIcon,
    'content-warning': restrictedIcon,
};
/**
 * Class for converting & storing raw search results in the correct format for UI tiles.
 */
export class TileModel {
    constructor(result, hitRequestSource = 'unknown') {
        const flags = this.getFlags(result);
        this.adIds = result.ad_id?.values;
        this.averageRating = result.avg_rating?.value;
        this.captureDates = result.capture_dates?.values;
        this.checked = false;
        this.collections = result.collection?.values ?? [];
        this.collectionFilesCount = result.collection_files_count?.value ?? 0;
        this.collectionSize = result.collection_size?.value ?? 0;
        this.commentCount = result.num_reviews?.value ?? 0;
        this.creator = result.creator?.value;
        this.creators = result.creator?.values ?? [];
        this.dateAdded = result.addeddate?.value;
        this.dateArchived = result.publicdate?.value;
        this.datePublished = result.date?.value;
        this.dateReviewed = result.reviewdate?.value;
        this.description = result.description?.values.join('\n');
        this.factChecks = result.factcheck?.values;
        this.favCount = result.num_favorites?.value ?? 0;
        this.hitRequestSource = hitRequestSource;
        this.hitType = result.rawMetadata?.hit_type;
        this.href = collapseRepeatedQuotes(result.review?.__href__ ?? result.__href__?.value);
        this.identifier = TileModel.cleanIdentifier(result.identifier);
        this.isClip = result.is_clip?.value;
        this.issue = result.issue?.value;
        this.itemCount = result.item_count?.value ?? 0;
        this.mediatype = resolveMediatype(result);
        this.review = result.review;
        this.snippets = result.highlight?.values ?? [];
        this.source = result.source?.value;
        this.subjects = result.subject?.values ?? [];
        this.thumbnailUrl = result.__img__?.value;
        this.title = result.title?.value ?? '';
        this.tvClipCount = result.num_clips?.value ?? 0;
        this.volume = result.volume?.value;
        this.viewCount = result.downloads?.value;
        this.weeklyViewCount = result.week?.value;
        this.loginRequired = flags.loginRequired;
        this.contentWarning = flags.contentWarning;
    }
    /**
     * Copies the contents of this TileModel onto a new instance
     */
    clone() {
        const cloned = new TileModel({});
        cloned.adIds = this.adIds;
        cloned.averageRating = this.averageRating;
        cloned.captureDates = this.captureDates;
        cloned.checked = this.checked;
        cloned.collections = this.collections;
        cloned.collectionFilesCount = this.collectionFilesCount;
        cloned.collectionSize = this.collectionSize;
        cloned.commentCount = this.commentCount;
        cloned.creator = this.creator;
        cloned.creators = this.creators;
        cloned.dateStr = this.dateStr;
        cloned.dateAdded = this.dateAdded;
        cloned.dateArchived = this.dateArchived;
        cloned.datePublished = this.datePublished;
        cloned.dateReviewed = this.dateReviewed;
        cloned.description = this.description;
        cloned.factChecks = this.factChecks;
        cloned.favCount = this.favCount;
        cloned.hitRequestSource = this.hitRequestSource;
        cloned.hitType = this.hitType;
        cloned.href = this.href;
        cloned.identifier = this.identifier;
        cloned.isClip = this.isClip;
        cloned.issue = this.issue;
        cloned.itemCount = this.itemCount;
        cloned.mediatype = this.mediatype;
        cloned.snippets = this.snippets;
        cloned.source = this.source;
        cloned.subjects = this.subjects;
        cloned.thumbnailUrl = this.thumbnailUrl;
        cloned.title = this.title;
        cloned.tvClipCount = this.tvClipCount;
        cloned.volume = this.volume;
        cloned.viewCount = this.viewCount;
        cloned.weeklyViewCount = this.weeklyViewCount;
        cloned.loginRequired = this.loginRequired;
        cloned.contentWarning = this.contentWarning;
        return cloned;
    }
    /**
     * Whether this model represents the result of a TV search query.
     */
    get isTvSearchResult() {
        return (this.hitType === 'tv_clip' && this.hitRequestSource === 'search_query');
    }
    /**
     * Determines the appropriate tile flags for the given search result
     * (login required and/or content warning)
     */
    getFlags(result) {
        const flags = {
            loginRequired: false,
            contentWarning: false,
        };
        // Check if item and item in "modifying" collection, setting above flags
        if (result.collection?.values.length &&
            result.mediatype?.value !== 'collection') {
            for (const collection of result.collection?.values ?? []) {
                if (collection === 'loggedin') {
                    flags.loginRequired = true;
                    if (flags.contentWarning)
                        break;
                }
                if (collection === 'no-preview') {
                    flags.contentWarning = true;
                    if (flags.loginRequired)
                        break;
                }
            }
        }
        return flags;
    }
    static cleanIdentifier(identifier) {
        // Some identifiers (e.g., from Whisper) represent documents rather than items, and
        // are suffixed with values that need to be stripped. Those values are separated
        // from the item identifier itself with '|'.
        const barIndex = identifier?.indexOf('|') ?? -1;
        const cleaned = barIndex > 0 ? identifier?.slice(0, barIndex) : identifier;
        return cleaned;
    }
}
/**
 * The sort fields shown in the sort filter bar
 */
export var SortField;
(function (SortField) {
    SortField["default"] = "default";
    SortField["unrecognized"] = "unrecognized";
    SortField["relevance"] = "relevance";
    SortField["alltimeview"] = "alltimeview";
    SortField["weeklyview"] = "weeklyview";
    SortField["title"] = "title";
    SortField["date"] = "date";
    SortField["datearchived"] = "datearchived";
    SortField["datereviewed"] = "datereviewed";
    SortField["dateadded"] = "dateadded";
    SortField["datefavorited"] = "datefavorited";
    SortField["creator"] = "creator";
})(SortField || (SortField = {}));
/**
 * Views-related sort fields
 */
export const ALL_VIEWS_SORT_FIELDS = [
    SortField.weeklyview,
    SortField.alltimeview,
];
/**
 * Date-related sort fields
 */
export const ALL_DATE_SORT_FIELDS = [
    SortField.datefavorited,
    SortField.date,
    SortField.datearchived,
    SortField.datereviewed,
    SortField.dateadded,
];
export const SORT_OPTIONS = {
    // Default sort is the case where the user has not specified a sort option via the sort bar or URL.
    // In these cases, we defer to whatever sort the backend chooses.
    // For the search page, the default is always relevance sort.
    // For collection pages _without a query_, the default is usually weekly views, but this can be
    // overridden by the collection's `sort-by` metadata entry. If a query _is_ specified, then the
    // default is again relevance sort.
    // For fav-* collections only, the default is instead sorting by date favorited.
    [SortField.default]: {
        field: SortField.default,
        defaultSortDirection: null,
        canSetDirection: false,
        shownInSortBar: false,
        shownInURL: false,
        handledBySearchService: false, // We rely on the PPS default sort handling in these cases
        displayName: '',
        urlNames: ['', null, undefined], // Empty or nullish sort params result in default sorting
    },
    // Unrecognized sort is the case where the user has specified a sort in the URL, but it is not
    // one of the options listed in this map. We still want these unrecognized sorts to be applied
    // when searching, but they are not displayed in the sort bar and we do not actively manage
    // their URL param beyond flipping the direction as needed.
    [SortField.unrecognized]: {
        field: SortField.unrecognized,
        defaultSortDirection: null,
        canSetDirection: true,
        shownInSortBar: false,
        shownInURL: false,
        handledBySearchService: true, // The unrecognized sort param is passed along as-is
        displayName: '',
        urlNames: [],
    },
    // Relevance sort is unique in that it does not produce a URL param when it is set.
    // It is only available when there is a user-specified query that relevancy can be scored against.
    // Therefore, it does not appear as a sort bar option when browsing a collection with no query set.
    [SortField.relevance]: {
        field: SortField.relevance,
        defaultSortDirection: null,
        canSetDirection: false,
        shownInSortBar: true,
        shownInURL: false,
        handledBySearchService: false,
        get displayName() {
            return msg('Relevance');
        },
        urlNames: ['_score'],
    },
    [SortField.alltimeview]: {
        field: SortField.alltimeview,
        defaultSortDirection: 'desc',
        canSetDirection: true,
        shownInSortBar: true,
        shownInURL: true,
        handledBySearchService: true,
        searchServiceKey: 'downloads',
        get displayName() {
            return msg('All-time views');
        },
        urlNames: ['downloads'],
    },
    [SortField.weeklyview]: {
        field: SortField.weeklyview,
        defaultSortDirection: 'desc',
        canSetDirection: true,
        shownInSortBar: true,
        shownInURL: true,
        handledBySearchService: true,
        searchServiceKey: 'week',
        get displayName() {
            return msg('Weekly views');
        },
        urlNames: ['week'],
    },
    [SortField.title]: {
        field: SortField.title,
        defaultSortDirection: 'asc',
        canSetDirection: true,
        shownInSortBar: true,
        shownInURL: true,
        handledBySearchService: true,
        searchServiceKey: 'titleSorter',
        get displayName() {
            return msg('Title');
        },
        urlNames: ['title', 'titleSorter'],
    },
    [SortField.date]: {
        field: SortField.date,
        defaultSortDirection: 'desc',
        canSetDirection: true,
        shownInSortBar: true,
        shownInURL: true,
        handledBySearchService: true,
        searchServiceKey: 'date',
        get displayName() {
            return msg('Date published');
        },
        urlNames: ['date'],
    },
    [SortField.datearchived]: {
        field: SortField.datearchived,
        defaultSortDirection: 'desc',
        canSetDirection: true,
        shownInSortBar: true,
        shownInURL: true,
        handledBySearchService: true,
        searchServiceKey: 'publicdate',
        get displayName() {
            return msg('Date archived');
        },
        urlNames: ['publicdate'],
    },
    [SortField.datereviewed]: {
        field: SortField.datereviewed,
        defaultSortDirection: 'desc',
        canSetDirection: true,
        shownInSortBar: true,
        shownInURL: true,
        handledBySearchService: true,
        searchServiceKey: 'reviewdate',
        get displayName() {
            return msg('Date reviewed');
        },
        urlNames: ['reviewdate'],
    },
    [SortField.dateadded]: {
        field: SortField.dateadded,
        defaultSortDirection: 'desc',
        canSetDirection: true,
        shownInSortBar: true,
        shownInURL: true,
        handledBySearchService: true,
        searchServiceKey: 'addeddate',
        get displayName() {
            return msg('Date added');
        },
        urlNames: ['addeddate'],
    },
    [SortField.datefavorited]: {
        field: SortField.datefavorited,
        defaultSortDirection: 'desc',
        canSetDirection: false,
        shownInSortBar: true, // But only when viewing fav-* collections
        shownInURL: false,
        handledBySearchService: false,
        searchServiceKey: 'favoritedate',
        get displayName() {
            return msg('Date favorited');
        },
        urlNames: ['favoritedate'],
    },
    [SortField.creator]: {
        field: SortField.creator,
        defaultSortDirection: 'asc',
        canSetDirection: true,
        shownInSortBar: true,
        shownInURL: true,
        handledBySearchService: true,
        searchServiceKey: 'creatorSorter',
        get displayName() {
            return msg('Creator');
        },
        urlNames: ['creator', 'creatorSorter'],
    },
};
/**
 * Returns the SortOption corresponding to the given API sort name, or
 * the "unrecognized" SortOption if none matches.
 */
export function sortOptionFromAPIString(sortName) {
    return (Object.values(SORT_OPTIONS).find(opt => opt.urlNames.some(name => sortName === name)) ?? SORT_OPTIONS[SortField.unrecognized]);
}
export const defaultSortAvailability = {
    [SortField.relevance]: true,
    [SortField.weeklyview]: true,
    [SortField.alltimeview]: true,
    [SortField.title]: true,
    [SortField.datefavorited]: false,
    [SortField.date]: true,
    [SortField.datearchived]: true,
    [SortField.datereviewed]: true,
    [SortField.dateadded]: true,
    [SortField.creator]: true,
    [SortField.default]: false,
    [SortField.unrecognized]: false,
};
export const favoritesSortAvailability = {
    ...defaultSortAvailability,
    [SortField.datefavorited]: true,
};
export const tvSortAvailability = {
    ...defaultSortAvailability,
    [SortField.date]: false,
    [SortField.datereviewed]: false,
    [SortField.dateadded]: false,
};
export const defaultProfileElementSorts = {
    uploads: SortField.datearchived,
    reviews: SortField.datereviewed,
    collections: SortField.datearchived,
    web_archives: SortField.datearchived,
    favorites: SortField.datefavorited,
};
/**
 * A map from prefix filter types to the corresponding aggregation keys
 * that are needed to fetch the filter counts from the backend.
 */
export const prefixFilterAggregationKeys = {
    title: 'firstTitle',
    creator: 'firstCreator',
};
/**
 * Keys an extra facet group may not use: they would reach an object's
 * prototype chain where facet groups are stored by key, or take over the
 * date picker's aggregations.
 */
export const RESERVED_FACET_GROUP_KEYS = new Set([
    '__proto__',
    'constructor',
    'prototype',
    'year_histogram',
    'date_histogram',
]);
/**
 * An empty selection for every facet group: collection-browser's own, plus
 * any extra groups given (reserved keys are skipped). Only these groups can
 * be restored from the URL.
 */
export const getDefaultSelectedFacets = (extraGroups = []) => {
    const selected = {
        subject: {},
        lending: {},
        mediatype: {},
        language: {},
        creator: {},
        collection: {},
        year: {},
        clip_type: {},
        program: {},
        person: {},
        sponsor: {},
    };
    for (const group of extraGroups) {
        if (group.key && !RESERVED_FACET_GROUP_KEYS.has(group.key)) {
            selected[group.key] ??= {};
        }
    }
    return selected;
};
/**
 * Map from allowed TV filtering parameters in the URL to their corresponding filter type
 */
export const tvClipURLParamsToFilters = {
    only_commercials: 'commercial',
    only_factchecks: 'fact check',
    only_quotes: 'quote',
};
/**
 * Facet display order when presenting results for all search types *except* TV (see below).
 */
export const defaultFacetDisplayOrder = [
    'mediatype',
    // 'lending', Commenting this out removes the lending facet from the sidebar for now
    'year',
    'subject',
    'collection',
    'creator',
    'language',
];
/**
 * Specialized facet ordering when displaying TV search results
 */
export const tvFacetDisplayOrder = [
    'program',
    'creator',
    'year',
    'subject',
    // 'person', Omitting the Person facet group for now, though it may be re-added later with new semantics
    'language',
    'clip_type',
];
/**
 * Human-readable titles for each facet group.
 */
export const facetTitles = {
    get subject() {
        return msg('Subject');
    },
    get lending() {
        return msg('Availability');
    },
    get mediatype() {
        return msg('Media Type');
    },
    get language() {
        return msg('Language');
    },
    get creator() {
        return msg('Creator');
    },
    get collection() {
        return msg('Collection');
    },
    get year() {
        return msg('Year');
    },
    get clip_type() {
        return msg('Clip Type');
    },
    get program() {
        return msg('Program');
    },
    get person() {
        return msg('Person');
    },
    get sponsor() {
        return msg('Sponsor');
    },
};
/**
 * Human-readable plural titles for each facet group, for referring to its values.
 */
export const facetPluralTitles = {
    get subject() {
        return msg('Subjects');
    },
    get lending() {
        return msg('Availability');
    },
    get mediatype() {
        return msg('Media Types');
    },
    get language() {
        return msg('Languages');
    },
    get creator() {
        return msg('Creators');
    },
    get collection() {
        return msg('Collections');
    },
    get year() {
        return msg('Years');
    },
    get clip_type() {
        return msg('Clip Types');
    },
    get program() {
        return msg('Programs');
    },
    get person() {
        return msg('People');
    },
    get sponsor() {
        return msg('Sponsors');
    },
};
/**
 * The default sort type to use for each facet type
 */
export const defaultFacetSort = {
    subject: AggregationSortType.COUNT,
    lending: AggregationSortType.COUNT,
    mediatype: AggregationSortType.COUNT,
    language: AggregationSortType.COUNT,
    creator: AggregationSortType.COUNT,
    collection: AggregationSortType.COUNT,
    year: AggregationSortType.NUMERIC, // Year facets are ordered by their numeric value by default
    clip_type: AggregationSortType.COUNT,
    program: AggregationSortType.COUNT,
    person: AggregationSortType.COUNT,
    sponsor: AggregationSortType.COUNT,
};
/**
 * The default sort type to use for each facet type in TV search More... dialogs only
 */
export const tvMoreFacetSort = {
    ...defaultFacetSort,
    creator: AggregationSortType.ALPHABETICAL,
    program: AggregationSortType.ALPHABETICAL,
};
/**
 * The sort type corresponding to facet bucket values, for each facet type
 * (i.e., the opposite of "sort by count" for that type).
 */
export const valueFacetSort = {
    subject: AggregationSortType.ALPHABETICAL,
    lending: AggregationSortType.ALPHABETICAL,
    mediatype: AggregationSortType.ALPHABETICAL,
    language: AggregationSortType.ALPHABETICAL,
    creator: AggregationSortType.ALPHABETICAL,
    collection: AggregationSortType.ALPHABETICAL,
    year: AggregationSortType.NUMERIC, // Year facets' values should be compared numerically, not lexicographically (year 2001 > year 3)
    clip_type: AggregationSortType.ALPHABETICAL,
    program: AggregationSortType.ALPHABETICAL,
    person: AggregationSortType.ALPHABETICAL,
    sponsor: AggregationSortType.ALPHABETICAL,
};
/**
 * Maps valid lending keys to whether they should be visible in the facet sidebar
 */
export const lendingFacetKeysVisibility = {
    is_lendable: true,
    is_borrowable: false,
    available_to_borrow: true,
    is_browsable: false,
    available_to_browse: false,
    is_readable: true,
    available_to_waitlist: false,
};
export const customFacetDisplayNames = {
    lending: {
        get is_lendable() {
            return msg('Lending Library');
        },
        get available_to_borrow() {
            return msg('Borrow 14 Days');
        },
        get is_readable() {
            return msg('Always Available');
        },
    },
    clip_type: {
        get quote() {
            return msg('Quote');
        },
        get commercial() {
            return msg('Political Ad');
        },
        get 'fact check'() {
            return msg('Fact Check');
        },
    },
};
/**
 * A record of which admin-only collections should be suppressed from being displayed
 * as facets or in an item's list of collections.
 */
export const suppressedCollections = {
    deemphasize: true,
    community: true,
    stream_only: true,
    samples_only: true,
    test_collection: true,
    printdisabled: true,
    'openlibrary-ol': true,
    nationalemergencylibrary: true,
    china: true,
    americana: true,
    toronto: true,
};
