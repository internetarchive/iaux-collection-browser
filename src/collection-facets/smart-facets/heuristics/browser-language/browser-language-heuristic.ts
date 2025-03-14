import type { SmartQueryHeuristic, SmartFacet } from '../../models';

export class BrowserLanguageHeuristic implements SmartQueryHeuristic {
  async getRecommendedFacets(): Promise<SmartFacet[]> {
    const browserLanguageCode = navigator.language;
    const languageName =
      BrowserLanguageHeuristic.getLanguageDisplayName(browserLanguageCode);
    if (!languageName) return [];

    return [
      {
        facets: [
          {
            facetType: 'language',
            bucketKey: languageName,
          },
        ],
      },
    ];
  }

  private static getLanguageDisplayName(langCode: string): string | undefined {
    // Strip off any script/region/variant codes for greater generality
    const languageOnly = langCode.split('-')[0];
    return new Intl.DisplayNames(['en'], { type: 'language' }).of(languageOnly);
  }
}
