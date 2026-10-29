import type { EtdFacet } from './etd-facets';
import { etdFacet } from './etd-facets';

/**
 * The facets of a search by meaning (vector rank). The vector store's facet
 * rows (cell-facets.bin) carry only the year, the flags and the repository,
 * so it has Source and Availability, read and named as in the text table,
 * and Repository, which the text search doesn't show yet. The repository is
 * the landing page's host: the live page labels it "Institution", but it
 * isn't the text index's institution list.
 *
 * Ported from etd-search/search.html (drawVecFacets, vecPass).
 */
export const ETD_VECTOR_FACETS: readonly EtdFacet[] = [
  {
    key: 'repository',
    title: 'Repository',
    pluralTitle: 'Repositories',
    after: 'year',
    read: (rows, docId, add) => {
      const host = rows.domain(docId);
      if (host) add(host);
    },
    label: host => host,
    codesFor: host => [host],
  },
  { ...etdFacet('source')!, after: 'repository' },
  { ...etdFacet('availability')!, after: 'source' },
];
