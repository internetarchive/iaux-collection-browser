import { QueryKeywordsHeuristic } from './heuristics/query-keywords-heuristic';
import { WikidataEntityHeuristic } from './heuristics/wikidata-heuristic';
import type { SmartFacet, SmartQueryHeuristic } from './models';

export class SmartQueryHeuristicGroup implements SmartQueryHeuristic {
  async getRecommendedFacets(query: string): Promise<SmartFacet[]> {
    return [
      ...(await new QueryKeywordsHeuristic().getRecommendedFacets(query)),
      ...(await new WikidataEntityHeuristic().getRecommendedFacets(query)),
    ];
  }
}
