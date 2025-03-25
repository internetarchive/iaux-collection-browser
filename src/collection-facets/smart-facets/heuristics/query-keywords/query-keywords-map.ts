import type { KeywordFacetMap } from '../../models';

/**
 * Map from keywords found in the search query to an array of
 * likely-relevant "smart facets" for those keywords.
 */
export const QUERY_KEYWORDS: Readonly<KeywordFacetMap> = {
  text: [{ facets: [{ facetType: 'mediatype', bucketKey: 'texts' }] }],
  book: [{ facets: [{ facetType: 'mediatype', bucketKey: 'texts' }] }],
  pdf: [{ facets: [{ facetType: 'mediatype', bucketKey: 'texts' }] }],
  epub: [{ facets: [{ facetType: 'mediatype', bucketKey: 'texts' }] }],
  audio: [{ facets: [{ facetType: 'mediatype', bucketKey: 'audio' }] }],
  song: [{ facets: [{ facetType: 'mediatype', bucketKey: 'audio' }] }],
  music: [{ facets: [{ facetType: 'mediatype', bucketKey: 'audio' }] }],
  listen: [{ facets: [{ facetType: 'mediatype', bucketKey: 'audio' }] }],
  podcast: [{ facets: [{ facetType: 'mediatype', bucketKey: 'audio' }] }],
  radio: [{ facets: [{ facetType: 'mediatype', bucketKey: 'audio' }] }],
  stream: [
    { facets: [{ facetType: 'mediatype', bucketKey: 'audio' }] },
    { facets: [{ facetType: 'mediatype', bucketKey: 'movies' }] },
  ],
  video: [{ facets: [{ facetType: 'mediatype', bucketKey: 'movies' }] }],
  movie: [{ facets: [{ facetType: 'mediatype', bucketKey: 'movies' }] }],
  film: [{ facets: [{ facetType: 'mediatype', bucketKey: 'movies' }] }],
  image: [{ facets: [{ facetType: 'mediatype', bucketKey: 'image' }] }],
  photo: [{ facets: [{ facetType: 'mediatype', bucketKey: 'image' }] }],
  picture: [{ facets: [{ facetType: 'mediatype', bucketKey: 'image' }] }],
  software: [{ facets: [{ facetType: 'mediatype', bucketKey: 'software' }] }],
  app: [{ facets: [{ facetType: 'mediatype', bucketKey: 'software' }] }],
  program: [{ facets: [{ facetType: 'mediatype', bucketKey: 'software' }] }],
  game: [{ facets: [{ facetType: 'mediatype', bucketKey: 'software' }] }],
  etree: [{ facets: [{ facetType: 'mediatype', bucketKey: 'etree' }] }],
  concert: [{ facets: [{ facetType: 'mediatype', bucketKey: 'etree' }] }],
  'live music': [{ facets: [{ facetType: 'mediatype', bucketKey: 'etree' }] }],
  dataset: [{ facets: [{ facetType: 'mediatype', bucketKey: 'data' }] }],
};
