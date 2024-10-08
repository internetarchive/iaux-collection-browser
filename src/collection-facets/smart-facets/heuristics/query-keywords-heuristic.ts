import type {
  SmartQueryHeuristic,
  KeywordFacetMap,
  SmartFacet,
} from '../models';

// If the query contains X word but Y facet isn't selected, recommend facet Y
export class QueryKeywordsHeuristic implements SmartQueryHeuristic {
  private static readonly KEYWORDS: KeywordFacetMap = {
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
    'live music': [
      { facets: [{ facetType: 'mediatype', bucketKey: 'etree' }] },
    ],
    dataset: [{ facets: [{ facetType: 'mediatype', bucketKey: 'data' }] }],
  };

  async getRecommendedFacets(query: string): Promise<SmartFacet[]> {
    const recommendations: SmartFacet[] = [];

    for (const [keyword, facets] of Object.entries(
      QueryKeywordsHeuristic.KEYWORDS
    )) {
      if (query.includes(keyword)) {
        recommendations.push(...facets);
      }
    }

    return recommendations;
  }
}
