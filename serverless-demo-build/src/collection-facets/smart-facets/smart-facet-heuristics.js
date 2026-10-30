import { dedupe } from './dedupe';
import { BrowserLanguageHeuristic } from './heuristics/browser-language/browser-language-heuristic';
import { QueryKeywordsHeuristic } from './heuristics/query-keywords/query-keywords-heuristic';
import { WikidataHeuristic } from './heuristics/wikidata/wikidata-heuristic';
export class SmartQueryHeuristicGroup {
    // Avoid collapsing the array onto one line
    // prettier-ignore
    static { this.DEFAULT_HEURISTICS = [
        QueryKeywordsHeuristic,
        WikidataHeuristic,
        BrowserLanguageHeuristic
    ]; }
    async getRecommendedFacets(query, heuristics = SmartQueryHeuristicGroup.DEFAULT_HEURISTICS) {
        const promises = heuristics.map(HeuristicCtor => new HeuristicCtor().getRecommendedFacets(query));
        return dedupe((await Promise.all(promises)).flat());
    }
}
