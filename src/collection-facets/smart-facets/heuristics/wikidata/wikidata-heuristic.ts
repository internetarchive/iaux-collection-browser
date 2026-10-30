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
  private readonly WIKIDATA_BASE_URL = 'https://www.wikidata.org/w/api.php';

  private readonly WIKIDATA_DEFAULT_ARGS =
    '?action=wbsearchentities&format=json&language=en&uselang=en&origin=*&type=item&limit=5';

  /**
   * Returns the full URL for a Wikidata search for the given query
   * @param query The query to search for
   */
  private getWikidataURL(query: string): string {
    const urlQuery = encodeURIComponent(query);
    return `${this.WIKIDATA_BASE_URL}${this.WIKIDATA_DEFAULT_ARGS}&search=${urlQuery}`;
  }

  /**
   * Replaces query placeholders with an actual query string, within a collection of smart facets
   * @param smartFacets The array of smart facets
   * @param query The query string to replace placeholders with
   * @returns A new array of smart facets with all query placeholders replaced
   */
  private replaceQueryPlaceholders(
    smartFacets: SmartFacet[],
    query: string,
  ): SmartFacet[] {
    return smartFacets.map(
      smartFacet =>
        ({
          // Replace placeholders within the smart facet label
          label: smartFacet.label?.replace('__QUERY', query),
          // Replace placeholders within the facets themselves (buckets & display text)
          facets: smartFacet.facets.map(facet => {
            const replaced = {
              ...facet,
              bucketKey: facet.bucketKey.replace(
                '__QUERY',
                query.toLowerCase(),
              ),
            };

            if (facet.displayText) {
              replaced.displayText = replaced.displayText?.replace(
                '__QUERY',
                query,
              );
            }

            return replaced;
          }),
        }) as SmartFacet,
    );
  }

  /**
   * @inheritdoc
   */
  async getRecommendedFacets(query: string): Promise<SmartFacet[]> {
    const recommendations: SmartFacet[] = [];

    try {
      const wikidataURL = this.getWikidataURL(query);
      const wikidataResponse = await fetch(wikidataURL);
      const searchResults = await wikidataResponse.json();

      for (const [keyword, facets] of Object.entries(WIKIDATA_ENTITIES)) {
        const keywordRegex = new RegExp(`\\b${keyword}\\b`);
        for (const searchResult of searchResults.search.slice(0, 3)) {
          if (keywordRegex.test(searchResult?.description)) {
            const entityName = searchResult.label;
            recommendations.push(
              ...this.replaceQueryPlaceholders(facets, entityName),
            );
          }
        }
      }

      return recommendations;
    } catch (err) {
      console.warn(err);
      return [];
    }
  }
}
