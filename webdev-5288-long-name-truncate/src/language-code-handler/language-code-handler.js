import { codeToLanguageMap } from './language-code-mapping';
export class LanguageCodeHandler {
    constructor() {
        this.delimeter = '|';
    }
    /** @inheritdoc */
    getLanguageNameFromCodeString(languageCodes) {
        const split = this.getCodeArrayFromCodeString(languageCodes);
        if (split.length === 0)
            return '';
        const languageCode = split[0];
        const languageName = codeToLanguageMap[languageCode];
        return languageName !== null && languageName !== void 0 ? languageName : languageCodes;
    }
    /** @inheritdoc */
    getCodeStringFromLanguageName(languageName) {
        const languageCodes = Object.keys(codeToLanguageMap).filter(code => codeToLanguageMap[code] === languageName);
        const stringifiedCodes = languageCodes === null || languageCodes === void 0 ? void 0 : languageCodes.join(this.delimeter);
        return stringifiedCodes;
    }
    /** @inheritdoc */
    getCodeArrayFromCodeString(languageCodes) {
        const split = languageCodes.split(this.delimeter);
        return split;
    }
}
//# sourceMappingURL=language-code-handler.js.map