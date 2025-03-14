import type { SmartQueryHeuristic, SmartFacet } from '../../models';
import { WIKIDATA_ENTITIES } from './wikidata-entity-map';

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
  async getRecommendedFacets(query: string): Promise<SmartFacet[]> {
    const recommendations: SmartFacet[] = [];

    try {
      const urlQuery = encodeURIComponent(query);

      const wikidataResponse = await fetch(
        `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${urlQuery}&format=json&language=en&uselang=en&origin=*&type=item&limit=5`
      );
      const searchResults = await wikidataResponse.json();

      for (const [keyword, facets] of Object.entries(WIKIDATA_ENTITIES)) {
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
