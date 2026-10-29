import { codeToLanguageMap } from '../language-code-handler/language-code-mapping';
/**
 * Language names for the ETD index's language codes (ISO 639-1, e.g.
 * 'pt'), and back. collection-browser's language facet shows and filters
 * by name, as archive.org's search does.
 *
 * Names come from collection-browser's own language mapping first, then
 * the browser's Intl.DisplayNames for the many two-letter codes that
 * mapping doesn't list.
 */
let displayNames;
/**
 * ETD's own names for codes the shared mapping names differently from ISO
 * 639-1. The shared mapping is left as it is: archive.org's own language
 * facet may rely on it.
 * - `ng` is Ndonga; the shared mapping says English, which would count the
 *   index's Ndonga theses as English. (Browsers don't all name it either.)
 */
export const ETD_NAMES = { ng: 'Ndonga' };
/** A code's English name, or the code itself when nothing names it. */
export function languageName(code) {
    if (ETD_NAMES[code])
        return ETD_NAMES[code];
    const mapped = codeToLanguageMap[code];
    // The mapping marks some codes 'skip' rather than naming them.
    if (mapped && mapped !== 'skip')
        return mapped;
    try {
        displayNames ??= new Intl.DisplayNames(['en'], { type: 'language' });
        return displayNames.of(code) ?? code;
    }
    catch {
        return code; // not a well-formed language code
    }
}
let codesByName;
/**
 * Every code with this name: the facet merges codes that share a name, so
 * filtering by it must take them all. A value that isn't a known name is
 * taken as a code.
 */
export function languageCodes(nameOrCode) {
    codesByName ??= buildCodesByName();
    return codesByName.get(nameOrCode) ?? [nameOrCode];
}
function buildCodesByName() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const codes = new Set(Object.keys(codeToLanguageMap));
    for (const a of letters)
        for (const b of letters)
            codes.add(a + b);
    const byName = new Map();
    for (const code of codes) {
        const name = languageName(code);
        if (name === code)
            continue; // unnamed
        byName.set(name, [...(byName.get(name) ?? []), code]);
    }
    return byName;
}
