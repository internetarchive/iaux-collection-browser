import type { KeywordFacetMap } from '../../models';

/**
 * Map from Wikidata description keywords for a given entity to a
 * set of likely-relevant "smart facets" for that query.
 *
 * The placeholder string "__QUERY" should be substituted for the actual
 * queried entity when generating facet values.
 */
export const WIKIDATA_ENTITIES: Readonly<KeywordFacetMap> = {
  'written work': [
    { facets: [{ facetType: 'mediatype', bucketKey: 'texts' }] },
  ],
  literature: [{ facets: [{ facetType: 'mediatype', bucketKey: 'texts' }] }],
  book: [{ facets: [{ facetType: 'mediatype', bucketKey: 'texts' }] }],
  novel: [{ facets: [{ facetType: 'mediatype', bucketKey: 'texts' }] }],
  filmmaker: [
    {
      label: 'Films by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'movies' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  author: [
    {
      label: 'Writing by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'texts' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  writer: [
    {
      label: 'Writing by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'texts' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  poet: [
    {
      label: 'Writing by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'texts' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  photographer: [
    {
      label: 'Images by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'image' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  painter: [
    {
      label: 'Images by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'image' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  'visual artist': [
    {
      label: 'Images by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'image' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  'graphic artist': [
    {
      label: 'Images by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'image' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  singer: [
    {
      label: 'Music by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'audio' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  songwriter: [
    {
      label: 'Music by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'audio' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  musician: [
    {
      label: 'Music by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'audio' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  composer: [
    {
      label: 'Music by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'audio' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
  pianist: [
    {
      label: 'Music by __QUERY',
      facets: [
        { facetType: 'mediatype', bucketKey: 'audio' },
        { facetType: 'creator', bucketKey: '__QUERY' },
      ],
    },
  ],
};
