import { dedupe } from './dedupe';
import { BrowserLanguageHeuristic } from './heuristics/browser-language/browser-language-heuristic';
import { QueryKeywordsHeuristic } from './heuristics/query-keywords/query-keywords-heuristic';
import { WikidataHeuristic } from './heuristics/wikidata/wikidata-heuristic';
import type { SmartFacet, SmartQueryHeuristic } from './models';

export class SmartQueryHeuristicGroup implements SmartQueryHeuristic {
  // Avoid collapsing the array onto one line
  // prettier-ignore
  private static readonly DEFAULT_HEURISTICS: (new () => SmartQueryHeuristic)[] = [
    QueryKeywordsHeuristic,
    WikidataHeuristic,
    BrowserLanguageHeuristic
  ];

  async getRecommendedFacets(
    query: string,
    heuristics = SmartQueryHeuristicGroup.DEFAULT_HEURISTICS,
  ): Promise<SmartFacet[]> {
    const promises = heuristics.map(HeuristicCtor =>
      new HeuristicCtor().getRecommendedFacets(query),
    );

    return dedupe((await Promise.all(promises)).flat());
  }
}
