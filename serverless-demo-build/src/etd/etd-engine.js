/**
 * The contract between EtdSearchService and the ETD static-index search engine
 * (the engine behind archive.org/download/etd-search/search.html).
 *
 * The engine runs entirely in the browser: it ranks against static index files
 * in the etd-search item using HTTP Range reads, so there is no search backend
 * to call. This file only describes the engine's surface. The implementation
 * comes from extracting the engine out of search.html into its own module.
 */
export {};
