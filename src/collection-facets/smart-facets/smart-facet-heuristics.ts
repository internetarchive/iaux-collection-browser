import { dedupe } from './dedupe';
import { BrowserLanguageHeuristic } from './heuristics/browser-language-heuristic';
import { QueryKeywordsHeuristic } from './heuristics/query-keywords-heuristic';
import { WikidataHeuristic } from './heuristics/wikidata-heuristic';
import type { SmartFacet, SmartQueryHeuristic } from './models';

export class SmartQueryHeuristicGroup implements SmartQueryHeuristic {
  private static readonly HEURISTICS = [
    QueryKeywordsHeuristic,
    WikidataHeuristic,
    BrowserLanguageHeuristic,
  ];

  async getRecommendedFacets(query: string): Promise<SmartFacet[]> {
    const promises = SmartQueryHeuristicGroup.HEURISTICS.map(HeuristicCtor =>
      new HeuristicCtor().getRecommendedFacets(query)
    );

    return dedupe((await Promise.all(promises)).flat());
  }
}
