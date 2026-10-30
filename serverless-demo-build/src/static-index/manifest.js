/**
 * Describing an item that can be searched in the browser, from a static
 * index it publishes: no search backend, just files read with HTTP Range.
 *
 * Two halves:
 * - the **manifest** is published by the item, next to its index files, and
 *   says what's in them: id spaces, records, facet columns, and per search
 *   its fields, or its vectors and the model that made them;
 * - the **config** is held by the client, and says how to search and show
 *   it: which record fields make a hit, which facets to show and how.
 *
 * `checkConfig` checks every name a config uses against the manifest.
 * See README.md in this folder.
 */
export {};
