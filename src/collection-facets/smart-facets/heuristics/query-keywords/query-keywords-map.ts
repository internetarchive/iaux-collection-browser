import type { KeywordFacetMap, SmartFacet } from '../../models';

const TEXTS: SmartFacet = {
  facets: [{ facetType: 'mediatype', bucketKey: 'texts' }],
};
const AUDIO: SmartFacet = {
  facets: [{ facetType: 'mediatype', bucketKey: 'audio' }],
};
const MOVIES: SmartFacet = {
  facets: [{ facetType: 'mediatype', bucketKey: 'movies' }],
};
const IMAGE: SmartFacet = {
  facets: [{ facetType: 'mediatype', bucketKey: 'image' }],
};
const SOFTWARE: SmartFacet = {
  facets: [{ facetType: 'mediatype', bucketKey: 'software' }],
};
const ETREE: SmartFacet = {
  facets: [{ facetType: 'mediatype', bucketKey: 'etree' }],
};
const WEB: SmartFacet = {
  facets: [{ facetType: 'mediatype', bucketKey: 'web' }],
};
const DATA: SmartFacet = {
  facets: [{ facetType: 'mediatype', bucketKey: 'data' }],
};

/**
 * Map from keywords found in the search query to an array of
 * likely-relevant "smart facets" for those keywords.
 */
export const QUERY_KEYWORDS: Readonly<KeywordFacetMap> = {
  text: [TEXTS],
  book: [TEXTS],
  novel: [TEXTS],
  magazine: [TEXTS],
  newspaper: [TEXTS],
  pdf: [TEXTS],
  epub: [TEXTS],
  audio: [AUDIO],
  song: [AUDIO],
  music: [AUDIO],
  listen: [AUDIO],
  podcast: [AUDIO],
  radio: [AUDIO],
  stream: [AUDIO, MOVIES],
  video: [MOVIES],
  movie: [MOVIES],
  film: [MOVIES],
  animation: [MOVIES],
  youtube: [MOVIES],
  image: [IMAGE],
  photo: [IMAGE],
  picture: [IMAGE],
  painting: [IMAGE],
  jpg: [IMAGE],
  jpeg: [IMAGE],
  png: [IMAGE],
  gif: [IMAGE],
  software: [SOFTWARE],
  app: [SOFTWARE],
  program: [SOFTWARE],
  game: [SOFTWARE],
  arcade: [SOFTWARE],
  etree: [ETREE],
  concert: [ETREE],
  'live music': [ETREE],
  'web crawl': [WEB],
  dataset: [DATA],
};
