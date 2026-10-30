import { QUERY_KEYWORDS } from './query-keywords-map';
// If the query contains X keyword but Y facet isn't selected, recommend facet Y
export class QueryKeywordsHeuristic {
    async getRecommendedFacets(query) {
        const recommendations = [];
        for (const [keyword, facets] of Object.entries(QUERY_KEYWORDS)) {
            if (query.includes(keyword)) {
                recommendations.push(...facets);
            }
        }
        return recommendations;
    }
}
