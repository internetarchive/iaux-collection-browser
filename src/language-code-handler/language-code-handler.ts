import { codeToLanguageMap } from './language-code-mapping';

// To serialize the list of potential language codes, we store
// the string in the format `en-us|en|en-gb` with `|` being the separator.
// This allows us to generate a query of `language:(en-us OR en OR en-gb)`
// when we deserialize the string.
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

export class LanguageCodeHandler implements LanguageCodeHandlerInterface {
  private delimeter = '|';

  /** @inheritdoc */
  getLanguageNameFromCodeString(languageCodes: string): string {
    const split = this.getCodeArrayFromCodeString(languageCodes);
    if (split.length === 0) return '';
    const languageCode = split[0];
    const languageName = codeToLanguageMap[languageCode];
    return languageName ?? languageCodes;
  }

  /** @inheritdoc */
  getCodeStringFromLanguageName(languageName: string): string {
    const languageCodes = Object.keys(codeToLanguageMap).filter(
      code => codeToLanguageMap[code] === languageName
    );
    const stringifiedCodes = languageCodes?.join(this.delimeter);
    return stringifiedCodes;
  }

  /** @inheritdoc */
  getCodeArrayFromCodeString(languageCodes: string): string[] {
    const split = languageCodes.split(this.delimeter);
    return split;
  }
}
