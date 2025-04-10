import type { KeywordFacetMap, SmartFacet } from '../../models';

const WRITTEN_WORK_SMART_FACETS: SmartFacet[] = [
  { facets: [{ facetType: 'mediatype', bucketKey: 'texts' }] },
];

const FILMMAKER_SMART_FACETS: SmartFacet[] = [
  {
    label: 'Films by __QUERY',
    facets: [
      { facetType: 'mediatype', bucketKey: 'movies' },
      { facetType: 'creator', bucketKey: '__QUERY' },
    ],
  },
];

const AUTHOR_SMART_FACETS: SmartFacet[] = [
  {
    label: 'Writing by __QUERY',
    facets: [
      { facetType: 'mediatype', bucketKey: 'texts' },
      { facetType: 'creator', bucketKey: '__QUERY' },
    ],
  },
];

const VISUAL_ARTIST_SMART_FACETS: SmartFacet[] = [
  {
    label: 'Images by __QUERY',
    facets: [
      { facetType: 'mediatype', bucketKey: 'image' },
      { facetType: 'creator', bucketKey: '__QUERY' },
    ],
  },
];

const MUSICIAN_SMART_FACETS: SmartFacet[] = [
  {
    label: 'Music by __QUERY',
    facets: [
      { facetType: 'mediatype', bucketKey: 'audio' },
      { facetType: 'creator', bucketKey: '__QUERY' },
    ],
  },
];

/**
 * Map from Wikidata description keywords for a given entity to a
 * set of likely-relevant "smart facets" for that query.
 *
 * The placeholder string "__QUERY" should be substituted for the actual
 * queried entity when generating facet values.
 */
export const WIKIDATA_ENTITIES: Readonly<KeywordFacetMap> = {
  'written work': WRITTEN_WORK_SMART_FACETS,
  literature: WRITTEN_WORK_SMART_FACETS,
  book: WRITTEN_WORK_SMART_FACETS,
  novel: WRITTEN_WORK_SMART_FACETS,

  filmmaker: FILMMAKER_SMART_FACETS,
  director: FILMMAKER_SMART_FACETS,

  author: AUTHOR_SMART_FACETS,
  writer: AUTHOR_SMART_FACETS,
  novelist: AUTHOR_SMART_FACETS,
  essayist: AUTHOR_SMART_FACETS,
  poet: AUTHOR_SMART_FACETS,

  'visual artist': VISUAL_ARTIST_SMART_FACETS,
  'graphic artist': VISUAL_ARTIST_SMART_FACETS,
  photographer: VISUAL_ARTIST_SMART_FACETS,
  painter: VISUAL_ARTIST_SMART_FACETS,

  singer: MUSICIAN_SMART_FACETS,
  songwriter: MUSICIAN_SMART_FACETS,
  musician: MUSICIAN_SMART_FACETS,
  composer: MUSICIAN_SMART_FACETS,
  pianist: MUSICIAN_SMART_FACETS,
};
