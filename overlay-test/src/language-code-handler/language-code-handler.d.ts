export interface LanguageCodeHandlerInterface {
    /**
     * This takes a list of codes in the format `en-us|en|en-gb` and
     * returns the first language code in the list.
     *
     * The codes in the string should always represent the same language name.
     * eg `en-us`, `en-gb`, and `en` should always be "English"
     *
     * @param languageCodes
     */
    getLanguageNameFromCodeString(languageCodes: string): string;
    /**
     * This creates a serialized string of language codes for the given language.
     *
     * eg. `English` becomes `en-us|en|en-gb|.....`
     *
     * @param languageName
     */
    getCodeStringFromLanguageName(languageName: string): string;
    /**
     * Get an array of langauge codes from a serialized string.
     *
     * eg. `en-us|en|en-gb` becomes `['en-us', 'en', 'en-gb']`
     *
     * @param languageCodes
     */
    getCodeArrayFromCodeString(languageCodes: string): string[];
}
export declare class LanguageCodeHandler implements LanguageCodeHandlerInterface {
    private delimeter;
    /** @inheritdoc */
    getLanguageNameFromCodeString(languageCodes: string): string;
    /** @inheritdoc */
    getCodeStringFromLanguageName(languageName: string): string;
    /** @inheritdoc */
    getCodeArrayFromCodeString(languageCodes: string): string[];
}
