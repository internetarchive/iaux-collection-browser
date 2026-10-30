export class BrowserLanguageHeuristic {
    async getRecommendedFacets() {
        const browserLanguageCode = navigator.language;
        const languageName = BrowserLanguageHeuristic.getLanguageDisplayName(browserLanguageCode);
        if (!languageName)
            return [];
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
    static getLanguageDisplayName(langCode) {
        // Strip off any script/region/variant codes for greater generality
        const languageOnly = langCode.split('-')[0];
        return new Intl.DisplayNames(['en'], { type: 'language' }).of(languageOnly);
    }
}
