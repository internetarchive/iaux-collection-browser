import { languageCodes, languageName } from './etd-languages';
/** A code -> name table, and its reverse. */
function named(names) {
    return {
        label: (code) => names[code] ?? code,
        codesFor: (name) => {
            const codes = Object.keys(names).filter(code => names[code] === name);
            return codes.length ? codes : [name];
        },
    };
}
let regionNames;
let countryCodesByName;
/** A country code's English name; the code when nothing names it (e.g. 'SU'). */
function countryName(code) {
    try {
        regionNames ??= new Intl.DisplayNames(['en'], { type: 'region' });
        return regionNames.of(code) ?? code;
    }
    catch {
        return code;
    }
}
function countryCodes(name) {
    if (!countryCodesByName) {
        countryCodesByName = new Map();
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (const a of letters) {
            for (const b of letters) {
                const code = a + b;
                const label = countryName(code);
                if (label === code)
                    continue;
                countryCodesByName.set(label, [
                    ...(countryCodesByName.get(label) ?? []),
                    code,
                ]);
            }
        }
    }
    return countryCodesByName.get(name) ?? [name];
}
export const DEGREE_NAMES = {
    phd: 'Doctoral',
    masters: "Master's",
    bachelors: "Bachelor's",
    other: 'Other',
    unknown: 'Unknown',
};
const DEGREES = named(DEGREE_NAMES);
/** Source flags, under the live page's brand-name labels. */
export const SOURCE_FLAGS = ['oai', 'ia', 'wbm', 'libcat', 'printed'];
export const SOURCE_NAMES = {
    oai: 'OAI',
    ia: 'Internet Archive',
    wbm: 'Wayback Machine',
    libcat: 'Library catalog',
    printed: 'Printed abstracts',
};
const SOURCES = named(SOURCE_NAMES);
export const AVAILABILITY_NAMES = {
    abstract: 'Has abstract',
    archived: 'Archived (whole thesis)',
    saved: 'Document saved',
    live: 'Has live link',
};
const AVAILABILITY = named(AVAILABILITY_NAMES);
export const ETD_FACETS = [
    {
        key: 'language',
        title: 'Language',
        pluralTitle: 'Languages',
        read: (rows, docId, add) => {
            const code = rows.language(docId);
            if (code)
                add(code);
        },
        label: languageName,
        codesFor: languageCodes,
    },
    {
        key: 'country',
        title: 'Country',
        pluralTitle: 'Countries',
        after: 'language',
        read: (rows, docId, add) => {
            const code = rows.country(docId);
            if (code)
                add(code);
        },
        label: countryName,
        codesFor: countryCodes,
    },
    {
        // Most records don't say: "unknown" is a value of its own, so ticking
        // "Doctoral" alone doesn't silently hide them.
        key: 'degree',
        title: 'Degree level',
        pluralTitle: 'Degree levels',
        after: 'year',
        read: (rows, docId, add) => add(rows.level(docId) ?? 'unknown'),
        ...DEGREES,
    },
    {
        // Named by the index's institution list, so the value is the name:
        // there's no fixed table to map codes through.
        key: 'institution',
        title: 'Institution',
        pluralTitle: 'Institutions',
        after: 'country',
        read: (rows, docId, add) => {
            const name = rows.institutionName(docId);
            if (name)
                add(name);
        },
        label: name => name,
        codesFor: name => [name],
    },
    {
        // A thesis can come from several sources.
        key: 'source',
        title: 'Source',
        pluralTitle: 'Sources',
        after: 'institution',
        read: (rows, docId, add) => {
            for (const flag of SOURCE_FLAGS)
                if (rows.hasFlag(docId, flag))
                    add(flag);
        },
        ...SOURCES,
    },
    {
        // Requirements, not categories: picking two means both.
        key: 'availability',
        title: 'Availability',
        pluralTitle: 'Availability',
        after: 'degree',
        combine: 'all',
        read: (rows, docId, add) => {
            if (rows.hasFlag(docId, 'hasAbstract'))
                add('abstract');
            // The whole thesis is retrievable.
            if (rows.hasFlag(docId, 'complete'))
                add('archived');
            // At least one part is in the archive.
            if (['ia', 'wbm', 'archived'].some(flag => rows.hasFlag(docId, flag))) {
                add('saved');
            }
            // An archive.org item has no separate live url; everything else does.
            if (!rows.hasFlag(docId, 'ia'))
                add('live');
        },
        ...AVAILABILITY,
    },
];
/** A facet in the table by key. */
export function etdFacet(key) {
    return ETD_FACETS.find(facet => facet.key === key);
}
