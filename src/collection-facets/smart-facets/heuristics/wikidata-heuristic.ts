import type {
  SmartQueryHeuristic,
  KeywordFacetMap,
  SmartFacet,
} from '../models';

// If wikidata describes the top query result as X, recommend facet Y, e.g.:
// X              Y
// written work   mt:texts
// film           mt:movies
// author         mt:texts and creator:<query>
// filmmaker      mt:movies and creator:<query>
// photographer   mt:image and creator:<query>
// visual artist  mt:image and creator:<query>
// etc.
export class WikidataHeuristic implements SmartQueryHeuristic {
  private static readonly ENTITIES: KeywordFacetMap = {
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

  async getRecommendedFacets(query: string): Promise<SmartFacet[]> {
    const recommendations: SmartFacet[] = [];

    try {
      const urlQuery = encodeURIComponent(query);

      const wikidataResponse = await fetch(
        `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${urlQuery}&format=json&language=en&uselang=en&origin=*&type=item&limit=5`
      );
      const searchResults = await wikidataResponse.json();

      for (const [keyword, facets] of Object.entries(
        WikidataHeuristic.ENTITIES
      )) {
        const keywordRegex = new RegExp(`\\b${keyword}\\b`);
        if (keywordRegex.test(searchResults.search[0]?.description)) {
          const entityName = searchResults.search[0].label;
          recommendations.push(
            ...facets.map(
              sf =>
                ({
                  label: sf.label?.replace('__QUERY', entityName),
                  facets: sf.facets.map(f => {
                    const replaced = {
                      ...f,
                      bucketKey: f.bucketKey.replace('__QUERY', query),
                    };

                    if (f.displayText) {
                      replaced.displayText = replaced.displayText?.replace(
                        '__QUERY',
                        entityName
                      );
                    }

                    return replaced;
                  }),
                } as SmartFacet)
            )
          );
        }
      }

      return recommendations;
    } catch (err) {
      return [];
    }
  }
}
