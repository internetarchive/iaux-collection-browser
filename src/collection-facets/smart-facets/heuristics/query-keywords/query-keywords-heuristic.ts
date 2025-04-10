import type { SmartQueryHeuristic, SmartFacet } from '../../models';
import { QUERY_KEYWORDS } from './query-keywords-map';

// If the query contains X keyword but Y facet isn't selected, recommend facet Y
export class QueryKeywordsHeuristic implements SmartQueryHeuristic {
  async getRecommendedFacets(query: string): Promise<SmartFacet[]> {
    const recommendations: SmartFacet[] = [];

    for (const [keyword, facets] of Object.entries(QUERY_KEYWORDS)) {
      if (query.includes(keyword)) {
        recommendations.push(...facets);
      }
    }

    return recommendations;
  }
}
